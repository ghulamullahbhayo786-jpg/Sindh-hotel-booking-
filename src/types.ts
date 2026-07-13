export interface Room {
  id: string;
  name: string;
  capacity: number;
  price: number;
  image: string;
  available: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'BBQ' | 'Fast Food' | 'Drinks' | 'Desserts';
  price: number;
  image: string;
  description: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: 'Khairpur' | 'Sukkur';
  address: string;
  rating: number;
  pricePerNight: number;
  images: string[];
  facilities: string[];
  rooms: Room[];
  menu: MenuItem[];
}

export interface Booking {
  id: string;
  hotelId: string;
  fullName: string;
  mobile: string;
  cnic?: string;
  email: string;
  city: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequest?: string;
  paymentMethod: string;
  status: 'Pending' | 'Confirmed' | 'Rejected';
  totalAmount: number;
  createdAt: string;
}
