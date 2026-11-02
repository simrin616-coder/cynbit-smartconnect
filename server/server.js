
import dns from "node:dns";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import inquiryRoutes from "./routes/inquiryRoutes.js";

// DNS troubleshooting workaround
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",")
    : "http://localhost:5173"
}));

app.use(express.json({ limit: "20kb" }));

app.get("/", (_req, res) =>
  res.json({ message: "Cynbit SmartConnect API is running." })
);

app.use("/api/inquiries", inquiryRoutes);

const PORT = process.env.PORT || 5000;

try {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Add it to server/.env");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );

} catch (error) {
  console.error("Server startup failed:", error.message);
  process.exit(1);
}

