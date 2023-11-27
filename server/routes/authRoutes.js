const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// GET CURRENT USER
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
