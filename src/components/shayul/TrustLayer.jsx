import React, { useState } from "react";
import { FileText, Shield, ShieldCheck, BadgeCheck, MapPin, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { trust } from "@/lib/content";

const icons = { FileText, Shield, ShieldCheck, BadgeCheck, MapPin, Zap };

// A single pillar: collapsed by default (icon + title only), expands to reveal
// the detail text on hover (desktop) or click/tap (mobile). The header region
// is always vertically centered so it never shifts regardless of locale.
function Pillar({ pillar, dir, lang }) {
  const [open, setOpen] = useState(false);
  const Icon = icons[pillar.icon] || FileText;
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setOpen((o) => !o);
          e.preventDefault();
        }
      }}
      className="group bg-[#1C1917] border rounded-md p-6 pt-8 flex flex-col items-center cursor-pointer transition-all duration-400 shrink-0 w-[260px] lg:w-auto lg:flex-1"
      style={{ borderColor: open ? "rgba(217,119,6,0.5)" : "#292524" }}
    >
      <div className="w-14 h-14 rounded-md bg-[#292524] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
        <Icon size={26} style={{ color: pillar.color }} />
      </div>
      <h3 className="text-white font-bold text-base sm:text-lg text-center leading-tight" dir={dir}>
        {pillar.title[lang]}
      </h3>
      {pillar.soon && (
        <span className="mt-2 inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border border-[#16A34A]/40 text-[#86efac] bg-[#16A34A]/10">
          {lang === "ar" ? "قريباً" : "Soon"}
        </span>
      )}
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: open ? "12rem" : "0",
          opacity: open ? 1 : 0,
          marginTop: open ? "1rem" : 0,
        }}
      >
        <p className="text-[#A8A29E] text-sm leading-relaxed text-center" dir={dir}>
          {pillar.desc[lang]}
        </p>
      </div>
    </div>
  );
}

export default function TrustLayer() {
  const { lang, dir } = useI18n();

  return (
    <section className="py-16 bg-[#0C0A09] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 max-w-2xl" dir="ltr">
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">
            {trust.eyebrow[lang]}
          </p>
          <h2
            className="text-white font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}
          >
            {trust.title1[lang]}
            <br />
            <span className="text-white/40">{trust.title2[lang]}</span>
          </h2>
        </div>

        {/* Pillars — horizontal line at every breakpoint; on wide screens the
            four pillars share a row, on narrow ones you scan through a
            single track instead of stacking into a long column. */}
        <div dir="ltr" className="flex gap-4 overflow-x-auto overscroll-x-contain pb-2 lg:gap-5 lg:justify-between lg:overflow-visible">
          {trust.pillars.map((p) => (
            <Pillar key={p.num} pillar={p} dir={dir} lang={lang} />
          ))}
        </div>

      </div>
    </section>
  );
}