const mongoose = require("mongoose");

const chiTietDonHangSchema = new mongoose.Schema({
  sanPham: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SanPham",
    required: true,
  },
  soLuong: { type: Number, required: true },
  donGia: { type: Number, required: true },
});

module.exports = mongoose.model("ChiTietDonHang", chiTietDonHangSchema);
