import { useState } from 'react';
import { Plus, ShoppingCart, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Footer } from './Footer';

const menuItems = [
  {
    id: 1,
    name: 'Iced Latte',
    price: 5.67,
    image: import.meta.env.BASE_URL + "iced-latte.jpg"},
  {
    id: 2,
    name: 'Original Blend',
    price: 5.74,
    image: import.meta.env.BASE_URL + "og-blend.jpg"
  },
  {
    id: 3,
    name: 'Blueberry Breeze Refresher',
    price: 5.00,
    image: import.meta.env.BASE_URL + "refresher.jpg"
  },
  {
    id: 4,
    name: "Bagel n' Cheese",
    price: 4.36,
    image: import.meta.env.BASE_URL + "bagel.jpg"
  },
  {
    id: 5,
    name: "Turkey, Cheese, n' Egg Croissant",
    price: 6.61,
    image: import.meta.env.BASE_URL + "croissant.jpg"
  },
  {
    id: 6,
    name: 'BEC Wrap',
    price: 4.23,
    image: import.meta.env.BASE_URL + "saugage.jpg"
  },
];

// Props are just destructured — no type annotations
export function Menu({ addToCart, cartItems, totalAmount, clearCart }) {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4" style={{ color: '#DD1467' }}>Menu</h1>
          <p className="text-2xl" style={{ color: '#FF6600' }}>Browse our menu!</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm mb-2 line-clamp-1" style={{ color: '#DD1467' }}>{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg" style={{ color: '#FF6600' }}>${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="p-2 rounded-full text-white shadow-md hover:shadow-lg hover:scale-110 transition-all"
                    style={{ backgroundColor: '#DD1467' }}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Cart Widget */}
      <div
        className="fixed bottom-6 right-6 bg-white rounded-3xl shadow-2xl border-4 w-80 max-w-[calc(100vw-3rem)] transition-all"
        style={{ borderColor: '#DD1467' }}
      >
        {/* Cart Header */}
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 rounded-t-3xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFE5F0' }}>
              <ShoppingCart className="w-5 h-5" style={{ color: '#DD1467' }} />
            </div>
            <h3 className="text-xl" style={{ color: '#DD1467' }}>Cart</h3>
            {cartItemCount > 0 && (
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: '#FF6600' }}
              >
                {cartItemCount}
              </div>
            )}
          </div>
          {isCartOpen ? (
            <ChevronDown className="w-6 h-6" style={{ color: '#DD1467' }} />
          ) : (
            <ChevronUp className="w-6 h-6" style={{ color: '#DD1467' }} />
          )}
        </button>

        {/* Cart Content */}
        {isCartOpen && (
          <div className="px-6 pb-6">
            <div className="mb-4">
              <span className="mr-2 text-lg">Total:</span>
              <span className="text-2xl" style={{ color: '#FF6600' }}>${totalAmount.toFixed(2)}</span>
            </div>
            
            {cartItems.length > 0 ? (
              <div className="mb-4 max-h-48 overflow-y-auto space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                    <div>
                      <p className="text-sm" style={{ color: '#DD1467' }}>{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm" style={{ color: '#FF6600' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mb-4 text-gray-500 text-center text-sm">Your cart is empty</p>
            )}
            
            <button
              onClick={clearCart}
              disabled={cartItems.length === 0}
              className="w-full text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#DD1467' }}
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
