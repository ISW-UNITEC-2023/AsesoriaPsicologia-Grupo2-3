import axios from "axios";

export async function sendEmail(name, remitente, subject, message, email) {
  const options = {
    method: "POST",
    url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/mail/send-Multiple",
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