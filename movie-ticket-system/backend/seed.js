const mongoose = require("mongoose");
const Detail = require("./models");
require("dotenv").config();

const sampleMovies = [
  { movieName: "Project Hail Mary", genre: "Sci-Fi", timing: "10:00 AM", price: 250 },
  { movieName: "Interstellar", genre: "Sci-Fi", timing: "1:00 PM", price: 300 },
  { movieName: "Batman", genre: "Action", timing: "4:00 PM", price: 220 },
  { movieName: "Inception", genre: "Thriller", timing: "7:00 PM", price: 280 },
  { movieName: "F1", genre: "Sports", timing: "9:30 PM", price: 260 }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Detail.deleteMany({});
    await Detail.insertMany(sampleMovies);
    console.log("Sample Movie Data Inserted");
  } catch (error) {
    console.log("Seed Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

seedData();
