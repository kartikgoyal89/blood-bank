const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

// ADD INVENTORY || POST
const createInventoryController = async (req, res) => {
  try {
    // validation
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donor account!");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a Hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }

      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    // save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record added succesfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating inventory",
      error,
    });
  }
};

// GET ALL BLOOD RECORDS || POST
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel.find({
      organisation: req.body.userId,
    });
    return res.status(200).send({
      success: true,
      message: "Fetched all blood records succesfully!",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Blood Records",
      error,
    });
  }
};

// GET BLOOD RECORDS OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "fetched recent inventory data succesfully!",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting the recent inventory",
      error,
    });
  }
};

// GET DONAR RECORD
const getDonarsController = async (req, res) => {
  try {
    const organisation = await req.body.userId;
    // find donars
    const donarId = await inventoryModel.distinct("donar", {
      organisation,
    });
    // console.log(donarId);
    const donars = await userModel.find({ _id: { $in: donarId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record fetched Succesfully!",
      donars,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching Donar records!",
      error,
    });
  }
};

const getHospitalsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    // HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital data fetched succesfully!",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting hospital details",
      error,
    });
  }
};

// GET ORGANISATION CONTROLLER || GET
const getOrganisationController = async (req, res) => {
  try {
    // get donar id
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });
    // find organisation
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "fetched organisation records succesfully!",
      organisations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Organisation details",
      error,
    });
  }
};

// GET ORGANISATION FOR HOSPITAL CONTROLLER || GET
const getOrganisationForHospitalController = async (req, res) => {
  try {
    // get donar id
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    // find organisation
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "fetched hospital records succesfully!",
      organisations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Hospital details",
      error,
    });
  }
};

// GET HOSPITAL BLOOD RECORDS || POST
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel.find(req.body.filters);
    return res.status(200).send({
      success: true,
      message: "Fetched hospital consumer blood records succesfully!",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting hospital Blood Records",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
