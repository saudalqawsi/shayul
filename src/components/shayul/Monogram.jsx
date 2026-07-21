import React from "react";

/**
 * Shaywal mark — an isolated wheel-loader logo (transparent background).
 */
const LOGO_URL =
  "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/f6085f55f_generated_image.png";

export default function Monogram({ size = 36, className = "" }) {
  return (
    <img
      src={LOGO_URL}
      alt="Shaywal"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}