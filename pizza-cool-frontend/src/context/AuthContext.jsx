import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Bạn sẽ cần axios

// Tạo Context
const AuthContext = createContext();

// Tạo một hook tùy chỉnh để dễ dàng sử dụng context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// Tạo Provider (bộ bao bọc)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái tải

  // Kiểm tra localStorage khi app khởi động
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));

        // Cấu hình axios để tự động gửi token với mọi request
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error("Không thể tải trạng thái xác thực", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Hàm đăng nhập (nhận cả user và token từ API)
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    // Lưu vào localStorage để duy trì đăng nhập
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    // Gắn token vào header mặc định của axios cho các request sau
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenData}`;
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    setToken(null);

    // Xóa khỏi localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Gỡ token khỏi header axios
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token, // Biến boolean tiện lợi
    login,
    logout,
  };

  // Chỉ hiển thị children khi đã kiểm tra xong
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
