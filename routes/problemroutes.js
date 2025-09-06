
const express = require("express");
const router = express.Router();
const problemcontroller = require("../controllers/problemcontroller");
const adminAuthenticate= require("../middlewares/authMiddleware");
const authenticateToken = require("../middlewares/authMiddleware");
// Create a new problem
router.post("/create",adminAuthenticate, problemcontroller.createProblem);

// Get all problems
router.get("/", authenticateToken,problemcontroller.getAllProblems);

// Get a single problem by ID
router.get("/:id", authenticateToken,problemcontroller.getProblemById);

// Update a problem
router.put("/:id", adminAuthenticate, problemcontroller.updateProblem);

// Add a new sample to a problem
router.post("/:id/samples", adminAuthenticate, problemcontroller.addSample);

// Delete a problem
router.delete("/:id", adminAuthenticate, problemcontroller.deleteProblem);

router.put("/:id/samples", adminAuthenticate, problemcontroller.updateSample);
module.exports = router;
