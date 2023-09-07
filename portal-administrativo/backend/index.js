var nodemailer = require("nodemailer");
var Mailgen = require("mailgen");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asesoria.psicologica.unitec@gmail.com",
    pass: "wjsnfbnwicipnkdi",
  },
});

let MailGenerator = new Mailgen({
  theme: "neopolitan",
  product: {
    name: "UNITEC@ISW",
    link: "https://unitec.edu/",
    logo: "https://www.unitec.edu/res/img/logo-unitec-color.png",
    // Custom logo height
    logoHeight: "60px",
  },
});
var email = {
  body: {
    name: "John Appleseed",
    intro:
      "You have received this email because a password reset request for your account was received.",
    action: {
      instructions: "Click the button below to reset your password:",
      button: {
        color: "#DC4D2F",
        text: "Reset your password",
        link: "https://mailgen.js/reset?s=b350163a1a010d9729feb74992c1a010",
      },
    },
    outro:
      "If you did not request a password reset, no further action is required on your part.",
  },
};
let mail = MailGenerator.generate(email);
var mailOptions = {
  from: "asesoria.psicologica.unitec@gmail.com",
  to: "pgisselle700@gmail.com",
  subject: "Sending Email using Node.js",
  html: mail,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
