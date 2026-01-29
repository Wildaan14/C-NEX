import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
  Lock,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";

interface CarbonOrder {
  id: string;
  type: "buy" | "sell";
  price: number;
  volume: number;
  total: number;
  timestamp: string;
  projectId: string;
  projectName: string;
}

interface CarbonCredit {
  id: string;
  projectName: string;
  vintage: number;
  status: "issued" | "pending" | "retired";
  amount: number;
  price: number;
  certification: string;
  blockchainTx: string;
}

const mockOrderbook: CarbonOrder[] = [
  {
    id: "1",
    type: "buy",
    price: 15.5,
    volume: 1000,
    total: 15500,
    timestamp: "10:45:23",
    projectId: "PRJ-001",
    projectName: "Kalimantan REDD+",
  },
  {
    id: "2",
    type: "buy",
    price: 15.2,
    volume: 2500,
    total: 38000,
    timestamp: "10:44:12",
    projectId: "PRJ-002",
    projectName: "Mangrove Sumatra",
  },
  {
    id: "3",
    type: "buy",
    price: 15.0,
    volume: 5000,
    total: 75000,
    timestamp: "10:42:45",
    projectId: "PRJ-001",
    projectName: "Kalimantan REDD+",
  },
  {
    id: "4",
    type: "sell",
    price: 15.8,
    volume: 3000,
    total: 47400,
    timestamp: "10:45:50",
    projectId: "PRJ-003",
    projectName: "Papua Reforestation",
  },
  {
    id: "5",
    type: "sell",
    price: 16.0,
    volume: 1500,
    total: 24000,
    timestamp: "10:43:30",
    projectId: "PRJ-002",
    projectName: "Mangrove Sumatra",
  },
  {
    id: "6",
    type: "sell",
    price: 16.5,
    volume: 2000,
    total: 33000,
    timestamp: "10:41:15",
    projectId: "PRJ-004",
    projectName: "Jawa Agroforestry",
  },
];

