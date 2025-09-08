const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultcontroller");
const authenticateToken = require("../middlewares/authMiddleware");
// Get result (rank + stats) of a particular team in an event
router.get("/:event_id/team/:team_id", authenticateToken, resultController.getTeamResult);

module.exports = router;
