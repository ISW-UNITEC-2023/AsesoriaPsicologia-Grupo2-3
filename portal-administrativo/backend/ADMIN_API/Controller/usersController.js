const HTTPCodes = require("../Utils/HTTPCodes");

const { getUsersCredentials, createUser, updUserAdmin, delUser, findExistingEmail} = require("../Service/users");
const { isName, isEmail, isPassword} = require("../Utils/validator");
const crypto = require("crypto");

async function getUserList(req, res) {
  try {
    const credentials = await getUsersCredentials();

    res.send({
      credentials,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener la lista de usuarios.",
    });
  }
}

async function registerUser(req, res) {
  const { id_account, role, name, email, password } = req.body;
 
  try {
    const errorMessages = [];
    if (!isName(name)) {
      errorMessage.push("Name is not valid.");
    }
    
    if (!isEmail(email)) {
      errorMessages.push("Email is not valid.");
    }
    
    // if (!isPassword(password)) {
    //   errorMessages.push("Password is not valid.");
    // }
    
    const email_exists = await findExistingEmail(email);
    if (!email_exists) {
      errorMessage.push("This email already exists.");
    }
    
    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, parseInt(process.env.HASH_ITERATIONS), parseInt(process.env.KEY_LENGTH), "sha256")
        .toString("base64");
      
      const [newUserId] = await createUser({
        id_account,
        role,
        name,
        email,
        encryptedPassword,
        salt,
      });
      
      res.send({
        success: true,
        newUserId,
      });
    }
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo crear el usuario.",
    });
  }
}

async function deleteUser(req, res) {
  const id_account = req.body.id_account;

  try {
    await delUser(id_account);
    res.send({
      success: true,
      id_account,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo eliminar el usuario.",
    });
  }
}

async function updateUserAdmin(req, res) {
  try {
    await updUserAdmin(req.body);

    res.send({
     success: true,
   });
 } catch (e) {
     res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
         error: "No se pudo actualizar el usuario.",
       });
 }
}

module.exports = {
  getUserList,
  registerUser,
  deleteUser,
  updateUserAdmin,
};
