import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "id" | "en";

interface Translations {
  // Loading
  loading_title: string;
  loading_subtitle: string;

  // Header
  search_placeholder: string;
  login: string;
  home: string;
  services: string;
  news: string;
  data: string;
  info: string;
  marketplace: string;
  projects: string;
  calculator: string;
  reports: string;

  // Hero Section
  hero_badge: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_description: string;
  hero_features: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_main_services: string;
  hero_services_desc: string;

  // Service Categories
  service_carbon_tracking: string;
  service_carbon_tracking_desc: string;
  service_carbon_credit: string;
  service_carbon_credit_desc: string;
  service_carbon_offset: string;
  service_carbon_offset_desc: string;
  service_carbon_report: string;
  service_carbon_report_desc: string;
  service_carbon_audit: string;
  service_carbon_audit_desc: string;

  // Trust Points
  trust_certified: string;
  trust_certified_desc: string;
  trust_transparent: string;
  trust_transparent_desc: string;
  trust_verified: string;
  trust_verified_desc: string;

  // Quick Access
  quick_access_badge: string;
  quick_access_title: string;
  quick_access_desc: string;
  start_now: string;
  estimated_time: string;
  completed_today: string;
  services_completed: string;
  average_response: string;
  satisfaction_rate: string;
  online_services: string;
  popular_label: string;

  // Carbon Calculator
  calculator_badge: string;
  calculator_title: string;
  calculator_desc: string;
  carbon_stock: string;
  carbon_credit: string;
  land_area: string;
  land_cover_type: string;
  land_cover_primary_forest: string;
  land_cover_secondary_forest: string;
  land_cover_mangrove: string;
  tree_count: string;
  forest_type: string;
  forest_tropical: string;
  forest_temperate: string;
  forest_boreal: string;
  annual_emission: string;
  offset_target: string;
  project_type: string;
  project_reforestation: string;
  project_renewable: string;
  project_efficiency: string;
  total_carbon_stock: string;
  equivalent_to: string;
  carbon_per_hectare: string;
  carbon_per_tree: string;
  environmental_impact: string;
  impact_description: string;
  positive: string;
  impact_1: string;
  cars_year: string;
  impact_2: string;
  oxygen_year: string;
  credits_needed: string;
  credits: string;
  offset_amount: string;
  total_cost: string;
  cost_per_credit: string;
  alternative_solution: string;
  alternative_description: string;
  recommended: string;
  plant_trees: string;
  trees: string;
  hectares: string;
  est_cost: string;
  one_time: string;
  start_project: string;
  purchase_credits: string;

  // Services by Sector
  persona_title: string;
  persona_desc: string;
  persona_forestry: string;
  persona_agriculture: string;
  persona_energy: string;
  persona_industry: string;

  // News Section
  news_title: string;
  news_desc: string;
  news_tab: string;
  announcements_tab: string;
  news_scholarship_title: string;
  news_scholarship_desc: string;
  category_education: string;
  news_app_title: string;
  news_app_desc: string;
  news_festival_title: string;
  news_festival_desc: string;
  category_culture: string;
  announce_holiday_title: string;
  announce_holiday_desc: string;
  announce_infrastructure_title: string;
  announce_infrastructure_desc: string;
  announce_health_title: string;
  announce_health_desc: string;

  // Sample News
  news_forest_title: string;
  news_forest_desc: string;
  news_market_title: string;
  news_market_desc: string;
  news_technology_title: string;
  news_technology_desc: string;

  // Sample Announcements
  announce_regulation_title: string;
  announce_regulation_desc: string;
  announce_project_title: string;
  announce_project_desc: string;
  announce_report_title: string;
  announce_report_desc: string;

  // Agenda Section
  agenda_title: string;
  agenda_desc: string;
  view_all_agenda: string;
  agenda_meeting_title: string;
  meeting_type: string;
  officials_participants: string;
  agenda_dialog_title: string;
  public_dialog_type: string;
  public_officials_participants: string;
  agenda_smart_city_title: string;
  public_event_type: string;
  all_citizens_participants: string;

  // Transparency Section
  transparency_badge: string;
  transparency_title_1: string;
  transparency_title_2: string;
  transparency_desc: string;
  transparency_features: string;

  // Transparency Widgets
  financial_report: string;
  financial_desc: string;
  total_budget: string;
  budget_2025: string;
  budget_desc: string;
  development: string;
  e_report: string;
  e_report_desc: string;
  reports_received: string;
  open_data: string;
  open_data_desc: string;
  datasets: string;
  progress: string;
  budget_distributed: string;
  projects_completed: string;

  // Portal
  portal_title: string;
  portal_desc: string;
  carbon_sequestered: string;
  projects_active: string;
  transparency_score: string;
  access_portal: string;

  // Testimonials
  testimonials_title: string;
  testimonials_desc: string;
  testimonials_cta_1: string;
  testimonials_cta_2: string;
  testimonials_question: string;

  // Priority and Category Labels
  priority_important: string;
  priority_info: string;
  category_forest: string;
  category_technology: string;
  category_policy: string;

  // Footer Accessibility
  accessibility: string;
  text_size: string;
  display_mode: string;
  light: string;
  dark: string;
  language: string;

