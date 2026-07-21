import React from "react";
import { Link } from "react-router-dom";
import { Building2, MapPin, Truck, ArrowLeft, Inbox } from "lucide-react";
import StarBadge from "@/components/StarBadge";

export default function PlatformProviders({ providers, equipment, requests }) {
  const fleetMap = {};
  (equipment || []).forEach((e) => {
    if (e.provider_id) {
      if (!fleetMap[e.provider_id]) fleetMap[e.provider_id] = { total: 0, available: 0 };
      fleetMap[e.provider_id].total++;
      if (e.status === "available") fleetMap[e.provider_id].available++;
    }
  });
  const ratingMap = {};
  (requests || []).forEach((r) => {
    if (r.provider_id && r.rating && r.rating > 0) {
      if (!ratingMap[r.provider_id]) ratingMap[r.provider_id] = { sum: 0, count: 0 };
      ratingMap[r.provider_id].sum += r.rating;
      ratingMap[r.provider_id].count++;
    }
  });

  if (providers.length === 0) {
    return (
      <div className="bg-[#0A1A30] border border-white/10 border-dashed rounded-sm py-14 text-center" dir="rtl">
        <Inbox size={28} className="text-white/25 mx-auto mb-2" />
        <p className="text-white/45 text-sm">لا يوجد مزوّدون مسجّلون.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" dir="rtl">
      {providers.map((p) => {
        const fleet = fleetMap[p.id] || { total: 0, available: 0 };
        const r = ratingMap[p.id];
        const avg = r ? r.sum / r.count : 0;
        return (
          <div key={p.id} className="bg-[#0A1A30] border border-white/10 rounded-sm p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-sm bg-[#0696B0]/15 flex items-center justify-center flex-shrink-0">
                <Building2 size={20} className="text-[#0696B0]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white truncate">{p.company_name}</h3>
                <div className="flex items-center gap-1.5 text-white/40 text-xs mt-1">
                  <MapPin size={12} /> {p.city || "—"}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <StarBadge value={avg} count={r ? r.count : 0} size={13} />
              <span className="inline-flex items-center gap-1.5 text-white/55 text-xs">
                <Truck size={13} /> {fleet.available}/{fleet.total} متاحة
              </span>
            </div>
            <Link
              to={`/providers/${p.id}`}
              className="inline-flex items-center gap-1 text-[#009466] text-xs font-bold hover:underline"
            >
              عرض الملف العام <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}