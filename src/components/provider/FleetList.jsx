import React from "react";
import { Trash2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const STATUS = {
  available: { ar: "متاحة", cls: "bg-[#009466]/20 text-[#009466] border-[#009466]/40" },
  rented: { ar: "مؤجّرة", cls: "bg-[#0696B0]/20 text-[#0696B0] border-[#0696B0]/40" },
  maintenance: { ar: "صيانة", cls: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
};

export default function FleetList({ equipment, onChange, onDelete }) {
  const { toast } = useToast();

  const change = async (eq, status) => {
    try { await onChange(eq, status); } catch (e) { toast({ title: "تعذّر التحديث", description: e.message, variant: "destructive" }); }
  };
  const remove = async (eq) => {
    try { await onDelete(eq); } catch (e) { toast({ title: "تعذّر الحذف", description: e.message, variant: "destructive" }); }
  };

  if (!equipment.length) {
    return <p className="text-white/40 text-sm py-10 text-center border border-dashed border-white/10 rounded-sm">لا توجد معدات في أسطولك بعد. أضف أول معدة من تبويب «تسجيل معدة».</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
      {equipment.map((eq) => {
        const s = STATUS[eq.status] || STATUS.available;
        return (
          <div key={eq.id} className="bg-white/4 border border-white/10 rounded-sm overflow-hidden flex">
            <div className="w-28 h-28 flex-shrink-0 bg-[#081626]">
              {eq.image_url ? (
                <Image src={eq.image_url} alt={eq.name} className="w-full h-full" fittingType="fill" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">لا صورة</div>
              )}
            </div>
            <div className="p-4 flex-1 min-w-0">
              <div dir="ltr" className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-white font-bold text-sm truncate">{eq.name}</h3>
                <Badge className={`border ${s.cls}`}>{s.ar}</Badge>
              </div>
              <p className="text-white/40 text-xs font-mono mb-2">{eq.type}</p>
              <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
                <span><span className="text-[#009466] font-mono font-bold">{eq.daily_rate}</span> ر.س/يوم</span>
                {eq.monthly_rate ? <span className="text-white/35"><span className="font-mono">{eq.monthly_rate}</span> شهري</span> : null}
              </div>
              <div className="flex items-center justify-between gap-2">
                <select
                  value={eq.status}
                  onChange={(e) => change(eq, e.target.value)}
                  className="h-8 rounded-sm border border-white/15 bg-white/5 text-white px-2 text-xs"
                >
                  <option value="available" className="bg-[#0A1A30]">متاحة</option>
                  <option value="rented" className="bg-[#0A1A30]">مؤجّرة</option>
                  <option value="maintenance" className="bg-[#0A1A30]">صيانة</option>
                </select>
                <Button size="sm" variant="ghost" onClick={() => remove(eq)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 px-2">
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}