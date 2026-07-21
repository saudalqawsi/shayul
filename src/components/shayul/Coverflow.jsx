import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { equipmentVault } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";
import { motion } from "framer-motion";

const CARD_W = 260;
const CARD_H = 320;

// Normalise an angle (degrees) to the shortest representation in [-180, 180].
function norm(a) {
  let r = a % 360;
  if (r > 180) r -= 360;
  if (r < -180) r += 360;
  return r;
}

/**
 * Coverflow carousel — a true circular ring. Cards are evenly placed around
 * a vertical axis and the whole ring rotates as one; there is no "first" or
 * "last" card, so scrolling loops endlessly and smoothly in both directions.
 * `active` is an unbounded rotation index; the visible card is `active % N`.
 */
export default function Coverflow({ items }) {
  const { lang, num } = useI18n();
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const total = items.length;

  if (!total) return null;

  const step = total > 1 ? 360 / total : 360; // spacing between cards (deg)
  // Radius of the ring: cards just touch at the front, plus a little depth.
  const R =
    total > 1 && step < 180
      ? Math.min(1200, Math.round(CARD_W / (2 * Math.tan((step * Math.PI) / 360))) + 40)
      : 0;

  const activeIdx = ((active % total) + total) % total;
  const eq = items[activeIdx];

  const go = (d) => setActive((a) => a + d);
  const goToCard = (i) => {
    const delta = i - activeIdx;
    let best = delta;
    if (Math.abs(delta + total) < Math.abs(best)) best = delta + total;
    if (Math.abs(delta - total) < Math.abs(best)) best = delta - total;
    setActive((a) => a + best);
  };

  const specEntries = Object.entries(eq.specs || {});
  const weekly = Math.round(eq.daily * 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* stage */}
      <div
        dir="ltr"
        className="relative h-[340px] [perspective:1500px] overflow-hidden touch-pan-y"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const d = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(d) > 40) go(d < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${-active * step}deg)`,
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {items.map((it, i) => {
            const rel = norm(i * step - active * step);
            const abs = Math.abs(rel);
            const visible = abs <= 115;
            const isActive = abs < step / 2;
            const opacity = !visible ? 0 : isActive ? 1 : Math.max(0.16, 1 - abs / 120);
            const scale = isActive ? 1.06 : 0.9;
            const clickable = visible && !isActive;

            return (
              <button
                key={it.name.en}
                type="button"
                onClick={() => clickable && goToCard(i)}
                className="absolute top-1/2"
                style={{
                  left: "50%",
                  width: CARD_W,
                  height: CARD_H,
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                  transform: `rotateY(${i * step}deg) translateZ(${R}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(100 - abs),
                  pointerEvents: visible || isActive ? "auto" : "none",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1)",
                  transformStyle: "preserve-3d",
                  cursor: clickable ? "pointer" : "default",
                }}
                aria-label={it.name[lang]}
              >
                <div
                  className={`relative overflow-hidden h-full bg-[#0d2240] ${
                    isActive ? "ring-1 ring-[#C8A96E]/60" : "ring-1 ring-white/5"
                  }`}
                >
                  <Image
                    src={it.img}
                    alt={it.name[lang]}
                    className="w-full h-full"
                    fittingType="fill"
                    focalPointX={0.5}
                    focalPointY={0.5}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  {!isActive && <div className="absolute inset-0 bg-black/45 pointer-events-none" />}
                  {isActive && (
                    <div className="absolute top-3 end-3">
                      <span className="text-[9px] tracking-[0.18em] uppercase px-3 py-1 bg-black/40 backdrop-blur-sm text-white/70 font-medium">
                        {it.tag[lang]}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] tracking-[0.18em] uppercase mb-1 text-[#C8A96E] font-medium">{it.nameAlt[lang]}</p>
                    <h3 className="text-white font-bold text-lg leading-tight">{it.name[lang]}</h3>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed line-clamp-1">
                      {Object.entries(it.specs || {})
                        .filter(([k]) => k !== "weight")
                        .map(([, v]) => v[lang])
                        .join(" · ")}
                    </p>
                    <div className="flex items-end justify-between gap-2 mt-2.5 pt-2.5 border-t border-white/15">
                      <div className="flex items-end gap-1">
                        <span className="text-[#C8A96E] font-bold font-mono text-base">{num(it.daily)}</span>
                        <Riyal size={12} />
                        <span className="text-white/50 text-[10px]">{equipmentVault.perDay[lang]}</span>
                      </div>
                      <div className="flex items-end gap-1">
                        <span className="text-white font-bold font-mono text-sm">{num(Math.round(it.daily * 6))}</span>
                        <Riyal size={11} />
                        <span className="text-white/50 text-[10px]">{equipmentVault.weeklyShort[lang]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* nav arrows */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous"
        className="flex absolute top-[170px] -translate-y-1/2 left-0 z-40 items-center justify-center w-10 h-10 rounded-full bg-[#0d2240] border border-white/15 text-white/80 hover:text-white hover:border-[#C8A96E] transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next"
        className="flex absolute top-[170px] -translate-y-1/2 right-0 z-40 items-center justify-center w-10 h-10 rounded-full bg-[#0d2240] border border-white/15 text-white/80 hover:text-white hover:border-[#C8A96E] transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      {/* counters / dots (mobile) */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {items.map((it, i) => (
          <button
            key={it.name.en}
            type="button"
            onClick={() => goToCard(i)}
            aria-label={it.name[lang]}
            className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-8 bg-[#C8A96E]" : "w-3 bg-white/20"}`}
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
          </div>
          <a
            href="#request"
            className="bg-[#009466] hover:bg-[#007a54] text-white px-6 py-3 rounded-sm text-sm font-bold transition-colors"
          >
            {equipmentVault.addToRequest[lang]}
          </a>
        </div>
      </div>
    </motion.div>
  );
}