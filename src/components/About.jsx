import { Footer } from "./Footer";

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4" style={{ color: "#DD1467" }}>
            About Dunkin'
          </h1>
          <p className="text-2xl" style={{ color: "#FF6600" }}>
            Serving America since 1950
          </p>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-xl mb-12">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl mb-6" style={{ color: "#FF6600" }}>
              Our Story
            </h2>
            <p className="text-xl text-gray-700 mb-4 leading-relaxed max-w-3xl">
              Dunkin’, founded in 1950, is the largest coffee and donuts brand in
              the United States, with more than 14,000 restaurants in nearly 40
              global markets. Dunkin’ is part of the Inspire Brands family of
              restaurants. With America’s favorite coffee, innovative beverage
              strategies, and mouth-watering snacks, Dunkin’ has become the brand
              everyone knows nationally and loves locally.
            </p>
            <a
              href="https://www.dunkindonuts.com"
              style={{ color: "#DD1467" }}
              className="text-xl mb-4 leading-relaxed max-w-3xl underline hover:text-[#DD1467]"
              target="_blank"
              rel="noopener noreferrer"
            >
              America runs on Dunkin. You should too.
            </a>

          </div> 
        </div>   
      </div>

      <Footer />
    </div>
  );
}
