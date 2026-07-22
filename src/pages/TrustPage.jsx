import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Zap, BadgeCheck, MapPin, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/shayul/Navbar";
import FooterSection from "@/components/shayul/FooterSection";
import { useI18n } from "@/lib/i18n";
import { trust } from "@/lib/content";

const icons = { ShieldCheck, Zap, BadgeCheck, MapPin, FileText };

const INSURANCE_POINTS = {
  ar: [
    "كل معدة تدخل شبكة شيول مشمولة بتغطية تأمينية — لا استثناء.",
    "البوليصة تحمي الطرفين: صاحب المشروع وصاحب المعدة، طوال فترة التأجير.",
    "الأضرار الناتجة عن الاستخدام العادي مغطاة، دون حاجة إلى ضمان نقدي إضافي.",
    "التأمين مرتبط بالعقد الإلكتروني الموثّق ويسري منذ لحظة التسليم.",
    "مزوّد التأمين شريك مرخّص من الهيئة السعودية للتأمين (قريباً).",
  ],
  en: [
    "Every unit entering the Shaywal network is insured — no exceptions.",
    "The policy covers both parties: the project owner and the equipment owner, throughout the rental period.",
    "Damages from normal use are covered, with no additional cash security deposit required.",
    "Insurance is tied to the notarized e-contract and is effective from the moment of delivery.",
    "Insurance partner is a licensed provider under the Saudi Insurance Authority (coming soon).",
  ],
};

const CONTRACT_POINTS = {
  ar: [
    "يصدر العقد الإلكتروني فور الاتفاق على الشروط — قبل تحريك أي معدة.",
    "يحدد نطاق العمل والتواريخ والسعر والمسؤوليات بشكل ملزم قانونياً.",
    "كلا الطرفين يتلقيان نسخة موثّقة بالتوقيع الرقمي.",
    "في حال النزاع، العقد هو السند المرجعي أمام مركز التحكيم التجاري السعودي.",
    "لا حاجة لأي ورق — العملية كاملة إلكترونية.",
  ],
  en: [
    "The e-contract is issued the moment terms are agreed — before any unit moves.",
    "Scope of work, dates, price, and responsibilities are legally bound.",
    "Both parties receive a copy with a digital signature seal.",
    "In any dispute, the contract is the primary reference at the Saudi Commercial Arbitration Center.",
    "No paperwork needed — the entire process is digital.",
  ],
};

