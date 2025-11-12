import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Link } from "react-router-dom"; // Đảm bảo đã import Link

// --- Cấu hình API Backend ---
// Định nghĩa các loại sản phẩm, KHỚP VỚI GIÁ TRỊ ENUM trong Schema Mongoose
const API_BASE_URL = "http://localhost:5000/api/sanpham";
const productTypes = [
  { key: "pizza", label: "Pizza" },
  { key: "my", label: "Mì Ý" },
  { key: "ga", label: "Gà & Món Phụ" },
];

// --- Component Chính: ProductList ---
function ProductList() {
  const [sanPhams, setSanPhams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pizza");

  const fetchProducts = async (tab) => {
    try {
      setLoading(true);
      setError(null);

      // URL đã được sửa lại cho đúng với backend
      const apiUrl = `${API_BASE_URL}?loai=${tab}`;

      const response = await axios.get(apiUrl);
      setSanPhams(response.data);
    } catch (err) {
      if (err.response) {
        console.error("Lỗi từ server:", err.response.data);
      } else {
        console.error("Lỗi request:", err.message);
      }
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeTab);
  }, [activeTab]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-gray-50 py-10">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
        <p className="mt-4 text-lg text-gray-600">Đang tải menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 px-4 text-red-600 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  // --- Giao diện Tải dữ liệu / Lỗi ---
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-gray-50 py-10">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
        <p className="mt-4 text-lg text-gray-600">Đang tải menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 px-4 text-red-600 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  // --- Giao diện Chính ---
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* Thanh Tabs */}
        <div className="flex justify-start border-b border-gray-200 mb-8">
          {productTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setActiveTab(type.key)}
              className={`py-3 px-6 text-lg font-semibold ${
                activeTab === type.key
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-red-600"
              } focus:outline-none transition-colors duration-200`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sanPhams.length > 0 ? (
            sanPhams.map((sp) => (
              <ProductCard
                key={sp._id}
                _id={sp._id}
                ten={sp.ten}
                moTa={sp.moTa}
                gia={sp.gia}
                hinhAnh={sp.hinhAnh}
                // Bạn có thể cần truyền thêm trường 'loai' hoặc 'kichThuoc'
                // vào ProductCard nếu cần hiển thị chi tiết
                loai={sp.loai}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg py-10">
              Không có sản phẩm nào để hiển thị trong mục này.
            </div>
          )}
        </div>

        {/* Nút Xem Thêm (Chuyển hướng sang trang Menu) */}
        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-md"
          >
            Xem Thêm
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
