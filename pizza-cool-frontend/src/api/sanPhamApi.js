// Cấu hình URL cơ sở cho API
const API_BASE_URL = "http://localhost:5000/api/sanpham";

/**
 * Lấy danh sách sản phẩm. Hỗ trợ lọc theo loại.
 * @param {string} loai (Tùy chọn) Loại sản phẩm cần lọc (ví dụ: 'pizza', 'my', 'ga')
 * @returns {Promise<Array>} Mảng các sản phẩm
 */
export async function getAllSanPham(loai) {
  // Bắt đầu với URL cơ sở
  let url = API_BASE_URL;

  // Nếu có tham số 'loai' được truyền vào, thêm nó vào URL
  if (loai) {
    url += `?loai=${loai}`;
  }

  // Thực hiện gọi API với URL đã được xây dựng
  const res = await fetch(url);

  if (!res.ok) {
    // Ném lỗi để component có thể bắt và xử lý
    const errorData = await res.json();
    throw new Error(errorData.message || "Không thể tải danh sách sản phẩm");
  }

  return res.json();
}

/**
 * Lấy thông tin một sản phẩm theo ID
 * @param {string} id ID của sản phẩm
 * @returns {Promise<Object>} Đối tượng sản phẩm
 */
export async function getSanPhamById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Không thể tải sản phẩm");
  }

  return res.json();
}
