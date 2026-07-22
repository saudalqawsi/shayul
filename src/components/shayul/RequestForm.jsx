import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { requestForm, equipment } from "@/lib/content";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/lib/cart";
import EquipmentPicker from "@/components/shayul/EquipmentPicker";
import Riyal from "@/components/shayul/Riyal";
import { Link, useNavigate } from "react-router-dom";

export default function RequestForm() {
  const { lang, dir, num } = useI18n();
  const { cart, inc, dec, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "", company: "",
    location: "", duration: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = Object.entries(cart).map(([key, qty]) => ({
      equipment_name: key, qty,
    }));
    if (items.length === 0) return;
    // Composite string for the legacy equipment_name field so existing
    // dashboards keep showing something meaningful alongside the structured items list.
    const summary = items.map((i) => `${i.equipment_name} ×${i.qty}`).join(lang === "ar" ? "، " : ", ");
    try {
      await base44.entities.RentalRequest.create({
        equipment_name: summary,
        client_name: form.name,
        phone: form.phone,
        company: form.company,
        location: form.location,
        duration: form.duration,
        qty: total,
        status: "pending",
        notes: form.notes,
        equipment_items: items,
      });
    } catch (err) {
      console.warn("RentalRequest not saved:", err);
    }
    // After capturing the request, route the visitor:
    //  • Returning user (already signed in) → straight to their dashboard.
    //  • New user → registration page, so we can record their account
    //    information. The request we just saved is keyed by the phone number
    //    they entered, so it can be attributed to the new account later.
    let isAuthed = false;
    try { isAuthed = await base44.auth.isAuthenticated(); } catch { isAuthed = false; }
    clear();
    navigate(isAuthed ? "/client-dashboard" : "/register?from=/client-dashboard");
  };

  const f = requestForm.fields;
  const itemCount = Object.values(cart).filter((n) => n > 0).length;
  const hasItems = itemCount > 0;

  if (submitted) {
    return (
      <section id="request" className="py-24 bg-[#1C1917]" dir={dir}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-[#D97706]/20 rounded-sm flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#D97706]" />
          </div>
          <h2 className="text-white font-bold text-3xl mb-4">{requestForm.successTitle[lang]}</h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">{requestForm.successDesc[lang]}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3 rounded-sm font-bold transition-colors"
          >
            {requestForm.newRequest[lang]}
          </button>
        </div>
      </section>
    );
  }

  const inputClass = "w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#D97706] transition-colors";
  const labelClass = "text-white/50 text-xs font-bold tracking-wide block mb-2";

  return (
    <section id="request" className="py-24 bg-[#1C1917] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">
              {requestForm.eyebrow[lang]}
            </p>
            <h2
              className="text-white font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}
            >
              {requestForm.title1[lang]}
              <br />
              <span className="text-white/40">{requestForm.title2[lang]}</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed max-w-md mb-8">
              {requestForm.intro[lang]}
            </p>
          </div>

          {/* Right: Form */}
          <div className="bg-[#0C0A09] border border-white/10 rounded-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact info — name + phone squeezed into one row at every breakpoint */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>{f.name[lang]}</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder={f.namePh[lang]} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{f.phone[lang]}</label>
                  <input name="phone" required value={form.phone} onChange={handleChange} placeholder={f.phonePh} dir="ltr" className={`${inputClass} font-mono`} />
                </div>
              </div>

              {/* Company + location paired on one row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>{f.company[lang]}</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder={f.companyPh[lang]} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{f.location[lang]}</label>
                  <input name="location" required value={form.location} onChange={handleChange} placeholder={f.locationPh[lang]} className={inputClass} />
                </div>
              </div>

              {/* Equipment picker — multi-equipment, multi-count */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/50 text-xs font-bold tracking-wide">
                    {lang === "ar" ? "اختر المعدات والعدد *" : "Select equipment & counts *"}
                  </label>
                  <span className={`text-[11px] font-mono ${hasItems ? "text-[#FCD34D]" : "text-white/30"}`}>
                    {hasItems
                      ? lang === "ar"
                        ? `${itemCount} بنود · ${total} معدة`
                        : `${itemCount} items · ${total} units`
                      : lang === "ar"
                        ? "اضغط + لإضافة معدة"
                        : "Tap + to add a unit"}
                  </span>
                </div>
                <div className="bg-black/30 border border-white/10 rounded-sm p-3">
                  <EquipmentPicker items={equipment} value={cart} onInc={inc} onDec={dec} />
                </div>
              </div>

              {/* Duration alone — the select with descriptive AR options needs the full row */}
              <div>
                <label className={labelClass}>{f.duration[lang]}</label>
                <select name="duration" required value={form.duration} onChange={handleChange} className={`${inputClass} appearance-none`} style={{ backgroundColor: "rgba(8,22,38,1)" }}>
                  <option value="" className="bg-[#0C0A09]">{f.durationPh[lang]}</option>
                  <option value="day" className="bg-[#0C0A09]">{lang === "ar" ? "يومي (وردية واحدة)" : "Daily (single shift)"}</option>
                  <option value="week" className="bg-[#0C0A09]">{lang === "ar" ? "أسبوعي" : "Weekly"}</option>
                  <option value="scope" className="bg-[#0C0A09]">{lang === "ar" ? "مقطوعة — نطاق عمل محدد" : "Lump-sum — defined scope"}</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>{f.notes[lang]}</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder={f.notesPh[lang]} className={`${inputClass} resize-none`} />
              </div>

              {/* Indicative quote — appears once equipment & a durational
                  option (day/week) are selected, so the user sees the rough
                  cost before submitting. Scope/lump-sum defers to contract. */}
              {(() => {
                if (!hasItems || !form.duration) return null;
                if (form.duration === "scope") {
                  return (
                    <div className="rounded-sm border border-white/15 bg-white/5 px-4 py-3">
                      <p className="text-white/55 text-sm text-center">
                        {lang === "ar"
                          ? "سعر مقطوع — يُحدد في العقد الموثّق."
                          : "Lump-sum — set in the notarized contract."}
                      </p>
                    </div>
                  );
                }
                const dayTotal = Object.entries(cart)
                  .filter(([, q]) => q > 0)
                  .reduce((s, [key, qty]) => {
                    const eq = equipment.find((e) => e.name.en === key);
                    return s + qty * (eq?.daily || 0);
                  }, 0);
                if (dayTotal === 0) return null;
                const factor = form.duration === "day" ? 1 : 6;
                const quote = dayTotal * factor;
                const headLabel =
                  form.duration === "day"
                    ? lang === "ar"
                      ? "التكلفة التقديرية · يومي"
                      : "Indicative cost · daily"
                    : lang === "ar"
                      ? "التكلفة التقديرية · أسبوعي"
                      : "Indicative cost · weekly";
                return (
                  <div className="rounded-sm border border-[#D97706]/30 bg-[#D97706]/10 px-4 py-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[#FCD34D] text-xs font-bold tracking-widest uppercase">{headLabel}</p>
                      <p className="text-white/45 text-[11px] mt-1 leading-relaxed">
                        {lang === "ar"
                          ? "تشمل السائق والوقود · السعر النهائي يحدده العقد الموثّق."
                          : "Includes operator & fuel · final price is set by the notarized contract."}
                      </p>
                    </div>
                    <div className="flex items-end gap-1 shrink-0">
                      <span className="text-[#FCD34D] font-bold font-mono text-2xl leading-none">{num(quote)}</span>
                      <Riyal size={15} />
                    </div>
                  </div>
                );
              })()}

              {/* Delivery promise — sits beside the indicative quote to tie the
                  cost with the turnaround expectation. Shown whenever the user
                  has both picked equipment and chosen a duration. */}
              {hasItems && form.duration && (
                <p className="text-white/45 text-[11px] text-center leading-relaxed">
                  {lang === "ar"
                    ? "تسليم اليوم أو اليوم التالي · حسب التوفّر*"
                    : "Same / next-day delivery · based on availability*"}
                </p>
              )}

              <button
                type="submit"
                disabled={!hasItems}
                className="w-full bg-[#D97706] hover:bg-[#B45309] disabled:bg-white/5 disabled:text-white/30 disabled:cursor-not-allowed text-white py-4 rounded-sm font-bold text-base transition-colors duration-200 tracking-wide"
              >
                {requestForm.submit[lang]}
              </button>

              <p className="text-white/25 text-xs text-center">{requestForm.consent[lang]}</p>

              {/* Returning customer — login sits just below submit so a guest
                  filling out a list has the option to either create an account
                  (submit) or finish the request after logging in. */}
              <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/5">
                <span className="text-white/40 text-[11px]">
                  {lang === "ar" ? "لديك حساب معنا؟" : "Already have an account?"}
                </span>
                <Link to="/login?from=/client-dashboard" className="text-[#FCD34D] hover:text-white text-[11px] font-bold transition-colors">
                  {lang === "ar" ? "سجّل الدخول" : "Log in"}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}