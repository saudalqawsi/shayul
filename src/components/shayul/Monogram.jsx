import React from "react";

/**
 * Shaywal mark — a wheel-loader silhouette as inline SVG.
 * No background: fully transparent everywhere the machine isn't.
 */
export default function Monogram({ size = 40, className = "" }) {
  return (
    <svg
      viewBox="0 0 48 36"
      width={size}
      height={size * (36 / 48)}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="#009466">
        {/* rear tire */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 21a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z"
        />
        {/* front tire */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34 21a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z"
        />
        {/* chassis + cab */}
        <path d="M7 21 L7 11 L11 9 L21 9 L24 12 L26 14 L36 18 L36 21 Z" />
        {/* boom arm */}
        <path d="M33 18 L45 8 L47 9.2 L35 19.2 Z" />
        {/* bucket */}
        <path d="M43.5 7 L50.5 5 L51.5 14 L45.5 16 Z" />
      </g>
    </svg>
  );
}