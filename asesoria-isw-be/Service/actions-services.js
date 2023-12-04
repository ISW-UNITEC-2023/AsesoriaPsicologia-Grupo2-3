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

//Get
async function getActions() {
    let actions = await knex
    .select("*")
    .from("actions")

    actions = JSON.stringify(actions);
    return JSON.parse(actions);
}

module.exports = {
  getActions,
};