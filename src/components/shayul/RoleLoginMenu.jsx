import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogIn, HardHat, Building2, ShieldCheck, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/**
 * Role login — one subtle entry point for the platform's three user types
 * (client / provider / platform manager). Rendered inside the navbar so it
 * inherits the navbar's stacking context (no z-index wars with page sections).
 *
 * Two variants:
 *  - "dropdown" (default, desktop): a small "Log in" text trigger that opens
 *    a card listing the three account types, each routing to /login?from=/<role>-dashboard.
 *  - "expanded" (mobile menu): the three role links shown inline — no trigger,
 *    no dropdown — because the mobile menu already provides the expansion.
 */
const ROLES = [
  {
    key: "client",
    icon: HardHat,
    from: "/client-dashboard",
    title: { ar: "العميل", en: "Client" },
    desc: { ar: "تتبّع طلبات تأجير المعدات الخاصة بك", en: "Track your equipment rental requests" },
  },
  {
    key: "provider",
    icon: Building2,
    from: "/provider-dashboard",
    title: { ar: "المزوّد", en: "Provider" },
    desc: { ar: "إدارة معداتك والطلبات الواردة", en: "Manage your fleet & incoming requests" },
  },
  {
    key: "platform",
    icon: ShieldCheck,
    from: "/platform-dashboard",
    title: { ar: "مدير المنصة", en: "Platform Manager" },
    desc: { ar: "الإشراف على المنصة بأكملها", en: "Oversee the entire platform" },
  },
];

export default function RoleLoginMenu({ variant = "dropdown" }) {
  const { lang, dir } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close the dropdown on any outside click — standard disclosure pattern.
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Mobile menu variant — flat list of role links, no dropdown machinery.
  if (variant === "expanded") {
    return (
      <div className="flex flex-col" dir={dir}>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.18em] font-bold mb-2">
          {lang === "ar" ? "تسجيل الدخول" : "Log in"}
        </p>
        {ROLES.map((r) => {
          const Icon = r.icon;
          return (
            <Link
              key={r.key}
              to={`/login?from=${r.from}`}
              className="flex items-center gap-3 py-2 border-b border-white/5 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Icon size={16} className="text-[#FCD34D]" />
              <span className="font-medium">{r.title[lang]}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative" dir={dir}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 tracking-wide"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <LogIn size={15} />
        <span>{lang === "ar" ? "تسجيل الدخول" : "Log in"}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-3 w-72 bg-[#0C0A09] border border-white/10 rounded-sm overflow-hidden"
          style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}
        >
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#D97706] font-bold">
              {lang === "ar" ? "تسجيل الدخول" : "Sign in"}
            </p>
            <p className="text-white/45 text-xs mt-1 leading-relaxed">
              {lang === "ar" ? "اختر نوع الحساب للمتابعة" : "Choose an account type to continue"}
            </p>
          </div>
          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.key}
                to={`/login?from=${r.from}`}
                onClick={() => setOpen(false)}
                role="menuitem"
                className={`group flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                  i < ROLES.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#FCD34D] group-hover:border-[#FCD34D]/40 transition-colors shrink-0">
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white">{r.title[lang]}</p>
                  <p className="text-white/45 text-xs leading-relaxed mt-0.5">{r.desc[lang]}</p>
                </div>
              </Link>
            );
          })}
          <div className="px-4 py-2.5 border-t border-white/5 bg-black/30">
            <p className="text-white/25 text-[10px] text-center leading-relaxed">
              {lang === "ar" ? "كل دور يصل بك إلى لوحته المخصصة" : "Each role routes to its dedicated dashboard"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}