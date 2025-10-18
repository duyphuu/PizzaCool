const NguoiDung = require("../model/NguoiDung");

// Đăng ký
exports.dangKy = async (req, res) => {
  try {
    const nguoiDung = await NguoiDung.create(req.body);
    res.status(201).json(nguoiDung);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Đăng nhập (đơn giản, không mã hóa mật khẩu)
exports.dangNhap = async (req, res) => {
  try {
    const { email, matKhau } = req.body;
    const user = await NguoiDung.findOne({ email, matKhau });
    if (!user)
      return res.status(401).json({ message: "Sai thông tin đăng nhập" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy thông tin
exports.layThongTin = async (req, res) => {
  try {
    const user = await NguoiDung.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
};

// Cập nhật
exports.capNhatThongTin = async (req, res) => {
  try {
    const user = await NguoiDung.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
