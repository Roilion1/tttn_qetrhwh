import { useState, useEffect } from "react";

const images = [
  "/images/banner1.png",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[600px] overflow-hidden relative">
      <img
        src={images[currentIndex]}
        alt="Banner"
        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />
    </div>
  );
}

export default Banner;
