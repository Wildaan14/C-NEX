import React from "react";
import {
  MapPin,
  Satellite,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Activity,
  Eye,
  FileCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface MRVProject {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  ndvi: number; // Normalized Difference Vegetation Index
  carbonStock: number;
  deforestationRisk: "low" | "medium" | "high";
  verificationStatus: "verified" | "pending" | "field-visit";
  lastUpdate: string;
}

const mockProjects: MRVProject[] = [
  {
    id: "PRJ-001",
    name: "Hutan Tropis Kalimantan Tengah",
    location: "Kalimantan Tengah",
    coordinates: { lat: -1.68, lng: 113.38 },
    ndvi: 0.82,
    carbonStock: 245000,
    deforestationRisk: "low",
    verificationStatus: "verified",
    lastUpdate: "2 jam lalu",
  },
  {
    id: "PRJ-002",
    name: "Mangrove Restoration Sumatra",
    location: "Sumatra Utara",
    coordinates: { lat: 3.58, lng: 98.67 },
    ndvi: 0.75,
    carbonStock: 89000,
    deforestationRisk: "medium",
    verificationStatus: "field-visit",
    lastUpdate: "5 jam lalu",
  },
  {
    id: "PRJ-003",
    name: "REDD+ Papua Barat",
    location: "Papua Barat",
    coordinates: { lat: -1.33, lng: 133.17 },
    ndvi: 0.88,
    carbonStock: 512000,
    deforestationRisk: "low",
    verificationStatus: "verified",
    lastUpdate: "1 hari lalu",
  },
  {
    id: "PRJ-004",
    name: "Agroforestry Jawa Barat",
    location: "Jawa Barat",
    coordinates: { lat: -6.91, lng: 107.61 },
    ndvi: 0.68,
    carbonStock: 34000,
    deforestationRisk: "high",
    verificationStatus: "pending",
    lastUpdate: "3 jam lalu",
  },
];

export function MRVDashboard() {
  const [selectedProject, setSelectedProject] = useState<MRVProject | null>(
    null,
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-muted-foreground bg-secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "field-visit":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "pending":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      default:
        return "text-muted-foreground bg-secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />;
      case "field-visit":
        return <Eye className="w-4 h-4" />;
      case "pending":
        return <Activity className="w-4 h-4 animate-pulse" />;
      default:
        return <FileCheck className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Satellite className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              MRV Real-time Monitoring
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Monitoring, Reporting & Verification
          </h2>
          <p className="text-muted-foreground">
            Pemantauan real-time menggunakan citra satelit Sentinel-2, AI, dan
            verifikasi lapangan
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Satellite className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Live
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">24</p>
          <p className="text-sm text-muted-foreground">Proyek Termonitor</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">18</p>
          <p className="text-sm text-muted-foreground">Terverifikasi</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-muted-foreground">Real-time</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">0.78</p>
          <p className="text-sm text-muted-foreground">Avg NDVI Index</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-xs text-red-500">Alert</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">2</p>
          <p className="text-sm text-muted-foreground">Risiko Tinggi</p>
        </motion.div>
      </div>

      {/* Interactive Map & Project List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Peta Geospasial Proyek Karbon Indonesia
            </h3>
          </div>
          <div className="relative aspect-video bg-gradient-to-br from-background via-primary/5 to-background">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Project Markers */}
            {mockProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${20 + idx * 20}%`,
                  top: `${30 + (idx % 2) * 30}%`,
                }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-background ${
                      project.verificationStatus === "verified"
                        ? "bg-green-500"
                        : project.verificationStatus === "field-visit"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                    }`}
                  />
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">Field Visit</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-muted-foreground">Pending</span>
              </div>
            </div>

            {/* Satellite Info */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Satellite className="w-3 h-3" />
                <span>Sentinel-2 MSI</span>
              </div>
              <div className="text-xs text-foreground font-mono">
                Last Update: {new Date().toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-4">
              Proyek Terpantau
            </h3>
            <div className="space-y-3">
              {mockProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedProject?.id === project.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground mb-1">
                        {project.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`px-2 py-1 rounded text-xs flex items-center gap-1 border ${getStatusColor(project.verificationStatus)}`}
                    >
                      {getStatusIcon(project.verificationStatus)}
                      <span className="capitalize">
                        {project.verificationStatus}
                      </span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs flex items-center gap-1 border ${getRiskColor(project.deforestationRisk)}`}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span className="capitalize">
                        {project.deforestationRisk}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">NDVI</p>
                      <p className="font-semibold text-foreground">
                        {project.ndvi.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Carbon Stock</p>
                      <p className="font-semibold text-foreground">
                        {(project.carbonStock / 1000).toFixed(0)}K tCO₂e
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Update: {project.lastUpdate}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Verification Standards */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-3 text-sm">
              Standar Verifikasi
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>ISO 14064-2</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>VCS (Verra)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Gold Standard</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Perpres 98/2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
