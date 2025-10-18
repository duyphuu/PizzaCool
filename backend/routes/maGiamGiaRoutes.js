const express = require("express");
const {
  taoMaGiamGia,
  kiemTraMa,
} = require("../controllers/maGiamGiaController");
const router = express.Router();

router.post("/", taoMaGiamGia); // admin tạo mã mới
router.post("/kiemtra", kiemTraMa); // người dùng nhập mã

module.exports = router;
