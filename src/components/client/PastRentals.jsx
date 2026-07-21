import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import {
  MapPin,
  Package,
  CalendarClock,
  RefreshCw,
  Eye,
  History,
  Inbox,
  Stamp,
} from "lucide-react";
import ContractViewer from "@/components/client/ContractViewer";
import RatingStars from "@/components/client/RatingStars";
import StarBadge from "@/components/StarBadge";
import { useToast } from "@/components/ui/use-toast";

function durLabel(d) {
  return { day: "يومي", week: "أسبوعي", month: "شهري", scope: "مقطوعة" }[d] || d || "—";
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-white/50" />
      </div>
      <div className="min-w-0">
        <div className="text-white/35 text-[11px]">{label}</div>
        <div className="text-white/80 text-sm font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}

export default function PastRentals({ items, user, onReordered }) {
  const { toast } = useToast();
  const [viewing, setViewing] = useState(null);
  const [reordering, setReordering] = useState(null);
  const [ratings, setRatings] = useState({});
  const [savingId, setSavingId] = useState(null);

  const getRating = (req) => (req.id in ratings ? ratings[req.id] : req.rating || 0);
  const completedDate = (req) =>
    req.updated_date ? new Date(req.updated_date).toLocaleDateString("ar-SA") : "—";

  const reorder = async (req) => {
    setReordering(req.id);
    try {
      await base44.entities.RentalRequest.create({
        equipment_id: req.equipment_id || "",
        equipment_name: req.equipment_name,
        client_name: user?.full_name || req.client_name,
        phone: req.phone,
        company: req.company,
        location: req.location,
        duration: req.duration,
        qty: req.qty,
        notes: req.notes,
        status: "pending",
        provider_id: req.provider_id,
      });
      toast({ title: "تم إرسال طلب جديد", description: "بنفس تفاصيل الطلب السابق" });
      onReordered?.();
    } catch (e) {
      toast({ title: "تعذّر إعادة الطلب", description: e.message, variant: "destructive" });
    } finally {
      setReordering(null);
    }
  };

  const saveRating = async (req, v) => {
    setSavingId(req.id);
    try {
      await base44.entities.RentalRequest.update(req.id, { rating: v });
      setRatings((prev) => ({ ...prev, [req.id]: v }));
      toast({ title: "تم حفظ تقييمك" });
    } catch (e) {
      toast({ title: "تعذّر حفظ التقييم", variant: "destructive" });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <History size={18} className="text-[#009466]" /> السجل السابق
        </h2>
        {items.length > 0 && (
          <span className="text-white/40 text-sm font-mono">{items.length} تأجير مكتمل</span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-[#0A1A30] border border-white/10 border-dashed rounded-sm py-12 text-center">
          <Inbox size={28} className="text-white/25 mx-auto mb-2" />
          <p className="text-white/45 text-sm">لا يوجد سجل تأجير سابق بعد.</p>
          <p className="text-white/30 text-xs mt-1">ستظهر هنا تأجيراتك المكتملة لإعادة الطلب أو مراجعة العقد.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((req) => {
            const r = getRating(req);
            return (
              <div key={req.id} className="bg-[#0A1A30] border border-white/10 rounded-sm p-5">
                {/* head */}
                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-snug">{req.equipment_name || "معدة"}</h3>
                    <div className="text-white/40 text-xs mt-1 font-mono">
                      طلب #{req.id ? req.id.slice(-6) : ""} · أُنجز {completedDate(req)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[#009466] text-[10px] font-bold bg-[#009466]/10 border border-[#009466]/30 px-2.5 py-1 rounded-full">
                      <Stamp size={11} /> مكتمل
                    </span>
                    <StarBadge value={r} count={0} size={13} />
                  </div>
                </div>

                {/* meta */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
                  <Meta icon={Package} label="العدد" value={`${req.qty || 1}`} />
                  <Meta icon={MapPin} label="الموقع" value={req.location || "—"} />
                  <Meta icon={CalendarClock} label="المدة" value={durLabel(req.duration)} />
                </div>

                {/* actions */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <button
                    onClick={() => setViewing(req)}
                    className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors"
                  >
                    <Eye size={14} /> عرض العقد
                  </button>
                  <button
                    onClick={() => reorder(req)}
                    disabled={reordering === req.id}
                    className="inline-flex items-center gap-1.5 bg-[#009466] hover:bg-[#007a54] disabled:opacity-60 text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors"
                  >
                    <RefreshCw size={14} className={reordering === req.id ? "animate-spin" : ""} />
                    {reordering === req.id ? "جاري الإرسال..." : "إعادة الطلب"}
                  </button>
                </div>

                {/* rating */}
                <div className="bg-[#081626] border border-white/5 rounded-sm p-4 pt-4">
                  <RatingStars value={r} onSave={(v) => saveRating(req, v)} saving={savingId === req.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ContractViewer
        open={!!viewing}
        onOpenChange={(o) => !o && setViewing(null)}
        req={viewing}
        user={user}
      />
    </section>
  );
}