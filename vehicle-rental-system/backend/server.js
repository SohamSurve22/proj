const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Detail = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// QUICK EXAM EDIT:
// Change PORT and MONGO_URI in backend/.env only.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err.message));

// Add vehicle (admin use)
app.post("/vehicle", async (req, res) => {
  try {
    const data = req.body;
    const vehicle = await Detail.create({
      vehicleName: data.vehicleName,
      brand: data.brand,
      vehicleType: data.vehicleType,
      pricePerDay: Number(data.pricePerDay),
      available: data.available !== false
    });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ message: "Could not add vehicle", error: err.message });
  }
});

// List + search vehicles
app.get("/vehicles", async (req, res) => {
  try {
    const { vehicleType = "", brand = "", price = "" } = req.query;
    const query = {
      vehicleName: { $ne: "" },
      vehicleType: new RegExp(vehicleType, "i"),
      brand: new RegExp(brand, "i")
    };
    if (price) query.pricePerDay = { $lte: Number(price) };
    const vehicles = await Detail.find(query).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch vehicles" });
  }
});

// Book rental
app.post("/booking", async (req, res) => {
  try {
    const { customerName, vehicleId, rentalDays } = req.body;
    const vehicle = await Detail.findById(vehicleId);
    if (!vehicle || !vehicle.vehicleName) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    if (!vehicle.available) {
      return res.status(400).json({ message: "Vehicle not available" });
    }

    const days = Number(rentalDays);
    const totalCharge = Number(vehicle.pricePerDay) * days;

    // Keep booking record as a NEW document in same collection "details"
    const booking = await Detail.create({
      vehicleName: vehicle.vehicleName,
      brand: vehicle.brand,
      vehicleType: vehicle.vehicleType,
      pricePerDay: vehicle.pricePerDay,
      available: vehicle.available,
      customerName,
      rentalDays: days,
      totalCharge
    });

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: "Booking failed", error: err.message });
  }
});

// Booking history
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Detail.find({ customerName: { $ne: "" } }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch bookings" });
  }
});

app.get("/", (req, res) => res.send("Vehicle Rental API Running"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
