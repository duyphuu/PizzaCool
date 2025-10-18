const DanhGia = require("../model/DanhGia");

exports.taoDanhGia = async (req, res) => {
  try {
    const dg = await DanhGia.create(req.body);
    res.status(201).json(dg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.layDanhGiaTheoSanPham = async (req, res) => {
  const ds = await DanhGia.find({ sanPham: req.params.id }).populate(
    "nguoiDung"
  );
  res.json(ds);
};
