import React, { useState } from "react";
import { Shield, CheckCircle } from "lucide-react";

const equipTypes = [
  "شيول / لودر", "حفارة / باك لودر", "بوبكات", "بوكلين", "قريدر",
  "بلدوزر", "رصاصة / دكاكة", "قالب / شاحنة", "فوركلفت", "كرين", "أخرى",
];

export default function RequestForm() {
  const [form, setForm] = useState({
    name: "", phone: "", company: "", equipType: "", quantity: "1",
    location: "", duration: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="request" className="py-24 bg-[#0A1A30]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-[#009466]/20 rounded-sm flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#009466]" />
          </div>
          <h2 className="text-white font-bold text-3xl mb-4">تم استلام طلبك!</h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            سيتواصل معك فريق شيول خلال ساعتين لتأكيد التفاصيل وإعداد عقدك الإلكتروني.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#009466] hover:bg-[#007a54] text-white px-8 py-3 rounded-sm font-bold transition-colors"
          >
            إرسال طلب جديد
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="py-24 bg-[#0A1A30] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
              أرسل طلبك
            </p>
            <h2
              className="text-white font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
            >
              احجز المعدة
              <br />
              <span className="text-white/40">في دقائق.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10">
              أرسل تفاصيل طلبك وسيتواصل معك فريق شيول لتأكيد التوفر وإعداد العقد الإلكتروني والبوليصة التأمينية.
            </p>

            {/* Guarantees */}
            <div className="space-y-4">
              {[
                { title: "عقد إلكتروني موثّق", desc: "يصدر فور الاتفاق على الشروط" },
                { title: "بوليصة تأمين شاملة", desc: "تغطي المعدة والأضرار في الموقع" },
                { title: "تسليم سريع", desc: "اليوم نفسه أو اليوم التالي للطلب" },
                { title: "تحصيل مضمون", desc: "عبر طرف محايد مرخّص من ساما" },
              ].map((g) => (
                <div key={g.title} className="flex items-start gap-3">
                  <Shield size={16} className="text-[#009466] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-sm">{g.title}</div>
                    <div className="text-white/40 text-xs">{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[#081626] border border-white/10 rounded-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/50 text-xs font-bold tracking-wide block mb-2">الاسم الكامل *</label>
                  <input
                    name="name" required value={form.name} onChange={handleChange}
                    placeholder="محمد العتيبي"
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#009466] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-bold tracking-wide block mb-2">رقم الجوال *</label>
                  <input
                    name="phone" required value={form.phone} onChange={handleChange}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#009466] transition-colors font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/50 text-xs font-bold tracking-wide block mb-2">الشركة / المنشأة</label>
                <input
                  name="company" value={form.company} onChange={handleChange}
                  placeholder="اسم شركتك أو مشروعك"
                  className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#009466] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/50 text-xs font-bold tracking-wide block mb-2">نوع المعدة *</label>
                  <select
                    name="equipType" required value={form.equipType} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#009466] transition-colors appearance-none"
                    style={{ backgroundColor: "rgba(8,22,38,1)" }}
                  >
                    <option value="" className="bg-[#081626]">اختر نوع المعدة</option>
                    {equipTypes.map((e) => (
                      <option key={e} value={e} className="bg-[#081626]">{e}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white/50 text-xs font-bold tracking-wide block mb-2">العدد المطلوب</label>
                  <input
                    name="quantity" value={form.quantity} onChange={handleChange}
                    type="number" min="1" max="50"
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#009466] transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/50 text-xs font-bold tracking-wide block mb-2">موقع المشروع *</label>
                <input
                  name="location" required value={form.location} onChange={handleChange}
                  placeholder="الحي، المدينة — مثال: حي النرجس، الرياض"
                  className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#009466] transition-colors"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs font-bold tracking-wide block mb-2">المدة المطلوبة *</label>
                <select
                  name="duration" required value={form.duration} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#009466] transition-colors appearance-none"
                  style={{ backgroundColor: "rgba(8,22,38,1)" }}
                >
                  <option value="" className="bg-[#081626]">اختر المدة</option>
                  <option value="day" className="bg-[#081626]">يومي (وردية واحدة)</option>
                  <option value="week" className="bg-[#081626]">أسبوعي</option>
                  <option value="month" className="bg-[#081626]">شهري</option>
                  <option value="scope" className="bg-[#081626]">مقطوعة — نطاق عمل محدد</option>
                </select>
              </div>

              <div>
                <label className="text-white/50 text-xs font-bold tracking-wide block mb-2">تفاصيل إضافية</label>
                <textarea
                  name="notes" value={form.notes} onChange={handleChange}
                  rows={3}
                  placeholder="نوع العمل، ساعات التشغيل، أي متطلبات خاصة..."
                  className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#009466] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#009466] hover:bg-[#007a54] text-white py-4 rounded-sm font-bold text-base transition-colors duration-200 tracking-wide"
              >
                أرسل الطلب — مجاناً وبدون التزام
              </button>

              <p className="text-white/25 text-xs text-center">
                بإرسال الطلب توافق على التواصل معك لتأكيد التفاصيل
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}