import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import dotenv from "dotenv";
import { connectMONGODB } from "./config/db.js";


dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Hello!");
});


// routes here

import authRoutes from "./routes/auth.route.js"
import studentRoutes from "./routes/student.route.js";


app.use("/api/auth",authRoutes);
app.use("/api/student",studentRoutes)


const startServer = async () => {
  try {
    await connectMONGODB();
    console.log("✅ MongoDB connected");

    app.listen(9000, () => {
      console.log("🚀 Server running at http://localhost:9000");
    });

  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

startServer();


