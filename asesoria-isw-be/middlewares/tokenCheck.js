const redis = require("../configs/redis");
const { getToken, setToken } = require("../Utils/token");

const tokenCheck = async (req, res, next) => {
  const redis_token = await redis.get("access_token");

  let token = redis_token;

  if (!redis_token || ["-1", "-2"].includes(redis_token)) {
    const { access_token, expires_in, error } = await getToken();

    if (error) {
      const { response, message } = error;
      return res
        .status(response?.status || 401)
        .json({ message: `Authentication Unsuccessful: ${message}` });
    }

    setToken({ access_token, expires_in });

    token = access_token;
  }

  req.headerConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return next();
};

module.exports = {
  tokenCheck,
};
