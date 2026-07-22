import React from "react";
import { Shield, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { footer } from "@/lib/content";
import Monogram from "@/components/shayul/Monogram";

export default function FooterSection() {
  const { lang, dir } = useI18n();

  return (
    <footer className="bg-[#0C0A09] border-t border-white/10 pt-16 pb-8" dir={dir}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Monogram size={40} />
              <div>
                <div className="text-white font-bold text-xl">{footer.brand[lang]}</div>
                <div className="text-white/30 text-xs tracking-widest">{footer.brandEn[lang]}</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">{footer.desc[lang]}</p>
            <div className="flex items-center gap-2 bg-[#D97706]/10 border border-[#D97706]/30 rounded-sm px-4 py-2.5 w-fit">
              <Shield size={14} className="text-[#D97706]" />
              <span className="text-[#D97706] text-sm font-bold">{footer.badge[lang]}</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">{footer.platformTitle[lang]}</h4>
            <ul className="space-y-3">
              {footer.platformLinks[lang].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">{footer.contactTitle[lang]}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin size={14} className="text-[#D97706] flex-shrink-0" />
                {footer.location[lang]}
              </li>
              <li>
                <a href="https://shayul.com" className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
                  <span className="text-[#D97706] text-xs font-mono">WWW</span>
                  shayul.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hairline */}
        <div className="h-px bg-white/8 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">{footer.copyright[lang]}</p>
          <div className="flex gap-6">
            {footer.legal[lang].map((l) => (
              <a key={l} href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-white/15 text-xs font-mono tracking-widest">
            SHAYWAL · {footer.tagline[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}