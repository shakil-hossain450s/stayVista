const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    guest: {
      name: { type: String, required: true },
    },
    host: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      image: { type: String },
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
