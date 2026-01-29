// pages/MRVDashboardPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Activity, CheckCircle, AlertTriangle, Clock, TrendingUp, Globe, FileCheck } from "lucide-react";

export const MRVDashboardPage: React.FC = () => {
  const stats = [
    { label: "Total Emisi Termonitor", value: "45,230", unit: "tCO₂e", icon: <Activity className="w-5 h-5" />, color: "emerald" },
    { label: "Proyek Terverifikasi", value: "12", unit: "proyek", icon: <CheckCircle className="w-5 h-5" />, color: "blue" },
    { label: "Menunggu Verifikasi", value: "3", unit: "proyek", icon: <Clock className="w-5 h-5" />, color: "amber" },
    { label: "Akurasi Data", value: "98.5", unit: "%", icon: <FileCheck className="w-5 h-5" />, color: "purple" },
  ];

  const verificationHistory = [
    { date: "2024-12-10", project: "Restorasi Hutan Kalimantan", status: "verified", auditor: "SGS Indonesia" },
    { date: "2024-12-05", project: "Mangrove Blue Carbon", status: "verified", auditor: "Bureau Veritas" },
    { date: "2024-11-28", project: "PLTS Komunitas Bali", status: "verified", auditor: "TUV SUD" },
    { date: "2024-11-20", project: "Biogas Peternakan", status: "pending", auditor: "DNV GL" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">MRV Dashboard</h1>
        <p className="text-muted-foreground">
          Monitoring, Reporting, and Verification sistem karbon Anda
        </p>
      </div>

      {/* Stats Grid */}
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
              stat.color === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
              stat.color === "blue" ? "bg-blue-500/10 text-blue-500" :
              stat.color === "amber" ? "bg-amber-500/10 text-amber-500" :
              "bg-purple-500/10 text-purple-500"
            }`}>
              {stat.icon}
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">
              {stat.value} <span className="text-sm font-normal text-muted-foreground">{stat.unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Emisi Bulanan</h3>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-muted-foreground/30" />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Distribusi Sektor</h3>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <Globe className="w-16 h-16 text-muted-foreground/30" />
          </div>
        </div>
      </div>

      {/* Verification History */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-foreground">Riwayat Verifikasi</h3>
        </div>
        <div className="divide-y divide-border">
          {verificationHistory.map((item, index) => (
            <div key={index} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${item.status === "verified" ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
                  {item.status === "verified" ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.project}</p>
                  <p className="text-sm text-muted-foreground">Auditor: {item.auditor}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  item.status === "verified" 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "bg-amber-500/10 text-amber-500"
                }`}>
                  {item.status === "verified" ? "Terverifikasi" : "Menunggu"}
                </span>
                <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MRVDashboardPage;
