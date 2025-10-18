const MaGiamGia = require("../model/MaGiamGia");

exports.taoMaGiamGia = async (req, res) => {
  const mg = await MaGiamGia.create(req.body);
  res.status(201).json(mg);
};

exports.kiemTraMa = async (req, res) => {
  const { ma } = req.body;
  const mg = await MaGiamGia.findOne({ ma });
  if (!mg) return res.status(404).json({ message: "Mã không hợp lệ" });
  res.json(mg);
};
