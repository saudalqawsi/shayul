import React from "react";
import {
  ClipboardList, Search, Stamp, Truck, ArrowLeft,
  ShieldCheck, Clock, FileCheck, User, Database, CheckCircle2
} from "lucide-react";
import Navbar from "@/components/shayul/Navbar";
import FooterSection from "@/components/shayul/FooterSection";
import ContractPreview from "@/components/shayul/ContractPreview";
import { useI18n } from "@/lib/i18n";
import { how, journey } from "@/lib/content";

const StepIcons = [ClipboardList, Search, Stamp, Truck];
const roleIcons = { User, Database };

export default function HowItWorksPage() {
  const { lang, dir } = useI18n();

  return (
    <div className="min-h-screen bg-[#1C1917] text-white" dir={dir}>
      <Navbar scrolled />
      <div className="h-16" />

      {/* Hero */}
      <div className="bg-[#0C0A09] border-b border-white/10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> {lang === "ar" ? "الرئيسية" : "Home"}
          </a>
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">{how.eyebrow[lang]}</p>
          <h1 className="text-white font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            {how.title1[lang]}<br />
            <span className="text-white/40">{how.title2[lang]}</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mt-4 leading-relaxed">
            {lang === "ar"
              ? "من اللحظة التي تختار فيها معدتك حتى وصولها لموقعك — كل خطوة موثّقة ومضمونة."
              : "From the moment you choose a unit to its arrival at your site — every step documented and guaranteed."}
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">

        {/* 4-step roadmap */}
        <section>
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-10">
            {lang === "ar" ? "مسار الحجز" : "Booking Flow"}
          </p>

          {/* Mobile */}
          <div className="lg:hidden relative">
            <div className="absolute start-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#D97706] via-[#FCD34D] to-[#D97706]" />
            {how.steps.map((step, i) => {
              const Icon = StepIcons[i] || ClipboardList;
              return (
                <div key={step.num} className="relative ps-16 pb-8 last:pb-0">
                  <div className="absolute start-0 w-12 h-12 rounded-full bg-[#1C1917] flex items-center justify-center z-10" style={{ border: `2px solid ${step.color}` }}>
                    <Icon size={20} style={{ color: step.color }} />
                  </div>
                  <div className="bg-[#0C0A09] border border-white/10 rounded-sm p-5">
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border mb-2" style={{ color: step.color, borderColor: `${step.color}40`, backgroundColor: `${step.color}10` }}>
                      {step.party[lang]}
                    </span>
                    <h3 className="text-white font-bold">{step.title[lang]}</h3>
                    <p className="text-white/45 text-sm mt-1 leading-relaxed">{step.desc[lang]}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-4 gap-6 relative">
            <div className="absolute top-10 start-[12.5%] end-[12.5%] h-0 border-t-2 border-dashed border-[#D97706]/30" />
            {how.steps.map((step, i) => {
              const Icon = StepIcons[i] || ClipboardList;
              return (
                <div key={step.num} className="flex flex-col items-center text-center px-2">
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-[#1C1917] border-2 flex items-center justify-center" style={{ borderColor: step.color }}>
                      <Icon size={26} style={{ color: step.color }} />
                    </div>
                    <span className="absolute -top-1.5 -start-1.5 w-7 h-7 rounded-full text-[11px] font-mono font-bold flex items-center justify-center border border-white/15" style={{ backgroundColor: step.color, color: "#fff" }}>
                      {step.num}
                    </span>
                  </div>
                  <span className="mt-4 inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border" style={{ color: step.color, borderColor: `${step.color}40`, backgroundColor: `${step.color}10` }}>
                    {step.party[lang]}
                  </span>
                  <h3 className="text-white font-bold text-base mt-2.5">{step.title[lang]}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mt-1.5 max-w-[15rem]">{step.desc[lang]}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contract section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ContractPreview />
            </div>
            <div>
              <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">
                {lang === "ar" ? "نهاية آمنة" : "Secured outcome"}
              </p>
              <h2 className="text-white font-bold mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}>
                {lang === "ar" ? "كل خطوة محمية بعقد موثّق." : "Every step is backed by a notarized contract."}
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-8">
                {lang === "ar"
                  ? "حين تتقدّم خطوة، يتحوّل اتفاقك إلى وثيقة إلكترونية ملزمة تحفظ حقك قبل تشغيل المعدة."
                  : "As you progress, your agreement becomes a binding e-instrument that protects you before the unit ever runs."}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {how.stats.map((s) => (
                  <div key={s.val.en} className="bg-[#0C0A09] border border-white/15 rounded-sm p-3 text-center">
                    <div className="text-[#D97706] font-bold text-sm font-mono">{s.val[lang]}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.label[lang]}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-white/55 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <FileCheck size={14} className="text-[#D97706]" /> {lang === "ar" ? "عقد إلكتروني موثّق" : "Notarized contract"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/55 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <Clock size={14} className="text-[#FCD34D]" /> {lang === "ar" ? "تسليم اليوم أو التالي" : "Same / next-day delivery"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Full journey — project owner perspective */}
        <section>
          <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4">{journey.eyebrow[lang]}</p>
          <h2 className="text-white font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15 }}>
            {journey.title1[lang]} <span className="text-white/40">{journey.title2[lang]}</span>
          </h2>
          <div className="space-y-3">
            {journey.stages.map((stage) => (
              <div key={stage.num} className="bg-[#0C0A09] border border-white/8 rounded-sm p-5 grid grid-cols-1 md:grid-cols-[4rem_1fr_2fr] gap-4 items-start">
                <div className="flex items-center gap-3 md:block">
                  <span className="text-[#D97706] font-mono font-bold text-sm">{stage.num}</span>
                  <span className="text-white/30 text-[10px] tracking-widest uppercase block mt-0.5">{stage.phase[lang]}</span>
                </div>
                <h3 className="text-white font-bold">{stage.title[lang]}</h3>
                <div className="space-y-1.5">
                  {stage.client && (
                    <div className="flex items-start gap-2">
                      <User size={13} className="text-[#D97706] mt-0.5 shrink-0" />
                      <p className="text-white/55 text-sm">{stage.client[lang]}</p>
                    </div>
                  )}
                  {stage.platform && (
                    <div className="flex items-start gap-2">
                      <Database size={13} className="text-[#FCD34D] mt-0.5 shrink-0" />
                      <p className="text-white/40 text-sm">{stage.platform[lang]}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#D97706]/10 border border-[#D97706]/30 border-dashed rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 p-8">
          <div>
            <h3 className="text-white font-bold text-xl">
              {lang === "ar" ? "استعد للبدء" : "Ready to start?"}
            </h3>
            <p className="text-white/40 text-sm mt-1">
              {lang === "ar" ? "الحجز يستغرق دقائق — فريقنا يتولى الباقي." : "Booking takes minutes — our team handles the rest."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/#request" className="bg-[#D97706] hover:bg-[#B45309] text-white px-7 py-3 rounded-sm text-sm font-bold transition-colors">
              {lang === "ar" ? "اطلب معدة الآن" : "Request a unit"}
            </a>
            <a href="/pricing" className="border border-white/20 text-white/60 hover:text-white px-7 py-3 rounded-sm text-sm font-bold transition-colors">
              {lang === "ar" ? "دليل الأسعار" : "Pricing Guide"}
            </a>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}