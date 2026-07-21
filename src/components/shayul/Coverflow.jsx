import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { equipmentVault } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";

const CARD_W = 260;

/**
 * Coverflow carousel — a central, highlighted active card flanked by smaller,
 * dimmed neighbour cards that shrink and fade with distance. The detail panel
 * below updates as you step between cards (arrows / clicking a side card).
 */
export default function Coverflow({ items }) {
  const { lang, num } = useI18n();
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const total = items.length;

  if (!total) return null;
  const eq = items[active];

  const go = (d) => setActive((a) => (a + d + total) % total);

  const specEntries = Object.entries(eq.specs || {});
  const weekly = Math.round(eq.daily * 6);

  return (
    <div className="relative">
      {/* stage */}
      <div
        dir="ltr"
        className="relative h-[340px] [perspective:1400px] overflow-hidden touch-pan-y"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const delta = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {items.map((it, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const x = offset * 165;
          const scale = offset === 0 ? 1 : 0.7;
          const rotY = offset === 0 ? 0 : offset > 0 ? -28 : 28;
          const opacity = abs > 2 ? 0 : offset === 0 ? 1 : 0.4;
          const isActive = offset === 0;

          return (
            <button
              key={it.name.en}
              onClick={() => !isActive && setActive(i)}
              type="button"
              className={`absolute top-0 transition-all duration-500 ease-out ${
                isActive ? "cursor-default" : "cursor-pointer"
              }`}
              style={{
                left: "50%",
                width: CARD_W,
                marginLeft: -CARD_W / 2,
                transform: `translateX(${x}px) scale(${scale}) rotateY(${rotY}deg)`,
                opacity,
                zIndex: 10 - abs,
                pointerEvents: abs > 2 ? "none" : "auto",
                transformOrigin: "center center",
              }}
              aria-label={it.name[lang]}
            >
              <div
                className={`bg-[#0d2240] rounded-sm overflow-hidden border ${
                  isActive ? "border-[#009466] shadow-[0_20px_60px_rgba(0,148,102,0.25)]" : "border-white/10"
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={it.img}
                    alt={it.name[lang]}
                    className="w-full h-full"
                    fittingType="fill"
                    focalPointX={0.5}
                    focalPointY={0.5}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2240] via-[#0d2240]/10 to-transparent" />
                  {isActive && (
                    <div className="absolute top-3 end-3 bg-[#0A1A30]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/70 border border-white/10">
                      {it.tag[lang]}
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute top-3 start-3 flex items-center gap-1.5 bg-[#0A1A30]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009466]" />
                      <span className="text-white/80 text-xs font-bold">{equipmentVault.ready[lang]}</span>
                    </div>
                  )}
                  {!isActive && <div className="absolute inset-0 bg-[#081626]/55 pointer-events-none" />}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-base leading-tight">{it.name[lang]}</h3>
                  <div className="flex items-end gap-1.5 mt-2">
                    <span className="text-[#009466] font-bold font-mono text-xl">{num(it.daily)}</span>
                    <Riyal size={14} />
                    <span className="text-white/40 text-xs">{equipmentVault.perDay[lang]}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* nav arrows */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous"
        className="flex absolute top-[170px] -translate-y-1/2 left-0 z-40 items-center justify-center w-10 h-10 rounded-full bg-[#0d2240] border border-white/15 text-white/80 hover:text-white hover:border-[#009466] disabled:opacity-20 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next"
        className="flex absolute top-[170px] -translate-y-1/2 right-0 z-40 items-center justify-center w-10 h-10 rounded-full bg-[#0d2240] border border-white/15 text-white/80 hover:text-white hover:border-[#009466] disabled:opacity-20 disabled:pointer-events-none transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      {/* counters / dots (mobile) */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {items.map((it, i) => (
          <button
            key={it.name.en}
            type="button"
            onClick={() => setActive(i)}
            aria-label={it.name[lang]}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-[#009466]" : "w-3 bg-white/20"}`}
          />
        ))}
      </div>

      {/* live detail panel for the active card */}
      <div className="mt-6 bg-gradient-to-br from-[#0d2240] to-[#0a1a30] border border-[#009466]/20 rounded-sm p-6">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="min-w-0">
            <h4 className="text-white font-bold text-2xl leading-tight">{eq.name[lang]}</h4>
            <p className="text-white/40 text-xs font-mono tracking-widest mt-1">{eq.nameAlt[lang].toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#0A1A30] px-3 py-1.5 rounded-full border border-white/10 self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#009466]" />
            <span className="text-white/80 text-xs font-bold">{equipmentVault.ready[lang]}</span>
          </div>
        </div>

        {specEntries.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {specEntries.map(([k, v]) => (
              <div key={k} className="bg-black/20 rounded-sm px-3 py-2.5 border border-white/5">
                <div className="text-white/40 text-[11px] tracking-wide mb-0.5">{equipmentVault.specLabels[k]?.[lang] || k}</div>
                <div className="text-white font-bold text-sm font-mono">{v[lang]}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end justify-between gap-4 flex-wrap mt-6 pt-5 border-t border-white/10">
          <div className="flex items-end gap-8">
            <div>
              <div className="text-white/40 text-xs mb-0.5">{equipmentVault.perDay[lang]}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-[#009466] font-bold text-2xl font-mono">{num(eq.daily)}</span>
                <Riyal size={20} />
              </div>
            </div>
            <div>
              <div className="text-white/40 text-xs mb-0.5">{equipmentVault.weeklyShort[lang]}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-xl font-mono">{num(weekly)}</span>
                <Riyal size={16} />
              </div>
            </div>
            {/* monthly removed — focus on daily + weekly */}
          </div>
          <a
            href="#request"
            className="bg-[#009466] hover:bg-[#007a54] text-white px-6 py-3 rounded-sm text-sm font-bold transition-colors"
          >
            {equipmentVault.addToRequest[lang]}
          </a>
        </div>
      </div>
    </div>
  );
}