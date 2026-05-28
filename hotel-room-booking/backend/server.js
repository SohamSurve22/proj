const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import the single model
const { Detail } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// QUICK EDIT FOR EXAM:
// Change database settings in the backend/.env file (MONGO_URI, PORT)

// Connect to MongoDB
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
}

// ----------------- CRUD APIs -----------------

// 1. POST /room (Add a new Room - Admin Only)
app.post("/room", async (req, res) => {
  try {
    const { roomNumber, roomType, price, available } = req.body;
    
    // Create room document (customerName remains null)
    const newRoom = await Detail.create({
      roomNumber,
      roomType,
      price: Number(price),
      available: available !== undefined ? available : true,
      customerName: null,
      checkInDate: null,
      checkOutDate: null,
      paymentMethod: null,
      paymentStatus: null
    });
    
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: "Could not add room", error: err.message });
  }
});

// 2. GET /rooms (Fetch all Rooms)
// Returns all room documents (including booked ones) so status can be displayed.
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Detail.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch rooms", error: err.message });
  }
});

// 3. POST /booking (Book a Room)
// Updates the room document directly to mark it as booked and save customer details.
app.post("/booking", async (req, res) => {
  try {
    const { roomId, customerName, checkInDate, checkOutDate, paymentMethod } = req.body;

    // Find the room document
    const room = await Detail.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (!room.available) {
      return res.status(400).json({ message: "Room is not available for booking" });
    }

    // Update the room document with booking and payment info directly
    room.available = false;
    room.customerName = customerName;
    room.checkInDate = checkInDate;
    room.checkOutDate = checkOutDate;
    room.paymentMethod = paymentMethod;
    room.paymentStatus = "Paid"; // Fake payment is stored as Paid

    await room.save();

    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ message: "Booking failed", error: err.message });
  }
});

// 4. GET /bookings (Fetch all bookings)
// Returns documents where customerName is not null, which represent booked rooms.
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Detail.find({ customerName: { $ne: null } }).sort({ updatedAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch bookings", error: err.message });
  }
});

// 5. PUT /room/:id (Update Room Availability - Admin Only)
app.put("/room/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { available } = req.body;

    const room = await Detail.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.available = available;
    
    // If the room is marked as available (Checked Out / Canceled), clear booking info
    if (available) {
      room.customerName = null;
      room.checkInDate = null;
      room.checkOutDate = null;
      room.paymentMethod = null;
      room.paymentStatus = null;
    }
    
    await room.save();

    res.json(room);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

// Simple root check route
app.get("/", (req, res) => {
  res.send("Hotel Room Booking System API Running");
});

// Connect to DB and Start Server
connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server running on port", port));
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
  });
