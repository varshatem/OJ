const express = require('express');
require("dotenv").config();
const userController = require("../controllers/userController");
const router = express.Router();



router.post("/register", userController.registerUser);
router.post("/login", userController.Login);
router.post("/register-team", userController.RegisterTeam);
module.exports = router;
