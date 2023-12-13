const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const secretKey = process.env.SECRETKEY;
app.use(cookieParser(secretKey));

// REDIS
const redis = require("./configs/redis");
const { tokenCheck } = require("./middlewares/tokenCheck");
// (async () => {
//   try {
//     await redis.connect();
//   } catch (error) {
//     console.log("Redis ERROR: ",error);
//   }
// })();

redis.on("connect", () => console.log("Connected to redis succesfully"));
redis.on("error", (err) => console.log("Redis Client Error", err));

redis.connect();

// redis.on("connect", (err) => {
//   if (err) {
//     console.log("Could not establish connection with redis");
//   } else {
//     console.log("Connected to redis successfully");
//   }
// });

const allowedOrigins = ["Access-Control-Allow-Origin", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    // console.log(origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
      //console.log("allowed")
    } else {
      //console.log("error");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const usersRouter = require("./Routes/users-routes");
const rolesRouter = require("./Routes/roles-routes");
const privilegesRouter = require("./Routes/privileges-routes");
const patientsRouter = require("./Routes/patients-routes");
const courseRouter = require("./Routes/course-routes");
const sectionRouter = require("./Routes/sections-routes");
const clinicRouter = require("./Routes/clinics-routes");
const announcementRouter = require("./Routes/announcement-routes");
const fileRouter = require("./Routes/files-routes");
const mailRouter = require("./Routes/mail-routes");
const appointmentRouter = require("./Routes/appointment-routes");
const actionsRoutes = require("./Routes/actions-routes");
const documentsRoutes = require("./Routes/documents-routes");

//Rutas de Zoom
const zoomUsersRouter = require("./Routes/zoom/users");
const zoomMeetingsRouter = require("./Routes/zoom/meetings");
const zoomWebinarsRouter = require("./Routes/zoom/webinars");

// Zoom
app.use("/api/users", tokenCheck, zoomUsersRouter);
app.use("/api/meetings", tokenCheck, zoomMeetingsRouter);
app.use("/api/webinars", tokenCheck, zoomWebinarsRouter);

app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/privileges", privilegesRouter);
app.use("/patients", patientsRouter);
app.use("/sections", sectionRouter);
app.use("/actions", actionsRoutes);
app.use("/courses", courseRouter);
app.use("/clinics", clinicRouter);
app.use("/announcements", announcementRouter);
app.use("/files", fileRouter);
app.use("/mail", mailRouter);
app.use("/appointment", appointmentRouter);
app.use("/documents", documentsRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server started!");
});

const cleanup = async () => {
  debug("\nClosing HTTP server");
  await redis.del("access_token");
  server.close(() => {
    debug("\nHTTP server closed");
    redis.quit(() => process.exit());
  });
};

process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
