const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const redis = require('./configs/redis');
const { tokenCheck } = require('./middlewares/tokenCheck');

(async () => {
  await redis.connect();
})();

redis.on('connect', (err) => {
  if (err) {
    console.log('Could not establish connection with redis');
  } else {
    console.log('Connected to redis successfully');
  }
});

app.use([
  express.json(),
  express.urlencoded({ extended: false }),
]);

require("dotenv").config();

const secretKey = process.env.SECRETKEY;

app.use(cookieParser(secretKey));

const allowedOrigins = ["Access-Control-Allow-Origin", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
      console.log("allowed");
    } else {
      console.log("error");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const adminRouter = require("./Route/admin-routes");
const sectionRouter = require("./Route/section-routes");
const modulosRouter = require("./Route/modules-routes");
const userRouter = require("./Route/users-routes");
const mailRouter = require("./Route/mail-routes");
const announceRouter = require("./Route/announce-routes");

app.use("/admins", adminRouter);
app.use("/sections", sectionRouter);
app.use("/modulos", modulosRouter);
app.use("/user", userRouter);
app.use("/mail", mailRouter);
app.use("/announce", announceRouter);


app.use('/api/users', tokenCheck, require('./Route/zoom/users'));
app.use('/api/meetings', tokenCheck, require('./Route/zoom/meetings'));
app.use('/api/webinars', tokenCheck, require('./Route/zoom/webinars'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server started!" + PORT);
});

const cleanup = async () => {
  debug('\nClosing HTTP server');
  await redis.del('access_token');
  server.close(() => {
    debug('\nHTTP server closed');
    redis.quit(() => process.exit());
  });
};

process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);