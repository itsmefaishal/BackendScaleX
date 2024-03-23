const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "name",
      require: true,
    },
    symbol: {
      type: String,
      default: "symbol",
      require: true,
    },
    address: {
      type: String,
      default: "none",
      require: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    volume: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

const tokens = mongoose.model("tokens", tokenSchema);

module.exports = tokens;
