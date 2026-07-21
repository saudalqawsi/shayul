import React, { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import {
  HardHat,
  MapPin,
  CalendarClock,
  Package,
  LogOut,
  PlusCircle,
  ShieldCheck,
  Inbox,
  Clock,
} from "lucide-react";
import RentalTracker from "@/components/client/RentalTracker";
import RatingStars from "@/components/client/RatingStars";
import PastRentals from "@/components/client/PastRentals";
import { useToast } from "@/components/ui/use-toast";
import DashboardChrome from "@/components/shayul/DashboardChrome";

const STATUS_AR = {
  pending: { label: "قيد المراجعة", chip: "bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/30" },
  accepted: { label: "مقبول", chip: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30" },
  completed: { label: "مكتمل", chip: "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30" },
  rejected: { label: "مرفوض", chip: "bg-red-500/10 text-red-400 border-red-500/30" },
};

function durLabel(d) {
  return { day: "يومي", week: "أسبوعي", month: "شهري", scope: "مقطوعة" }[d] || d || "—";
}

function ReqCard({ req }) {
  const st = STATUS_AR[req.status] || STATUS_AR.pending;
  const { toast } = useToast();
  const [rating, setRating] = useState(req.rating || 0);
  const [saving, setSaving] = useState(false);

  const saveRating = async (v) => {
    setSaving(true);
    try {
      await base44.entities.RentalRequest.update(req.id, { rating: v });
      setRating(v);
      toast({ title: "تم حفظ تقييمك", description: "شكراً لمساهمتك في تحسين الخدمة" });
    } catch (e) {
      toast({ title: "تعذّر حفظ التقييم", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#1C1917] border border-white/10 rounded-sm p-5 md:p-6" dir="rtl">
      {/* head */}
      <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
        <div>
          <h3 className="text-white font-bold text-lg leading-snug">{req.equipment_name || "معدة"}</h3>
          <div className="text-white/40 text-xs mt-1 font-mono">طلب #{req.id ? req.id.slice(-6) : ""}</div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${st.chip}`}>{st.label}</span>
      </div>

      {/* meta */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-sm">
        <Meta icon={Package} label="العدد" value={`${req.qty || 1}`} />
        <Meta icon={MapPin} label="الموقع" value={req.location || "—"} />
        <Meta icon={CalendarClock} label="المدة" value={durLabel(req.duration)} />
        <Meta icon={HardHat} label="تاريخ الطلب" value={req.created_date ? new Date(req.created_date).toLocaleDateString("ar-SA") : "—"} />
      </div>

      {/* tracker */}
      <div className="bg-[#0C0A09] border border-white/5 rounded-sm p-5">
        <RentalTracker status={req.status} createdAt={req.created_date} updatedAt={req.updated_date} />
      </div>

      {/* rating — only once the rental is completed (equipment returned) */}
      {req.status === "completed" && (
        <div className="bg-[#0C0A09] border border-white/5 rounded-sm p-5 mt-4">
          <RatingStars value={rating} onSave={saveRating} saving={saving} />
        </div>
      )}
    </div>
  );
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-white/50" />
      </div>
      <div className="min-w-0">
        <div className="text-white/35 text-[11px]">{label}</div>
        <div className="text-white/80 text-sm font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}

export default function ClientDashboard() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const me = await base44.auth.me();
      setUser(me);
      const data = await base44.entities.RentalRequest.list("-created_date", 50);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const logout = async () => {
    try {
      await base44.auth.logout("/");
    } catch (e) {
      toast({ title: "تعذّر تسجيل الخروج", variant: "destructive" });
    }
  };

  const total = items.length;
  const activeCount = items.filter((r) => r.status === "pending" || r.status === "accepted").length;
  const activeItems = items.filter((r) => r.status !== "completed");
  const pastItems = items.filter((r) => r.status === "completed");

  return (
    <div className="min-h-screen bg-[#0C0A09] text-white" dir="rtl">
      <DashboardChrome
        roleLabel={{ ar: "بوابة العميل", en: "Client Portal" }}
        onLogout={logout}
      />

      <main className="max-w-5xl mx-auto px-5 py-8">
        {/* greeting */}
        <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              أهلاً{user?.full_name ? `، ${user.full_name}` : ""}
            </h1>
            <p className="text-white/45 text-sm mt-1">تابع حالة طلبات تأجير المعدات من الطلب حتى العقد الموثّق.</p>
          </div>
          <a href="/#request" className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] px-4 py-2.5 rounded-sm text-sm font-bold">
            <PlusCircle size={16} /> طلب جديد
          </a>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-[#1C1917] border border-white/10 rounded-sm p-4">
            <div className="text-3xl font-bold font-mono text-white">{total}</div>
            <div className="text-white/45 text-xs mt-1">إجمالي الطلبات</div>
          </div>
          <div className="bg-[#1C1917] border border-white/10 rounded-sm p-4">
            <div className="text-3xl font-bold font-mono text-[#D97706]">{activeCount}</div>
            <div className="text-white/45 text-xs mt-1">قيد التنفيذ</div>
          </div>
        </div>

        {/* list */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-white/20 border-t-[#D97706] rounded-full animate-spin" />
          </div>
        ) : total === 0 ? (
          <div className="bg-[#1C1917] border border-white/10 rounded-sm py-16 text-center">
            <Inbox size={32} className="text-white/30 mx-auto mb-3" />
            <p className="text-white/60 font-medium mb-1">لا توجد طلبات بعد</p>
            <p className="text-white/35 text-sm mb-5">أرسل طلب معدات أول ليظهر هنا مع متابعة الحالة.</p>
            <a href="/#request" className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] px-5 py-2.5 rounded-sm text-sm font-bold">
              <PlusCircle size={16} /> أرسل طلبك
            </a>
          </div>
        ) : (
          <div className="space-y-10">
            {activeItems.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-[#FCD34D]" /> الطلبات الحالية
                </h2>
                <div className="space-y-5">
                  {activeItems.map((r) => (
                    <ReqCard key={r.id} req={r} />
                  ))}
                </div>
              </section>
            )}
            <PastRentals items={pastItems} user={user} onReordered={load} />
          </div>
        )}
      </main>
    </div>
  );
}