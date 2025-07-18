import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { connectMONGODB } from "./config/db.js";
import { initSocket } from "./socket.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//router here
import authRoutes from "./routes/auth.route.js";
import studentRoutes from "./routes/student.route.js";

app.get("/", (req, res) => {
  res.send("Fee Management Server running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);

const server = http.createServer(app);
initSocket(server);

const startServer = async () => {
  try {
    await connectMONGODB();
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 9000;
    server.listen(PORT, () =>
      console.log(`🌐 Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

startServer();
