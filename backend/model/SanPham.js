const mongoose = require("mongoose");

const sanPhamSchema = new mongoose.Schema(
  {
    ten: { type: String, required: true },
    moTa: { type: String },
    gia: { type: Number, required: true },
    hinhAnh: { type: String }, // link ảnh hoặc URL ảnh
    loai: {
      type: String,
      enum: ["pizza","my","ga"],
      required: true,
    },
    kichThuoc: { type: String }, // ví dụ: nhỏ, vừa, lớn (chỉ dùng cho pizza)
    trangThai: { type: Boolean, default: true }, // còn bán hay không
  },
  { timestamps: true }
);

module.exports = mongoose.model("SanPham", sanPhamSchema);
