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

async function getAppointmentById(req,res)
{
        try{
        const {id} = req.body;

        res.send({message: "Cita por id recuperada", appointment: await appointmentServices.getAppoById(id)});
        
    }catch(error)
    {
        res.send({
            message: "No fue posible recuperar la cita especifica",
            err: error.message
        })
    }
}

module.exports = {
    getAppointments,
    getAppointmentById,
    createAppointment,
    deleteAppointment,
    updateOrder,
    updatePaymentMedic,
    updateObservations,
    updateAppointment,
    updateStateMedic
};