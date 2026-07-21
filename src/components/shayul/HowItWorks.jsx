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
  ArrowLeft,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { how } from "@/lib/content";
import ContractPreview from "@/components/shayul/ContractPreview";

const StepIcons = [ClipboardList, Search, Stamp, Truck];

export default function HowItWorks() {
  const { lang, dir } = useI18n();

  const RoadmapStep = ({ step, i }) => {
    const Icon = StepIcons[i] || ClipboardList;
    return (
      <div className="flex flex-col items-center text-center px-2">
        {/* node */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full bg-[#0A1A30] border-2 flex items-center justify-center"
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
    <section id="how" className="py-24 bg-[#0A1A30] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
            {how.eyebrow[lang]}
          </p>
          <h2
            className="text-white font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
          >
            {how.title1[lang]}
            <br />
            <span className="text-white/40">{how.title2[lang]}</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-white/40 text-sm">
            <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#009466]" /> {how.startTag[lang]}</span>
            <ArrowLeft size={14} className="opacity-50 rotate-180" />
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#D4A537]" /> {how.endTag[lang]}</span>
          </div>
        </div>

        {/* Horizontal roadmap — desktop */}
        <div className="hidden lg:block relative pb-2">
          {/* dashed rail spanning node centers */}
          <div className="absolute top-10 start-[12.5%] end-[12.5%] h-0 border-t-2 border-dashed border-[#009466]/30" />
          {/* chevrons between steps (RTL: next step is to the start side) */}
          {[25, 50, 75].map((p) => (
            <div
              key={p}
              className="absolute top-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p}%` }}
            >
              <div className="bg-[#0A1A30] rounded-full p-0.5">
                <ChevronLeft size={20} className="text-[#009466]/70" />
              </div>
            </div>
          ))}

          <div className="grid grid-cols-4 gap-4 relative">
            {how.steps.map((step, i) => (
              <RoadmapStep key={step.num} step={step} i={i} />
            ))}
          </div>
        </div>

        {/* Vertical roadmap — mobile */}
        <div className="lg:hidden relative">
          <div className="absolute start-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#009466] via-[#0696B0] to-[#009466]" />
          {how.steps.map((step, i) => {
            const Icon = StepIcons[i] || ClipboardList;
            return (
              <div key={step.num} className="relative ps-16 pb-6 last:pb-0">
                <div
                  className="absolute start-0 w-12 h-12 rounded-full bg-[#0A1A30] flex items-center justify-center z-10"
                  style={{ border: `2px solid ${step.color}` }}
                >
                  <Icon size={20} style={{ color: step.color }} />
                </div>
                <div className="bg-white/4 border border-white/10 rounded-sm p-4">
                  <span
                    className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border mb-2"
                    style={{ color: step.color, borderColor: `${step.color}40`, backgroundColor: `${step.color}10` }}
                  >
                    {step.party[lang]}
                  </span>
                  <h3 className="text-white font-bold text-base">{step.title[lang]}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mt-1">{step.desc[lang]}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secured outcome */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20 pt-16 border-t border-white/10">
          <div className="order-2 lg:order-1">
            <ContractPreview />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[#D4A537] text-xs font-bold tracking-widest uppercase mb-4">
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
                  className="bg-[#081626] border border-white/15 rounded-sm p-3 text-center"
                >
                  <div className="text-[#009466] font-bold text-sm font-mono">{s.val[lang]}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.label[lang]}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="inline-flex items-center gap-1.5 text-white/55 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <FileCheck size={14} className="text-[#009466]" /> {lang === "ar" ? "عقد إلكتروني موثّق" : "Notarized contract"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/55 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Clock size={14} className="text-[#0696B0]" /> {lang === "ar" ? "تسليم اليوم أو التالي" : "Same / next-day delivery"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}