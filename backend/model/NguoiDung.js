const mongoose = require("mongoose");

const nguoiDungSchema = new mongoose.Schema(
  {
    hoTen: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    matKhau: { type: String, required: true },
    soDienThoai: String,
    diaChi: String,
     vaiTro: {
      type: String,
      enum: ["khach_hang", "quan_tri"],
      default: "khach_hang",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NguoiDung", nguoiDungSchema);
