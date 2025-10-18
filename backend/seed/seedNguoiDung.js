const mongoose = require("mongoose");
const dotenv = require("dotenv");
const NguoiDung = require("../model/NguoiDung");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Kết nối MongoDB thành công");

    const user = await NguoiDung.create({
      hoTen: "Nguyễn Duy Phú",
      email: "nguyenduyphu@1309gmail.com",
      matKhau: "123",
      vaiTro: "khach_hang",
    });

    console.log("🎉 Đã thêm người dùng:", user);
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Lỗi:", err));
