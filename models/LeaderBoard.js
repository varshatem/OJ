// models/Leaderboard.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Leaderboard = sequelize.define("Leaderboard", {
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "events",
      key: "id",
    },
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
