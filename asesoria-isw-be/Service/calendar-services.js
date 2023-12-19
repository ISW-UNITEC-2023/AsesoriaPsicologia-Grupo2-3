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
  async function createEvent(newEvent) {
   
    await knex("events").insert({
      id_event: newEvent.id_event,
      title: newEvent.title,
      url: newEvent.url,
      start: newEvent.start,
      end: newEvent.end,
      id_clinic: newEvent.id_clinic
    })
  }

  async function updateEventById(event){
  await knex("events").where({id_event: event.id_event}).update({
      title: event.title,
      start: event.start,
    })
  }

  //Get
  async function getEvents() {
    let events = await knex.select("*").from("events");
    events = JSON.stringify(events);
    return JSON.parse(events);
  }

  async function getEventsByClinicId(id_clinic) {
    let events = await knex.select("*").from("events").where("id_clinic", "=", id_clinic);
    events = JSON.stringify(events);
    return JSON.parse(events);
  }

  //Delete

  async function deleteEventById(id){
    return(
    await knex("events").where("id_event", "=", id).del());
    }

  
  
  module.exports = {
    createEvent,
    getEvents,
    getEventsByClinicId,
    updateEventById,
    deleteEventById
  };
  