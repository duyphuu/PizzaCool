// const mongoose = require("mongoose");
// // const dotenv = require("dotenv");
// const { MaGiamGia } = require("../model/MaGiamGia.js");

// // dotenv.config();

// const imageLinks = [
// "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510475/pizzacool/djyc8e0a6niflnfqdvz8.png",
//   "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510479/pizzacool/f5o398edo0ru5h8g9qo9.png",
//   "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510481/pizzacool/gxlql29nlhr2sglgyeyf.png",
//   "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510482/pizzacool/n6czy7jhdwj27fo30xrt.png",
// ];
// // mongoose
// //   .connect(
// //     "mongodb+srv://team_10:team_10_123456789@cluster0.oygpp4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// //   )
// //   .then(async () => console.log("✅ Kết nối MongoDB thành công"))
// //   .catch((err) => console.log("❌ Lỗi kết nối MongoDB:", err));

// const danhSachMaGiamGia = [
//   {
//     maCode: "ONE GET ONE",
//     phanTramGiam: 100,
//     hinhAnh:imageLinks[0],
//     ngayBatDau: new Date("2025-10-01"),
//     ngayKetThuc: new Date("2025-12-31"),
//     conHieuLuc: true,
//   },
//   {
//     maCode: "DISSCOUT 70%",
//     phanTramGiam: 20,
//     hinhAnh:imageLinks[1],
//     ngayBatDau: new Date("2025-09-01"),
//     ngayKetThuc: new Date("2025-11-30"),
//     conHieuLuc: true,
//   },
//   {
//     maCode: "50% CHAY",
//     phanTramGiam: 15,
//     hinhAnh:imageLinks[2],
//     ngayBatDau: new Date("2025-10-10"),
//     ngayKetThuc: new Date("2025-12-10"),
//     conHieuLuc: true,
//   },
// ];
// async function main() {
//   try {
//     // await connect để chắc chắn connect xong trước khi seed
//     await mongoose.connect(
//       process.env.MONGODB_URI ||
//         "mongodb+srv://team_10:team_10_123456789@cluster0.oygpp4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//       {
//         // tùy chọn nên có
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log("✅ Kết nối MongoDB thành công");

//     // Xóa rồi chèn. ordered:false để tiếp tục nếu 1 bản ghi lỗi (vẫn trả lỗi tổng)
//     // await MaGiamGia.deleteMany({});
//     // console.log("🗑️ Đã xóa tất cả mã giảm giá cũ");

//     const res = await MaGiamGia.insertMany(danhSachMaGiamGia, {
//       ordered: false,
//     });
//     console.log(
//       "✅ Đã thêm dữ liệu mã giảm giá mới thành công!",
//       res.length,
//       "bản ghi"
//     );

//     await mongoose.connection.close();
//     console.log("🔒 Đóng kết nối");
//   } catch (error) {
//     // Log lỗi chi tiết để biết tại sao
//     console.error("❌ Lỗi khi seed mã giảm giá:");
//     console.error("name:", error.name);
//     console.error("message:", error.message);

//     // Nếu là ValidationError, in chi tiết từng field
//     if (error.name === "ValidationError") {
//       for (const key in error.errors) {
//         console.error(` - Field "${key}":`, error.errors[key].message);
//       }
//     }

//     // Nếu là duplicate key (E11000) in ra key pattern
//     if (error.code === 11000) {
//       console.error(
//         "Duplicate key error details:",
//         error.keyValue || error.message
//       );
//     }

//     // In stack để debug
//     console.error(error.stack);

//     try {
//       await mongoose.connection.close();
//     } catch (e) {
//       // ignore
//     }
//     process.exit(1); // exit with failure
//   }
// }

// main();
// // const seedMaGiamGia = async () => {
// //   try {
// //     // await MaGiamGia.deleteMany({});
// //     // console.log("🗑️ Đã xóa tất cả mã giảm giá cũ");

// //     await MaGiamGia.insertMany(danhSachMaGiamGia);
// //     console.log("✅ Đã thêm dữ liệu mã giảm giá mới thành công!");

// //     mongoose.connection.close();
// //   } catch (error) {
// //     console.log("❌ Lỗi khi seed mã giảm giá:", error);
// //     mongoose.connection.close();
// //   }
// // };

// // seedMaGiamGia();
const mongoose = require("mongoose");
const  MaGiamGia  = require("../model/MaGiamGia.js");

const imageLinks = [
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510475/pizzacool/djyc8e0a6niflnfqdvz8.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510479/pizzacool/f5o398edo0ru5h8g9qo9.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510481/pizzacool/gxlql29nlhr2sglgyeyf.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510482/pizzacool/n6czy7jhdwj27fo30xrt.png",
];

const danhSachMaGiamGia = [
  {
    maCode: "ONE GET ONE",
    phanTramGiam: 100,
    hinhAnh: imageLinks[0],
    ngayBatDau: new Date("2025-10-01"),
    ngayKetThuc: new Date("2025-12-31"),
    conHieuLuc: true,
  },
  {
    maCode: "DISCOUNT 70%", // ✅ SỬA: Typo + khớp %
    phanTramGiam: 70, // ✅ SỬA: 70%
    hinhAnh: imageLinks[1],
    ngayBatDau: new Date("2025-09-01"),
    ngayKetThuc: new Date("2025-11-30"),
    conHieuLuc: true,
  },
  {
    maCode: "50% CHAY",
    phanTramGiam: 50, // ✅ SỬA: Khớp với tên code
    hinhAnh: imageLinks[2],
    ngayBatDau: new Date("2025-10-10"),
    ngayKetThuc: new Date("2025-12-10"),
    conHieuLuc: true,
  },
];

async function main() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://team_10:team_10_123456789@cluster0.oygpp4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      // ✅ BỎ options deprecated
    );
    console.log("✅ Kết nối MongoDB thành công");

    // Uncomment nếu muốn xóa data cũ
    await MaGiamGia.deleteMany({});
    console.log("🗑️ Đã xóa tất cả mã giảm giá cũ");

    const res = await MaGiamGia.insertMany(danhSachMaGiamGia, {
      ordered: false,
    });
    console.log(
      "✅ Đã thêm dữ liệu mã giảm giá mới thành công!",
      res.length,
      "bản ghi"
    );

    await mongoose.connection.close();
    console.log("🔒 Đóng kết nối");
  } catch (error) {
    console.error("❌ Lỗi khi seed mã giảm giá:");
    console.error("name:", error.name);
    console.error("message:", error.message);

    if (error.name === "ValidationError") {
      for (const key in error.errors) {
        console.error(` - Field "${key}":`, error.errors[key].message);
      }
    }

    if (error.code === 11000) {
      console.error(
        "Duplicate key error details:",
        error.keyValue || error.message
      );
    }

    console.error(error.stack);

    try {
      await mongoose.connection.close();
    } catch (e) {}
    process.exit(1);
  }
}

main();