// pages/ESGScoringPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Leaf, Users, Building2, Award, ArrowUp, ArrowDown } from "lucide-react";

export const ESGScoringPage: React.FC = () => {
  const scores = {
    overall: 87,
    environmental: 92,
    social: 78,
    governance: 85,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">ESG Scoring</h1>
        <p className="text-muted-foreground">
          Environmental, Social, and Governance performance metrics
        </p>
      </div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 mb-2">Skor ESG Keseluruhan</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold">{scores.overall}</span>
              <span className="text-2xl">/100</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <ArrowUp className="w-4 h-4" />
              <span>+5 dari bulan lalu</span>
            </div>
          </div>
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
            <Award className="w-16 h-16" />
          </div>
        </div>
      </motion.div>

      {/* Individual Scores */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Environmental", score: scores.environmental, icon: <Leaf className="w-6 h-6" />, color: "emerald" },
          { label: "Social", score: scores.social, icon: <Users className="w-6 h-6" />, color: "blue" },
          { label: "Governance", score: scores.governance, icon: <Building2 className="w-6 h-6" />, color: "purple" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className={`p-3 rounded-xl w-fit mb-4 ${
              item.color === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
              item.color === "blue" ? "bg-blue-500/10 text-blue-500" :
              "bg-purple-500/10 text-purple-500"
            }`}>
              {item.icon}
            </div>
            <p className="text-muted-foreground mb-2">{item.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{item.score}</span>
              <span className="text-muted-foreground">/100</span>
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  item.color === "emerald" ? "bg-emerald-500" :
                  item.color === "blue" ? "bg-blue-500" :
                  "bg-purple-500"
                }`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ESGScoringPage;
