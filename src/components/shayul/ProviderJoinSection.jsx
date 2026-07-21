import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Sparkles, ClipboardList } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { provider } from "@/lib/content";

// Register-and-enlist overview shown above the providers directory. Reuses
// the central `provider` content (intro, requirements, benefits, CTA) so
// marketers continue editing copy in one place.
export default function ProviderJoinSection() {
  const { lang, dir } = useI18n();

  return (
    <section id="join" className="mb-12" dir={dir}>
      {/* Header */}
      <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-3">
        {provider.eyebrow[lang]}
      </p>
      <h2 className="text-3xl font-bold mb-3 leading-tight">
        {provider.title1[lang]}{" "}
        <span className="text-[#D97706]">{provider.title2[lang]}</span>
      </h2>
      <p className="text-white/55 text-sm leading-relaxed max-w-2xl mb-8">
        {provider.intro[lang]}
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {/* Registration requirements */}
        <div className="bg-[#1C1917] border border-white/10 rounded-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList size={18} className="text-[#FCD34D]" />
            <h3 className="font-bold text-white">{provider.reqTitle[lang]}</h3>
          </div>
          <ul className="space-y-3">
            {provider.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed">
                <span className="text-[#D97706] mt-1 shrink-0 text-xs">●</span>
                <span>{r[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Enlistment benefits */}
        <div className="bg-[#1C1917] border border-white/10 rounded-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#FCD34D]" />
            <h3 className="font-bold text-white">{provider.benefitsTitle[lang]}</h3>
          </div>
          <ul className="space-y-3">
            {provider.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed">
                <CheckCircle2 size={16} className="text-[#16A34A] mt-0.5 shrink-0" />
                <span>{b[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to="/provider"
        className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-sm text-sm font-bold transition-colors"
      >
        {provider.cta[lang]}
      </Link>
    </section>
  );
}