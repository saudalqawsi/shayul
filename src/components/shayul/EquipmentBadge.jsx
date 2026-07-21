import React, { useState, useEffect } from "react";
import {
  EQUIPMENT_ICONS,
  getEquipmentBadgeStyle,
  nameToIcon,
  typeToIcon,
  ICON_SHEET_URL,
} from "@/components/shayul/equipmentIcons";

// Module-level cache. The sprite sheet is processed once via canvas to
// strip the white background (transparent PNG) and measure per-cell aspect
// ratio; the result is reused by every badge. Without this step the JPEG's
// white background inverts to an ugly black square on dark cards.
let cache = null; // { url, cellAspect }
let processingPromise = null;

function processSpriteSheet() {
  if (cache) return Promise.resolve(cache);
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
            // Pure white background → fully transparent.
            px[i + 3] = 0;
          } else if (lum >= 170) {
            // Anti-aliasing edges → fade out proportionally.
            const t = (235 - lum) / 65; // 0..1
            px[i + 3] = Math.round(t * 255);
          }
          // Darker pixels (black line art + label) stay fully opaque.
        }
        ctx.putImageData(data, 0, 0);
        const url = canvas.toDataURL("image/png");
        const cellAspect = (img.naturalWidth / 8) / (img.naturalHeight / 4);
        cache = { url, cellAspect };
        resolve(cache);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = ICON_SHEET_URL;
  });

  return processingPromise;
}

// Returns { url, cellAspect } once processed; falls back to the raw JPEG if
// canvas extraction fails (e.g., CORS-tainted pixels).
function useSprite() {
  const [state, setState] = useState(cache);
  useEffect(() => {
    if (cache) return;
    let active = true;
    processSpriteSheet()
      .then((s) => { if (active) setState(s); })
      .catch(() => { if (active) setState({ url: ICON_SHEET_URL, cellAspect: 0.78 }); });
    return () => { active = false; };
  }, []);
  return state;
}

// Icon + label badge for an equipment item. Pass either `name` (content.jsx
// equipment English name) or `type` (Equipment entity type enum). Renders the
// full sprite cell — line-art icon + capitalized label — with a transparent
// background, ready to drop on top of a dark card as a small logo.
export default function EquipmentBadge({
  name,
  type,
  width = 56,
  theme = "dark",
  className = "",
}) {
  const s = useSprite();
  const iconKey = type ? typeToIcon(type) : nameToIcon(name);

  if (!s) {
    // Sized placeholder while the sheet processes.
    return (
      <div
        aria-hidden
        className={`inline-block shrink-0 ${className}`}
        style={{ width, height: Math.round(width / 0.78) }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={getEquipmentBadgeStyle(iconKey, width, theme, s.url, s.cellAspect)}
    />
  );
}