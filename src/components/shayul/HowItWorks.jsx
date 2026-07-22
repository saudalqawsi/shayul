import React from "react";
import {
  ClipboardList,
  Search,
  Stamp,
  Truck,
  ChevronLeft,
  ShieldCheck,
  Clock,
  FileCheck,
  Check,
  ArrowLeft,
  Tag,
  BadgeCheck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { how, requestForm } from "@/lib/content";
import ContractPreview from "@/components/shayul/ContractPreview";

const StepIcons = [ClipboardList, Search, Stamp, Truck];
// Per-guarantee icons — one per card so the trust checklist reads at a glance.
const GuaranteeIcons = [Stamp, Truck, Tag, BadgeCheck];

export default function HowItWorks() {
  const { lang, dir } = useI18n();

  const RoadmapStep = ({ step, i }) => {
    const Icon = StepIcons[i] || ClipboardList;
    return (
      <div className="flex flex-col items-center text-center px-2">
        {/* node */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full bg-[#1C1917] border-2 flex items-center justify-center"
            style={{ borderColor: step.color }}
          >
            <Icon size={26} style={{ color: step.color }} />
          </div>
          <span
            className="absolute -top-1.5 -start-1.5 w-7 h-7 rounded-full text-[11px] font-mono font-bold flex items-center justify-center border border-white/15"
            style={{ backgroundColor: step.color, color: "#fff" }}
          >
            {step.num}
          </span>
        </div>
        <span
          className="mt-4 inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
          style={{ color: step.color, borderColor: `${step.color}40`, backgroundColor: `${step.color}10` }}
        >
          {step.party[lang]}
        </span>
        <h3 className="text-white font-bold text-base mt-2.5">{step.title[lang]}</h3>
        <p className="text-white/45 text-sm leading-relaxed mt-1.5 max-w-[15rem]">{step.desc[lang]}</p>
      </div>
    );
  };

  return (
    <section id="how" className="py-16 bg-[#1C1917] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">
            {how.eyebrow[lang]}
          </p>
          <h2
            className="text-white font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}
          >
            {how.title1[lang]}
            <br />
            <span className="text-white/40">{how.title2[lang]}</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-white/40 text-sm">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><span className="w-2 h-2 rounded-full bg-[#D97706]" /> {how.startTag[lang]}</span>
            <ArrowLeft size={14} className={`opacity-50 ${dir === "rtl" ? "" : "rotate-180"}`} />
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><ShieldCheck size={13} className="text-[#F59E0B]" /> {how.endTag[lang]}</span>
          </div>
        </div>

        {/* Horizontal roadmap — scrolls horizontally on small screens so
            the four steps stay in one continuous line rather than collapsing
            into a long vertical timeline that prolongs the page. */}
        {/* pt-4 gives the floating number bubble headroom above the circle so
            the overflow-x scroll container no longer clips its top corner. */}
        <div className="relative pt-4 pb-2 overflow-x-auto overscroll-x-contain">
          {/* dashed rail spanning node centers (visible at every breakpoint so
              the sequential order is obvious even while horizontally scrolling) */}
          <div className="absolute top-14 start-[12.5%] end-[12.5%] h-0 border-t-2 border-dashed border-[#D97706]/30" />
          {/* chevrons between steps — always visible. The chevron direction
              mirrors with the language so the flow arrow points the right way
              for both RTL (right→left) and LTR (left→right) reading orders. */}
          {[25, 50, 75].map((p) => (
            <div
              key={p}
              className="absolute top-14 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p}%` }}
            >
              <div className="bg-[#1C1917] rounded-full p-0.5">
                <ChevronLeft size={20} className={`text-[#D97706]/70 ${dir === "rtl" ? "" : "rotate-180"}`} />
              </div>
            </div>
          ))}

          <div className="grid grid-cols-4 gap-4 relative min-w-[640px]">
            {how.steps.map((step, i) => (
              <RoadmapStep key={step.num} step={step} i={i} />
            ))}
          </div>
        </div>

        {/* Guarantees — relocated beneath the roadmap so the trust checklist
            sits in one cluster with the booking flow. Reuses the same data
            the reserve-form used to show (requestForm.guarantees). */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {requestForm.guarantees.map((g, i) => {
              const GIcon = GuaranteeIcons[i] || Check;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 border border-white/10 rounded-sm p-3.5 bg-[#0C0A09]"
                >
                  <div className="w-8 h-8 rounded-sm bg-[#D97706]/15 border border-[#D97706]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <GIcon size={14} className="text-[#D97706]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold leading-tight">{g.title[lang]}</h4>
                    <p className="text-white/45 text-xs leading-relaxed mt-1">{g.desc[lang]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secured outcome */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-12 pt-10 border-t border-white/10">
          <div className="order-2 lg:order-1">
            <ContractPreview />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase mb-4">
              {lang === "ar" ? "نهاية آمنة" : "Secured outcome"}
            </p>
            <h3
              className="text-white font-bold leading-tight mb-5"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}
            >
              {lang === "ar" ? "كل خطوة محمية بعقد موثّق." : "Every step is backed by a notarized contract."}
            </h3>
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-md">
              {lang === "ar"
                ? "حين تتقدّم خطوة، يتحوّل اتفاقك إلى وثيقة إلكترونية ملزمة تحفظ حقك قبل تشغيل المعدة."
                : "As you progress, your agreement becomes a binding e-instrument that protects you before the unit ever runs."}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {how.stats.map((s) => (
                <div
                  key={s.val.en}
                  className="bg-[#0C0A09] border border-white/15 rounded-sm p-3 text-center"
                >
                  <div className="text-[#D97706] font-bold text-sm font-mono">{s.val[lang]}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.label[lang]}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="inline-flex items-center gap-1.5 text-white/55 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <FileCheck size={14} className="text-[#D97706]" /> {lang === "ar" ? "عقد إلكتروني موثّق" : "Notarized contract"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/55 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Clock size={14} className="text-[#FCD34D]" /> {lang === "ar" ? "تسليم اليوم أو التالي (حسب التوفّر)" : "Same / next-day delivery (based on availability)"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}