const connectDB = require("./lib/mongodb");
const app = require("./app");

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
});
