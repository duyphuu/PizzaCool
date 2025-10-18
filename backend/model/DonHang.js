const mongoose = require("mongoose");

const donHangSchema = new mongoose.Schema(
  {
    nguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
      required: true,
    },
    danhSachMon: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ChiTietDonHang" },
    ],
    tongTien: { type: Number, required: true },
    trangThai: {
      type: String,
      enum: ["cho_xu_ly", "dang_che_bien", "dang_giao", "hoan_tat", "huy"],
      default: "cho_xu_ly",
    },
    diaChiGiaoHang: { type: mongoose.Schema.Types.ObjectId, ref: "DiaChi" },
    phuongThucThanhToan: {
      type: String,
      enum: ["tien_mat", "the"],
      default: "tien_mat",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonHang", donHangSchema);
