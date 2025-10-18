const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ThanhToan = require("../model/ThanhToan");
const DonHang = require("../model/DonHang");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Kết nối MongoDB thành công");

    const donHang = await DonHang.findOne();
    if (!donHang) {
      console.log("⚠️ Chưa có đơn hàng để thanh toán!");
      return mongoose.connection.close();
    }

    const thanhToan = await ThanhToan.create({
      donHang: donHang._id,
      phuongThuc: "tien_mat",
      trangThai: "da_thanh_toan",
    });

    console.log("🎉 Đã tạo thanh toán:", thanhToan);
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Lỗi:", err));
