import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { equipmentVault } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";

const CARD_W = 210;
const CARD_H = 290;
// Minimum virtual slots on the ring so even tiny carousels (e.g. 2 cards)
// spread neighbours out and rotate like the multi-card sections.
const MIN_SLOTS = 6;

// Normalise an angle (degrees) to the shortest representation in [-180, 180].
function norm(a) {
  let r = a % 360;
  if (r > 180) r -= 360;
  if (r < -180) r += 360;
  return r;
}

// Build a virtual ring of slots. When there are fewer items than MIN_SLOTS,
// the items are repeated around the ring so the carousel still rotates with
// neighbours visible — the same motion as the bigger sections. Each slot has
// { item, origIdx, slot } where `origIdx` is the index in the original list.
function buildSlots(items) {
  const n = items.length;
  if (!n) return [];
  let repeat = 1;
  while (n * repeat < MIN_SLOTS) repeat += 1;
  const slots = [];
  for (let r = 0; r < repeat; r += 1) {
    for (let i = 0; i < n; i += 1) {
      slots.push({ item: items[i], origIdx: i, slot: slots.length });
    }
  }
  return slots;
}

/**
 * Coverflow carousel — a true circular ring. Cards are evenly placed around
 * a vertical axis and the whole ring rotates as one; there is no "first" or
 * "last" card, so scrolling loops endlessly and smoothly in both directions.
 * `active` is an unbounded virtual-slot index; the visible card is
 * `slots[active % slots.length]`.
 */
export default function Coverflow({ items }) {
  const { lang, num } = useI18n();
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const slots = buildSlots(items);
  const total = slots.length;

  if (!total) return null;

  const step = total > 1 ? 360 / total : 360; // spacing between slots (deg)
  // Radius of the ring: cards just touch at the front, plus a little depth.
  const R =
    total > 1 && step < 180
      ? Math.min(1200, Math.round(CARD_W / (2 * Math.tan((step * Math.PI) / 360))) + 40)
      : 0;

  const activeIdx = ((active % total) + total) % total;
  const eq = slots[activeIdx].item;
  const activeOrig = slots[activeIdx].origIdx;

  const go = (d) => setActive((a) => a + d);

  // Centre the nearest virtual slot whose original index matches `origI`.
  const goToOrig = (origI) => {
    setActive((a) => {
      const curr = ((a % total) + total) % total;
      let bestDelta = Infinity;
      slots.forEach((v, idx) => {
        if (v.origIdx !== origI) return;
        let delta = idx - curr;
        if (Math.abs(delta + total) < Math.abs(delta)) delta += total;
        if (Math.abs(delta - total) < Math.abs(delta)) delta -= total;
        if (Math.abs(delta) < Math.abs(bestDelta)) bestDelta = delta;
      });
      return a + (bestDelta === Infinity ? 0 : bestDelta);
    });
  };

  return (
    <div className="relative">
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
          {slots.map((slot, i) => {
            const it = slot.item;
            const rel = norm(i * step - active * step);
            const abs = Math.abs(rel);
            const visible = abs <= 115;
            const isActive = abs < step / 2;
            const opacity = !visible ? 0 : isActive ? 1 : Math.max(0.16, 1 - abs / 120);
            const scale = isActive ? 1.06 : 0.9;
            const clickable = visible && !isActive;

            return (
              <button
                key={slot.slot}
                type="button"
                onClick={() => clickable && setActive(slot.slot)}
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
                  transition: "opacity 0.5s ease",
                  transformStyle: "preserve-3d",
                  cursor: clickable ? "pointer" : "default",
                }}
                aria-label={it.name[lang]}
              >
                <div
                  className={`bg-[#11192a] rounded-md overflow-hidden border h-full flex flex-col ${
                    isActive ? "border-[#A6845B] shadow-[0_20px_60px_rgba(166,132,91,0.28)]" : "border-white/10"
                  }`}
                >
                  <div className="relative flex-1 overflow-hidden">
                    <Image
                      src={it.img}
                      alt={it.name[lang]}
                      className="w-full h-full"
                      fittingType="fill"
                      focalPointX={0.5}
                      focalPointY={0.5}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11192a] via-transparent to-transparent" />
                    <div className="absolute top-3 start-3 bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <span className="text-[#A6845B] text-[11px] font-bold tracking-widest uppercase">
                        {it.tag[lang]}
                      </span>
                    </div>
                    {!isActive && <div className="absolute inset-0 bg-[#081626]/55 pointer-events-none" />}
                  </div>
                  <div className="px-4 pt-3 pb-4">
                    <p className="text-[#A6845B] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                      {it.nameAlt[lang]}
                    </p>
                    <h3 className="text-white font-bold text-lg leading-tight">{it.name[lang]}</h3>
                    <p className="text-white/45 text-xs mt-1 leading-relaxed line-clamp-1">
                      {Object.entries(it.specs || {})
                        .filter(([k]) => k !== "weight")
                        .map(([, v]) => v[lang])
                        .join(" · ")}
                    </p>
                    <div className="flex items-end justify-between gap-1.5 mt-2.5 pt-2.5 border-t border-white/10">
                      <div className="flex items-end gap-1">
                        <span className="text-[#A6845B] font-bold font-mono text-base">{num(it.daily)}</span>
                        <Riyal size={11} />
                        <span className="text-white/40 text-[10px]">{equipmentVault.perDay[lang]}</span>
                      </div>
                      <div className="flex items-end gap-1">
                        <span className="text-white font-bold font-mono text-sm">{num(Math.round(it.daily * 6))}</span>
                        <Riyal size={10} />
                        <span className="text-white/40 text-[10px]">{equipmentVault.weeklyShort[lang]}</span>
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
        className="flex absolute top-[170px] -translate-y-1/2 left-0 z-40 items-center justify-center w-10 h-10 rounded-full bg-[#11192a] border border-white/15 text-white/80 hover:text-white hover:border-[#A6845B] transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next"
        className="flex absolute top-[170px] -translate-y-1/2 right-0 z-40 items-center justify-center w-10 h-10 rounded-full bg-[#11192a] border border-white/15 text-white/80 hover:text-white hover:border-[#A6845B] transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      {/* counters / dots — one per original card */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {items.map((it, i) => (
          <button
            key={it.name.en}
            type="button"
            onClick={() => goToOrig(i)}
            aria-label={it.name[lang]}
            className={`h-1.5 rounded-full transition-all ${i === activeOrig ? "w-8 bg-[#A6845B]" : "w-3 bg-white/20"}`}
          />
        ))}
      </div>

    </div>
  );
}