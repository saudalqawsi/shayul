import React, { useState, useMemo } from "react";
import { Calculator } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { equipment } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";

const units = [
  { value: "day", ar: "يومي", en: "Daily" },
  { value: "week", ar: "أسبوعي", en: "Weekly" },
];

export default function RentalCalculator() {
  const { lang, dir, num } = useI18n();
  const [sel, setSel] = useState(equipment[0].name.en);
  const [unit, setUnit] = useState("day");
  const [count, setCount] = useState(1);
  const [qty, setQty] = useState(1);

  const eq = useMemo(() => equipment.find((e) => e.name.en === sel) || equipment[0], [sel]);

  const { rate, total, unitLabel } = useMemo(() => {
    const r = unit === "day" ? eq.daily : eq.daily * 6;
    return {
      rate: r,
      total: r * Math.max(1, count) * Math.max(1, qty),
      unitLabel: units.find((u) => u.value === unit)[lang],
    };
  }, [eq, unit, count, qty, lang]);

  const inputClass = "w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-[#009466] transition-colors";
  const labelClass = "text-white/50 text-xs font-bold tracking-wide block mb-2";

  const t = {
    eyebrow: { ar: "حاسبة التكلفة", en: "Cost Calculator" },
    title1: { ar: "احسب تكلفة", en: "Estimate" },
    title2: { ar: "إيجارك فوراً.", en: "your rental instantly." },
    machine: { ar: "اختر المعدة", en: "Select equipment" },
    machinePh: { ar: "اختر", en: "Select" },
    unit: { ar: "وحدة المدة", en: "Duration unit" },
    count: { ar: "عدد الفترات", en: "Number of periods" },
    qty: { ar: "عدد المعدات", en: "Number of units" },
    estimate: { ar: "التكلفة التقديرية", en: "Estimated cost" },
    perPeriod: { ar: "لكل فترة", en: "per period" },
    breakdown: { ar: "التفصيل", en: "Breakdown" },
    note: { ar: "تقدير استرشادي — السعر النهائي يحدده العقد الموثّق.", en: "Indicative estimate — the final price is set by the notarized contract." },
    monthlyFallback: { ar: "لا يوجد سعر شهري — حُسب من السعر اليومي ×٣٠", en: "No monthly rate — computed from daily ×30" },
  };

  return (
    <div className="bg-[#0d2240] border border-white/10 rounded-sm p-8 mt-16" dir={dir}>
      {/* header */}
      <div className="mb-8">
        <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-3">{t.eyebrow[lang]}</p>
        <h3 className="text-white font-bold leading-snug" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15 }}>
          {t.title1[lang]} <span className="text-white/40">{t.title2[lang]}</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-stretch">
        {/* controls */}
        <div className="space-y-5">
          <div>
            <label className={labelClass}>{t.machine[lang]}</label>
            <select value={sel} onChange={(e) => setSel(e.target.value)} className={`${inputClass} appearance-none`}>
              {equipment.map((e) => (
                <option key={e.name.en} value={e.name.en} className="bg-[#0d2240]">
                  {e.name[lang]}
                </option>
              ))}
            </select>
            <div className="flex gap-3 mt-2 text-xs text-white/40">
              <span className="font-mono flex items-center gap-1"><span className="text-white/60">{num(eq.daily)}</span><Riyal size={11} /><span>{lang === "ar" ? "/يوم" : "/day"}</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.unit[lang]}</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className={`${inputClass} appearance-none`}>
                {units.map((u) => (
                  <option key={u.value} value={u.value} className="bg-[#0d2240]">{u[lang]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{t.count[lang]}</label>
              <input
                type="number"
                min="1"
                max="365"
                value={count}
                onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>{t.qty[lang]}</label>
            <input
              type="number"
              min="1"
              max="50"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className={`${inputClass} font-mono`}
            />
          </div>

          {/* monthly option removed — focus on daily + weekly */}
        </div>

        {/* estimate */}
        <div className="bg-gradient-to-br from-[#009466]/20 to-transparent border border-[#009466]/30 rounded-sm p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Calculator size={16} className="text-[#009466]" />
            <span className="text-white/60 text-sm font-bold">{t.estimate[lang]}</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[#009466] font-bold font-mono" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", lineHeight: 1 }}>
              {num(total)}
            </span>
            <Riyal size={26} />
          </div>
          <div className="text-white/45 text-sm font-mono mb-4">
            {num(rate)} × {Math.max(1, count)} × {Math.max(1, qty)}
            <span className="text-white/30"> · {unitLabel}</span>
          </div>
          <p className="text-white/35 text-xs leading-relaxed">{t.note[lang]}</p>
        </div>
      </div>
    </div>
  );
}