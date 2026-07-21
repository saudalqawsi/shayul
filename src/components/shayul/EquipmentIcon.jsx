import React, { useState, useEffect } from "react";
import {
  EQUIPMENT_ICONS,
  getEquipmentIconStyle,
  nameToIcon,
  typeToIcon,
  ICON_SHEET_URL,
} from "@/components/shayul/equipmentIcons";

// Module-level cache for the background-stripped sprite sheet.
//
// The source is a JPEG of 32 black-on-white line-art icons. We draw it to a
// canvas once, zero out the (near-)white background pixels (preserving
// anti-aliased edges), and reuse the resulting transparent PNG as the
// background image for every icon. Without this step the icons render as
// a visible inverted square (white JPEG bg → black after `invert(1)`),
// which looked poor on dark cards.
let transparentSheetUrl = null;
let processingPromise = null;

function processSpriteSheet() {
  if (transparentSheetUrl) return Promise.resolve(transparentSheetUrl);
  if (processingPromise) return processingPromise;

  processingPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = data.data;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i], g = px[i + 1], b = px[i + 2];
          const lum = r * 0.299 + g * 0.587 + b * 0.114;
          if (lum >= 235) {
            // Pure white background — fully transparent.
            px[i + 3] = 0;
          } else if (lum >= 170) {
            // Anti-aliasing edges — fade out proportionally.
            const t = (235 - lum) / 65; // 0..1
            px[i + 3] = Math.round(t * 255);
          }
          // Darker pixels (black line art) stay fully opaque.
        }
        ctx.putImageData(data, 0, 0);
        transparentSheetUrl = canvas.toDataURL("image/png");
        resolve(transparentSheetUrl);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = ICON_SHEET_URL;
  });

  return processingPromise;
}

// Returns the transparent sprite URL once processed; falls back to the raw
// JPEG if canvas extraction fails (e.g., CORS-tainted pixels).
function useTransparentSprite() {
  const [url, setUrl] = useState(transparentSheetUrl);
  useEffect(() => {
    if (transparentSheetUrl) return;
    let active = true;
    processSpriteSheet()
      .then((u) => { if (active) setUrl(u); })
      .catch(() => { if (active) setUrl(ICON_SHEET_URL); });
    return () => { active = false; };
  }, []);
  return url;
}

// Compact, theme-aware thumbnail that displays a single equipment symbol
// from the sprite sheet. Pass either `name` (content.jsx equipment name) or
// `type` (Equipment entity type enum) — the icon resolves automatically.
export default function EquipmentIcon({
  name,
  type,
  size = 28,
  theme = "dark",
  className = "",
}) {
  const url = useTransparentSprite();
  const iconKey = type ? typeToIcon(type) : nameToIcon(name);

  if (!url) {
    return (
      <div
        aria-hidden
        className={`inline-block shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={getEquipmentIconStyle(iconKey, size, theme, url)}
    />
  );
}

// Render an unordered, de-duplicated set of icon keys — used by provider cards
// to show the equipment kinds they offer without text labels.
export function EquipmentIconRow({
  iconKeys,
  size = 24,
  theme = "dark",
  className = "",
}) {
  const url = useTransparentSprite();
  const unique = [...new Set(iconKeys || [])].filter((k) => EQUIPMENT_ICONS[k]);
  if (!unique.length) return null;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {unique.map((k) => (
        <div
          key={k}
          aria-hidden
          className="inline-block shrink-0"
          style={url ? getEquipmentIconStyle(k, size, theme, url) : { width: size, height: size }}
        />
      ))}
    </div>
  );
}