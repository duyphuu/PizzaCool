const jwt = require("jsonwebtoken");
const NguoiDung = require("../model/NguoiDung");

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

exports.authenticate = async (req, res, next) => {
  let token;

  // Lấy token từ header: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Chưa xác thực, không có token" });
  }

  try {
    // Giải mã token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Gắn thông tin user (từ token) vào request
    // Hàm capNhatThongTin của bạn cần req.user = { id, vaiTro }
    req.user = {
      id: decoded.id,
      vaiTro: decoded.vaiTro,
      email: decoded.email,
    };

    next(); // Chuyển sang controller
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};
