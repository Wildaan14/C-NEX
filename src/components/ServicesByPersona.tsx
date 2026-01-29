import React from "react";
import { Trees, Tractor, Zap, Factory } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageProvider";

export function ServicesByPersona() {
  const { t } = useLanguage();

  const personas = [
    {
      icon: Trees,
      title: t.persona_forestry,
      color: "bg-primary/10 text-primary",
      services: [
        "Carbon Stock Assessment",
        "Forest Inventory",
        "REDD+ Projects",
        "Timber Certification",
      ],
    },
    {
      icon: Tractor,
      title: t.persona_agriculture,
      color: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600",
      services: [
        "Soil Carbon Credit",
        "Organic Farming",
        "Regenerative Agriculture",
        "Climate-Smart Farming",
      ],
    },
    {
      icon: Zap,
      title: t.persona_energy,
      color: "bg-primary/10 text-primary",
      services: [
        "Renewable Energy Credit",
        "Solar & Wind Projects",
        "Energy Efficiency",
        "Green Power Certificate",
      ],
    },
    {
      icon: Factory,
      title: t.persona_industry,
      color: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600",
      services: [
        "Carbon Footprint Report",
        "Emission Reduction Plan",
        "Carbon Neutral Program",
        "ESG Compliance",
      ],
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl mb-4">{t.persona_title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.persona_desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => {
            const Icon = persona.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${persona.color}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg">{persona.title}</h3>
                </div>

                <div className="space-y-3">
                  {persona.services.map((service, serviceIndex) => (
                    <div
                      key={serviceIndex}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <span className="text-sm">{service}</span>
                      <Badge variant="secondary" className="text-xs">
                        →
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
