import React from "react";
import { cn } from "@/lib/utils";

const ROLE_TABS = [
  { value: "client", label: "Client" },
  { value: "provider", label: "Provider" },
  { value: "platform", label: "Platform" },
];

export default function RoleTabs({ role, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg mb-6" role="tablist">
      {ROLE_TABS.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={role === t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "flex-1 py-2 rounded-md text-xs font-medium transition-colors",
            role === t.value
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}