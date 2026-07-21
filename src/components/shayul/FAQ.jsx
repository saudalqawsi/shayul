import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { faq } from "@/lib/content";

export default function FAQ() {
  const { lang, dir } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-24 bg-[#0A1A30] border-t border-white/5" dir={dir}>
      <div className="max-w-3xl mx-auto px-6">
        {/* header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
            <HelpCircle size={14} />
            {faq.eyebrow[lang]}
          </div>
          <h2 className="text-white font-extrabold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.12 }}>
            {faq.title1[lang]}
            <br />
            <span className="text-white/40">{faq.title2[lang]}</span>
          </h2>
        </div>

        {/* list */}
        <div className="space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-sm border transition-colors ${isOpen ? "border-[#009466]/40 bg-[#0d2240]" : "border-white/10 bg-[#0d2240]/40"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-start px-5 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-bold text-base sm:text-lg leading-snug">
                    {item.q[lang]}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-[#009466] text-white" : "bg-white/5 text-white/60"}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: isOpen ? 400 : 0 }}
                >
                  <p className="px-5 pb-5 text-white/55 text-sm sm:text-base leading-relaxed">
                    {item.a[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm mb-4">{faq.stillQues[lang]}</p>
          <a href="#request" className="inline-flex items-center gap-2 bg-[#009466] hover:bg-[#007a54] text-white px-6 py-3 rounded-sm text-sm font-bold transition-colors">
            {faq.cta[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}