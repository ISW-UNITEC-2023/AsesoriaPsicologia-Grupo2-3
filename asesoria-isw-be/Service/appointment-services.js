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

async function createAppo(new_appo) {
    return( await knex("appointments").insert({
        appointment_date: new_appo.fecha,
        appointment_hour: new_appo.hora,
        id_file: new_appo.id_file,
        id_doctor: new_appo.id_doctor,
        id_clinic: new_appo.id_clinic,
        user_creator: new_appo.user_creator,
        creation_date: new Date(),
        appointment_type: new_appo.appointment_type,
    }))
}

async function addConsultation(new_appo) {
  await knex("appointments")
    .where({ id_appointment: new_appo.id_appointment })
    .update({
      id_file: new_appo.id_file,
      id_doctor: new_appo.id_doctor,
      id_clinic: new_appo.id_clinic,
      user_editor: new_appo.user_editor,
      last_modification: new Date(),
      observations: new_appo.observations,
      payment_amount: new_appo.payment_amount,
      medic_orders: new_appo.medic_orders,
      state_appointment: new_appo.state_appointment,
      motive: new_appo.motive,
    });
}

async function updateAppointmentWithoutAmount(new_appo) {
  await knex("appointments")
    .where({ id_appointment: new_appo.id_appointment })
    .update({
      id_file: new_appo.id_file,
      id_doctor: new_appo.id_doctor,
      id_clinic: new_appo.id_clinic,
      user_editor: new_appo.user_editor,
      last_modification: new Date(),
      observations: new_appo.observations,
      medic_orders: new_appo.medic_orders,
      state_appointment: new_appo.state_appointment,
      motive: new_appo.motive,
    });
}

//DELETE

async function deleteAppo(id_appointment) {
  return knex("appointments").where("id_appointment", id_appointment).del();
}

//UPDATE

async function updateMedicOrder(appo) {
  await knex("appointments")
    .update({
      medic_orders: appo.medic_orders,
      user_editor: appo.editor,
      last_modification: new Date(),
    })
    .where({
      id_appointment: appo.id,
      id_clinic: appo.id_clinic,
      id_doctor: appo.id_doctor,
      id_file: appo.id_file,
    });
}

async function updateHour(appo) {
  await knex("appointments")
    .update({
      appointment_hour: appo.hour,
      user_editor: appo.editor,
      last_modification: new Date(),
    })
    .where({
      id_appointment: appo.id,
      id_clinic: appo.id_clinic,
      id_doctor: appo.id_doctor,
      id_file: appo.id_file,
    });
}

async function updatePayment(appo) {
  await knex("appointments")
    .update({
      payment_amount: appo.amount,
      payment_type: appo.type,
      user_editor: appo.editor,
      last_modification: new Date(),
    })
    .where({
      id_appointment: appo.id,
      id_clinic: appo.id_clinic,
      id_doctor: appo.id_doctor,
      id_file: appo.id_file,
    });
}

async function updateObservation(appo) {
  await knex("appointments")
    .update({
      observations: appo.observations,
      user_editor: appo.editor,
      last_modification: new Date(),
    })
    .where({
      id_appointment: appo.id,
      id_clinic: appo.id_clinic,
      id_doctor: appo.id_doctor,
      id_file: appo.id_file,
    });
}

async function updateAppo(appo) {
  if (!appo.id_appointment) {
    console.error("Error: idAppointment is undefined or null");
    return;
  }

  try {
    await knex("appointments")
      .where({ id_appointment: appo.id_appointment })
      .update({
        id_doctor: appo.id_doctor,
        appointment_date: appo.fecha,
        appointment_hour: appo.appointment_hour,
        user_editor: appo.user_editor,
        last_modification: new Date(),
        appointment_type: appo.appointment_type,
      });
  } catch (error) {
    console.error("Error in updateAppo:", error);
    throw new Error("An error occurred while updating the appointment");
  }
}

