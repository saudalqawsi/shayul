import React from "react";
import { Stamp, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { contract } from "@/lib/content";
import Riyal from "@/components/shayul/Riyal";

const crop = "absolute w-3 h-3 border-[#2b2b2b]";

export default function ContractPreview() {
  const { lang, dir } = useI18n();
  const v = contract.scopeValues;
  const ar = lang === "ar";

  return (
    <div className="relative" style={{ transform: "rotate(-0.6deg)" }}>
      {/* drop shadow / desk */}
      <div className="absolute inset-0 translate-y-2 translate-x-1 bg-black/50 blur-xl rounded-sm" />

      <div
        className="relative bg-[#f4ecd8] text-[#232023] rounded-sm overflow-hidden"
        style={{
          boxShadow: "0 18px 50px -12px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(0,0,0,0.05)",
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(120,90,40,0.06), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(120,90,40,0.05), transparent 55%)",
        }}
        dir={dir}
      >
        {/* crop registration marks */}
        <div className={`${crop} top-1 left-1 border-t border-l border-r-0 border-b-0`} />
        <div className={`${crop} top-1 right-1 border-t border-r border-l-0 border-b-0`} />
        <div className={`${crop} bottom-1 left-1 border-b border-l border-t-0 border-r-0`} />
        <div className={`${crop} bottom-1 right-1 border-b border-r border-t-0 border-l-0`} />

        {/* double legal border */}
        <div className="m-3 border border-[#232023]/35">
          <div className="m-1.5 border border-[#232023]/20">

            <div className="relative p-7 md:p-9">
              {/* watermark */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[#232023] font-black tracking-[0.2em] select-none"
                  style={{ fontSize: "4.5rem", opacity: 0.045, transform: "rotate(-22deg)", whiteSpace: "nowrap" }}
                >
                  {contract.watermark[lang]}
                </span>
              </div>

              {/* Letterhead */}
              <div className="relative flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-sm bg-[#1C1917] flex items-center justify-center">
                    <ShieldCheck size={18} className="text-[#F59E0B]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1C1917] text-base leading-none">{contract.logoText[lang]}</div>
                    <div className="text-[#232023]/45 text-[9px] mt-0.5 tracking-widest font-mono">HEAVY EQUIPMENT · KSA</div>
                  </div>
                </div>
                <div className="text-left" dir="ltr">
                  <div className="text-[10px] font-mono text-[#232023]/55">{contract.ref}</div>
                  <div className="text-[10px] font-mono text-[#232023]/55">{contract.serial.replace("{EN}", ar ? "AR" : "EN")}</div>
                  <div className="text-[9px] text-[#232023]/45 mt-0.5">{contract.dateLabel[lang]}: {contract.issueDate[lang]}</div>
                </div>
              </div>

              <div className="relative border-t-2 border-[#232023]/60 mb-1" />
              <div className="relative border-t border-[#232023]/60 mb-6" />

              {/* Notarized ribbon */}
              <div className="relative flex items-center justify-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#b91c1c]/60 bg-[#b91c1c]/8">
                  <Stamp size={12} className="text-[#b91c1c]" />
                  <span className="text-[#b91c1c] text-[10px] font-bold tracking-[0.25em]">{contract.seal[lang]}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="relative text-center font-bold text-[#1a1a1a] text-lg md:text-xl tracking-wide mb-1">
                {contract.title[lang]}
              </h3>
              <p className="relative text-center text-[#232023]/45 text-[10px] font-mono mb-7">
                {ar ? "المملكة العربية السعودية — وثيقة ملزمة للأطراف" : "Kingdom of Saudi Arabia — binding instrument"}
              </p>

              {/* Parties */}
              <div className="relative grid grid-cols-2 gap-5 mb-6">
                {[
                  { role: contract.client[lang], color: "#FCD34D" },
                  { role: contract.provider[lang], color: "#D97706" },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: p.color }}>
                      {p.role}
                    </div>
                    <div className="text-[11px] text-[#232023]/60 mb-5">______________________</div>
                  </div>
                ))}
              </div>

              {/* Scope table */}
              <div className="relative mb-6">
                <div className="text-[#232023]/55 text-[10px] font-bold tracking-widest uppercase mb-2">
                  {contract.scopeLabel[lang]}
                </div>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {[
                      [contract.equipmentLabel[lang], v.equipment[lang]],
                      [contract.qtyLabel[lang], String(v.qty)],
                      [contract.durationLabel[lang], v.duration[lang]],
                      [contract.locationLabel[lang], v.location[lang]],
                    ].map(([k, val], i) => (
                      <tr key={i} className="border-b border-[#232023]/15">
                        <td className="py-2.5 ps-3 pe-2 text-[#232023]/55 text-xs w-1/3 align-top">{k}</td>
                        <td className="py-2.5 pe-3 text-[#1a1a1a] font-medium text-sm">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Amounts */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center py-1.5 text-sm">
                  <span className="text-[#232023]/55">{contract.rateLabel[lang]}</span>
                  <span className="font-mono font-bold text-[#1a1a1a] inline-flex items-center gap-1">{v.rate[lang]} <Riyal size={11} light={false} /></span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-sm border-t-2 border-[#232023]/50">
                  <span className="text-[#232023]/70 font-bold">{contract.totalLabel[lang]}</span>
                  <span className="font-mono font-bold text-[#1C1917] inline-flex items-center gap-1">{v.total[lang]} <Riyal size={12} light={false} /></span>
                </div>
              </div>

              {/* Terms */}
              <ol className="relative mb-7 space-y-2.5">
                {contract.terms.map((t, i) => (
                  <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-[#232023]/70">
                    <span className="font-mono font-bold text-[#1C1917] flex-shrink-0">{ar ? ["١","٢"][i] : i + 1}.</span>
                    <span>{t[lang]}</span>
                  </li>
                ))}
              </ol>

              {/* Signatures + notary stamp */}
              <div className="relative grid grid-cols-2 gap-8 pt-10 mt-4">
                {[
                  contract.clientSign[lang],
                  contract.providerSign[lang],
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[#232023]/40 text-sm mb-1" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                      {ar ? "签字" : "signed"}
                    </div>
                    <div className="border-t border-[#232023]/70 mx-4" />
                    <div className="text-[#232023]/55 text-[11px] mt-1.5">{s}</div>
                  </div>
                ))}

                {/* circular notary stamp overlapping bottom */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-20 h-20 rounded-full border-2 border-[#b91c1c]/70 flex flex-col items-center justify-center text-[#b91c1c] bg-[#f4ecd8]"
                  style={{ transform: "translate(-50%, 10px) rotate(8deg)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <Stamp size={16} />
                  <span className="text-[8px] font-bold tracking-[0.15em] mt-0.5">{contract.seal[lang]}</span>
                  <span className="text-[7px] font-mono opacity-70">{contract.ref}</span>
                </div>
              </div>

              {/* footer microprint */}
              <div
                className="relative mt-10 pt-3 border-t border-[#232023]/20 text-center text-[#232023]/30 text-[8px] tracking-widest font-mono"
                style={{ letterSpacing: "0.15em" }}
              >
                {ar ? "هذه وثيقة موثّقة إلكترونياً · شيول · SHAYWAL" : "ELECTRONICALLY NOTARIZED INSTRUMENT · SHAYWAL"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}