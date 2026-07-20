import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "المعدات", href: "#equipment" },
    { label: "كيف يعمل", href: "#how" },
    { label: "الأسعار", href: "#pricing" },
    { label: "تواصل معنا", href: "#request" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A1A30]/95 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#009466] rounded-sm flex items-center justify-center font-bold text-white text-xl leading-none">
            S
          </div>
          <span className="font-bold text-white text-xl tracking-wide">شيول</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#request"
          className="hidden md:flex items-center gap-2 bg-[#009466] hover:bg-[#007a54] text-white px-5 py-2.5 rounded-sm text-sm font-bold transition-colors duration-200"
        >
          <span>احجز المعدة</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A1A30] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-white text-base py-1 border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#request"
            onClick={() => setMenuOpen(false)}
            className="bg-[#009466] text-white py-3 text-center rounded-sm font-bold mt-2"
          >
            احجز المعدة
          </a>
        </div>
      )}
    </nav>
  );
}