import React, { useState } from "react";
import {
  Check,
  X,
  MapPin,
  Package,
  CalendarClock,
  User,
  Building2,
  Inbox,
  Filter,
  Truck,
} from "lucide-react";

const STATUS = {
  pending: { label: "قيد المطابقة", chip: "bg-[#0696B0]/10 text-[#0696B0] border-[#0696B0]/30" },
  accepted: { label: "عقد موثّق", chip: "bg-[#D4A537]/10 text-[#D4A537] border-[#D4A537]/30" },
  completed: { label: "مكتمل", chip: "bg-[#009466]/10 text-[#009466] border-[#009466]/30" },
  rejected: { label: "مرفوض", chip: "bg-red-500/10 text-red-400 border-red-500/30" },
};

const FILTERS = [
  { value: "pending", label: "بانتظار الموافقة" },
  { value: "accepted", label: "عقود نشطة" },
  { value: "completed", label: "مكتملة" },
  { value: "rejected", label: "مرفوضة" },
  { value: "all", label: "الكل" },
];

function durLabel(d) {
  return { day: "يومي", week: "أسبوعي", month: "شهري", scope: "مقطوعة" }[d] || d || "—";
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <Icon size={13} className="text-white/35 flex-shrink-0" />
      <span className="text-white/35 text-[11px]">{label}:</span>
      <span className="text-white/70 text-xs font-semibold truncate">{value}</span>
    </div>
  );
}

export default function ApprovalsBoard({ requests, providers, onAct }) {
  const [filter, setFilter] = useState("pending");
  const [assign, setAssign] = useState({});

  const list = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  const providerName = (id) =>
    providers.find((p) => p.id === id)?.company_name || (id ? `مزوّد #${String(id).slice(-6)}` : "غير معيّن");

  const approve = (req) => {
    const providerId = assign[req.id] || req.provider_id;
    if (!providerId) {
      onAct(req.id, { status: "accepted" }, "تم الاعتماد — بانتظار تعيين المزوّد");
    } else {
      onAct(req.id, { status: "accepted", provider_id: providerId }, "تمت المطابقة وإصدار العقد");
    }
  };

  return (
    <div dir="rtl">
      {/* filters */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-white/40 text-xs font-bold me-1">
          <Filter size={13} /> تصفية:
        </span>
        {FILTERS.map((f) => {
          const count = f.value === "all" ? requests.length : requests.filter((r) => r.status === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold border transition-colors ${
                filter === f.value
                  ? "bg-[#D4A537] border-[#D4A537] text-[#0A1A30]"
                  : "bg-white/5 border-white/10 text-white/55 hover:text-white"
              }`}
            >
              {f.label} <span className="opacity-60 font-mono">{count}</span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="bg-[#0A1A30] border border-white/10 border-dashed rounded-sm py-14 text-center">
          <Inbox size={28} className="text-white/25 mx-auto mb-2" />
          <p className="text-white/45 text-sm">لا طلبات في هذه الحالة.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((req) => {
            const st = STATUS[req.status] || STATUS.pending;
            return (
              <div key={req.id} className="bg-[#0A1A30] border border-white/10 rounded-sm p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                  <div>
                    <h3 className="text-white font-bold leading-snug">{req.equipment_name || "معدة"}</h3>
                    <div className="text-white/40 text-xs mt-1 font-mono">
                      طلب #{req.id ? req.id.slice(-6) : ""} · {req.created_date ? new Date(req.created_date).toLocaleDateString("ar-SA") : "—"}
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${st.chip}`}>{st.label}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-3">
                  <Meta icon={User} label="العميل" value={req.client_name || "—"} />
                  <Meta icon={Building2} label="المزوّد" value={req.provider_id ? providerName(req.provider_id) : "غير معيّن"} />
                  <Meta icon={MapPin} label="الموقع" value={req.location || "—"} />
                  <Meta icon={CalendarClock} label="المدة" value={durLabel(req.duration)} />
                  <Meta icon={Package} label="العدد" value={`${req.qty || 1}`} />
                  <Meta icon={User} label="الجوال" value={req.phone || "—"} />
                </div>

                {/* platform actions per swim-lane */}
                {req.status === "pending" && (
                  <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/10">
                    <select
                      value={assign[req.id] || req.provider_id || ""}
                      onChange={(e) => setAssign((p) => ({ ...p, [req.id]: e.target.value }))}
                      className="bg-white/5 border border-white/15 rounded-sm px-3 py-2 text-white text-xs focus:outline-none focus:border-[#009466] min-w-[12rem]"
                    >
                      <option value="" className="bg-[#0A1A30]">— مطابقة مع مزوّد —</option>
                      {providers.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[#0A1A30]">{p.company_name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => approve(req)}
                      className="inline-flex items-center gap-1.5 bg-[#009466] hover:bg-[#007a54] text-white text-xs font-bold px-4 py-2 rounded-sm"
                    >
                      <Check size={14} /> اعتماد ومطابقة
                    </button>
                    <button
                      onClick={() => onAct(req.id, { status: "rejected" }, "تم رفض الطلب")}
                      className="inline-flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-sm"
                    >
                      <X size={14} /> رفض
                    </button>
                  </div>
                )}

                {req.status === "accepted" && (
                  <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/10">
                    <span className="text-white/40 text-xs">العقد موثّق — بانتظار تأكيد التسليم والإنجاز.</span>
                    <button
                      onClick={() => onAct(req.id, { status: "completed" }, "تم تأكيد التسليم وإكمال التأجير")}
                      className="inline-flex items-center gap-1.5 bg-[#009466] hover:bg-[#007a54] text-white text-xs font-bold px-4 py-2 rounded-sm mr-auto"
                    >
                      <Truck size={14} /> تأكيد التسليم والإنجاز
                    </button>
                  </div>
                )}

                {req.status === "completed" && (
                  <div className="pt-3 border-t border-white/10 text-[#009466] text-xs font-bold flex items-center gap-1.5">
                    <Check size={14} /> أُنجز التأجير وعُدّل في السجل
                    {req.rating ? <span className="text-[#D4A537] ms-2">· تقييم {req.rating}/5</span> : null}
                  </div>
                )}
                {req.status === "rejected" && (
                  <div className="pt-3 border-t border-white/10 text-red-400/80 text-xs">تم رفض الطلب — يمكن للعميل إرسال طلب جديد.</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}