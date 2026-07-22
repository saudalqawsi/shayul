import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HardHat, CheckCircle2, Building2, Hash, MapPin, Phone, Truck, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/shayul/Navbar";

export default function ProviderOnboarding({ onComplete }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ company: "", cr: "", coverage: "", phone: "", fleet: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.company || !form.cr || !form.coverage || !form.phone) {
      toast({ title: "أكمل الحقول المطلوبة", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await base44.auth.updateMe({
        provider_onboarded: true,
        provider_company: form.company,
        provider_cr: form.cr,
        provider_coverage: form.coverage,
        provider_phone: form.phone,
        provider_fleet_size: form.fleet ? Number(form.fleet) : undefined,
      });
      toast({ title: "تم تسجيلك بنجاح", description: "مرحباً بك في شبكة شيول للمزوّدين." });
      onComplete?.();
    } catch (err) {
      toast({ title: "تعذّر التسجيل", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const reqs = [
    "سجل تجاري ووثائق رسمية للمنشأة",
    "تفاصيل الأسطول — نوع وعدد ومواصفات كل معدة",
    "أسعار واضحة (يومي / شهري / مقطوعة)",
    "نطاق تغطية جغرافي محدد",
    "التزام بجاهزية المعدة قبل التسليم",
  ];

  const inputCls = "bg-white/5 border-white/15 text-white placeholder:text-white/30";

  return (
    <div className="min-h-screen bg-[#1C1917] text-white" dir="rtl">
      <Navbar scrolled />
      <div className="h-16" />

      <main className="max-w-3xl mx-auto px-5 py-10">
        <div className="flex items-center gap-2 text-[#FCD34D] text-xs font-bold tracking-widest uppercase mb-4">
          <HardHat size={14} /> بوابة المزوّد
        </div>
        <h1 className="text-white font-bold text-3xl mb-3">سجّل شركتك في شبكة شيول</h1>
        <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
          أکمل بيانات منشأتك للتسجيل كمزوّد معدات موثّق. بعد التسجيل ستتمكّن من إضافة أسطولك واستقبال طلبات التأجير الواردة — بعقد إلكتروني موثّق.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={submit} className="space-y-4 bg-white/3 border border-white/10 rounded-sm p-6">
            <div className="space-y-1.5">
              <Label className="text-white/70 flex items-center gap-1.5"><Building2 size={12} /> اسم الشركة / المنشأة *</Label>
              <Input value={form.company} onChange={set("company")} required placeholder="شركة المعدات الوطنية" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 flex items-center gap-1.5"><Hash size={12} /> رقم السجل التجاري *</Label>
              <Input value={form.cr} onChange={set("cr")} required placeholder="1010xxxxx" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 flex items-center gap-1.5"><MapPin size={12} /> المدينة / نطاق التغطية *</Label>
              <Input value={form.coverage} onChange={set("coverage")} required placeholder="الرياض والمنطقة الوسطى" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 flex items-center gap-1.5"><Phone size={12} /> رقم التواصل *</Label>
              <Input value={form.phone} onChange={set("phone")} required placeholder="05xxxxxxxx" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 flex items-center gap-1.5"><Truck size={12} /> حجم الأسطول (عدد المعدات)</Label>
              <Input type="number" value={form.fleet} onChange={set("fleet")} placeholder="5" className={inputCls} />
            </div>
            <Button type="submit" disabled={saving} className="bg-[#D97706] hover:bg-[#B45309] text-white w-full">
              {saving ? "جاري التسجيل..." : "أكمل التسجيل وأضف أسطولك"}
              {!saving && <ArrowLeft size={15} className="ms-2 rotate-180" />}
            </Button>
          </form>

          {/* Requirements */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">متطلبات التسجيل</h3>
            <div className="bg-white/4 border border-white/10 rounded-sm p-6">
              <ul className="space-y-3">
                {reqs.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#FCD34D] flex-shrink-0 mt-0.5" />
                    <span className="text-white/60 text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-white/40 text-xs mt-4 leading-relaxed">
              بعد التسجيل ستنتقل مباشرةً إلى لوحة تحكم المزوّد حيث يمكنك إضافة معداتك واستقبال الطلبات.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}