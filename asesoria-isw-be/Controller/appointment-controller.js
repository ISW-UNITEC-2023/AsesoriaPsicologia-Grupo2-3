const appointmentServices = require("../Service/appointment-services");


async function createAppointment(req, res) {
    try {
        const {appointment_date, id_file, id_doctor, id_clinic, user_creator} = req.body;
        const fecha = new Date(appointment_date);
        await appointmentServices.createAppo({fecha, id_file, id_doctor, id_clinic, user_creator});
        res.send({message: "Se ha creado una nueva cita"})
    } catch (error) {
        res.send({message: "No se pudo crear la cita", err: error.message});
    }
}

async function addConsultation(req, res) {
    try {
        const {id_file, id_doctor, id_clinic, user_creator, observations, amount, medic_orders} = req.body;
        await appointmentServices.addConsultation({
            id_file,
            id_doctor,
            id_clinic,
            user_creator,
            observations,
            amount,
            medic_orders
        });
        res.send({message: "Se ha creado una nueva consulta"})
    } catch (error) {
        res.send({message: "No se pudo crear la consulta", err: error.message});
    }
}

async function updateOrder(req, res) {

    try {
        const {medic_orders, editor, id, id_clinic, id_doctor, id_file} = req.body;
        await appointmentServices.updateMedicOrder({medic_orders, editor, id, id_clinic, id_doctor, id_file});
        res.send({message: "Se ha actualizado la orden medica"})
    } catch (error) {
        res.send({message: "Error de actualizacion", err: error.message});
    }
}

async function updatePaymentMedic(req, res) {
    try {
        const {amount, type, editor, id, id_clinic, id_doctor, id_file} = req.body;
        await appointmentServices.updatePayment({amount, type, editor, id, id_clinic, id_doctor, id_file});
        res.send({message: "Se ha actualizado el pago medico"})
    } catch (error) {
        res.send({message: "Error de actualizacion", err: error.message});
    }
}

async function updateObservations(req, res) {
    try {
        const {observations, editor, id, id_clinic, id_doctor, id_file} = req.body;
        await appointmentServices.updateObservation({observations, editor, id, id_clinic, id_doctor, id_file});
        res.send({message: "Se ha actualizado la observacion"})
    } catch (error) {
        res.send({message: "Error de actualizacion", err: error.message});
    }
}

async function updateAppointment(req, res) {
    try {
        const {appointment_date, editor, id, id_clinic, id_doctor, id_file} = req.body;
        const fecha = new Date(appointment_date);
        await appointmentServices.updateAppo({fecha, editor, id, id_clinic, id_doctor, id_file});
        res.send({message: "Se ha actualizado la fecha de cita"})
    } catch (error) {
        res.send({message: "Error de actualizacion", err: error.message});
    }
}

async function updateStateMedic(req, res) {
    try {
        const {state, editor, id, id_clinic, id_doctor, id_file} = req.body;
        await appointmentServices.updateState({state, editor, id, id_clinic, id_doctor, id_file});
        res.send({message: "Se ha actualizado el estado medico"})
    } catch (error) {
        res.send({message: "Error de actualizacion", err: error.message});
    }
}
  
// async function updatePaymentTypeMedic(req, res) {
//     try {
//       const { payment_type, editor, id, id_clinic, id_doctor, id_file } = req.body;
//       await appointmentServices.updatePaymentType({
//         payment_type,
//         editor,
//         id,
//         id_clinic,
//         id_doctor,
//         id_file,
//       });
//       res.send({ message: "Se ha actualizado el tipo de pago" });
//     } catch (error) {
//       res.send({ message: "Error de actualizacion", err: error.message });
//     }
//   }
  async function updatePaymentTypeMedic(req, res) {
    try {
      const { payment_type, editor, id, id_clinic, id_doctor, id_file } = req.body;
      await appointmentServices.updatePaymentType({
        payment_type,
        editor,
        id,
        id_clinic,
        id_doctor,
        id_file,
      });
      res.send({ message: "Se ha actualizado el tipo de pago y el estado de la cita" });
    } catch (error) {
      res.send({ message: "Error de actualización", err: error.message });
    }
  }
  
 

  async function updateZoomLink(req, res) {
    try {
      const { zoom_link, editor, id, id_clinic, id_doctor, id_file } = req.body;
      await appointmentServices.updateZoomLink({ zoom_link, editor, id, id_clinic, id_doctor, id_file });
      res.send({ message: "Se ha actualizado el enlace de Zoom" });
    } catch (error) {
      res.send({ message: "Error de actualización", err: error.message });
    }
  }

async function deleteAppointment(req, res) {
    try {
        const {id} = req.body;

        await appointmentServices.deleteAppo(id);
        res.send({message: "Cita eliminada!"});

    } catch (error) {
        res.send({
            message: "No fue posible borrar la cita o la cita no existe",
            err: error.message
        })
    }
}

async function getAppointments(req, res) {
    try {
        res.send({
            message: "Citas recuperadas",
            data: await appointmentServices.getAppo()
        })
    } catch (error) {
        res.send({
            message: "No fue posible recuperar todas las citas",
            err: error.message
        })
    }
}

async function getById(req, res) {
    const {id} = req.params;

    try {
        const App = await appointmentServices.getById(id);
        res.send({
            data: App,
            message: "Se ha recuperado la información del app",
        });
    } catch (error) {
        res.send({message: "Error", error: error.message});
    }
}

async function getCreator(req, res) {

    const {id} = req.query.id;
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
    const {id} = req.body;
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
        res.send({message: "Error", error: error.message});
    }
  }
/*SELECT * FROM attention_sys.appointments
WHERE state_appointment = 'Terminado' AND id_clinic = '8';

*/

  async function getChequeo(req, res){
    const { idClinic } = req.body;
    try {
       
      const App = await appointmentServices.getChequeo(idClinic);
      res.send({
        message: "Se obtuvieron los datos para el chequeo ",
        AppInfo: App,
      });
    } catch (e) {
      res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
        error: "No se pudo obtener los datos del chequeo",
      });
    }
  }
    

module.exports = {
    getAppointments,
    getById,
    createAppointment,
    addConsultation,
    deleteAppointment,
    updateOrder,
    updatePaymentMedic,
    updateObservations,
    updateAppointment,
    updateStateMedic,
    getDoctor,
    getClinic,
    getCreator,
    getChequeo,
    updatePaymentTypeMedic,
    updateZoomLink
};