async function updateState(appo) {
  await knex("appointments")
    .update({
      state_appointment: appo.state,
      user_editor: appo.editor,
      last_modification: new Date(),
    })
    .where({
      id_appointment: appo.id,
      id_clinic: appo.id_clinic,
      id_doctor: appo.id_doctor,
      id_file: appo.id_file,
    });
}

// async function updatePaymentType(appo) {
//     await knex("appointments")
//       .update({
//         payment_type: appo.payment_type,
//         user_editor: appo.editor,
//         last_modification: new Date(),
//       })
//       .where({
//         id_appointment: appo.id,
//         id_clinic: appo.id_clinic,
//         id_doctor: appo.id_doctor,
//         id_file: appo.id_file,
//       });
//   }

async function updatePaymentType(appo) {
  await knex("appointments")
    .update({
      payment_type: appo.payment_type,
      state_appointment: "PROCESADO",
      user_editor: appo.editor,
      last_modification: new Date(),
    })
    .where({
      id_appointment: appo.id,
      id_clinic: appo.id_clinic,
      id_doctor: appo.id_doctor,
      id_file: appo.id_file,
    });
}

async function getAppo() {
  return JSON.parse(JSON.stringify(await knex("appointments").select("*")));
}

async function getById(id) {
  let App = await knex.select().from("appointments").where("id_file", id);
  App = JSON.stringify(App);
  return JSON.parse(App);
}

async function getCreator(id) {
  return JSON.parse(
    JSON.stringify(
      await knex("appointments").select().where("user_creator", id)
    )
  );
}

async function getDoctor(doctorId) {
  return JSON.parse(
    JSON.stringify(
      await knex("appointments").select().where("id_doctor", doctorId)
    )
  );
}

async function getClinic(id) {
  return JSON.parse(
    JSON.stringify(await knex("appointments").select().where("id_clinic", id))
  );
}

/** SELECT * FROM attention_sys.appointments
 WHERE state_appointment = 'Terminado' AND id_clinic = '8'; */
// async function getChequeo(idClinic) {
//     let data = await knex
//       .select("*")
//       .from("appointments")
//       .where("state_appointment", "Terminado")
//       .andWhere("id_clinic", idClinic);

//     data = JSON.stringify(data);
//     return JSON.parse(data);
//   }
async function getChequeo(idClinic) {
  try {
    const data = await knex
      .select(
        "id_appointment",
        "payment_amount",
        "payment_type",
        "appointments.id_file",
        "users.name_user as doctor_name",
        "files.first_name as first_name",
        "files.middle_name as middle_name",
        "files.last_name as last_name",
        "files.second_surname as second_surname",
        "appointments.id_doctor",
        "appointments.id_clinic"
      )
      .from("appointments")
      .leftJoin("users", "appointments.id_doctor", "users.id_user")
      .leftJoin("files", "appointments.id_file", "files.id_file")
      .where("appointments.state_appointment", "TERMINADO")
      .andWhere("appointments.id_clinic", idClinic);

    return data;
  } catch (error) {
    console.error("Error en getChequeo:", error);
    throw new Error("Ocurrió un error al obtener los datos");
  }
}

async function getStateInitial(id_appointment) {
  return JSON.parse(
    JSON.stringify(
      await knex("appointments").select().where({
        id_appointment: id_appointment,
        state_appointment: "INICIADO",
      })
    )
  );
}

async function updateZoomLink(appo) {
  await knex("appointments")
    .update({
      zoom_link: appo.zoom_link,
      user_editor: appo.editor,
      last_modification: new Date(),
    })
    .where({
      id_appointment: appo.id,
      id_clinic: appo.id_clinic,
      id_doctor: appo.id_doctor,
      id_file: appo.id_file,
    });
}

module.exports = {
  getAppo,
  getById,
  createAppo,
  addConsultation,
  deleteAppo,
  updateMedicOrder,
  updateHour,
  updatePayment,
  updateObservation,
  updateAppo,
  updateState,
  getDoctor,
  getClinic,
  getCreator,
  getChequeo,
  updatePaymentType,
  updateZoomLink,
  updateAppointmentWithoutAmount,
  getStateInitial,
};
