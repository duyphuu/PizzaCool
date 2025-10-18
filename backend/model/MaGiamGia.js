const mongoose = require("mongoose");

const maGiamGiaSchema = new mongoose.Schema(
  {
    maCode: { type: String, required: true, unique: true},
    phanTramGiam: { type: Number, required: true },
    hinhAnh: { type: String },
    ngayBatDau: Date,
    ngayKetThuc: Date,
    conHieuLuc: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaGiamGia", maGiamGiaSchema);
