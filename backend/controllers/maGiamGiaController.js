// backend/controllers/maGiamGiaController.js
const MaGiamGia = require("../model/MaGiamGia"); // <-- hoặc "../models/MaGiamGia" nếu bạn đổi tên folder

// Lấy tất cả
exports.getAll = async (req, res) => {
  try {
    const list = await MaGiamGia.find();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1
exports.getById = async (req, res) => {
  try {
    const item = await MaGiamGia.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới
exports.create = async (req, res) => {
  try {
    const mg = await MaGiamGia.create(req.body);
    res.status(201).json(mg);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật
exports.update = async (req, res) => {
  try {
    const updated = await MaGiamGia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Xóa
exports.remove = async (req, res) => {
  try {
    await MaGiamGia.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Kiểm tra mã (user gửi mã để validate)
exports.kiemTraMa = async (req, res) => {
  try {
    const { ma } = req.body;
    const mg = await MaGiamGia.findOne({ maCode: ma });
    if (!mg) return res.status(404).json({ message: "Mã không hợp lệ" });
    res.json(mg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
