import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Car,
  Plane,
  Zap,
  Leaf,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Download,
  Info,
  TreeDeciduous,
  Factory,
  Fuel,
  Globe,
  Award,
  Target,
  Map,
  Layers,
  MapPin,
  Ruler,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Beef,
  Trash2,
  Plus,
  Minus,
  Maximize2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../components/LanguageProvider";

// =============================================
// TYPES
// =============================================

interface EmissionFactor {
  nameId: string;
  nameEn: string;
  factor: number;
  unitId: string;
  unitEn: string;
  source: string;
}

interface LandType {
  nameId: string;
  nameEn: string;
  icon: string;
  aboveground: number;
  belowground: number;
  deadwood: number;
  litter: number;
  soil: number;
  total: number;
  color: string;
  bgColor: string;
  descId: string;
  descEn: string;
}

// =============================================
// DATA - IPCC 2019
// =============================================

const EMISSION_FACTORS: Record<string, EmissionFactor> = {
  electricity: {
    nameId: "Listrik",
    nameEn: "Electricity",
    factor: 0.855,
    unitId: "kWh/bulan",
    unitEn: "kWh/month",
    source: "ESDM Indonesia 2023",
  },
  transport: {
    nameId: "Transportasi Darat",
    nameEn: "Ground Transport",
    factor: 0.21,
    unitId: "km/bulan",
    unitEn: "km/month",
    source: "IPCC 2019",
  },
  flight: {
    nameId: "Penerbangan",
    nameEn: "Air Travel",
    factor: 0.255,
    unitId: "km/tahun",
    unitEn: "km/year",
    source: "ICAO",
  },
  fuel_gasoline: {
    nameId: "Bensin",
    nameEn: "Gasoline",
    factor: 2.31,
    unitId: "liter/bulan",
    unitEn: "liters/month",
    source: "IPCC 2019",
  },
  fuel_diesel: {
    nameId: "Solar",
    nameEn: "Diesel",
    factor: 2.68,
    unitId: "liter/bulan",
    unitEn: "liters/month",
    source: "IPCC 2019",
  },
  lpg: {
    nameId: "Gas LPG",
    nameEn: "LPG Gas",
    factor: 2.98,
    unitId: "kg/bulan",
    unitEn: "kg/month",
    source: "IPCC 2019",
  },
  meat_beef: {
    nameId: "Daging Sapi",
    nameEn: "Beef",
    factor: 27.0,
    unitId: "kg/bulan",
    unitEn: "kg/month",
    source: "Poore & Nemecek 2018",
  },
  meat_chicken: {
    nameId: "Daging Ayam",
    nameEn: "Chicken",
    factor: 6.9,
    unitId: "kg/bulan",
    unitEn: "kg/month",
    source: "Poore & Nemecek 2018",
  },
  waste: {
    nameId: "Sampah",
    nameEn: "Waste",
    factor: 0.5,
    unitId: "kg/bulan",
    unitEn: "kg/month",
    source: "IPCC 2019",
  },
};

