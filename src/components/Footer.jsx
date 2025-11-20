import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="bg-white border-t-4 mt-20"
      style={{ borderColor: "#DD1467" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Two-column grid now */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Hours */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl mb-4" style={{ color: "#FF6600" }}>
              Hours
            </h3>
            <p className="text-xl text-gray-800">Monday - Sunday</p>
            <p className="text-xl text-gray-800">6:00 AM - 10:00 PM</p>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl mb-4" style={{ color: "#FF6600" }}>
              Follow Us
            </h3>
            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href="https://www.facebook.com/DunkinDonuts/"
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: "#FF6600" }}
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://www.instagram.com/dunkin/"
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: "#DD1467" }}
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
