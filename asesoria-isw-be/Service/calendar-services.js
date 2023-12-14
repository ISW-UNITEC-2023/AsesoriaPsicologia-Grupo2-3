const knex = require("knex")({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_user,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  });
  
  //Post
  async function createEvent(event) {
    await knex("events").insert({
      title: event.title,
      url: event.url,
      start: event.start,
      end: event.end,
      //id_clinic: event.id_clinic
    });
  }


  
  //Get
  async function getEvents() {
    let events = await knex.select("*").from("events");
    events = JSON.stringify(events);
    return JSON.parse(events);
  }

  async function getEventsByClinicId(clinic_id) {
    let events = await knex.select("*").from("events").where;
    events = JSON.stringify(events);
    return JSON.parse(events);
  }

  
  
  module.exports = {
    createEvent,
    getEvents,
  };
  