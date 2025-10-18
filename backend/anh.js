const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const folderPath = "D:/images"; // thư mục local chứa ảnh
const cloudFolder = "pizzacool"; // folder trên Cloudinary

async function uploadImages() {
  const files = fs.readdirSync(folderPath);
  const uploadedUrls = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    if (fs.lstatSync(filePath).isFile()) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: cloudFolder,
        });
        uploadedUrls.push(result.secure_url);
        console.log("✅ Uploaded:", result.secure_url);
      } catch (err) {
        console.error("❌ Upload error:", err.message);
      }
    }
  }

  console.log("\n📸 Tất cả link ảnh đã upload:");
  uploadedUrls.forEach((url) => console.log(url));
}

uploadImages();
