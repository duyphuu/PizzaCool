const express = require("express");
const {
  taoDonHang,
  layDonHangTheoNguoiDung,
  layTatCaDonHang,
  capNhatTrangThai,
} = require("../controllers/donHangController");
const router = express.Router();

router.post("/", taoDonHang);
router.get("/nguoidung/:id", layDonHangTheoNguoiDung);
router.get("/", layTatCaDonHang); // admin
router.put("/:id/trangthai", capNhatTrangThai); // admin

module.exports = router;
