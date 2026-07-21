import React, { useState } from "react";
import { Truck, Building2, Inbox } from "lucide-react";

const TYPE_AR = {
  "Wheel Loader": "شيول / لودر",
  "Backhoe Loader": "حفارة / باك لودر",
  "Bobcat": "بوبكات",
  "Forklift Truck": "بوكلين",
  "Motor Grader": "قريدر",
  "Bulldozer": "بلدوزر",
  "Vibratory Roller": "رصاصة / دكاكة",
  "Dump Truck": "قالب / شاحنة",
  "Telehandler": "فوركلفت",
  "Crane": "كرين",
  "Other": "أخرى",
};

const STATUS_AR = {
  available: { label: "متاحة", chip: "bg-[#009466]/10 text-[#009466] border-[#009466]/30" },
  rented: { label: "مؤجّرة", chip: "bg-[#0696B0]/10 text-[#0696B0] border-[#0696B0]/30" },
  maintenance: { label: "صيانة", chip: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
};

export default function PlatformFleet({ equipment, providers }) {
  const [filter, setFilter] = useState("all");
  const providerName = (id) =>
    providers.find((p) => p.id === id)?.company_name || (id ? `#${String(id).slice(-6)}` : "—");

  const list = filter === "all" ? equipment : equipment.filter((e) => e.status === filter);

  return (
    <div dir="rtl">
      <div className="flex gap-2 mb-5 flex-wrap">
        {["all", "available", "rented", "maintenance"].map((v) => {
          const label = v === "all" ? "الكل" : STATUS_AR[v].label;
          const count = v === "all" ? equipment.length : equipment.filter((e) => e.status === v).length;
          return (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold border transition-colors ${
                filter === v ? "bg-[#D4A537] border-[#D4A537] text-[#0A1A30]" : "bg-white/5 border-white/10 text-white/55 hover:text-white"
              }`}
            >
              {label} <span className="opacity-60 font-mono">{count}</span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="bg-[#0A1A30] border border-white/10 border-dashed rounded-sm py-14 text-center">
          <Inbox size={28} className="text-white/25 mx-auto mb-2" />
          <p className="text-white/45 text-sm">لا معدات في هذه الحالة.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-white/10">
          <table className="w-full text-sm min-w-[36rem]">
            <thead className="bg-white/5 text-white/50 text-xs">
              <tr>
                <th className="text-start font-bold px-4 py-3">المعدة</th>
                <th className="text-start font-bold px-4 py-3">المزوّد</th>
                <th className="text-start font-bold px-4 py-3">الحالة</th>
                <th className="text-start font-bold px-4 py-3">اليومي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {list.map((eq) => {
                const st = STATUS_AR[eq.status] || STATUS_AR.available;
                return (
                  <tr key={eq.id} className="hover:bg-white/3">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Truck size={14} className="text-white/40" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">{eq.name}</div>
                          <div className="text-white/35 text-[11px]">{TYPE_AR[eq.type] || eq.type}{eq.size_spec ? ` · ${eq.size_spec}` : ""}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/60">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={13} className="text-white/35" /> {providerName(eq.provider_id)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${st.chip}`}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-white font-mono">{eq.daily_rate} <span className="text-white/35 text-xs">ر.س</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}