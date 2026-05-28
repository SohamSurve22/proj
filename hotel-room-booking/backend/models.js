const mongoose = require("mongoose");

// QUICK EDIT FOR EXAM:
// Students can add or remove fields in this single schema if the question changes.
// All room details and booking data reside in the same "details" collection.
const DetailSchema = new mongoose.Schema(
  {
    // --- Room Properties ---
    roomNumber: { type: String, required: true },
    roomType: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },

    // --- Booking Properties (will be null/empty for vacant rooms; populated for bookings) ---
    customerName: { type: String, default: null },
    checkInDate: { type: String, default: null },
    checkOutDate: { type: String, default: null },

    // --- Payment Properties ---
    paymentMethod: { type: String, default: null }, // UPI / Card / Cash
    paymentStatus: { type: String, default: null }, // "Paid" / null
  },
  { 
    collection: "details", // MUST be explicitly "details"
    timestamps: true       // Automatically adds createdAt and updatedAt
  }
);

// Create model based on the schema
const Detail = mongoose.model("Detail", DetailSchema);

module.exports = { Detail };
