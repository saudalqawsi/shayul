import React from "react";
import { Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { equipment, equipmentVault } from "@/lib/content";
import Coverflow from "@/components/shayul/Coverflow";

// Equipment grouped into carousels by family.
const GROUPS = [
  {
    key: "bobcats",
    title: { ar: "بوبكات", en: "Bobcats" },
    subtitle: { ar: "تجهيزات متعددة الاستخدامات", en: "Multi-purpose attachments" },
    order: ["Bobcat Trencher", "Bobcat Sweeper", "Bobcat Cutter"],
  },
  {
    key: "loaders",
    title: { ar: "شياول", en: "Loaders" },
    subtitle: { ar: "حفر وتحريك التربة", en: "Digging & moving earth" },
    order: ["Loader Size 36", "Loader Size 50", "Loader Size 66", "Loader Size 80", "Loader 920"],
  },
  {
    key: "lifts",
    title: { ar: "منصات وأوناش", en: "Lifts & Platforms" },
    subtitle: { ar: "مان لفت وسيزر لفت", en: "Boom and scissor lifts" },
    order: ["Man Lift — Genie S-45 HF", "Scissor Lift — Genie GS-1932"],
  },
  {
    key: "other",
    title: { ar: "معدات أخرى", en: "Other Equipment" },
    subtitle: { ar: "حفّارات ومعدات متخصصة", en: "Excavators and specialized units" },
    order: ["Excavator", "Crusher Excavator", "JCB — Backhoe", "JCB — Forklift", "Telehandler", "Motor Grader G14", "Bulldozer 800-D9", "Vibratory Roller", "Walk-Behind Roller"],
  },
];

const findEq = (nameEn) => equipment.find((e) => e.name.en === nameEn);

const countLabel = (n) => ({ ar: `${n} معدة`, en: `${n} units` });

export default function EquipmentVault() {
  const { lang, dir } = useI18n();

  return (
    <section id="equipment" className="py-24 bg-[#0C0A09] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">
            {equipmentVault.eyebrow[lang]}
          </p>
          <h2 className="text-white font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.12 }}>
            {equipmentVault.title1[lang]}
            <br />
            <span className="text-white/40">{equipmentVault.title2[lang]}</span>
          </h2>
        </div>

        <div className="space-y-16">
          {GROUPS.map((g) => {
            const items = g.order.map(findEq).filter(Boolean);
            return (
              <div key={g.key}>
                <div className="flex items-end justify-between mb-6 pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-white font-bold text-2xl">{g.title[lang]}</h3>
                    <p className="text-white/40 text-sm mt-1">{g.subtitle[lang]}</p>
                  </div>
                  <span className="text-white/30 text-xs font-mono">{countLabel(items.length)[lang]}</span>
                </div>
                <Coverflow items={items} />
              </div>
            );
          })}
        </div>

        {/* sourcing CTA */}
        <div className="mt-16 bg-[#D97706]/10 border border-[#D97706]/30 border-dashed rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 p-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#D97706]/20 rounded-sm flex items-center justify-center shrink-0">
              <Shield size={28} className="text-[#D97706]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{equipmentVault.ctaTitle[lang]}</h3>
              <p className="text-white/40 text-sm mt-1">{equipmentVault.ctaDesc[lang]}</p>
            </div>
          </div>
          <a href="#request" className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-2.5 rounded-sm text-sm font-bold transition-colors shrink-0">
            {equipmentVault.ctaBtn[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}