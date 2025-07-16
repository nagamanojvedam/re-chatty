const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path')

const authRouter = require("./routes/authRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../ui/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/dist','index.html'))
  })
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

module.exports = app;
