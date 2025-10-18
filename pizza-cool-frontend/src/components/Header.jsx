import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  // State để quản lý việc hiển thị menu trên mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Điều chỉnh linkClass để sử dụng màu trắng trên nền tối mới
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-white text-red-600" // Link đang active có nền trắng, chữ đỏ
        : "text-white hover:bg-white/20" // Link thường có chữ trắng, hover có nền trắng mờ
    }`;

  return (
    // THAY ĐỔI: Thay bg-white bằng màu gradient đỏ-cam của Footer
    // và bỏ shadow-sm vì nền đã tối
    <nav className="bg-gradient-to-r from-red-600 to-orange-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo và Tên thương hiệu */}
          <div className="flex-shrink-0">
            {/* THAY ĐỔI: Chuyển màu chữ logo thành trắng (text-white) */}
            <Link to="/" className="text-2xl font-bold text-white">
              🍕 PizzaCool
            </Link>
          </div>

          {/* Menu cho Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" className={linkClass}>
              Trang chủ
            </NavLink>
            <NavLink to="/menu" className={linkClass}>
              Menu
            </NavLink>
            <NavLink to="/cart" className={linkClass}>
              Giỏ hàng
            </NavLink>
            <NavLink to="/admin/products" className={linkClass}>
              Quản Lý
            </NavLink>
          </div>

          {/* Nút Hamburger cho Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              // THAY ĐỔI: Điều chỉnh màu icon và hover cho phù hợp với nền tối
              className="p-2 rounded-md text-white hover:bg-white/20 focus:outline-none focus:bg-white/30 focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon Hamburger và Dấu X vẫn dùng màu stroke mặc định (currentColor là white) */}
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu cho Mobile (hiển thị khi isMenuOpen là true) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Link trên Mobile đã được xử lý bằng linkClass */}
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/menu"
            className={linkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={linkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            Giỏ hàng
          </NavLink>
          <NavLink
            to="/admin/products"
            className={linkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            Quản Lý
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;
