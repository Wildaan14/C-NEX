import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Home,
  ShoppingCart,
  FolderKanban,
  Calculator,
  Newspaper,
  FileText,
  BarChart3,
  TrendingUp,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  Crown,
  Moon,
  Sun,
  Globe,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../components/LanguageProvider";

interface NavItem {
  nameId: string;
  nameEn: string;
  path: string;
  icon: React.ReactNode;
  roles?: ("admin" | "user" | "company")[];
  badge?: string;
}

const navItems: NavItem[] = [
  {
    nameId: "Beranda",
    nameEn: "Home",
    path: "/home",
    icon: <Home className="w-5 h-5" />,
  },
  {
    nameId: "Marketplace",
    nameEn: "Marketplace",
    path: "/marketplace",
    icon: <ShoppingCart className="w-5 h-5" />,
    badge: "Hot",
  },
  {
    nameId: "Proyek",
    nameEn: "Projects",
    path: "/projects",
    icon: <FolderKanban className="w-5 h-5" />,
  },
  {
    nameId: "Kalkulator",
    nameEn: "Calculator",
    path: "/calculator",
    icon: <Calculator className="w-5 h-5" />,
  },
  {
    nameId: "Berita",
    nameEn: "News",
    path: "/news",
    icon: <Newspaper className="w-5 h-5" />,
  },
  {
    nameId: "Laporan",
    nameEn: "Reports",
    path: "/reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    nameId: "MRV Dashboard",
    nameEn: "MRV Dashboard",
    path: "/mrv-dashboard",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["admin", "company"],
  },
  {
    nameId: "ESG Scoring",
    nameEn: "ESG Scoring",
    path: "/esg-scoring",
    icon: <TrendingUp className="w-5 h-5" />,
    roles: ["admin", "company"],
  },
  {
    nameId: "Admin Panel",
    nameEn: "Admin Panel",
    path: "/admin",
    icon: <Shield className="w-5 h-5" />,
    roles: ["admin"],
  },
];

export const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case "admin":
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case "company":
        return <Building2 className="w-4 h-4 text-blue-500" />;
      default:
        return <User className="w-4 h-4 text-primary" />;
    }
  };

  const getRoleName = () => {
    if (language === "id") {
      switch (user?.role) {
        case "admin":
          return "Administrator";
        case "company":
          return "Perusahaan";
        default:
          return "Individual";
      }
    } else {
      switch (user?.role) {
        case "admin":
          return "Administrator";
        case "company":
          return "Company";
        default:
          return "Individual";
      }
    }
  };

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case "admin":
        return "bg-gradient-to-r from-yellow-500 to-amber-500";
      case "company":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default:
        return "bg-gradient-to-r from-emerald-500 to-green-500";
    }
  };

  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  const searchPlaceholder =
    language === "id"
      ? "Cari fitur, proyek, atau kredit karbon..."
      : "Search features, projects, or carbon credits...";

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0d1411]/95 backdrop-blur-xl border-b border-emerald-900/30 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-emerald-500/10 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-300" />
            </button>

            <Link to="/home" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div
                className={`hidden sm:block transition-all duration-300 ${sidebarCollapsed ? "lg:hidden" : ""}`}
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  C-NEX
                </h1>
                <p className="text-[10px] text-gray-500">
                  Carbon Network Exchange
                </p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-12 pr-4 py-2.5 bg-[#1a2420] border border-emerald-900/30 rounded-xl text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl hover:bg-emerald-500/10 transition-colors group"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
              )}
            </button>

            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-emerald-500/10 transition-colors group flex items-center gap-1"
              >
                <Globe className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
                <span className="text-xs text-gray-400 font-medium">
                  {language.toUpperCase()}
                </span>
              </button>

              <AnimatePresence>
                {languageMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLanguageMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-40 bg-[#1a2420] border border-emerald-900/30 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setLanguage("id");
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-emerald-500/10 flex items-center gap-3 ${language === "id" ? "text-emerald-400 bg-emerald-500/10" : "text-gray-300"}`}
                      >
                        <span className="text-lg">🇮🇩</span>
                        <span>Bahasa Indonesia</span>
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("en");
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-emerald-500/10 flex items-center gap-3 ${language === "en" ? "text-emerald-400 bg-emerald-500/10" : "text-gray-300"}`}
                      >
                        <span className="text-lg">🇺🇸</span>
                        <span>English</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl hover:bg-emerald-500/10 transition-colors group">
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* User Menu */}
            <div className="relative ml-2">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 pr-3 rounded-xl hover:bg-emerald-500/10 transition-colors"
              >
                <div
                  className={`w-9 h-9 ${getRoleBadgeColor()} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-200">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{getRoleName()}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 hidden sm:block transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-72 bg-[#1a2420] border border-emerald-900/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-b border-emerald-900/30">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 ${getRoleBadgeColor()} rounded-xl flex items-center justify-center`}
                          >
                            <span className="text-white font-bold text-lg">
                              {user?.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-200">
                              {user?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <span
                            className={`px-2 py-1 ${getRoleBadgeColor()} rounded-lg text-xs font-medium text-white`}
                          >
                            {getRoleName()}
                          </span>
                        </div>
                      </div>

                      <div className="p-2">
                        <Link
                          to="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-500/10 transition-colors"
                        >
                          <User className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300">
                            {language === "id" ? "Profil Saya" : "My Profile"}
                          </span>
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-500/10 transition-colors"
                        >
                          <Settings className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300">
                            {language === "id" ? "Pengaturan" : "Settings"}
                          </span>
                        </Link>
                        <div className="my-2 border-t border-emerald-900/30" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors text-red-400"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>{language === "id" ? "Keluar" : "Logout"}</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex fixed left-0 top-16 bottom-0 bg-[#0d1411]/95 backdrop-blur-xl border-r border-emerald-900/30 flex-col z-40 transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-6 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors z-50"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white" />
          )}
        </button>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                    : "text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400"
                }`}
                title={
                  sidebarCollapsed
                    ? language === "id"
                      ? item.nameId
                      : item.nameEn
                    : undefined
                }
              >
                <span
                  className={`flex-shrink-0 ${isActive ? "text-white" : ""}`}
                >
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <>
                    <span className="font-medium">
                      {language === "id" ? item.nameId : item.nameEn}
                    </span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {sidebarCollapsed && item.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {!sidebarCollapsed && (
          <div className="p-3">
            <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {language === "id" ? "Butuh Bantuan?" : "Need Help?"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === "id"
                      ? "Tim support 24/7"
                      : "24/7 Support Team"}
                  </p>
                </div>
              </div>
              <button className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {language === "id" ? "Hubungi Support" : "Contact Support"}
              </button>
            </div>
          </div>
        )}

        {sidebarCollapsed && (
          <div className="p-3">
            <button
              className="w-full p-3 bg-emerald-500/20 rounded-xl hover:bg-emerald-500/30 transition-colors"
              title={language === "id" ? "Hubungi Support" : "Contact Support"}
            >
              <HelpCircle className="w-5 h-5 text-emerald-400 mx-auto" />
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-[#0d1411] z-50 lg:hidden flex flex-col"
            >
              <div className="h-16 px-4 flex items-center justify-between border-b border-emerald-900/30">
                <Link to="/home" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    C-NEX
                  </h1>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl hover:bg-emerald-500/10 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {filteredNavItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                          : "text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">
                        {language === "id" ? item.nameId : item.nameEn}
                      </span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-emerald-900/30">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{language === "id" ? "Keluar" : "Logout"}</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
