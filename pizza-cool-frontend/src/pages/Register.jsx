import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    matKhau: "",
    soDienThoai: "",
    diaChi: "",
  });

  // errors per-field
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const emailRe = /^\S+@\S+\.\S+$/;
  const phoneRe = /^\d{9,11}$/;

  const validateField = (name, value) => {
    switch (name) {
      case "hoTen":
        if (!value || value.trim().length === 0) return "Họ tên là bắt buộc.";
        if (value.trim().length < 2) return "Họ tên quá ngắn.";
        return "";
      case "email":
        if (!value) return "Email là bắt buộc.";
        if (!emailRe.test(value)) return "Email không hợp lệ.";
        return "";
      case "matKhau":
        if (!value) return "Mật khẩu là bắt buộc.";
        if (value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
        return "";
      case "soDienThoai":
        if (!value) return "";
        if (!phoneRe.test(value)) return "Số điện thoại phải là 9-11 chữ số.";
        return "";
      case "diaChi":
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    // clear single field error while typing
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setGlobalError(null);
    setSuccess(null);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    // return boolean valid
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError(null);
    setSuccess(null);

    if (!validateAll()) {
      setGlobalError("Vui lòng sửa các lỗi trước khi tiếp tục.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/nguoidung/dangky", formData);
      setSuccess("Đăng ký thành công! Chuyển hướng tới trang đăng nhập...");
      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      setGlobalError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-pink-50 p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl border border-white/40 p-6 transition-transform transform hover:-translate-y-1">
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
            Tạo tài khoản mới
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Nhanh chóng, an toàn và dễ dàng
          </p>
        </div>

        {globalError && (
          <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
            {globalError}
          </div>
        )}

        {success && (
          <div className="mb-3 text-sm text-green-800 bg-green-50 border border-green-100 p-3 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          {/* Họ tên */}
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Họ tên *
            </label>
            <input
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.hoTen
                  ? "border-red-300 focus:ring-red-200"
                  : "border-slate-200 focus:ring-indigo-300"
              }`}
              placeholder="Nguyễn Văn A"
            />
            {errors.hoTen && (
              <p className="mt-1 text-xs text-red-600">{errors.hoTen}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Email *
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-300 focus:ring-red-200"
                  : "border-slate-200 focus:ring-indigo-300"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Mật khẩu */}
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
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.matKhau
                  ? "border-red-300 focus:ring-red-200"
                  : "border-slate-200 focus:ring-rose-300"
              }`}
              placeholder="Ít nhất 6 ký tự"
              autoComplete="new-password"
            />
            {errors.matKhau && (
              <p className="mt-1 text-xs text-red-600">{errors.matKhau}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Số điện thoại
            </label>
            <input
              name="soDienThoai"
              value={formData.soDienThoai}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.soDienThoai
                  ? "border-red-300 focus:ring-red-200"
                  : "border-slate-200 focus:ring-rose-200"
              }`}
              placeholder="Ví dụ: 0912345678"
            />
            {errors.soDienThoai && (
              <p className="mt-1 text-xs text-red-600">{errors.soDienThoai}</p>
            )}
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Địa chỉ
            </label>
            <input
              name="diaChi"
              value={formData.diaChi}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
              placeholder="Số nhà, đường, quận..."
            />
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
              "Đăng Ký"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500">
          <p>
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
          <p className="mt-2 text-xs">
            Bằng việc đăng ký bạn đồng ý với Điều khoản và Chính sách bảo mật.
          </p>
        </div>
      </div>
    </div>
  );
}
