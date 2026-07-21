import React, { useState, useEffect } from "react";
import {
  EQUIPMENT_ICONS,
  getEquipmentBadgeStyle,
  nameToIcon,
  typeToIcon,
  ICON_SHEET_URL,
  ICON_GRID,
  ICON_FRACTION,
} from "@/components/shayul/equipmentIcons";

// Module-level cache. The sprite sheet is processed once via canvas:
//   1. Each row's icon area (top ICON_FRACTION of every cell, label cropped
//      out) is copied to a compact strip sheet.
//   2. White pixels are keyed transparent (chroma-key) so non-line pixels
//      pass cleanly through CSS mask.
// The resulting transparent PNG + cell aspect are reused by every badge.
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
        const W = img.naturalWidth;
        const H = img.naturalHeight;
        const cols = ICON_GRID.cols;
        const rows = ICON_GRID.rows;
        const cellW = W / cols;
        const cellH = H / rows;
        const cutH = cellH * ICON_FRACTION; // icon-only height per cell
        const newH = cutH * rows;          // compact sheet (no label rows)

        const out = document.createElement("canvas");
        out.width = W;
        out.height = newH;
        const ctx = out.getContext("2d", { willReadFrequently: true });

        // Copy each row's icon area into the compact sheet, preserving the
        // same column layout so the existing sprite math still applies.
        for (let r = 0; r < rows; r++) {
          ctx.drawImage(
            img,
            0, r * cellH, W, cutH,         // source: icon-only strip of row r
            0, r * cutH, W, cutH           // dest: same width, packed height
          );
        }

        // Chroma-key: white → transparent (with anti-alias fade).
        const data = ctx.getImageData(0, 0, W, newH);
        const px = data.data;
        for (let i = 0; i < px.length; i += 4) {
          const rr = px[i], gg = px[i + 1], bb = px[i + 2];
          const lum = rr * 0.299 + gg * 0.587 + bb * 0.114;
          if (lum >= 235) {
            px[i + 3] = 0; // pure white → fully transparent
          } else if (lum >= 170) {
            const t = (235 - lum) / 65; // 0..1
            px[i + 3] = Math.round(t * 255); // edge anti-alias → fade
          }
          // darker pixels (line art) stay fully opaque
        }
        ctx.putImageData(data, 0, 0);

        const url = out.toDataURL("image/png");
        const cellAspect = cellW / cutH; // icon-cell width / height
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
// canvas extraction fails (e.g. CORS-tainted pixels). With the fallback the
// mask shows the whole sheet area — acceptable degradation, not the norm.
function useSprite() {
  const [state, setState] = useState(cache);
  useEffect(() => {
    if (cache) return;
    let active = true;
    processSpriteSheet()
      .then((s) => { if (active) setState(s); })
      .catch(() => { if (active) setState({ url: ICON_SHEET_URL, cellAspect: 0.83 }); });
    return () => { active = false; };
  }, []);
  return state;
}

// Single-color icon badge for an equipment item. Pass either `name`
// (content.jsx equipment English name) or `type` (Equipment entity type
// enum). The icon shape is painted in `color` (defaults to brand amber)
// via CSS mask, on a transparent background — sits cleanly over any card.
export default function EquipmentBadge({
  name,
  type,
  width = 32,
  color = "#D97706",
  className = "",
}) {
  const s = useSprite();
  const iconKey = type ? typeToIcon(type) : nameToIcon(name);

  if (!s) {
    // Sized placeholder while the sheet processes.
    return (
      <div
        aria-hidden
        className={`inline-block shrink-0 rounded-sm ${className}`}
        style={{
          width,
          height: Math.round(width / 0.83),
          backgroundColor: color,
          opacity: 0.22,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={getEquipmentBadgeStyle(iconKey, width, s.url, s.cellAspect, color)}
    />
  );
}