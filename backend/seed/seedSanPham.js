const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SanPham = require("../model/SanPham");

dotenv.config();

// ✅ Tất cả link ảnh Cloudinary (copy từ trên)
const imageLinks = [
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510372/pizzacool/mibu4rxmedw7vfocmnlb.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510373/pizzacool/svijamyak7jchzqissg2.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510375/pizzacool/vukm6shuhtuoacgku6q0.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510376/pizzacool/dkegkfxswf1kysb6l1lt.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510378/pizzacool/hucmrbl3jkpic0lbuobw.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510379/pizzacool/fwvqomdbah82k69k6hwh.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510380/pizzacool/hcxxvkx2lmu3ay1wkekb.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510381/pizzacool/ta5dhg3hp6omdkvxbtmo.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510382/pizzacool/jczibteaf5lgsxc0maps.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510383/pizzacool/dbnvy3y3ngdfvskvqfuh.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510386/pizzacool/gfijzvlnxgxfysq1prqc.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510391/pizzacool/ty9wd236aw077gdgfr9n.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510398/pizzacool/wc2afsdyvxvrvr2kfhqz.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510401/pizzacool/azu3cufvxrwu6aw8nysp.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510402/pizzacool/wnrli5wymubprmcrhaxx.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510408/pizzacool/tslflv8oo5bxtlgbiikk.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510409/pizzacool/b1zlxtsitjnhmlaybbrk.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510414/pizzacool/kollwnxnbr8c9abdn4fn.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510416/pizzacool/phfrm0zoaxg4pjqm5sjo.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510419/pizzacool/iqhzvemnauldjc4idrdp.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510430/pizzacool/py0ucfhrjvhqh9od6by0.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510436/pizzacool/niahytwom00rfixdvo1w.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510438/pizzacool/r3poc2elazdnb7sfwjhw.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510439/pizzacool/oavs5ccjgeprpfrreqfe.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510442/pizzacool/jdnchclzaqyyswqk5tl0.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510444/pizzacool/ebt7w4lwdzyhj7z1iaqm.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510445/pizzacool/umllhhratuixkc41elqk.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510448/pizzacool/v6p53psortxsxypgg8lj.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510449/pizzacool/flepdrbkm9z1zmevcgtt.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510452/pizzacool/oh6ceufmht25npxvmaz8.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510455/pizzacool/wlko3d7ajbhxec3qszlv.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510458/pizzacool/bf85ep9g0av85gjjrunw.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510461/pizzacool/gdykh7mkjz8v70dwrmlb.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510467/pizzacool/kgcvj82s9uvbhlougruq.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510469/pizzacool/fzg7fhpycwh2tzl7vvfp.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510475/pizzacool/djyc8e0a6niflnfqdvz8.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510479/pizzacool/f5o398edo0ru5h8g9qo9.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510481/pizzacool/gxlql29nlhr2sglgyeyf.png",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510482/pizzacool/n6czy7jhdwj27fo30xrt.png",
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Kết nối MongoDB thành công");

    await SanPham.deleteMany({});
    console.log("🧹 Đã xóa dữ liệu cũ trong collection SanPham.");

    const sanPhams = [
      {
        ten: "Gà Viên Phô Mai Đút Lò - Cheesy Chicken Popcorn",
        moTa: "Gà Viên Popcorn, Thịt Heo Xông Khói, Phô Mai Mozzarella, Xốt Pizza.",
        gia: 69000,
        hinhAnh: imageLinks[0],
        loai: "ga",
      },
      {
        ten: "Cánh Gà Phủ Xốt BBQ Kiểu Mỹ (4 miếng)",
        moTa: "Cánh Gà, Xốt BBQ",
        gia: 99000,
        hinhAnh: imageLinks[1],
        loai: "ga",
      },
      {
        ten: "Cánh Gà Phủ Xốt Hàn Quốc (4 Miếng) -",
        moTa: "Cánh Gà, Xốt Hàn Quốc.",
        gia: 99000,
        hinhAnh: imageLinks[2],
        loai: "ga",
      },
      {
        ten: "Mỳ Ý Bò Bằm Xốt Marinara - Bolognese Pasta",
        moTa: "Mỳ Ý, Xốt Bò Bằm, Bột Rong Biển, Bột Tỏi.",
        gia: 109000,
        hinhAnh: imageLinks[4],
        loai: "my",
      },
      {
        ten: "Gà Viên Xốt Hàn Quốc",
        moTa: "Gà Popcorn, Dứa, Cà Chua, Mè, Xốt Hàn Quốcm, phô mai.",
        gia: 69000,
        hinhAnh: imageLinks[3],
        loai: "ga",
      },
      {
        ten: "Mỳ Ý Rau Củ Xốt Marinara",
        moTa: "Mỳ Ý, Ớt Chuông Xanh, Nấm, Cà Chua, Dứa, Ô-Liu Đen, Xốt Marinara, Bột Rong Biển, Bột Tỏi",
        gia: 89000,
        hinhAnh: imageLinks[5],
        loai: "my",
      },
      {
        ten: "Mỳ Ý Thịt Heo Xông Khói Xốt Kem",
        moTa: "Mỳ Ý, Xốt Carbonara, Thịt Xông Khói, Bột Rong Biển, Bột Tỏi",
        gia: 1090000,
        hinhAnh: imageLinks[6],
        loai: "my",
      },
      {
        ten: "Mỳ Ý Tôm Xốt Marinara Cay",
        moTa: "Mỳ Ý, Hành Tây, Tôm, Xốt Marinara, Ớt Vẩy, Bột Rong Biển, Bột Tỏi",
        gia: 109000,
        hinhAnh: imageLinks[7],
        loai: "my",
      },
      {
        ten: "Mỳ Ý Xúc Xích Xốt Marinara",
        moTa: "Mỳ Ý, Xúc Xích Parsley, Thịt Xông Khói, Xúc Xích Pepperoni, Xốt Marinara, Bột Rong Biển, Bột Tỏi",
        gia: 109000,
        hinhAnh: imageLinks[8],
        loai: "my",
      },
      {
        ten: "Mỳ Ý Hải Sản Xốt Pesto ",
        moTa: "Mỳ Ý, Hành Tây, Mực Khoanh, Tôm Có Đuôi, Xốt Pesto, Bột Rong Biển, Bột Tỏi",
        gia: 109000,
        hinhAnh: imageLinks[9],
        loai: "my",
      },
      {
        ten: "Pizza 5 Loại Thịt Thượng Hạng",
        moTa: "Xốt Cà Chua, Phô Mai Mozzarella, Xúc Xích Pepperoni, Thịt Dăm Bông, Xúc Xich Ý, Thịt Heo Xông Khói",
        gia: 205000,
        hinhAnh: imageLinks[10],
        loai: "pizza",
      },

      {
        ten: "Pizza Bơ Gơ Bò Mỹ Xốt Phô Mai ",
        moTa: "Thịt Bò Bơ Gơ Nhập Khẩu, Thịt Heo Xông Khói, Xốt Phô Mai, Xốt Mayonnaise, Phô Mai Mozzarella, Phô Mai Cheddar, Cà Chua, Hành Tây, Nấm",
        gia: 250000,
        hinhAnh: imageLinks[11],
        loai: "pizza",
      },

      {
        ten: "Pizza Topping Bò Và Tôm Nướng Kiểu Mỹ ",
        moTa: "Tôm, Thịt Bò Mexico; Thêm Phô Mai Mozzarella, Cà Chua, Hành, Xốt Cà Chua, Xốt Mayonnaise Xốt Phô Mai",
        gia: 235000,
        hinhAnh: imageLinks[12],
        loai: "pizza",
      },
      {
        ten: "Pizza Dăm Bông Bắp Xốt Phô Mai",
        moTa: "Xốt Phô Mai, Phô Mai Mozzarella, Thịt Dăm Bông, Thịt Xông Khói, Bắp",
        gia: 175000,
        hinhAnh: imageLinks[13],
        loai: "pizza",
      },
      {
        ten: "Pizza Dăm Bông Dứa Kiểu Hawaii",
        moTa: "Xốt Cà Chua, Phô Mai Mozzarella, Thịt Dăm Bông, Thơm",
        gia: 175000,
        hinhAnh: imageLinks[14],
        loai: "pizza",
      },
      {
        ten: "Pizza Gà Phô Mai Thịt Heo Xông Khói",
        moTa: "Xốt Phô Mai, Gà Viên, Thịt Heo Xông Khói, Phô Mai Mozzarella, Cà Chua",
        gia: 175000,
        hinhAnh: imageLinks[15],
        loai: "pizza",
      },
      {
        ten: "Pizza Hải Sản Nhiệt Đới Xốt Tiêu",
        moTa: "Xốt tiêu đen, Phô Mai Mozzarella, Phô Mai Cheddar, Thơm, Hành Tây, Tôm, Mực",
        gia: 205000,
        hinhAnh: imageLinks[16],
        loai: "pizza",
      },

      {
        ten: "Pizza Hải Sản Xốt Cà Chua ",
        moTa: "Xốt Cà Chua, Phô Mai Mozzarella, Tôm, Mực, Thanh Cua, Hành Tây",
        gia: 205000,
        hinhAnh: imageLinks[17],
        loai: "pizza",
      },
      {
        ten: "Pizza Hải Sản Xốt Mayonnaise",
        moTa: "Xốt Mayonnaise , Phô Mai Mozzarella, Tôm, Mực, Thanh Cua, Hành Tây",
        gia: 205000,
        hinhAnh: imageLinks[18],
        loai: "pizza",
      },
      {
        ten: "Pizza Hải Sản Xốt Pesto Kem Chanh ",
        moTa: "Mưc Khoanh, Tôm Có Đuôi, Phô Mai Mozzarella, Cà Chua, Hành Tây, Xốt Pesto, Xốt Chanh, Parsley",
        gia: 225000,
        hinhAnh: imageLinks[19],
        loai: "pizza",
      },
      {
        ten: "Pizza Ngập Vị Phô Mai Hảo Hạng",
        moTa: "Phô Mai Cheddar, Phô Mai Mozzarella, Phô Mai Xanh Viên, Viền Phô Mai, Xốt Phô Mai Và Phục Vụ Cùng Mật Ong.",
        gia: 205000,
        hinhAnh: imageLinks[20],
        loai: "pizza",
      },
      {
        ten: "Pizza Phô Mai Thịt Heo Xông Khói",
        moTa: "Phô mai Mozzarella , Phô Mai Cheddar, Xốt 7 Loại Phô Mai Đặc Biệt, Thịt Heo Xông Khói, Thịt Heo Xông Khói Miếng",
        gia: 205000,
        hinhAnh: imageLinks[21],
        loai: "pizza",
      },
      {
        ten: "Pizza Phô Mai Truyền Thống ",
        moTa: "Xốt Cà Chua, phô Mai Mozzarella",
        gia: 155000,
        hinhAnh: imageLinks[22],
        loai: "pizza",
      },
      {
        ten: "Pizza Rau Củ Thập Cẩm",
        moTa: "Xốt Cà Chua, Phô Mai Mozzarella, Hành Tây, Ớt Chuông Xanh, Ô-liu, Nấm Mỡ, Cà Chua, Thơm (dứa)y",
        gia: 155000,
        hinhAnh: imageLinks[23],
        loai: "pizza",
      },
      {
        ten: "Pizza Siêu Topping Bơ Gơ Bò Mỹ Xốt Phô Mai ",
        moTa: "Tăng 50% lượng topping protein: Thịt Bò Bơ Gơ Nhập Khẩu, Thịt Heo Xông Khói; Thêm Xốt Phô Mai, Xốt Mayonnaise, Phô Mai Mozzarella, Phô Mai Cheddar, Cà Chua, Hành Tây, Nấm",
        gia: 235000,
        hinhAnh: imageLinks[24],
        loai: "pizza",
      },
      {
        ten: "Pizza Siêu Topping Bò Và Tôm Nướng Kiểu Mỹ",
        moTa: "Tăng 50% lượng topping protein: Tôm, Thịt Bò Mexico; Thêm Phô Mai Mozzarella, Cà Chua, Hành, Xốt Cà Chua, Xốt Mayonnaise Xốt Phô Maiy",
        gia: 235000,
        hinhAnh: imageLinks[25],
        loai: "pizza",
      },
      {
        ten: "Pizza Siêu Topping Dăm Bông Dứa Kiểu Hawaiian",
        moTa: "Tăng 50% lượng topping protein: Thịt Dăm Bông; Thêm Phô Mai Mozzarella, Dứa, Xốt Mayonnaise, Xốt Cà Chua",
        gia: 205000,
        hinhAnh: imageLinks[26],
        loai: "pizza",
      },
      {
        ten: "Pizza Siêu Topping Hải Sản Nhiệt Đới Xốt Tiêu",
        moTa: "Tăng 50% lượng topping protein: Tôm, Mực; Thêm Phô Mai Mozzarella, Phô Mai Cheddar, Thơm, Hành Tây, Xốt Mayonnaise, Xốt Tiêu Đen",
        gia: 205000,
        hinhAnh: imageLinks[27],
        loai: "pizza",
      },
      {
        ten: "Pizza Siêu Topping Hải Sản Xốt Mayonnaise",
        moTa: "Tăng 50% lượng topping protein: Tôm, Mực, Thanh Cua; Thêm Phô Mai Mozzarella, Xốt Mayonnaise, Húng Tây, Hành",
        gia: 245000,
        hinhAnh: imageLinks[28],
        loai: "pizza",
      },
      {
        ten: "Pizza Siêu Topping Xúc Xích Ý Truyền Thống ",
        moTa: "Tăng 50% lượng topping protein: Mưc Khoanh, Tôm Có Đuôi; Thêm Phô Mai Mozzarella, Cà Chua, Hành Tây, Xốt Pesto, Xốt Chanh, Parsley",
        gia: 245000,
        hinhAnh: imageLinks[29],
        loai: "pizza",
      },
      
      
    ];

    await SanPham.insertMany(sanPhams);
    console.log("🎉 Đã thêm toàn bộ sản phẩm PizzaCool thành công!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));
