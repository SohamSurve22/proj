const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    // Movie fields (used for movie records)
    movieName: String,
    genre: String,
    timing: String,
    price: Number,

    // Booking fields (used for booking records)
    customerName: String,
    selectedSeats: [String],
    paymentMethod: String,
    paymentStatus: String
  },
  { collection: "details" } // fixed single collection name
);

module.exports = mongoose.model("Detail", detailSchema);
