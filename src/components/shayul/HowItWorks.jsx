import React from "react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { how } from "@/lib/content";

export default function HowItWorks() {
  const { lang, dir } = useI18n();

  return (
    <section id="how" className="py-24 bg-[#0A1A30] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Steps */}
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
              {/* Vertical line */}
              <div className="absolute right-5 top-5 bottom-5 w-px bg-gradient-to-b from-[#009466]/60 via-[#0696B0]/40 to-[#009466]/20" />

              <div className="space-y-8">
                {how.steps.map((step) => (
                  <div key={step.num} className="flex gap-6 relative">
                    {/* Step Number */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center text-xs font-bold font-mono z-10"
                      style={{ backgroundColor: `${step.color}25`, border: `1px solid ${step.color}50`, color: step.color }}
                    >
                      {step.num}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-white font-bold text-base">{step.title[lang]}</h3>
                      </div>
                      <p className="text-[#009466] text-xs font-bold mb-2 tracking-wide">{step.party[lang]}</p>
                      <p className="text-white/45 text-sm leading-relaxed">{step.desc[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden border border-white/10">
              <Image
                src="https://media.base44.com/images/public/6a5e151f76837cda81644b8e/1987240b3_generated_56612238.png"
                alt="Heavy equipment hydraulics detail"
                className="w-full h-96 object-cover"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.5}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30]/80 via-transparent to-transparent" />

              {/* Floating Stats */}
              <div className="absolute bottom-6 right-6 left-6 grid grid-cols-3 gap-3">
                {how.stats.map((s) => (
                  <div
                    key={s.val.en}
                    className="bg-[#0A1A30]/80 backdrop-blur-sm border border-white/15 rounded-sm p-3 text-center"
                  >
                    <div className="text-[#009466] font-bold text-lg font-mono">{s.val[lang]}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.label[lang]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blueprint decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#009466]/20 rounded-sm" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-[#0696B0]/20 rounded-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}