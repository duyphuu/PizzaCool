// src/pages/Promo.jsx
import React, { useEffect, useState } from "react";
import maGiamGiaApi from "../api/maGiamGiaApi.js"; // chú ý .js nếu Vite yêu cầu

export default function Promo() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    maGiamGiaApi
      .getAllPromos()
      .then((data) => {
        setPromos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Lỗi tải mã giảm giá:", err);
        setError(err.message || "Lỗi tải dữ liệu");
        setPromos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách mã giảm giá</h1>

      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <>
          {promos.length > 0 ? (
            <ul className="space-y-2">
              {promos.map((p) => (
                <li
                  key={p._id}
                  className="border p-2 rounded-md flex justify-between"
                >
                  {/* dùng đúng field từ model: maCode & phanTramGiam */}
                  <span>{p.maCode}</span>
                  <span>Giảm {p.phanTramGiam}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có mã giảm giá nào</p>
          )}
        </>
      )}
    </div>
  );
}
