import React, { useState } from "react";
import { Shield, CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { requestForm } from "@/lib/content";
import { base44 } from "@/api/base44Client";

export default function RequestForm() {
  const { lang, dir } = useI18n();
  const [form, setForm] = useState({
    name: "", phone: "", company: "", equipType: "", quantity: "1",
    location: "", duration: "", notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Persist the request so the client can track it in their dashboard.
    try {
      await base44.entities.RentalRequest.create({
        equipment_name: form.equipType,
        client_name: form.name,
        phone: form.phone,
        company: form.company,
        location: form.location,
        duration: form.duration,
        qty: Number(form.quantity) || 1,
        status: "pending",
        notes: form.notes
      });
    } catch (err) {
      // Non-fatal: public visitors without an account still see the success screen.
      console.warn("RentalRequest not saved:", err);
    }
    setSubmitted(true);
  };

  const f = requestForm.fields;

  if (submitted) {
    return (
      <section id="request" className="py-24 bg-[#0A1A30]" dir={dir}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-[#009466]/20 rounded-sm flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#009466]" />
          </div>
          <h2 className="text-white font-bold text-3xl mb-4">{requestForm.successTitle[lang]}</h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">{requestForm.successDesc[lang]}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#009466] hover:bg-[#007a54] text-white px-8 py-3 rounded-sm font-bold transition-colors">
            
            {requestForm.newRequest[lang]}
          </button>
        </div>
      </section>);

  }

  const inputClass = "w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#009466] transition-colors";
  const labelClass = "text-white/50 text-xs font-bold tracking-wide block mb-2";

  return (
    <section id="request" className="py-24 bg-[#0A1A30] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
              {requestForm.eyebrow[lang]}
            </p>
            <h2
              className="text-white font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}>
              
              {requestForm.title1[lang]}
              <br />
              <span className="text-white/40">{requestForm.title2[lang]}</span>
            </h2>
            

            {/* Guarantees */}
            









            
          </div>

          {/* Right: Form */}
          <div className="bg-[#081626] border border-white/10 rounded-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{f.name[lang]}</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder={f.namePh[lang]} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{f.phone[lang]}</label>
                  <input name="phone" required value={form.phone} onChange={handleChange} placeholder={f.phonePh} dir="ltr" className={`${inputClass} font-mono`} />
                </div>
              </div>

              <div>
                <label className={labelClass}>{f.company[lang]}</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder={f.companyPh[lang]} className={inputClass} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{f.type[lang]}</label>
                  <select name="equipType" required value={form.equipType} onChange={handleChange} className={`${inputClass} appearance-none`} style={{ backgroundColor: "rgba(8,22,38,1)" }}>
                    <option value="" className="bg-[#081626]">{f.typePh[lang]}</option>
                    {requestForm.equipTypes[lang].map((e) =>
                    <option key={e} value={e} className="bg-[#081626]">{e}</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{f.qty[lang]}</label>
                  <input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="1" max="50" className={`${inputClass} font-mono`} />
                </div>
              </div>

              <div>
                <label className={labelClass}>{f.location[lang]}</label>
                <input name="location" required value={form.location} onChange={handleChange} placeholder={f.locationPh[lang]} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>{f.duration[lang]}</label>
                <select name="duration" required value={form.duration} onChange={handleChange} className={`${inputClass} appearance-none`} style={{ backgroundColor: "rgba(8,22,38,1)" }}>
                  <option value="" className="bg-[#081626]">{f.durationPh[lang]}</option>
                  <option value="day" className="bg-[#081626]">{lang === "ar" ? "يومي (وردية واحدة)" : "Daily (single shift)"}</option>
                  <option value="week" className="bg-[#081626]">{lang === "ar" ? "أسبوعي" : "Weekly"}</option>
                  <option value="scope" className="bg-[#081626]">{lang === "ar" ? "مقطوعة — نطاق عمل محدد" : "Lump-sum — defined scope"}</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>{f.notes[lang]}</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder={f.notesPh[lang]} className={`${inputClass} resize-none`} />
              </div>

              <button type="submit" className="w-full bg-[#009466] hover:bg-[#007a54] text-white py-4 rounded-sm font-bold text-base transition-colors duration-200 tracking-wide">
                {requestForm.submit[lang]}
              </button>

              <p className="text-white/25 text-xs text-center">{requestForm.consent[lang]}</p>
            </form>
          </div>
        </div>
      </div>
    </section>);

}