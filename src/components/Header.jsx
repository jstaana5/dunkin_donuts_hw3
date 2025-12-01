import { Menu, X } from 'lucide-react';

export function Header({ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => setCurrentPage('home')}
        >
          <img src={import.meta.env.BASE_URL + "logo.png"} alt="Dunkin Donuts Logo" className="w-auto h-20" />

        </div>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="cursor-pointer w-8 h-8" style={{ color: '#DD1467' }} strokeWidth={3} />
          ) : (
            <Menu className="cursor-pointer w-8 h-8" style={{ color: '#DD1467' }} strokeWidth={3} />
          )}
        </button>
      </div>
      
      {isMenuOpen && (
        <nav className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setCurrentPage('home');
                setIsMenuOpen(false);
              }}
              className={`cursor-pointer text-left px-6 py-4 rounded-xl transition-all text-xl ${
                currentPage === 'home' 
                  ? 'shadow-lg scale-105' 
                  : 'hover:shadow-md hover:scale-102'
              }`}
              style={{ 
                backgroundColor: currentPage === 'home' ? '#FF6600' : '#FFF5EB',
                color: currentPage === 'home' ? 'white' : '#FF6600'
              }}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage('menu');
                setIsMenuOpen(false);
              }}
              className={`cursor-pointer text-left px-6 py-4 rounded-xl transition-all text-xl ${
                currentPage === 'menu' 
                  ? 'shadow-lg scale-105' 
                  : 'hover:shadow-md hover:scale-102'
              }`}
              style={{ 
                backgroundColor: currentPage === 'menu' ? '#DD1467' : '#FFE5F0',
                color: currentPage === 'menu' ? 'white' : '#DD1467'
              }}
            >
              Menu
            </button>
            <button
              onClick={() => {
                setCurrentPage('about');
                setIsMenuOpen(false);
              }}
              className={`cursor-pointer text-left px-6 py-4 rounded-xl transition-all text-xl ${
                currentPage === 'about' 
                  ? 'shadow-lg scale-105' 
                  : 'hover:shadow-md hover:scale-102'
              }`}
              style={{ 
                backgroundColor: currentPage === 'about' ? '#FF6600' : '#FFF5EB',
                color: currentPage === 'about' ? 'white' : '#FF6600'
              }}
            >
              About
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                setIsMenuOpen(false);
              }}
              className={`cursor-pointer text-left px-6 py-4 rounded-xl transition-all text-xl ${
                currentPage === 'contact' 
                  ? 'shadow-lg scale-105' 
                  : 'hover:shadow-md hover:scale-102'
              }`}
              style={{ 
                backgroundColor: currentPage === 'contact' ? '#DD1467' : '#FFE5F0',
                color: currentPage === 'contact' ? 'white' : '#DD1467'
              }}
            >
              Contact
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
