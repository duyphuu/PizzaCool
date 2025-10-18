const express = require("express");
const {
  taoDanhGia,
  layDanhGiaTheoSanPham,
} = require("../controllers/danhGiaController");
const router = express.Router();

router.post("/", taoDanhGia);
router.get("/sanpham/:id", layDanhGiaTheoSanPham);

module.exports = router;
