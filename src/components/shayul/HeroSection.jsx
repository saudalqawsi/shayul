import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Shield } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { hero } from "@/lib/content";

export default function HeroSection() {
  const { lang, dir } = useI18n();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      dir={dir}
    >
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1917]/70 via-[#1C1917]/50 to-[#1C1917]" />
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
        <div className="inline-flex items-center gap-2 bg-[#D97706]/20 border border-[#D97706]/40 rounded-full px-4 py-1.5 mb-8">
          <Shield size={14} className="text-[#D97706]" />
          <span className="text-[#FCD34D] text-xs font-bold tracking-widest uppercase">
            {hero.badge[lang]}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-white font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)", lineHeight: 1.1, letterSpacing: "-0.01em" }}
        >
          {hero.title1[lang]}
          <br />
          <span className="text-[#D97706]">{hero.title2[lang]}</span>
        </h1>

        <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {hero.subtitle[lang]}
        </p>

        {/* Role-branched CTAs: Rent scrolls to the on-page request form,
            List your fleet sends new providers to registration (existing
            providers use the navbar role-dropdown login). */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <Link
            to="/#request"
            className="bg-[#D97706] hover:bg-[#B45309] text-white px-7 py-3.5 rounded-sm font-bold text-sm transition-colors w-full sm:w-auto"
          >
            {hero.ctaRent[lang]}
          </Link>
          <Link
            to="/register?from=/provider-dashboard"
            className="border border-white/30 hover:border-[#D97706] hover:bg-white/5 text-white px-7 py-3.5 rounded-sm font-bold text-sm transition-colors w-full sm:w-auto"
          >
            {hero.ctaOwner[lang]}
          </Link>
        </div>

        {/* Insurance pill — coming soon (placeholder per user) */}
        <div className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 border border-[#16A34A]/30 rounded-full bg-[#16A34A]/10">
          <Shield size={14} className="text-[#86efac]" />
          <span className="text-[#86efac] text-xs font-bold tracking-widest">
            {hero.insurancePill[lang]}
          </span>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/40 text-sm">
          {hero.trust.map((t) => (
            <span key={t.en} className="flex items-center gap-2">
              <span className="text-[#D97706]">✓</span> {t[lang]}
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