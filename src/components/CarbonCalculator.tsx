import React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  Leaf,
  ArrowRight,
  DollarSign,
  Trees,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageProvider";

export function CarbonCalculator() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"stock" | "credit">("stock");

  // Carbon Stock Calculator State - Updated to land cover based
  const [landArea, setLandArea] = useState(100);
  const [landCoverType, setLandCoverType] = useState("primary-forest");

  // Carbon Credit Calculator State
  const [annualEmission, setAnnualEmission] = useState(1000);
  const [offsetTarget, setOffsetTarget] = useState(80);
  const [projectType, setProjectType] = useState("reforestation");

  // Carbon Stock Calculations - Based on land cover type
  // Carbon stock values in ton C/ha (based on Indonesian forest data)
  const carbonStockPerHectare = {
    "primary-forest": 250, // Hutan Primer: 200-300 tC/ha
    "secondary-forest": 125, // Hutan Sekunder: 100-150 tC/ha
    mangrove: 200, // Mangrove: 150-250 tC/ha
  };

  const stockPerHa =
    carbonStockPerHectare[landCoverType as keyof typeof carbonStockPerHectare];
  const totalCarbonStock = (landArea * stockPerHa).toFixed(2);
  const co2Equivalent = (parseFloat(totalCarbonStock) * 3.67).toFixed(2);

  // Carbon Credit Calculations
  const emissionToOffset = (annualEmission * (offsetTarget / 100)).toFixed(2);
  const creditsNeeded = (parseFloat(emissionToOffset) / 1).toFixed(2);
  const costPerCredit =
    projectType === "reforestation"
      ? 15
      : projectType === "renewable"
        ? 20
        : 25;
  const totalCost = (parseFloat(creditsNeeded) * costPerCredit).toFixed(2);
  const areaNeeded = (parseFloat(emissionToOffset) / 3.67 / stockPerHa).toFixed(
    2,
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-lg rounded-full px-4 py-2 mb-6 border border-border/30 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {t.calculator_badge}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-bold text-foreground">
            {t.calculator_title}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.calculator_desc}
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button
            onClick={() => setActiveTab("stock")}
            variant={activeTab === "stock" ? "default" : "outline"}
            className={`px-6 py-3 rounded-xl ${activeTab === "stock" ? "bg-primary text-primary-foreground" : "bg-card"}`}
          >
            <Trees className="w-5 h-5 mr-2" />
            {t.carbon_stock}
          </Button>
          <Button
            onClick={() => setActiveTab("credit")}
            variant={activeTab === "credit" ? "default" : "outline"}
            className={`px-6 py-3 rounded-xl ${activeTab === "credit" ? "bg-primary text-primary-foreground" : "bg-card"}`}
          >
            <DollarSign className="w-5 h-5 mr-2" />
            {t.carbon_credit}
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border border-border/50 shadow-xl">
              {activeTab === "stock" ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">
                        {t.land_area}
                      </label>
                      <span className="text-sm text-primary font-semibold">
                        {landArea} ha
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      value={landArea}
                      onChange={(e) => setLandArea(Number(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t.land_cover_type}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["primary-forest", "secondary-forest", "mangrove"].map(
                        (type) => (
                          <motion.button
                            key={type}
                            onClick={() => setLandCoverType(type)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              landCoverType === type
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-card text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            {type === "primary-forest"
                              ? t.land_cover_primary_forest
                              : type === "secondary-forest"
                                ? t.land_cover_secondary_forest
                                : t.land_cover_mangrove}
                          </motion.button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">
                        {t.annual_emission}
                      </label>
                      <span className="text-sm text-primary font-semibold">
                        {annualEmission.toLocaleString()} tCO₂
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={annualEmission}
                      onChange={(e) =>
                        setAnnualEmission(Number(e.target.value))
                      }
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">
                        {t.offset_target}
                      </label>
                      <span className="text-sm text-primary font-semibold">
                        {offsetTarget}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={offsetTarget}
                      onChange={(e) => setOffsetTarget(Number(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t.project_type}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["reforestation", "renewable", "efficiency"].map(
                        (type) => (
                          <motion.button
                            key={type}
                            onClick={() => setProjectType(type)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-lg border-2 transition-all text-sm ${
                              projectType === type
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-card text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            {type === "reforestation"
                              ? t.project_reforestation
                              : type === "renewable"
                                ? t.project_renewable
                                : t.project_efficiency}
                          </motion.button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {activeTab === "stock" ? (
              <>
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.total_carbon_stock}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {totalCarbonStock} <span className="text-lg">tC</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      {t.equivalent_to} {co2Equivalent} tCO₂
                    </span>
                  </div>
                </Card>

                <Card className="p-6 bg-card/80 backdrop-blur-lg border border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">
                    {t.carbon_per_hectare}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stockPerHa}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">tC/ha</p>
                </Card>

                <Card className="p-6 bg-card/80 backdrop-blur-lg border border-border/50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {t.environmental_impact}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.impact_description}
                      </p>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {t.positive}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>
                        {t.impact_1}:{" "}
                        {(parseFloat(co2Equivalent) * 0.22).toFixed(0)}{" "}
                        {t.cars_year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>
                        {t.impact_2}:{" "}
                        {(parseFloat(co2Equivalent) * 48).toFixed(0)}{" "}
                        {t.oxygen_year}
                      </span>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <>
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.credits_needed}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {creditsNeeded}{" "}
                        <span className="text-lg">{t.credits}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <TrendingDown className="w-4 h-4" />
                    <span>
                      {t.offset_amount}: {emissionToOffset} tCO₂
                    </span>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6 bg-card/80 backdrop-blur-lg border border-border/50">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.total_cost}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      ${totalCost}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      USD/year
                    </p>
                  </Card>

                  <Card className="p-6 bg-card/80 backdrop-blur-lg border border-border/50">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.cost_per_credit}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      ${costPerCredit}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      USD/credit
                    </p>
                  </Card>
                </div>

                <Card className="p-6 bg-card/80 backdrop-blur-lg border border-border/50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {t.alternative_solution}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.alternative_description}
                      </p>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {t.recommended}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Trees className="w-4 h-4 text-primary" />
                      <span>
                        {t.plant_trees}:{" "}
                        {parseFloat(areaNeeded).toLocaleString()} {t.hectares}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span>
                        {t.est_cost}: $
                        {(parseFloat(areaNeeded) * 5).toLocaleString()}{" "}
                        {t.one_time}
                      </span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-xl shadow-lg group">
                <span>
                  {activeTab === "stock" ? t.start_project : t.purchase_credits}
                </span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
