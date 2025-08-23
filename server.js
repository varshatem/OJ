// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Database
const sequelize = require("./config/database");
const { syncDB } = require('./models');
// Routes
// const leaderboardRoutes = require("./routes/leaderboard");
// const submissionRoutes = require("./routes/submission");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
(async () => {
    await syncDB();
})();
// Routes
app.get("/", (req, res) => {
  res.send("🚀 Online Judge API is running...");
});
// app.use("/leaderboard", leaderboardRoutes);
// app.use("/submissions", submissionRoutes);

// Sync DB & Start server
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
  });
