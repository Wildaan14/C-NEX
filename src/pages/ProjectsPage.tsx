import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Leaf,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "active" | "pending" | "completed" | "draft";
  progress: number;
  carbonCredits: number;
  startDate: string;
  endDate: string;
  team: number;
  description: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Restorasi Hutan Kalimantan Timur",
    type: "Forestry",
    location: "Kalimantan Timur",
    status: "active",
    progress: 75,
    carbonCredits: 12500,
    startDate: "2024-01-15",
    endDate: "2026-12-31",
    team: 24,
    description: "Proyek restorasi hutan tropis dengan metode agroforestri berkelanjutan",
  },
  {
    id: "2",
    name: "Konservasi Mangrove Sulawesi",
    type: "Blue Carbon",
    location: "Sulawesi Selatan",
    status: "active",
    progress: 45,
    carbonCredits: 8200,
    startDate: "2024-03-01",
    endDate: "2027-02-28",
    team: 18,
    description: "Program konservasi dan rehabilitasi ekosistem mangrove pesisir",
  },
  {
    id: "3",
    name: "PLTS Komunitas Bali",
    type: "Renewable Energy",
    location: "Bali",
    status: "completed",
    progress: 100,
    carbonCredits: 5400,
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    team: 12,
    description: "Instalasi panel surya untuk 500 rumah tangga di pedesaan Bali",
  },
  {
    id: "4",
    name: "Biogas Peternakan Jawa Tengah",
    type: "Waste Management",
    location: "Jawa Tengah",
    status: "pending",
    progress: 20,
    carbonCredits: 3100,
    startDate: "2024-06-01",
    endDate: "2026-05-31",
    team: 8,
    description: "Pengolahan limbah peternakan menjadi biogas untuk energi komunitas",
  },
  {
    id: "5",
    name: "Perlindungan Hutan Sumatra",
    type: "REDD+",
    location: "Sumatra Barat",
    status: "draft",
    progress: 0,
    carbonCredits: 0,
    startDate: "2025-01-01",
    endDate: "2030-12-31",
    team: 0,
    description: "Proyek REDD+ untuk melindungi hutan primer dari deforestasi",
  },
];

export const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "draft":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-3 h-3" />;
      case "pending":
        return <AlertCircle className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Edit className="w-3 h-3" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Berjalan";
      case "pending":
        return "Menunggu";
      case "completed":
        return "Selesai";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Proyek", value: projects.length, icon: <FolderKanban className="w-5 h-5" /> },
    { label: "Proyek Aktif", value: projects.filter((p) => p.status === "active").length, icon: <Clock className="w-5 h-5" /> },
    { label: "Total Kredit", value: "29.2K tCO₂e", icon: <Leaf className="w-5 h-5" /> },
    { label: "Tim Terlibat", value: projects.reduce((acc, p) => acc + p.team, 0), icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proyek Karbon</h1>
          <p className="text-muted-foreground">
            Kelola dan monitor semua proyek karbon Anda
          </p>
        </div>
        {(user?.role === "admin" || user?.role === "company") && (
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Proyek Baru
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">{stat.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari proyek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "pending", "completed", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {status === "all" ? "Semua" : getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-5 hover:border-primary/50 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Project Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Leaf className="w-8 h-8 text-primary" />
              </div>

              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 flex-shrink-0 ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {getStatusIcon(project.status)}
                    {getStatusText(project.status)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.startDate} - {project.endDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.team} anggota
                  </span>
                  <span className="flex items-center gap-1">
                    <Leaf className="w-4 h-4" />
                    {project.carbonCredits.toLocaleString()} tCO₂e
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-12 text-right">
                    {project.progress}%
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 lg:flex-col">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Lihat Detail">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </button>
                {(user?.role === "admin" || user?.role === "company") && (
                  <>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Edit">
                      <Edit className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Hapus">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderKanban className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Tidak ada proyek</h3>
          <p className="text-muted-foreground">
            Belum ada proyek yang sesuai dengan filter Anda
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
