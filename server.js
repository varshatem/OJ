const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { initSocket } = require('./SocketConnection');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const problemroutes = require('./routes/problemroutes');
const resultRoutes = require('./routes/resultRoutes');
const leaderboardRoutes = require('./routes/leaderboardroutes');
const submissionRoutes = require('./routes/submissionRoutes');
const app = express();
app.use(express.json());
app.use(cookieParser());

// Allow all origins
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const server = http.createServer(app);

// Routes
app.get("/", (req, res) => res.send("🚀 Online Judge API is running..."));
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/problems", problemroutes);
app.use("/results", resultRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/submission",submissionRoutes);
const PORT = process.env.PORT || 3000;

initSocket(server,{
    cors: {
        origin: allowedOrigins,
        credentials: true,
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
