import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { equipmentVault } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";

const CARD_W = 260;
const CARD_H = 320;
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

  const specEntries = Object.entries(eq.specs || {});
  const weekly = Math.round(eq.daily * 6);

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
                    <p className="text-white/45 text-xs mt-1 leading-relaxed line-clamp-2">
                      {Object.values(it.specs || {})
                        .map((s) => s[lang])
                        .join(" · ")}
                    </p>
                    <div className="flex items-end gap-1.5 mt-3 pt-3 border-t border-white/10">
                      <span className="text-[#A6845B] font-bold font-mono text-lg">{num(it.daily)}</span>
                      <Riyal size={13} />
                      <span className="text-white/40 text-xs">{equipmentVault.perDay[lang]}</span>
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

      {/* live detail panel for the active card */}
      <div className="mt-6 bg-gradient-to-br from-[#11192a] to-[#0a1020] border border-[#A6845B]/25 rounded-md p-6">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="min-w-0">
          <p className="text-[#A6845B] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">{eq.nameAlt[lang]}</p>
          <h4 className="text-white font-bold text-2xl leading-tight">{eq.name[lang]}</h4>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0A1A30] px-3 py-1.5 rounded-full border border-white/10 self-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6845B]" />
          <span className="text-white/80 text-xs font-bold">{equipmentVault.ready[lang]}</span>
        </div>
      </div>

        {specEntries.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {specEntries.map(([k, v]) => (
              <div key={k} className="bg-black/20 rounded-sm px-3 py-2.5 border border-white/5">
                <div className="text-white/40 text-[11px] tracking-[0.15em] uppercase mb-0.5">{equipmentVault.specLabels[k]?.[lang] || k}</div>
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
                <span className="text-[#A6845B] font-bold text-2xl font-mono">{num(eq.daily)}</span>
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
            className="bg-[#A6845B] hover:bg-[#8f6f4a] text-white px-6 py-3 rounded-md text-sm font-bold transition-colors"
          >
            {equipmentVault.addToRequest[lang]}
          </a>
        </div>
      </div>
    </div>
  );
}