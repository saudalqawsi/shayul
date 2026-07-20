import React from "react";
import { FileText, Shield, Banknote, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { trust } from "@/lib/content";

const icons = { FileText, Shield, Banknote, Zap };

export default function TrustLayer() {
  const { lang, dir } = useI18n();

  return (
    <section className="py-24 bg-[#0A1A30] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
            {trust.eyebrow[lang]}
          </p>
          <h2
            className="text-white font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
          >
            {trust.title1[lang]}
            <br />
            <span className="text-white/40">{trust.title2[lang]}</span>
          </h2>
        </div>

        {/* Pillars Grid — hover to reveal content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          {trust.pillars.map((p) => {
            const Icon = icons[p.icon];
            return (
              <div
                key={p.num}
                className="bg-white/4 border border-white/10 hover:border-[#009466]/40 rounded-sm p-6 group transition-all duration-300 hover:bg-white/7 min-h-[180px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${p.color}20` }}
                  >
                    <Icon size={24} style={{ color: p.color }} />
                  </div>
                  <span className="text-white/15 font-mono text-xs">{p.num}</span>
                </div>
                <h3 className="text-white font-bold text-base leading-snug">{p.title[lang]}</h3>
                <div className="max-h-0 opacity-0 group-hover:max-h-72 group-hover:opacity-100 group-hover:mt-4 overflow-hidden transition-all duration-300">
                  <p className="text-white/55 text-sm leading-relaxed">{p.desc[lang]}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div className="mt-12 border-r-2 border-[#009466] pr-6">
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
            {trust.quote[lang]}{" "}
            <span className="text-white font-semibold">{trust.quoteAccent[lang]}</span>
          </p>
        </div>
      </div>
    </section>
  );
}