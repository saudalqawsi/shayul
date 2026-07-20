import React, { useState } from "react";
import { Check, X, Phone, MapPin, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const STATUS = {
  pending: { ar: "قيد الانتظار", cls: "bg-amber-500/15 text-amber-400 border-amber-500/40" },
  accepted: { ar: "مقبولة", cls: "bg-[#009466]/20 text-[#009466] border-[#009466]/40" },
  rejected: { ar: "مرفوضة", cls: "bg-red-500/15 text-red-400 border-red-500/40" },
  completed: { ar: "مكتملة", cls: "bg-[#0696B0]/20 text-[#0696B0] border-[#0696B0]/40" },
};

export default function RequestsList({ requests, onAct }) {
  const { toast } = useToast();
  const [filter, setFilter] = useState("pending");
  const [busy, setBusy] = useState(null);

  const act = async (req, status) => {
    setBusy(req.id);
    try {
      await onAct(req, status);
    } catch (e) {
      toast({ title: "تعذّر التحديث", description: e.message, variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const filtered = requests.filter((r) => filter === "all" || r.status === filter);
  const counts = { all: requests.length, pending: requests.filter(r=>r.status==="pending").length, accepted: requests.filter(r=>r.status==="accepted").length, completed: requests.filter(r=>r.status==="completed").length };

  return (
    <div dir="rtl">
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {[
          { k: "pending", ar: "قيد الانتظار" },
          { k: "accepted", ar: "مقبولة" },
          { k: "completed", ar: "مكتملة" },
          { k: "all", ar: "الكل" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setFilter(t.k)}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap border transition-colors ${
              filter === t.k ? "bg-[#009466] text-white border-[#009466]" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
            }`}
          >
            {t.ar} <span className="opacity-60">({counts[t.k] || 0})</span>
          </button>
        ))}
      </div>

      {!filtered.length ? (
        <p className="text-white/40 text-sm py-10 text-center border border-dashed border-white/10 rounded-sm">لا توجد طلبات في هذه الحالة.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => {
            const s = STATUS[req.status] || STATUS.pending;
            return (
              <div key={req.id} className="bg-white/4 border border-white/10 rounded-sm p-4">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm">{req.equipment_name}</h3>
                    <p className="text-white/50 text-xs mt-0.5">{req.client_name} {req.company ? `· ${req.company}` : ""}</p>
                  </div>
                  <Badge className={`border ${s.cls}`}>{s.ar}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/60 mb-3">
                  <span className="flex items-center gap-1.5"><Phone size={12} className="text-white/40" /> {req.phone}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} className="text-white/40" /> {req.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-white/40" /> {req.duration}</span>
                  {req.start_date && <span className="flex items-center gap-1.5"><Calendar size={12} className="text-white/40" /> {req.start_date}</span>}
                </div>
                {req.notes && <p className="text-white/45 text-xs mb-3 bg-white/3 rounded-sm p-2 border border-white/5">{req.notes}</p>}
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" disabled={busy === req.id} onClick={() => act(req, "accepted")} className="bg-[#009466] hover:bg-[#007a54] text-white h-8">
                      <Check size={14} className="me-1" /> قبول
                    </Button>
                    <Button size="sm" disabled={busy === req.id} onClick={() => act(req, "rejected")} variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 h-8">
                      <X size={14} className="me-1" /> رفض
                    </Button>
                  </div>
                )}
                {req.status === "accepted" && (
                  <Button size="sm" disabled={busy === req.id} onClick={() => act(req, "completed")} variant="ghost" className="text-[#0696B0] hover:bg-[#0696B0]/10 border border-[#0696B0]/30 h-8">
                    <Check size={14} className="me-1" /> تأكيد الإنجاز
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}