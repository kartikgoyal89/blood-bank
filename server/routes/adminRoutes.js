const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarListController,
  getOrgListController,
  getHospitalListController,
  deleteDonar,
  deleteHospital,
  deleteOrg,
} = require("../controllers/adminController");

// GET DONAR LIST
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController
);

// GET DONAR LIST
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);

// GET DONAR LIST
router.get(
  "/organisation-list",
  authMiddleware,
  adminMiddleware,
  getOrgListController
);

// DELETE DONAR
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonar
);

// DELETE HOSPITAL
router.delete(
  "/delete-hospital/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospital
);

// DELETE ORGANISATION
router.delete(
  "/delete-organisation/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrg
);

module.exports = router;
