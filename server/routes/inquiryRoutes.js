import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, service, features = [], timeline, budget, message } = req.body;
    if (!name?.trim() || !email?.trim() || !service || !message?.trim()) {
      return res.status(400).json({ message: "Name, email, service and project description are required." });
    }
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) return res.status(400).json({ message: "Please provide a valid email address." });

    const inquiry = await Inquiry.create({
      name, email, service,
      features: Array.isArray(features) ? features : [],
      timeline, budget, message
    });
    res.status(201).json({ message: "Inquiry submitted successfully.", inquiryId: inquiry._id });
  } catch (error) {
    res.status(500).json({ message: "Unable to save inquiry." });
  }
});

router.get("/", async (req, res) => {
  try {
    if (!process.env.ADMIN_KEY || req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch inquiries." });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    if (!process.env.ADMIN_KEY || req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const allowed = ["New", "In Progress", "Completed"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid status." });
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found." });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Unable to update inquiry." });
  }
});

export default router;
