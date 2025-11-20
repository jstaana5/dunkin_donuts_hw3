import { useState } from 'react';
import { Send, MapPin } from 'lucide-react';
import { Footer } from './Footer';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your feedback! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4" style={{ color: '#DD1467' }}>Contact Us</h1>
          <p className="text-2xl" style={{ color: '#FF6600' }}>We'd love to hear from you!</p>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-10 shadow-xl mb-12">
          <h3 className="text-3xl mb-8 text-center" style={{ color: '#DD1467' }}>Send us a message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-3 text-xl" style={{ color: '#FF6600' }}>
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-pink-400 outline-none transition-colors text-lg"
                required
              />
            </div>
            
            <div>
              <label className="block mb-3 text-xl" style={{ color: '#FF6600' }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-pink-400 outline-none transition-colors text-lg"
                required
              />
            </div>
            
            <div>
              <label className="block mb-3 text-xl" style={{ color: '#FF6600' }}>
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what's on your mind..."
                rows={8}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-pink-400 outline-none resize-none transition-colors text-lg"
                required
              />
            </div>
            
            <button
                type="submit"
                className="w-full text-white px-8 py-5 rounded-xl shadow-xl 
                          hover:shadow-2xl hover:scale-105 transition-colors duration-300 
                          flex items-center justify-center gap-3 text-2xl 
                          bg-[#DD1467] hover:bg-[#FF6600]"
              >
                <Send className="w-6 h-6" />
                Send Message
              </button>
          </form>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl h-96">
          <div className="w-full h-full bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-20 h-20 mx-auto mb-4" style={{ color: '#DD1467' }} />
              <p className="text-2xl" style={{ color: '#FF6600' }}>Map Location</p>
              <p className="text-xl text-gray-600">123 Dunkin Street, Boston, MA</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
