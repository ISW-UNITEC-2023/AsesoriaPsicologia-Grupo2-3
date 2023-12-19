const HTTPCodes = require("../Utils/HTTPCodes");
const userServices = require("../Service/users-services");
const rolesServices = require("../Service/roles-services");

const { isEmail, isPassword } = require("../Utils/validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { name, email, phone, password, type, active, creator, clinicid } =
    req.body;

  try {
    const errorMessages = [];
    if (!isEmail(email)) {
      errorMessages.push("Este correo electrónico no es valido");
    }

    if (!isPassword(password)) {
      errorMessages.push("La contraseña no es valida");
    }

    const email_exists = await userServices.findExistingEmail(email);
    if (!email_exists) {
      errorMessages.push("Ya existe una cuenta con este correo electrónico");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(
          password,
          salt,
          parseInt(process.env.HASH_ITERATIONS),
          parseInt(process.env.KEY_LENGTH),
          "sha256"
        )
        .toString("base64");
      let newUserId = 0;
      if (type === "patient") {
        newUserId = await userServices.createPatient({
          name: name,
          email: email,
          phone: phone,
          encryptedPassword: encryptedPassword,
          salt: salt,
        });
        //console.log("es paciente");
      } else {
        newUserId = await userServices.createUser({
          name: name,
          email: email,
          phone: phone,
          encryptedPassword: encryptedPassword,
          salt: salt,
          active: active,
          creator: creator,
          id_clinic: clinicid,
        });
        //console.log("sin rol");
      }

      console.log(newUserId);
      res.send({
        success: true,
        newUserId,
      });
    }
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo crear el usuario.",
    });
    console.log(e);
  }
}

async function loginUser(req, res) {
  try {
    const { email, password, registro } = req.body;

    const errorMessage = [];

    //Validaciones
    if (!isEmail) {
      errorMessage.push("El correo debe ser un correo valido");
    }

    const email_exists = await userServices.findExistingEmail(email);

    if (email_exists.length === 0) {
      errorMessage.push("No existe un usuario con este email.");
      res.send({
        errorMessage,
      });
      return res;
    }
    const roles = await userServices.getUserRoles(email_exists[0].id_user);
    //console.log("Roles", roles[0]);
    const allroles = await rolesServices.getRoles();

    const allroles2 = allroles.map((roles) => roles.name_role);

    let privileges = await Promise.all(
      roles[0].map(async (role) => {
        return await rolesServices.getRolePrivileges(role.id_role);
      })
    );

    const privilegios = privileges[0].map(
      (privilege) => privilege.id_privilege
    );

    //console.log("Privilegios retornados", privilegios);
    const roleNames = roles[0].map((role) => role.name_role);

    const userData = {
      email: email,
      id_user: email_exists[0].id_user,
      id_clinic: email_exists[0].id_clinic,
    };
    if (errorMessage.length) {
      res.send({
        errorMessage,
      });
    } else {
      const email_now = email_exists[0];
      const userEncryptedDetails = encryptPassword(
        password,
        email_now.salt_user
      );

      if (userEncryptedDetails.encryptedPassword === email_now.password_user) {
        if (email_exists[0].id_clinic === parseInt(registro)) {
          const accessToken = jwt.sign(
            {
              id: email_now.id_user,
              email: email_now.email_user,
              name: email_now.name_user,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1h",
            }
          );

          const refreshToken = jwt.sign(
            {
              email: email_now.email_user,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "30d",
            }
          );

          res.cookie("user_data", userData, {
            maxAge: 259200000, // Duración de 3 días en milisegundos
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            signed: true,
          });

          res.send({
            name: email_now.name_user,
            accessToken,
            refreshToken,
            id: email_now.id_user,
          });
        } else {
          res.send({
            errorMessage: ["El usuario no está asignado a esa clínica."],
          });
        }
      } else {
        res.send({ errorMessage: ["Contraseña incorrecta"] });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
}

async function updateUserPassword(req, res) {
  const { email, password, editor } = req.body;
  const errorMessages = [];

  try {
    if (!isPassword(password)) {
      errorMessages.push("La contraseña no es valida");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(
          password,
          salt,
          parseInt(process.env.HASH_ITERATIONS),
          parseInt(process.env.KEY_LENGTH),
          "sha256"
        )
        .toString("base64");

      await userServices.updUserPassword({
        email: email,
        encryptedPassword: encryptedPassword,
        salt: salt,
        editor: editor,
      });

      res.send({
        success: true,
        email,
      });
    }
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar la contraseña.",
    });
  }
}

async function updateUserName(req, res) {
  const { id, name, editor } = req.body;

  try {
    await userServices.updUserName({
      id: id,
      name: name,
      editor: editor,
    });

    res.send({
      success: true,
      id,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: e,
    });
  }
}

async function updateUserPhone(req, res) {
  const { id, phone, editor } = req.body;

  try {
    await userServices.updUserNumber({
      id: id,
      phone: phone,
      editor: editor,
    });

    res.send({
      success: true,
      id,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el telefono.",
    });
  }
}

async function updateUserEmail(req, res) {
  const { id, newEmail, editor } = req.body;
  const errorMessages = [];

  try {
    if (!isEmail(newEmail)) {
      errorMessages.push("Este correo electrónico no es valido");
    }

    if (!userServices.findExistingEmail(newEmail)) {
      errorMessages.push("Este correo electrónico ya está en uso");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    }

    await userServices.updUserEmail({
      id: id,
      newEmail: newEmail,
      editor: editor,
    });

    res.send({
      success: true,
      id,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el correo.",
    });
  }
}

async function updateUserActive(req, res) {
  const { id, active, editor } = req.body;

  try {
    await userServices.changeUserActive({
      id: id,
      active: active,
      editor: editor,
    });

    res.send({
      success: true,
      id,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el estado.",
    });
  }
}

async function assignRole(req, res) {
  const { id_user, id_role, editor, creator } = req.body;
  console.log("Este es el id del usuario mandado", creator);
  try {
    await userServices.assignRole({
      id_user: id_user,
      id_role: id_role,
      editor: editor,
      creator: creator,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      e,
      error: "No se pudo asignar el rol.",
    });
  }
}

async function removeRole(req, res) {
  const { id_user, id_role } = req.body;

  try {
    await userServices.removeRole({
      id_user: id_user,
      id_role: id_role,
    });

    res.send({
      success: true,
      id_user,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo remover el rol.",
    });
  }
}

async function getAllusers(req, res) {
  try {
    const users = await userServices.getAllusers();
    res.send(users);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los usuarios.",
    });
  }
}

