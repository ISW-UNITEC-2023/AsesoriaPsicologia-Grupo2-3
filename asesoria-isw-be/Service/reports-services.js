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



  async function getReports(date1, date2) {
    
    let report = await knex("appointments")
    .join('files', 'appointments.id_file', '=', 'files.id_file')
    .select('files.first_name', 'files.middle_name', "files.last_name","files.second_surname", "appointments.payment_amount", "appointments.appointment_date", "appointments.state_appointment", "appointments.payment_type" )
    .where('appointments.creation_date', '>=',`${date1} 00:00:00)`)
    .andWhere('appointments.creation_date', '<=', `${date2} 23:59:59`)

    
    
    report = JSON.stringify(report);
    return JSON.parse(report);
    
  }


  module.exports = {
    getReports,
  };
  