const DiaChi = require("../model/DiaChi");

exports.themDiaChi = async (req, res) => {
  const dc = await DiaChi.create(req.body);
  res.status(201).json(dc);
};

exports.layDiaChiNguoiDung = async (req, res) => {
  const ds = await DiaChi.find({ nguoiDung: req.params.idNguoiDung });
  res.json(ds);
};

exports.xoaDiaChi = async (req, res) => {
  await DiaChi.findByIdAndDelete(req.params.id);
  res.json({ message: "Đã xóa địa chỉ" });
};
