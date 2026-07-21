// Central heavy-equipment icon badge library.
//
// Source: a single JPEG sprite sheet, 4 rows × 8 cols = 32 cells. Each cell
// holds a black line-art icon above a capitalized text label — we use ONLY
// the icon (top portion of each cell); the label is cropped out at canvas
// time. The white JPEG background is stripped client-side via canvas
// chroma-keying (see EquipmentBadge.jsx) so the result renders as a clean
// masked shape. CSS `mask` then "paints" the icon shape in the brand amber,
// so the badge reads as a one-color logo over any background.

export const ICON_SHEET_URL =
  "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/b85c32fd8_IMG_4408.jpeg";

export const ICON_GRID = { rows: 4, cols: 8 };

// Icon fraction of each cell height that is the icon (rest is label).
export const ICON_FRACTION = 0.6;

// 0-indexed (row, col) positions inside the sprite sheet.
export const EQUIPMENT_ICONS = {
  backhoe: { row: 0, col: 0 },
  motorGrader: { row: 0, col: 1 },
  drillingExcavator: { row: 0, col: 2 },
  forestryMachine: { row: 0, col: 3 },
  mobileCrane: { row: 0, col: 4 },
  mobileCrane2: { row: 0, col: 5 },
  dozer: { row: 0, col: 6 },
  dozer2: { row: 0, col: 7 },
  waterTank: { row: 1, col: 0 },
  tractor: { row: 1, col: 1 },
  demolitionCrane: { row: 1, col: 2 },
  farmingTractor: { row: 1, col: 3 },
  constructionTruck: { row: 1, col: 4 },
  railwayTanker: { row: 1, col: 5 },
  dozerTracked: { row: 1, col: 6 },
  dumpTruck: { row: 1, col: 7 },
  asphaltRoller: { row: 2, col: 0 },
  loader: { row: 2, col: 1 },
  excavator: { row: 2, col: 2 },
  concreteMixer: { row: 2, col: 3 },
  forklift: { row: 2, col: 4 },
  telehandler: { row: 2, col: 5 },
  crawlerCrane: { row: 2, col: 6 },
  scissorsLift: { row: 2, col: 7 },
  bulldozer: { row: 3, col: 0 },
  miniLoader: { row: 3, col: 1 },
  truck: { row: 3, col: 2 },
  truck2: { row: 3, col: 3 },
  truck3: { row: 3, col: 4 },
  towTruck: { row: 3, col: 5 },
  tractor2: { row: 3, col: 6 },
  generator: { row: 3, col: 7 },
};

// Match a content.jsx equipment English name to its icon key.
export function nameToIcon(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("grader")) return "motorGrader";
  if (n.includes("backhoe")) return "backhoe";
  if (n.includes("forklift")) return "forklift";
  if (n.includes("crusher")) return "excavator";
  if (n.includes("excavator") || n === "بوكلين") return "excavator";
  if (n.includes("bulldozer") || n.includes("dozer")) return "bulldozer";
  if (n.includes("telehandler")) return "telehandler";
  if (n.includes("roller") || n.includes("vibratory")) return "asphaltRoller";
  if (n.includes("crane")) return "mobileCrane";
  if (n.includes("bobcat")) return "miniLoader";
  if (n.includes("dump")) return "dumpTruck";
  if (n.includes("truck")) return "dumpTruck";
  if (n.includes("tractor")) return "tractor";
  if (n.includes("generator")) return "generator";
  if (n.includes("water")) return "waterTank";
  if (n.includes("mixer")) return "concreteMixer";
  if (n.includes("scissors")) return "scissorsLift";
  if (n.includes("loader")) return "loader";
  return "truck";
}

// Match an Equipment entity `type` field (Wheel Loader, Backhoe Loader, …).
export function typeToIcon(type) {
  const t = (type || "").toLowerCase();
  if (t.includes("loader")) return "loader";
  if (t.includes("backhoe")) return "backhoe";
  if (t.includes("bobcat")) return "miniLoader";
  if (t.includes("forklift")) return "forklift";
  if (t.includes("grader")) return "motorGrader";
  if (t.includes("bulldozer")) return "bulldozer";
  if (t.includes("roller")) return "asphaltRoller";
  if (t.includes("truck")) return "dumpTruck";
  if (t.includes("telehandler")) return "telehandler";
  if (t.includes("crane")) return "mobileCrane";
  if (t.includes("excavator")) return "excavator";
  return "truck";
}

// Returns the inline-style object that paints the icon shape in `color` using
// the cached transparent PNG as a CSS mask. `url` is the chroma-keyed,
// label-cropped sheet produced in EquipmentBadge.jsx; `cellAspect`
// (icon-cell width / height) sets the natural icon proportions so the icon
// isn't squished.
export function getEquipmentBadgeStyle(
  iconKey,
  width,
  url,
  cellAspect = 0.83,
  color = "#D97706"
) {
  const key = EQUIPMENT_ICONS[iconKey] ? iconKey : "truck";
  const pos = EQUIPMENT_ICONS[key];
  const { cols, rows } = ICON_GRID;
  const xPct = (pos.col / (cols - 1)) * 100;
  const yPct = (pos.row / (rows - 1)) * 100;
  const w = Math.max(14, Math.round(width));
  const h = Math.max(14, Math.round(width / Math.max(cellAspect, 0.1)));
  return {
    width: `${w}px`,
    height: `${h}px`,
    backgroundColor: color,
    WebkitMaskImage: `url('${url}')`,
    WebkitMaskSize: `${cols * 100}% ${rows * 100}%`,
    WebkitMaskPosition: `${xPct}% ${yPct}%`,
    WebkitMaskRepeat: "no-repeat",
    maskImage: `url('${url}')`,
    maskSize: `${cols * 100}% ${rows * 100}%`,
    maskPosition: `${xPct}% ${yPct}%`,
    maskRepeat: "no-repeat",
  };
}