  // Footer Links
  contact_us: string;
  main_services: string;
  information: string;
  transparency: string;
  social_media: string;
  privacy_policy: string;
  terms_conditions: string;
  sitemap: string;
  copyright: string;
  disability_support: string;
  access_guide: string;

  // MRV Dashboard
  mrv_dashboard_badge: string;
  mrv_dashboard_title: string;
  mrv_dashboard_desc: string;
  mrv_module_summary: string;
  mrv_module_baseline: string;
  mrv_module_stock: string;
  mrv_module_mitigation: string;
  mrv_module_nek: string;
  mrv_module_economic: string;
  mrv_module_compliance: string;
  mrv_carbon_stock: string;
  mrv_emission_reduction: string;
  mrv_carbon_units: string;
  mrv_economic_value: string;
  mrv_total_area: string;
  mrv_monitoring_period: string;
  mrv_certifications: string;
  mrv_project_status: string;
  mrv_baseline_title: string;
  mrv_location: string;
  mrv_coordinates: string;
  mrv_ecosystem_distribution: string;
  mrv_ecosystem_details: string;
  mrv_ecosystem_type: string;
  mrv_area: string;
  mrv_percentage: string;
  mrv_map_placeholder: string;
  mrv_map_desc: string;
  mrv_stock_title: string;
  mrv_initial_stock: string;
  mrv_current_stock: string;
  mrv_stock_trend: string;
  mrv_actual_stock: string;
  mrv_target_stock: string;
  mrv_methodology: string;
  mrv_carbon_fraction: string;
  mrv_conversion_factor: string;
  mrv_emission_source: string;
  mrv_allometric: string;
  mrv_mitigation_title: string;
  mrv_gross_er: string;
  mrv_net_er: string;
  mrv_after_deductions: string;
  mrv_deductions: string;
  mrv_leakage: string;
  mrv_uncertainty: string;
  mrv_buffer: string;
  mrv_total_deductions: string;
  mrv_calculation: string;
  mrv_nek_title: string;
  mrv_potential_spe: string;
  mrv_verified_spe: string;
  mrv_issued_spe: string;
  mrv_stage: string;
  mrv_srnppi: string;
  mrv_registration_number: string;
  mrv_registration_date: string;
  mrv_project_category: string;
  mrv_vintage_year: string;
  mrv_economic_title: string;
  mrv_current_price: string;
  mrv_total_value: string;
  mrv_potential_value: string;
  mrv_units_status: string;
  mrv_sold: string;
  mrv_offset: string;
  mrv_available: string;
  mrv_price_scenarios: string;
  mrv_low_price: string;
  mrv_medium_price: string;
  mrv_high_price: string;
  mrv_recent_transactions: string;
  mrv_completed: string;
  mrv_compliance_title: string;
  mrv_srnppi_status: string;
  mrv_double_counting: string;
  mrv_blockchain_protected: string;
  mrv_buffer_permanence: string;
  mrv_required: string;
  mrv_held: string;
  mrv_fulfilled: string;
  mrv_reporting_obligation: string;
  mrv_frequency: string;
  mrv_next_deadline: string;
  mrv_reversal_risk: string;
  mrv_fire_risk: string;
  mrv_logging_risk: string;
  mrv_policy_risk: string;
  mrv_overall_risk: string;
  mrv_maintenance_obligation: string;
  mrv_period: string;
  mrv_start_date: string;
  mrv_end_date: string;
  mrv_active_certifications: string;
  mrv_valid_until: string;
  mrv_download_report: string;
  mrv_share_stakeholders: string;
}

