import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function CreatePatient(
  first_name,
  middle_name,
  last_name,
  second_surname,
  birthdate,
  email,
  phone_number,
  address,
  civil_status,
  observation,
  substance_usage,
  id_clinic,
  user_creator,
  identidad
) {
  let data = JSON.stringify({
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    second_surname: second_surname,
    birthdate: birthdate,
    email: email,
    phone_number: phone_number,
    address: address,
    civil_status: civil_status,
    observation: observation,
    substance_usage: substance_usage,
    id_clinic: id_clinic,
    active: "1",
    user_editor: user_creator,
    user_creator: user_creator,
    identidad: identidad,
  });

  let options = {
    method: "post",
    maxBodyLength: Infinity,
    url: host + "/files/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    console.log("Error en el servicio de pacientes", e);
    return { message: e.response.data.error };
  }
}

export default {
  CreatePatient,
};
