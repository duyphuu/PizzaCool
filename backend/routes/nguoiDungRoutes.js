const express = require("express");
const router = express.Router();
const { dangKy, dangNhap, layThongTin, capNhatThongTin } = require("../controllers/nguoiDungController");
const { authenticate } = require("../middleware/auth");
router.post("/dangky", dangKy);
router.post("/dangnhap", dangNhap);
router.get("/:id", layThongTin);
router.put("/:id", authenticate, capNhatThongTin);

module.exports = router;
