import React from "react";
import { ClipboardList, Search, Stamp, Truck, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { how } from "@/lib/content";
import ContractPreview from "@/components/shayul/ContractPreview";

const StepIcons = [ClipboardList, Search, Stamp, Truck];

export default function HowItWorks() {
  const { lang, dir } = useI18n();

  return (
    <section id="how" className="py-24 bg-[#0A1A30] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Booking roadmap */}
          <div>
            <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
              {how.eyebrow[lang]}
            </p>
            <h2
              className="text-white font-bold leading-tight mb-12"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
            >
              {how.title1[lang]}
              <br />
              <span className="text-white/40">{how.title2[lang]}</span>
            </h2>

            <div className="relative">
              {/* roadmap rail */}
              <div className="absolute start-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#009466] via-[#0696B0] to-[#009466]" />

              {/* start cap */}
              <div className="relative ps-16 pb-6">
                <div className="absolute start-3.5 top-0 -ms-[1px] w-3 h-3 rounded-full bg-[#009466] ring-4 ring-[#009466]/15" />
                <span className="text-[#009466] text-[10px] font-bold tracking-widest uppercase">{how.startTag[lang]}</span>
              </div>

              {/* milestones */}
              <div className="space-y-6">
                {how.steps.map((step, i) => {
                  const Icon = StepIcons[i] || ClipboardList;
                  return (
                    <div key={step.num} className="relative ps-16 last:pb-0">
                      {/* milestone node */}
                      <div
                        className="absolute start-0 -ms-0 w-12 h-12 rounded-full flex items-center justify-center z-10 bg-[#0A1A30]"
                        style={{ border: `2px solid ${step.color}` }}
                      >
                        <Icon size={18} style={{ color: step.color }} />
                        <span
                          className="absolute -bottom-2 -start-2 w-6 h-6 rounded-full bg-[#0A1A30] border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold text-white"
                        >
                          {step.num}
                        </span>
                      </div>

                      {/* milestone card */}
                      <div className="bg-white/4 border border-white/10 rounded-sm p-4 hover:border-[#009466]/40 hover:bg-white/[0.07] transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <h3 className="text-white font-bold text-base leading-snug">{step.title[lang]}</h3>
                          <span className="text-[#009466]/70 text-xs font-mono">0{i + 1}</span>
                        </div>
                        <span className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase mb-2 px-2 py-0.5 rounded-full border border-white/10 text-white/55">
                          {step.party[lang]}
                        </span>
                        <p className="text-white/45 text-sm leading-relaxed">{step.desc[lang]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* end cap */}
              <div className="relative ps-16 pt-6">
                <div className="absolute start-3.5 top-2 -ms-[1px] w-3 h-3 rounded-full bg-[#D4A537] ring-4 ring-[#D4A537]/15" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#D4A537]" />
                  <span className="text-[#D4A537] text-[10px] font-bold tracking-widest uppercase">{how.endTag[lang]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Notarized contract artifact */}
          <div className="relative flex flex-col gap-6 lg:sticky lg:top-28">
            <ContractPreview />
            <div className="grid grid-cols-3 gap-3">
              {how.stats.map((s) => (
                <div
                  key={s.val.en}
                  className="bg-[#0A1A30]/80 backdrop-blur-sm border border-white/15 rounded-sm p-3 text-center"
                >
                  <div className="text-[#009466] font-bold text-sm font-mono">{s.val[lang]}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.label[lang]}</div>
                </div>
              ))}
            </div>

            {/* Blueprint decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#009466]/20 rounded-sm pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-[#0696B0]/20 rounded-sm pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}