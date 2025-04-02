const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.use(authMiddleware.protect);
router.put("/update-profile", authController.updateProfile);
router.get("/check", authController.checkAuth);

module.exports = router;
