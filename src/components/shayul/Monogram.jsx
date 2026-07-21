import React from "react";

/**
 * Shaywal mark — a simple, abstracted wheel-loader silhouette
 * (body, cab, boom+bucket, wheels) rendered in white on brand green.
 */
export default function Monogram({ size = 36, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-[#009466] rounded-md ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 36 36" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* wheels (drawn first — chassis covers their tops) */}
        <circle cx="12" cy="30" r="3" fill="#ffffff" />
        <circle cx="12" cy="30" r="1.1" fill="#009466" />
        <circle cx="25" cy="30" r="3" fill="#ffffff" />
        <circle cx="25" cy="30" r="1.1" fill="#009466" />

        {/* chassis */}
        <rect x="7" y="22" width="22" height="6" rx="2" fill="#ffffff" />

        {/* cab */}
        <rect x="8" y="13.5" width="8" height="8.5" rx="2" fill="#ffffff" />
        {/* cab window cutout */}
        <rect x="10" y="15.5" width="4" height="4.5" rx="1" fill="#009466" />

        {/* boom arm */}
        <path d="M19 22 L29 15 L30.3 16.3 L20 23 Z" fill="#ffffff" />

        {/* bucket */}
        <path d="M29 12.5 L33 11.5 L33.8 18 L30 18.7 Z" fill="#ffffff" />
      </svg>
    </span>
  );
}