async function getPatients(req, res) {
  try {
    const users = await userServices.getPatients();
    res.send(users);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los usuarios.",
    });
  }
}

async function getTeachers(req, res) {
  try {
    const users = await userServices.getTeachers();
    res.send(users);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los usuarios.",
    });
  }
}

async function getUserRoles(req, res) {
  const { idUser } = req.body;
  try {
    const roles = await userServices.getUserRoles(idUser);
    res.send({
      message: "Se obtuvieron los roles del usuario",
      rolesInfo: roles,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los roles del usuario",
    });
  }
}

function encryptPassword(
  password,
  salt = crypto.randomBytes(128).toString("base64")
) {
  const encryptedPassword = crypto
    .pbkdf2Sync(
      password,
      salt,
      parseInt(process.env.HASH_ITERATIONS),
      parseInt(process.env.KEY_LENGTH),
      "sha256"
    )

    .toString("base64");

  return {
    encryptedPassword,
    salt,
  };
}

async function getCookie(req, res) {
  try {
    const cookies = req.signedCookies;

    res.send(cookies);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los usuarios.",
    });
  }
}

async function removeCookie(req, res) {
  try {
    res.clearCookie("user_data");
    res.send("Cookie eliminada");
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo eliminar las cookies.",
    });
  }
}

async function getRoles(req, res) {
  const { id_user } = req.query;
  try {
    const roles = await userServices.getRoles(id_user);
    res.send(roles);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los roles.",
    });
  }
}

async function getPrivilegesById(req, res) {
  const { id_user, id_element } = req.body;
  try {
    const user_role = await userServices.getRoleId(id_user);
    console.log(user_role[0].id_role);
    const privileges = await rolesServices.getRolePrivilegesByElement(
      user_role[0].id_role,
      id_element
    );
    res.send(privileges);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "Error al obtener los privilegios.",
    });
  }
}

async function getAllUsersRoles(req, res) {
  try {
    const roles = await userServices.getAllUsersRoles();
    res.send({
      message: "Se obtuvieron los roles de los usuarios",
      rolesInfo: roles,
    });
  } catch (error) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener todos los roles de los usuarios",
    });
  }
}

async function getUserByID(req, res) {
  const { id } = req.query;

  try {
    const name = await userServices.getUserCredentialsByid(id);
    res.send(name);
  } catch (error) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener el nombre del usuario",
    });
  }
}
async function getByClinic(req, res) {
  const { clinic } = req.query;

  try {
    const users = await userServices.getByClinic(clinic);
    res.send(users);
  } catch (error) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener la info del usuario segun clinica",
    });
  }
}

async function deleteCookies(req, res) {
  try {
    res.clearCookie("email");
    res.send("Cookie eliminada");
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los usuarios.",
    });
  }
}

async function getVerify(req, res) {
  try {
    const { id_user } = req.query;

    const roles = await userServices.getUserRoles(id_user);
    const roleNames = roles[0].map((role) => role.name_role);

    const allroles = await rolesServices.getRoles();
    const allroles2 = allroles.map((roles) => roles.name_role);

    let privileges = await Promise.all(
      roles[0].map(async (role) => {
        return await rolesServices.getRolePrivileges(role.id_role);
      })
    );

    console.log("Privilegios obtenidos", privileges);

    const privilegios = privileges[0]
      ? privileges[0].map((privilege) => privilege.id_privilege)
      : [];

    const view = {
      roles: roleNames,
      privileges: privilegios,
      allRoles: allroles2,
    };
    res.send(view);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los usuarios.",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateUserPassword,
  updateUserName,
  updateUserPhone,
  updateUserEmail,
  updateUserActive,
  assignRole,
  removeRole,
  getAllusers,
  getTeachers,
  getCookie,
  getRoles,
  getPatients,
  removeCookie,
  getUserRoles,
  getAllUsersRoles,
  deleteCookies,
  getPrivilegesById,
  getUserByID,
  getVerify,
  getByClinic,
};
