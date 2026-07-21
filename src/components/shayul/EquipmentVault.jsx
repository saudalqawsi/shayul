import React, { useState, useMemo } from "react";
import { Shield, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { equipment, equipmentVault } from "@/lib/content";
import RentalCalculator from "@/components/shayul/RentalCalculator";

// Pull the first number out of a localized spec string ("18 T", "250 HP", ...)
const numFrom = (s) => {
  const m = String(s ?? "").replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).match(/[\d.]+/);
  return m ? parseFloat(m[0]) : null;
};

const WEIGHT_BUCKETS = [
  { value: "", ar: "الكل", en: "All" },
  { value: "s", ar: "حتى ١٠ طن", en: "Up to 10 T" },
  { value: "m", ar: "١٠ – ٢٥ طن", en: "10 – 25 T" },
  { value: "l", ar: "فوق ٢٥ طن", en: "Over 25 T" },
];
const POWER_BUCKETS = [
  { value: "", ar: "الكل", en: "All" },
  { value: "s", ar: "حتى ١٠٠ حصان", en: "Up to 100 HP" },
  { value: "m", ar: "١٠٠ – ٢٥٠ حصان", en: "100 – 250 HP" },
  { value: "l", ar: "فوق ٢٥٠ حصان", en: "Over 250 HP" },
];

function weightOk(n, b) {
  if (!b) return true;
  if (n === null) return false;
  if (b === "s") return n <= 10;
  if (b === "m") return n > 10 && n <= 25;
  if (b === "l") return n > 25;
  return true;
}
function powerOk(n, b) {
  if (!b) return true;
  if (n === null) return false;
  if (b === "s") return n <= 100;
  if (b === "m") return n > 100 && n <= 250;
  if (b === "l") return n > 250;
  return true;
}

