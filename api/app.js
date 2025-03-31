const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/v1", authRouter);

module.exports = app;
