import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5000/api/sanpham";

function TrangSanPham() {
  const [sanPhams, setSanPhams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSanPhams();
  }, []);

  const fetchSanPhams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setSanPhams(response.data);
    } catch (err) {
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        Menu Pizza
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sanPhams.map((sp) => (
          <ProductCard
            key={sp._id}
            ten={sp.ten}
            moTa={sp.moTa}
            gia={sp.gia}
            hinhAnh={sp.hinhAnh}
            badge={sp.khuyenMai ? `-${sp.khuyenMai}%` : null} // nếu có khuyến mãi
            actions={
              <button
                className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                onClick={() => alert(`Bạn đã thêm ${sp.tenSP} vào giỏ hàng!`)}
              >
                Thêm vào giỏ
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default TrangSanPham;
