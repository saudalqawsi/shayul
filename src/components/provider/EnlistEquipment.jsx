import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TYPES = ["Wheel Loader","Backhoe Loader","Bobcat","Forklift Truck","Motor Grader","Bulldozer","Vibratory Roller","Dump Truck","Telehandler","Crane","Other"];

export default function EnlistEquipment({ onCreated }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", type: "Wheel Loader", daily_rate: "", monthly_rate: "",
    weight: "", power: "", size_spec: "", location: "", image_url: "", notes: "",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.daily_rate) return;
    setSaving(true);
    try {
      await base44.entities.Equipment.create({
        ...form,
        daily_rate: Number(form.daily_rate),
        monthly_rate: form.monthly_rate ? Number(form.monthly_rate) : undefined,
        status: "available",
      });
      setForm({ name: "", type: "Wheel Loader", daily_rate: "", monthly_rate: "", weight: "", power: "", size_spec: "", location: "", image_url: "", notes: "" });
      toast({ title: "تمت إضافة المعدة", description: "أُضيفت المعدات إلى أسطولك." });
      onCreated?.();
    } catch (err) {
      toast({ title: "تعذّرت الإضافة", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "bg-white/5 border-white/15 text-white placeholder:text-white/30";

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label className="text-white/70">اسم المعدة *</Label>
        <Input value={form.name} onChange={set("name")} required placeholder="شيول مقاس ٦٦" className={inputCls} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70">نوع المعدة *</Label>
        <select value={form.type} onChange={set("type")} className="w-full h-9 rounded-sm border border-white/15 bg-white/5 text-white px-3 text-sm">
          {TYPES.map((t) => <option key={t} value={t} className="bg-[#0A1A30]">{t}</option>)}
        </select>
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70">السعر اليومي (ر.س) *</Label>
        <Input type="number" value={form.daily_rate} onChange={set("daily_rate")} required placeholder="800" className={inputCls} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70">السعر الشهري (ر.س)</Label>
        <Input type="number" value={form.monthly_rate} onChange={set("monthly_rate")} placeholder="18000" className={inputCls} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70">الوزن</Label>
        <Input value={form.weight} onChange={set("weight")} placeholder="١٨ طن" className={inputCls} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70">القدرة</Label>
        <Input value={form.power} onChange={set("power")} placeholder="٢٥٠ حصان" className={inputCls} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70">المقاس / الموديل</Label>
        <Input value={form.size_spec} onChange={set("size_spec")} placeholder="مقاس ٦٦" className={inputCls} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70">الموقع / الحي</Label>
        <Input value={form.location} onChange={set("location")} placeholder="الرياض" className={inputCls} />
      </div>
      <div className="space-y-1.5 md:col-span-2">
        <Label className="text-white/70">رابط الصورة</Label>
        <Input value={form.image_url} onChange={set("image_url")} placeholder="https://..." className={inputCls} />
      </div>
      <div className="space-y-1.5 md:col-span-2">
        <Label className="text-white/70">ملاحظات</Label>
        <Input value={form.notes} onChange={set("notes")} placeholder="أي تفاصيل إضافية" className={inputCls} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={saving} className="bg-[#009466] hover:bg-[#007a54] text-white">
          {saving ? "جاري الإضافة..." : "أضف المعدة للأسطول"}
        </Button>
      </div>
    </form>
  );
}