import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hotel } from '../types';
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Utensils, Phone } from 'lucide-react';

export default function Home() {
  const [hotels, setHotels] = React.useState<Hotel[]>([]);
  const [searchCity, setSearchCity] = React.useState('Sukkur');
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('/api/hotels')
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd filter or navigate to a search page
    document.getElementById('featured-hotels')?.scrollIntoView({ behavior: 'smooth' });
  };

  const displayHotels = searchCity === 'All' ? hotels : hotels.filter(h => h.city === searchCity);

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center mt-12">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
            Experience Sindh's <br/> <span className="text-brand-gold italic">Finest Hospitality</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Discover premium hotels and authentic dining in Khairpur and Sukkur. Book rooms and order food ahead of your arrival.
          </p>

          {/* Search Box */}
          <div className="bg-brand-gray/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-4xl mx-auto shadow-2xl">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col text-left">
                <label className="text-xs font-medium text-brand-gold uppercase tracking-wider mb-1 px-1">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <select 
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:border-brand-gold outline-none"
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                  >
                    <option value="All">All Cities</option>
                    <option value="Sukkur">Sukkur</option>
                    <option value="Khairpur">Khairpur Mirs</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col text-left">
                <label className="text-xs font-medium text-brand-gold uppercase tracking-wider mb-1 px-1">Check In - Out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <input type="text" placeholder="Select Dates" className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-gold outline-none" />
                </div>
              </div>

              <div className="flex flex-col text-left">
                <label className="text-xs font-medium text-brand-gold uppercase tracking-wider mb-1 px-1">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <select className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:border-brand-gold outline-none">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>Family</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <button type="submit" className="bg-brand-gold text-brand-black font-medium py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-brand-gold-light transition-colors h-[46px]">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Featured Hotels */}
      <div id="featured-hotels" className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs text-brand-gold uppercase tracking-widest font-medium mb-2">Exquisite Stays</h2>
            <h3 className="text-4xl font-display text-white">Featured Hotels</h3>
          </div>
          <div className="hidden md:flex space-x-2">
            <button className="text-sm text-white/60 hover:text-brand-gold transition-colors flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayHotels.map(hotel => (
            <Link to={`/hotels/${hotel.id}`} key={hotel.id} className="group block bg-brand-gray rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 border border-white/10">
                  <Star className="h-3 w-3 text-brand-gold fill-current" />
                  <span className="text-xs font-medium text-white">{hotel.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 text-xs text-brand-gold uppercase tracking-wider mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{hotel.city}</span>
                </div>
                <h4 className="text-xl font-display text-white mb-2 line-clamp-1">{hotel.name}</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.facilities.slice(0,3).map(fac => (
                    <span key={fac} className="text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
                      {fac}
                    </span>
                  ))}
                  {hotel.facilities.length > 3 && <span className="text-xs text-white/50 bg-black/50 px-2 py-1 rounded">+{hotel.facilities.length - 3}</span>}
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <div>
                    <span className="text-xs text-white/50 uppercase tracking-wider">Starting from</span>
                    <div className="text-lg text-brand-gold font-medium">Rs. {hotel.pricePerNight.toLocaleString()}</div>
                  </div>
                  <div className="bg-white/5 p-2 rounded-full group-hover:bg-brand-gold group-hover:text-black transition-colors text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Services Banner */}
      <div className="bg-brand-gold text-brand-black py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-6">More than just a room.</h2>
            <p className="text-lg opacity-80 mb-8 max-w-md">
              Order your favorite meals directly to your room or table. Sindh Hotel Booking integrates premium restaurant menus for an unparalleled experience.
            </p>
            <Link to="/restaurants" className="inline-flex items-center space-x-2 bg-brand-black text-brand-gold px-6 py-3 rounded-full font-medium hover:bg-black transition-colors">
              <Utensils className="h-5 w-5" />
              <span>Explore Menus</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80" alt="Restaurant" className="rounded-2xl h-64 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" alt="Food" className="rounded-2xl h-64 w-full object-cover mt-8" />
          </div>
        </div>
      </div>
      
      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
