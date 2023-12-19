const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

//Post
async function createUser(user) {
  let users = await knex("users").insert({
    name_user: user.name,
    email_user: user.email,
    number_user: user.phone,
    password_user: user.encryptedPassword,
    salt_user: user.salt,
    active_user: user.active,
    user_creator: user.creator,
    id_clinic: user.id_clinic,
  });

  users = JSON.stringify(users);
  return JSON.parse(users);
}

async function createPatient(user) {
  let patientId = await knex("users").insert({
    name_user: user.name,
    email_user: user.email,
    number_user: user.phone,
    password_user: user.encryptedPassword,
    salt_user: user.salt,
  });

  let role_patient = JSON.stringify(
    await knex("roles").select("id_role").where("name_role", "patient")
  );
  role_patient = JSON.parse(role_patient);

  await knex("user_role").insert({
    id_user: patientId,
    id_role: role_patient[0].id_role,
  });
}

async function updUserName(user) {
  return knex("users").where("id_user", user.id).update({
    name_user: user.name,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function updUserEmail(user) {
  return knex("users").where("id_User", user.id).update({
    email_user: user.newEmail,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function updUserNumber(user) {
  return knex("users").where("id_user", user.id).update({
    number_user: user.phone,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function updUserPassword(user) {
  return await knex("users").where({ email_user: user.email }).update({
    password_user: user.encryptedPassword,
    salt_user: user.salt,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function changeUserActive(user) {
  return knex("users").where("id_user", user.id).update({
    active_user: user.active,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function assignRole(user) {
  try {
    return await knex("user_role").insert({
      id_role: user.id_role,
      id_user: user.id_user,
      user_creator: user.creator,
      creation_date: new Date(),
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function removeRole(user) {
  try {
    await knex("user_role")
      .where({ id_user: user.id_user, id_role: user.id_role })
      .del();
  } catch (error) {
    throw new Error(error.message);
  }
}

//Get
async function getUserCredentials(email) {
  let usersCredentials = await knex
    .select("*")
    .from("users")
    .where("email", email);
  usersCredentials = JSON.stringify(usersCredentials);
  return JSON.parse(usersCredentials);
}

async function getUserCredentialsByid(id) {
  let usersCredentials = await knex
    .select("name_user")
    .from("users")
    .where("id_user", id);
  usersCredentials = JSON.stringify(usersCredentials);
  return JSON.parse(usersCredentials);
}

async function findExistingEmail(email) {
  let emailExists = await knex("users").select("*").where("email_user", email);
  emailExists = JSON.stringify(emailExists);
  return JSON.parse(emailExists);
}

async function getAllusers() {
  let users = await knex.select("*").from("users");
  users = JSON.stringify(users);
  return JSON.parse(users);
}

async function getTeachers() {
  let users = await knex
    .select("*")
    .from("users")
    .innerJoin("user_role", "users.id_user", "=", "user_role.id_user")
    .where("id_role", 5);
  users = JSON.stringify(users);
  return JSON.parse(users);
}

async function getPatients() {
  let users = await knex
    .select("*")
    .from("users")
    .innerJoin("user_role", "users.id_user", "=", "user_role.id_user")
    .where("id_role", 2);
  users = JSON.stringify(users);
  return JSON.parse(users);
}

async function getUserRoles(idUser) {
  let roles = await knex.raw(
    `
      SELECT roles.id_role, roles.name_role
        FROM roles
          INNER JOIN user_role ON (user_role.id_role = roles.id_role)
          WHERE user_role.id_user = ?
    `,
    [idUser]
  );
  roles = JSON.stringify(roles);
  return JSON.parse(roles);
}

async function getAllUsersRoles() {
  let roles = await knex.raw(
    `
      SELECT roles.id_role, roles.name_role, user_role.id_user
        FROM roles
          INNER JOIN user_role ON user_role.id_role = roles.id_role
    `
  );
  roles = JSON.stringify(roles);
  return JSON.parse(roles);
}

async function getRoles(id) {
  let roles = await knex
    .select("name_role")
    .from("user_role")
    .innerJoin("roles", "user_role.id_role", "=", "roles.id_role")
    .where("id_user", "=", id);
  roles = JSON.stringify(roles);
  return JSON.parse(roles);
}

async function getRoleId(id) {
  let roles = await knex
    .select("user_role.id_role")
    .from("user_role")
    .innerJoin("roles", "user_role.id_role", "=", "roles.id_role")
    .where("id_user", "=", id);
  roles = JSON.stringify(roles);
  return JSON.parse(roles);
}
async function getByClinic(clinic) {
  let users = await knex
    .select(
      "u.id_user",
      "u.name_user",
      "u.email_user",
      "u.active_user",
      "u.number_user",
      "u.creation_date",
      "r.name_role AS rol"
    )
    .from("users as u")
    .join("user_role as ur", "u.id_user", "=", "ur.id_user")
    .join("roles as r", "ur.id_role", "=", "r.id_role")
    .where("u.id_clinic", clinic);
  users = JSON.stringify(users);
  return JSON.parse(users);
}

module.exports = {
  createUser,
  createPatient,
  updUserName,
  updUserEmail,
  updUserNumber,
  updUserPassword,
  changeUserActive,
  assignRole,
  removeRole,
  getUserCredentials,
  findExistingEmail,
  getAllusers,
  getTeachers,
  getPatients,
  getUserRoles,
  getAllUsersRoles,
  getUserCredentialsByid,
  getRoles,
  getRoleId,
  getByClinic,
};
