import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", matKhau: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    if (!formData.email || !formData.matKhau) {
      setError("Vui lòng nhập đầy đủ Email và Mật khẩu.");
      return false;
    }
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(formData.email)) {
      setError("Email không hợp lệ.");
      return false;
    }
    if (formData.matKhau.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/nguoidung/dangnhap",
        formData
      );
      const { token, user } = response.data;

      login(user, token);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-pink-50 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-white/40 p-6">
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-400 to-rose-400 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"
              />
            </svg>
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-slate-700">
            Đăng nhập tài khoản
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Truy cập nhanh vào tài khoản của bạn
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Email *
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-600">
              <span>Mật khẩu *</span>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-xs text-indigo-600 hover:underline"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </label>
            <input
              name="matKhau"
              type={showPassword ? "text" : "password"}
              value={formData.matKhau}
              onChange={(e) =>
                setFormData({ ...formData, matKhau: e.target.value })
              }
              required
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="Nhập mật khẩu"
            />
            {/* Nút quên mật khẩu */}
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-xs text-rose-500 hover:text-rose-600 font-medium"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 px-4 py-2 text-white font-semibold shadow hover:shadow-lg disabled:opacity-60"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              "Đăng Nhập"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500">
          <p>
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
          <p className="mt-2 text-xs">
            Vui lòng giữ bí mật thông tin đăng nhập của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
