import React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Globe,
  Calendar,
  Trees,
  BarChart3,
  TrendingUp,
  Shield,
  DollarSign,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Activity,
  Leaf,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Layers,
  Map as MapIcon,
  Clock,
  Award,
  Users,
  Database,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageProvider";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export function CarbonMRVDashboard() {
  const { t } = useLanguage();
  const [selectedModule, setSelectedModule] = useState<string>("summary");

  // Mock Data - Baseline & Spatial Context
  const projectData = {
    name: "Proyek REDD+ Kalimantan Tengah",
    province: "Kalimantan Tengah",
    district: "Kabupaten Katingan",
    coordinates: { lat: -1.6833, lng: 113.0167 },
    totalArea: 157000, // hectares
    monitoringPeriod: { start: "2020-01-01", end: "2024-12-31" },
    ecosystemTypes: [
      { type: "primary-forest", area: 95000, percentage: 60.5 },
      { type: "secondary-forest", area: 45000, percentage: 28.7 },
      { type: "mangrove", area: 12000, percentage: 7.6 },
      { type: "non-forest", area: 5000, percentage: 3.2 },
    ],
  };

  // Carbon Stock Data (CS_T1 & CS_T2)
  const carbonStockData = {
    cs_t1: {
      year: 2020,
      primaryForest: 23750000, // tCO2e (95000 ha × 250 tC/ha × 3.67)
      secondaryForest: 20706250, // tCO2e (45000 ha × 125 tC/ha × 3.67)
      mangrove: 8808000, // tCO2e (12000 ha × 200 tC/ha × 3.67)
      total: 53264250, // tCO2e
    },
    cs_t2: {
      year: 2024,
      primaryForest: 23750000,
      secondaryForest: 21540375, // increased due to reforestation
      mangrove: 9248400, // increased
      total: 54538775, // tCO2e
    },
    methodology: {
      carbonFraction: 0.47,
      conversionFactor: 3.67, // C to CO2
      emissionFactorSource: "IPCC 2006 Guidelines, Tier 2",
      allometricEquation: "Chave et al. 2014 for tropical forests",
    },
  };

  // Time series data for carbon stock
  const carbonStockTimeSeries = [
    { year: 2020, stock: 53264, target: 53264 },
    { year: 2021, stock: 53450, target: 53550 },
    { year: 2022, stock: 53820, target: 54000 },
    { year: 2023, stock: 54200, target: 54250 },
    { year: 2024, stock: 54539, target: 54539 },
  ];

  // Emission Reduction / Removal Data
  const mitigationData = {
    activityType: "REDD+ (Deforestation Avoidance & Enhancement)",
    grossEmissionReduction: 1274525, // tCO2e (CS_T2 - CS_T1)
    grossRemoval: 0, // for EFCS projects
    deductions: {
      leakage: 63726, // 5% of gross
      uncertainty: 127453, // 10% of gross
      bufferPermanence: 191179, // 15% of gross
      total: 382358,
    },
    netEmissionReduction: 892167, // tCO2e (gross - deductions)
    baseline: 53264250,
    projectEmissions: 54538775,
    avoidedEmissions: 1274525,
  };

  // NEK Unit Conversion
  const nekData = {
    potentialSPE: 892167, // units
    verifiedSPE: 850000, // units (after MRV)
    issuedSPE: 800000, // units (issued in SRN-PPI)
    status: "Verified & Issued",
    mrvStage: {
      measurement: { status: "completed", date: "2024-03-15" },
      reporting: { status: "completed", date: "2024-06-20" },
      verification: {
        status: "completed",
        date: "2024-09-10",
        verifier: "TUV SUD Indonesia",
      },
    },
    srnppiRegistration: {
      registered: true,
      registrationNumber: "SRN-PPI-2024-REDD-001",
      registrationDate: "2024-10-01",
    },
    projectCategory: "REDD+",
    vintageYear: 2024,
  };

  // Economic & Trading Data
  const economicData = {
    pricePerTon: {
      current: 150000, // IDR
      low: 100000,
      medium: 150000,
      high: 250000,
    },
    totalPotentialValue: 892167 * 150000, // IDR
    unitsStatus: {
      sold: 400000,
      usedForOffset: 100000,
      inBuffer: 200000,
      available: 100000,
    },
    revenue: {
      realized: 60000000000, // IDR (400k units × 150k)
      potential: 15000000000, // IDR (100k available × 150k)
    },
    transactions: [
      {
        date: "2024-11-15",
        buyer: "PT Energi Hijau",
        volume: 100000,
        price: 155000,
        value: 15500000000,
      },
      {
        date: "2024-11-20",
        buyer: "PT Industri Berkelanjutan",
        volume: 150000,
        price: 148000,
        value: 22200000000,
      },
      {
        date: "2024-12-05",
        buyer: "International Carbon Fund",
        volume: 150000,
        price: 152000,
        value: 22800000000,
      },
    ],
  };

  // Price scenario comparison
  const priceScenarios = [
    {
      scenario: t.mrv_low_price || "Harga Rendah",
      price: 100000,
      revenue: 89216700000,
    },
    {
      scenario: t.mrv_medium_price || "Harga Sedang",
      price: 150000,
      revenue: 133825050000,
    },
    {
      scenario: t.mrv_high_price || "Harga Tinggi",
      price: 250000,
      revenue: 223041750000,
    },
  ];

  // Compliance & Governance Data
  const complianceData = {
    srnppiStatus: "Registered & Active",
    doubleCountingRisk: "Low",
    bufferPermanenceRequired: 191179, // units
    bufferPermanenceHeld: 200000, // units
    reportingObligation: {
      frequency: "Annual",
      nextDeadline: "2025-12-31",
      status: "On Track",
    },
    reversalRisk: {
      fire: "Medium",
      illegalLogging: "Low",
      policyChange: "Low",
      overall: "Low-Medium",
    },
    carbonStockMaintenanceObligation: {
      required: true,
      period: "30 years",
      startDate: "2020-01-01",
      endDate: "2050-01-01",
    },
    certifications: [
      {
        name: "VCS (Verified Carbon Standard)",
        status: "Active",
        validUntil: "2026-12-31",
      },
      {
        name: "CCBS (Climate, Community & Biodiversity)",
        status: "Active",
        validUntil: "2026-12-31",
      },
      {
        name: "SRN-PPI Registration",
        status: "Active",
        validUntil: "Permanent",
      },
    ],
  };

  // Executive Summary KPIs
  const executiveSummary = {
    totalCarbonStock: carbonStockData.cs_t2.total,
    totalEmissionReduction: mitigationData.netEmissionReduction,
    totalSPEGRK: nekData.issuedSPE,
    economicValue:
      economicData.revenue.realized + economicData.revenue.potential,
    projectStatus: "Verified & Trading Active",
    keyMetrics: [
      {
        label: t.mrv_carbon_stock || "Total Stok Karbon",
        value: "54.5 Mt",
        change: "+2.4%",
        trend: "up",
      },
      {
        label: t.mrv_emission_reduction || "Penurunan Emisi",
        value: "892 Kt",
        change: "Net ER",
        trend: "up",
      },
      {
        label: t.mrv_carbon_units || "Unit SPE-GRK",
        value: "800K",
        change: "Issued",
        trend: "stable",
      },
      {
        label: t.mrv_economic_value || "Nilai Ekonomi",
        value: "Rp 75 M",
        change: "+15%",
        trend: "up",
      },
    ],
  };

  // Ecosystem distribution for pie chart
  const ecosystemDistribution = projectData.ecosystemTypes.map((eco) => ({
    name:
      eco.type === "primary-forest"
        ? t.land_cover_primary_forest
        : eco.type === "secondary-forest"
          ? t.land_cover_secondary_forest
          : eco.type === "mangrove"
            ? t.land_cover_mangrove
            : "Non-Forest",
    value: eco.area,
    percentage: eco.percentage,
  }));

  const COLORS = ["#10b981", "#34d399", "#6ee7b7", "#d1d5db"];

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Activity className="w-3 h-3 mr-2" />
            {t.mrv_dashboard_badge || "Dashboard MRV Karbon"}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t.mrv_dashboard_title || "Carbon Intelligence Dashboard"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.mrv_dashboard_desc ||
              "Dashboard terpadu untuk monitoring, reporting, dan verification stok karbon dengan standar NEK Indonesia"}
          </p>
        </motion.div>

        {/* Module Navigation */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            {
              id: "summary",
              icon: BarChart3,
              label: t.mrv_module_summary || "Ringkasan Eksekutif",
            },
            {
              id: "baseline",
              icon: MapIcon,
              label: t.mrv_module_baseline || "Data Dasar & Spasial",
            },
            {
              id: "stock",
              icon: Trees,
              label: t.mrv_module_stock || "Stok Karbon",
            },
            {
              id: "mitigation",
              icon: TrendingUp,
              label: t.mrv_module_mitigation || "Hasil Mitigasi",
            },
            {
              id: "nek",
              icon: Award,
              label: t.mrv_module_nek || "Unit Karbon NEK",
            },
            {
              id: "economic",
              icon: DollarSign,
              label: t.mrv_module_economic || "Ekonomi & Trading",
            },
            {
              id: "compliance",
              icon: Shield,
              label: t.mrv_module_compliance || "Kepatuhan & Tata Kelola",
            },
          ].map((module) => (
            <Button
              key={module.id}
              onClick={() => setSelectedModule(module.id)}
              variant={selectedModule === module.id ? "default" : "outline"}
              className={`gap-2 ${selectedModule === module.id ? "bg-primary text-primary-foreground" : ""}`}
            >
              <module.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{module.label}</span>
            </Button>
          ))}
        </motion.div>

        {/* Module Content */}
        <motion.div
          key={selectedModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Executive Summary Module */}
          {selectedModule === "summary" && (
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {projectData.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {projectData.province}, {projectData.district}
                    </p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {executiveSummary.projectStatus}
                  </Badge>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {executiveSummary.keyMetrics.map((metric, idx) => (
                    <Card
                      key={idx}
                      className="p-4 bg-card/80 backdrop-blur-lg border-border/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs text-muted-foreground">
                          {metric.label}
                        </p>
                        {metric.trend === "up" && (
                          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        )}
                        {metric.trend === "down" && (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {metric.value}
                      </p>
                      <p className="text-xs text-primary">{metric.change}</p>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.mrv_total_area || "Luas Total"}
                      </p>
                      <p className="text-xl font-bold">
                        {projectData.totalArea.toLocaleString()} ha
                      </p>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full" />
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.mrv_monitoring_period || "Periode Monitoring"}
                      </p>
                      <p className="text-xl font-bold">2020-2024</p>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full" />
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.mrv_certifications || "Sertifikasi"}
                      </p>
                      <p className="text-xl font-bold">
                        {complianceData.certifications.length} Active
                      </p>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" />
                </Card>
              </div>

              {/* Status Overview */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  {t.mrv_project_status || "Status Proyek"}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium">MRV Status</p>
                      <p className="text-xs text-muted-foreground">
                        {nekData.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Database className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">SRN-PPI</p>
                      <p className="text-xs text-muted-foreground">
                        {complianceData.srnppiStatus}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium">Trading</p>
                      <p className="text-xs text-muted-foreground">
                        Active -{" "}
                        {economicData.unitsStatus.sold.toLocaleString()} units
                        sold
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Baseline & Spatial Module */}
          {selectedModule === "baseline" && (
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t.mrv_baseline_title || "Informasi Lokasi & Konteks Spasial"}
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Location Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t.mrv_location || "Lokasi"}
                        </p>
                        <p className="font-medium">{projectData.province}</p>
                        <p className="text-sm text-muted-foreground">
                          {projectData.district}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t.mrv_coordinates || "Koordinat"}
                        </p>
                        <p className="font-medium font-mono text-sm">
                          {projectData.coordinates.lat.toFixed(4)}°S,{" "}
                          {projectData.coordinates.lng.toFixed(4)}°E
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t.mrv_total_area || "Luas Total"}
                        </p>
                        <p className="font-medium">
                          {projectData.totalArea.toLocaleString()} hektar
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t.mrv_monitoring_period || "Periode Monitoring"}
                        </p>
                        <p className="font-medium">
                          {projectData.monitoringPeriod.start} s/d{" "}
                          {projectData.monitoringPeriod.end}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ecosystem Distribution Chart */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">
                      {t.mrv_ecosystem_distribution ||
                        "Distribusi Tipe Ekosistem"}
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={ecosystemDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) =>
                            `${name} ${percentage.toFixed(1)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {ecosystemDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Ecosystem Details Table */}
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    {t.mrv_ecosystem_details || "Detail Tutupan Lahan"}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            {t.mrv_ecosystem_type || "Tipe Ekosistem"}
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                            {t.mrv_area || "Luas (ha)"}
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                            {t.mrv_percentage || "Persentase"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectData.ecosystemTypes.map((eco, idx) => (
                          <tr key={idx} className="border-b border-border/50">
                            <td className="py-3 px-4 font-medium">
                              {eco.type === "primary-forest"
                                ? t.land_cover_primary_forest
                                : eco.type === "secondary-forest"
                                  ? t.land_cover_secondary_forest
                                  : eco.type === "mangrove"
                                    ? t.land_cover_mangrove
                                    : "Non-Forest"}
                            </td>
                            <td className="text-right py-3 px-4">
                              {eco.area.toLocaleString()}
                            </td>
                            <td className="text-right py-3 px-4">
                              {eco.percentage.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 p-12 bg-muted/30 rounded-lg border-2 border-dashed border-border text-center">
                  <MapIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    {t.mrv_map_placeholder || "Peta Tutupan Lahan & Perubahan"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.mrv_map_desc ||
                      "Visualisasi spasial menggunakan data satelit Sentinel-2"}
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Carbon Stock Module */}
          {selectedModule === "stock" && (
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Trees className="w-5 h-5 text-primary" />
                  {t.mrv_stock_title || "Stok Karbon (CS_T1 & CS_T2)"}
                </h2>

                {/* Stock Comparison */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/20">
                    <Badge className="mb-3 bg-blue-500/20 text-blue-600 border-blue-500/30">
                      Baseline (T1)
                    </Badge>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {(carbonStockData.cs_t1.total / 1000000).toFixed(2)} Mt
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {carbonStockData.cs_t1.year} -{" "}
                      {t.mrv_initial_stock || "Stok Karbon Awal"}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.land_cover_primary_forest}
                        </span>
                        <span className="font-medium">
                          {(
                            carbonStockData.cs_t1.primaryForest / 1000000
                          ).toFixed(2)}{" "}
                          Mt
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.land_cover_secondary_forest}
                        </span>
                        <span className="font-medium">
                          {(
                            carbonStockData.cs_t1.secondaryForest / 1000000
                          ).toFixed(2)}{" "}
                          Mt
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.land_cover_mangrove}
                        </span>
                        <span className="font-medium">
                          {(carbonStockData.cs_t1.mangrove / 1000000).toFixed(
                            2,
                          )}{" "}
                          Mt
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/20">
                    <Badge className="mb-3 bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                      Current (T2)
                    </Badge>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {(carbonStockData.cs_t2.total / 1000000).toFixed(2)} Mt
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {carbonStockData.cs_t2.year} -{" "}
                      {t.mrv_current_stock || "Stok Karbon Terkini"}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.land_cover_primary_forest}
                        </span>
                        <span className="font-medium">
                          {(
                            carbonStockData.cs_t2.primaryForest / 1000000
                          ).toFixed(2)}{" "}
                          Mt
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.land_cover_secondary_forest}
                        </span>
                        <span className="font-medium">
                          {(
                            carbonStockData.cs_t2.secondaryForest / 1000000
                          ).toFixed(2)}{" "}
                          Mt
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.land_cover_mangrove}
                        </span>
                        <span className="font-medium">
                          {(carbonStockData.cs_t2.mangrove / 1000000).toFixed(
                            2,
                          )}{" "}
                          Mt
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Time Series Chart */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    {t.mrv_stock_trend || "Tren Stok Karbon 2020-2024"}
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={carbonStockTimeSeries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="year" stroke="#888" />
                      <YAxis
                        stroke="#888"
                        label={{
                          value: "Kt CO2e",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a1a",
                          border: "1px solid #333",
                        }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="stock"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        name={t.mrv_actual_stock || "Stok Aktual"}
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.1}
                        strokeDasharray="5 5"
                        name={t.mrv_target_stock || "Target"}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Methodology */}
                <Card className="p-6 bg-muted/30">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    {t.mrv_methodology || "Metodologi Perhitungan"}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t.mrv_carbon_fraction || "Fraksi Karbon"}
                      </p>
                      <p className="font-medium">
                        {carbonStockData.methodology.carbonFraction}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t.mrv_conversion_factor || "Faktor Konversi C→CO₂"}
                      </p>
                      <p className="font-medium">
                        {carbonStockData.methodology.conversionFactor}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground mb-1">
                        {t.mrv_emission_source || "Sumber Faktor Emisi"}
                      </p>
                      <p className="font-medium">
                        {carbonStockData.methodology.emissionFactorSource}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground mb-1">
                        {t.mrv_allometric || "Persamaan Alometrik"}
                      </p>
                      <p className="font-medium">
                        {carbonStockData.methodology.allometricEquation}
                      </p>
                    </div>
                  </div>
                </Card>
              </Card>
            </div>
          )}

          {/* Mitigation Module */}
          {selectedModule === "mitigation" && (
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {t.mrv_mitigation_title ||
                    "Hasil Mitigasi (Emission Reduction/Removal)"}
                </h2>

                {/* Activity Type */}
                <div className="mb-6">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {mitigationData.activityType}
                  </Badge>
                </div>

                {/* Gross ER */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {t.mrv_gross_er || "Gross Emission Reduction"}
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {(
                            mitigationData.grossEmissionReduction / 1000
                          ).toLocaleString()}{" "}
                          Kt
                        </p>
                      </div>
                      <ArrowUpRight className="w-8 h-8 text-emerald-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      CS_T2 - CS_T1 ={" "}
                      {(mitigationData.grossEmissionReduction / 1000).toFixed(
                        0,
                      )}{" "}
                      Kt CO₂e
                    </p>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {t.mrv_net_er || "Net Emission Reduction"}
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {(
                            mitigationData.netEmissionReduction / 1000
                          ).toLocaleString()}{" "}
                          Kt
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t.mrv_after_deductions ||
                        "Setelah dikurangi faktor risiko"}
                    </p>
                  </Card>
                </div>

                {/* Deductions Breakdown */}
                <Card className="p-6 bg-muted/30 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    {t.mrv_deductions || "Pengurangan Faktor Risiko"}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <span className="text-sm">
                        {t.mrv_leakage || "Leakage (5%)"}
                      </span>
                      <span className="font-medium">
                        {(mitigationData.deductions.leakage / 1000).toFixed(1)}{" "}
                        Kt
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <span className="text-sm">
                        {t.mrv_uncertainty || "Uncertainty (10%)"}
                      </span>
                      <span className="font-medium">
                        {(mitigationData.deductions.uncertainty / 1000).toFixed(
                          1,
                        )}{" "}
                        Kt
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <span className="text-sm">
                        {t.mrv_buffer || "Buffer Permanence (15%)"}
                      </span>
                      <span className="font-medium">
                        {(
                          mitigationData.deductions.bufferPermanence / 1000
                        ).toFixed(1)}{" "}
                        Kt
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <span className="font-semibold">
                        {t.mrv_total_deductions || "Total Pengurangan"}
                      </span>
                      <span className="font-bold text-primary">
                        {(mitigationData.deductions.total / 1000).toFixed(1)} Kt
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Visual Calculation */}
                <div className="p-6 bg-gradient-to-r from-card to-secondary/30 rounded-lg border border-border">
                  <h3 className="font-semibold mb-4">
                    {t.mrv_calculation || "Perhitungan"}
                  </h3>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex items-center justify-between">
                      <span>Gross ER:</span>
                      <span className="text-emerald-500 font-bold">
                        +{" "}
                        {(mitigationData.grossEmissionReduction / 1000).toFixed(
                          0,
                        )}{" "}
                        Kt
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Leakage:</span>
                      <span className="text-red-400">
                        -{" "}
                        {(mitigationData.deductions.leakage / 1000).toFixed(0)}{" "}
                        Kt
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Uncertainty:</span>
                      <span className="text-red-400">
                        -{" "}
                        {(mitigationData.deductions.uncertainty / 1000).toFixed(
                          0,
                        )}{" "}
                        Kt
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Buffer:</span>
                      <span className="text-red-400">
                        -{" "}
                        {(
                          mitigationData.deductions.bufferPermanence / 1000
                        ).toFixed(0)}{" "}
                        Kt
                      </span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center justify-between text-base">
                      <span className="font-bold">Net ER:</span>
                      <span className="text-primary font-bold">
                        ={" "}
                        {(mitigationData.netEmissionReduction / 1000).toFixed(
                          0,
                        )}{" "}
                        Kt
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* NEK Unit Conversion Module */}
          {selectedModule === "nek" && (
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  {t.mrv_nek_title || "Konversi ke Unit Karbon NEK (SPE-GRK)"}
                </h2>

                {/* SPE-GRK Status */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 bg-amber-500/10 border-2 border-amber-500/20">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.mrv_potential_spe || "Potensi SPE-GRK"}
                    </p>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {nekData.potentialSPE.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">units</p>
                  </Card>

                  <Card className="p-6 bg-blue-500/10 border-2 border-blue-500/20">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.mrv_verified_spe || "Terverifikasi"}
                    </p>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {nekData.verifiedSPE.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">units</p>
                  </Card>

                  <Card className="p-6 bg-emerald-500/10 border-2 border-emerald-500/20">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.mrv_issued_spe || "Diterbitkan"}
                    </p>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {nekData.issuedSPE.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">units</p>
                  </Card>
                </div>

                {/* MRV Stage */}
                <Card className="p-6 bg-muted/30 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    {t.mrv_stage ||
                      "Tahap MRV (Measurement–Reporting–Verification)"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Measurement</p>
                          <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                            {nekData.mrvStage.measurement.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {nekData.mrvStage.measurement.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Reporting</p>
                          <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                            {nekData.mrvStage.reporting.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {nekData.mrvStage.reporting.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Verification</p>
                          <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                            {nekData.mrvStage.verification.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {nekData.mrvStage.verification.date} -{" "}
                          {nekData.mrvStage.verification.verifier}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* SRN-PPI Registration */}
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" />
                        {t.mrv_srnppi || "Registrasi SRN-PPI"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Sistem Registrasi Nasional Pengendalian Perubahan Iklim
                      </p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Registered
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t.mrv_registration_number || "Nomor Registrasi"}
                      </p>
                      <p className="font-mono font-medium">
                        {nekData.srnppiRegistration.registrationNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t.mrv_registration_date || "Tanggal Registrasi"}
                      </p>
                      <p className="font-medium">
                        {nekData.srnppiRegistration.registrationDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t.mrv_project_category || "Kategori Proyek"}
                      </p>
                      <p className="font-medium">{nekData.projectCategory}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t.mrv_vintage_year || "Vintage Year"}
                      </p>
                      <p className="font-medium">{nekData.vintageYear}</p>
                    </div>
                  </div>
                </Card>
              </Card>
            </div>
          )}

          {/* Economic & Trading Module */}
          {selectedModule === "economic" && (
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  {t.mrv_economic_title || "Ekonomi & Perdagangan Karbon"}
                </h2>

                {/* Current Price & Total Value */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-2 border-amber-500/20">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.mrv_current_price || "Harga Terkini"}
                    </p>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      Rp {(economicData.pricePerTon.current / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-muted-foreground">per tCO₂e</p>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/20">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.mrv_total_value || "Total Nilai Ekonomi"}
                    </p>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      Rp{" "}
                      {(economicData.totalPotentialValue / 1000000000).toFixed(
                        1,
                      )}
                      M
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.mrv_potential_value || "Nilai potensi"}
                    </p>
                  </Card>
                </div>

                {/* Units Status */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    {t.mrv_units_status || "Status Unit Karbon"}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center bg-emerald-500/10 border-emerald-500/20">
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {(economicData.unitsStatus.sold / 1000).toFixed(0)}K
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.mrv_sold || "Terjual"}
                      </p>
                    </Card>
                    <Card className="p-4 text-center bg-blue-500/10 border-blue-500/20">
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {(
                          economicData.unitsStatus.usedForOffset / 1000
                        ).toFixed(0)}
                        K
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.mrv_offset || "Offset Internal"}
                      </p>
                    </Card>
                    <Card className="p-4 text-center bg-amber-500/10 border-amber-500/20">
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {(economicData.unitsStatus.inBuffer / 1000).toFixed(0)}K
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.mrv_buffer || "Buffer"}
                      </p>
                    </Card>
                    <Card className="p-4 text-center bg-purple-500/10 border-purple-500/20">
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {(economicData.unitsStatus.available / 1000).toFixed(0)}
                        K
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.mrv_available || "Tersedia"}
                      </p>
                    </Card>
                  </div>
                </div>

                {/* Price Scenario */}
                <Card className="p-6 bg-muted/30 mb-6">
                  <h3 className="font-semibold mb-4">
                    {t.mrv_price_scenarios || "Skenario Harga & Nilai Potensi"}
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={priceScenarios}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="scenario" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a1a",
                          border: "1px solid #333",
                        }}
                        formatter={(value: number) =>
                          `Rp ${(value / 1000000000).toFixed(1)}M`
                        }
                      />
                      <Bar dataKey="revenue" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Recent Transactions */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    {t.mrv_recent_transactions || "Transaksi Terkini"}
                  </h3>
                  <div className="space-y-3">
                    {economicData.transactions.map((tx, idx) => (
                      <Card key={idx} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{tx.buyer}</p>
                            <p className="text-sm text-muted-foreground">
                              {tx.date}
                            </p>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                            {t.mrv_completed || "Selesai"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {tx.volume.toLocaleString()} units @ Rp{" "}
                            {(tx.price / 1000).toFixed(0)}K
                          </span>
                          <span className="font-semibold text-primary">
                            Rp {(tx.value / 1000000000).toFixed(1)}M
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Compliance & Governance Module */}
          {selectedModule === "compliance" && (
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  {t.mrv_compliance_title || "Kepatuhan & Tata Kelola"}
                </h2>

                {/* Compliance Status Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 bg-emerald-500/10 border-2 border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                      <h3 className="font-semibold">
                        {t.mrv_srnppi_status || "Status SRN-PPI"}
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-1">
                      {complianceData.srnppiStatus}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {nekData.srnppiRegistration.registrationNumber}
                    </p>
                  </Card>

                  <Card className="p-6 bg-blue-500/10 border-2 border-blue-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Lock className="w-6 h-6 text-blue-500" />
                      <h3 className="font-semibold">
                        {t.mrv_double_counting || "Double Counting Risk"}
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-1">
                      {complianceData.doubleCountingRisk}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.mrv_blockchain_protected || "Protected by blockchain"}
                    </p>
                  </Card>
                </div>

                {/* Buffer Permanence */}
                <Card className="p-6 bg-muted/30 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    {t.mrv_buffer_permanence || "Buffer Permanence"}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.mrv_required || "Diwajibkan"}
                      </p>
                      <p className="text-2xl font-bold">
                        {complianceData.bufferPermanenceRequired.toLocaleString()}{" "}
                        units
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.mrv_held || "Tersimpan"}
                      </p>
                      <p className="text-2xl font-bold text-emerald-500">
                        {complianceData.bufferPermanenceHeld.toLocaleString()}{" "}
                        units
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{
                        width: `${(complianceData.bufferPermanenceHeld / complianceData.bufferPermanenceRequired) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {(
                      (complianceData.bufferPermanenceHeld /
                        complianceData.bufferPermanenceRequired) *
                      100
                    ).toFixed(1)}
                    % {t.mrv_fulfilled || "terpenuhi"}
                  </p>
                </Card>

                {/* Reporting Obligation */}
                <Card className="p-6 bg-muted/30 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    {t.mrv_reporting_obligation || "Kewajiban Pelaporan"}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.mrv_frequency || "Frekuensi"}
                      </p>
                      <p className="font-medium">
                        {complianceData.reportingObligation.frequency}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.mrv_next_deadline || "Deadline Berikutnya"}
                      </p>
                      <p className="font-medium">
                        {complianceData.reportingObligation.nextDeadline}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Status
                      </p>
                      <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                        {complianceData.reportingObligation.status}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Reversal Risk */}
                <Card className="p-6 bg-muted/30 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    {t.mrv_reversal_risk || "Risiko Reversal"}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <span className="text-sm">
                        {t.mrv_fire_risk || "Kebakaran"}
                      </span>
                      <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">
                        {complianceData.reversalRisk.fire}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <span className="text-sm">
                        {t.mrv_logging_risk || "Illegal Logging"}
                      </span>
                      <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                        {complianceData.reversalRisk.illegalLogging}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <span className="text-sm">
                        {t.mrv_policy_risk || "Perubahan Kebijakan"}
                      </span>
                      <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                        {complianceData.reversalRisk.policyChange}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <span className="font-semibold">
                        {t.mrv_overall_risk || "Risiko Keseluruhan"}
                      </span>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {complianceData.reversalRisk.overall}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Maintenance Obligation */}
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {t.mrv_maintenance_obligation ||
                      "Kewajiban Pemeliharaan Stok Karbon"}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.mrv_period || "Periode"}
                      </p>
                      <p className="font-medium">
                        {complianceData.carbonStockMaintenanceObligation.period}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.mrv_start_date || "Mulai"}
                      </p>
                      <p className="font-medium">
                        {
                          complianceData.carbonStockMaintenanceObligation
                            .startDate
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.mrv_end_date || "Berakhir"}
                      </p>
                      <p className="font-medium">
                        {
                          complianceData.carbonStockMaintenanceObligation
                            .endDate
                        }
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Certifications */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    {t.mrv_active_certifications || "Sertifikasi Aktif"}
                  </h3>
                  <div className="space-y-3">
                    {complianceData.certifications.map((cert, idx) => (
                      <Card
                        key={idx}
                        className="p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {t.mrv_valid_until || "Valid hingga"}:{" "}
                              {cert.validUntil}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                          {cert.status}
                        </Badge>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <FileCheck className="w-4 h-4" />
            {t.mrv_download_report || "Download Laporan MRV"}
          </Button>
          <Button variant="outline" className="gap-2">
            <Users className="w-4 h-4" />
            {t.mrv_share_stakeholders || "Bagikan ke Stakeholder"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
