const express = require("express");
const router = express.Router();
const controller = require("../controllers/maGiamGiaController");

// ⚙️ CRUD cho mã giảm giá
router.get("/", controller.getAll); // Lấy tất cả
router.get("/:id", controller.getById); // Lấy 1 mã theo ID
router.post("/", controller.create); // Tạo mã mới
router.put("/:id", controller.update); // Cập nhật mã
router.delete("/:id", controller.remove); // Xóa mã

// ⚙️ API phụ (kiểm tra mã hợp lệ)
router.post("/kiemtra", controller.kiemTraMa);

module.exports = router;