const CARBON_STOCK_FACTORS: Record<string, LandType> = {
  tropical_rainforest: {
    nameId: "Hutan Hujan Tropis",
    nameEn: "Tropical Rainforest",
    icon: "🌳",
    aboveground: 180,
    belowground: 49,
    deadwood: 20,
    litter: 5,
    soil: 86,
    total: 340,
    color: "from-green-600 to-emerald-700",
    bgColor: "#059669",
    descId: "Hutan primer dengan keanekaragaman tinggi",
    descEn: "Primary forest with high biodiversity",
  },
  mangrove: {
    nameId: "Mangrove",
    nameEn: "Mangrove Forest",
    icon: "🌿",
    aboveground: 120,
    belowground: 60,
    deadwood: 15,
    litter: 3,
    soil: 386,
    total: 584,
    color: "from-teal-600 to-cyan-700",
    bgColor: "#0d9488",
    descId: "Ekosistem pesisir dengan stok karbon tanah tinggi",
    descEn: "Coastal ecosystem with high soil carbon stock",
  },
  peatland_forest: {
    nameId: "Hutan Gambut",
    nameEn: "Peatland Forest",
    icon: "🌲",
    aboveground: 150,
    belowground: 40,
    deadwood: 18,
    litter: 4,
    soil: 2000,
    total: 2212,
    color: "from-amber-700 to-orange-800",
    bgColor: "#b45309",
    descId: "Hutan di lahan gambut dengan stok karbon sangat tinggi",
    descEn: "Forest on peatland with very high carbon stock",
  },
  secondary_forest: {
    nameId: "Hutan Sekunder",
    nameEn: "Secondary Forest",
    icon: "🌳",
    aboveground: 100,
    belowground: 27,
    deadwood: 10,
    litter: 3,
    soil: 70,
    total: 210,
    color: "from-lime-600 to-green-700",
    bgColor: "#65a30d",
    descId: "Hutan yang telah mengalami regenerasi",
    descEn: "Forest that has undergone regeneration",
  },
  agroforestry: {
    nameId: "Agroforestri",
    nameEn: "Agroforestry",
    icon: "🌴",
    aboveground: 60,
    belowground: 16,
    deadwood: 5,
    litter: 2,
    soil: 60,
    total: 143,
    color: "from-yellow-600 to-amber-700",
    bgColor: "#ca8a04",
    descId: "Kombinasi pertanian dan kehutanan",
    descEn: "Combination of agriculture and forestry",
  },
  rubber_plantation: {
    nameId: "Perkebunan Karet",
    nameEn: "Rubber Plantation",
    icon: "🌳",
    aboveground: 55,
    belowground: 15,
    deadwood: 3,
    litter: 2,
    soil: 45,
    total: 120,
    color: "from-emerald-600 to-green-700",
    bgColor: "#059669",
    descId: "Perkebunan karet monokultur",
    descEn: "Monoculture rubber plantation",
  },
  oil_palm: {
    nameId: "Kelapa Sawit",
    nameEn: "Oil Palm",
    icon: "🌴",
    aboveground: 40,
    belowground: 11,
    deadwood: 2,
    litter: 2,
    soil: 40,
    total: 95,
    color: "from-orange-600 to-red-700",
    bgColor: "#ea580c",
    descId: "Perkebunan kelapa sawit",
    descEn: "Oil palm plantation",
  },
  grassland: {
    nameId: "Padang Rumput",
    nameEn: "Grassland",
    icon: "🌾",
    aboveground: 3,
    belowground: 12,
    deadwood: 0,
    litter: 1,
    soil: 50,
    total: 66,
    color: "from-lime-500 to-yellow-600",
    bgColor: "#84cc16",
    descId: "Lahan rumput alami atau savana",
    descEn: "Natural grassland or savanna",
  },
  rice_paddy: {
    nameId: "Sawah Padi",
    nameEn: "Rice Paddy",
    icon: "🌾",
    aboveground: 2,
    belowground: 1,
    deadwood: 0,
    litter: 1,
    soil: 55,
    total: 59,
    color: "from-green-500 to-lime-600",
    bgColor: "#22c55e",
    descId: "Lahan pertanian padi",
    descEn: "Rice paddy field",
  },
};

const CARBON_CREDIT_PRICES = {
  voluntary: {
    vcs: { name: "VCS (Verra)", min: 5, max: 20, avg: 12 },
    gold_standard: { name: "Gold Standard", min: 8, max: 30, avg: 18 },
    plan_vivo: { name: "Plan Vivo", min: 10, max: 25, avg: 15 },
  },
  compliance: {
    eu_ets: { name: "EU ETS", min: 80, max: 100, avg: 90 },
    korea_ets: { name: "Korea ETS", min: 15, max: 25, avg: 20 },
    china_ets: { name: "China ETS", min: 8, max: 12, avg: 10 },
  },
  indonesia: {
    idx_carbon: { name: "IDX Carbon", min: 5, max: 15, avg: 10 },
    srn_ppi: { name: "SRN-PPI", min: 2, max: 10, avg: 5 },
  },
};

const INDONESIA_LOCATIONS = [
  {
    nameId: "Kalimantan Timur",
    nameEn: "East Kalimantan",
    lat: 0.5387,
    lng: 116.4194,
    zoom: 8,
  },
  {
    nameId: "Riau (Gambut)",
    nameEn: "Riau (Peatland)",
    lat: 1.4927,
    lng: 102.1489,
    zoom: 8,
  },
  {
    nameId: "Papua Barat",
    nameEn: "West Papua",
    lat: -1.3361,
    lng: 133.1747,
    zoom: 7,
  },
  {
    nameId: "Sulawesi Selatan",
    nameEn: "South Sulawesi",
    lat: -3.6687,
    lng: 119.974,
    zoom: 8,
  },
  {
    nameId: "Sumatra Barat",
    nameEn: "West Sumatra",
    lat: -0.7399,
    lng: 100.8,
    zoom: 8,
  },
  { nameId: "Bali", nameEn: "Bali", lat: -8.3405, lng: 115.092, zoom: 10 },
  {
    nameId: "Jawa Tengah",
    nameEn: "Central Java",
    lat: -7.151,
    lng: 110.1403,
    zoom: 9,
  },
  {
    nameId: "NTT (Mangrove)",
    nameEn: "NTT (Mangrove)",
    lat: -8.6574,
    lng: 121.0794,
    zoom: 8,
  },
];

// =============================================
// MAIN COMPONENT
// =============================================

