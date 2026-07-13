import React from 'react';
import { User, Heart, Clock, Settings, LogOut, Download, Plus, DollarSign, BarChart3, Building } from 'lucide-react';
import { Booking } from '../types';

export default function Dashboard() {
  const [role, setRole] = React.useState<'customer' | 'owner' | 'admin'>('customer');

  return (
    <div className="min-h-screen bg-brand-black pb-24">
      {/* Role Switcher (Mock Login) */}
      <div className="bg-brand-gray border-b border-white/10 pt-8 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display text-white">Dashboard</h1>
              <p className="text-white/60">Welcome back, Ali Raza</p>
            </div>
            <div className="flex bg-black/50 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setRole('customer')} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === 'customer' ? 'bg-brand-gold text-black' : 'text-white/60 hover:text-white'}`}
              >
                Customer
              </button>
              <button 
                onClick={() => setRole('owner')} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === 'owner' ? 'bg-brand-gold text-black' : 'text-white/60 hover:text-white'}`}
              >
                Hotel Owner
              </button>
              <button 
                onClick={() => setRole('admin')} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === 'admin' ? 'bg-brand-gold text-black' : 'text-white/60 hover:text-white'}`}
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-brand-gray border border-white/5 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-16 w-16 bg-brand-gold/20 rounded-full flex items-center justify-center border border-brand-gold/30">
                  <User className="h-8 w-8 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Ali Raza</h3>
                  <p className="text-sm text-white/50">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {role === 'customer' && (
                  <>
                    <button className="w-full flex items-center space-x-3 text-left px-4 py-3 bg-brand-gold/10 text-brand-gold rounded-lg font-medium">
                      <Clock className="w-5 h-5" /> <span>Booking History</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 text-left px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                      <Heart className="w-5 h-5" /> <span>Favourite Hotels</span>
                    </button>
                  </>
                )}
                {role === 'owner' && (
                  <>
                    <button className="w-full flex items-center space-x-3 text-left px-4 py-3 bg-brand-gold/10 text-brand-gold rounded-lg font-medium">
                      <Building className="w-5 h-5" /> <span>My Hotels</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 text-left px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                      <Clock className="w-5 h-5" /> <span>Reservations</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 text-left px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                      <BarChart3 className="w-5 h-5" /> <span>Sales Reports</span>
                    </button>
                  </>
                )}
                {role === 'admin' && (
                  <>
                    <button className="w-full flex items-center space-x-3 text-left px-4 py-3 bg-brand-gold/10 text-brand-gold rounded-lg font-medium">
                      <BarChart3 className="w-5 h-5" /> <span>Platform Overview</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 text-left px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                      <Building className="w-5 h-5" /> <span>Manage Hotels</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 text-left px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                      <User className="w-5 h-5" /> <span>Manage Users</span>
                    </button>
                  </>
                )}
                <div className="my-4 h-px bg-white/10" />
                <button className="w-full flex items-center space-x-3 text-left px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                  <Settings className="w-5 h-5" /> <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-left px-4 py-3 text-red-400 hover:bg-white/5 hover:text-red-300 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" /> <span>Log out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {role === 'customer' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display text-white mb-6">Recent Bookings</h2>
                {[1, 2].map((i) => (
                  <div key={i} className="bg-brand-gray border border-white/5 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex space-x-4">
                      <div className="h-24 w-24 rounded-lg bg-black/50 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" alt="Hotel" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-medium border border-green-500/30">Confirmed</span>
                          <span className="text-xs text-white/40">ID: BKG-84920{i}</span>
                        </div>
                        <h4 className="text-lg font-medium text-white">Imperial Banquet & Hotel</h4>
                        <p className="text-sm text-white/60">Deluxe King Room &bull; Oct 15 - Oct 18, 2026</p>
                        <p className="text-sm font-medium text-brand-gold mt-2">Rs. 36,000</p>
                      </div>
                    </div>
                    <div className="flex space-x-3 w-full md:w-auto">
                      <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 border border-brand-gold text-brand-gold rounded-lg hover:bg-brand-gold hover:text-black transition-colors font-medium">
                        <Download className="w-4 h-4" /> <span>Receipt</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {role === 'owner' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display text-white">My Hotels</h2>
                  <button className="bg-brand-gold text-black px-4 py-2 rounded-md font-medium hover:bg-brand-gold-light transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" /> <span>Add Hotel</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-brand-gray border border-white/5 rounded-xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-brand-gold/10 rounded-lg text-brand-gold"><DollarSign className="w-6 h-6" /></div>
                      <div>
                        <p className="text-sm text-white/50">Monthly Revenue</p>
                        <h3 className="text-2xl font-medium text-white">Rs. 845,000</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-brand-gray border border-white/5 rounded-xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-brand-gold/10 rounded-lg text-brand-gold"><Clock className="w-6 h-6" /></div>
                      <div>
                        <p className="text-sm text-white/50">Pending Bookings</p>
                        <h3 className="text-2xl font-medium text-white">12</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-gray border border-white/5 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/50 border-b border-white/10">
                        <th className="py-4 px-6 text-xs font-medium text-brand-gold uppercase tracking-wider">Hotel Name</th>
                        <th className="py-4 px-6 text-xs font-medium text-brand-gold uppercase tracking-wider">Rooms</th>
                        <th className="py-4 px-6 text-xs font-medium text-brand-gold uppercase tracking-wider">Status</th>
                        <th className="py-4 px-6 text-xs font-medium text-brand-gold uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-4 px-6 text-sm text-white">Hotel One University Sukkur</td>
                        <td className="py-4 px-6 text-sm text-white/60">24 / 30 Booked</td>
                        <td className="py-4 px-6">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">Active</span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-brand-gold hover:text-brand-gold-light text-sm font-medium">Manage</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {role === 'admin' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display text-white mb-6">Platform Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[{label: 'Total Users', val: '4,209'}, {label: 'Total Bookings', val: '1,842'}, {label: 'Revenue', val: 'Rs. 24.5M'}].map((stat, i) => (
                    <div key={i} className="bg-brand-gray border border-white/5 rounded-xl p-6">
                      <p className="text-sm text-white/50">{stat.label}</p>
                      <h3 className="text-2xl font-medium text-white mt-1">{stat.val}</h3>
                    </div>
                  ))}
                </div>
                <div className="bg-brand-gray border border-white/5 rounded-xl p-12 text-center">
                  <BarChart3 className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <h3 className="text-lg text-white mb-2">Analytics Dashboard</h3>
                  <p className="text-white/50 text-sm max-w-md mx-auto">Admin analytics graph visualization would appear here detailing booking trends across Sukkur and Khairpur over the past 30 days.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
