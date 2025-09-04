const express = require("express");
const adminAuth= require("../middlewares/adminMiddleware");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/problems", adminAuth, adminController.getAllProblems);
router.get("/users", adminAuth, adminController.getAllUsers);

router.get("/teams", adminAuth, adminController.getAllTeams);

router.get("/problems", adminAuth, adminController.getAllProblems);
module.exports = router;

