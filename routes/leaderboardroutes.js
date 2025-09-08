const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

// Update leaderboard after a submission (called by judge after verdict)
router.post("/update", leaderboardController.updateLeaderboard);

// Get leaderboard for an event
router.get("/:event_id", leaderboardController.getLeaderboard);

module.exports = router;

