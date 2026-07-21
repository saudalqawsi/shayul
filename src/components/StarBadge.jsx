import React from "react";
import { Star } from "lucide-react";

export default function StarBadge({ value = 0, count = 0, size = 16 }) {
  const full = Math.round(value);
  return (
    <div className="inline-flex items-center gap-1.5" dir="rtl">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= full ? "text-[#D4A537] fill-current" : "text-white/20"}
          />
        ))}
      </div>
      <span className="text-[#D4A537] font-bold font-mono text-sm">
        {value ? value.toFixed(1) : "—"}
      </span>
      {count > 0 && <span className="text-white/40 text-xs">({count})</span>}
    </div>
  );
}