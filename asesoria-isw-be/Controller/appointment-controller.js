const appointmentServices = require("../Service/appointment-services");


async function createAppointment(req, res)
{
    try{
        const {appointment_date, id_file, id_doctor, id_clinic, user_creator} = req.body;
        const fecha = new Date(appointment_date);
        await appointmentServices.createAppo({fecha, id_file, id_doctor, id_clinic, user_creator});
        res.send({ message: "Se ha creado una nueva cita" })
    }catch(error)
    {
        res.send({ message: "No se pudo crear la cita", err: error.message });
    }
}

async function updateOrder(req,res)
{
    
    try{
        const { medic_orders, editor, id, id_clinic, id_doctor, id_file} = req.body;
        await appointmentServices.updateMedicOrder({ medic_orders, editor, id, id_clinic, id_doctor, id_file});
        res.send({ message: "Se ha actualizado la orden medica" })
    }catch(error)
    {
        res.send({ message: "Error de actualizacion", err: error.message });
    }
}

async function updatePaymentMedic(req,res)
{
    try{
        const { amount, type, editor, id, id_clinic, id_doctor, id_file} = req.body;
        await appointmentServices.updatePayment({ amount, type, editor, id, id_clinic, id_doctor, id_file});
        res.send({ message: "Se ha actualizado el pago medico" })
    }catch(error)
    {
        res.send({ message: "Error de actualizacion", err: error.message });
    }
}

async function updateObservations(req, res)
{
    try{
        const { observations, editor, id, id_clinic, id_doctor, id_file} = req.body;
        await appointmentServices.updateObservation({ observations, editor, id, id_clinic, id_doctor, id_file});
        res.send({ message: "Se ha actualizado la observacion" })
    }catch(error)
    {
        res.send({ message: "Error de actualizacion", err: error.message });
    }
}

async function updateAppointment(req, res)
{
    try{
        const { appointment_date, editor, id, id_clinic, id_doctor, id_file} = req.body;
        const fecha = new Date(appointment_date);
        await appointmentServices.updateAppo({ fecha, editor, id, id_clinic, id_doctor, id_file});
        res.send({ message: "Se ha actualizado la fecha de cita" })
    }catch(error)
    {
        res.send({ message: "Error de actualizacion", err: error.message });
    }
}

async function updateStateMedic(req, res)
{
    try{
        const { state, editor, id, id_clinic, id_doctor, id_file} = req.body;
        await appointmentServices.updateState({ state, editor, id, id_clinic, id_doctor, id_file});
        res.send({ message: "Se ha actualizado el estado medico" })
    }catch(error)
    {
        res.send({ message: "Error de actualizacion", err: error.message });
    }
}

async function deleteAppointment(req, res)
{
    try{
        const {id} = req.body;

        await appointmentServices.deleteAppo(id);
        res.send({message: "Cita eliminada!"});
        
    }catch(error)
    {
        res.send({
            message: "No fue posible borrar la cita o la cita no existe",
            err: error.message
        })
    }
}

async function getAppointments(req,res)
{
        try{
        res.send({
            message: "Citas recuperadas",
            appointmentsInfo: await appointmentServices.getAppo()
        })
    }catch(error)
    {
        res.send({
            message: "No fue posible recuperar todas las citas",
            err: error.message
        })
    }
}

async function getById(req, res) {

    const id_appointment = req.query.id;

  try {
    const App = await appointmentServices.getById(id_appointment);
    res.send({
      appInfo: App,
      message: "Se ha recuperado la información del app",
    });
  } catch (error) {
    res.send({ message: "Error", error: error.message });
  }
}

async function getCreator(req, res) {

    const { id } = req.query.id;
    try {
       
        res.send({
            message: "Citas recuperadas por creador de usuario",
            appointmentsInfo: await appointmentServices.getCreator(id)
        });
    } catch (error) {
        res.send({
            message: "No fue posible recuperar las citas por creador de usuario",
            err: error.message
        });
    }
}

async function getDoctor(req, res) {
    const { id } = req.body;
    try {
        console.log(id); 

        res.send({
            message: "Citas recuperadas por médico",
            appointmentsInfo: await appointmentServices.getDoctor(id) // Use the correct function name
        });
    } catch (error) {
        res.send({
            message: "No fue posible recuperar las citas por médico",
            err: error.message
        });
    }
}


async function getClinic(req, res) {

    const id = req.query.id;

    try {
      const App = await appointmentServices.getClinic(id)
      res.send({
        appInfo: App,
        message: "Se ha recuperado la información del app",
      });
    } catch (error) {
      res.send({ message: "Error", error: error.message });
    }
  }




module.exports = {
    getAppointments,
    getById,
    createAppointment,
    deleteAppointment,
    updateOrder,
    updatePaymentMedic,
    updateObservations,
    updateAppointment,
    updateStateMedic,
    getDoctor,
    getClinic,
    getCreator
};