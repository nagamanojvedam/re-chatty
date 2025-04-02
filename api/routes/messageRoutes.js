const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const messageController = require("../controllers/messageController");
const router = express.Router();

router.use(authMiddleware.protect);
router.get("/users", messageController.getUsersForSidebar);

router.get("/:id", messageController.getMessages);
router.post("/send/:id", messageController.sendMessage);

module.exports = router;
