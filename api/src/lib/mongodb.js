const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config({'path': './config.env'});

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log(`MongoDB connected to: ${conn.connection.name}`);
  } catch (err) {
    console.error(`Error connecting to MonogDB: ${err}`);
  }
};
