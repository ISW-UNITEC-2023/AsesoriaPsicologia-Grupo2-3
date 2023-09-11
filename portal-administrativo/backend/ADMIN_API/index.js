const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

const adminRouter = require("./Route/adminRoute");
const sectionRouter = require("./Route/sectionRoute");
const modulosRouter = require("./Route/modulesRoute");
const userRouter = require("./Route/usersRoute");

app.use("/admins", adminRouter);
app.use("/sections", sectionRouter);
app.use("/modulos", modulosRouter);
app.use("/user", userRouter);
app.listen(3001);
