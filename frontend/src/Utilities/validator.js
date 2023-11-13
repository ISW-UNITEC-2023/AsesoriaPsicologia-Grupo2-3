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
