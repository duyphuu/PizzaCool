import React, { useState, useEffect } from "react";

const images = [
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760701324/pizzacool/gdtepyvjhenxiykmv0ss.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760701338/pizzacool/f0stmocu3is6qk5o0q1k.jpg",
  "https://res-cloudinary.com/dj4qfnabu/image/upload/v1760701349/pizzacool/xehsntfevybjgaovvo4l.jpg",
  "https://res.cloudinary.com/dj4qfnabu/image/upload/v1760510475/pizzacool/djyc8e0a6niflnfqdvz8.png",
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (slideIndex) => {
    setCurrent(slideIndex);
  };

  return (
    <div className="relative w-full h-80 md:h-[420px] overflow-hidden shadow-lg bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center">
      {/* Slides */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          // Sử dụng object-cover để ảnh lấp đầy khung hình
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Navigation Arrows (Mũi tên điều hướng) */}
      <button
        onClick={prevSlide}
        // Thay đổi vị trí mũi tên: left-0 thay vì left-4
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-12 h-12 flex items-center justify-center transition focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        // Thay đổi vị trí mũi tên: right-0 thay vì right-4
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-12 h-12 flex items-center justify-center transition focus:outline-none"
      >
        &#10095;
      </button>

      {/* Indicators (Chấm chỉ mục) */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-red-600 w-8"
                : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
