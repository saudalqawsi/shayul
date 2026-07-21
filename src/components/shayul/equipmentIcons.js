// Central heavy-equipment icon+label badge library.
//
// Source: a single JPEG sprite sheet, 4 rows × 8 cols = 32 cells. Each cell
// holds a black line-art icon centered above a capitalized text label — we
// use the WHOLE cell as one composite badge ("icon + label"), not the icon
// half alone. The white JPEG background is stripped client-side via canvas
// chroma-keying (see EquipmentBadge.jsx) so the result reads as a logo.

export const ICON_SHEET_URL =
  "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/b85c32fd8_IMG_4408.jpeg";

export const ICON_GRID = { rows: 4, cols: 8 };

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

// Whole-cell (icon + label) background style. `url` is expected to be a
// background-stripped transparent PNG produced once in EquipmentBadge.jsx;
// `cellAspect` (cell width / cell height) lets the badge keep natural
// proportions so neither the icon nor the label gets squished.
export function getEquipmentBadgeStyle(iconKey, width, theme, url, cellAspect) {
  const key = EQUIPMENT_ICONS[iconKey] ? iconKey : "truck";
  const pos = EQUIPMENT_ICONS[key];
  const { cols, rows } = ICON_GRID;
  const xPct = (pos.col / (cols - 1)) * 100;
  const yPct = (pos.row / (rows - 1)) * 100;
  const w = Math.max(24, Math.round(width));
  const h = Math.max(24, Math.round(width / Math.max(cellAspect || 0.78, 0.1)));
  const style = {
    width: `${w}px`,
    height: `${h}px`,
    backgroundImage: `url('${url}')`,
    backgroundSize: `${cols * 100}% ${rows * 100}%`,
    backgroundPosition: `${xPct}% ${yPct}%`,
    backgroundRepeat: "no-repeat",
  };
  if (theme === "dark") {
    // Source is black-on-white. Invert flips the line work to white so it
    // reads cleanly against dark cards. Transparent pixels stay transparent.
    style.filter = "invert(1)";
  }
  return style;
}