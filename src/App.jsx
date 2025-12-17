import { useState } from 'react';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Checkout } from './components/Checkout';


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i._id === item._id);
      if (existingItem) {
        return prev.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'menu' && (
        <Menu
          addToCart={addToCart}
          cartItems={cartItems}
          totalAmount={totalAmount}
          clearCart={clearCart}
          setCurrentPage={setCurrentPage}   // ✅ pass down
        />
      )}
      {currentPage === 'about' && <About />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'checkout' && (
        <Checkout
          cartItems={cartItems}
          totalAmount={totalAmount}
          clearCart={clearCart}
          setCurrentPage={setCurrentPage}   // ✅ pass down
        />
)}

    </div>
  );
}
