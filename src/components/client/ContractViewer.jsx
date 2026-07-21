import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Stamp, ShieldCheck, Building2, User, CheckCircle2, FileText } from "lucide-react";

function durLabel(d) {
  return { day: "يومي", week: "أسبوعي", month: "شهري", scope: "مقطوعة" }[d] || d || "—";
}

export default function ContractViewer({ open, onOpenChange, req, user }) {
  if (!req) return null;
  const ts = req.updated_date || req.created_date;
  const year = ts ? new Date(ts).getFullYear() : "——";
  const ref = `SHYW-${year}-${String(req.id || "").slice(-6).toUpperCase() || "000000"}`;
  const issued = ts ? new Date(ts).toLocaleDateString("ar-SA") : "—";
  const lessee = user?.full_name || req.client_name || "—";
  const rows = [
    ["المعدة", req.equipment_name || "—"],
    ["العدد", req.qty || 1],
    ["المدة", durLabel(req.duration)],
    ["الموقع", req.location || "—"],
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0A1A30] text-white max-w-lg border-white/10" dir="rtl">
        <DialogHeader>
          <DialogTitle className="sr-only">عقد التأجير الموثّق</DialogTitle>
          <DialogDescription className="sr-only">عرض تفاصيل العقد المكتمل</DialogDescription>
        </DialogHeader>

        {/* seal header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-sm bg-[#D4A537]/15 flex items-center justify-center">
              <Stamp size={20} className="text-[#D4A537]" />
            </div>
            <div>
              <div className="text-white font-bold text-base leading-tight">عقد تأجير معدة ثقيلة</div>
              <div className="text-white/40 text-[11px] font-mono mt-0.5">SHAYWAL · عقد إلكتروني موثّق</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[#009466] text-[10px] font-bold bg-[#009466]/10 border border-[#009466]/30 px-2.5 py-1 rounded-full">
            <ShieldCheck size={11} /> موثّق
          </span>
        </div>

        {/* ref + issued */}
        <div className="grid grid-cols-2 gap-3 bg-[#081626] border border-white/5 rounded-sm p-3 text-xs">
          <div>
            <div className="text-white/35">رقم العقد</div>
            <div className="text-white font-mono font-bold mt-0.5">{ref}</div>
          </div>
          <div>
            <div className="text-white/35">تاري (الإصدار / الإنجاز)</div>
            <div className="text-white font-mono font-bold mt-0.5">{issued}</div>
          </div>
        </div>

        {/* parties */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-start gap-2">
            <User size={15} className="text-[#0696B0] mt-0.5" />
            <div>
              <div className="text-white/35 text-[11px]">المستأجر</div>
              <div className="text-white text-sm font-semibold">{lessee}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Building2 size={15} className="text-[#009466] mt-0.5" />
            <div>
              <div className="text-white/35 text-[11px]">المؤجّر</div>
              <div className="text-white text-sm font-semibold">مزوّد موثّق من شبكة شيول</div>
            </div>
          </div>
        </div>

        {/* scope table */}
        <div className="rounded-sm border border-white/10 overflow-hidden">
          <div className="bg-white/5 px-4 py-2 text-white/50 text-xs font-bold flex items-center gap-1.5">
            <FileText size={13} /> نطاق العمل
          </div>
          <div className="divide-y divide-white/5">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-2 px-4 py-2.5 text-sm">
                <span className="text-white/45">{k}</span>
                <span className="text-white font-semibold text-end">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* terms */}
        <ol className="text-white/45 text-xs leading-relaxed space-y-1.5 list-decimal list-inside pt-1">
          <li>يُعتبر هذا العقد موثّقاً إلكترونياً وملزماً للأطراف وفق ما اتفق عليه عند إكمال التأجير.</li>
          <li>تم تسليم المعدة واستلامها بحالة تشغيلية، وأُنجز التأجير بصفة نهائية.</li>
        </ol>

        <div className="flex items-center gap-2 text-[#009466] text-xs font-bold pt-3 border-t border-white/10">
          <CheckCircle2 size={14} /> اكتمل العقد وتُوثّق بتاريخ {issued}
        </div>
      </DialogContent>
    </Dialog>
  );
}