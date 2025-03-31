const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then((connection) =>
    console.log(`MongoDB connected to host: ${connection.connection.host}`)
  )
  .catch((err) => console.log(`Unable to connect to MongoDb ${err}`));

app.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
});