export default function TrustPage() {
  const { lang, dir } = useI18n();

  return (
    <div className="min-h-screen bg-[#1C1917] text-white" dir={dir}>
      <Navbar scrolled />
      <div className="h-16" />

      {/* Hero */}
      <div className="bg-[#0C0A09] border-b border-white/10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-5">
            {lang === "ar" ? "ثقة في كل تأجير" : "Trust on every rental"}
          </p>
          <h1 className="text-white font-bold mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}>
            {lang === "ar" ? (
              <>التأمين والعقد الموثّق:<br /><span className="text-[#D97706]">ركيزتا شيول</span></>
            ) : (
              <>Insurance & Notarized Contract:<br /><span className="text-[#D97706]">Shaywal's two pillars</span></>
            )}
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
            {lang === "ar"
              ? "لأن التأمين هو نقطة البيع الوحيدة التي تمنع الخوف من التأجير — بنيناها أولاً."
              : "Because insurance is the single selling point that removes the fear of renting — we built it first."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link to="/#request" className="bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors">
              {lang === "ar" ? "اطلب معدتك الآن" : "Request a unit now"}
            </Link>
            <Link to="/providers" className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors">
              {lang === "ar" ? "دليل المزوّدين" : "Provider Directory"}
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-24">

        {/* Trust pillars */}
        <section>
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">{trust.eyebrow[lang]}</p>
          <h2 className="text-white font-bold mb-10" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15 }}>
            {trust.title1[lang]} <span className="text-white/40">{trust.title2[lang]}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {trust.pillars.map((p) => {
              const Icon = icons[p.icon] || ShieldCheck;
              return (
                <div key={p.num} className="bg-[#0C0A09] border border-white/10 rounded-sm p-7 flex gap-5">
                  <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center shrink-0">
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-bold">{p.title[lang]}</h3>
                      {p.soon && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/30 text-green-400 bg-green-500/10">
                          {lang === "ar" ? "قريباً" : "Soon"}
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{p.desc[lang]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Insurance deep-dive */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">
                {lang === "ar" ? "التأمين المدمج" : "Embedded Insurance"}
              </p>
              <h2 className="text-white font-bold mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15 }}>
                {lang === "ar"
                  ? <>كل معدة مؤمَّنة — <span className="text-[#D97706]">بدون استثناء.</span></>
                  : <>Every unit insured — <span className="text-[#D97706]">without exception.</span></>}
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                {lang === "ar"
                  ? "نحن نعلم أن السوق يفتقر إلى الثقة لأن التأجير بدون تأمين مغامرة. شيول تحل هذه المعضلة بربط كل عقد بوثيقة تأمين آلية — المشروع مُغطّى قبل أن تُقلع المعدة."
                  : "We know the market lacks trust because renting without insurance is a gamble. Shaywal solves this by tying every contract to an automatic insurance policy — the project is covered before the unit ever starts."}
              </p>
              <ul className="space-y-3">
                {INSURANCE_POINTS[lang].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#D97706] mt-0.5 shrink-0" />
                    <span className="text-white/65 text-sm leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0C0A09] border border-[#D97706]/30 rounded-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-sm bg-[#D97706]/15 flex items-center justify-center">
                  <ShieldCheck size={24} className="text-[#D97706]" />
                </div>
                <div>
                  <p className="text-white font-bold">{lang === "ar" ? "وثيقة تأمين شاملة" : "Comprehensive Insurance Policy"}</p>
                  <p className="text-white/40 text-xs">{lang === "ar" ? "مرتبطة بكل عقد" : "Tied to every contract"}</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: { ar: "التغطية", en: "Coverage" }, val: { ar: "شاملة — تشغيل وأضرار", en: "Comprehensive — ops & damage" } },
                  { label: { ar: "السريان", en: "Effective" }, val: { ar: "من لحظة التسليم", en: "From moment of delivery" } },
                  { label: { ar: "المستفيد", en: "Beneficiary" }, val: { ar: "الطرفان معاً", en: "Both parties" } },
                  { label: { ar: "المزوّد", en: "Provider" }, val: { ar: "مرخّص من هيئة التأمين (قريباً)", en: "Licensed by Saudi Insurance Authority (soon)" } },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-white/8 last:border-0">
                    <span className="text-white/40 text-sm">{row.label[lang]}</span>
                    <span className="text-white text-sm font-medium">{row.val[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contract deep-dive */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1 bg-[#0C0A09] border border-white/10 rounded-sm p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 bg-[#D97706]/15 text-[#D97706] rounded-sm mb-4">
                  <FileText size={12} /> {lang === "ar" ? "موثّق إلكترونياً" : "Electronically Notarized"}
                </div>
                <h3 className="text-white font-bold text-lg">
                  {lang === "ar" ? "عقد تأجير معدة ثقيلة" : "Heavy Equipment Rental Agreement"}
                </h3>
                <p className="text-white/30 text-xs mt-1 font-mono">SHYW-2026-XXXX</p>
              </div>
              {[
                { k: { ar: "المعدة", en: "Equipment" }, v: { ar: "شيول مقاس ٦٦", en: "Wheel Loader · Size 66" } },
                { k: { ar: "المدة", en: "Duration" }, v: { ar: "أسبوعان", en: "2 weeks" } },
                { k: { ar: "الموقع", en: "Location" }, v: { ar: "حي النرجس، الرياض", en: "Al Narjis, Riyadh" } },
                { k: { ar: "السعر اليومي", en: "Daily Rate" }, v: { ar: "٨٠٠ ر.س", en: "SAR 800" } },
                { k: { ar: "الحالة", en: "Status" }, v: { ar: "✓ موثّق ومُفعَّل", en: "✓ Notarized & Active" } },
              ].map((row, i) => (
                <div key={i} className="flex justify-between py-2.5 border-b border-white/8 last:border-0 text-sm">
                  <span className="text-white/40">{row.k[lang]}</span>
                  <span className="text-white font-medium">{row.v[lang]}</span>
                </div>
              ))}
              <div className="mt-6 flex items-center gap-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[#D97706] text-[10px] font-bold tracking-widest">✦ {lang === "ar" ? "موثّق" : "NOTARIZED"} ✦</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">
                {lang === "ar" ? "العقد الإلكتروني الموثّق" : "Notarized E-Contract"}
              </p>
              <h2 className="text-white font-bold mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15 }}>
                {lang === "ar"
                  ? <>حقوقك مكتوبة — <span className="text-white/40">قبل أي تشغيل.</span></>
                  : <>Your rights in writing — <span className="text-white/40">before any operation.</span></>}
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                {lang === "ar"
                  ? "العقد الإلكتروني الموثّق يحوّل الاتفاق اللفظي إلى سند قانوني ملزم — قبل تحريك أي معدة."
                  : "The notarized e-contract turns a verbal agreement into a binding legal instrument — before any unit moves."}
              </p>
              <ul className="space-y-3">
                {CONTRACT_POINTS[lang].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#FCD34D] mt-0.5 shrink-0" />
                    <span className="text-white/65 text-sm leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#D97706]/10 border border-[#D97706]/30 border-dashed rounded-sm p-10 text-center">
          <ShieldCheck size={40} className="text-[#D97706] mx-auto mb-5" />
          <h2 className="text-white font-bold text-2xl mb-3">
            {lang === "ar" ? "ابدأ بثقة" : "Start with confidence"}
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            {lang === "ar"
              ? "كل طلب على شيول مغطّى بالعقد والتأمين — سواء كنت صاحب مشروع أو مزوّد معدات."
              : "Every request on Shaywal is covered by contract and insurance — whether you're a project owner or equipment provider."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/#request" className="bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors">
              {lang === "ar" ? "اطلب معدة الآن" : "Request a unit"}
            </Link>
            <Link to="/providers" className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors inline-flex items-center gap-2">
              {lang === "ar" ? "عرض المزوّدين" : "View Providers"} <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}