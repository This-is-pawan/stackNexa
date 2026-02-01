import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAppContext } from "../ContextApi";

const ProjectSlider = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const { theme } = useAppContext();
  const isFirst = current === 0;
  const isLast = current === images.length - 1;

  const prevSlide = () => {
    if (!isFirst) setCurrent((prev) => prev - 1);
  };
 
  const nextSlide = () => {
    if (!isLast) setCurrent((prev) => prev + 1);
  };

  return (
    <div
      className={`relative w-full overflow-hidden group
        h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80
        ${
          theme === "dark"
            ? "bg-gray-900"
            : "bg-black"
        }`}
    >
         <span
                className={`
                  absolute top-3 left-3 z-20
                  w-7 h-7 rounded-full text-xs font-bold
                  flex items-center justify-center
                  ${
                    theme === "dark"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }
                `}
              >
                {current}
              </span>

      {/* SLIDES */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`project-slide-${index}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        disabled={isFirst}
        className={`absolute left-3 top-1/2 -translate-y-1/2
          p-2 rounded-full bg-black/70 backdrop-blur
          transition-all
          ${
            isFirst
              ? "opacity-40 cursor-not-allowed"
              : "hover:scale-110 hover:border border-yellow-500"
          }`}
      >
        <FiChevronLeft size={16} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        disabled={isLast}
        className={`absolute right-3 top-1/2 -translate-y-1/2
          p-2 rounded-full bg-black/70 backdrop-blur
          transition-all
          ${
            isLast
              ? "opacity-40 cursor-not-allowed"
              : "hover:scale-110 hover:border border-yellow-500"
          }`}
      >
        <FiChevronRight size={16} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full cursor-pointer
              transition-all
              ${
                current === index
                  ? "bg-yellow-950 scale-110"
                  : "bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;