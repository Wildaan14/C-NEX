// ============================================
// PLACEHOLDER PAGES - Copy each to separate files
// ============================================

// ============================================
// pages/MarketplacePage.tsx
// ============================================
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Filter, Leaf, MapPin, Calendar, Award, TrendingUp,
  ShoppingCart, Heart, Star, ChevronDown, Grid3X3, List
} from "lucide-react";

const carbonCredits = [
  {
    id: "1",
    name: "Restorasi Hutan Kalimantan",
    seller: "PT Hutan Hijau Indonesia",
    location: "Kalimantan Timur",
    type: "Forestry",
    standard: "VCS",
    vintage: "2024",
    price: 185000,
    available: 5000,
    rating: 4.8,
    verified: true,
  },
  {
    id: "2",
    name: "Mangrove Blue Carbon",
    seller: "Yayasan Mangrove Lestari",
    location: "Sulawesi Selatan",
    type: "Blue Carbon",
    standard: "Gold Standard",
    vintage: "2024",
    price: 220000,
    available: 3200,
    rating: 4.9,
    verified: true,
  },
  {
    id: "3",
    name: "PLTS Komunitas Bali",
    seller: "PT Solar Energy Indonesia",
    location: "Bali",
    type: "Renewable Energy",
    standard: "CDM",
    vintage: "2023",
    price: 95000,
    available: 8500,
    rating: 4.5,
    verified: true,
  },
  {
    id: "4",
    name: "Biogas Peternakan Jawa",
    seller: "Koperasi Peternak Makmur",
    location: "Jawa Tengah",
    type: "Waste Management",
    standard: "VCS",
    vintage: "2024",
    price: 78000,
    available: 2100,
    rating: 4.3,
    verified: true,
  },
  {
    id: "5",
    name: "Hutan Lindung Sumatra",
    seller: "Dinas Kehutanan Sumbar",
    location: "Sumatra Barat",
    type: "REDD+",
    standard: "VCS",
    vintage: "2024",
    price: 165000,
    available: 12000,
    rating: 4.7,
    verified: true,
  },
  {
    id: "6",
    name: "Energi Angin Sulawesi",
    seller: "PT Bayu Energy",
    location: "Sulawesi Selatan",
    type: "Renewable Energy",
    standard: "Gold Standard",
    vintage: "2023",
    price: 115000,
    available: 4500,
    rating: 4.6,
    verified: true,
  },
];

export const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = (id: string) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Carbon Marketplace</h1>
          <p className="text-muted-foreground">
            Jual beli kredit karbon tersertifikasi dari berbagai proyek
          </p>
        </div>
        <button className="relative px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Keranjang ({cart.length})
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari proyek atau penjual..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Credits Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carbonCredits.map((credit, index) => (
          <motion.div
            key={credit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border overflow-hidden group hover:border-primary/50 transition-all"
          >
            {/* Image placeholder */}
            <div className="relative h-40 bg-gradient-to-br from-emerald-500/20 to-primary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-16 h-16 text-primary/30" />
              </div>
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-lg">
                  {credit.standard}
                </span>
                {credit.verified && (
                  <span className="px-2 py-1 bg-emerald-500/90 text-white text-xs font-medium rounded-lg flex items-center gap-1">
                    <Award className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {credit.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{credit.seller}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm font-medium">{credit.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {credit.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {credit.vintage}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-lg font-bold text-primary">{formatPrice(credit.price)}</p>
                  <p className="text-xs text-muted-foreground">per tCO₂e</p>
                </div>
                <button
                  onClick={() => addToCart(credit.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    cart.includes(credit.id)
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {cart.includes(credit.id) ? "Ditambahkan" : "Beli"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
