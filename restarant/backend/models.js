const mongoose = require("mongoose");

// QUICK EXAM EDIT:
// Add/remove fields here if your practical question changes.
const detailsSchema = new mongoose.Schema(
  {
    itemName: { type: String, default: "" },
    category: { type: String, default: "" },
    price: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    customerName: { type: String, default: "" },
    customerPhone: { type: String, default: "" },
    quantity: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    deliveryAddress: { type: String, default: "" },
    paymentMethod: { type: String, default: "" },
    paymentStatus: { type: String, default: "" },
    orderStatus: { type: String, default: "" }
  },
  { timestamps: true, collection: "details" }
);

module.exports = mongoose.model("Detail", detailsSchema);
