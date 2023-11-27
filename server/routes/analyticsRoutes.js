const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  bloodGroupDetailsController,
} = require("../controllers/analyticsController");
// ROUTES

// GET ALL DONAR RECORDS || GET
router.get("/bloodGroups-data", authMiddleware, bloodGroupDetailsController);

module.exports = router;
