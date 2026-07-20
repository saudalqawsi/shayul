import React, { useState } from "react";
import { Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { pricing } from "@/lib/content";

export default function PricingSection() {
  const { lang, num, dir } = useI18n();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="pricing" className="py-24 bg-[#081626] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
              {pricing.eyebrow[lang]}
            </p>
            <h2
              className="text-white font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
            >
              {pricing.title1[lang]}
              <br />
              <span className="text-white/40">{pricing.title2[lang]}</span>
            </h2>
          </div>
          <div className="bg-[#009466]/10 border border-[#009466]/30 rounded-sm px-4 py-3 flex items-center gap-2 max-w-xs">
            <Shield size={16} className="text-[#009466] flex-shrink-0" />
            <p className="text-white/60 text-xs leading-relaxed">{pricing.note[lang]}</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {pricing.categories.map((cat, i) => (
            <button
              key={cat.name.en}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-sm text-sm font-bold transition-colors border ${
                activeTab === i
                  ? "bg-[#009466] border-[#009466] text-white"
                  : "bg-transparent border-white/15 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {cat.name[lang]}
            </button>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="border border-white/10 rounded-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 bg-white/5 px-6 py-3 border-b border-white/10">
            <div className="col-span-6 text-white/40 text-xs font-bold tracking-widest uppercase">{pricing.headers.equipment[lang]}</div>
            <div className="col-span-3 text-white/40 text-xs font-bold tracking-widest uppercase text-center">{pricing.headers.daily[lang]}</div>
            <div className="col-span-3 text-white/40 text-xs font-bold tracking-widest uppercase text-center">{pricing.headers.monthly[lang]}</div>
          </div>

          {pricing.categories[activeTab].items.map((item, i) => (
            <div
              key={item.name.en}
              className={`grid grid-cols-12 px-6 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors ${
                i % 2 === 0 ? "" : "bg-white/2"
              }`}
            >
              <div className="col-span-6">
                <div className="text-white font-medium text-sm">{item.name[lang]}</div>
                {item.note && <div className="text-white/35 text-xs mt-0.5">{item.note[lang]}</div>}
              </div>
              <div className="col-span-3 text-center">
                <span className="text-[#009466] font-bold font-mono text-base">{num(item.daily)}</span>
              </div>
              <div className="col-span-3 text-center">
                {item.monthly ? (
                  <span className="text-white/60 font-mono text-sm">{num(item.monthly)}</span>
                ) : (
                  <span className="text-white/20 text-sm">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/25 text-xs mt-4 text-center">{pricing.foot[lang]}</p>
      </div>
    </section>
  );
}