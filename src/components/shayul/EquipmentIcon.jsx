import React from "react";
import {
  EQUIPMENT_ICONS,
  getEquipmentIconStyle,
  nameToIcon,
  typeToIcon,
} from "@/components/shayul/equipmentIcons";

// Compact, theme-aware thumbnail that displays a single equipment symbol from
// the sprite sheet. Pass either `name` (content.jsx equipment name) or `type`
// (Equipment entity type enum) — the icon resolves automatically. No label.
export default function EquipmentIcon({
  name,
  type,
  size = 28,
  theme = "dark",
  className = "",
}) {
  const iconKey = type ? typeToIcon(type) : nameToIcon(name);
  return (
    <div
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={getEquipmentIconStyle(iconKey, size, theme)}
    />
  );
}

// Render an unordered, de-duplicated set of icon keys — used by provider cards
// to show the equipment kinds they offer without text labels.
export function EquipmentIconRow({
  iconKeys,
  size = 24,
  theme = "dark",
  className = "",
}) {
  const unique = [...new Set(iconKeys || [])].filter((k) => EQUIPMENT_ICONS[k]);
  if (!unique.length) return null;
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {unique.map((k) => (
        <div
          key={k}
          aria-hidden
          style={getEquipmentIconStyle(k, size, theme)}
          className="inline-block shrink-0"
        />
      ))}
    </div>
  );
}