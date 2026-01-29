import React from "react";
import {
  Star,
  Award,
  TrendingUp,
  Leaf,
  Users,
  Building,
  CheckCircle,
  Target,
} from "lucide-react";
import { motion } from "motion/react";

interface ESGMetric {
  category: "E" | "S" | "G";
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  icon: any;
  color: string;
}

interface ProjectESG {
  id: string;
  name: string;
  overallScore: number;
  rating: "AAA" | "AA" | "A" | "BBB" | "BB" | "B";
  environmental: number;
  social: number;
  governance: number;
  certification: string[];
}

const esgMetrics: ESGMetric[] = [
  // Environmental
  {
    category: "E",
    name: "Carbon Sequestration",
    score: 92,
    maxScore: 100,
    weight: 0.15,
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
  },
  {
    category: "E",
    name: "Biodiversity Protection",
    score: 88,
    maxScore: 100,
    weight: 0.12,
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
  },
  {
    category: "E",
    name: "Deforestation Risk",
    score: 95,
    maxScore: 100,
    weight: 0.13,
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
  },
  // Social
  {
    category: "S",
    name: "Community Benefit-Sharing",
    score: 85,
    maxScore: 100,
    weight: 0.15,
    icon: Users,
    color: "from-blue-500 to-cyan-600",
  },
  {
    category: "S",
    name: "Indigenous Rights (FPIC)",
    score: 90,
    maxScore: 100,
    weight: 0.12,
    icon: Users,
    color: "from-blue-500 to-cyan-600",
  },
  {
    category: "S",
    name: "Local Employment",
    score: 78,
    maxScore: 100,
    weight: 0.08,
    icon: Users,
    color: "from-blue-500 to-cyan-600",
  },
  // Governance
  {
    category: "G",
    name: "Transparency & Reporting",
    score: 94,
    maxScore: 100,
    weight: 0.12,
    icon: Building,
    color: "from-purple-500 to-pink-600",
  },
  {
    category: "G",
    name: "Regulatory Compliance",
    score: 100,
    maxScore: 100,
    weight: 0.08,
    icon: Building,
    color: "from-purple-500 to-pink-600",
  },
  {
    category: "G",
    name: "Stakeholder Engagement",
    score: 82,
    maxScore: 100,
    weight: 0.05,
    icon: Building,
    color: "from-purple-500 to-pink-600",
  },
];

const projectScores: ProjectESG[] = [
  {
    id: "PRJ-001",
    name: "Kalimantan Tropical Forest REDD+",
    overallScore: 89,
    rating: "AAA",
    environmental: 92,
    social: 85,
    governance: 91,
    certification: ["VCS", "CCB Gold", "SD Vista"],
  },
  {
    id: "PRJ-002",
    name: "Sumatra Mangrove Restoration",
    overallScore: 86,
    rating: "AA",
    environmental: 88,
    social: 90,
    governance: 80,
    certification: ["Gold Standard", "Blue Carbon"],
  },
  {
    id: "PRJ-003",
    name: "Papua Reforestation Initiative",
    overallScore: 91,
    rating: "AAA",
    environmental: 95,
    social: 88,
    governance: 90,
    certification: ["VCS", "CCB Triple Gold"],
  },
  {
    id: "PRJ-004",
    name: "Jawa Barat Agroforestry",
    overallScore: 78,
    rating: "A",
    environmental: 75,
    social: 82,
    governance: 77,
    certification: ["ISO 14064"],
  },
];

