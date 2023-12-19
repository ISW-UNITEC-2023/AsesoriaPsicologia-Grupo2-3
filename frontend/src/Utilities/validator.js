const isEmail = (str) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(str);
};

function isPassword(str) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
}
export default {
  isEmail,
  isPassword,
};

export const formatDate = (announceDate) => {
  const date = new Date(announceDate);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("es-ES", options);
};