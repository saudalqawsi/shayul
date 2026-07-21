import React from "react";
import {
  ClipboardCheck,
  Search,
  FileText,
  Stamp,
  Check,
  X,
  Loader2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import moment from "moment";

const STAGES = [
  { key: "received", label: "طلب مُستلَم", en: "Request received", Icon: ClipboardCheck },
  { key: "matching", label: "قيد المطابقة", en: "Matching", Icon: Search },
  { key: "accepted", label: "عرض مقبول", en: "Offer accepted", Icon: FileText },
  { key: "contract", label: "العقد الموثّق", en: "Notarized contract", Icon: Stamp },
];

function resolve(status) {
  switch (status) {
    case "completed":
      return { completedCount: 4, active: -1, done: true, rejected: false };
    case "accepted":
      return { completedCount: 3, active: 3, done: false, rejected: false };
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
      return { text: "العقد موثّق والتسليم مكتمل", color: "text-[#009466]", chip: "bg-[#009466]/10 border-[#009466]/40" };
    case "accepted":
      return { text: "بانتظار توثيق العقد", color: "text-[#D4A537]", chip: "bg-[#D4A537]/10 border-[#D4A537]/40" };
    case "rejected":
      return { text: "تم رفض الطلب", color: "text-red-400", chip: "bg-red-500/10 border-red-500/40" };
    case "pending":
    default:
      return { text: "قيد المطابقة مع الشركات", color: "text-[#0696B0]", chip: "bg-[#0696B0]/10 border-[#0696B0]/40" };
  }
}

export default function RentalTracker({ status, createdAt, updatedAt }) {
  const { completedCount, active, done, rejected } = resolve(status);
  const total = STAGES.length;
  const progressIndex =
    active >= 0 ? active : done ? total - 1 : Math.max(0, completedCount - 1);
  const fillPct = total > 1 ? (progressIndex / (total - 1)) * 100 : 100;
  const lastDate = updatedAt || createdAt;
  const dateStr = lastDate ? moment(lastDate).format("DD MMM YYYY") : "";
  const b = banner(status);

  return (
    <div dir="rtl" className="w-full">
      {/* status banner */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-7">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${b.chip} ${b.color}`}
        >
          {done ? <ShieldCheck size={13} /> : rejected ? <XCircle size={13} /> : <Loader2 size={13} className="animate-spin" />}
          {b.text}
        </span>
        {dateStr && (
          <span className="text-white/35 text-xs font-mono">آخر تحديث · {dateStr}</span>
        )}
      </div>

      {/* stepper */}
      <div className="relative">
        {/* rail + progress fill (anchored to node centers via inset-x-5) */}
        <div className="absolute top-5 inset-x-5 h-0.5">
          <div className="absolute inset-0 bg-white/10 rounded-full" />
          <div
            className="absolute inset-y-0 bg-[#009466] rounded-full transition-all duration-500"
            style={{ width: `${fillPct}%`, insetInlineStart: 0 }}
          />
        </div>

        <div className="relative flex justify-between items-start">
          {STAGES.map((s, i) => {
            const isDone = i < completedCount;
            const isActive = i === active;
            const isFailed = rejected && i === completedCount;

            let nodeCls = "bg-[#0A1A30] border border-white/15 text-white/30";
            let Icon = s.Icon;
            if (isDone) {
              nodeCls = "bg-[#009466] border border-[#009466] text-white";
              Icon = Check;
            } else if (isActive) {
              nodeCls = "bg-[#0A1A30] border-2 border-[#009466] text-[#009466] ring-4 ring-[#009466]/15";
            } else if (isFailed) {
              nodeCls = "bg-red-950/40 border-2 border-red-500 text-red-400";
              Icon = X;
            }

            return (
              <div key={s.key} className="flex-1 flex flex-col items-center text-center px-1">
                <div
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center z-10 ${nodeCls}`}
                >
                  {isActive ? <Loader2 size={18} className="animate-spin" /> : <Icon size={18} />}
                </div>
                <div className="mt-3">
                  <div
                    className={`text-xs font-bold leading-tight ${
                      isDone ? "text-white" : isActive ? "text-[#009466]" : isFailed ? "text-red-400" : "text-white/40"
                    }`}
                  >
                    {s.label}
                  </div>
                  <div className="text-[10px] text-white/30 mt-0.5 font-mono">{s.en}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}