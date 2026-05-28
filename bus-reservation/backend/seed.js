const mongoose = require("mongoose");
require("dotenv").config();

const { Bus, Booking } = require("./models");

// QUICK EDIT FOR EXAM:
// - Modify buses array to match your question (routes, dates, price, seats)

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Bus.deleteMany({});
    await Booking.deleteMany({});

    const buses = [
      {
        busName: "Shivneri Express",
        source: "Mumbai",
        destination: "Pune",
        date: "2026-06-01",
        totalSeats: 40,
        availableSeats: 40,
        price: 450,
      },
      {
        busName: "Godavari Travels",
        source: "Mumbai",
        destination: "Nashik",
        date: "2026-06-01",
        totalSeats: 35,
        availableSeats: 35,
        price: 380,
      },
      {
        busName: "Konkan Rider",
        source: "Thane",
        destination: "Goa",
        date: "2026-06-02",
        totalSeats: 30,
        availableSeats: 30,
        price: 1200,
      },
      {
        busName: "Vidarbha Sleeper",
        source: "Pune",
        destination: "Nagpur",
        date: "2026-06-03",
        totalSeats: 36,
        availableSeats: 36,
        price: 950,
      },
      {
        busName: "Surat Shuttle",
        source: "Mumbai",
        destination: "Surat",
        date: "2026-06-01",
        totalSeats: 32,
        availableSeats: 32,
        price: 600,
      },
    ];

    const insertedBuses = await Bus.insertMany(buses);

    // QUICK EDIT FOR EXAM:
    // - Change sample names/methods if needed for viva demo.
    const sampleBookings = [
      {
        passengerName: "Rahul Patil",
        busId: insertedBuses[0]._id,
        seatNumber: 1,
        paymentMethod: "UPI",
        paymentStatus: "Paid",
      },
      {
        passengerName: "Sneha Joshi",
        busId: insertedBuses[1]._id,
        seatNumber: 2,
        paymentMethod: "Card",
        paymentStatus: "Paid",
      },
      {
        passengerName: "Amit Shah",
        busId: insertedBuses[2]._id,
        seatNumber: 3,
        paymentMethod: "Cash",
        paymentStatus: "Paid",
      },
    ];

    await Booking.insertMany(sampleBookings);
    console.log("Sample Bus Data Inserted");
    console.log("Sample Booking Data Inserted");
    process.exit(0);
  } catch (err) {
    console.log("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();

