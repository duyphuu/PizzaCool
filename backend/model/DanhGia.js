const mongoose = require("mongoose");

const danhGiaSchema = new mongoose.Schema(
  {
    sanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SanPham",
      required: true,
    },
    nguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
      required: true,
    },
    diemDanhGia: { type: Number, min: 1, max: 5 },
    nhanXet: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DanhGia", danhGiaSchema);
