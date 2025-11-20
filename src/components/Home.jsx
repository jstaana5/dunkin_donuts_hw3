import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "./Footer";

export function Home({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1533910534207-90f31029a78e?...",
      alt: "Colorful Donuts",
    },
    {
      url: "https://images.unsplash.com/photo-1624300162366-51a5f2edce68?...",
      alt: "Glazed Donut",
    },
    {
      url: "https://images.unsplash.com/photo-1639710743616-c5dfaf1fbb2b?...",
      alt: "Chocolate Donut",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl mb-4" style={{ color: "#DD1467" }}>
          Welcome to Dunkin'
        </h1>
        <p className="text-2xl" style={{ color: "#FF6600" }}>
          Fuel your day with coffee & donuts!
        </p>

        {/* Sliding Carousel */}
        <div className="relative mt-8 overflow-hidden rounded-3xl shadow-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.alt}
                className="w-full h-96 object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Left button */}
          <button
            onClick={() =>
              setCurrentSlide(
                (currentSlide - 1 + carouselImages.length) % carouselImages.length
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: "#DD1467" }} />
          </button>

          {/* Right button */}
          <button
            onClick={() =>
              setCurrentSlide((currentSlide + 1) % carouselImages.length)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6" style={{ color: "#DD1467" }} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
