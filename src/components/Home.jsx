import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "./Footer";

export function Home({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const carouselImages = [
    { url: import.meta.env.BASE_URL + "iphone_app.png", alt: "App" },
    { url: import.meta.env.BASE_URL + "promo.jpg", alt: "Promo image" },
    { url: import.meta.env.BASE_URL + "saugage.jpg", alt: "Sausage" },
    { url: import.meta.env.BASE_URL + "meal-deal.jpg", alt: "Meal Deal" },
    { url: import.meta.env.BASE_URL + "iced-latte.jpg", alt: "Iced Latte" },
    { url: import.meta.env.BASE_URL + "doughnut-variety.jpg", alt: "Doughnuts" },
  ];

  useEffect(() => {
    // update container width for pixel-based transforms
    function updateWidth() {
      if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    // No auto-advance: user controls slides manually via trackpad, arrows, or slider.
    return () => {
      window.removeEventListener("resize", updateWidth);
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
      setCurrentSlide(index);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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
          <div
            ref={containerRef}
            className="flex"
            style={{
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              gap: "16px",
              padding: "12px 0",
            }}
          >
            {carouselImages.map((img, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 100%",
                  scrollSnapAlign: "center",
                  padding: "0 8px",
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-96 object-cover rounded-2xl shadow-md"
                />
              </div>
            ))}
          </div>

        </div>


      </div>

      <Footer />
    </div>
  );
}
