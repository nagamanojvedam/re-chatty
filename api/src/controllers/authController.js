const bcrypt = require("bcryptjs");
const cloudinary = require("../lib/cloudinary");
const { generateToken } = require("../lib/utils");

const User = require("../models/userModel");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({
        status: "error",
        message: "Please provide all the required fields",
      });

    if (password.length < 8)
      return res.status(400).json({
        status: "error",
        message: "Password length must be atleast 8 characters",
      });

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        status: "error",
        message: "User already exists...Try logging in...",
      });

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      newUser.password = undefined;

      return res.status(201).json({
        status: "success",
        user: newUser,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Invalid user data",
      });
    }
  } catch (err) {
    console.err("Error in signup controller, ", err.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        status: "error",
        message: "Please provide all the required fields",
      });

    const user = await User.findOne({
      email,
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({
        status: "error",
        message: "Invalid user credentials...",
      });

    generateToken(user._id, res);

    return res.status(200).json({
      status: "success",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error(`Error in login controller: ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "Bye-Bye...", {
      maxAge: 10 * 1000,
    });
    return res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(`Error in logout controller: ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic)
      return res.status(400).json({
        status: "error",
        message: "Please provide all the fields",
      });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    return res.status(200).json({ status: "success", user: updatedUser });
  } catch (err) {
    console.error(`Error in update profile: ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", user: req.user });
  } catch (err) {
    console.error(`Error in check Auth controller, ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
