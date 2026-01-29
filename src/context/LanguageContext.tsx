import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// =============================================
// LANGUAGE TYPES
// =============================================

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// =============================================
// TRANSLATIONS
// =============================================

const translations: Record<Language, Record<string, string>> = {
  id: {
    // General
    "app.name": "C-NEX",
    "app.tagline": "Carbon Network Exchange",
    "common.loading": "Memuat...",
    "common.reset": "Reset",
    "common.download": "Unduh",
    "common.save": "Simpan",
    "common.cancel": "Batal",
    "common.delete": "Hapus",
    "common.edit": "Edit",
    "common.view": "Lihat",
    "common.search": "Cari",
    "common.filter": "Filter",
    "common.all": "Semua",
    "common.yes": "Ya",
    "common.no": "Tidak",
    "common.or": "atau",
    "common.and": "dan",
    "common.close": "Tutup",
    "common.back": "Kembali",
    "common.next": "Selanjutnya",
    "common.previous": "Sebelumnya",
    "common.submit": "Kirim",
    "common.hectare": "hektar",
    "common.year": "tahun",
    "common.month": "bulan",
    "common.total": "Total",
    "common.average": "Rata-rata",
    "common.minimum": "Minimum",
    "common.maximum": "Maksimum",

    // Navigation
    "nav.home": "Beranda",
    "nav.marketplace": "Marketplace",
    "nav.projects": "Proyek",
    "nav.calculator": "Kalkulator",
    "nav.news": "Berita",
    "nav.reports": "Laporan",
    "nav.mrv": "MRV Dashboard",
    "nav.esg": "ESG Scoring",
    "nav.admin": "Admin Panel",
    "nav.profile": "Profil Saya",
    "nav.settings": "Pengaturan",
    "nav.logout": "Keluar",
    "nav.help": "Butuh Bantuan?",
    "nav.support": "Hubungi Support",

    // Calculator Page
    "calc.title": "Kalkulator Karbon",
    "calc.subtitle": "Metodologi IPCC 2019",
    "calc.description": "Hitung jejak karbon, stok karbon lahan dengan peta interaktif, dan estimasi kredit karbon",
    
    // Calculator Tabs
    "calc.tab.footprint": "Jejak Karbon",
    "calc.tab.stock": "Stok Karbon & Peta",
    "calc.tab.credit": "Kredit Karbon",

    // Carbon Footprint
    "calc.footprint.title": "Input Aktivitas",
    "calc.footprint.total": "Total Emisi Tahunan",
    "calc.footprint.level": "Level",
    "calc.footprint.level.low": "Rendah",
    "calc.footprint.level.medium": "Sedang",
    "calc.footprint.level.high": "Tinggi",
    "calc.footprint.level.veryHigh": "Sangat Tinggi",
    "calc.footprint.comparison": "Perbandingan",
    "calc.footprint.vsIndonesia": "vs Rata-rata Indonesia",
    "calc.footprint.vsGlobal": "vs Rata-rata Global",
    "calc.footprint.offsetNeeds": "Kebutuhan Offset",
    "calc.footprint.treesPerYear": "Pohon/tahun",
    "calc.footprint.carbonCredit": "Kredit Karbon",
    "calc.footprint.buyCredit": "Beli Carbon Credit",

    // Emission Categories
    "emission.electricity": "Listrik",
    "emission.electricity.unit": "kWh/bulan",
    "emission.electricity.desc": "Konsumsi listrik rumah tangga atau kantor",
    "emission.transport": "Transportasi Darat",
    "emission.transport.unit": "km/bulan",
    "emission.transport.desc": "Perjalanan dengan mobil atau motor pribadi",
    "emission.flight": "Penerbangan",
    "emission.flight.unit": "km/tahun",
    "emission.flight.desc": "Perjalanan dengan pesawat",
    "emission.fuel.gasoline": "Bensin",
    "emission.fuel.gasoline.unit": "liter/bulan",
    "emission.fuel.diesel": "Solar",
    "emission.fuel.diesel.unit": "liter/bulan",
    "emission.lpg": "Gas LPG",
    "emission.lpg.unit": "kg/bulan",
    "emission.meat.beef": "Daging Sapi",
    "emission.meat.beef.unit": "kg/bulan",
    "emission.meat.chicken": "Daging Ayam",
    "emission.meat.chicken.unit": "kg/bulan",
    "emission.waste": "Sampah",
    "emission.waste.unit": "kg/bulan",

    // Carbon Stock
    "calc.stock.map.title": "Peta Interaktif",
    "calc.stock.map.quickLocation": "Lokasi Cepat",
    "calc.stock.map.instructions": "Cara Menggunakan",
    "calc.stock.map.instructionsText": "Klik tombol polygon (⬠) atau rectangle (▢) di pojok kiri atas peta, lalu gambar area yang ingin dihitung. Klik 2x untuk menyelesaikan polygon.",
    "calc.stock.map.drawnArea": "Area Tergambar",
    "calc.stock.map.polygon": "Polygon",
    "calc.stock.map.totalArea": "Total Area",
    "calc.stock.map.clearAll": "Hapus Semua",
    "calc.stock.map.fullscreen": "Layar Penuh",
    "calc.stock.map.loading": "Memuat peta...",
    
    "calc.stock.landType.title": "Pilih Tipe Lahan",
    "calc.stock.landType.tropical": "Hutan Hujan Tropis",
    "calc.stock.landType.mangrove": "Mangrove",
    "calc.stock.landType.peatland": "Hutan Gambut",
    "calc.stock.landType.secondary": "Hutan Sekunder",
    "calc.stock.landType.agroforestry": "Agroforestri",
    "calc.stock.landType.rubber": "Perkebunan Karet",
    "calc.stock.landType.oilPalm": "Kelapa Sawit",
    "calc.stock.landType.grassland": "Padang Rumput",
    "calc.stock.landType.ricePaddy": "Sawah Padi",

    "calc.stock.manualInput": "Input Manual (jika tidak menggambar)",
    "calc.stock.carbonStock": "Stok Karbon",
    "calc.stock.aboveground": "Biomassa Atas Tanah",
    "calc.stock.belowground": "Biomassa Bawah Tanah",
    "calc.stock.deadwood": "Kayu Mati",
    "calc.stock.litter": "Serasah",
    "calc.stock.soil": "Karbon Organik Tanah",
    "calc.stock.totalStock": "Total Stok Karbon",
    "calc.stock.co2eq": "Ekuivalen CO₂",
    "calc.stock.creditValue": "Estimasi Nilai Kredit Karbon",
    "calc.stock.downloadReport": "Unduh Laporan",
    "calc.stock.referenceTable": "Tabel Referensi IPCC 2019 - Stok Karbon per Tipe Lahan",
    "calc.stock.source": "Sumber: IPCC 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories",

    // Carbon Credit
    "calc.credit.amount": "Jumlah Kredit Karbon",
    "calc.credit.selectMarket": "Pilih Pasar Karbon",
    "calc.credit.market.voluntary": "Sukarela",
    "calc.credit.market.compliance": "Kepatuhan",
    "calc.credit.market.indonesia": "Indonesia",
    "calc.credit.estimatedValue": "Estimasi Nilai",
    "calc.credit.inRupiah": "Dalam Rupiah",
    "calc.credit.importantInfo": "Informasi Penting",
    "calc.credit.info1": "1 Kredit Karbon = 1 ton CO₂ ekuivalen",
    "calc.credit.info2": "Harga bervariasi tergantung standar sertifikasi",
    "calc.credit.info3": "Harga bersifat estimasi dan dapat berubah",
    "calc.credit.exploreMarketplace": "Jelajahi Marketplace",
    "calc.credit.priceReference": "Referensi Harga Kredit Karbon Global",

    // Info Banner
    "calc.info.carbonStock": "Carbon Stock Calculator - Gambar area di peta untuk menghitung stok karbon berdasarkan metodologi IPCC 2019. Gunakan tools di kiri peta untuk menggambar polygon atau rectangle.",

    // Locations
    "location.kalimantanTimur": "Kalimantan Timur",
    "location.riau": "Riau (Gambut)",
    "location.papuaBarat": "Papua Barat",
    "location.sulawesiSelatan": "Sulawesi Selatan",
    "location.sumatraBarat": "Sumatra Barat",
    "location.bali": "Bali",
    "location.jawaTengah": "Jawa Tengah",
    "location.ntt": "NTT (Mangrove)",
  },

  en: {
    // General
    "app.name": "C-NEX",
    "app.tagline": "Carbon Network Exchange",
    "common.loading": "Loading...",
    "common.reset": "Reset",
    "common.download": "Download",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.all": "All",
    "common.yes": "Yes",
    "common.no": "No",
    "common.or": "or",
    "common.and": "and",
    "common.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
    "common.hectare": "hectare",
    "common.year": "year",
    "common.month": "month",
    "common.total": "Total",
    "common.average": "Average",
    "common.minimum": "Minimum",
    "common.maximum": "Maximum",

    // Navigation
    "nav.home": "Home",
    "nav.marketplace": "Marketplace",
    "nav.projects": "Projects",
    "nav.calculator": "Calculator",
    "nav.news": "News",
    "nav.reports": "Reports",
    "nav.mrv": "MRV Dashboard",
    "nav.esg": "ESG Scoring",
    "nav.admin": "Admin Panel",
    "nav.profile": "My Profile",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    "nav.help": "Need Help?",
    "nav.support": "Contact Support",

    // Calculator Page
    "calc.title": "Carbon Calculator",
    "calc.subtitle": "IPCC 2019 Methodology",
    "calc.description": "Calculate your carbon footprint, land carbon stock with interactive map, and carbon credit estimation",
    
    // Calculator Tabs
    "calc.tab.footprint": "Carbon Footprint",
    "calc.tab.stock": "Carbon Stock & Map",
    "calc.tab.credit": "Carbon Credit",

    // Carbon Footprint
    "calc.footprint.title": "Activity Input",
    "calc.footprint.total": "Total Annual Emissions",
    "calc.footprint.level": "Level",
    "calc.footprint.level.low": "Low",
    "calc.footprint.level.medium": "Medium",
    "calc.footprint.level.high": "High",
    "calc.footprint.level.veryHigh": "Very High",
    "calc.footprint.comparison": "Comparison",
    "calc.footprint.vsIndonesia": "vs Indonesia Average",
    "calc.footprint.vsGlobal": "vs Global Average",
    "calc.footprint.offsetNeeds": "Offset Needs",
    "calc.footprint.treesPerYear": "Trees/year",
    "calc.footprint.carbonCredit": "Carbon Credit",
    "calc.footprint.buyCredit": "Buy Carbon Credit",

    // Emission Categories
    "emission.electricity": "Electricity",
    "emission.electricity.unit": "kWh/month",
    "emission.electricity.desc": "Household or office electricity consumption",
    "emission.transport": "Ground Transport",
    "emission.transport.unit": "km/month",
    "emission.transport.desc": "Travel by car or motorcycle",
    "emission.flight": "Air Travel",
    "emission.flight.unit": "km/year",
    "emission.flight.desc": "Travel by airplane",
    "emission.fuel.gasoline": "Gasoline",
    "emission.fuel.gasoline.unit": "liters/month",
    "emission.fuel.diesel": "Diesel",
    "emission.fuel.diesel.unit": "liters/month",
    "emission.lpg": "LPG Gas",
    "emission.lpg.unit": "kg/month",
    "emission.meat.beef": "Beef",
    "emission.meat.beef.unit": "kg/month",
    "emission.meat.chicken": "Chicken",
    "emission.meat.chicken.unit": "kg/month",
    "emission.waste": "Waste",
    "emission.waste.unit": "kg/month",

    // Carbon Stock
    "calc.stock.map.title": "Interactive Map",
    "calc.stock.map.quickLocation": "Quick Locations",
    "calc.stock.map.instructions": "How to Use",
    "calc.stock.map.instructionsText": "Click the polygon (⬠) or rectangle (▢) button at the top left of the map, then draw the area you want to calculate. Double-click to finish the polygon.",
    "calc.stock.map.drawnArea": "Drawn Area",
    "calc.stock.map.polygon": "Polygon",
    "calc.stock.map.totalArea": "Total Area",
    "calc.stock.map.clearAll": "Clear All",
    "calc.stock.map.fullscreen": "Fullscreen",
    "calc.stock.map.loading": "Loading map...",
    
    "calc.stock.landType.title": "Select Land Type",
    "calc.stock.landType.tropical": "Tropical Rainforest",
    "calc.stock.landType.mangrove": "Mangrove",
    "calc.stock.landType.peatland": "Peatland Forest",
    "calc.stock.landType.secondary": "Secondary Forest",
    "calc.stock.landType.agroforestry": "Agroforestry",
    "calc.stock.landType.rubber": "Rubber Plantation",
    "calc.stock.landType.oilPalm": "Oil Palm",
    "calc.stock.landType.grassland": "Grassland",
    "calc.stock.landType.ricePaddy": "Rice Paddy",

    "calc.stock.manualInput": "Manual Input (if not drawing)",
    "calc.stock.carbonStock": "Carbon Stock",
    "calc.stock.aboveground": "Aboveground Biomass",
    "calc.stock.belowground": "Belowground Biomass",
    "calc.stock.deadwood": "Dead Wood",
    "calc.stock.litter": "Litter",
    "calc.stock.soil": "Soil Organic Carbon",
    "calc.stock.totalStock": "Total Carbon Stock",
    "calc.stock.co2eq": "CO₂ Equivalent",
    "calc.stock.creditValue": "Estimated Carbon Credit Value",
    "calc.stock.downloadReport": "Download Report",
    "calc.stock.referenceTable": "IPCC 2019 Reference Table - Carbon Stock by Land Type",
    "calc.stock.source": "Source: IPCC 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories",

    // Carbon Credit
    "calc.credit.amount": "Carbon Credit Amount",
    "calc.credit.selectMarket": "Select Carbon Market",
    "calc.credit.market.voluntary": "Voluntary",
    "calc.credit.market.compliance": "Compliance",
    "calc.credit.market.indonesia": "Indonesia",
    "calc.credit.estimatedValue": "Estimated Value",
    "calc.credit.inRupiah": "In Rupiah",
    "calc.credit.importantInfo": "Important Information",
    "calc.credit.info1": "1 Carbon Credit = 1 tonne CO₂ equivalent",
    "calc.credit.info2": "Prices vary depending on certification standard",
    "calc.credit.info3": "Prices are estimates and subject to change",
    "calc.credit.exploreMarketplace": "Explore Marketplace",
    "calc.credit.priceReference": "Global Carbon Credit Price Reference",

    // Info Banner
    "calc.info.carbonStock": "Carbon Stock Calculator - Draw an area on the map to calculate carbon stock based on IPCC 2019 methodology. Use the tools on the left of the map to draw polygon or rectangle.",

    // Locations
    "location.kalimantanTimur": "East Kalimantan",
    "location.riau": "Riau (Peatland)",
    "location.papuaBarat": "West Papua",
    "location.sulawesiSelatan": "South Sulawesi",
    "location.sumatraBarat": "West Sumatra",
    "location.bali": "Bali",
    "location.jawaTengah": "Central Java",
    "location.ntt": "NTT (Mangrove)",
  },
};

// =============================================
// CONTEXT
// =============================================

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("cnex-language");
    return (saved as Language) || "id";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("cnex-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageProvider;
