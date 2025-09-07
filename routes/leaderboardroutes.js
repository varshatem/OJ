const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/LeaderBoardcontroller");
const authenticateToken = require("../middleware/authMiddleware"); // if you have auth

// 🔹 Get full leaderboard (all teams)
router.get("/", authenticateToken, leaderboardController.getLeaderboard);


router.post("/update", leaderboardController.updateLeaderboard);

module.exports = router;
