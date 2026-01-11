const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, required: true, trim: true },
    mod: { type: mongoose.Schema.Types.ObjectId, ref: "Mod", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkSchema);