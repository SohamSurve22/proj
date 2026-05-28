const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { Bus, Booking } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// QUICK EDIT FOR EXAM:
// - Change DB name/port in backend/.env (MONGO_URI, PORT)
// - Change sample data in seed.js

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
}

// --- BUS APIs ---
app.post("/bus", async (req, res) => {
  try {
    const b = req.body;
    const totalSeats = Number(b.totalSeats || 0);
    const bus = await Bus.create({
      busName: (b.busName || "").trim(),
      source: (b.source || "").trim(),
      destination: (b.destination || "").trim(),
      date: (b.date || "").trim(),
      totalSeats,
      availableSeats: Number(b.availableSeats ?? totalSeats), // auto set if not sent
      price: Number(b.price || 0),
    });
    res.json(bus);
  } catch (err) {
    res.status(400).json({ message: "Could not add bus", error: err.message });
  }
});

app.get("/buses", async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch buses" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const { source = "", destination = "", date = "" } = req.query;
    const q = {
      source: new RegExp("^" + source.trim(), "i"),
      destination: new RegExp("^" + destination.trim(), "i"),
      date: new RegExp("^" + date.trim(), "i"),
    };
    const buses = await Bus.find(q).sort({ createdAt: -1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

// --- BOOKING APIs ---
app.post("/booking", async (req, res) => {
  try {
    const { passengerName, busId, paymentMethod } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    if (bus.availableSeats <= 0)
      return res.status(400).json({ message: "No seats available" });

    // Simple seat number logic for exam:
    // First booking => seat 1, next => seat 2...
    const seatNumber = bus.totalSeats - bus.availableSeats + 1;

    // Reduce seats
    bus.availableSeats = bus.availableSeats - 1;
    await bus.save();

    await Booking.create({
      passengerName: (passengerName || "").trim(),
      busId,
      seatNumber,
      paymentMethod,
      paymentStatus: "Paid",
    });

    // Return populated booking as generated ticket
    const ticket = await Booking.findOne({ busId, seatNumber, passengerName })
      .sort({ createdAt: -1 })
      .populate("busId");
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: "Booking failed", error: err.message });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    // Booking history from same bus_db database
    const bookings = await Booking.find()
      .populate("busId")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch bookings" });
  }
});

// Health check (optional but helpful in exams)
app.get("/", (req, res) => res.send("Bus Reservation API Running"));

connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server running on port", port));
  })
  .catch((err) => {
    console.log("DB connection error:", err.message);
  });

