import React from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe,
  Target,
  DollarSign,
} from "lucide-react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const priceHistory = [
  { month: "Jul", voluntary: 12.5, compliance: 18.2, ndc: 10.8 },
  { month: "Agu", voluntary: 13.2, compliance: 19.1, ndc: 11.2 },
  { month: "Sep", voluntary: 12.8, compliance: 18.8, ndc: 11.5 },
  { month: "Okt", voluntary: 14.1, compliance: 20.3, ndc: 12.1 },
  { month: "Nov", voluntary: 14.8, compliance: 21.5, ndc: 12.8 },
  { month: "Des", voluntary: 15.2, compliance: 22.1, ndc: 13.2 },
  { month: "Jan", voluntary: 15.6, compliance: 23.5, ndc: 14.1 },
];

const volumeData = [
  { month: "Jul", volume: 45000 },
  { month: "Agu", volume: 52000 },
  { month: "Sep", volume: 48000 },
  { month: "Okt", volume: 61000 },
  { month: "Nov", volume: 68000 },
  { month: "Des", volume: 72000 },
  { month: "Jan", volume: 85000 },
];

const ndcContribution = [
  { sector: "Kehutanan", contribution: 45, target: 60 },
  { sector: "Energi", contribution: 28, target: 40 },
  { sector: "Pertanian", contribution: 15, target: 25 },
  { sector: "Industri", contribution: 12, target: 20 },
  { sector: "Transportasi", contribution: 8, target: 15 },
];

const marketComparison = [
  {
    market: "Indonesia (Voluntary)",
    price: 15.65,
    change: +5.2,
    volume: "85K tCO₂e",
    trend: "up",
  },
  {
    market: "Indonesia (Compliance)",
    price: 23.5,
    change: +8.1,
    volume: "124K tCO₂e",
    trend: "up",
  },
  {
    market: "EU ETS",
    price: 85.2,
    change: -2.3,
    volume: "2.1M tCO₂e",
    trend: "down",
  },
  {
    market: "California Cap-and-Trade",
    price: 31.45,
    change: +1.8,
    volume: "450K tCO₂e",
    trend: "up",
  },
];

export function MarketTrends() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Market Intelligence
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Tren Pasar Karbon Indonesia
          </h2>
          <p className="text-muted-foreground">
            Analisis harga, volume perdagangan, dan kontribusi terhadap target
            NDC Indonesia
          </p>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +5.2%
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">$15.65</p>
          <p className="text-sm text-muted-foreground">Voluntary Market</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8.1%
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">$23.50</p>
          <p className="text-sm text-muted-foreground">Compliance Market</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xs text-muted-foreground">Jan 2025</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">85K</p>
          <p className="text-sm text-muted-foreground">Volume (tCO₂e)</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              On Track
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">62%</p>
          <p className="text-sm text-muted-foreground">NDC Progress</p>
        </motion.div>
      </div>

      {/* Price Trends Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              Pergerakan Harga Pasar Karbon
            </h3>
            <p className="text-sm text-muted-foreground">
              Perbandingan harga voluntary, compliance, dan NDC market
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs rounded-lg bg-secondary text-foreground">
              7D
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg bg-secondary text-foreground">
              1M
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg bg-primary text-white">
              6M
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg bg-secondary text-foreground">
              1Y
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceHistory}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(var(--border-rgb, 128, 128, 128), 0.2)"
            />
            <XAxis
              dataKey="month"
              stroke="rgba(var(--foreground-rgb, 0, 0, 0), 0.5)"
            />
            <YAxis stroke="rgba(var(--foreground-rgb, 0, 0, 0), 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="voluntary"
              stroke="#10b981"
              strokeWidth={2}
              name="Voluntary Market"
              dot={{ fill: "#10b981", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="compliance"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Compliance Market"
              dot={{ fill: "#3b82f6", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="ndc"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="NDC Market"
              dot={{ fill: "#8b5cf6", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart & Market Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Volume Perdagangan
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(var(--border-rgb, 128, 128, 128), 0.2)"
              />
              <XAxis
                dataKey="month"
                stroke="rgba(var(--foreground-rgb, 0, 0, 0), 0.5)"
              />
              <YAxis stroke="rgba(var(--foreground-rgb, 0, 0, 0), 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#volumeGradient)"
                name="Volume (tCO₂e)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Global Market Comparison */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Perbandingan Pasar Global
            </h3>
          </div>
          <div className="space-y-3">
            {marketComparison.map((market, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-secondary/30 rounded-lg border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-1">
                      {market.market}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Volume: {market.volume}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      ${market.price}
                    </p>
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        market.trend === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {market.trend === "up" ? (
                        <>
                          <TrendingUp className="w-3 h-3" /> +{market.change}%
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-3 h-3" /> {market.change}%
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.abs(market.change) * 10}%` }}
                    className={`h-full ${
                      market.trend === "up"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600"
                        : "bg-gradient-to-r from-red-500 to-red-600"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* NDC Contribution */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">
              Kontribusi terhadap Target NDC Indonesia
            </h3>
            <p className="text-sm text-muted-foreground">
              Target pengurangan emisi 29% (unconditional) - 41% (conditional)
              pada 2030
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ndcContribution} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(var(--border-rgb, 128, 128, 128), 0.2)"
            />
            <XAxis
              type="number"
              stroke="rgba(var(--foreground-rgb, 0, 0, 0), 0.5)"
            />
            <YAxis
              dataKey="sector"
              type="category"
              stroke="rgba(var(--foreground-rgb, 0, 0, 0), 0.5)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="contribution"
              fill="#10b981"
              name="Current (%)"
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="target"
              fill="#3b82f6"
              name="Target (%)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Tren Positif
              </h4>
              <p className="text-sm text-muted-foreground">
                Harga pasar karbon Indonesia naik 25% sejak implementasi Perpres
                98/2021, menunjukkan kepercayaan investor.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Peluang Internasional
              </h4>
              <p className="text-sm text-muted-foreground">
                Implementasi Article 6 Paris Agreement membuka akses ke pasar
                karbon internasional senilai $50B.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                NDC On Track
              </h4>
              <p className="text-sm text-muted-foreground">
                Indonesia mencapai 62% dari target NDC 2030, dengan proyeksi
                mencapai 75% pada akhir 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
