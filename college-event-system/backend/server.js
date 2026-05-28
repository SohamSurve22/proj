require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Detail = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err.message));

// Add a new event
app.post("/event", async (req, res) => {
  try {
    const event = new Detail({
      studentName: "",
      email: "",
      department: "",
      attendance: "",
      ...req.body
    });
    await event.save();
    res.json({ message: "Event Added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Detail.find({ studentName: "" }).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register a student to an event
app.post("/register", async (req, res) => {
  try {
    const registration = new Detail({
      ...req.body,
      eventDate: "",
      venue: "",
      organizer: "",
      maxParticipants: 0,
      attendance: "Absent" // Default so summary is easier
    });
    await registration.save();
    res.json({ message: "Registration Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View all participants
app.get("/participants", async (req, res) => {
  try {
    const participants = await Detail.find({ studentName: { $ne: "" } }).sort({
      createdAt: -1
    });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark attendance (Present/Absent)
app.post("/attendance", async (req, res) => {
  try {
    const { id, attendance } = req.body;
    await Detail.findByIdAndUpdate(id, { attendance });
    res.json({ message: "Attendance Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dashboard stats
app.get("/dashboard", async (req, res) => {
  try {
    const events = await Detail.find({ studentName: "" });
    const participants = await Detail.find({ studentName: { $ne: "" } });

    const totalEvents = events.length;
    const totalParticipants = participants.length;
    const upcomingEvents = events.filter(
      (e) => e.eventDate && new Date(e.eventDate) >= new Date()
    ).length;
    const presentCount = participants.filter(
      (p) => p.attendance === "Present"
    ).length;
    const absentCount = participants.filter((p) => p.attendance !== "Present").length;

    const participantCountByEvent = events.map((event) => ({
      eventName: event.eventName,
      count: participants.filter((p) => p.eventName === event.eventName).length
    }));

    res.json({
      totalEvents,
      totalParticipants,
      upcomingEvents,
      attendanceSummary: { present: presentCount, absent: absentCount },
      participantCountByEvent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
