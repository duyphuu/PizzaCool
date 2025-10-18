const express = require("express");
const {
  themDiaChi,
  layDiaChiNguoiDung,
  xoaDiaChi,
} = require("../controllers/diaChiController");
const router = express.Router();

router.post("/", themDiaChi);
router.get("/:idNguoiDung", layDiaChiNguoiDung);
router.delete("/:id", xoaDiaChi);

module.exports = router;
