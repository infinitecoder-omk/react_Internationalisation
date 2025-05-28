import { useEffect, useRef, useState } from "react";

const AutoScrollCarousel = ({ images }: { images: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const imageArray = images.split(",").map((img) => img.trim());

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timeoutRef.current!);
  }, [imageArray.length]);

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800 h-64 my-3">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageArray.map((img, idx) => (
          <div key={idx} className="w-full flex-shrink-0 h-64">
            <img
              src={img}
              alt={`carousel-${idx}`}
              className="w-full h-full object-cover transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
