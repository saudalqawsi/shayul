import React from "react";
import { FileText, Stamp, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { contract } from "@/lib/content";

export default function ContractPreview() {
  const { lang, dir } = useI18n();
  const v = contract.scopeValues;

  return (
    <div className="relative rounded-sm border border-white/10 bg-[#0c1e34] overflow-hidden shadow-2xl" dir={dir}>
      {/* document window bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#081626]">
        <div className="flex items-center gap-2 text-white/70 text-xs font-mono">
          <FileText size={14} className="text-[#009466]" />
          {contract.ref}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#009466]/15 border border-[#009466]/40">
          <ShieldCheck size={12} className="text-[#009466]" />
          <span className="text-[#009466] text-[10px] font-bold tracking-widest">{contract.seal[lang]}</span>
        </div>
      </div>

      <div className="p-6 relative">
        {/* watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <span className="text-white font-bold tracking-widest" style={{ fontSize: "5rem", transform: "rotate(-18deg)" }}>
            {contract.watermark[lang]}
          </span>
        </div>

        <h3 className="relative text-white font-bold text-lg text-center mb-1">{contract.title[lang]}</h3>
        <div className="relative text-center text-white/30 text-xs font-mono mb-6">{contract.ref}</div>

        {/* parties */}
        <div className="relative grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white/4 border border-white/10 rounded-sm p-3">
            <div className="text-[#0696B0] text-[10px] font-bold tracking-widest uppercase mb-3">{contract.client[lang]}</div>
            <div className="border-t border-white/25 w-3/4 mb-2" />
            <div className="text-white/30 text-[11px]">___________</div>
          </div>
          <div className="bg-white/4 border border-white/10 rounded-sm p-3">
            <div className="text-[#009466] text-[10px] font-bold tracking-widest uppercase mb-3">{contract.provider[lang]}</div>
            <div className="border-t border-white/25 w-3/4 mb-2" />
            <div className="text-white/30 text-[11px]">___________</div>
          </div>
        </div>

        {/* scope */}
        <div className="relative border-t border-dashed border-white/10 pt-4 mb-4">
          <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3">{contract.scopeLabel[lang]}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <div className="text-white/30 text-[11px]">{contract.equipmentLabel[lang]}</div>
              <div className="text-white font-medium">{v.equipment[lang]}</div>
            </div>
            <div>
              <div className="text-white/30 text-[11px]">{contract.qtyLabel[lang]}</div>
              <div className="text-white font-medium">{v.qty}</div>
            </div>
            <div>
              <div className="text-white/30 text-[11px]">{contract.durationLabel[lang]}</div>
              <div className="text-white font-medium">{v.duration[lang]}</div>
            </div>
            <div>
              <div className="text-white/30 text-[11px]">{contract.locationLabel[lang]}</div>
              <div className="text-white font-medium">{v.location[lang]}</div>
            </div>
          </div>
        </div>

        {/* price */}
        <div className="relative border-t border-dashed border-white/10 pt-4 mb-5">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-white/40">{contract.rateLabel[lang]}</span>
            <span className="text-white font-mono font-bold">{v.rate[lang]}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/40">{contract.totalLabel[lang]}</span>
            <span className="text-[#009466] font-mono font-bold">{v.total[lang]}</span>
          </div>
        </div>

        {/* terms */}
        <ul className="relative border-t border-dashed border-white/10 pt-4 space-y-2 mb-5">
          {contract.terms.map((t, i) => (
            <li key={i} className="text-white/45 text-xs leading-relaxed flex gap-2">
              <span className="text-[#0696B0]">•</span>
              <span>{t[lang]}</span>
            </li>
          ))}
        </ul>

        {/* signatures */}
        <div className="relative grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
          <div>
            <div className="text-white/30 text-[11px] mb-6">{contract.clientSign[lang]}</div>
            <div className="border-t border-white/30 w-3/4" />
          </div>
          <div>
            <div className="text-white/30 text-[11px] mb-6">{contract.providerSign[lang]}</div>
            <div className="border-t border-white/30 w-3/4" />
          </div>
        </div>

        {/* notary seal */}
        <div className="relative flex justify-end mt-5">
          <div
            className="w-16 h-16 rounded-full border-2 border-[#D4A537]/60 flex flex-col items-center justify-center text-[#D4A537]"
            style={{ transform: "rotate(-8deg)" }}
          >
            <Stamp size={18} />
            <span className="text-[8px] font-bold tracking-widest mt-1">{contract.seal[lang]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}