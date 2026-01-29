// ============================================
// pages/NewsPage.tsx
// ============================================
import React from "react";
import { motion } from "framer-motion";
import { Newspaper, Calendar, User, ArrowRight, Clock, TrendingUp } from "lucide-react";

const newsItems = [
  {
    id: "1",
    title: "Indonesia Targetkan Net Zero Emission 2060 dengan Strategi Baru",
    excerpt: "Pemerintah Indonesia mengumumkan strategi komprehensif untuk mencapai target net zero emission...",
    category: "Kebijakan",
    author: "Tim Redaksi",
    date: "2024-12-15",
    readTime: "5 menit",
    featured: true,
  },
  {
    id: "2",
    title: "Harga Kredit Karbon Global Naik 15% di Q4 2024",
    excerpt: "Pasar karbon global menunjukkan tren positif dengan kenaikan harga kredit karbon yang signifikan...",
    category: "Pasar",
    author: "Analis Pasar",
    date: "2024-12-14",
    readTime: "3 menit",
    featured: false,
  },
  {
    id: "3",
    title: "Proyek Restorasi Mangrove Terbesar di Asia Tenggara Dimulai",
    excerpt: "Indonesia meluncurkan proyek restorasi mangrove yang akan mencakup 50.000 hektar wilayah pesisir...",
    category: "Proyek",
    author: "Kontributor",
    date: "2024-12-13",
    readTime: "4 menit",
    featured: false,
  },
  {
    id: "4",
    title: "Teknologi Blockchain Revolusi Transparansi Pasar Karbon",
    excerpt: "Implementasi teknologi blockchain dalam sistem MRV membawa era baru transparansi di pasar karbon...",
    category: "Teknologi",
    author: "Tech Editor",
    date: "2024-12-12",
    readTime: "6 menit",
    featured: false,
  },
];

export const NewsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Berita & Artikel</h1>
        <p className="text-muted-foreground">
          Informasi terbaru seputar pasar karbon dan keberlanjutan
        </p>
      </div>

      {/* Featured Article */}
      {newsItems.filter((n) => n.featured).map((news) => (
        <motion.div
          key={news.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white"
        >
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 inline-block">
            {news.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{news.title}</h2>
          <p className="text-white/80 mb-6">{news.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {news.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {news.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {news.readTime}
              </span>
            </div>
            <button className="flex items-center gap-2 font-medium hover:gap-3 transition-all">
              Baca Selengkapnya <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsItems.filter((n) => !n.featured).map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-5 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
              {news.category}
            </span>
            <h3 className="font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
              {news.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{news.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{news.date}</span>
              <span>{news.readTime}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
