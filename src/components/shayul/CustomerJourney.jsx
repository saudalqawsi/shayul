import React from "react";
import { User, HardHat, Database } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { journey } from "@/lib/content";

const roleIcons = { User, HardHat, Database };

export default function CustomerJourney() {
  const { lang, dir } = useI18n();

  return (
    <section id="journey" className="py-24 bg-[#0A1A30] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="text-[#D4A537] text-xs font-bold tracking-widest uppercase mb-4">
            {journey.eyebrow[lang]}
          </p>
          <h2
            className="text-white font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
          >
            {journey.title1[lang]}
            <br />
            <span className="text-white/40">{journey.title2[lang]}</span>
          </h2>
          <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-3xl">
            {journey.intro[lang]}
          </p>
        </div>

        {/* Role Legend — dual access */}
        <div className="flex flex-wrap gap-3 mb-14">
          {journey.roles.map((r) => {
            const Icon = roleIcons[r.icon];
            return (
              <div
                key={r.key}
                className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${r.color}20` }}
                >
                  <Icon size={15} style={{ color: r.color }} />
                </div>
                <span className="text-white/75 text-sm font-semibold">{r.label[lang]}</span>
              </div>
            );
          })}
        </div>

        {/* Roadmap Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical rail (logical inline-start) */}
          <div className="absolute start-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#009466]/70 via-[#0696B0]/50 to-[#D4A537]/60" />

          <div className="space-y-7">
            {journey.stages.map((stage) => (
              <div key={stage.num} className="relative ps-20 last:pb-0">
                {/* Node */}
                <div className="absolute start-8 -ms-6 w-12 h-12 rounded-full bg-[#0A1A30] border-2 border-[#009466] flex items-center justify-center text-white font-mono font-bold text-sm z-10">
                  {stage.num}
                </div>

                {/* Card */}
                <div className="bg-white/4 border border-white/10 rounded-sm p-5 hover:bg-white/[0.07] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-base md:text-lg">{stage.title[lang]}</h3>
                    <span className="text-[#D4A537] text-xs font-bold tracking-widest uppercase">
                      {stage.phase[lang]}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {journey.roles.map((r) => {
                      const action = stage[r.key];
                      if (!action) return null;
                      const Icon = roleIcons[r.icon];
                      return (
                        <div
                          key={r.key}
                          className="flex items-start gap-3 py-2 ps-3 rounded-sm bg-white/[0.03]"
                          style={{ borderInlineStart: `2px solid ${r.color}` }}
                        >
                          <div
                            className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${r.color}20` }}
                          >
                            <Icon size={14} style={{ color: r.color }} />
                          </div>
                          <div>
                            <div className="text-xs font-bold tracking-wide mb-0.5" style={{ color: r.color }}>
                              {r.label[lang]}
                            </div>
                            <div className="text-white/60 text-sm leading-relaxed">{action[lang]}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}