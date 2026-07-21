import React, { useRef, useState } from "react";
import { Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { equipment, equipmentVault } from "@/lib/content";
import RentalCalculator from "@/components/shayul/RentalCalculator";

// Equipment grouped into carousels by family.
const GROUPS = [
  {
    key: "loaders",
    title: { ar: "الشيولات", en: "Loaders" },
    subtitle: { ar: "حسب المقاس والوزن", en: "By size and weight" },
    order: ["Loader Size 36", "Loader Size 50", "Loader Size 66", "Loader Size 80", "Loader 920"],
  },
  {
    key: "forklifts",
    title: { ar: "الفوركلفتات", en: "Forklifts" },
    subtitle: { ar: "بأشكال وأحجام متنوّعة", en: "In multiple forms and sizes" },
    order: ["JCB — Forklift", "Forklift", "Crusher Forklift", "Telehandler"],
  },
  {
    key: "other",
    title: { ar: "معدات إضافية", en: "Other Equipment" },
    subtitle: { ar: "للأعمال المتخصصة", en: "For specialized work" },
    order: ["Bobcat Trencher", "Bobcat Sweeper", "Bobcat Cutter", "JCB — Backhoe", "Motor Grader G14", "Bulldozer 800-D9"],
  },
];

const findEq = (nameEn) => equipment.find((e) => e.name.en === nameEn);

function EquipCard({ eq }) {
  const { lang, num, dir } = useI18n();
  const [hovered, setHovered] = useState(false);
  const weekly = Math.round(eq.daily * 6);

  return (
    <div
      className="relative w-full bg-[#0d2240] border border-white/10 rounded-sm overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      dir={dir}
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={eq.img}
          alt={eq.name[lang]}
          className={`w-full h-full transition-all duration-500 ${hovered ? "scale-110 saturate-125" : "scale-100 saturate-90"}`}
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2240] via-transparent to-transparent" />
        <div className="absolute top-3 end-3 bg-[#0A1A30]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/70 border border-white/10">
          {eq.tag[lang]}
        </div>
        <div className="absolute top-3 start-3 flex items-center gap-1.5 bg-[#0A1A30]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#009466]" />
          <span className="text-white/80 text-xs font-bold">{equipmentVault.ready[lang]}</span>
        </div>
      </div>

      {/* hover spec overlay */}
      <div
        className={`absolute bottom-0 start-0 end-0 bg-[#009466] transition-all duration-300 ${hovered ? "h-28" : "h-0"} overflow-hidden`}
      >
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {Object.entries(eq.specs).map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-white font-bold text-sm font-mono">{v[lang]}</div>
                <div className="text-white/70 text-xs">{equipmentVault.specLabels[k][lang]}</div>
              </div>
            ))}
          </div>
          <a href="#request" className="block w-full bg-white text-[#009466] text-center py-1.5 rounded-sm text-xs font-bold">
            {equipmentVault.addToRequest[lang]}
          </a>
        </div>
      </div>

      <div className={`p-5 transition-all duration-300 ${hovered ? "mb-28" : ""}`}>
        <div className="mb-1">
          <h3 className="text-white font-bold text-lg">{eq.name[lang]}</h3>
          <p className="text-white/40 text-xs font-mono tracking-widest">{eq.nameAlt[lang].toUpperCase()}</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <span className="text-[#009466] font-bold text-2xl font-mono">{num(eq.daily)}</span>
            <span className="text-white/40 text-sm ms-1">{equipmentVault.perDay[lang]}</span>
          </div>
          <div className="text-white/30 text-sm">
            <span className="font-mono">{num(weekly)}</span>
            <span className="ms-1 text-xs">{equipmentVault.weeklyShort[lang]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaCard() {
  const { lang } = useI18n();
  return (
    <div className="bg-[#009466]/10 border border-[#009466]/30 border-dashed rounded-sm flex flex-col items-center justify-center p-8 text-center h-full">
      <div className="w-14 h-14 bg-[#009466]/20 rounded-sm flex items-center justify-center mb-4">
        <Shield size={28} className="text-[#009466]" />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{equipmentVault.ctaTitle[lang]}</h3>
      <p className="text-white/40 text-sm mb-5 leading-relaxed">{equipmentVault.ctaDesc[lang]}</p>
      <a href="#request" className="bg-[#009466] hover:bg-[#007a54] text-white px-6 py-2.5 rounded-sm text-sm font-bold transition-colors">
        {equipmentVault.ctaBtn[lang]}
      </a>
    </div>
  );
}

function Carousel({ items, withCta }) {
  const trackRef = useRef(null);
  const scroll = (delta) => trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <div className="relative group/carousel">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
      >
        {items.map((eq) => (
          <div key={eq.name.en} className="w-[78vw] sm:w-[300px] shrink-0 snap-start">
            <EquipCard eq={eq} />
          </div>
        ))}
        {withCta && (
          <div className="w-[78vw] sm:w-[300px] shrink-0 snap-start">
            <CtaCard />
          </div>
        )}
      </div>

      {/* nav arrows (desktop) */}
      <button
        onClick={() => scroll(-340)}
        aria-label="Previous"
        className="hidden md:flex absolute -start-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-[#0d2240] border border-white/15 text-white/70 hover:text-white hover:border-white/40 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => scroll(340)}
        aria-label="Next"
        className="hidden md:flex absolute -end-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-[#0d2240] border border-white/15 text-white/70 hover:text-white hover:border-white/40 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default function EquipmentVault() {
  const { lang, dir } = useI18n();

  const labels = {
    count: (n) => ({ ar: `${n} معدة`, en: `${n} units` }),
  };

  return (
    <section id="equipment" className="py-24 bg-[#081626] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
            {equipmentVault.eyebrow[lang]}
          </p>
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}>
            {equipmentVault.title1[lang]}
            <br />
            <span className="text-white/40">{equipmentVault.title2[lang]}</span>
          </h2>
        </div>

        <div className="space-y-14">
          {GROUPS.map((g, i) => {
            const items = g.order.map(findEq).filter(Boolean);
            const isLast = i === GROUPS.length - 1;
            return (
              <div key={g.key}>
                <div className="flex items-end justify-between mb-6 pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-white font-bold text-2xl">{g.title[lang]}</h3>
                    <p className="text-white/40 text-sm mt-1">{g.subtitle[lang]}</p>
                  </div>
                  <span className="text-white/30 text-xs font-mono">{labels.count(items.length)[lang]}</span>
                </div>
                <Carousel items={items} withCta={isLast} />
              </div>
            );
          })}
        </div>

        <RentalCalculator />
      </div>
    </section>
  );
}