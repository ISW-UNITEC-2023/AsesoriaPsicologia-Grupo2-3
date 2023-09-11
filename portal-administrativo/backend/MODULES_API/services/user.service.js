const knex = require("knex")({
  client: "mysql",
  connection:
    "mysql://root:sadmin123@daes.direct.quickconnect.to:3306/attention_sys",
});

const getUsersCredentials = async () => {
  let usersCredentials = await knex
    .select("name", "email", "id_account", "role", "active")
    .from("users");
  usersCredentials = JSON.stringify(usersCredentials);

  let patientsCredentials = await knex
    .select("name", "email", "identification", "role", "active")
    .from("patients");
  patientsCredentials = JSON.stringify(patientsCredentials);

  return {
    usersCredentials: JSON.parse(usersCredentials),
    patientsCredentials: JSON.parse(patientsCredentials),
  };
};

module.exports = {
  getUsersCredentials,
};
