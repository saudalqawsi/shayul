import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { equipmentVault } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";
import EquipmentBadge from "@/components/shayul/EquipmentBadge";
import { motion } from "framer-motion";

// Flat coverflow: every card faces the camera (no rotateY / no ring), so all
// three carousels look identical regardless of how many items each holds.
// Active card sits centered at scale 1; side cards translate horizontally,
// shrink slightly, and fade out as they get further from the centre —
// giving the clean, flat side-card look the home page uses.
const CARD_W = 300;
const CARD_H = 380;
const ACTIVE_SCALE = 1.04;
const SIDE_SCALE = 0.78;
const SIDE_GAP = 220;      // horizontal distance between adjacent card centres
const STAGE_HEIGHT = CARD_H + 24;
const MAX_VISIBLE = 4;      // cards beyond this distance are hidden

// Shortest signed circular offset between index i and the active index,
// so the carousel wraps seamlessly in either direction.
function signedRel(i, activeIdx, N) {
  let d = i - activeIdx;
  while (d > N / 2) d -= N;
  while (d <= -N / 2) d += N;
  return d;
}

export default function Coverflow({ items }) {
  const { lang, num } = useI18n();
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const total = items.length;

  if (!total) return null;

  const activeIdx = ((active % total) + total) % total;

  const go = (d) => setActive((a) => a + d);
  const goToCard = (i) => setActive((a) => a + signedRel(i, ((a % total) + total) % total, total));
  // Every card click routes the visitor down to the request form — the
  // carousel still turns via its arrows and dots, but a tap on any card
  // (active or side) is treated as "I want to reserve this unit".
  const goToRequest = () => {
    const el = document.getElementById("request");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        className="relative overflow-hidden touch-pan-y"
        style={{ height: `${STAGE_HEIGHT}px` }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const d = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(d) > 40) go(d < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {items.map((it, i) => {
          const rel = signedRel(i, activeIdx, total);
          const abs = Math.abs(rel);
          const visible = abs <= MAX_VISIBLE;
          const isActive = abs === 0;
          const scale = isActive ? ACTIVE_SCALE : SIDE_SCALE - Math.min(abs - 1, 3) * 0.04;
          const x = rel * SIDE_GAP;
          const opacity = !visible ? 0 : isActive ? 1 : Math.max(0.16, 1 - abs * 0.24);
          const zIndex = Math.round(10 - abs);
          const clickable = visible && !isActive;

          return (
            <button
              key={it.name.en}
              type="button"
              onClick={goToRequest}
              className="absolute top-1/2"
              style={{
                left: "50%",
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                marginTop: -CARD_H / 2,
                transform: `translateX(${x}px) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: visible || isActive ? "auto" : "none",
                transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.5s cubic-bezier(0.22,1,0.36,1)",
                cursor: "pointer",
              }}
              aria-label={`${it.name[lang]} — ${lang === "ar" ? "احجز" : "reserve"}`}
            >
              <div
                className={`relative overflow-hidden h-full bg-[#1C1917] ${
                  isActive ? "ring-1 ring-[#FCD34D]/60" : "ring-1 ring-white/5"
                }`}
              >
                <Image
                  src={it.img}
                  alt={it.name[lang]}
                  className="w-full h-full"
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.5}
                  style={{ filter: "saturate(1.45) brightness(1.32) contrast(1.06) sepia(0.18) hue-rotate(-8deg)" }}
                />
                {/* Sunny-day tint — a soft amber/gold light layer over the
                    image masks any overcast look in the source shots,
                    while the bottom gradient keeps the card copy legible. */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-300/20 via-amber-100/5 to-orange-300/25 mix-blend-soft-light pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                {!isActive && <div className="absolute inset-0 bg-black/25 pointer-events-none" />}
                {isActive && (
                  <div className="absolute top-3 end-3">
                    <span className="text-[9px] tracking-[0.18em] uppercase px-3 py-1 bg-black/40 backdrop-blur-sm text-white/70 font-medium">
                      {it.tag[lang]}
                    </span>
                  </div>
                )}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <EquipmentBadge name={it.name.en} width={32} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[10px] tracking-[0.18em] uppercase mb-1 text-[#FCD34D] font-medium">{it.nameAlt[lang]}</p>
                  <h3 className="text-white font-bold text-lg leading-tight">{it.name[lang]}</h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed line-clamp-1">
                    {Object.entries(it.specs || {})
                      .filter(([k]) => k !== "weight")
                      .map(([, v]) => v[lang])
                      .join(" · ")}
                  </p>
                  <div className="flex items-end justify-between gap-2 mt-2.5 pt-2.5 border-t border-white/15">
                    <div className="flex items-end gap-1">
                      <span className="text-[#FCD34D] font-bold font-mono text-base">{num(it.daily)}</span>
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

      {/* nav arrows */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous"
        className="flex absolute -translate-y-1/2 left-0 z-40 items-center justify-center w-10 h-10 rounded-full bg-[#1C1917] border border-white/15 text-white/80 hover:text-white hover:border-[#FCD34D] transition-colors"
        style={{ top: `${STAGE_HEIGHT / 2}px` }}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next"
        className="flex absolute -translate-y-1/2 right-0 z-40 items-center justify-center w-10 h-10 rounded-full bg-[#1C1917] border border-white/15 text-white/80 hover:text-white hover:border-[#FCD34D] transition-colors"
        style={{ top: `${STAGE_HEIGHT / 2}px` }}
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
            className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-8 bg-[#FCD34D]" : "w-3 bg-white/20"}`}
          />
        ))}
      </div>

    </motion.div>
  );
}