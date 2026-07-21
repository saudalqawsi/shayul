import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Building2, MapPin, Truck, ArrowLeft, Inbox, ShieldCheck } from "lucide-react";
import StarBadge from "@/components/StarBadge";

export default function ProvidersDirectory() {
  const [providers, setProviders] = useState([]);
  const [fleetMap, setFleetMap] = useState({});
  const [ratingMap, setRatingMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [ps, eqs, rs] = await Promise.all([
          base44.entities.Provider.list("-created_date", 100),
          base44.entities.Equipment.list("-created_date", 500),
          base44.entities.RentalRequest.list("-created_date", 500),
        ]);
        const fm = {};
        (eqs || []).forEach((e) => {
          if (e.provider_id) {
            if (!fm[e.provider_id]) fm[e.provider_id] = { total: 0, available: 0 };
            fm[e.provider_id].total++;
            if (e.status === "available") fm[e.provider_id].available++;
          }
        });
        const rm = {};
        (rs || []).forEach((r) => {
          if (r.provider_id && r.rating && r.rating > 0) {
            if (!rm[r.provider_id]) rm[r.provider_id] = { sum: 0, count: 0 };
            rm[r.provider_id].sum += r.rating;
            rm[r.provider_id].count++;
          }
        });
        setProviders(ps || []);
        setFleetMap(fm);
        setRatingMap(rm);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#081626] text-white" dir="rtl">
      {/* header */}
      <header className="border-b border-white/10 bg-[#0A1A30] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/" className="text-white/40 text-xs hover:text-white/70">← العودة للموقع</Link>
          <span className="text-[#009466] font-mono text-sm font-bold tracking-widest">SHAYWAL</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10">
        <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-3">دليل المزوّدين</p>
        <h1 className="text-3xl font-bold mb-3">شركات المعدات الموثّقة في شيول</h1>
        <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-2xl">
          تصفّح مزوّدي المعدات المعتمدين، استعرض أساطيلهم وتقييمات عملائهم، ثم اطلب المعدة المناسبة لمشروعك.
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-white/20 border-t-[#009466] rounded-full animate-spin" />
          </div>
        ) : providers.length === 0 ? (
          <div className="bg-[#0A1A30] border border-white/10 rounded-sm py-16 text-center">
            <Inbox size={32} className="text-white/30 mx-auto mb-3" />
            <p className="text-white/60 font-medium">لا يوجد مزوّدون مسجّلون بعد</p>
            <p className="text-white/35 text-sm mt-1">تابعنا قريباً بعد انضمام الشركات.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {providers.map((p) => {
              const fleet = fleetMap[p.id] || { total: 0, available: 0 };
              const r = ratingMap[p.id];
              const avg = r ? r.sum / r.count : 0;
              return (
                <Link
                  key={p.id}
                  to={`/providers/${p.id}`}
                  className="group bg-[#0A1A30] border border-white/10 rounded-sm p-5 hover:border-[#009466]/40 transition-colors flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-sm bg-[#0696B0]/15 flex items-center justify-center flex-shrink-0">
                      <Building2 size={22} className="text-[#0696B0]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white truncate">{p.company_name}</h3>
                      <div className="flex items-center gap-1.5 text-white/40 text-xs mt-1">
                        <MapPin size={12} /> {p.city || "—"}
                      </div>
                    </div>
                  </div>

                  <p className="text-white/45 text-xs leading-relaxed line-clamp-2 mb-4">
                    {p.coverage || p.bio || "مزوّد معدات موثّق"}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <StarBadge value={avg} count={r ? r.count : 0} size={14} />
                    <span className="inline-flex items-center gap-1.5 text-white/55 text-xs">
                      <Truck size={13} /> {fleet.available}/{fleet.total} متاحة
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#0696B0] font-bold">
                      <ShieldCheck size={12} /> مزوّد موثّق
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#009466] text-xs font-bold group-hover:gap-2 transition-all">
                      عرض الملف <ArrowLeft size={14} className="rotate-180" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}