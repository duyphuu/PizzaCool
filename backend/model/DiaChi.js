const mongoose = require("mongoose");

const diaChiSchema = new mongoose.Schema(
  {
    nguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
      required: true,
    },
    duong: String,
    phuong: String,
    quan: String,
    thanhPho: String,
    soDienThoai: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiaChi", diaChiSchema);