export function ESGScoring() {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "AAA":
        return "from-green-500 to-emerald-600";
      case "AA":
        return "from-blue-500 to-cyan-600";
      case "A":
        return "from-yellow-500 to-orange-500";
      case "BBB":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  const getCategoryScore = (category: "E" | "S" | "G") => {
    const metrics = esgMetrics.filter((m) => m.category === category);
    const totalWeight = metrics.reduce((acc, m) => acc + m.weight, 0);
    const weightedScore = metrics.reduce(
      (acc, m) => acc + m.score * m.weight,
      0,
    );
    return Math.round(weightedScore / totalWeight);
  };

  const overallESGScore = Math.round(
    esgMetrics.reduce((acc, m) => acc + m.score * m.weight, 0),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              ESG Performance Scoring
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Environmental, Social & Governance
          </h2>
          <p className="text-muted-foreground">
            Penilaian kredibilitas proyek karbon berdasarkan standar ESG
            internasional
          </p>
        </div>
      </div>

      {/* Overall ESG Score */}
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Score Circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(var(--border-rgb, 128, 128, 128), 0.3)"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#esgGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 40 * (1 - overallESGScore / 100),
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient
                    id="esgGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-5xl font-bold text-foreground"
                >
                  {overallESGScore}
                </motion.p>
                <p className="text-sm text-muted-foreground mt-1">
                  Overall Score
                </p>
                <div className="mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold">
                  AAA Rating
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4 max-w-xs">
              Skor ESG dihitung berdasarkan 9 metrik terverifikasi sesuai
              standar GRI dan SASB
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Environmental */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Environmental
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Climate Impact & Conservation
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-green-500">
                    {getCategoryScore("E")}
                  </p>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryScore("E")}%` }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  />
                </div>
              </div>

              {/* Social */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Social</p>
                      <p className="text-xs text-muted-foreground">
                        Community & Human Rights
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-500">
                    {getCategoryScore("S")}
                  </p>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryScore("S")}%` }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600"
                  />
                </div>
              </div>

              {/* Governance */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Building className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Governance
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Compliance & Transparency
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-purple-500">
                    {getCategoryScore("G")}
                  </p>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryScore("G")}%` }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                  />
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <div className="text-center p-3 bg-green-500/5 rounded-lg">
                <p className="text-2xl font-bold text-green-500">95%</p>
                <p className="text-xs text-muted-foreground">
                  Deforestation Prevention
                </p>
              </div>
              <div className="text-center p-3 bg-blue-500/5 rounded-lg">
                <p className="text-2xl font-bold text-blue-500">2,847</p>
                <p className="text-xs text-muted-foreground">Beneficiaries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Detailed ESG Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["E", "S", "G"].map((category) => (
            <div key={category} className="space-y-3">
              <h4 className="font-medium text-foreground text-sm">
                {category === "E"
                  ? "Environmental"
                  : category === "S"
                    ? "Social"
                    : "Governance"}
              </h4>
              {esgMetrics
                .filter((m) => m.category === category)
                .map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <div key={idx} className="p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <p className="text-xs text-foreground">
                            {metric.name}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {metric.score}
                        </p>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(metric.score / metric.maxScore) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`h-full bg-gradient-to-r ${metric.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {/* Project Rankings */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Project ESG Rankings
            </h3>
          </div>
        </div>
        <div className="divide-y divide-border">
          {projectScores.map((project, idx) => (
            <motion.div
              key={project.id}
              whileHover={{ backgroundColor: "rgba(var(--primary-rgb), 0.02)" }}
              className="p-6 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-muted-foreground">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {project.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {project.certification.map((cert, cidx) => (
                          <span
                            key={cidx}
                            className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary border border-primary/20"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getRatingColor(project.rating)} text-white mb-2`}
                  >
                    <Award className="w-4 h-4" />
                    <span className="font-bold">{project.rating}</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">
                    {project.overallScore}
                  </p>
                  <p className="text-xs text-muted-foreground">Overall Score</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-green-500/5 rounded">
                  <p className="text-lg font-bold text-green-500">
                    {project.environmental}
                  </p>
                  <p className="text-xs text-muted-foreground">E</p>
                </div>
                <div className="text-center p-2 bg-blue-500/5 rounded">
                  <p className="text-lg font-bold text-blue-500">
                    {project.social}
                  </p>
                  <p className="text-xs text-muted-foreground">S</p>
                </div>
                <div className="text-center p-2 bg-purple-500/5 rounded">
                  <p className="text-lg font-bold text-purple-500">
                    {project.governance}
                  </p>
                  <p className="text-xs text-muted-foreground">G</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ESG Standards Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              Global ESG Standards
            </h4>
            <p className="text-sm text-muted-foreground">
              Penilaian ESG C-NEX mengacu pada GRI (Global Reporting
              Initiative), SASB (Sustainability Accounting Standards Board), dan
              TCFD (Task Force on Climate-related Financial Disclosures) untuk
              memastikan kredibilitas di pasar internasional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
