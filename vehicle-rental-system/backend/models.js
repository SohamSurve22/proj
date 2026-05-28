const mongoose = require("mongoose");

// QUICK EXAM EDIT:
// Add/remove fields here if your practical question changes.
const detailsSchema = new mongoose.Schema(
  {
    vehicleName: { type: String, default: "" },
    brand: { type: String, default: "" },
    vehicleType: { type: String, default: "" },
    pricePerDay: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    customerName: { type: String, default: "" },
    rentalDays: { type: Number, default: 0 },
    totalCharge: { type: Number, default: 0 }
  },
  { timestamps: true, collection: "details" }
);

module.exports = mongoose.model("Detail", detailsSchema);
