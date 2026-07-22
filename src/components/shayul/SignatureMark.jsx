import React from "react";

/**
 * Calligraphic Arabic-feel ink signature rendered as a freehand SVG stroke —
 * NOT a readable name. Two distinct variants so client and provider each get
 * their own hand. Strokes tilt slightly and use a soft flourish + accent dots
 * to evoke the rhythms of Arabic script.
 */
const STROKES = [
  {
    main: "M6,34 C24,8 50,8 70,34 C82,54 102,54 116,32 C128,18 152,18 180,42",
    flourish: "M14,44 Q92,58 180,32",
    dot: { x: 174, y: 22 },
  },
  {
    main: "M6,28 C30,2 70,2 92,40 C104,56 134,56 148,28 C162,8 184,12 198,38",
    flourish: "M8,42 Q90,58 196,28",
    dots: [
      { x: 48, y: 16 },
      { x: 150, y: 14 },
    ],
  },
];

export default function SignatureMark({ variant = 0 }) {
  const s = STROKES[variant] || STROKES[0];
  return (
    <svg
      viewBox="0 0 210 55"
      aria-hidden="true"
      style={{ width: "140px", height: "auto", display: "inline-block" }}
    >
      <g stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={s.main} strokeWidth="2.6" />
        <path d={s.flourish} strokeWidth="1.1" opacity="0.7" />
      </g>
      <g fill="currentColor" stroke="none">
        {s.dot && <circle cx={s.dot.x} cy={s.dot.y} r="2.4" />}
        {s.dots &&
          s.dots.map((d, i) => <circle key={`d${i}`} cx={d.x} cy={d.y} r="1.9" />)}
      </g>
    </svg>
  );
}