// pages/AdminPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, FolderKanban, ShoppingCart, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

export const AdminPage: React.FC = () => {
  const stats = [
    { label: "Total Pengguna", value: "1,234", change: "+45 minggu ini", icon: <Users className="w-5 h-5" />, color: "blue" },
    { label: "Proyek Aktif", value: "156", change: "+12 minggu ini", icon: <FolderKanban className="w-5 h-5" />, color: "emerald" },
    { label: "Transaksi Pending", value: "23", change: "Perlu review", icon: <Clock className="w-5 h-5" />, color: "amber" },
    { label: "Volume Trading", value: "Rp 2.5M", change: "+18% bulan ini", icon: <TrendingUp className="w-5 h-5" />, color: "purple" },
  ];

  const pendingApprovals = [
    { id: "1", type: "user", name: "PT Hijau Lestari", action: "Pendaftaran Perusahaan", date: "2024-12-15" },
    { id: "2", type: "project", name: "Restorasi Hutan Papua", action: "Approval Proyek", date: "2024-12-14" },
    { id: "3", type: "transaction", name: "Transaksi #TRX-2024-1234", action: "Verifikasi Pembayaran", date: "2024-12-14" },
    { id: "4", type: "user", name: "John Doe", action: "Verifikasi KYC", date: "2024-12-13" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">Kelola platform dan monitor aktivitas</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <div className={`p-2 rounded-lg w-fit mb-3 ${
              stat.color === "blue" ? "bg-blue-500/10 text-blue-500" :
              stat.color === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
              stat.color === "amber" ? "bg-amber-500/10 text-amber-500" :
              "bg-purple-500/10 text-purple-500"
            }`}>
              {stat.icon}
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Pending Approvals */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Menunggu Persetujuan</h3>
          <span className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-sm font-medium">
            {pendingApprovals.length} pending
          </span>
        </div>
        <div className="divide-y divide-border">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.action}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{item.date}</span>
                <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
