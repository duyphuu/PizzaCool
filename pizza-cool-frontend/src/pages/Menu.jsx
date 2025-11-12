import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5000/api/sanpham";

function TrangSanPham() {
  const [sanPhams, setSanPhams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loaiFilter, setLoaiFilter] = useState("tatca");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSanPhams();
  }, []);

  const fetchSanPhams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setSanPhams(response.data);
    } catch (err) {
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 👉 Lọc + Tìm kiếm + Sắp xếp
  const filteredSanPhams = sanPhams
    .filter((sp) => {
      const matchLoai = loaiFilter === "tatca" || sp.loai === loaiFilter;
      const matchSearch = sp.ten
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      return matchLoai && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.gia - b.gia;
      if (sortOrder === "desc") return b.gia - a.gia;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
        <p className="mt-4 text-lg text-gray-600">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-8">
        Menu PizzaCool
      </h1>

      {/* --- Bộ lọc + Tìm kiếm + Sắp xếp --- */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        {/* Ô tìm kiếm */}
        <input
          type="text"
          placeholder="🔍 Tìm món ăn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-red-500"
        />

        {/* Lọc theo loại */}
        <select
          value={loaiFilter}
          onChange={(e) => setLoaiFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
        >
          <option value="tatca">Tất cả món</option>
          <option value="pizza">Pizza</option>
          <option value="ga">Gà rán</option>
          <option value="my">Mỳ Ý</option>
        </select>

        {/* Sắp xếp theo giá */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
        >
          <option value="none">Sắp xếp</option>
          <option value="asc">Giá: Thấp đến Cao</option>
          <option value="desc">Giá: Cao đến Thấp</option>
        </select>
      </div>

      {/* --- Danh sách sản phẩm --- */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {filteredSanPhams.length === 0 ? (
        <p className="text-center text-gray-500">
          Không có sản phẩm nào phù hợp.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSanPhams.map((sp) => (
            <ProductCard
              key={sp._id}
              _id={sp._id}
              ten={sp.ten}
              moTa={sp.moTa}
              gia={sp.gia}
              hinhAnh={sp.hinhAnh}
              badge={sp.khuyenMai ? `-${sp.khuyenMai}%` : null}
              actions={
                <button
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  onClick={() => alert(`Đã thêm ${sp.ten} vào giỏ hàng!`)}
                >
                  Thêm vào giỏ
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TrangSanPham;