function EquipCard({ eq }) {
  const { lang, num, dir } = useI18n();
  const [hovered, setHovered] = useState(false);

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
          <div className="grid grid-cols-3 gap-2 mb-3">
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
          {eq.monthly !== null && (
            <div className="text-white/30 text-sm">
              <span className="font-mono">{num(eq.monthly)}</span>
              <span className="ms-1 text-xs">{equipmentVault.monthlyShort[lang]}</span>
            </div>
          )}
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

function Chips({ options, value, onChange, lang }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value || "all"}
            onClick={() => onChange(o.value)}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold border transition-colors ${
              active
                ? "bg-[#009466] border-[#009466] text-white"
                : "bg-white/5 border-white/10 text-white/55 hover:border-white/25 hover:text-white/80"
            }`}
          >
            {o[lang]}
          </button>
        );
      })}
    </div>
  );
}

export default function EquipmentVault() {
  const { lang, dir } = useI18n();
  const [weight, setWeight] = useState("");
  const [power, setPower] = useState("");
  const [size, setSize] = useState("");
  const [openMobile, setOpenMobile] = useState(false);

  const sizes = useMemo(() => {
    const seen = [];
    equipment.forEach((eq) => {
      const key = eq.specs.size.en;
      if (!seen.find((s) => s.key === key)) seen.push({ key, label: eq.specs.size[lang] });
    });
    return seen;
  }, [lang]);

  const filtered = useMemo(() => {
    return equipment.filter((eq) => {
      const tons = numFrom(eq.specs.weight.en);
      const hp = numFrom(eq.specs.hp.en);
      return (
        weightOk(tons, weight) &&
        powerOk(hp, power) &&
        (!size || eq.specs.size.en === size)
      );
    });
  }, [weight, power, size]);

  const activeCount = [weight, power, size].filter(Boolean).length;
  const reset = () => { setWeight(""); setPower(""); setSize(""); };

  const labels = {
    filters: { ar: "تصفية النتائج", en: "Filter Results" },
    clear: { ar: "مسح", en: "Clear" },
    weight: { ar: "الوزن (طن)", en: "Weight (T)" },
    power: { ar: "القدرة (حصان)", en: "Power (HP)" },
    size: { ar: "المقاس", en: "Size" },
    sizeAll: { ar: "كل المقاسات", en: "All sizes" },
    results: (n) => ({ ar: `${n} معدة`, en: `${n} units` }),
    empty: { ar: "لا توجد معدات مطابقة — جرّب توسيع التصفية.", en: "No matching units — try widening the filters." },
    reset: { ar: "إعادة ضبط", en: "Reset" },
  };

  const aside = (
    <div className="bg-[#0d2240] border border-white/10 rounded-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <SlidersHorizontal size={15} className="text-[#009466]" />
          {labels.filters[lang]}
          {activeCount > 0 && (
            <span className="text-[10px] font-mono bg-[#009466]/15 text-[#009466] px-1.5 py-0.5 rounded-full">{activeCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button onClick={reset} className="inline-flex items-center gap-1 text-white/45 hover:text-white text-[11px]">
              <RotateCcw size={12} /> {labels.reset[lang]}
            </button>
          )}
          <button onClick={() => setOpenMobile(false)} className="lg:hidden text-white/40 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Weight */}
      <div className="mb-6">
        <div className="text-white/50 text-xs font-bold tracking-wide uppercase mb-2.5">{labels.weight[lang]}</div>
        <Chips options={WEIGHT_BUCKETS} value={weight} onChange={setWeight} lang={lang} />
      </div>
      {/* Power */}
      <div className="mb-6">
        <div className="text-white/50 text-xs font-bold tracking-wide uppercase mb-2.5">{labels.power[lang]}</div>
        <Chips options={POWER_BUCKETS} value={power} onChange={setPower} lang={lang} />
      </div>
      {/* Size */}
      <div>
        <div className="text-white/50 text-xs font-bold tracking-wide uppercase mb-2.5">{labels.size[lang]}</div>
        <div className="relative">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-sm px-3 py-2.5 text-white text-sm appearance-none focus:outline-none focus:border-[#009466]"
          >
            <option value="" className="bg-[#0d2240]">{labels.sizeAll[lang]}</option>
            {sizes.map((s) => (
              <option key={s.key} value={s.key} className="bg-[#0d2240]">{s.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <section id="equipment" className="py-24 bg-[#081626] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
              {equipmentVault.eyebrow[lang]}
            </p>
            <h2 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}>
              {equipmentVault.title1[lang]}
              <br />
              <span className="text-white/40">{equipmentVault.title2[lang]}</span>
            </h2>
          </div>
          <div className="lg:hidden text-white/45 text-xs font-mono">{labels.results(filtered.length)[lang]}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar (sticky on desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">{aside}</div>
          </aside>

          {/* Mobile drawer */}
          {openMobile && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setOpenMobile(false)}>
              <div
                className="absolute end-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[#081626] border-s border-white/10 p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {aside}
              </div>
            </div>
          )}

          {/* Catalog */}
          <div>
            <div className="hidden sm:block text-white/45 text-sm mb-4 font-mono">
              {labels.results(filtered.length)[lang]}
            </div>

            {filtered.length === 0 ? (
              <div className="bg-[#0d2240] border border-white/10 border-dashed rounded-sm py-16 text-center">
                <Shield size={28} className="text-white/30 mx-auto mb-3" />
                <p className="text-white/50 text-sm">{labels.empty[lang]}</p>
                <button onClick={reset} className="mt-4 text-[#009466] text-sm font-bold hover:underline">
                  {labels.reset[lang]}
                </button>
              </div>
            ) : (
              <>
                {/* mobile swipe carousel */}
                <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {filtered.map((eq) => (
                    <div key={eq.name.en} className="w-[78vw] shrink-0 snap-start">
                      <EquipCard eq={eq} />
                    </div>
                  ))}
                  <div className="w-[78vw] shrink-0 snap-start">
                    <CtaCard />
                  </div>
                </div>

                {/* desktop grid */}
                <div className="hidden sm:grid grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((eq) => (
                    <EquipCard key={eq.name.en} eq={eq} />
                  ))}
                  <CtaCard />
                </div>
              </>
            )}
          </div>
        </div>

        <RentalCalculator />
      </div>

      {/* floating mobile filter button — always reachable while browsing */}
      <button
        onClick={() => setOpenMobile(true)}
        className="lg:hidden fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 bg-[#009466] text-white px-5 py-3.5 rounded-full shadow-lg shadow-[#009466]/40 font-bold text-sm"
      >
        <SlidersHorizontal size={16} /> {labels.filters[lang]}
        {activeCount > 0 && <span className="bg-white text-[#009466] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{activeCount}</span>}
      </button>
    </section>
  );
}