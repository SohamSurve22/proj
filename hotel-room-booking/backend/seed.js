const mongoose = require("mongoose");
require("dotenv").config();
const { Detail } = require("./models");

// QUICK EDIT FOR EXAM:
// Students can modify the room numbers, pricing, or types here quickly.
const sampleRooms = [
  {
    roomNumber: "101",
    roomType: "Deluxe Room",
    price: 3000,
    available: true,
    customerName: null,
    checkInDate: null,
    checkOutDate: null,
    paymentMethod: null,
    paymentStatus: null
  },
  {
    roomNumber: "102",
    roomType: "AC Room",
    price: 2000,
    available: true,
    customerName: null,
    checkInDate: null,
    checkOutDate: null,
    paymentMethod: null,
    paymentStatus: null
  },
  {
    roomNumber: "103",
    roomType: "Non-AC Room",
    price: 1200,
    available: true,
    customerName: null,
    checkInDate: null,
    checkOutDate: null,
    paymentMethod: null,
    paymentStatus: null
  },
  {
    roomNumber: "104",
    roomType: "Suite Room",
    price: 5000,
    available: true,
    customerName: null,
    checkInDate: null,
    checkOutDate: null,
    paymentMethod: null,
    paymentStatus: null
  },
  {
    roomNumber: "105",
    roomType: "Single Room",
    price: 8000, // VIP / Premium single room
    available: true,
    customerName: null,
    checkInDate: null,
    checkOutDate: null,
    paymentMethod: null,
    paymentStatus: null
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear old data
    await Detail.deleteMany({});
    
    // Insert new sample room templates
    await Detail.insertMany(sampleRooms);
    
    console.log("Sample Room Data Inserted");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
