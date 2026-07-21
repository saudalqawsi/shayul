import React, { useState } from "react";
import { Star, Loader2 } from "lucide-react";

const LABELS = ["", "سيئة", "مقبولة", "جيدة", "جيدة جداً", "ممتازة"];

export default function RatingStars({ value, onSave, saving }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  const rated = value > 0;

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <div>
          <div className="text-white/90 text-sm font-bold">{rated ? "شكراً لتقييمك" : "قيّم تجربتك"}</div>
          <div className="text-white/40 text-xs mt-0.5">
            {rated ? `أعطيت ${LABELS[value]}` : "أفدنا برأيك بعد إرجاع المعدة"}
          </div>
        </div>
        {rated && (
          <span className="inline-flex items-center gap-1 text-[#D4A537] text-xs font-bold bg-[#D4A537]/10 border border-[#D4A537]/30 px-2.5 py-1 rounded-full">
            <Star size={12} className="fill-current" /> {value}/5
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((i) => {
            const on = i <= display;
            return (
              <button
                key={i}
                type="button"
                disabled={saving}
                onMouseEnter={() => setHover(i)}
                onClick={() => onSave(i)}
                className={`transition-transform hover:scale-110 disabled:cursor-not-allowed ${on ? "text-[#D4A537]" : "text-white/20"}`}
                aria-label={`${i} نجوم`}
              >
                <Star size={28} className={on ? "fill-current" : ""} />
              </button>
            );
          })}
        </div>
        {saving && <Loader2 size={14} className="text-white/40 animate-spin" />}
      </div>
    </div>
  );
}