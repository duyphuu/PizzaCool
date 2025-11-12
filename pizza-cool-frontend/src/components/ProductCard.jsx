import React from "react";
import { useNavigate } from "react-router-dom";

const formatCurrency = (price) => {
  if (typeof price !== "number" && typeof price !== "string") return "N/A";
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return "N/A";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(numericPrice);
};

/**
 * ProductCard chuyên nghiệp kiểu e-commerce.
 * props: _id, ten, moTa, gia, giaCu (optional), hinhAnh, badge (optional), actions (optional)
 */
function ProductCard({ _id, ten, moTa, gia, giaCu, hinhAnh, badge, actions }) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    // Chuyển hướng sang trang chi tiết sản phẩm
    navigate(`/product/${_id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
      {/* Badge (Sale, New...) */}
      {badge && (
        <span className="absolute m-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
          {badge}
        </span>
      )}

      {/* Hình ảnh */}
      <div
        className="relative w-full h-56 overflow-hidden cursor-pointer"
        onClick={handleViewDetail}
      >
        <img
          src={hinhAnh}
          alt={ten}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/400x300.png?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Nội dung */}
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold text-gray-800 line-clamp-2 cursor-pointer hover:text-red-600 transition-colors"
          onClick={handleViewDetail}
        >
          {ten}
        </h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{moTa}</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-bold text-red-600">
            {formatCurrency(gia)}
          </span>
          {giaCu && (
            <span className="text-gray-400 text-sm line-through">
              {formatCurrency(giaCu)}
            </span>
          )}
        </div>

        {/* Nút Thêm vào giỏ */}
        {!actions && (
          <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Thêm vào giỏ
          </button>
        )}
      </div>

      {/* Footer action */}
      {actions && <div className="p-3 border-t border-gray-200">{actions}</div>}
    </div>
  );
}

export default ProductCard;
