const mongoose = require("mongoose");
require("dotenv").config();
const Detail = require("./models");

const sampleVehicles = [
  { vehicleName: "Honda City", brand: "Honda", vehicleType: "Car", pricePerDay: 2200, available: true },
  { vehicleName: "Hyundai Creta", brand: "Hyundai", vehicleType: "Car", pricePerDay: 2600, available: true },
  { vehicleName: "Royal Enfield", brand: "Royal Enfield", vehicleType: "Bike", pricePerDay: 1200, available: true },
  { vehicleName: "Activa 6G", brand: "Honda", vehicleType: "Scooter", pricePerDay: 700, available: true },
  { vehicleName: "Tata Nexon", brand: "Tata", vehicleType: "Car", pricePerDay: 2000, available: true }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Detail.deleteMany({});
    await Detail.insertMany(sampleVehicles);
    console.log("Sample Vehicle Data Inserted");
  } catch (err) {
    console.log("Seed Error:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
