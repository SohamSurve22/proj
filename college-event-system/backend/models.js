const mongoose = require("mongoose");

// Keep everything in one schema for exam simplicity.
const detailSchema = new mongoose.Schema(
  {
    studentName: { type: String, default: "" },
    email: { type: String, default: "" },
    department: { type: String, default: "" },
    eventName: { type: String, default: "" },
    eventDate: { type: String, default: "" },
    venue: { type: String, default: "" },
    organizer: { type: String, default: "" },
    maxParticipants: { type: Number, default: 0 },
    attendance: { type: String, default: "" }
  },
  { collection: "details", timestamps: true } // Important: force single collection name
);

module.exports = mongoose.model("Detail", detailSchema);
