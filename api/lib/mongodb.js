const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log(`MongoDB connected to: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MonogDB: ${err}`);
  }
};
