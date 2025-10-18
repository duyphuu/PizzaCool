const express = require("express");
const {
  layTatCaSanPham,
  laySanPhamTheoId,
  themSanPham,
  capNhatSanPham,
  xoaSanPham,
} = require("../controllers/sanPhamController");

const router = express.Router();

// Route này giờ đây xử lý cả hai:
// 1. GET /api/sanpham (lấy tất cả)
// 2. GET /api/sanpham?loai=pizza (lọc theo loại)
router.get("/", layTatCaSanPham);
router.get("/:id", laySanPhamTheoId);
router.post("/", themSanPham);
router.put("/:id", capNhatSanPham);
router.delete("/:id", xoaSanPham);

module.exports = router;
