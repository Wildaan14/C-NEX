import React from "react";
import { Leaf } from "lucide-react";

export function CIMAPLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-emerald-600 opacity-20 blur-xl rounded-full" />
        <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-primary via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          C-NEX
        </span>
        <span className="text-[0.6rem] text-muted-foreground -mt-1 tracking-wide">
          Carbon Network & Intelligence Exchange
        </span>
      </div>
    </div>
  );
}

export function CIMAPHero() {
  return (
    <div className="text-center space-y-6 mb-16">
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-emerald-500/10 to-emerald-600/10 backdrop-blur-lg border border-primary/30 mb-6 shadow-lg">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
        <span className="text-sm font-semibold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
          Indonesia Carbon Intelligence Network
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
        <span className="bg-gradient-to-r from-primary via-emerald-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl">
          C-NEX
        </span>
      </h1>

      <div className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto space-y-3">
        <p className="font-bold text-foreground text-2xl mb-3">
          Carbon Network & Intelligence Exchange
        </p>
        <p className="text-base leading-relaxed">
          Platform digital terintegrasi untuk mengelola kekayaan karbon
          Indonesia—dari hutan tropis hingga ekosistem pesisir—menjadi kekuatan
          ekonomi hijau yang terukur, transparan, dan berkeadilan.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm pt-6">
        <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-600/20 border border-primary/30 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <span className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
          <span className="text-foreground font-semibold">MRV Verified</span>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
          <span className="text-foreground font-semibold">Blockchain</span>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 border border-primary/30 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <span className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
          <span className="text-foreground font-semibold">
            SRN-PPI Integration
          </span>
        </div>
      </div>
    </div>
  );
}
