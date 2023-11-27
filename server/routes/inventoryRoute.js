const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganisationController,
  getInventoryHospitalController,
  getOrganisationForHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

// ROUTES

// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

// GET ALL BLOOD RECORDS || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

// GET ALL HOSPITAL BLOOD RECORDS || GET
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

// GET ALL DONAR RECORDS || GET
router.get("/get-donars", authMiddleware, getDonarsController);

// GET ALL HOSPITAL DETAILS || GET
router.get("/get-hospitals", authMiddleware, getHospitalsController);

// GET ORGANISATION DETAILS || GET
router.get("/get-organisation", authMiddleware, getOrganisationController);

// GET ORGANISATION DETAILS FOR HOSPITAL || GET
router.get(
  "/get-organisation-for-hospital",
  authMiddleware,
  getOrganisationForHospitalController
);

// GET TOP 3 INVENTORY PRODUCTS
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

module.exports = router;
