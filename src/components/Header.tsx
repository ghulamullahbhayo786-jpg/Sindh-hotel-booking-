import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, MapPin, Menu, X, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-gold/20 bg-brand-black/95 backdrop-blur supports-[backdrop-filter]:bg-brand-black/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Hotel className="h-8 w-8 text-brand-gold" />
          <div>
            <h1 className="text-xl font-display font-bold text-brand-gold leading-none">Sindh Hotel</h1>
            <p className="text-xs text-brand-white/70 uppercase tracking-widest">Booking</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-brand-gold transition-colors">Home</Link>
          <Link to="/hotels/sukkur" className="text-sm font-medium hover:text-brand-gold transition-colors">Sukkur</Link>
          <Link to="/hotels/khairpur" className="text-sm font-medium hover:text-brand-gold transition-colors">Khairpur</Link>
          <div className="h-4 w-px bg-brand-gold/30" />
          <button className="text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors">
            اردو / English
          </button>
          <Link to="/dashboard" className="flex items-center space-x-2 bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium hover:bg-brand-gold-light transition-colors">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-brand-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-brand-gold" /> : <Menu className="h-6 w-6 text-brand-gold" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-brand-gold/20 bg-brand-black p-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-base font-medium hover:text-brand-gold">Home</Link>
            <Link to="/hotels/sukkur" className="text-base font-medium hover:text-brand-gold">Sukkur Hotels</Link>
            <Link to="/hotels/khairpur" className="text-base font-medium hover:text-brand-gold">Khairpur Hotels</Link>
            <button className="text-left text-base font-medium text-brand-gold">اردو / English</button>
            <Link to="/dashboard" className="bg-brand-gold text-brand-black px-4 py-3 rounded-md font-medium text-center">
              Sign In / Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
