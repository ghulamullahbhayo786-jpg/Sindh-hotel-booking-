import React from 'react';
import { Hotel as HotelIcon, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-brand-gold/20 bg-brand-black pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <HotelIcon className="h-8 w-8 text-brand-gold" />
            <div>
              <h1 className="text-xl font-display font-bold text-brand-gold leading-none">Sindh Hotel</h1>
              <p className="text-xs text-brand-white/70 uppercase tracking-widest">Booking</p>
            </div>
          </div>
          <p className="text-sm text-brand-white/60 leading-relaxed">
            Experience luxury and comfort in the heart of Sindh. Book the finest hotels and order premium dining in Khairpur and Sukkur.
          </p>
        </div>
        
        <div>
          <h3 className="font-display text-lg text-brand-gold mb-4">Cities</h3>
          <ul className="space-y-2 text-sm text-brand-white/70">
            <li><a href="#" className="hover:text-brand-gold transition-colors">Sukkur</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Khairpur Mirs</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Rohri</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-brand-gold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-brand-white/70">
            <li><a href="#" className="hover:text-brand-gold transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Partner With Us</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-brand-gold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-brand-white/70">
            <li className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-brand-gold" />
              <span>IBA University Road, Sukkur</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-brand-gold" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-brand-gold" />
              <span>support@sindhhotels.com</span>
            </li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-brand-white/60 hover:text-brand-gold"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="text-brand-white/60 hover:text-brand-gold"><Instagram className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 border-t border-brand-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-white/40">
        <p>&copy; {new Date().getFullYear()} Sindh Hotel Booking. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for luxury.</p>
      </div>
    </footer>
  );
}
