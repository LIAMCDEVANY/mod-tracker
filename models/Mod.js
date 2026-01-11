const mongoose = require("mongoose");

const modSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    notes: { type: String, default: "" },
    links: { type: String, default: "" }, // MVP version; can normalize later with Link model
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mod", modSchema);