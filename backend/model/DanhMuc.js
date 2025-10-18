const mongoose = require("mongoose");

const danhMucSchema = new mongoose.Schema(
  {
    tenDanhMuc: { type: String, required: true, unique: true },
    moTa: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DanhMuc", danhMucSchema);
