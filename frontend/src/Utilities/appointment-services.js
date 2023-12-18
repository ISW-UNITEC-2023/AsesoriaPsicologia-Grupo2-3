import axios from "axios";
import { id } from "date-fns/locale";
const host = process.env.REACT_APP_API_BASE_URL;

export async function getChequeo(idClinic) {
  const options = {
    method: "GET",
    url: `${host}/appointment/getChequeo`,
    params: { idClinic: idClinic },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export async function updatePaymentType(
  payment_type,
  id,
  editor,
  id_clinic,
  id_doctor,
  id_file
) {
  const options = {
    method: "PUT",
    url: `${host}/appointment/updatePaymentType`,
    data: {
      payment_type: payment_type,
      id: id,
      editor: editor,
      id_clinic: id_clinic,
      id_doctor: id_doctor,
      id_file: id_file,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export async function updateAppointmentWithoutAmount(
  id_appointment,
  id_file,
  id_doctor,
  id_clinic,
  user_editor,
  observations,
  medic_orders,
  state_appointment
) {
  const options = {
    method: "PUT",
    url: "http://localhost:8000/appointment/updateAppointmentWithoutAmount",
    data: {
      id_appointment: id_appointment,
      id_file: id_file,
      id_doctor: id_doctor,
      id_clinic: id_clinic,
      user_editor: user_editor,
      observations: observations,
      medic_orders: medic_orders,
      state_appointment: state_appointment,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}
