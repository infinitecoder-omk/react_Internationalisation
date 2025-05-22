// import { useEffect, useRef } from "react";

// const AutoScrollCarousel = ({ images }: { images: string[] }) => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (containerRef.current) {
//         containerRef.current.scrollBy({
//           left: containerRef.current.offsetWidth,
//           behavior: "smooth",
//         });

//         // Loop back if it's at the end
//         const maxScrollLeft =
//           containerRef.current.scrollWidth - containerRef.current.clientWidth;

//         if (
//           containerRef.current.scrollLeft >= maxScrollLeft - 5 // buffer
//         ) {
//           containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
//         }
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="overflow-hidden w-full">
//       <div
//         ref={containerRef}
//         className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
//       >
//         {images.map((img, idx) => (
//           <div
//             key={idx}
//             className="min-w-[200px] h-28 flex-shrink-0 border border-gray-300 rounded-xl overflow-hidden"
//           >
//             <img
//               src={img}
//               alt={`carousel-${idx}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AutoScrollCarousel;

import { useEffect, useRef, useState } from "react";

const AutoScrollCarousel = ({ images }: { images: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imageArray = images.split(',').map((img) => img.trim());

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
