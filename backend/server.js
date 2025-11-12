const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import routes
const danhGiaRoutes = require("./routes/danhGiaRoutes");
const diaChiRoutes = require("./routes/diaChiRoutes");
const donHangRoutes = require("./routes/donHangRoutes");
const maGiamGiaRoutes = require("./routes/maGiamGiaRoutes");
const nguoiDungRoutes = require("./routes/nguoiDungRoutes");
const sanPhamRoutes = require("./routes/sanPhamRoutes");

// Import model để seed admin
const NguoiDung = require("./model/NguoiDung");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Định nghĩa route API
app.use("/api/danhgia", danhGiaRoutes);
app.use("/api/diachi", diaChiRoutes);
app.use("/api/donhang", donHangRoutes);
app.use("/api/magiamgia", maGiamGiaRoutes);
app.use("/api/nguoidung", nguoiDungRoutes);
app.use("/api/sanpham", sanPhamRoutes);

// Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Kết nối MongoDB Atlas thành công!");

    // 🧩 Tạo tài khoản admin mặc định nếu chưa tồn tại
    const adminEmail = "nguyenduyphu1309@gmail.com";
    const adminTonTai = await NguoiDung.findOne({ email: adminEmail });

    if (!adminTonTai) {
      const matKhauHash = await bcrypt.hash("123456789", 10); // hash mật khẩu
      await NguoiDung.create({
        hoTen: "Duy Phu",
        email: adminEmail,
        matKhau: matKhauHash,
        vaiTro: "quan_tri",
      });
      console.log("👑 Đã tạo tài khoản admin mặc định (Duy Phu)");
    } else {
      console.log("ℹ️ Admin đã tồn tại, bỏ qua tạo mới.");
    }
  })
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Route test
app.get("/", (req, res) => {
  res.send("🍕 PizzaCool Backend đang hoạt động!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server đang chạy tại cổng ${PORT}`));
