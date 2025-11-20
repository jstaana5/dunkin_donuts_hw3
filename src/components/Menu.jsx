import { useState } from 'react';
import { Plus, ShoppingCart, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Footer } from './Footer';

// Menu items array (no type annotations needed in JSX)
const menuItems = [
  {
    id: 1,
    name: 'Iced Coffee',
    price: 3.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1684439670717-b1147a7e7534?...'
  },
  {
    id: 2,
    name: 'Cold Brew',
    price: 4.49,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1561641377-f7456d23aa9b?...'
  },
  {
    id: 3,
    name: 'Refresher',
    price: 4.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1745725247846-12a3e3109bbf?...'
  },
  {
    id: 4,
    name: 'Bagel & Cream Cheese',
    price: 2.99,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1726733860096-34a3fbae77c5?...'
  },
  {
    id: 5,
    name: 'Croissant Sandwich',
    price: 5.49,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1738682585466-c287db5404de?...'
  },
  {
    id: 6,
    name: 'Breakfast Wrap',
    price: 4.99,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1694610882150-4de206edf95a?...'
  },
  {
    id: 7,
    name: 'Glazed Donut',
    price: 1.49,
    category: 'Donuts',
    image: 'https://images.unsplash.com/photo-1624300162366-51a5f2edce68?...'
  },
  {
    id: 8,
    name: 'Chocolate Donut',
    price: 1.69,
    category: 'Donuts',
    image: 'https://images.unsplash.com/photo-1639710743616-c5dfaf1fbb2b?...'
  },
  {
    id: 9,
    name: 'Sprinkle Donut',
    price: 1.79,
    category: 'Donuts',
    image: 'https://images.unsplash.com/photo-1670307335853-a3f0b0fe87b2?...'
  }
];

// Props are just destructured — no type annotations
export function Menu({ addToCart, cartItems, totalAmount, clearCart }) {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4" style={{ color: '#DD1467' }}>Our Menu</h1>
          <p className="text-2xl" style={{ color: '#FF6600' }}>Choose your favorites!</p>
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
                <div 
                  className="absolute top-2 right-2 px-2 py-1 rounded-full text-white shadow-lg text-xs"
                  style={{ backgroundColor: '#FF6600' }}
                >
                  {item.category}
                </div>
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
