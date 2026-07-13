import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Mock Database ---
  const HOTELS = [
    {
      id: "h1",
      name: "Imperial Banquet & Hotel",
      city: "Sukkur",
      address: "Military Road, Sukkur, Sindh",
      rating: 5,
      pricePerNight: 12000,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      ],
      facilities: ["Free WiFi", "AC", "Free Parking", "Breakfast Included", "Family Rooms"],
      rooms: [
        { id: "r1", name: "Deluxe King Room", capacity: 2, price: 12000, available: true, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80" },
        { id: "r2", name: "Executive Suite", capacity: 4, price: 25000, available: true, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { id: "m1", name: "Halwa Puri", category: "Breakfast", price: 450, description: "Traditional Sindhi breakfast with chana and aloo bhujia.", image: "https://images.unsplash.com/photo-1589301773663-8e7c10b7b137?auto=format&fit=crop&w=400&q=80" },
        { id: "m2", name: "Chicken Karahi", category: "Dinner", price: 1800, description: "Spicy chicken cooked in a wok with tomatoes and green chilies.", image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=400&q=80" },
        { id: "m3", name: "Sindhi Biryani", category: "Lunch", price: 600, description: "Aromatic basmati rice layered with spicy mutton.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "h2",
      name: "Hotel One University Sukkur",
      city: "Sukkur",
      address: "Near IBA University, Sukkur",
      rating: 4,
      pricePerNight: 9500,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c0d5f9af?auto=format&fit=crop&w=1200&q=80"
      ],
      facilities: ["Free WiFi", "AC", "Restaurant", "Business Center"],
      rooms: [
        { id: "r3", name: "Standard Room", capacity: 2, price: 9500, available: true, image: "https://images.unsplash.com/photo-1551882547-ff40c0d5f9af?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: []
    },
    {
      id: "h3",
      name: "Green Mahal Guest House",
      city: "Khairpur",
      address: "Mall Road, Khairpur Mirs",
      rating: 4,
      pricePerNight: 6000,
      images: [
        "https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&w=1200&q=80"
      ],
      facilities: ["Free WiFi", "AC", "Free Parking", "Garden"],
      rooms: [
        { id: "r4", name: "Double Room", capacity: 2, price: 6000, available: true, image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: []
    },
    {
      id: "h4",
      name: "RT Grace Royal Taj Hotel Sukkur",
      city: "Sukkur",
      address: "Lab-e-Mehran, Sukkur",
      rating: 4.5,
      pricePerNight: 15000,
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
      ],
      facilities: ["Free WiFi", "AC", "Pool", "Riverside View"],
      rooms: [],
      menu: []
    },
    {
      id: "h5",
      name: "Step Inn Hotel Sukkur",
      city: "Sukkur",
      address: "Barrage Road, Sukkur",
      rating: 3.5,
      pricePerNight: 5000,
      images: [
        "https://images.unsplash.com/photo-1505691938895-1758d7bef51a?auto=format&fit=crop&w=1200&q=80"
      ],
      facilities: ["Free WiFi", "AC", "City View"],
      rooms: [],
      menu: []
    }
  ];

  let BOOKINGS: any[] = [];

  // --- API Routes ---
  app.get("/api/hotels", (req, res) => {
    const city = req.query.city as string;
    if (city) {
      return res.json(HOTELS.filter(h => h.city.toLowerCase() === city.toLowerCase()));
    }
    res.json(HOTELS);
  });

  app.get("/api/hotels/:id", (req, res) => {
    const hotel = HOTELS.find(h => h.id === req.params.id);
    if (hotel) res.json(hotel);
    else res.status(404).json({ error: "Hotel not found" });
  });

  app.post("/api/bookings", (req, res) => {
    const booking = {
      id: `b_${Date.now()}`,
      ...req.body,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    BOOKINGS.push(booking);
    res.status(201).json({ success: true, booking });
  });

  app.get("/api/bookings", (req, res) => {
    res.json(BOOKINGS);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
