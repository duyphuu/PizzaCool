import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaGift, FaUserCircle } from "react-icons/fa"; // 🎁 Thêm icon User
import { useAuth } from "../context/AuthContext"; // <-- 1. Import hook Auth

function Header() {
  // State để quản lý việc hiển thị menu trên mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // <-- 2. Lấy trạng thái xác thực
  const { user, isAuthenticated, logout } = useAuth();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    logout(); // <-- Gọi hàm logout từ context
    setIsMenuOpen(false); // Đóng menu mobile
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };

  // Định nghĩa class cho NavLink (giữ nguyên)
  const linkClass = ({ isActive }) =>
    `block md:inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-white text-red-600" // Link đang active
        : "text-white hover:bg-white/20" // Link thường
    }`;

  // Class cho các mục không phải NavLink (như nút Đăng xuất, text Chào)
  const itemClass =
    "block md:inline-block px-3 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-white/20";

  // Class riêng cho text chào (không cần hover)
  const welcomeClass =
    "block md:inline-block px-3 py-2 rounded-md text-sm font-medium text-white";

  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              🍕 PizzaCool
            </Link>
          </div>

          {/* Menu cho Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavLink to="/" className={linkClass}>
              Trang chủ
            </NavLink>
            <NavLink to="/menu" className={linkClass}>
              Menu
            </NavLink>
            <NavLink to="/promo" className={linkClass}>
              <FaGift className="inline text-lg" /> Ưu đãi
            </NavLink>
            <NavLink to="/cart" className={linkClass}>
              Giỏ hàng
            </NavLink>

            {/* <-- 3. PHẦN HIỂN THỊ ĐỘNG (DESKTOP) --> */}
            {isAuthenticated ? (
              // ĐÃ ĐĂNG NHẬP
              <>
                {/* Chỉ admin mới thấy 'Quản Lý' */}
                {user?.vaiTro === "quan_tri" && (
                  <NavLink to="/admin/products" className={linkClass}>
                    Quản Lý
                  </NavLink>
                )}
                <span className={welcomeClass}>
                  <FaUserCircle className="inline -mt-1 mr-1" />
                  Chào, {user.hoTen}!
                </span>
                <button
                  onClick={handleLogout}
                  className={`${itemClass} cursor-pointer`}
                >
                  Đăng Xuất
                </button>
              </>
            ) : (
              // CHƯA ĐĂNG NHẬP
              <>
                <NavLink to="/login" className={linkClass}>
                  Đăng Nhập
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  Đăng Ký
                </NavLink>
              </>
            )}
            {/* <-- KẾT THÚC PHẦN ĐỘNG --> */}
          </div>

          {/* Nút Hamburger cho Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/20 focus:outline-none focus:bg-white/30"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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

      {/* Menu Mobile (Dropdown) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
            to="/promo"
            className={linkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            <FaGift className="inline text-lg" /> Ưu đãi
          </NavLink>
          <NavLink
            to="/cart"
            className={linkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            Giỏ hàng
          </NavLink>

          {/* <-- 4. PHẦN HIỂN THỊ ĐỘNG (MOBILE) --> */}
          {isAuthenticated ? (
            // ĐÃ ĐĂNG NHẬP
            <>
              {/* Chỉ admin mới thấy 'Quản Lý' */}
              {user?.vaiTro === "quan_tri" && (
                <NavLink
                  to="/admin/products"
                  className={linkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quản Lý
                </NavLink>
              )}
              <span className={welcomeClass}>
                <FaUserCircle className="inline -mt-1 mr-1" />
                Chào, {user.hoTen}!
              </span>
              <button
                onClick={handleLogout} // handleLogout đã bao gồm setIsMenuOpen(false)
                className={`${itemClass} w-full text-left cursor-pointer`}
              >
                Đăng Xuất
              </button>
            </>
          ) : (
            // CHƯA ĐĂNG NHẬP
            <>
              <NavLink
                to="/login"
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng Nhập
              </NavLink>
              <NavLink
                to="/register"
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng Ký
              </NavLink>
            </>
          )}
          {/* <-- KẾT THÚC PHẦN ĐỘNG --> */}
        </div>
      </div>
    </nav>
  );
}

export default Header;
