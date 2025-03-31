const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      throw Error("Please provide all the required fields");

    const user = await User.findOne({ email });
    console.log(user);

    if (user) throw Error("User already exists...Try logging in...");

    if (password.length < 8)
      throw Error("Password length must be atleast 8 characters");

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const response = await newUser.save();

    return res.status(200).json({
      status: "success",
      user: response,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      throw Error("Please provide all the required fields");

    const { password: hashedPassword } = await User.findOne({ email }).select(
      "password"
    );

    if (!hashedPassword || !(await bcrypt.compare(password, hashedPassword)))
      throw Error("Invalid user credentials...");

    return res.status(200).json({
      status: "success",
      message: "user is logged successfully",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
