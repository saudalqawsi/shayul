import React from "react";
import { Plus, Minus } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import { pickerImgs } from "@/lib/content";

// Equipment line-up wrapped across multiple lines instead of one long
// slide track — smaller thumbnails (72-80px) let several units share each
// row, so the picker stays compact and never needs a slider.
export default function EquipmentPicker({ items, value, onInc, onDec }) {
  const { lang, dir } = useI18n();

  return (
    <div dir="ltr">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-2.5">
        {items.map((eq) => {
          const count = value[eq.name.en] || 0;
          const selected = count > 0;
          return (
            <div key={eq.name.en} className="flex flex-col">
              {/* thumbnail */}
              {/* White-frame thumbnail using a dedicated white-background studio
                  image (pickerImgs) for crisp visibility on small thumbs. */}
              <div
                className={`relative aspect-square overflow-hidden rounded-sm border bg-white transition-colors ${
                  selected ? "border-[#FCD34D]" : "border-white/15"
                }`}
              >
                <Image
                  src={pickerImgs[eq.name.en] || eq.img}
                  alt={eq.name[lang]}
                  className="w-full h-full"
                  fittingType="fit"
                  focalPointX={0.5}
                  focalPointY={0.5}
                />
                {selected && (
                  <span className="absolute top-1 end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FCD34D] text-[#1C1917] text-[10px] font-mono font-bold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>

              {/* clicker counter */}
              <div className="mt-1.5 flex items-stretch rounded-sm border border-white/10 overflow-hidden bg-white/5">
                <button
                  type="button"
                  onClick={() => onDec(eq.name.en)}
                  disabled={count === 0}
                  className="flex-1 flex items-center justify-center text-[#FCD34D] hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="decrement"
                >
                  <Minus size={11} strokeWidth={2.5} />
                </button>
                <span
                  className={`min-w-[24px] px-1 flex items-center justify-center text-[11px] font-mono font-bold ${
                    selected ? "text-white" : "text-white/40"
                  }`}
                >
                  {count}
                </span>
                <button
                  type="button"
                  onClick={() => onInc(eq.name.en)}
                  className="flex-1 flex items-center justify-center text-[#FCD34D] hover:bg-white/10 transition-colors"
                  aria-label="increment"
                >
                  <Plus size={11} strokeWidth={2.5} />
                </button>
              </div>

              {/* minimal name label below */}
              <p
                className="text-[9px] text-white/55 mt-1 text-center leading-tight line-clamp-2 min-h-[24px]"
                dir={dir}
              >
                {eq.name[lang]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}