import React, { useState } from "react";
import { Shield, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { pricing } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";

export default function PricingSection() {
  const { lang, num, dir } = useI18n();
  const [activeTab, setActiveTab] = useState(0);

  const cat = pricing.categories[activeTab];

  return (
    <section id="pricing" className="py-24 bg-[#0C0A09] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">{pricing.eyebrow[lang]}</p>
          <h2 className="text-white font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.12 }}>
            {pricing.title1[lang]}<br />
            <span className="text-white/40">{pricing.title2[lang]}</span>
          </h2>
          <p className="text-white/40 text-sm mt-4 flex items-center gap-2 max-w-xl">
            <Info size={14} className="text-[#D97706] shrink-0" /> {pricing.note[lang]}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {pricing.categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-sm text-sm font-bold transition-colors border ${
                i === activeTab
                  ? "bg-[#D97706] border-[#D97706] text-white"
                  : "bg-transparent border-white/15 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {c.name[lang]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#1C1917] border border-white/10 rounded-sm overflow-hidden">
          <div className="grid grid-cols-3 bg-[#0C0A09] border-b border-white/10 px-5 py-3">
            <span className="text-white/40 text-xs font-bold tracking-wide">{pricing.headers.equipment[lang]}</span>
            <span className="text-white/40 text-xs font-bold tracking-wide text-center">{pricing.headers.daily[lang]}</span>
            <span className="text-white/40 text-xs font-bold tracking-wide text-center">{pricing.headers.monthly[lang]}</span>
          </div>
          {cat.items.map((item, i) => (
            <div key={i} className="grid grid-cols-3 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
              <div>
                <span className="text-white font-medium text-sm">{item.name[lang]}</span>
                {item.note && (
                  <span className="block text-[10px] text-[#D97706] mt-0.5">{item.note[lang]}</span>
                )}
              </div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-[#FCD34D] font-bold font-mono">{num(item.daily)}</span>
                <Riyal size={11} />
              </div>
              <div className="flex items-center justify-center gap-1">
                {item.monthly ? (
                  <>
                    <span className="text-white/70 font-mono text-sm">{num(item.monthly)}</span>
                    <Riyal size={11} />
                  </>
                ) : (
                  <span className="text-white/25 text-xs">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="flex items-center gap-3 mt-6 bg-[#D97706]/8 border border-[#D97706]/20 rounded-sm px-5 py-3">
          <Shield size={16} className="text-[#D97706] shrink-0" />
          <p className="text-white/50 text-xs">{pricing.foot[lang]}</p>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a href="#request" className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors">
            {lang === "ar" ? "اطلب المعدة الآن" : "Request a unit now"}
          </a>
        </div>
      </div>
    </section>
  );
}