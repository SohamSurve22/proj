const mongoose = require("mongoose");
require("dotenv").config();
const Detail = require("./models");

const sampleItems = [
  { itemName: "Paneer Butter Masala", category: "Main Course", price: 260, available: true },
  { itemName: "Veg Biryani", category: "Rice", price: 220, available: true },
  { itemName: "Margherita Pizza", category: "Pizza", price: 299, available: true },
  { itemName: "Masala Dosa", category: "South Indian", price: 140, available: true },
  { itemName: "Cold Coffee", category: "Beverage", price: 120, available: true }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Detail.deleteMany({});
    await Detail.insertMany(sampleItems);
    console.log("Sample Menu Data Inserted");
  } catch (err) {
    console.log("Seed Error:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
