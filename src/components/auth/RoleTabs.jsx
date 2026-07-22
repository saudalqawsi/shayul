import React from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const ROLE_TABS = [
  { value: "client", label: { ar: "عميل", en: "Client" } },
  { value: "provider", label: { ar: "مزوّد", en: "Provider" } },
  { value: "platform", label: { ar: "المنصة", en: "Platform" } },
];

export default function RoleTabs({ role, onChange }) {
  const { lang } = useI18n();
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
          {t.label[lang]}
        </button>
      ))}
    </div>
  );
}