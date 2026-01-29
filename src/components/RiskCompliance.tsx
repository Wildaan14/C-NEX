import React from "react";
import {
  AlertTriangle,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  TrendingUp,
  Flame,
  Trees,
  Scale,
} from "lucide-react";
import { motion } from "motion/react";

interface RiskIndicator {
  category: string;
  level: "low" | "medium" | "high" | "critical";
  score: number;
  description: string;
  icon: any;
}

interface ComplianceItem {
  regulation: string;
  status: "compliant" | "partial" | "non-compliant";
  lastAudit: string;
  nextAudit: string;
  documents: number;
}

const riskIndicators: RiskIndicator[] = [
  {
    category: "Kebakaran Hutan",
    level: "medium",
    score: 45,
    description: "Hotspot terdeteksi di 3 lokasi dalam radius 10km",
    icon: Flame,
  },
  {
    category: "Deforestasi",
    level: "low",
    score: 18,
    description: "Perubahan tutupan lahan <2% dalam 6 bulan terakhir",
    icon: Trees,
  },
  {
    category: "Legalitas Lahan",
    level: "low",
    score: 12,
    description: "Tidak ada sengketa lahan aktif",
    icon: Scale,
  },
  {
    category: "Verifikasi MRV",
    level: "high",
    score: 72,
    description: "2 proyek pending field verification",
    icon: Shield,
  },
];

const complianceData: ComplianceItem[] = [
  {
    regulation: "Perpres 98/2021 - Nilai Ekonomi Karbon",
    status: "compliant",
    lastAudit: "2024-12-15",
    nextAudit: "2025-06-15",
    documents: 12,
  },
  {
    regulation: "Permen LHK 7/2023 - Tata Cara PEPPK",
    status: "compliant",
    lastAudit: "2024-11-20",
    nextAudit: "2025-05-20",
    documents: 8,
  },
  {
    regulation: "Article 6 Paris Agreement - ITMOs",
    status: "partial",
    lastAudit: "2024-10-10",
    nextAudit: "2025-04-10",
    documents: 5,
  },
  {
    regulation: "ISO 14064-2:2019 - GHG Quantification",
    status: "compliant",
    lastAudit: "2024-12-01",
    nextAudit: "2025-12-01",
    documents: 15,
  },
  {
    regulation: "VCS Standard v4.5 - Carbon Verification",
    status: "compliant",
    lastAudit: "2024-11-15",
    nextAudit: "2025-11-15",
    documents: 10,
  },
];

export function RiskCompliance() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return {
          bg: "bg-green-500/10",
          text: "text-green-500",
          border: "border-green-500/20",
        };
      case "medium":
        return {
          bg: "bg-yellow-500/10",
          text: "text-yellow-500",
          border: "border-yellow-500/20",
        };
      case "high":
        return {
          bg: "bg-orange-500/10",
          text: "text-orange-500",
          border: "border-orange-500/20",
        };
      case "critical":
        return {
          bg: "bg-red-500/10",
          text: "text-red-500",
          border: "border-red-500/20",
        };
      default:
        return {
          bg: "bg-secondary",
          text: "text-muted-foreground",
          border: "border-border",
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-green-500/10 text-green-500 border border-green-500/20">
            <CheckCircle className="w-3 h-3" />
            <span>Compliant</span>
          </div>
        );
      case "partial":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
            <AlertTriangle className="w-3 h-3" />
            <span>Partial</span>
          </div>
        );
      case "non-compliant":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-500/10 text-red-500 border border-red-500/20">
            <XCircle className="w-3 h-3" />
            <span>Non-Compliant</span>
          </div>
        );
      default:
        return null;
    }
  };

  const overallCompliance = Math.round(
    (complianceData.filter((c) => c.status === "compliant").length /
      complianceData.length) *
      100,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Risk & Compliance Monitoring
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Indikator Risiko & Kepatuhan Regulasi
          </h2>
          <p className="text-muted-foreground">
            Pemantauan risiko operasional dan kepatuhan terhadap standar
            nasional dan internasional
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
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xs text-green-500">Excellent</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">
            {overallCompliance}%
          </p>
          <p className="text-sm text-muted-foreground">Overall Compliance</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <span className="text-xs text-yellow-500">Monitor</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">2</p>
          <p className="text-sm text-muted-foreground">Medium Risk</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-blue-500">Active</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">5</p>
          <p className="text-sm text-muted-foreground">Regulations Tracked</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8%
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">50</p>
          <p className="text-sm text-muted-foreground">Documents Verified</p>
        </motion.div>
      </div>

      {/* Risk Indicators */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Indikator Risiko Operasional
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskIndicators.map((risk, idx) => {
              const colors = getLevelColor(risk.level);
              const Icon = risk.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="bg-secondary/30 border border-border rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}
                      >
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {risk.category}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {risk.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {risk.level.toUpperCase()}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Risk Score</span>
                      <span className={`font-semibold ${colors.text}`}>
                        {risk.score}/100
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${risk.score}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full bg-gradient-to-r ${
                          risk.level === "low"
                            ? "from-green-500 to-emerald-600"
                            : risk.level === "medium"
                              ? "from-yellow-500 to-orange-500"
                              : risk.level === "high"
                                ? "from-orange-500 to-red-500"
                                : "from-red-500 to-red-700"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compliance Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                Kepatuhan Regulasi
              </h3>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString("id-ID")}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Regulasi
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">
                  Audit Terakhir
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">
                  Audit Berikutnya
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">
                  Dokumen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {complianceData.map((item, idx) => (
                <motion.tr
                  key={idx}
                  whileHover={{
                    backgroundColor: "rgba(var(--primary-rgb), 0.02)",
                  }}
                  className="cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-foreground">
                      {item.regulation}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      {item.lastAudit}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      {item.nextAudit}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                      <FileText className="w-3 h-3" />
                      {item.documents}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regulatory Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Kerangka Regulasi Nasional
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Perpres 98/2021
                </p>
                <p className="text-xs text-muted-foreground">
                  Nilai Ekonomi Karbon untuk Pencapaian Target NDC
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Permen LHK 7/2023
                </p>
                <p className="text-xs text-muted-foreground">
                  Tata Cara Penyelenggaraan Perdagangan Karbon
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  SRN-PPI Integration
                </p>
                <p className="text-xs text-muted-foreground">
                  Sistem Registri Nasional Pengendalian Perubahan Iklim
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Standar Internasional
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Paris Agreement Article 6
                </p>
                <p className="text-xs text-muted-foreground">
                  Internationally Transferred Mitigation Outcomes (ITMOs)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  ISO 14064-2:2019
                </p>
                <p className="text-xs text-muted-foreground">
                  GHG Project Quantification & Reporting
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  VCS & Gold Standard
                </p>
                <p className="text-xs text-muted-foreground">
                  Voluntary Carbon Market Certification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Notice */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              Pembaruan Regulasi
            </h4>
            <p className="text-sm text-muted-foreground">
              Terdapat 1 perubahan regulasi terkait Article 6.4 Paris Agreement
              yang memerlukan review dokumen proyek. Silakan hubungi tim
              compliance untuk assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
