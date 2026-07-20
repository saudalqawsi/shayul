import React from "react";
import { HardHat, CheckCircle2, ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { provider } from "@/lib/content";

export default function ProviderEnlist() {
  const { lang, dir } = useI18n();

  return (
    <section id="providers" className="py-24 bg-[#0A1A30] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: copy + requirements */}
        <div>
          <p className="text-[#0696B0] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
            <HardHat size={14} /> {provider.eyebrow[lang]}
          </p>
          <h2
            className="text-white font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
          >
            {provider.title1[lang]}
            <br />
            <span className="text-white/40">{provider.title2[lang]}</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed mb-10">{provider.intro[lang]}</p>

          {/* Requirements */}
          <div className="bg-white/4 border border-white/10 rounded-sm p-6">
            <h3 className="text-white font-bold text-sm mb-4 tracking-wide">{provider.reqTitle[lang]}</h3>
            <ul className="space-y-3">
              {provider.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#0696B0] flex-shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm leading-relaxed">{r[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: benefits + CTA */}
        <div className="lg:sticky lg:top-28">
          <h3 className="text-white font-bold text-base mb-4 tracking-wide">{provider.benefitsTitle[lang]}</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {provider.benefits.map((b, i) => (
              <div key={i} className="bg-white/4 border border-white/10 rounded-sm p-4 hover:border-[#009466]/40 transition-colors">
                <div className="text-[#009466] font-bold text-sm leading-snug">{b[lang]}</div>
              </div>
            ))}
          </div>
          <a
            href="#request"
            className="inline-flex items-center gap-2 bg-[#009466] hover:bg-[#007a54] text-white px-6 py-3 rounded-sm font-bold text-sm transition-colors"
          >
            {provider.cta[lang]}
            <ArrowLeft className={dir === "rtl" ? "rotate-180" : ""} size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}