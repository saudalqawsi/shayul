import React, { useState } from "react";
import { ChevronDown, Shield } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { hero } from "@/lib/content";

export default function HeroSection() {
  const { lang, dir } = useI18n();
  const [equipType, setEquipType] = useState("");
  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState("");

  const labelClass = "text-white/40 text-xs font-bold tracking-widest uppercase";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" dir={dir}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://media.base44.com/images/public/6a5e151f76837cda81644b8e/06c6040fd_generated_24e709ae.png"
          alt="Shayul heavy equipment on site"
          className="w-full h-full object-cover"
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.4}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A30]/70 via-[#0A1A30]/50 to-[#0A1A30]" />
      </div>

      {/* Blueprint grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28 pb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#009466]/20 border border-[#009466]/40 rounded-full px-4 py-1.5 mb-8">
          <Shield size={14} className="text-[#009466]" />
          <span className="text-[#009466] text-xs font-bold tracking-widest uppercase">{hero.badge[lang]}</span>
        </div>

        {/* Headline */}
        <h1
          className="text-white font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
        >
          {hero.title1[lang]}
          <br />
          <span className="text-[#009466]">{hero.title2[lang]}</span>
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          {hero.subtitle[lang]}
        </p>

        {/* Command Bar */}
        <div className="bg-[#0A1A30]/80 backdrop-blur-xl border border-white/15 rounded-sm p-4 md:p-6 max-w-4xl mx-auto shadow-2xl text-right">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Equipment Type */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>{hero.fields.type[lang]}</label>
              <select
                value={equipType}
                onChange={(e) => setEquipType(e.target.value)}
                className="border border-white/15 text-white rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#009466] transition-colors appearance-none cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <option value="" className="bg-[#0A1A30]">{hero.fields.typePlaceholder[lang]}</option>
                {hero.equipmentTypes[lang].map((e) => (
                  <option key={e} value={e} className="bg-[#0A1A30]">{e}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>{hero.fields.location[lang]}</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={hero.fields.locationPlaceholder[lang]}
                className="bg-white/5 border border-white/15 text-white placeholder-white/30 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#009466] transition-colors"
              />
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>{hero.fields.duration[lang]}</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="border border-white/15 text-white rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#009466] transition-colors appearance-none cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <option value="" className="bg-[#0A1A30]">{hero.fields.durationPlaceholder[lang]}</option>
                {hero.durations.map((d) => (
                  <option key={d.value} value={d.value} className="bg-[#0A1A30]">{d[lang]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <a
              href="#request"
              className="block w-full bg-[#009466] hover:bg-[#007a54] text-white py-4 text-center font-bold text-base rounded-sm transition-colors duration-200 tracking-wide"
            >
              {hero.cta[lang]}
            </a>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/40 text-sm">
          {hero.trust.map((t) => (
            <span key={t.en} className="flex items-center gap-2">
              <span className="text-[#009466]">✓</span> {t[lang]}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-8 animate-bounce">
        <ChevronDown className="text-white/30" size={28} />
      </div>
    </section>
  );
}