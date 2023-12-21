const mongoose = require("mongoose");

const ValidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Validate = mongoose.model("Validate", ValidateSchema);
module.exports = Validate;
