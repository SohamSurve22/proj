const mongoose = require("mongoose");

// QUICK EDIT FOR EXAM:
// - Add/remove fields here if your practical question changes.

const BusSchema = new mongoose.Schema(
  {
    busName: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true }, // keep string to avoid date confusion in viva
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const BookingSchema = new mongoose.Schema(
  {
    passengerName: { type: String, required: true },
    busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    seatNumber: { type: Number, required: true },
    paymentMethod: { type: String, required: true }, // UPI / Card / Cash
    paymentStatus: { type: String, default: "Paid" }, // fake payment -> always Paid
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", BusSchema);
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = { Bus, Booking };
