const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./lib/mongodb");
const app = require("./app");


app.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
  connectDB();
});
