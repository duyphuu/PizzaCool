const NguoiDung = require("../model/NguoiDung");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Cấu hình
const JWT_SECRET = process.env.JWT_SECRET || "changeme"; // đặt trong .env
const JWT_EXPIRES_IN = "7d";

// Danh sách email admin (bạn có thể lưu vào env hoặc DB)
const ADMIN_EMAILS = ["nguyenduyphu1309@gmail.com"];

// Helper: loại bỏ matKhau khi trả về client
function hidePassword(userDoc) {
  if (!userDoc) return userDoc;
  const obj = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete obj.matKhau;
  return obj;
}

// Đăng ký
exports.dangKy = async (req, res) => {
  try {
    const { hoTen, email, matKhau, soDienThoai, diaChi } = req.body;

    if (!email || !matKhau || !hoTen) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    // kiểm tra tồn tại
    const exist = await NguoiDung.findOne({ email });
    if (exist)
      return res.status(409).json({ message: "Email đã được sử dụng" });

    // hash mật khẩu
    const hashed = await bcrypt.hash(matKhau, 10);

    // gán vai trò nếu email thuộc ADMIN_EMAILS
    const vaiTro = ADMIN_EMAILS.includes(email) ? "quan_tri" : "khach_hang";

    const nguoiDung = await NguoiDung.create({
      hoTen,
      email,
      matKhau: hashed,
      soDienThoai,
      diaChi,
      vaiTro,
    });

    res.status(201).json(hidePassword(nguoiDung));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Đăng nhập (trả về JWT)
exports.dangNhap = async (req, res) => {
  try {
    const { email, matKhau } = req.body;
    if (!email || !matKhau)
      return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });

    const user = await NguoiDung.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Sai thông tin đăng nhập" });

    const match = await bcrypt.compare(matKhau, user.matKhau);
    if (!match)
      return res.status(401).json({ message: "Sai thông tin đăng nhập" });

    const token = jwt.sign(
      { id: user._id, email: user.email, vaiTro: user.vaiTro },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.json({ token, user: hidePassword(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy thông tin (public hoặc có phân quyền tuỳ route)
exports.layThongTin = async (req, res) => {
  try {
    const user = await NguoiDung.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(hidePassword(user));
  } catch (err) {
    res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
};

// Cập nhật (chỉ owner hoặc admin)
exports.capNhatThongTin = async (req, res) => {
  try {
    const targetId = req.params.id;
    // yêu cầu middleware auth phải gắn req.user = { id, vaiTro, ... } từ token
    const requester = req.user;
    if (!requester) return res.status(401).json({ message: "Chưa xác thực" });

    // chỉ owner hoặc admin mới được cập nhật
    if (requester.id !== targetId && requester.vaiTro !== "quan_tri") {
      return res.status(403).json({ message: "Không có quyền" });
    }

    // nếu cập nhật mật khẩu, hash lại
    if (req.body.matKhau) {
      req.body.matKhau = await bcrypt.hash(req.body.matKhau, 10);
    }

    const user = await NguoiDung.findByIdAndUpdate(targetId, req.body, {
      new: true,
    });

    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.json(hidePassword(user));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
