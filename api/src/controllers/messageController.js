const cloudinary = require("../lib/cloudinary");
const {getReceiverSockerId, io} = require("../lib/socket");

const User = require("../models/userModel");
const Message = require("../models/messageModel");

exports.getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");

    return res.status(200).json({
      status: "success",
      users:filteredUsers,
    });
  } catch (err) {
    console.error(`Error in getting users for sidebar, ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;

    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json({
      status: "success",
      messages,
    });
  } catch (err) {
    console.error(`Error in getting messages, ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.sendMessage = async (req, res) => {
  console.log(req.body)
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    if (!newMessage)
      return res
        .status(400)
        .json({ status: "error", message: "Cannot send the message" });

    await newMessage.save();

    const receiverSocketId = getReceiverSockerId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    return res.status(201).json({ status: "success", message: newMessage });
  } catch (err) {
    console.error(`Error in sending message, ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
