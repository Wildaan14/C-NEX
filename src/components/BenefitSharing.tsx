import React from "react";
import {
  Users,
  DollarSign,
  PieChart,
  TrendingUp,
  FileText,
  CheckCircle,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

interface Stakeholder {
  name: string;
  type: string;
  share: number;
  amount: number;
  color: string;
  colorStart: string;
  colorEnd: string;
}

const benefitDistribution: Stakeholder[] = [
  {
    name: "Masyarakat Adat & Lokal",
    type: "Community",
    share: 40,
    amount: 480000,
    color: "from-green-500 to-emerald-600",
    colorStart: "#10b981",
    colorEnd: "#059669",
  },
  {
    name: "Pemerintah Daerah",
    type: "Local Government",
    share: 25,
    amount: 300000,
    color: "from-blue-500 to-cyan-600",
    colorStart: "#3b82f6",
    colorEnd: "#0891b2",
  },
  {
    name: "Pengelola Proyek",
    type: "Project Developer",
    share: 20,
    amount: 240000,
    color: "from-purple-500 to-pink-600",
    colorStart: "#a855f7",
    colorEnd: "#db2777",
  },
  {
    name: "Verifikasi & MRV",
    type: "Verification",
    share: 10,
    amount: 120000,
    color: "from-yellow-500 to-orange-600",
    colorStart: "#eab308",
    colorEnd: "#ea580c",
  },
  {
    name: "Biaya Operasional",
    type: "Operational",
    share: 5,
    amount: 60000,
    color: "from-gray-500 to-slate-600",
    colorStart: "#6b7280",
    colorEnd: "#475569",
  },
];

const paymentHistory = [
  {
    date: "2025-01-15",
    recipient: "Masyarakat Adat Dayak",
    amount: 120000,
    status: "completed",
    txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  },
  {
    date: "2025-01-10",
    recipient: "Pemerintah Kab. Katingan",
    amount: 75000,
    status: "completed",
    txHash: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
  {
    date: "2025-01-05",
    recipient: "Koperasi Mangrove Sumatra",
    amount: 95000,
    status: "completed",
    txHash: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
  },
  {
    date: "2025-01-02",
    recipient: "Lembaga Verifikasi MRV",
    amount: 30000,
    status: "pending",
    txHash: "pending",
  },
];

export function BenefitSharing() {
  const totalRevenue = benefitDistribution.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Profit-Sharing Dashboard
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Transparansi Distribusi Manfaat
          </h2>
          <p className="text-muted-foreground">
            Pembagian pendapatan karbon secara otomatis melalui smart contract
            untuk keadilan sosial
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15%
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Revenue Q1 2025</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xs text-muted-foreground">Beneficiaries</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">2,847</p>
          <p className="text-sm text-muted-foreground">Penerima Manfaat</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-blue-500">Completed</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">234</p>
          <p className="text-sm text-muted-foreground">Transaksi Selesai</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xs text-muted-foreground">
              Smart Contract
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">100%</p>
          <p className="text-sm text-muted-foreground">Transparency Score</p>
        </motion.div>
      </div>

      {/* Distribution Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Visualization */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Distribusi Pendapatan
            </h3>
          </div>

          {/* Circular Progress */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <defs>
                {benefitDistribution.map((item, idx) => (
                  <linearGradient
                    key={`gradient-${idx}`}
                    id={`gradient-${idx}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={item.colorStart} />
                    <stop offset="100%" stopColor={item.colorEnd} />
                  </linearGradient>
                ))}
              </defs>
              {benefitDistribution.map((item, idx) => {
                const prevTotal = benefitDistribution
                  .slice(0, idx)
                  .reduce((sum, i) => sum + i.share, 0);
                const circumference = 2 * Math.PI * 40;
                const offset = (prevTotal / 100) * circumference;
                const dashArray = `${(item.share / 100) * circumference} ${circumference}`;

                return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={`url(#gradient-${idx})`}
                    strokeWidth="12"
                    strokeDasharray={dashArray}
                    strokeDashoffset={-offset}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-foreground">100%</p>
              <p className="text-sm text-muted-foreground">Allocated</p>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {benefitDistribution.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {item.share}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${item.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                Riwayat Pembayaran
              </h3>
            </div>
          </div>
          <div className="divide-y divide-border">
            {paymentHistory.map((payment, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  backgroundColor: "rgba(var(--primary-rgb), 0.05)",
                }}
                className="p-5 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-1">
                      {payment.recipient}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs mt-1 ${
                        payment.status === "completed"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {payment.status === "completed" ? (
                        <>
                          <CheckCircle className="w-3 h-3" /> Completed
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-3 h-3" /> Pending
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/30 rounded p-2 font-mono">
                  <Shield className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{payment.txHash}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Contract Details */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              Smart Contract Automation
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sistem pembagian manfaat menggunakan smart contract yang
              terverifikasi dan tidak dapat dimanipulasi. Setiap transaksi
              penjualan kredit karbon akan secara otomatis mendistribusikan
              pendapatan sesuai persentase yang telah disepakati dalam
              perjanjian proyek.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  Contract Address
                </p>
                <p className="text-sm font-mono text-foreground">
                  0x742d...0bEb
                </p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Blockchain</p>
                <p className="text-sm font-semibold text-foreground">
                  Ethereum Mainnet
                </p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Compliance</p>
                <p className="text-sm font-semibold text-foreground">
                  Perpres 98/2021
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              Transparansi & Akuntabilitas Penuh
            </h4>
            <p className="text-sm text-muted-foreground">
              Sesuai dengan prinsip FPIC (Free, Prior, and Informed Consent) dan
              regulasi Permen LHK 7/2023, seluruh masyarakat penerima manfaat
              dapat memantau distribusi pendapatan secara real-time melalui
              dashboard ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
