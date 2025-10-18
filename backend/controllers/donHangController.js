const DonHang = require("../model/DonHang");
const ChiTietDonHang = require("../model/ChiTietDonHang");

// --- 1. TẠO ĐƠN HÀNG (Tối ưu hiệu suất) ---
exports.taoDonHang = async (req, res) => {
  try {
    const { nguoiDung, tongTien, diaChi, chiTiet } = req.body;

    // 1. Tạo Đơn hàng chính (phải chạy trước để lấy donHang._id)
    const donHang = await DonHang.create({ nguoiDung, tongTien, diaChi });

    // 2. LƯU CHI TIẾT ĐƠN HÀNG SONG SONG (Promise.all)
    // Tạo một mảng các Promises, mỗi Promise là một lệnh tạo ChiTietDonHang
    const chiTietPromises = chiTiet.map((sp) => {
      // Liên kết chi tiết với ID đơn hàng vừa tạo
      return ChiTietDonHang.create({ donHang: donHang._id, ...sp });
    });

    // Chờ tất cả các thao tác tạo chi tiết hoàn thành cùng lúc (nhanh hơn for...await)
    await Promise.all(chiTietPromises);

    res.status(201).json(donHang);
  } catch (err) {
    // Trả về lỗi nếu có vấn đề về validation hoặc dữ liệu
    res.status(400).json({ message: err.message });
  }
};

// --- 2. LẤY ĐƠN HÀNG THEO NGƯỜI DÙNG ---
exports.layDonHangTheoNguoiDung = async (req, res) => {
  try {
    const donHang = await DonHang.find({ nguoiDung: req.params.id })
      .populate("nguoiDung") // Lấy thông tin người dùng
      // THÊM: Populate chi tiết đơn hàng để xem sản phẩm đã mua
      .populate({
        path: "chiTiet", // Tên trường tham chiếu trong schema DonHang (nếu có)
        model: "ChiTietDonHang", // Model của chi tiết
      })
      .sort({ createdAt: -1 }); // Sắp xếp theo đơn hàng mới nhất

    if (!donHang.length) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng nào cho người dùng này." });
    }

    res.json(donHang);
  } catch (err) {
    res.status(500).json({ message: "Lỗi Server: " + err.message });
  }
};

// --- 3. LẤY TẤT CẢ ĐƠN HÀNG (Cho Admin) ---
exports.layTatCaDonHang = async (req, res) => {
  try {
    const donHangs = await DonHang.find()
      .populate("nguoiDung") // Lấy thông tin người dùng
      // THÊM: Populate chi tiết đơn hàng
      .populate({
        path: "chiTiet",
        model: "ChiTietDonHang",
      })
      .sort({ createdAt: -1 });

    res.json(donHangs);
  } catch (err) {
    res.status(500).json({ message: "Lỗi Server: " + err.message });
  }
};

// --- 4. CẬP NHẬT TRẠNG THÁI (Cho Admin) ---
exports.capNhatTrangThai = async (req, res) => {
  try {
    const dh = await DonHang.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Dùng $set để chỉ cập nhật các trường được gửi lên
      {
        new: true, // Trả về đối tượng sau khi cập nhật
        runValidators: true, // Chạy lại các validation của Mongoose
      }
    );

    if (!dh) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng để cập nhật." });
    }

    res.json(dh);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// --- 5. XÓA ĐƠN HÀNG (Cho Admin) ---