const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// GET leaderboard of all teams
router.get('/teams', leaderboardController.getTeamLeaderboard);

module.exports = router;
