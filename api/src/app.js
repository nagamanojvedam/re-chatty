const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

module.exports = app;
