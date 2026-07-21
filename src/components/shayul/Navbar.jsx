import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import Monogram from "@/components/shayul/Monogram";
import { navLinks, logo, navCta, langToggle } from "@/lib/content";

export default function Navbar({ scrolled }) {
  const { lang, toggle, dir } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A1A30]/95 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Monogram size={36} />
          <span className="font-bold text-white text-xl tracking-wide">{logo[lang]}</span>
        </a>

        {/* Desktop Nav — links + inline language toggle */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 tracking-wide"
            >
              {l.label[lang]}
            </a>
          ))}
          <button
            onClick={toggle}
            className="text-white/60 hover:text-white text-xs font-bold transition-colors border-s border-white/10 ps-4 flex items-center"
            aria-label="Toggle language"
          >
            <span className="font-mono">{langToggle[lang]}</span>
          </button>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#request"
            className="hidden md:flex items-center gap-2 bg-[#009466] hover:bg-[#007a54] text-white px-5 py-2.5 rounded-sm text-sm font-bold transition-colors duration-200"
          >
            <span>{navCta[lang]}</span>
          </a>
        </div>

        {/* Mobile Lang Toggle + Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-white/70 hover:text-white text-xs font-bold transition-colors border border-white/15 rounded-sm px-2.5 py-1.5 flex items-center"
            aria-label="Toggle language"
          >
            <span className="font-mono">{langToggle[lang]}</span>
          </button>
          <button
            className="text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A1A30] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-white text-base py-1 border-b border-white/5"
            >
              {l.label[lang]}
            </a>
          ))}
          <a
            href="#request"
            onClick={() => setMenuOpen(false)}
            className="bg-[#009466] text-white py-3 text-center rounded-sm font-bold mt-2"
          >
            {navCta[lang]}
          </a>
        </div>
      )}
    </nav>
  );
}