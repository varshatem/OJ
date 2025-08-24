const express = require("express");
const adminAuthenticate = require("../middlewares/adminMiddleware");
const multer = require("multer"); // Make sure this is correctly imported
const fs = require("fs");
const path = require("path");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);

module.exports = router;