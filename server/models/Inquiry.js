import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  service: { type: String, required: true },
  features: [{ type: String }],
  timeline: { type: String },
  budget: { type: String },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ["New", "In Progress", "Completed"], default: "New" }
}, { timestamps: true });

export default mongoose.model("Inquiry", inquirySchema);
