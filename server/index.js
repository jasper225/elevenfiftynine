const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const passport = require("./config/passport");
const { initSockets } = require("./sockets");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();
const httpServer = http.createServer(app);

// Socket.io
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
});
initSockets(io);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(cookieParser());

// Routes
app.use("/api/auth",      require("./routes/auth"));
app.use("/api/semesters", require("./routes/semesters"));
app.use("/api/boards",    require("./routes/boards"));
app.use("/api/lists",     require("./routes/lists"));
app.use("/api/cards",     require("./routes/cards"));
app.use("/api/users",     require("./routes/users"));

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Error handler
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
