const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const cors = require("cors");

const modulosRouter = require("./routes/modulos.routes");
const userRouter = require("./routes/user.routes");

app.use(cors());
app.use("/modulos", modulosRouter);
app.use("/user", userRouter);

app.listen(3000);
