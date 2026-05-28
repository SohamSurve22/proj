const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Detail = require("./models");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err.message));

// Add new movie (admin)
app.post("/movie", async (req, res) => {
  try {
    const movie = await Detail.create({
      movieName: req.body.movieName,
      genre: req.body.genre,
      timing: req.body.timing,
      price: Number(req.body.price)
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Could not add movie" });
  }
});

// Get only movie records
app.get("/movies", async (_req, res) => {
  try {
    const movies = await Detail.find({
      $or: [{ customerName: { $exists: false } }, { customerName: null }, { customerName: "" }]
    }).sort({ _id: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Could not load movies" });
  }
});

// Create booking
app.post("/booking", async (req, res) => {
  try {
    // Students can quickly change paymentStatus default here
    const booking = await Detail.create({
      movieName: req.body.movieName,
      genre: req.body.genre,
      timing: req.body.timing,
      price: Number(req.body.price),
      customerName: req.body.customerName,
      selectedSeats: req.body.selectedSeats || [],
      paymentMethod: req.body.paymentMethod,
      paymentStatus: "Paid"
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Could not create booking" });
  }
});

// Get only booking records
app.get("/bookings", async (_req, res) => {
  try {
    const bookings = await Detail.find({
      customerName: { $exists: true, $ne: "" }
    }).sort({ _id: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Could not load bookings" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