const translations: Record<Language, Translations> = {
  id: {
    // Loading
    loading_title: "Memuat Konten...",
    loading_subtitle: "Mohon tunggu sebentar",

    // Header
    search_placeholder: "Cari layanan karbon...",
    login: "Masuk",
    home: "Beranda",
    services: "Layanan",
    news: "Berita",
    data: "Data",
    info: "Info",
    marketplace: "Marketplace",
    projects: "Proyek",
    calculator: "Kalkulator",
    reports: "Laporan",

    // Hero Section
    hero_badge: "🌱 Sistem Karbon Tersertifikasi Indonesia",
    hero_title_1: "Platform Karbon",
    hero_title_2: "Terpercaya Indonesia",
    hero_description:
      "Kelola, perdagangkan, dan pantau kredit karbon Anda dengan sistem MRV berbasis blockchain yang transparan dan tersertifikasi sesuai regulasi NEK Indonesia",
    hero_features: "MRV • Blockchain • SRN-PPI",
    hero_cta_primary: "Mulai Sekarang",
    hero_cta_secondary: "Pelajari Lebih Lanjut",
    hero_main_services: "Layanan Utama",
    hero_services_desc: "Solusi lengkap manajemen karbon untuk Indonesia",

    // Service Categories
    service_carbon_tracking: "Pelacakan Karbon",
    service_carbon_tracking_desc:
      "Pantau stok karbon real-time dengan teknologi satelit dan AI",
    service_carbon_credit: "Kredit Karbon",
    service_carbon_credit_desc:
      "Perdagangkan kredit karbon tersertifikasi di marketplace blockchain",
    service_carbon_offset: "Offset Karbon",
    service_carbon_offset_desc:
      "Program offset untuk mencapai target net-zero emissions",
    service_carbon_report: "Laporan Karbon",
    service_carbon_report_desc:
      "Laporan MRV lengkap sesuai standar NEK dan internasional",
    service_carbon_audit: "Audit Karbon",
    service_carbon_audit_desc:
      "Verifikasi dan validasi proyek karbon oleh auditor tersertifikasi",

    // Trust Points
    trust_certified: "Tersertifikasi NEK",
    trust_certified_desc: "Sesuai regulasi Nilai Ekonomi Karbon Indonesia",
    trust_transparent: "Transparansi Penuh",
    trust_transparent_desc: "Semua transaksi tercatat di blockchain",
    trust_verified: "Terverifikasi Pihak Ketiga",
    trust_verified_desc: "Diaudit oleh lembaga independen tersertifikasi",

    // Quick Access
    quick_access_badge: "Akses Cepat",
    quick_access_title: "Layanan Populer",
    quick_access_desc:
      "Akses langsung ke layanan karbon yang paling banyak digunakan",
    start_now: "Mulai Sekarang",
    estimated_time: "Estimasi Waktu",
    completed_today: "Diselesaikan Hari Ini",
    services_completed: "Layanan Diselesaikan",
    average_response: "Waktu Respon Rata-rata",
    satisfaction_rate: "Tingkat Kepuasan",
    online_services: "Layanan Online",
    popular_label: "Populer",

    // Carbon Calculator
    calculator_badge: "Kalkulator Karbon C-NEX",
    calculator_title: "Kalkulator Karbon Indonesia",
    calculator_desc:
      "Hitung stok karbon, kredit, dan nilai ekonomi dengan standar Indonesia",
    carbon_stock: "Stok Karbon",
    carbon_credit: "Kredit Karbon",
    land_area: "Luas Lahan",
    land_cover_type: "Jenis Tutupan Lahan",
    land_cover_primary_forest: "Hutan Primer",
    land_cover_secondary_forest: "Hutan Sekunder",
    land_cover_mangrove: "Mangrove",
    tree_count: "Jumlah Pohon",
    forest_type: "Jenis Hutan",
    forest_tropical: "Tropis",
    forest_temperate: "Sedang",
    forest_boreal: "Boreal",
    annual_emission: "Emisi Tahunan",
    offset_target: "Target Offset",
    project_type: "Jenis Proyek",
    project_reforestation: "Reboisasi",
    project_renewable: "Energi Terbarukan",
    project_efficiency: "Efisiensi Energi",
    total_carbon_stock: "Total Stok Karbon",
    equivalent_to: "Setara dengan",
    carbon_per_hectare: "Karbon per Hektar",
    carbon_per_tree: "Karbon per Pohon",
    environmental_impact: "Dampak Lingkungan",
    impact_description: "Kontribusi terhadap NDC Indonesia",
    positive: "Positif",
    impact_1: "Menghilangkan emisi dari",
    cars_year: "mobil/tahun",
    impact_2: "Menghasilkan",
    oxygen_year: "kg O₂/tahun",
    credits_needed: "Kredit yang Dibutuhkan",
    credits: "kredit",
    offset_amount: "Jumlah offset",
    total_cost: "Estimasi Biaya",
    cost_per_credit: "Harga per Kredit",
    alternative_solution: "Solusi Bagi Hasil",
    alternative_description: "Investasi jangka panjang dengan bagi hasil",
    recommended: "Direkomendasikan",
    plant_trees: "Tanam pohon",
    trees: "pohon",
    hectares: "hektar",
    est_cost: "Estimasi investasi",
    one_time: "(dengan bagi hasil)",
    start_project: "Mulai Proyek",
    purchase_credits: "Beli Kredit di Marketplace",

    // Services by Sector
    persona_title: "Solusi untuk Setiap Sektor",
    persona_desc:
      "Layanan C-NEX yang disesuaikan dengan kebutuhan ekosistem dan regulasi Indonesia",
    persona_forestry: "Kehutanan",
    persona_agriculture: "Pertanian",
    persona_energy: "Energi",
    persona_industry: "Industri",

    // News Section
    news_title: "Berita Pasar Karbon Indonesia",
    news_desc:
      "Berita terkini seputar pasar karbon, regulasi NEK, dan proyek offsetting karbon di Indonesia",
    news_tab: "📰 Berita",
    announcements_tab: "📢 Pengumuman",
    news_scholarship_title: "Beasiswa Karbon untuk Mahasiswa Indonesia",
    news_scholarship_desc:
      "Mendukung generasi profesional pasar karbon berikutnya di Indonesia",
    category_education: "Pendidikan",
    news_app_title: "C-NEX Luncurkan Aplikasi Mobile",
    news_app_desc:
      "Akses layanan karbon C-NEX kapan saja dan di mana saja melalui aplikasi mobile kami",
    news_festival_title: "Festival Karbon & Lingkungan 2025",
    news_festival_desc: "Merayakan aksi iklim dan inovasi karbon di Indonesia",
    category_culture: "Budaya",
    announce_holiday_title: "Liburan Kebijakan Karbon 2025",
    announce_holiday_desc:
      "Pengumuman liburan kebijakan karbon untuk tahun 2025",
    announce_infrastructure_title: "Pengembangan Infrastruktur Karbon",
    announce_infrastructure_desc:
      "Pengumuman pengembangan infrastruktur karbon untuk tahun 2025",
    announce_health_title: "Health Sector Carbon Initiatives",
    announce_health_desc:
      "New carbon offset programs in Indonesia's health sector",

    // Sample News
    news_forest_title: "Proyek REDD+ Kalimantan Tengah Diluncurkan",
    news_forest_desc:
      "Program Reducing Emissions from Deforestation and Forest Degradation menargetkan 500 ribu ha...",
    news_market_title: "Harga Kredit Karbon Indonesia Naik 30% di Q1 2025",
    news_market_desc:
      "Pasar karbon domestik menunjukkan pertumbuhan signifikan dengan integrasi SRN-PPI...",
    news_technology_title: "C-NEX Luncurkan Fitur MRV Berbasis AI dan Satelit",
    news_technology_desc:
      "Monitoring stok karbon real-time menggunakan teknologi Sentinel-2 dan machine learning...",

    // Sample Announcements
    announce_regulation_title: "Implementasi NEK dan Integrasi SRN-PPI",
    announce_regulation_desc:
      "Pemerintah perkuat regulasi Nilai Ekonomi Karbon untuk pasar karbon Indonesia...",
    announce_project_title: "Pembukaan Marketplace Kredit Karbon C-NEX",
    announce_project_desc:
      "Marketplace karbon terintegrasi blockchain untuk transparansi penuh...",
    announce_report_title: "Laporan NDC Indonesia: Target Unconditional 29%",
    announce_report_desc:
      "Capaian penurunan emisi nasional dan kontribusi proyek karbon...",

    // Agenda Section
    agenda_title: "Agenda Aksi Iklim Indonesia",
    agenda_desc:
      "Acara dan konferensi terkait aksi iklim, manajemen karbon, dan ekonomi hijau di Indonesia",
    view_all_agenda: "Lihat Semua Agenda",
    agenda_meeting_title: "Rapat Koordinasi Implementasi NEK 2025",
    meeting_type: "Rapat Koordinasi",
    officials_participants: "Pejabat Pemda & Kementerian",
    agenda_dialog_title: "Dialog Publik: Pasar Karbon untuk Masyarakat",
    public_dialog_type: "Dialog Publik",
    public_officials_participants: "Masyarakat Umum & Pejabat",
    agenda_smart_city_title: "Sosialisasi Smart City & Green Economy",
    public_event_type: "Acara Publik",
    all_citizens_participants: "Seluruh Masyarakat",

    // Transparency Section
    transparency_badge: "Transparansi Blockchain",
    transparency_title_1: "Data Karbon Terverifikasi",
    transparency_title_2: "& Transparan",
    transparency_desc:
      "Setiap transaksi karbon tercatat di blockchain untuk mencegah double counting dan menjamin integritas data",
    transparency_features: "MRV • Blockchain • Integrasi SRN-PPI",

    // Transparency Widgets
    financial_report: "Laporan Keuangan",
    financial_desc: "Laporan alokasi anggaran dan transparansi keuangan",
    total_budget: "Total Anggaran",
    budget_2025: "APBN 2025",
    budget_desc: "Alokasi anggaran untuk pembangunan nasional",
    development: "Pembangunan",
    e_report: "Laporan Elektronik",
    e_report_desc: "Sistem pelaporan elektronik terintegrasi",
    reports_received: "Laporan Diterima",
    open_data: "Data Terbuka",
    open_data_desc: "Akses data publik dan dataset terbuka",
    datasets: "Dataset",
    progress: "Progress",
    budget_distributed: "Anggaran Tersalurkan",
    projects_completed: "Proyek Selesai",

    // Portal
    portal_title: "Dashboard C-NEX Real-time",
    portal_desc:
      "Akses data stok karbon, kredit karbon, dan proyek karbon Indonesia dalam satu dashboard interaktif",
    carbon_sequestered: "Karbon Terserap",
    projects_active: "Proyek Aktif",
    transparency_score: "Skor Transparansi",
    access_portal: "Akses Dashboard",

    // Testimonials
    testimonials_title: "Testimoni Stakeholder & Partner",
    testimonials_desc:
      "Pengalaman pemerintah daerah, koperasi, masyarakat adat, dan perusahaan dalam program manajemen karbon",
    testimonials_cta_1: "Tulis Testimoni",
    testimonials_cta_2: "Daftar Jadi Mitra",
    testimonials_question: "Ingin bergabung dengan program karbon?",

    // Priority and Category Labels
    priority_important: "Penting",
    priority_info: "Info",
    category_forest: "Kehutanan",
    category_technology: "Teknologi",
    category_policy: "Kebijakan",

    // Footer Accessibility
    accessibility: "Aksesibilitas",
    text_size: "Ukuran Teks",
    display_mode: "Mode Tampilan",
    light: "Terang",
    dark: "Gelap",
    language: "Bahasa",

    // Footer Links
    contact_us: "Hubungi C-NEX",
    main_services: "Layanan Utama",
    information: "Informasi",
    transparency: "Transparansi",
    social_media: "Media Sosial",
    privacy_policy: "Kebijakan Privasi",
    terms_conditions: "Syarat & Ketentuan",
    sitemap: "Peta Situs",
    copyright: "2025 C-NEX - Carbon Network & Intelligence Exchange Indonesia.",
    disability_support: "Dukungan Disabilitas",
    access_guide: "Panduan Akses",

    // MRV Dashboard
    mrv_dashboard_badge: "Dashboard MRV C-NEX",
    mrv_dashboard_title: "Dashboard MRV C-NEX",
    mrv_dashboard_desc:
      "Akses data MRV, proyek, dan laporan karbon dalam satu dashboard interaktif",
    mrv_module_summary: "Ringkasan",
    mrv_module_baseline: "Baseline",
    mrv_module_stock: "Stok Karbon",
    mrv_module_mitigation: "Mitigasi",
    mrv_module_nek: "NEK",
    mrv_module_economic: "Nilai Ekonomi",
    mrv_module_compliance: "Kepatuhan",
    mrv_carbon_stock: "Stok Karbon",
    mrv_emission_reduction: "Penurunan Emisi",
    mrv_carbon_units: "Unit Karbon",
    mrv_economic_value: "Nilai Ekonomi",
    mrv_total_area: "Total Area",
    mrv_monitoring_period: "Periode Monitoring",
    mrv_certifications: "Sertifikasi",
    mrv_project_status: "Status Proyek",
    mrv_baseline_title: "Baseline",
    mrv_location: "Lokasi",
    mrv_coordinates: "Koordinat",
    mrv_ecosystem_distribution: "Distribusi Ekosistem",
    mrv_ecosystem_details: "Detail Ekosistem",
    mrv_ecosystem_type: "Jenis Ekosistem",
    mrv_area: "Luas",
    mrv_percentage: "Persentase",
    mrv_map_placeholder: "Peta",
    mrv_map_desc: "Peta interaktif untuk melihat distribusi ekosistem",
    mrv_stock_title: "Stok Karbon",
    mrv_initial_stock: "Stok Awal",
    mrv_current_stock: "Stok Saat Ini",
    mrv_stock_trend: "Tren Stok",
    mrv_actual_stock: "Stok Aktual",
    mrv_target_stock: "Target Stok",
    mrv_methodology: "Metodologi",
    mrv_carbon_fraction: "Fraksi Karbon",
    mrv_conversion_factor: "Faktor Konversi",
    mrv_emission_source: "Sumber Emisi",
    mrv_allometric: "Allometrik",
    mrv_mitigation_title: "Mitigasi",
    mrv_gross_er: "Penurunan Emisi Bruto",
    mrv_net_er: "Penurunan Emisi Neto",
    mrv_after_deductions: "Setelah Deduksi",
    mrv_deductions: "Deduksi",
    mrv_leakage: "Kebocoran",
    mrv_uncertainty: "Ketidakpastian",
    mrv_buffer: "Buffer",
    mrv_total_deductions: "Total Deduksi",
    mrv_calculation: "Perhitungan",
    mrv_nek_title: "NEK",
    mrv_potential_spe: "Potensi SPE",
    mrv_verified_spe: "SPE Terverifikasi",
    mrv_issued_spe: "SPE Terbit",
    mrv_stage: "Tahapan",
    mrv_srnppi: "SRN-PPI",
    mrv_registration_number: "Nomor Registrasi",
    mrv_registration_date: "Tanggal Registrasi",
    mrv_project_category: "Kategori Proyek",
    mrv_vintage_year: "Tahun Vintage",
    mrv_economic_title: "Nilai Ekonomi",
    mrv_current_price: "Harga Saat Ini",
    mrv_total_value: "Total Nilai",
    mrv_potential_value: "Nilai Potensial",
    mrv_units_status: "Status Unit",
    mrv_sold: "Terjual",
    mrv_offset: "Offset",
    mrv_available: "Tersedia",
    mrv_price_scenarios: "Skenario Harga",
    mrv_low_price: "Harga Rendah",
    mrv_medium_price: "Harga Menengah",
    mrv_high_price: "Harga Tinggi",
    mrv_recent_transactions: "Transaksi Terbaru",
    mrv_completed: "Selesai",
    mrv_compliance_title: "Kepatuhan",
    mrv_srnppi_status: "Status SRN-PPI",
    mrv_double_counting: "Double Counting",
    mrv_blockchain_protected: "Dilindungi Blockchain",
    mrv_buffer_permanence: "Buffer Permanensi",
    mrv_required: "Dibutuhkan",
    mrv_held: "Dipegang",
    mrv_fulfilled: "Terpenuhi",
    mrv_reporting_obligation: "Kewajiban Pelaporan",
    mrv_frequency: "Frekuensi",
    mrv_next_deadline: "Tenggat Berikutnya",
    mrv_reversal_risk: "Risiko Pembalikan",
    mrv_fire_risk: "Risiko Kebakaran",
    mrv_logging_risk: "Risiko Pembalakan",
    mrv_policy_risk: "Risiko Kebijakan",
    mrv_overall_risk: "Risiko Keseluruhan",
    mrv_maintenance_obligation: "Kewajiban Pemeliharaan",
    mrv_period: "Periode",
    mrv_start_date: "Tanggal Mulai",
    mrv_end_date: "Tanggal Selesai",
    mrv_active_certifications: "Sertifikasi Aktif",
    mrv_valid_until: "Berlaku Hingga",
    mrv_download_report: "Unduh Laporan",
    mrv_share_stakeholders: "Bagikan ke Stakeholder",
  },
  en: {
    // Loading
    loading_title: "Loading Content...",
    loading_subtitle: "Please wait a moment",

    // Header
    search_placeholder: "Search carbon services...",
    login: "Login",
    home: "Home",
    services: "Services",
    news: "News",
    data: "Data",
    info: "Info",
    marketplace: "Marketplace",
    projects: "Projects",
    calculator: "Calculator",
    reports: "Reports",

    // Hero Section
    hero_badge: "🌱 Indonesia's Certified Carbon System",
    hero_title_1: "Indonesia's Trusted",
    hero_title_2: "Carbon Platform",
    hero_description:
      "Manage, trade, and monitor your carbon credits with blockchain-based MRV system that's transparent and certified according to Indonesia's NEK regulations",
    hero_features: "MRV • Blockchain • SRN-PPI",
    hero_cta_primary: "Get Started",
    hero_cta_secondary: "Learn More",
    hero_main_services: "Main Services",
    hero_services_desc: "Complete carbon management solutions for Indonesia",

    // Service Categories
    service_carbon_tracking: "Carbon Tracking",
    service_carbon_tracking_desc:
      "Monitor real-time carbon stocks with satellite technology and AI",
    service_carbon_credit: "Carbon Credits",
    service_carbon_credit_desc:
      "Trade certified carbon credits on blockchain marketplace",
    service_carbon_offset: "Carbon Offset",
    service_carbon_offset_desc:
      "Offset programs to achieve net-zero emissions targets",
    service_carbon_report: "Carbon Reports",
    service_carbon_report_desc:
      "Complete MRV reports according to NEK and international standards",
    service_carbon_audit: "Carbon Audit",
    service_carbon_audit_desc:
      "Verification and validation of carbon projects by certified auditors",

    // Trust Points
    trust_certified: "NEK Certified",
    trust_certified_desc:
      "Compliant with Indonesia's Carbon Economic Value regulations",
    trust_transparent: "Full Transparency",
    trust_transparent_desc: "All transactions recorded on blockchain",
    trust_verified: "Third-party Verified",
    trust_verified_desc: "Audited by certified independent institutions",

    // Quick Access
    quick_access_badge: "Quick Access",
    quick_access_title: "Popular Services",
    quick_access_desc: "Direct access to the most used carbon services",
    start_now: "Start Now",
    estimated_time: "Estimated Time",
    completed_today: "Completed Today",
    services_completed: "Services Completed",
    average_response: "Average Response Time",
    satisfaction_rate: "Satisfaction Rate",
    online_services: "Online Services",
    popular_label: "Popular",

    // Carbon Calculator
    calculator_badge: "C-NEX Carbon Calculator",
    calculator_title: "Indonesia Carbon Calculator",
    calculator_desc:
      "Calculate carbon stock, credits, and economic value with Indonesia standards",
    carbon_stock: "Carbon Stock",
    carbon_credit: "Carbon Credit",
    land_area: "Land Area",
    land_cover_type: "Land Cover Type",
    land_cover_primary_forest: "Primary Forest",
    land_cover_secondary_forest: "Secondary Forest",
    land_cover_mangrove: "Mangrove",
    tree_count: "Tree Count",
    forest_type: "Forest Type",
    forest_tropical: "Tropical",
    forest_temperate: "Temperate",
    forest_boreal: "Boreal",
    annual_emission: "Annual Emission",
    offset_target: "Offset Target",
    project_type: "Project Type",
    project_reforestation: "Reforestation",
    project_renewable: "Renewable Energy",
    project_efficiency: "Energy Efficiency",
    total_carbon_stock: "Total Carbon Stock",
    equivalent_to: "Equivalent to",
    carbon_per_hectare: "Carbon per Hectare",
    carbon_per_tree: "Carbon per Tree",
    environmental_impact: "Environmental Impact",
    impact_description: "Contribution to Indonesia's NDC",
    positive: "Positive",
    impact_1: "Removes emissions from",
    cars_year: "cars/year",
    impact_2: "Produces",
    oxygen_year: "kg O₂/year",
    credits_needed: "Credits Needed",
    credits: "credits",
    offset_amount: "Offset amount",
    total_cost: "Estimated Cost",
    cost_per_credit: "Price per Credit",
    alternative_solution: "Profit-Sharing Solution",
    alternative_description: "Long-term investment with revenue sharing",
    recommended: "Recommended",
    plant_trees: "Plant trees",
    trees: "trees",
    hectares: "hectares",
    est_cost: "Estimated investment",
    one_time: "(with profit-sharing)",
    start_project: "Start Project",
    purchase_credits: "Buy Credits on Marketplace",

    // Services by Sector
    persona_title: "Solutions for Every Sector",
    persona_desc:
      "C-NEX services tailored to Indonesia's ecosystem needs and regulations",
    persona_forestry: "Forestry",
    persona_agriculture: "Agriculture",
    persona_energy: "Energy",
    persona_industry: "Industry",

    // News Section
    news_title: "Indonesia Carbon Market Updates",
    news_desc:
      "Latest news about carbon market, NEK regulations, and carbon offsetting projects in Indonesia",
    news_tab: "📰 News",
    announcements_tab: "📢 Announcements",
    news_scholarship_title: "Carbon Scholarships for Indonesian Students",
    news_scholarship_desc:
      "Supporting the next generation of carbon market professionals in Indonesia",
    category_education: "Education",
    news_app_title: "C-NEX Launches Mobile App for Carbon Management",
    news_app_desc:
      "New app enables users to track carbon credits and projects on-the-go",
    news_festival_title: "2025 Carbon & Environment Festival",
    news_festival_desc:
      "Celebrating climate action and carbon innovation in Indonesia",
    category_culture: "Culture",
    announce_holiday_title: "Liburan Kebijakan Karbon 2025",
    announce_holiday_desc:
      "Pengumuman liburan kebijakan karbon untuk tahun 2025",
    announce_infrastructure_title: "Pengembangan Infrastruktur Karbon",
    announce_infrastructure_desc:
      "Pengumuman pengembangan infrastruktur karbon untuk tahun 2025",
    announce_health_title: "Health Sector Carbon Initiatives",
    announce_health_desc:
      "New carbon offset programs in Indonesia's health sector",

    // Sample News
    news_forest_title: "Central Kalimantan REDD+ Project Launched",
    news_forest_desc:
      "Reducing Emissions from Deforestation and Forest Degradation program targeting 500K ha...",
    news_market_title: "Indonesia Carbon Credit Prices Up 30% in Q1 2025",
    news_market_desc:
      "Domestic carbon market shows significant growth with SRN-PPI integration...",
    news_technology_title: "C-NEX Launches AI and Satellite-based MRV Feature",
    news_technology_desc:
      "Real-time carbon stock monitoring using Sentinel-2 technology and machine learning...",

    // Sample Announcements
    announce_regulation_title: "NEK Implementation and SRN-PPI Integration",
    announce_regulation_desc:
      "Government strengthens Carbon Economic Value regulations for Indonesia's carbon market...",
    announce_project_title: "Opening of C-NEX Carbon Credit Marketplace",
    announce_project_desc:
      "Blockchain-integrated carbon marketplace for full transparency...",
    announce_report_title: "Indonesia's NDC Report: 29% Unconditional Target",
    announce_report_desc:
      "National emission reduction achievements and carbon project contributions...",

    // Agenda Section
    agenda_title: "Indonesia Climate Action Agenda",
    agenda_desc:
      "Events and conferences about climate action, carbon management, and green economy in Indonesia",
    view_all_agenda: "View All Agenda",
    agenda_meeting_title: "NEK 2025 Implementation Coordination Meeting",
    meeting_type: "Coordination Meeting",
    officials_participants: "Local Government & Ministry Officials",
    agenda_dialog_title: "Public Dialogue: Carbon Market for Communities",
    public_dialog_type: "Public Dialogue",
    public_officials_participants: "General Public & Officials",
    agenda_smart_city_title: "Smart City & Green Economy Socialization",
    public_event_type: "Public Event",
    all_citizens_participants: "All Citizens",

    // Transparency Section
    transparency_badge: "Blockchain Transparency",
    transparency_title_1: "Verified",
    transparency_title_2: "& Transparent Carbon Data",
    transparency_desc:
      "Every carbon transaction is recorded on blockchain to prevent double counting and ensure data integrity",
    transparency_features: "MRV • Blockchain • SRN-PPI Integration",

    // Transparency Widgets
    financial_report: "Financial Report",
    financial_desc: "Budget allocation and financial transparency report",
    total_budget: "Total Budget",
    budget_2025: "Budget 2025",
    budget_desc: "Budget allocation for national development",
    development: "Development",
    e_report: "E-Report",
    e_report_desc: "Integrated electronic reporting system",
    reports_received: "Reports Received",
    open_data: "Open Data",
    open_data_desc: "Public data access and open datasets",
    datasets: "Datasets",
    progress: "Progress",
    budget_distributed: "Budget Distributed",
    projects_completed: "Projects Completed",

    // Portal
    portal_title: "Real-time C-NEX Dashboard",
    portal_desc:
      "Access carbon stock data, carbon credits, and Indonesia's carbon projects in one interactive dashboard",
    carbon_sequestered: "Carbon Sequestered",
    projects_active: "Active Projects",
    transparency_score: "Transparency Score",
    access_portal: "Access Dashboard",

    // Testimonials
    testimonials_title: "Stakeholder & Partner Testimonials",
    testimonials_desc:
      "Experiences of local governments, cooperatives, indigenous communities, and companies in carbon management programs",
    testimonials_cta_1: "Write Testimonial",
    testimonials_cta_2: "Register as Partner",
    testimonials_question: "Want to join the carbon program?",

    // Priority and Category Labels
    priority_important: "Important",
    priority_info: "Info",
    category_forest: "Forestry",
    category_technology: "Technology",
    category_policy: "Policy",

    // Footer Accessibility
    accessibility: "Accessibility",
    text_size: "Text Size",
    display_mode: "Display Mode",
    light: "Light",
    dark: "Dark",
    language: "Language",

    // Footer Links
    contact_us: "Contact C-NEX",
    main_services: "Main Services",
    information: "Information",
    transparency: "Transparency",
    social_media: "Social Media",
    privacy_policy: "Privacy Policy",
    terms_conditions: "Terms & Conditions",
    sitemap: "Site Map",
    copyright: "2025 C-NEX - Carbon Network & Intelligence Exchange Indonesia.",
    disability_support: "Dukungan Disabilitas",
    access_guide: "Panduan Akses",

    // MRV Dashboard
    mrv_dashboard_badge: "C-NEX MRV Dashboard",
    mrv_dashboard_title: "C-NEX MRV Dashboard",
    mrv_dashboard_desc:
      "Access MRV data, projects, and carbon reports in one interactive dashboard",
    mrv_module_summary: "Summary",
    mrv_module_baseline: "Baseline",
    mrv_module_stock: "Carbon Stock",
    mrv_module_mitigation: "Mitigation",
    mrv_module_nek: "NEK",
    mrv_module_economic: "Economic Value",
    mrv_module_compliance: "Compliance",
    mrv_carbon_stock: "Carbon Stock",
    mrv_emission_reduction: "Emission Reduction",
    mrv_carbon_units: "Carbon Units",
    mrv_economic_value: "Economic Value",
    mrv_total_area: "Total Area",
    mrv_monitoring_period: "Monitoring Period",
    mrv_certifications: "Certifications",
    mrv_project_status: "Project Status",
    mrv_baseline_title: "Baseline",
    mrv_location: "Location",
    mrv_coordinates: "Coordinates",
    mrv_ecosystem_distribution: "Ecosystem Distribution",
    mrv_ecosystem_details: "Ecosystem Details",
    mrv_ecosystem_type: "Ecosystem Type",
    mrv_area: "Area",
    mrv_percentage: "Percentage",
    mrv_map_placeholder: "Map",
    mrv_map_desc: "Interactive map to view ecosystem distribution",
    mrv_stock_title: "Carbon Stock",
    mrv_initial_stock: "Initial Stock",
    mrv_current_stock: "Current Stock",
    mrv_stock_trend: "Stock Trend",
    mrv_actual_stock: "Actual Stock",
    mrv_target_stock: "Target Stock",
    mrv_methodology: "Methodology",
    mrv_carbon_fraction: "Carbon Fraction",
    mrv_conversion_factor: "Conversion Factor",
    mrv_emission_source: "Emission Source",
    mrv_allometric: "Allometric",
    mrv_mitigation_title: "Mitigation",
    mrv_gross_er: "Gross Emission Reduction",
    mrv_net_er: "Net Emission Reduction",
    mrv_after_deductions: "After Deductions",
    mrv_deductions: "Deductions",
    mrv_leakage: "Leakage",
    mrv_uncertainty: "Uncertainty",
    mrv_buffer: "Buffer",
    mrv_total_deductions: "Total Deductions",
    mrv_calculation: "Calculation",
    mrv_nek_title: "NEK",
    mrv_potential_spe: "Potential SPE",
    mrv_verified_spe: "Verified SPE",
    mrv_issued_spe: "Issued SPE",
    mrv_stage: "Stage",
    mrv_srnppi: "SRN-PPI",
    mrv_registration_number: "Registration Number",
    mrv_registration_date: "Registration Date",
    mrv_project_category: "Project Category",
    mrv_vintage_year: "Vintage Year",
    mrv_economic_title: "Economic Value",
    mrv_current_price: "Current Price",
    mrv_total_value: "Total Value",
    mrv_potential_value: "Potential Value",
    mrv_units_status: "Units Status",
    mrv_sold: "Sold",
    mrv_offset: "Offset",
    mrv_available: "Available",
    mrv_price_scenarios: "Price Scenarios",
    mrv_low_price: "Low Price",
    mrv_medium_price: "Medium Price",
    mrv_high_price: "High Price",
    mrv_recent_transactions: "Recent Transactions",
    mrv_completed: "Completed",
    mrv_compliance_title: "Compliance",
    mrv_srnppi_status: "SRN-PPI Status",
    mrv_double_counting: "Double Counting",
    mrv_blockchain_protected: "Blockchain Protected",
    mrv_buffer_permanence: "Buffer Permanence",
    mrv_required: "Required",
    mrv_held: "Held",
    mrv_fulfilled: "Fulfilled",
    mrv_reporting_obligation: "Reporting Obligation",
    mrv_frequency: "Frequency",
    mrv_next_deadline: "Next Deadline",
    mrv_reversal_risk: "Reversal Risk",
    mrv_fire_risk: "Fire Risk",
    mrv_logging_risk: "Logging Risk",
    mrv_policy_risk: "Policy Risk",
    mrv_overall_risk: "Overall Risk",
    mrv_maintenance_obligation: "Maintenance Obligation",
    mrv_period: "Period",
    mrv_start_date: "Start Date",
    mrv_end_date: "End Date",
    mrv_active_certifications: "Active Certifications",
    mrv_valid_until: "Valid Until",
    mrv_download_report: "Download Report",
    mrv_share_stakeholders: "Share with Stakeholders",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["id", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      setLanguage("id");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