export const CalculatorPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"footprint" | "stock" | "credit">(
    "footprint",
  );

  const tabLabels = {
    footprint: language === "id" ? "Jejak Karbon" : "Carbon Footprint",
    stock: language === "id" ? "Stok Karbon & Peta" : "Carbon Stock & Map",
    credit: language === "id" ? "Kredit Karbon" : "Carbon Credit",
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {language === "id" ? "Kalkulator Karbon" : "Carbon Calculator"}
              </h1>
              <p className="text-gray-400 text-sm">
                {language === "id"
                  ? "Metodologi IPCC 2019"
                  : "IPCC 2019 Methodology"}
              </p>
            </div>
          </div>
          <p className="text-gray-400 mt-2">
            {language === "id"
              ? "Hitung jejak karbon, stok karbon lahan dengan peta interaktif, dan estimasi kredit karbon"
              : "Calculate carbon footprint, land carbon stock with interactive map, and carbon credit estimation"}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-[#1a2420] rounded-2xl border border-emerald-900/30">
        {[
          {
            id: "footprint" as const,
            icon: <TrendingUp className="w-4 h-4" />,
          },
          { id: "stock" as const, icon: <Map className="w-4 h-4" /> },
          { id: "credit" as const, icon: <DollarSign className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-emerald-500/10"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tabLabels[tab.id]}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "footprint" && (
          <CarbonFootprintCalculator key="footprint" />
        )}
        {activeTab === "stock" && <CarbonStockCalculator key="stock" />}
        {activeTab === "credit" && <CarbonCreditCalculator key="credit" />}
      </AnimatePresence>
    </div>
  );
};

// =============================================
// CARBON FOOTPRINT CALCULATOR
// =============================================

const CarbonFootprintCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [values, setValues] = useState<Record<string, number>>({
    electricity: 350,
    transport: 500,
    flight: 5000,
    fuel_gasoline: 60,
    fuel_diesel: 0,
    lpg: 12,
    meat_beef: 3,
    meat_chicken: 5,
    waste: 30,
  });

  const categories = [
    {
      id: "electricity",
      icon: <Zap className="w-5 h-5" />,
      color: "from-yellow-500 to-amber-500",
      max: 2000,
    },
    {
      id: "transport",
      icon: <Car className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      max: 3000,
    },
    {
      id: "flight",
      icon: <Plane className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      max: 50000,
    },
    {
      id: "fuel_gasoline",
      icon: <Fuel className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      max: 500,
    },
    {
      id: "fuel_diesel",
      icon: <Fuel className="w-5 h-5" />,
      color: "from-gray-500 to-slate-600",
      max: 500,
    },
    {
      id: "lpg",
      icon: <Factory className="w-5 h-5" />,
      color: "from-teal-500 to-emerald-500",
      max: 50,
    },
    {
      id: "meat_beef",
      icon: <Beef className="w-5 h-5" />,
      color: "from-red-500 to-rose-500",
      max: 30,
    },
    {
      id: "meat_chicken",
      icon: <Beef className="w-5 h-5" />,
      color: "from-amber-500 to-yellow-500",
      max: 30,
    },
    {
      id: "waste",
      icon: <Trash2 className="w-5 h-5" />,
      color: "from-stone-500 to-zinc-600",
      max: 100,
    },
  ];

  const calculateEmission = (id: string) => {
    const value = values[id] || 0;
    const factor = EMISSION_FACTORS[id].factor;
    if (id === "flight") return (value * factor) / 1000;
    return (value * factor * 12) / 1000;
  };

  const totalEmissions = Object.keys(EMISSION_FACTORS).reduce(
    (sum, id) => sum + calculateEmission(id),
    0,
  );

  const getEmissionLevel = () => {
    if (totalEmissions < 2)
      return {
        levelId: "Rendah",
        levelEn: "Low",
        bg: "from-emerald-500 to-green-500",
        emoji: "🌱",
      };
    if (totalEmissions < 5)
      return {
        levelId: "Sedang",
        levelEn: "Medium",
        bg: "from-yellow-500 to-amber-500",
        emoji: "⚠️",
      };
    if (totalEmissions < 10)
      return {
        levelId: "Tinggi",
        levelEn: "High",
        bg: "from-orange-500 to-red-500",
        emoji: "🔥",
      };
    return {
      levelId: "Sangat Tinggi",
      levelEn: "Very High",
      bg: "from-red-500 to-rose-600",
      emoji: "🚨",
    };
  };

  const level = getEmissionLevel();
  const treesNeeded = Math.ceil((totalEmissions * 1000) / 22);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">
            {language === "id" ? "Input Aktivitas" : "Activity Input"}
          </h3>
          <button
            onClick={() =>
              setValues(
                Object.fromEntries(Object.keys(values).map((k) => [k, 0])),
              )
            }
            className="text-sm text-gray-400 hover:text-emerald-400 flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const ef = EMISSION_FACTORS[cat.id];
            const emission = calculateEmission(cat.id);
            return (
              <div
                key={cat.id}
                className="bg-[#1a2420] rounded-xl border border-emerald-900/30 p-4 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 bg-gradient-to-br ${cat.color} rounded-lg`}
                    >
                      <span className="text-white">{cat.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">
                        {language === "id" ? ef.nameId : ef.nameEn}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === "id" ? ef.unitId : ef.unitEn}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">
                      {emission.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      tCO₂/{language === "id" ? "tahun" : "year"}
                    </p>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={cat.max}
                  value={values[cat.id] || 0}
                  onChange={(e) =>
                    setValues({ ...values, [cat.id]: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-[#0d1411] rounded-lg appearance-none cursor-pointer mb-2"
                  style={{
                    background: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${((values[cat.id] || 0) / cat.max) * 100}%, rgb(13, 20, 17) ${((values[cat.id] || 0) / cat.max) * 100}%, rgb(13, 20, 17) 100%)`,
                  }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">0</span>
                  <input
                    type="number"
                    value={values[cat.id] || 0}
                    onChange={(e) =>
                      setValues({ ...values, [cat.id]: Number(e.target.value) })
                    }
                    className="w-20 px-2 py-1 bg-[#0d1411] border border-emerald-900/30 rounded-lg text-center text-white text-sm"
                  />
                  <span className="text-xs text-gray-600">{cat.max}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div
          className={`bg-gradient-to-br ${level.bg} rounded-2xl p-6 text-white`}
        >
          <p className="text-sm opacity-80 mb-1">
            {language === "id"
              ? "Total Emisi Tahunan"
              : "Total Annual Emissions"}
          </p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold">
              {totalEmissions.toFixed(1)}
            </span>
            <span className="text-lg opacity-80">
              tCO₂/{language === "id" ? "tahun" : "year"}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
            <span>{level.emoji}</span>
            <span className="font-medium">
              Level: {language === "id" ? level.levelId : level.levelEn}
            </span>
          </div>
        </div>

        <div className="bg-[#1a2420] rounded-xl border border-emerald-900/30 p-4 space-y-3">
          <h4 className="font-medium text-white text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            {language === "id" ? "Perbandingan" : "Comparison"}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-[#0d1411] rounded-lg">
              <span className="text-gray-400 text-sm">
                {language === "id"
                  ? "vs Rata-rata Indonesia"
                  : "vs Indonesia Average"}
              </span>
              <span
                className={`font-medium ${totalEmissions > 2.3 ? "text-red-400" : "text-emerald-400"}`}
              >
                {totalEmissions > 2.3 ? "+" : ""}
                {(totalEmissions - 2.3).toFixed(1)} ton
              </span>
            </div>
            <div className="flex justify-between p-2 bg-[#0d1411] rounded-lg">
              <span className="text-gray-400 text-sm">
                {language === "id"
                  ? "vs Rata-rata Global"
                  : "vs Global Average"}
              </span>
              <span
                className={`font-medium ${totalEmissions > 4.7 ? "text-red-400" : "text-emerald-400"}`}
              >
                {totalEmissions > 4.7 ? "+" : ""}
                {(totalEmissions - 4.7).toFixed(1)} ton
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#1a2420] rounded-xl border border-emerald-900/30 p-4">
          <h4 className="font-medium text-white text-sm mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            {language === "id" ? "Kebutuhan Offset" : "Offset Needs"}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-[#0d1411] rounded-lg text-center">
              <TreeDeciduous className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">
                {treesNeeded.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                {language === "id" ? "Pohon/tahun" : "Trees/year"}
              </p>
            </div>
            <div className="p-3 bg-[#0d1411] rounded-lg text-center">
              <Award className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">
                {totalEmissions.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">Carbon Credit</p>
            </div>
          </div>
        </div>

        <Link
          to="/marketplace"
          className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
        >
          {language === "id" ? "Beli Carbon Credit" : "Buy Carbon Credit"} →
        </Link>
      </div>
    </motion.div>
  );
};

// =============================================
// CARBON STOCK CALCULATOR WITH MAP
// =============================================

const CarbonStockCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [selectedLandType, setSelectedLandType] = useState<string>(
    "tropical_rainforest",
  );
  const [area, setArea] = useState<number>(100);
  const [drawnPolygons, setDrawnPolygons] = useState<
    Array<{ points: [number, number][]; area: number }>
  >([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [drawnItems, setDrawnItems] = useState<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const landType = CARBON_STOCK_FACTORS[selectedLandType];
  const totalDrawnArea = drawnPolygons.reduce((sum, p) => sum + p.area, 0);
  const actualArea = totalDrawnArea > 0 ? totalDrawnArea : area;

  const carbonStock = {
    aboveground: landType.aboveground * actualArea,
    belowground: landType.belowground * actualArea,
    deadwood: landType.deadwood * actualArea,
    litter: landType.litter * actualArea,
    soil: landType.soil * actualArea,
    total: landType.total * actualArea,
  };

  const co2Stock = carbonStock.total * 3.67;
  const creditValue = {
    min: co2Stock * 5,
    max: co2Stock * 20,
    avg: co2Stock * 12,
  };

  // Initialize Leaflet
  useEffect(() => {
    if (!mapContainerRef.current || mapInstance) return;

    const initMap = async () => {
      // Load Leaflet CSS
      if (!document.getElementById("leaflet-css")) {
        const css = document.createElement("link");
        css.id = "leaflet-css";
        css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        css.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        css.crossOrigin = "";
        document.head.appendChild(css);
      }

      // Load Leaflet Draw CSS
      if (!document.getElementById("leaflet-draw-css")) {
        const css = document.createElement("link");
        css.id = "leaflet-draw-css";
        css.rel = "stylesheet";
        css.href =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css";
        document.head.appendChild(css);
      }

      // Load Leaflet JS
      if (!(window as any).L) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.integrity =
            "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
          script.crossOrigin = "";
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Load Leaflet Draw
      if (!(window as any).L.Draw) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js";
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Wait a bit for styles to load
      await new Promise((resolve) => setTimeout(resolve, 100));

      const L = (window as any).L;

      // Create map
      const map = L.map(mapContainerRef.current, {
        center: [-2.5, 118],
        zoom: 5,
        zoomControl: false,
      });

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Add zoom control
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Create feature group for drawings
      const drawnItemsGroup = new L.FeatureGroup();
      map.addLayer(drawnItemsGroup);

      // Add draw control
      const drawControl = new L.Control.Draw({
        position: "topleft",
        draw: {
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false,
          rectangle: {
            shapeOptions: { color: "#10b981", weight: 3, fillOpacity: 0.3 },
          },
          polygon: {
            allowIntersection: false,
            shapeOptions: { color: "#10b981", weight: 3, fillOpacity: 0.3 },
          },
        },
        edit: {
          featureGroup: drawnItemsGroup,
          remove: true,
        },
      });
      map.addControl(drawControl);

      // Handle draw events
      map.on(L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer;
        drawnItemsGroup.addLayer(layer);

        // Calculate area
        const latlngs = layer.getLatLngs()[0];
        const areaM2 = L.GeometryUtil.geodesicArea(latlngs);
        const areaHa = areaM2 / 10000;

        setDrawnPolygons((prev) => [
          ...prev,
          { points: latlngs.map((ll: any) => [ll.lat, ll.lng]), area: areaHa },
        ]);
      });

      map.on(L.Draw.Event.DELETED, () => {
        const newPolygons: Array<{ points: [number, number][]; area: number }> =
          [];
        drawnItemsGroup.eachLayer((layer: any) => {
          if (layer.getLatLngs) {
            const latlngs = layer.getLatLngs()[0];
            const areaM2 = L.GeometryUtil.geodesicArea(latlngs);
            const areaHa = areaM2 / 10000;
            newPolygons.push({
              points: latlngs.map((ll: any) => [ll.lat, ll.lng]),
              area: areaHa,
            });
          }
        });
        setDrawnPolygons(newPolygons);
      });

      setMapInstance(map);
      setDrawnItems(drawnItemsGroup);
      setIsMapReady(true);
    };

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  // Update map size on fullscreen toggle
  useEffect(() => {
    if (mapInstance) {
      setTimeout(() => mapInstance.invalidateSize(), 100);
    }
  }, [isFullscreen, mapInstance]);

  const goToLocation = (lat: number, lng: number, zoom: number) => {
    if (mapInstance) {
      mapInstance.setView([lat, lng], zoom);
    }
  };

  const clearDrawings = () => {
    if (drawnItems) {
      drawnItems.clearLayers();
      setDrawnPolygons([]);
    }
  };

  const carbonPools = [
    {
      nameId: "Biomassa Atas Tanah",
      nameEn: "Aboveground Biomass",
      value: carbonStock.aboveground,
      color: "bg-emerald-500",
    },
    {
      nameId: "Biomassa Bawah Tanah",
      nameEn: "Belowground Biomass",
      value: carbonStock.belowground,
      color: "bg-green-500",
    },
    {
      nameId: "Kayu Mati",
      nameEn: "Dead Wood",
      value: carbonStock.deadwood,
      color: "bg-amber-500",
    },
    {
      nameId: "Serasah",
      nameEn: "Litter",
      value: carbonStock.litter,
      color: "bg-yellow-500",
    },
    {
      nameId: "Karbon Organik Tanah",
      nameEn: "Soil Organic Carbon",
      value: carbonStock.soil,
      color: "bg-orange-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          {language === "id"
            ? "Carbon Stock Calculator - Gambar area di peta untuk menghitung stok karbon berdasarkan metodologi IPCC 2019. Gunakan tools di kiri peta untuk menggambar polygon atau rectangle."
            : "Carbon Stock Calculator - Draw an area on the map to calculate carbon stock based on IPCC 2019 methodology. Use the tools on the left of the map to draw polygon or rectangle."}
        </p>
      </div>

      <div className={`grid ${isFullscreen ? "" : "lg:grid-cols-2"} gap-6`}>
        {/* Map Section */}
        <div className={`space-y-4 ${isFullscreen ? "col-span-full" : ""}`}>
          <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-emerald-400" />
                {language === "id" ? "Peta Interaktif" : "Interactive Map"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearDrawings}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg"
                  title={language === "id" ? "Hapus semua" : "Clear all"}
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 bg-[#0d1411] hover:bg-emerald-500/20 rounded-lg"
                >
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Quick Locations */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs text-gray-500 w-full">
                {language === "id" ? "Lokasi Cepat:" : "Quick Locations:"}
              </span>
              {INDONESIA_LOCATIONS.map((loc) => (
                <button
                  key={loc.nameId}
                  onClick={() => goToLocation(loc.lat, loc.lng, loc.zoom)}
                  className="px-3 py-1.5 bg-[#0d1411] hover:bg-emerald-500/20 rounded-lg text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  {language === "id" ? loc.nameId : loc.nameEn}
                </button>
              ))}
            </div>

            {/* Map Container */}
            <div
              ref={mapContainerRef}
              className={`rounded-xl overflow-hidden border border-emerald-900/30 ${isFullscreen ? "h-[70vh]" : "h-[400px]"}`}
              style={{ background: "#1a2420", minHeight: "400px" }}
            >
              {!isMapReady && (
                <div className="w-full h-full flex items-center justify-center bg-[#0d1411]">
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">
                      {language === "id" ? "Memuat peta..." : "Loading map..."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-4 p-3 bg-[#0d1411] rounded-xl">
              <p className="text-xs text-gray-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>
                    {language === "id" ? "Cara Menggunakan:" : "How to Use:"}
                  </strong>{" "}
                  {language === "id"
                    ? "Klik tombol polygon (⬠) atau rectangle (▢) di pojok kiri atas peta, lalu gambar area. Klik 2x untuk menyelesaikan."
                    : "Click the polygon (⬠) or rectangle (▢) button at the top left of the map, then draw the area. Double-click to finish."}
                </span>
              </p>
            </div>

            {/* Drawn Areas */}
            {drawnPolygons.length > 0 && (
              <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <h4 className="font-medium text-emerald-400 text-sm mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  {language === "id"
                    ? `Area Tergambar (${drawnPolygons.length} polygon)`
                    : `Drawn Area (${drawnPolygons.length} polygons)`}
                </h4>
                <div className="space-y-1">
                  {drawnPolygons.map((p, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-400">Polygon {idx + 1}</span>
                      <span className="text-white font-medium">
                        {p.area.toFixed(2)} ha
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-emerald-500/30 flex justify-between">
                    <span className="text-emerald-400 font-medium">
                      {language === "id" ? "Total Area" : "Total Area"}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {totalDrawnArea.toFixed(2)} ha
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Land Type Selection */}
          <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-4">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              {language === "id" ? "Pilih Tipe Lahan" : "Select Land Type"}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {Object.entries(CARBON_STOCK_FACTORS).map(([key, land]) => (
                <button
                  key={key}
                  onClick={() => setSelectedLandType(key)}
                  className={`p-2 rounded-xl border-2 text-center transition-all ${
                    selectedLandType === key
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-emerald-900/30 hover:border-emerald-500/50"
                  }`}
                >
                  <span className="text-xl block mb-1">{land.icon}</span>
                  <p className="text-xs font-medium text-white truncate">
                    {language === "id" ? land.nameId : land.nameEn}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {land.total} tC/ha
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Input */}
          {drawnPolygons.length === 0 && (
            <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-4">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-emerald-400" />
                {language === "id"
                  ? "Input Manual (jika tidak menggambar)"
                  : "Manual Input (if not drawing)"}
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="flex-1 px-4 py-2 bg-[#0d1411] border border-emerald-900/30 rounded-xl text-white text-center"
                />
                <span className="text-gray-400">
                  {language === "id" ? "hektar" : "hectares"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {!isFullscreen && (
          <div className="space-y-4">
            {/* Land Type Info */}
            <div
              className={`bg-gradient-to-br ${landType.color} rounded-2xl p-5 text-white`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{landType.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">
                    {language === "id" ? landType.nameId : landType.nameEn}
                  </h3>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-4">
                {language === "id" ? landType.descId : landType.descEn}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-2xl font-bold">{landType.total}</p>
                  <p className="text-xs opacity-80">tC/ha (total)</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-2xl font-bold">
                    {(landType.total * 3.67).toFixed(0)}
                  </p>
                  <p className="text-xs opacity-80">tCO₂eq/ha</p>
                </div>
              </div>
            </div>

            {/* Carbon Stock Breakdown */}
            <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                {language === "id" ? "Stok Karbon" : "Carbon Stock"} (
                {actualArea.toLocaleString()} ha)
              </h3>

              <div className="space-y-3">
                {carbonPools.map((pool) => (
                  <div key={pool.nameId}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">
                        {language === "id" ? pool.nameId : pool.nameEn}
                      </span>
                      <span className="text-white font-medium">
                        {pool.value.toLocaleString()} tC
                      </span>
                    </div>
                    <div className="h-2 bg-[#0d1411] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${pool.color} rounded-full`}
                        style={{
                          width: `${Math.min((pool.value / carbonStock.total) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-900/30">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">
                    {language === "id"
                      ? "Total Stok Karbon"
                      : "Total Carbon Stock"}
                  </span>
                  <span className="text-2xl font-bold text-emerald-400">
                    {carbonStock.total.toLocaleString()} tC
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-400">
                    {language === "id" ? "Ekuivalen CO₂" : "CO₂ Equivalent"}
                  </span>
                  <span className="text-xl font-bold text-white">
                    {co2Stock.toLocaleString()} tCO₂eq
                  </span>
                </div>
              </div>
            </div>

            {/* Credit Value */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                {language === "id"
                  ? "Estimasi Nilai Kredit Karbon"
                  : "Estimated Carbon Credit Value"}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    {language === "id" ? "Minimum" : "Minimum"}
                  </p>
                  <p className="text-lg font-bold text-white">
                    ${creditValue.min.toLocaleString()}
                  </p>
                </div>
                <div className="text-center bg-yellow-500/20 rounded-lg py-2">
                  <p className="text-xs text-yellow-400">
                    {language === "id" ? "Rata-rata" : "Average"}
                  </p>
                  <p className="text-xl font-bold text-yellow-400">
                    ${creditValue.avg.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    {language === "id" ? "Maksimum" : "Maximum"}
                  </p>
                  <p className="text-lg font-bold text-white">
                    ${creditValue.max.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-[#1a2420] border border-emerald-900/30 hover:border-emerald-500/50 rounded-xl font-medium text-gray-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              {language === "id" ? "Unduh Laporan" : "Download Report"}
            </button>
          </div>
        )}
      </div>

      {/* IPCC Reference Table */}
      <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-5">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          {language === "id"
            ? "Tabel Referensi IPCC 2019 - Stok Karbon per Tipe Lahan"
            : "IPCC 2019 Reference Table - Carbon Stock by Land Type"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-emerald-900/30">
                <th className="text-left py-3 px-2 text-gray-400 font-medium">
                  {language === "id" ? "Tipe Lahan" : "Land Type"}
                </th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">
                  AGB
                </th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">
                  BGB
                </th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">
                  {language === "id" ? "Kayu Mati" : "Dead Wood"}
                </th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">
                  {language === "id" ? "Serasah" : "Litter"}
                </th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">
                  SOC
                </th>
                <th className="text-right py-3 px-2 text-emerald-400 font-medium">
                  Total (tC/ha)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(CARBON_STOCK_FACTORS).map(([key, land]) => (
                <tr
                  key={key}
                  className={`border-b border-emerald-900/20 hover:bg-emerald-500/5 ${selectedLandType === key ? "bg-emerald-500/10" : ""}`}
                >
                  <td className="py-2 px-2 text-white">
                    {land.icon} {language === "id" ? land.nameId : land.nameEn}
                  </td>
                  <td className="text-right py-2 px-2 text-gray-300">
                    {land.aboveground}
                  </td>
                  <td className="text-right py-2 px-2 text-gray-300">
                    {land.belowground}
                  </td>
                  <td className="text-right py-2 px-2 text-gray-300">
                    {land.deadwood}
                  </td>
                  <td className="text-right py-2 px-2 text-gray-300">
                    {land.litter}
                  </td>
                  <td className="text-right py-2 px-2 text-gray-300">
                    {land.soil}
                  </td>
                  <td className="text-right py-2 px-2 text-emerald-400 font-bold">
                    {land.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {language === "id"
            ? "Sumber: IPCC 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories"
            : "Source: IPCC 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories"}
        </p>
      </div>
    </motion.div>
  );
};

// =============================================
// CARBON CREDIT CALCULATOR
// =============================================
type PriceStd = { name: string; min: number; max: number; avg: number };
const CarbonCreditCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [creditAmount, setCreditAmount] = useState<number>(100);
  const [selectedMarket, setSelectedMarket] = useState<
    "voluntary" | "compliance" | "indonesia"
  >("voluntary");
  const [selectedStandard, setSelectedStandard] = useState<string>("vcs");

  const markets = CARBON_CREDIT_PRICES[selectedMarket] as Record<
    string,
    PriceStd
  >;
  const standard = markets[selectedStandard] ?? Object.values(markets)[0];

  const calculations = {
    min: creditAmount * standard.min,
    max: creditAmount * standard.max,
    avg: creditAmount * standard.avg,
  };
  const exchangeRate = 15500;
  const calculationsIDR = {
    min: calculations.min * exchangeRate,
    max: calculations.max * exchangeRate,
    avg: calculations.avg * exchangeRate,
  };

  const marketLabels = {
    voluntary: language === "id" ? "Sukarela" : "Voluntary",
    compliance: language === "id" ? "Kepatuhan" : "Compliance",
    indonesia: "Indonesia",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              {language === "id"
                ? "Jumlah Kredit Karbon"
                : "Carbon Credit Amount"}
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(Number(e.target.value))}
                className="flex-1 px-4 py-3 bg-[#0d1411] border border-emerald-900/30 rounded-xl text-white text-lg font-bold text-center"
              />
              <span className="text-gray-400">tCO₂eq</span>
            </div>
            <input
              type="range"
              min="1"
              max="10000"
              value={creditAmount}
              onChange={(e) => setCreditAmount(Number(e.target.value))}
              className="w-full h-2 bg-[#0d1411] rounded-lg appearance-none cursor-pointer mt-4"
              style={{
                background: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${(creditAmount / 10000) * 100}%, rgb(13, 20, 17) ${(creditAmount / 10000) * 100}%, rgb(13, 20, 17) 100%)`,
              }}
            />
          </div>

          <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              {language === "id"
                ? "Pilih Pasar Karbon"
                : "Select Carbon Market"}
            </h3>
            <div className="flex gap-2 mb-4">
              {(["voluntary", "compliance", "indonesia"] as const).map(
                (market) => (
                  <button
                    key={market}
                    onClick={() => {
                      setSelectedMarket(market);
                      setSelectedStandard(
                        Object.keys(CARBON_CREDIT_PRICES[market])[0],
                      );
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      selectedMarket === market
                        ? "bg-emerald-500 text-white"
                        : "bg-[#0d1411] text-gray-400 hover:text-white"
                    }`}
                  >
                    {marketLabels[market]}
                  </button>
                ),
              )}
            </div>

            <div className="space-y-2">
              {Object.entries(markets).map(([key, std]) => (
                <button
                  key={key}
                  onClick={() => setSelectedStandard(key)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedStandard === key
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-emerald-900/30 hover:border-emerald-500/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{std.name}</span>
                    <span className="text-emerald-400 font-bold">
                      ${std.avg}/tCO₂
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Range: ${std.min} - ${std.max} per tCO₂
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {language === "id" ? "Estimasi Nilai" : "Estimated Value"}
            </h3>

            <div className="space-y-4">
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm opacity-80 mb-1">
                  {language === "id"
                    ? "Nilai Rata-rata (USD)"
                    : "Average Value (USD)"}
                </p>
                <p className="text-3xl font-bold">
                  ${calculations.avg.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs opacity-70">
                    {language === "id" ? "Minimum" : "Minimum"}
                  </p>
                  <p className="text-lg font-bold">
                    ${calculations.min.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs opacity-70">
                    {language === "id" ? "Maksimum" : "Maximum"}
                  </p>
                  <p className="text-lg font-bold">
                    ${calculations.max.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm opacity-80 mb-1">
                  {language === "id" ? "Dalam Rupiah (Rp)" : "In Rupiah (IDR)"}
                </p>
                <p className="text-2xl font-bold">
                  Rp {calculationsIDR.avg.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-400" />
              {language === "id"
                ? "Informasi Penting"
                : "Important Information"}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                {language === "id"
                  ? "1 Kredit Karbon = 1 ton CO₂ ekuivalen"
                  : "1 Carbon Credit = 1 tonne CO₂ equivalent"}
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                {language === "id"
                  ? "Harga bervariasi tergantung standar sertifikasi"
                  : "Prices vary depending on certification standard"}
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                {language === "id"
                  ? "Harga bersifat estimasi dan dapat berubah"
                  : "Prices are estimates and subject to change"}
              </li>
            </ul>
          </div>

          <Link
            to="/marketplace"
            className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            {language === "id" ? "Jelajahi Marketplace" : "Explore Marketplace"}{" "}
            →
          </Link>
        </div>
      </div>

      {/* Price Reference */}
      <div className="bg-[#1a2420] rounded-2xl border border-emerald-900/30 p-5">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          {language === "id"
            ? "Referensi Harga Kredit Karbon Global"
            : "Global Carbon Credit Price Reference"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-emerald-900/30">
                <th className="text-left py-3 px-2 text-gray-400">
                  {language === "id" ? "Pasar" : "Market"}
                </th>
                <th className="text-left py-3 px-2 text-gray-400">Standard</th>
                <th className="text-right py-3 px-2 text-gray-400">
                  Min (USD)
                </th>
                <th className="text-right py-3 px-2 text-gray-400">
                  Max (USD)
                </th>
                <th className="text-right py-3 px-2 text-emerald-400">
                  Avg (USD)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(CARBON_CREDIT_PRICES).map(([marketKey, market]) =>
                Object.entries(market).map(([stdKey, std], idx) => (
                  <tr
                    key={`${marketKey}-${stdKey}`}
                    className="border-b border-emerald-900/20"
                  >
                    {idx === 0 && (
                      <td
                        rowSpan={Object.keys(market).length}
                        className="py-2 px-2 text-white font-medium capitalize"
                      >
                        {marketKey.replace("_", " ")}
                      </td>
                    )}
                    <td className="py-2 px-2 text-gray-300">{std.name}</td>
                    <td className="text-right py-2 px-2 text-gray-300">
                      ${std.min}
                    </td>
                    <td className="text-right py-2 px-2 text-gray-300">
                      ${std.max}
                    </td>
                    <td className="text-right py-2 px-2 text-emerald-400 font-bold">
                      ${std.avg}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculatorPage;
