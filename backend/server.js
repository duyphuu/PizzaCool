const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); 
const danhGiaRoutes = require("./routes/danhGiaRoutes"); 
const diaChiRoutes = require("./routes/diaChiRoutes");
const donHangRoutes = require("./routes/donHangRoutes");
const maGiamGiaRoutes = require("./routes/maGiamGiaRoutes");
const nguoiDungRoutes = require("./routes/nguoiDungRoutes");
const sanPhamRoutes = require("./routes/sanPhamRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/danhgia", danhGiaRoutes);
app.use("/api/diachi", diaChiRoutes);
app.use("/api/donhang", donHangRoutes);
app.use("/api/magiamgia", maGiamGiaRoutes);
app.use("/api/nguoidung", nguoiDungRoutes);
app.use("/api/sanpham", sanPhamRoutes);

// Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB Atlas thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Route test
app.get("/", (req, res) => {
  res.send("🍕 PizzaCool Backend đang hoạt động!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server đang chạy tại cổng ${PORT}`));
