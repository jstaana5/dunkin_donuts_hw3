import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "./Footer";

export function Home({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragTranslateRef = useRef(0);
  const wheelCooldownRef = useRef(null);

  const carouselImages = [
    { url: "/iphone_app.png", alt: "App" },
    { url: "/promo.jpg", alt: "Promo image" },
    { url: "/saugage.jpg", alt: "Sausage" },
    { url: "/meal-deal.jpg", alt: "Meal Deal" },
    { url: "/iced-latte.jpg", alt: "Iced Latte" },
    { url: "/doughnut-variety.jpg", alt: "Dougunuts" },
  ];

  useEffect(() => {
    // update container width for pixel-based transforms
    function updateWidth() {
      if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    // No auto-advance: user controls slides manually via drag, arrows, or slider.
    return () => {
      window.removeEventListener("resize", updateWidth);
      if (wheelCooldownRef.current) clearTimeout(wheelCooldownRef.current);
    };
  }, [carouselImages.length]);

  // sync currentSlide with scroll position so arrows/slider stay in sync
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      const scrollLeft = el.scrollLeft;
      const width = el.clientWidth || 1;
      const index = Math.round(scrollLeft / width);
      if (index !== currentSlide) setCurrentSlide(index);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [currentSlide]);

  useEffect(() => {
    // ensure width is measured after mount
    if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
  }, []);

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
          <div ref={containerRef} className="scroll-container">
            {carouselImages.map((img, index) => (
              <div key={index} className="scroll-item">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-96 object-cover rounded-2xl shadow-md"
                />
              </div>
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

        {/* Slider control placed below the images: drag to change slide */}
        <div className="mt-6 flex flex-col items-center">
          <div className="text-sm mb-2 text-gray-600">Drag the slider to move slides</div>
          <div className="w-full px-6">
            <div className="w-full md:w-3/5 mx-auto">
              <input
                aria-label="Slide position"
                type="range"
                min={0}
                max={carouselImages.length - 1}
                value={currentSlide}
                onChange={(e) => setCurrentSlide(Number(e.target.value))}
                className="slider-range w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
