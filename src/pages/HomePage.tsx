import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Leaf,
  ShoppingCart,
  FolderKanban,
  Calculator,
  FileText,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Globe,
  Zap,
  Award,
  BarChart3,
  PieChart,
  Sparkles,
  Clock,
  CheckCircle,
  Target,
  TreeDeciduous,
  Users,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Carbon Credit",
      value: "12,450",
      unit: "tCO₂e",
      change: "+12.5%",
      trend: "up",
      icon: <Leaf className="w-6 h-6" />,
      gradient: "from-emerald-500 to-green-600",
      shadowColor: "shadow-emerald-500/20",
    },
    {
      title: "Emisi Bulan Ini",
      value: "2,340",
      unit: "tCO₂e",
      change: "-8.2%",
      trend: "down",
      icon: <Activity className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-600",
      shadowColor: "shadow-blue-500/20",
    },
    {
      title: "Transaksi Aktif",
      value: "23",
      unit: "transaksi",
      change: "+5",
      trend: "up",
      icon: <ShoppingCart className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-600",
      shadowColor: "shadow-purple-500/20",
    },
    {
      title: "Skor ESG",
      value: "87",
      unit: "poin",
      change: "+3",
      trend: "up",
      icon: <Award className="w-6 h-6" />,
      gradient: "from-amber-500 to-orange-600",
      shadowColor: "shadow-amber-500/20",
    },
  ];

  const quickActions = [
    {
      title: "Marketplace",
      description: "Jual beli kredit karbon tersertifikasi",
      icon: <ShoppingCart className="w-6 h-6" />,
      path: "/marketplace",
      gradient: "from-emerald-500 to-green-600",
      stats: "1,234 listings",
    },
    {
      title: "Projects",
      description: "Kelola proyek karbon Anda",
      icon: <FolderKanban className="w-6 h-6" />,
      path: "/projects",
      gradient: "from-blue-500 to-cyan-600",
      stats: "5 aktif",
    },
    {
      title: "Kalkulator",
      description: "Hitung jejak karbon Anda",
      icon: <Calculator className="w-6 h-6" />,
      path: "/calculator",
      gradient: "from-purple-500 to-pink-600",
      stats: "Real-time",
    },
    {
      title: "Reports",
      description: "Lihat laporan emisi lengkap",
      icon: <FileText className="w-6 h-6" />,
      path: "/reports",
      gradient: "from-amber-500 to-orange-600",
      stats: "12 laporan",
    },
  ];

  const recentActivities = [
    {
      type: "purchase",
      title: "Pembelian Carbon Credit",
      description: "100 tCO₂e dari PT Hutan Hijau",
      time: "2 jam lalu",
      amount: "Rp 45.000.000",
      status: "success",
    },
    {
      type: "verification",
      title: "Verifikasi Selesai",
      description: "Proyek Restorasi Mangrove",
      time: "5 jam lalu",
      amount: "250 tCO₂e",
      status: "success",
    },
    {
      type: "pending",
      title: "Menunggu Approval",
      description: "Proyek PLTS Komunitas",
      time: "1 hari lalu",
      amount: null,
      status: "pending",
    },
  ];

  const marketData = [
    { name: "VCS Standard", price: "Rp 180.000", change: "+2.5%", trend: "up", volume: "12.5K" },
    { name: "Gold Standard", price: "Rp 220.000", change: "+1.8%", trend: "up", volume: "8.2K" },
    { name: "CDM", price: "Rp 95.000", change: "-0.5%", trend: "down", volume: "5.1K" },
  ];

  const carbonProgress = {
    emitted: 12450,
    offset: 8100,
    target: 15000,
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-3xl p-6 md:p-8 text-white overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/10 rounded-full translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm text-white/80">Selamat datang kembali</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Halo, {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-white/80 max-w-lg">
              {user?.role === "company"
                ? "Kelola emisi perusahaan dan trading kredit karbon Anda dengan mudah"
                : user?.role === "admin"
                ? "Monitor dan kelola seluruh aktivitas platform C-NEX"
                : "Pantau dan offset jejak karbon Anda untuk masa depan yang lebih hijau"}
            </p>
            
            {/* Quick Stats in Welcome */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">65% Target Offset</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TreeDeciduous className="w-4 h-4" />
                <span className="text-sm font-medium">1,299 Pohon Setara</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link
              to="/calculator"
              className="px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition-all flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Hitung Karbon
            </Link>
            <Link
              to="/marketplace"
              className="px-5 py-3 bg-white text-emerald-600 hover:bg-white/90 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Beli Credit
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-5 hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg ${stat.shadowColor} group-hover:scale-110 transition-transform`}>
                <span className="text-white">{stat.icon}</span>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${
                  stat.trend === "up" 
                    ? "text-emerald-400 bg-emerald-500/10" 
                    : "text-red-400 bg-red-500/10"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-white">
              {stat.value}{" "}
              <span className="text-sm font-normal text-gray-500">{stat.unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Akses Cepat</h2>
          <Link to="/home" className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="group bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-5 hover:border-emerald-500/30 transition-all relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              <div className="relative">
                <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{action.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-medium">{action.stats}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 overflow-hidden"
        >
          <div className="p-5 border-b border-emerald-900/30 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Aktivitas Terbaru
            </h2>
            <Link
              to="/activities"
              className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#0d1411]/50 hover:bg-[#0d1411] transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activity.status === "success" 
                    ? "bg-emerald-500/20" 
                    : "bg-amber-500/20"
                }`}>
                  {activity.status === "success" ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{activity.title}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                </div>
                {activity.amount && (
                  <div className="text-right">
                    <p className="font-semibold text-emerald-400">{activity.amount}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Market Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 overflow-hidden"
        >
          <div className="p-5 border-b border-emerald-900/30 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Harga Pasar Carbon
            </h2>
            <Link
              to="/marketplace"
              className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Marketplace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-4">
            {/* Mini Chart Placeholder */}
            <div className="h-32 bg-gradient-to-t from-emerald-500/10 to-transparent rounded-xl mb-4 flex items-end justify-center p-4">
              <div className="flex items-end gap-2 h-full">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 70, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-4 bg-gradient-to-t from-emerald-500 to-green-400 rounded-t-sm transition-all hover:from-emerald-400 hover:to-green-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Market Prices */}
            <div className="space-y-3">
              {marketData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0d1411]/50 hover:bg-[#0d1411] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-medium text-white">{item.name}</span>
                      <p className="text-xs text-gray-500">Vol: {item.volume}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{item.price}</p>
                    <p className={`text-xs font-medium ${item.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Carbon Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Progress Offset Karbon
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Pantau kemajuan Anda menuju target net-zero emission
            </p>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-emerald-400 font-medium">
                  {((carbonProgress.offset / carbonProgress.emitted) * 100).toFixed(0)}% Offset
                </span>
              </div>
              <div className="h-4 bg-[#0d1411] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000"
                  style={{ width: `${(carbonProgress.offset / carbonProgress.emitted) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 tCO₂e</span>
                <span>{carbonProgress.emitted.toLocaleString()} tCO₂e</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 lg:w-auto">
            <div className="text-center p-4 bg-[#0d1411] rounded-xl">
              <p className="text-2xl font-bold text-white">{carbonProgress.emitted.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Emisi</p>
            </div>
            <div className="text-center p-4 bg-emerald-500/10 rounded-xl">
              <p className="text-2xl font-bold text-emerald-400">{carbonProgress.offset.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Sudah Offset</p>
            </div>
            <div className="text-center p-4 bg-[#0d1411] rounded-xl">
              <p className="text-2xl font-bold text-amber-400">{(carbonProgress.emitted - carbonProgress.offset).toLocaleString()}</p>
              <p className="text-xs text-gray-500">Sisa Offset</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
