import React from "react";
import Navbar from "@/components/shayul/Navbar";
import { LogOut } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Shared chrome for authenticated dashboard pages. Renders the global Navbar
// (always in solid mode) so the main layout stays identical whether the user
// is on the Client dashboard or the Provider dashboard — and the two
// permanent nav links ("/client-dashboard", "/provider-dashboard") are always present, letting
// users switch between their role-specific views without losing chrome.
// A thin sub-bar below the navbar carries the role label and (optionally) a
// logout action that the surrounding page passes in.
export default function DashboardChrome({ roleLabel, onLogout }) {
  const { lang } = useI18n();
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <Navbar scrolled />
      {/* spacer — Navbar is position:fixed, content must clear it */}
      <div className="h-16" />
      {(roleLabel || onLogout) && (
        <div className="bg-[#1C1917] border-b border-white/10 sticky top-16 z-20">
          <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
            {roleLabel && (
              <span className="text-white/60 text-xs font-bold tracking-widest uppercase">
                {roleLabel[lang]}
              </span>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-medium"
              >
                <LogOut size={14} /> {lang === "ar" ? "خروج" : "Logout"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}