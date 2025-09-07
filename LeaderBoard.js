// models/Leaderboard.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Leaderboard = sequelize.define("Leaderboard", {
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  problems: {
    type: DataTypes.ARRAY(
      DataTypes.JSONB // each entry { problem_id, score, accepted_time }
    ),
    defaultValue: [],
  },
  total_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Leaderboard;
