const express = require("express");
const router = express.Router();
const { dangKy, dangNhap, layThongTin, capNhatThongTin } = require("../controllers/nguoiDungController");

router.post("/dangky", dangKy);
router.post("/dangnhap", dangNhap);
router.get("/:id", layThongTin);
router.put("/:id", capNhatThongTin);

module.exports = router;