const mockCredits: CarbonCredit[] = [
  {
    id: "CRD-001",
    projectName: "Kalimantan Tropical Forest REDD+",
    vintage: 2024,
    status: "issued",
    amount: 50000,
    price: 15.5,
    certification: "VCS + CCB",
    blockchainTx: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  },
  {
    id: "CRD-002",
    projectName: "Sumatra Mangrove Restoration",
    vintage: 2024,
    status: "issued",
    amount: 25000,
    price: 14.8,
    certification: "Gold Standard",
    blockchainTx: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
  {
    id: "CRD-003",
    projectName: "Papua Reforestation Initiative",
    vintage: 2023,
    status: "retired",
    amount: 15000,
    price: 16.2,
    certification: "VCS",
    blockchainTx: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
  },
  {
    id: "CRD-004",
    projectName: "Jawa Barat Agroforestry",
    vintage: 2025,
    status: "pending",
    amount: 8000,
    price: 13.5,
    certification: "ISO 14064",
    blockchainTx: "pending",
  },
];

const tradeHistory = [
  { time: "11:23", type: "sell", price: 15.6, volume: 1200, value: 18720 },
  { time: "11:18", type: "buy", price: 15.55, volume: 800, value: 12440 },
  { time: "11:12", type: "buy", price: 15.5, volume: 2500, value: 38750 },
  { time: "11:05", type: "sell", price: 15.45, volume: 1500, value: 23175 },
  { time: "10:58", type: "buy", price: 15.4, volume: 3000, value: 46200 },
];

export function CarbonMarketplace() {
  const [activeTab, setActiveTab] = useState<
    "orderbook" | "mycredits" | "history"
  >("orderbook");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "issued":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-green-500/10 text-green-500 border border-green-500/20">
            <CheckCircle className="w-3 h-3" />
            <span>Issued</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
            <Clock className="w-3 h-3 animate-pulse" />
            <span>Pending</span>
          </div>
        );
      case "retired":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-500/10 text-gray-500 border border-gray-500/20">
            <Lock className="w-3 h-3" />
            <span>Retired</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <ShoppingCart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Carbon Credit Marketplace
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Pasar Karbon Indonesia
          </h2>
          <p className="text-muted-foreground">
            Platform perdagangan kredit karbon terintegrasi blockchain dengan
            transparansi penuh
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Wallet className="w-4 h-4 mr-2" />
            Dompet Digital
          </Button>
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
          <p className="text-sm text-muted-foreground">Harga Pasar (tCO₂e)</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">24h Volume</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">$2.4M</p>
          <p className="text-sm text-muted-foreground">Volume Perdagangan</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-blue-500">Active</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">847</p>
          <p className="text-sm text-muted-foreground">Order Aktif</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">1.2M</p>
          <p className="text-sm text-muted-foreground">Credits Issued</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("orderbook")}
          className={`px-4 py-2 text-sm font-medium transition-all relative ${
            activeTab === "orderbook"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Orderbook
          {activeTab === "orderbook" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("mycredits")}
          className={`px-4 py-2 text-sm font-medium transition-all relative ${
            activeTab === "mycredits"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Kredit Saya
          {activeTab === "mycredits" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 text-sm font-medium transition-all relative ${
            activeTab === "history"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Riwayat Transaksi
          {activeTab === "history" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5bg-primary"
            />
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === "orderbook" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Buy Orders */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border bg-green-500/5">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Buy Orders
              </h3>
            </div>
            <div className="divide-y divide-border">
              <div className="grid grid-cols-3 gap-2 p-3 text-xs font-medium text-muted-foreground bg-secondary/30">
                <div>Harga (USD)</div>
                <div className="text-right">Volume</div>
                <div className="text-right">Total (USD)</div>
              </div>
              {mockOrderbook
                .filter((o) => o.type === "buy")
                .map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                    className="grid grid-cols-3 gap-2 p-3 text-sm cursor-pointer"
                  >
                    <div className="text-green-500 font-mono">
                      ${order.price.toFixed(2)}
                    </div>
                    <div className="text-right text-foreground font-mono">
                      {order.volume.toLocaleString()}
                    </div>
                    <div className="text-right text-muted-foreground font-mono">
                      ${order.total.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Sell Orders */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border bg-red-500/5">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                Sell Orders
              </h3>
            </div>
            <div className="divide-y divide-border">
              <div className="grid grid-cols-3 gap-2 p-3 text-xs font-medium text-muted-foreground bg-secondary/30">
                <div>Harga (USD)</div>
                <div className="text-right">Volume</div>
                <div className="text-right">Total (USD)</div>
              </div>
              {mockOrderbook
                .filter((o) => o.type === "sell")
                .map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.05)" }}
                    className="grid grid-cols-3 gap-2 p-3 text-sm cursor-pointer"
                  >
                    <div className="text-red-500 font-mono">
                      ${order.price.toFixed(2)}
                    </div>
                    <div className="text-right text-foreground font-mono">
                      {order.volume.toLocaleString()}
                    </div>
                    <div className="text-right text-muted-foreground font-mono">
                      ${order.total.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Transaksi Terakhir
              </h3>
            </div>
            <div className="divide-y divide-border">
              <div className="grid grid-cols-4 gap-2 p-3 text-xs font-medium text-muted-foreground bg-secondary/30">
                <div>Waktu</div>
                <div className="text-right">Harga</div>
                <div className="text-right">Volume</div>
                <div className="text-right">Nilai</div>
              </div>
              {tradeHistory.map((trade, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-2 p-3 text-sm">
                  <div className="text-muted-foreground font-mono">
                    {trade.time}
                  </div>
                  <div
                    className={`text-right font-mono ${
                      trade.type === "buy" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ${trade.price}
                  </div>
                  <div className="text-right text-foreground font-mono">
                    {trade.volume}
                  </div>
                  <div className="text-right text-muted-foreground font-mono">
                    ${trade.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "mycredits" && (
        <div className="grid grid-cols-1 gap-4">
          {mockCredits.map((credit) => (
            <motion.div
              key={credit.id}
              whileHover={{ scale: 1.01 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {credit.projectName}
                    </h3>
                    {getStatusBadge(credit.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Vintage: {credit.vintage}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {credit.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">tCO₂e</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Harga per Unit
                  </p>
                  <p className="font-semibold text-foreground">
                    ${credit.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Nilai
                  </p>
                  <p className="font-semibold text-foreground">
                    ${(credit.amount * credit.price).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Sertifikasi
                  </p>
                  <p className="font-semibold text-foreground">
                    {credit.certification}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  <span className="font-mono">{credit.blockchainTx}</span>
                </div>
                <div className="flex gap-2">
                  {credit.status === "issued" && (
                    <>
                      <Button size="sm" variant="outline">
                        Transfer
                      </Button>
                      <Button size="sm" className="bg-primary">
                        Jual
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/30 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Waktu
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Tipe
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                    Harga
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                    Volume
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tradeHistory.map((trade, idx) => (
                  <tr key={idx} className="hover:bg-secondary/20">
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                      {trade.time}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          trade.type === "buy"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {trade.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-mono text-foreground">
                      ${trade.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-mono text-foreground">
                      {trade.volume.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-mono text-foreground">
                      ${trade.value.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle className="w-3 h-3" />
                        <span>Completed</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blockchain Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              Blockchain Transparency
            </h4>
            <p className="text-sm text-muted-foreground">
              Setiap transaksi dicatat dalam blockchain untuk mencegah double
              counting dan memastikan integritas data sesuai dengan SRN-PPI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
