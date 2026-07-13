import React from 'react';
import { useParams } from 'react-router-dom';
import { Hotel, Room, MenuItem } from '../types';
import { MapPin, Star, Wifi, Wind, Car, Coffee, Users, ChevronLeft, Calendar, User, Phone, Mail, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HotelDetails() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = React.useState<Hotel | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<'rooms' | 'menu'>('rooms');
  const [showBookingModal, setShowBookingModal] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);

  React.useEffect(() => {
    fetch(`/api/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        setHotel(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-brand-gold">Loading...</div>;
  if (!hotel) return <div className="h-screen flex items-center justify-center">Hotel not found.</div>;

  return (
    <div className="min-h-screen bg-brand-black pb-24">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center space-x-2 text-brand-gold mb-4 hover:text-brand-gold-light">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Back to Search</span>
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <div className="flex items-center space-x-1 bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/30">
                <Star className="h-4 w-4 text-brand-gold fill-current" />
                <span className="text-sm font-medium text-brand-gold">{hotel.rating}</span>
              </div>
              <div className="flex items-center space-x-1 text-brand-white/80">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{hotel.address}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-white mb-4">
              {hotel.name}
            </h1>
            <div className="flex flex-wrap gap-3 mt-6">
              {hotel.facilities.map((fac, idx) => (
                <span key={idx} className="px-4 py-2 rounded-full bg-brand-gray border border-white/5 text-xs text-brand-white/70">
                  {fac}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Tabs */}
        <div className="flex space-x-8 border-b border-white/10 mb-8">
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`pb-4 text-sm font-medium uppercase tracking-wider transition-colors relative ${activeTab === 'rooms' ? 'text-brand-gold' : 'text-white/50 hover:text-white/80'}`}
          >
            Rooms & Suites
            {activeTab === 'rooms' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold" />}
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`pb-4 text-sm font-medium uppercase tracking-wider transition-colors relative ${activeTab === 'menu' ? 'text-brand-gold' : 'text-white/50 hover:text-white/80'}`}
          >
            Restaurant Menu
            {activeTab === 'menu' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold" />}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'rooms' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hotel.rooms.map(room => (
              <div key={room.id} className="group bg-brand-gray rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-500">
                <div className="h-64 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-display text-white mb-2">{room.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-white/50">
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {room.capacity} Guests</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-medium text-brand-gold">Rs. {room.price.toLocaleString()}</div>
                      <div className="text-xs text-white/40 uppercase">per night</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setSelectedRoom(room); setShowBookingModal(true); }}
                    disabled={!room.available}
                    className="w-full mt-6 bg-brand-gold text-brand-black font-medium py-3 rounded-md hover:bg-brand-gold-light transition-colors disabled:opacity-50"
                  >
                    {room.available ? 'Reserve Now' : 'Fully Booked'}
                  </button>
                </div>
              </div>
            ))}
            {hotel.rooms.length === 0 && (
              <div className="col-span-2 text-center text-white/50 py-12">No rooms listed currently.</div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.menu.map(item => (
              <div key={item.id} className="flex space-x-4 bg-brand-gray p-4 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <span className="text-brand-gold font-medium">Rs.{item.price}</span>
                    </div>
                    <p className="text-xs text-white/50 line-clamp-2">{item.description}</p>
                  </div>
                  <button className="text-xs uppercase tracking-wider text-brand-gold hover:text-brand-gold-light text-left mt-2 font-medium">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
            {hotel.menu.length === 0 && (
              <div className="col-span-3 text-center text-white/50 py-12">Menu not available.</div>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-gray border border-brand-gold/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display text-brand-gold">Reserve {selectedRoom.name}</h2>
              <button onClick={() => setShowBookingModal(false)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Booking Confirmed!"); setShowBookingModal(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-2">Full Name</label>
                  <input required type="text" className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-gold outline-none transition-colors" placeholder="Ali Raza" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-2">Mobile Number</label>
                  <input required type="tel" className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-gold outline-none transition-colors" placeholder="0300 1234567" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-2">Email Address</label>
                  <input required type="email" className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-gold outline-none transition-colors" placeholder="ali@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-2">CNIC (Optional)</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-gold outline-none transition-colors" placeholder="45203-1234567-1" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-2">Check-in Date</label>
                  <input required type="date" className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-gold outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-2">Check-out Date</label>
                  <input required type="date" className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-gold outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 uppercase mb-2">Payment Method</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['JazzCash', 'Easypaisa', 'Card', 'Pay at Hotel'].map(method => (
                    <label key={method} className="flex items-center p-3 border border-white/10 rounded-md cursor-pointer hover:border-brand-gold transition-colors">
                      <input type="radio" name="payment" value={method} className="text-brand-gold focus:ring-brand-gold" defaultChecked={method === 'Pay at Hotel'} />
                      <span className="ml-2 text-sm text-white/80">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-brand-gold text-brand-black font-medium py-4 rounded-md hover:bg-brand-gold-light transition-colors text-lg">
                Confirm Reservation (Rs. {selectedRoom.price.toLocaleString()})
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
