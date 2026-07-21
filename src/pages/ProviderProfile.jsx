import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  Building2,
  MapPin,
  Phone,
  Truck,
  ShieldCheck,
  Calendar,
  Inbox,
  Package,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import StarBadge from "@/components/StarBadge";
import EquipmentBadge from "@/components/shayul/EquipmentBadge";

const STATUS_AR = {
  available: { label: "متاحة", cls: "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30" },
  rented: { label: "مؤجّرة", cls: "bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/30" },
  maintenance: { label: "صيانة", cls: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
};

function Stat({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-[#1C1917] border border-white/10 rounded-sm p-4">
      <div className="w-8 h-8 rounded-sm flex items-center justify-center mb-2" style={{ backgroundColor: `${color}20` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div className="text-white text-xl font-bold font-mono">{value}</div>
      <div className="text-white/40 text-xs mt-0.5">{label}</div>
    </div>
  );
}

function FleetCard({ eq }) {
  const st = STATUS_AR[eq.status] || STATUS_AR.available;
  return (
    <div className="bg-[#1C1917] border border-white/10 rounded-sm overflow-hidden" dir="rtl">
      <div className="relative h-40">
        {eq.image_url ? (
          <Image src={eq.image_url} alt={eq.name} className="w-full h-full" fittingType="fill" />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <Truck size={30} className="text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] to-transparent" />
        <span className={`absolute top-3 end-3 text-xs font-bold px-2.5 py-1 rounded-full border ${st.cls}`}>
          {st.label}
        </span>
        <div className="absolute top-3 left-3 pointer-events-none">
          <EquipmentBadge type={eq.type} width={72} theme="dark" />
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-white font-bold leading-snug">{eq.name}</h4>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-xs text-white/50">
          {eq.weight && <span className="font-mono">{eq.weight}</span>}
          {eq.power && <span className="font-mono">{eq.power}</span>}
          {eq.size_spec && <span className="font-mono">{eq.size_spec}</span>}
        </div>
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-white/10">
          <div>
            <span className="text-[#D97706] font-bold text-xl font-mono">{eq.daily_rate}</span>
            <span className="text-white/40 text-xs ms-1">ر.س/يوم</span>
          </div>
          <a href="/#request" className="text-[#D97706] text-xs font-bold hover:underline">اطلب →</a>
        </div>
      </div>
    </div>
  );
}

export default function ProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [fleet, setFleet] = useState([]);
  const [ratings, setRatings] = useState({ avg: 0, count: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const p = await base44.entities.Provider.get(id);
        setProvider(p);
        const [eqs, rs] = await Promise.all([
          base44.entities.Equipment.filter({ provider_id: id }, "-created_date", 100),
          base44.entities.RentalRequest.filter({ provider_id: id }, "-created_date", 200),
        ]);
        setFleet(Array.isArray(eqs) ? eqs : []);
        const arr = Array.isArray(rs) ? rs : [];
        const rated = arr.filter((r) => r.rating && r.rating > 0);
        const avg = rated.length ? rated.reduce((s, r) => s + r.rating, 0) / rated.length : 0;
        setRatings({ avg, count: rated.length, completed: arr.filter((r) => r.status === "completed").length });
      } catch (e) {
        setErr(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[#D97706] rounded-full animate-spin" />
      </div>
    );
  }

  if (err || !provider) {
    return (
      <div className="min-h-screen bg-[#0C0A09] text-white flex flex-col items-center justify-center gap-4" dir="rtl">
        <Inbox size={36} className="text-white/30" />
        <p className="text-white/60 font-medium">لم يتم العثور على المزوّد</p>
        <Link to="/providers" className="text-[#D97706] text-sm font-bold hover:underline">العودة لدليل المزوّدين</Link>
      </div>
    );
  }

  const available = fleet.filter((e) => e.status === "available").length;

  return (
    <div className="min-h-screen bg-[#0C0A09] text-white" dir="rtl">
      {/* header */}
      <header className="border-b border-white/10 bg-[#1C1917] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/providers" className="text-white/40 text-xs hover:text-white/70">← دليل المزوّدين</Link>
          <span className="text-[#D97706] font-mono text-sm font-bold tracking-widest">SHAYWAL</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10">
        {/* profile header */}
        <div className="bg-[#1C1917] border border-white/10 rounded-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-20 h-20 rounded-sm bg-[#FCD34D]/15 flex items-center justify-center flex-shrink-0">
              <Building2 size={38} className="text-[#FCD34D]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{provider.company_name}</h1>
                <span className="inline-flex items-center gap-1 text-[#FCD34D] text-[10px] font-bold bg-[#FCD34D]/10 border border-[#FCD34D]/30 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={11} /> مزوّد موثّق
                </span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-white/50 text-sm mb-4">
                <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {provider.city || "—"}</span>
                <span className="inline-flex items-center gap-1.5"><Phone size={14} dir="ltr" /> {provider.phone || "—"}</span>
                {provider.established_year && (
                  <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> منذ {provider.established_year}</span>
                )}
              </div>
              {provider.bio && <p className="text-white/55 text-sm leading-relaxed max-w-2xl">{provider.bio}</p>}
              <div className="text-white/40 text-xs mt-3 inline-flex items-center gap-1.5">
                <MapPin size={13} /> نطاق التغطية: {provider.coverage || "—"}
              </div>
            </div>

            {/* rating highlight */}
            <div className="md:border-s md:border-white/10 md:ps-6 pt-4 md:pt-0">
              <div className="text-white/40 text-xs mb-2">التقييم العام</div>
              <StarBadge value={ratings.avg} count={ratings.count} size={20} />
              <div className="text-white/35 text-xs mt-2">
                {ratings.count > 0 ? `${ratings.count} تقييم · ${ratings.completed} تأجير مكتمل` : "لا توجد تقييمات بعد"}
              </div>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          <Stat icon={Truck} label="إجمالي الأسطول" value={fleet.length} color="#FCD34D" />
          <Stat icon={Package} label="معدات متاحة الآن" value={available} color="#D97706" />
          <Stat icon={CheckCircle2} label="تأجيرات مكتملة" value={ratings.completed} color="#F59E0B" />
        </div>

        {/* fleet */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">الأسطول المتاح</h2>
          <span className="text-white/40 text-sm font-mono">{fleet.length} معدة</span>
        </div>

        {fleet.length === 0 ? (
          <div className="bg-[#1C1917] border border-white/10 border-dashed rounded-sm py-16 text-center">
            <Inbox size={30} className="text-white/30 mx-auto mb-3" />
            <p className="text-white/55 text-sm">لا توجد مدرجة معدات لهذا المزوّد بعد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fleet.map((eq) => (
              <FleetCard key={eq.id} eq={eq} />
            ))}
          </div>
        )}

        {/* cta */}
        <div className="mt-10 bg-[#D97706]/10 border border-[#D97706]/30 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start">
          <div>
            <h3 className="text-white font-bold text-lg">جاهز لطلب تجهيزة من {provider.company_name}؟</h3>
            <p className="text-white/50 text-sm mt-1">أرسل طلبك وسيتولّى المزوّد التواصل لتأكيد التفاصيل وإصدار العقد الموثّق.</p>
          </div>
          <a href="/#request" className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-sm text-sm font-bold inline-flex items-center gap-2 whitespace-nowrap">
            أرسل طلبك <ArrowLeft size={15} className="rotate-180" />
          </a>
        </div>
      </main>
    </div>
  );
}