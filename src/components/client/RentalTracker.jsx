import React from "react";
import {
  Send,
  Search,
  Stamp,
  Truck,
  Check,
  X,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import moment from "moment";

const STAGES = [
  { key: "submitted", label: "طلب مُرسل", en: "Request Submitted", Icon: Send, desc: "تم استلام طلبك بنجاح" },
  { key: "matching", label: "قيد المطابقة", en: "Matching", Icon: Search, desc: "نبحث عن أفضل عرض قرب موقعك" },
  { key: "contract", label: "العقد موثّق", en: "Contract Notarized", Icon: Stamp, desc: "صدر عقدك الإلكتروني الموثّق" },
  { key: "delivered", label: "تم التسليم", en: "Equipment Delivered", Icon: Truck, desc: "وصلت المعدة إلى موقعك" },
];

function resolve(status) {
  switch (status) {
    case "completed":
      return { completedCount: 4, active: -1, done: true, rejected: false };
    case "accepted":
      return { completedCount: 2, active: 2, done: false, rejected: false };
    case "rejected":
      return { completedCount: 1, active: -1, done: false, rejected: true };
    case "pending":
    default:
      return { completedCount: 1, active: 1, done: false, rejected: false };
  }
}

function banner(status) {
  switch (status) {
    case "completed":
      return { text: "اكتمل التأجير", desc: "وصلت المعدة إلى موقعك وبدأ التشغيل", color: "text-[#009466]", chip: "bg-[#009466]/10 border-[#009466]/40" };
    case "accepted":
      return { text: "بانتظار توثيق العقد", desc: "تم قبول العرض وجارٍ إصدار العقد الموثّق", color: "text-[#D4A537]", chip: "bg-[#D4A537]/10 border-[#D4A537]/40" };
    case "rejected":
      return { text: "تم رفض الطلب", desc: "لم يزل بالإمكان إرسال طلب جديد", color: "text-red-400", chip: "bg-red-500/10 border-red-500/40" };
    case "pending":
    default:
      return { text: "قيد المطابقة", desc: "نوزّع طلبك على شركات المعدات الموثّقة", color: "text-[#0696B0]", chip: "bg-[#0696B0]/10 border-[#0696B0]/40" };
  }
}

export default function RentalTracker({ status, createdAt, updatedAt }) {
  const { completedCount, active, done, rejected } = resolve(status);
  const total = STAGES.length;
  const progressIndex = active >= 0 ? active : done ? total - 1 : Math.max(0, completedCount - 1);
  const fillPct = total > 1 ? (progressIndex / (total - 1)) * 100 : 100;
  const pct = Math.round(fillPct);
  const currentStage = active >= 0 ? STAGES[active] : done ? STAGES[total - 1] : rejected ? STAGES[0] : STAGES[0];
  const lastDate = updatedAt || createdAt;
  const dateStr = lastDate ? moment(lastDate).format("DD MMM YYYY") : "";
  const b = banner(status);

  return (
    <div dir="rtl" className="w-full">
      {/* status banner */}
      <div className="flex items-start justify-between flex-wrap gap-3 mb-7">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${b.chip} ${b.color}`}
          >
            {done ? <ShieldCheck size={14} /> : rejected ? <XCircle size={14} /> : <Check size={14} />}
            {b.text}
          </span>
          <div className="hidden sm:block leading-tight">
            <div className="text-white/55 text-xs font-semibold">{currentStage.label}</div>
            <div className="text-white/35 text-[11px]">{b.desc || currentStage.desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {dateStr && (
            <span className="text-white/35 text-xs font-mono">آخر تحديث · {dateStr}</span>
          )}
          <span className={`text-xs font-bold font-mono ${b.color}`}>{pct}%</span>
        </div>
      </div>

      {/* stepper */}
      <div className="relative">
        {/* rail + progress fill (anchored to node centers via inset-x-5) */}
        <div className="absolute top-5 inset-x-5 h-0.5">
          <div className="absolute inset-0 bg-white/10 rounded-full" />
          <div
            className={`absolute inset-y-0 rounded-full transition-all duration-500 ${rejected ? "bg-red-500/60" : "bg-gradient-to-l from-[#009466] to-[#0696B0]"}`}
            style={{ width: `${fillPct}%`, insetInlineStart: 0 }}
          />
        </div>

        <div className="relative flex justify-between items-start">
          {STAGES.map((s, i) => {
            const isDone = i < completedCount;
            const isActive = i === active;
            const isFuture = !isDone && !isActive && !(rejected && i === completedCount);
            const isFailed = rejected && i === completedCount;

            let nodeCls = "bg-[#0A1A30] border border-white/15 text-white/30";
            let Icon = s.Icon;
            if (isDone) {
              nodeCls = "bg-[#009466] border border-[#009466] text-white";
              Icon = Check;
            } else if (isActive) {
              nodeCls = "bg-[#0A1A30] border-2 border-[#009466] text-[#009466]";
            } else if (isFailed) {
              nodeCls = "bg-red-950/40 border-2 border-red-500 text-red-400";
              Icon = X;
            }

            return (
              <div key={s.key} className="flex-1 flex flex-col items-center text-center px-1">
                <div className="relative">
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-[#009466]/25 animate-ping" />
                  )}
                  <div
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${nodeCls} ${isActive ? "scale-110" : ""}`}
                  >
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-3">
                  <div
                    className={`text-xs font-bold leading-tight transition-colors ${
                      isDone ? "text-white" : isActive ? "text-[#009466]" : isFailed ? "text-red-400" : "text-white/35"
                    }`}
                  >
                    {s.label}
                  </div>
                  <div className="text-[10px] text-white/25 mt-0.5 font-mono">{s.en}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}