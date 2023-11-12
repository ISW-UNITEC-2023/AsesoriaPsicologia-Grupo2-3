import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

export async function sendEmail(name, remitente, subject, message, email) {
  const options = {
    method: "POST",
    url: host + "/mail/send-Multiple",
    data: {
      name: name,
      email: remitente,
      subject: subject,
      message: message,
      recipients: email,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
