import React, { useEffect, useState } from "react";

/**
 * Shaywal mark — the realistic wheel-loader image with its white background
 * removed at runtime (canvas chroma-key), so it floats transparent on the
 * navbar instead of sitting in a white rectangle.
 */
const LOGO_URL =
  "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/3fe742fa8_image.png";
const MAX_DIM = 360;

export default function Monogram({ size = 40, className = "" }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const cap = Math.max(1, img.naturalWidth || MAX_DIM);
        const scale = Math.min(1, MAX_DIM / cap);
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const im = ctx.getImageData(0, 0, w, h);
        const d = im.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          if (r > 238 && g > 238 && b > 238) {
            d[i + 3] = 0; // white -> transparent
          } else if (r > 210 && g > 210 && b > 210) {
            // soft anti-alias edge
            const m = Math.max(r, g, b);
            d[i + 3] = Math.round(255 * Math.max(0, (238 - m) / 28));
          }
        }
        ctx.putImageData(im, 0, 0);
        if (!cancelled) setSrc(canvas.toDataURL("image/png"));
      } catch {
        // tainted canvas — fall back to original image
        if (!cancelled) setSrc(LOGO_URL);
      }
    };
    img.onerror = () => !cancelled && setSrc(LOGO_URL);
    img.src = LOGO_URL;
    return () => {
      cancelled = true;
    };
  }, []);

  if (!src) {
    return <span className={className} style={{ width: size, height: size, display: "inline-block" }} aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt="Shaywal"
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}