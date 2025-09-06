
const express = require("express");
const router = express.Router();
const problemcontroller = require("../controllers/problemcontroller");

// Create a new problem
router.post("/create", problemcontroller.createProblem);

// Get all problems
router.get("/", problemcontroller.getAllProblems);

// Get a single problem by ID
router.get("/:id", problemcontroller.getProblemById);

// Update a problem
router.put("/:id", problemcontroller.updateProblem);

// Add a new sample to a problem
router.post("/:id/samples", problemcontroller.addSample);

// Delete a problem
router.delete("/:id", problemcontroller.deleteProblem);

module.exports = router;
