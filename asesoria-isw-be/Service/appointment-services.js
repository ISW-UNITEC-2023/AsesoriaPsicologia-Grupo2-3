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

async function createAppo(new_appo)
{
    await knex("appointments").insert({
        appointment_date: new_appo.fecha,
        id_file: new_appo.id_file,
        id_doctor: new_appo.id_doctor,
        id_clinic: new_appo.id_clinic,
        user_creator: new_appo.user_creator,
        creation_date: new Date()
    });
}

//DELETE

async function deleteAppo(id_appointment)
{
    return await knex("appointments").where("id_appointment", id_appointment).del();
}

//UPDATE

async function updateMedicOrder(appo)
{
    await knex("appointments").update({
        medic_orders: appo.medic_orders,
        user_editor: appo.editor,
        last_modification: new Date()
    }).where({
        id_appointment: appo.id,
        id_clinic: appo.id_clinic,
        id_doctor: appo.id_doctor,
        id_file: appo.id_file
    });
}

async function updatePayment(appo)
{
    await knex("appointments").update({
        payment_amount: appo.amount,
        payment_type: appo.type,
        user_editor: appo.editor,
        last_modification: new Date()
    }).where({
        id_appointment: appo.id,
        id_clinic: appo.id_clinic,
        id_doctor: appo.id_doctor,
        id_file: appo.id_file
    });
}

async function updateObservation(appo)
{
    await knex("appointments").update({
        observations: appo.observations,
        user_editor: appo.editor,
        last_modification: new Date()
    }).where({
        id_appointment: appo.id,
        id_clinic: appo.id_clinic,
        id_doctor: appo.id_doctor,
        id_file: appo.id_file
    });
}

async function updateAppo(appo)
{
    await knex("appointments").update({
        appointment_date: appo.fecha,
        user_editor: appo.editor,
        last_modification: new Date()
    }).where({
        id_appointment: appo.id,
        id_clinic: appo.id_clinic,
        id_doctor: appo.id_doctor,
        id_file: appo.id_file
    });
}

async function updateState(appo)
{
    await knex("appointments").update({
        state_appointment: appo.state,
        user_editor: appo.editor,
        last_modification: new Date()
    }).where({
        id_appointment: appo.id,
        id_clinic: appo.id_clinic,
        id_doctor: appo.id_doctor,
        id_file: appo.id_file
    });
}

//GET


async function getAppo()
{
    return JSON.parse(JSON.stringify(await knex("appointments").select("*")));
}

async function getAppoById(id_appointment)
{
    return JSON.parse(JSON.stringify(await knex("appointments").select().where("id_appointment", id_appointment)));
}

module.exports = {
    getAppo,
    getAppoById,
    createAppo,
    deleteAppo,
    updateMedicOrder,
    updatePayment,
    updateObservation,
    updateAppo,
    updateState,
};
