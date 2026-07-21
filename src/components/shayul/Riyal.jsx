import React from "react";

/**
 * Saudi Riyal symbol — official mark, rendered inline next to figures.
 */
const SYMBOL_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Saudi_Riyal_Symbol.svg/960px-Saudi_Riyal_Symbol.svg.png";

export default function Riyal({ size = 14, className = "" }) {
  return (
    <img
      src={SYMBOL_URL}
      alt="ريال سعودي"
      className={`inline-block object-contain ${className}`}
      style={{ height: size, width: "auto", verticalAlign: "-0.18em" }}
      aria-hidden="true"
    />
  );
}