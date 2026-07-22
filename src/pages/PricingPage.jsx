import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Info, ArrowLeft } from "lucide-react";
import Navbar from "@/components/shayul/Navbar";
import FooterSection from "@/components/shayul/FooterSection";
import { useI18n } from "@/lib/i18n";
import { pricing } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";

export default function PricingPage() {
  const { lang, num, dir } = useI18n();
  const [activeTab, setActiveTab] = useState(0);

  const cat = pricing.categories[activeTab];

  return (
    <div className="min-h-screen bg-[#1C1917] text-white" dir={dir}>
      <Navbar scrolled />
      <div className="h-16" />

      {/* Hero */}
      <div className="bg-[#0C0A09] border-b border-white/10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">{pricing.eyebrow[lang]}</p>
          <h1 className="text-white font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            {pricing.title1[lang]}<br />
            <span className="text-white/40">{pricing.title2[lang]}</span>
          </h1>
          <div className="flex items-start gap-2 mt-5 max-w-xl">
            <Info size={14} className="text-[#D97706] mt-0.5 shrink-0" />
            <p className="text-white/40 text-sm leading-relaxed">{pricing.note[lang]}</p>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {pricing.categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-sm text-sm font-bold transition-colors border ${
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
        <div className="bg-[#0C0A09] border border-white/10 rounded-sm overflow-hidden mb-8">
          <div className="grid grid-cols-3 bg-[#1C1917] border-b border-white/10 px-6 py-4">
            <span className="text-white/40 text-xs font-bold tracking-wide uppercase">{pricing.headers.equipment[lang]}</span>
            <span className="text-white/40 text-xs font-bold tracking-wide uppercase text-center">{pricing.headers.daily[lang]}</span>
            <span className="text-white/40 text-xs font-bold tracking-wide uppercase text-center">{pricing.headers.monthly[lang]}</span>
          </div>
          {cat.items.map((item, i) => (
            <div key={i} className="grid grid-cols-3 px-6 py-5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors group">
              <div>
                <p className="text-white font-medium">{item.name[lang]}</p>
                {item.note && <p className="text-[10px] text-[#D97706] mt-0.5">{item.note[lang]}</p>}
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[#FCD34D] font-bold font-mono text-lg">{num(item.daily)}</span>
                <Riyal size={13} />
              </div>
              <div className="flex items-center justify-center gap-1.5">
                {item.monthly ? (
                  <>
                    <span className="text-white/70 font-mono">{num(item.monthly)}</span>
                    <Riyal size={12} />
                  </>
                ) : (
                  <span className="text-white/20 text-sm">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="flex items-start gap-3 bg-[#D97706]/8 border border-[#D97706]/20 rounded-sm px-5 py-4 mb-12">
          <Shield size={16} className="text-[#D97706] mt-0.5 shrink-0" />
          <p className="text-white/50 text-sm">{pricing.foot[lang]}</p>
        </div>

        {/* Inclusions callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: "🚧", title: { ar: "السائق مشمول", en: "Operator included" }, desc: { ar: "سائق مؤهّل ضمن السعر", en: "Qualified operator within the price" } },
            { icon: "⛽", title: { ar: "الديزل مشمول", en: "Diesel included" }, desc: { ar: "وقود كامل للوردية العادية", en: "Full fuel for a standard shift" } },
            { icon: "📋", title: { ar: "عقد موثّق", en: "Notarized contract" }, desc: { ar: "حقوقك مكتوبة قبل التشغيل", en: "Rights in writing before operation" } },
          ].map((item, i) => (
            <div key={i} className="bg-[#0C0A09] border border-white/10 rounded-sm p-5 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-bold mb-1 text-sm">{item.title[lang]}</h3>
              <p className="text-white/40 text-xs">{item.desc[lang]}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#D97706]/10 border border-[#D97706]/30 border-dashed rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 p-8">
          <div>
            <h3 className="text-white font-bold text-lg">
              {lang === "ar" ? "جاهز للحجز؟" : "Ready to book?"}
            </h3>
            <p className="text-white/40 text-sm mt-1">
              {lang === "ar" ? "أرسل طلبك وسنؤكّد السعر النهائي خلال ساعتين." : "Submit your request and we'll confirm the final price within 2 hours."}
            </p>
          </div>
          <Link to="/#request" className="bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors shrink-0 whitespace-nowrap">
            {lang === "ar" ? "اطلب المعدة" : "Request a unit"}
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}