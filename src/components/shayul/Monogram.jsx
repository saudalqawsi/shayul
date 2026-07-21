import React from "react";

/**
 * Shaywal monogram lockup — a typographic "S" mark with an industrial
 * chevron accent (loader-bucket inspiration), not a photo.
 */
export default function Monogram({ size = 36, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-[#009466] rounded-sm ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 36 36"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* S path — bold, slightly industrial cut on the spine */}
        <path
          d="M26 12.5C26 9.46 23.76 7 20 7H15C11.13 7 8.5 9.13 8.5 12.3C8.5 15.2 10.8 16.7 14 17.5L20 19C23.2 19.8 25.5 20.3 25.5 23.2C25.5 26.4 22.87 28.5 19 28.5H14C10.24 28.5 8 26.04 8 23"
          stroke="#ffffff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* chevron accent — loader bucket nod */}
        <path
          d="M9.5 23.5L13 21L16.5 23.5"
          stroke="#0A1A30"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}