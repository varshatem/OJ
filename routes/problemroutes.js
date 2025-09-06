
const express = require("express");
const router = express.Router();
const problemcontroller = require("../controllers/problemcontroller");
const authMiddleware = require("../middlewares/authMiddleware")
// Create a new problem
router.post("/create",authMiddleware, problemcontroller.createProblem);

// Get all problems
router.get("/", problemcontroller.getAllProblems);

// Get a single problem by ID
router.get("/:id", problemcontroller.getProblemById);

// Update a problem
router.put("/:id", authMiddleware, problemcontroller.updateProblem);

// Add a new sample to a problem
router.post("/:id/samples", authMiddleware, problemcontroller.addSample);

// Delete a problem
router.delete("/:id", authMiddleware, problemcontroller.deleteProblem);

router.put("/:id/samples", authMiddleware, problemcontroller.updateSample);
module.exports = router;
