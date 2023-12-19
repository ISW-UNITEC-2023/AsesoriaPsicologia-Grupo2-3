const appointmentServices = require("../Service/appointment-services");

async function createAppointment(req, res) {
    try {
        const {appointment_date, id_file, hour, id_doctor, id_clinic, user_creator, appointment_type} = req.body;
        const fecha = new Date(appointment_date);
        let appoId = await appointmentServices.createAppo({fecha, id_file, id_doctor, id_clinic, user_creator, appointment_type});

        res.send({message: "Se ha creado una nueva cita", appoId})
    } catch (error) {
        res.send({message: "No se pudo crear la cita", err: error.message});
    }
}

async function addConsultation(req, res) {
  try {
    const {
      id_appointment,
      id_file,
      id_doctor,
      id_clinic,
      user_editor,
      observations,
      payment_amount,
      medic_orders,
      state_appointment,
      motive,
    } = req.body;

    await appointmentServices.addConsultation({
      id_appointment,
      id_file,
      id_doctor,
      id_clinic,
      user_editor,
      observations,
      payment_amount,
      medic_orders,
      state_appointment,
      motive,
    });
    res.send({ message: "Se han agregado los datos de la consulta" });
  } catch (error) {
    res.send({ message: "No se pudo crear la consulta", err: error.message });
  }
}

async function updateOrder(req, res) {
  try {
    const { medic_orders, editor, id, id_clinic, id_doctor, id_file } =
      req.body;
    await appointmentServices.updateMedicOrder({
      medic_orders,
      editor,
      id,
      id_clinic,
      id_doctor,
      id_file,
    });
    res.send({ message: "Se ha actualizado la orden medica" });
  } catch (error) {
    res.send({ message: "Error de actualizacion", err: error.message });
  }
}

async function updateHour(req, res) {
  {
    try {
      const { hour, editor, id, id_clinic, id_doctor, id_file } = req.body;
      await appointmentServices.updateHour({
        hour,
        editor,
        id,
        id_clinic,
        id_doctor,
        id_file,
      });
      res.send({ message: "Se ha actualizado la hora de la cita" });
    } catch (error) {
      res.send({ message: "Error de actualizacion", err: error.message });
    }
  }
}

async function updatePaymentMedic(req, res) {
  try {
    const { amount, type, editor, id, id_clinic, id_doctor, id_file } =
      req.body;
    await appointmentServices.updatePayment({
      amount,
      type,
      editor,
      id,
      id_clinic,
      id_doctor,
      id_file,
    });
    res.send({ message: "Se ha actualizado el pago medico" });
  } catch (error) {
    res.send({ message: "Error de actualizacion", err: error.message });
  }
}

async function updateObservations(req, res) {
  try {
    const {
      observations,
      editor,
      id,
      id_clinic,
      id_doctor,
      id_file,
      appointment_type,
      appointment_date,
    } = req.body;
    await appointmentServices.updateObservation({
      observations,
      editor,
      id,
      id_clinic,
      id_doctor,
      id_file,
      appointment_type,
      appointment_date,
    });
    res.send({ message: "Se ha actualizado la observacion" });
  } catch (error) {
    res.send({ message: "Error de actualizacion", err: error.message });
  }
}

async function updateAppointment(req, res) {
  try {
    const {
      id_appointment,
      appointment_date,
      appointment_hour,
      user_editor,
      id_doctor,
      id_file,
      appointment_type,
    } = req.body;
    const fecha = new Date(appointment_date);
    await appointmentServices.updateAppo({
      id_appointment,
      fecha,
      appointment_hour,
      user_editor,
      id_doctor,
      id_file,
      appointment_type,
    });
    res.send({ message: "Se ha actualizado la cita" });
  } catch (error) {
    res.send({ message: "Error de actualizacion", err: error.message });
  }
}

async function updateStateMedic(req, res) {
  try {
    const { state, editor, id, id_clinic, id_doctor, id_file } = req.body;
    await appointmentServices.updateState({
      state,
      editor,
      id,
      id_clinic,
      id_doctor,
      id_file,
    });
    res.send({ message: "Se ha actualizado el estado medico" });
  } catch (error) {
    res.send({ message: "Error de actualizacion", err: error.message });
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
    const { payment_type, editor, id, id_clinic, id_doctor, id_file } =
      req.body;
    await appointmentServices.updatePaymentType({
      payment_type,
      editor,
      id,
      id_clinic,
      id_doctor,
      id_file,
    });
    res.send({
      message: "Se ha actualizado el tipo de pago y el estado de la cita",
    });
  } catch (error) {
    res.send({ message: "Error de actualización", err: error.message });
  }
}

