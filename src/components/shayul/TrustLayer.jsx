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

        {/* Market Problem Bar */}
        <div className="bg-white/5 border border-white/10 rounded-sm p-6 mb-16">
          <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-3">{trust.problemTitle[lang]}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trust.problemStats.map((s) => (
              <div key={s.num.en} className="border-r border-white/10 pr-6 last:border-0">
                <div className="text-3xl font-bold text-white/20 mb-1 font-mono">{s.num[lang]}</div>
                <div className="text-white/50 text-xs leading-relaxed">{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trust.pillars.map((p) => {
            const Icon = icons[p.icon];
            return (
              <div
                key={p.num}
                className="bg-white/4 border border-white/10 hover:border-[#009466]/40 rounded-sm p-6 group transition-all duration-300 hover:bg-white/7"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-11 h-11 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: `${p.color}20` }}
                  >
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <span className="text-white/15 font-mono text-xs">{p.num}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-3 leading-snug">{p.title[lang]}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{p.desc[lang]}</p>
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