async function updateZoomLink(req, res) {
  try {
    const { zoom_link, editor, id, id_clinic, id_doctor, id_file } = req.body;
    await appointmentServices.updateZoomLink({
      zoom_link,
      editor,
      id,
      id_clinic,
      id_doctor,
      id_file,
    });
    res.send({ message: "Se ha actualizado el enlace de Zoom" });
  } catch (error) {
    res.send({ message: "Error de actualización", err: error.message });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { payment_type, editor, id, id_clinic, id_doctor, id_file } =
      req.body;
    await appointmentServices.updatePaymentType({
      payment_type,
      editor,
      id,
      id_clinic,
      id_doctor,
      id_file,
    });
    res.send({
      message: "Se ha actualizado el tipo de pago y el estado de la cita",
    });
  } catch (error) {
    res.send({ message: "Error de actualización", err: error.message });
  }
}

/*async function updateZoomLink(req, res) {
  try {
      const {zoom_link, editor, id, id_clinic, id_doctor, id_file} = req.body;
      await appointmentServices.updateZoomLink({zoom_link, editor, id, id_clinic, id_doctor, id_file});
      res.send({message: "Se ha actualizado el enlace de Zoom"});
  } catch (error) {
      res.send({message: "Error de actualización", err: error.message});
  }
}*/

async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;

    await appointmentServices.deleteAppo(id);
    res.send({ message: "Cita eliminada!" });
  } catch (error) {
    res.send({
      message: "No fue posible borrar la cita o la cita no existe",
      err: error.message,
    });
  }
}

async function getAppointments(req, res) {
  try {
    res.send({
      message: "Citas recuperadas",
      data: await appointmentServices.getAppo(),
    });
  } catch (error) {
    res.send({
      message: "No fue posible recuperar todas las citas",
      err: error.message,
    });
  }
}

async function getById(req, res) {
  const { id } = req.params;

  try {
    const App = await appointmentServices.getById(id);
    res.send({
      data: App,
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
      appointmentsInfo: await appointmentServices.getCreator(id),
    });
  } catch (error) {
    res.send({
      message: "No fue posible recuperar las citas por creador de usuario",
      err: error.message,
    });
  }
}

async function getDoctor(req, res) {
  const { id } = req.body;
  try {
    console.log(id);

    res.send({
      message: "Citas recuperadas por médico",
      appointmentsInfo: await appointmentServices.getDoctor(id), // Use the correct function name
    });
  } catch (error) {
    res.send({
      message: "No fue posible recuperar las citas por médico",
      err: error.message,
    });
  }
}

async function getClinic(req, res) {
  const id = req.query.id;
  try {
    const App = await appointmentServices.getClinic(id);
    res.send({
      appInfo: App,
      message: "Se ha recuperado la información del app",
    });
  } catch (error) {
    res.send({ message: "Error", error: error.message });
  }
}

/*SELECT * FROM attention_sys.appointments
WHERE state_appointment = 'Terminado' AND id_clinic = '8';

*/

async function getChequeo(req, res) {
  const { idClinic } = req.query;
  const errors = [];

  if (!idClinic) {
    errors.push("Falta el id_clinic de la clinica");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const App = await appointmentServices.getChequeo(idClinic);

    if (App.length === 0) {
      return res.status(HTTPCodes.NOT_FOUND).send({
        error: "No se encontraron datos para el chequeo",
      });
    }

    res.send({
      message: "Se obtuvieron los datos para el chequeo",
      AppInfo: App,
    });
  } catch (e) {
    console.error("Error en getChequeo:", e);
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los datos del chequeo",
    });
  }
}

async function updateAppointmentWithoutAmount(req, res) {
  try {
    const {
      id_appointment,
      id_file,
      id_doctor,
      id_clinic,
      user_editor,
      observations,
      medic_orders,
      state_appointment,
      motive,
    } = req.body;

    await appointmentServices.updateAppointmentWithoutAmount({
      id_appointment,
      id_file,
      id_doctor,
      id_clinic,
      user_editor,
      observations,
      medic_orders,
      state_appointment,
      motive,
    });
    res.send({ message: "Se han agregado los datos de la consulta" });
  } catch (error) {
    res.send({ message: "No se pudo crear la consulta", err: error.message });
  }
}

async function getStateInitial(req, res) {
  const { id_appointment } = req.query;
  const errors = [];

  if (!id_appointment) {
    errors.push("Falta el id_clinic de la clinica");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const App = await appointmentServices.getStateInitial(id_appointment);
    if (App.length === 0) {
      return res.status(HTTPCodes.NOT_FOUND).send({
        error: "No se encontraron datos para el chequeo",
      });
    }

    res.send({
      message: "Se obtuvieron los datos para el chequeo",
      AppInfo: App,
    });
  } catch (e) {
    console.error("Error en getChequeo:", e);
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
  updateHour,
  updatePaymentMedic,
  updateObservations,
  updateAppointment,
  updateStateMedic,
  getDoctor,
  getClinic,
  getCreator,
  getChequeo,
  updatePaymentTypeMedic,
  updateZoomLink,
  updateAppointmentWithoutAmount,
  getStateInitial,
};
