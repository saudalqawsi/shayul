import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Sparkles,
  ClipboardList,
  UserPlus,
  FileText,
  Truck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { provider } from "@/lib/content";

// Ordered register-and-enlist process shown as numbered step cards.
const STEPS = [
  {
    Icon: UserPlus,
    title: { ar: "إنشاء الحساب", en: "Create Account" },
    desc: {
      ar: "ادخل عبر بوابة المزوّد ببريدك الإلكتروني ورقم جوالك.",
      en: "Sign in to the provider portal with your email and phone.",
    },
  },
  {
    Icon: FileText,
    title: { ar: "رفع وثائق المنشأة", en: "Submit Entity Docs" },
    desc: {
      ar: "أرفق السجل التجاري والوثائق الرسمية للتحقق.",
      en: "Attach the commercial registration and official entity documents for verification.",
    },
  },
  {
    Icon: ClipboardList,
    title: { ar: "إدراج الأسطول والأسعار", en: "List Fleet & Rates" },
    desc: {
      ar: "أضف نوع وعدد ومواصفات كل معدة وأسعارها (يومي/شهري/مقطوع).",
      en: "Add each unit's type, count, specs, and rates (daily / monthly / lump-sum).",
    },
  },
  {
    Icon: Truck,
    title: { ar: "استقبال الطلبات المؤهّلة", en: "Receive Matched Requests" },
    desc: {
      ar: "تصلك طلبات مؤهّلة قرب منطقة تغطيتك، فترسل عرضك وتُوثَّق.",
      en: "Qualified leads near your coverage area reach you — you quote, the contract is notarized.",
    },
  },
];

// Register-and-enlist overview shown above the providers directory. The
// process appears first as ordered step cards, then registration requirements
// and enlistment benefits sit side-by-side, then the CTA routes new
// providers to registration (existing ones use the navbar role login).
export default function ProviderJoinSection() {
  const { lang, dir } = useI18n();

  return (
    <section id="join" className="mb-12" dir={dir}>
      {/* Header */}
      <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-3">
        {provider.eyebrow[lang]}
      </p>
      <h2 className="text-3xl font-bold mb-3 leading-tight text-white">
        {provider.title1[lang]}{" "}
        <span className="text-[#D97706]">{provider.title2[lang]}</span>
      </h2>
      <p className="text-white/55 text-sm leading-relaxed max-w-2xl mb-8">
        {provider.intro[lang]}
      </p>

      {/* Process — ordered step-by-step cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STEPS.map((s, i) => {
          const Icon = s.Icon;
          return (
            <div
              key={i}
              className="bg-[#1C1917] border border-white/10 rounded-sm p-5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#FCD34D] font-bold font-mono text-sm">
                  0{i + 1}
                </span>
                <div className="w-9 h-9 rounded-sm bg-[#D97706]/15 flex items-center justify-center">
                  <Icon size={18} className="text-[#D97706]" />
                </div>
              </div>
              <h4 className="text-white font-bold text-sm mb-1.5">{s.title[lang]}</h4>
              <p className="text-white/50 text-xs leading-relaxed">{s.desc[lang]}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {/* Registration requirements */}
        <div className="bg-[#1C1917] border border-white/10 rounded-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList size={18} className="text-[#FCD34D]" />
            <h3 className="font-bold text-white">{provider.reqTitle[lang]}</h3>
          </div>
          <ul className="space-y-3">
            {provider.requirements.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed"
              >
                <span className="text-[#D97706] mt-1 shrink-0 text-xs">●</span>
                <span>{r[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Enlistment benefits — restored after being left empty in an
            earlier draft so the two-column grid stays balanced. */}
        <div className="bg-[#1C1917] border border-white/10 rounded-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#FCD34D]" />
            <h3 className="font-bold text-white">{provider.benefitsTitle[lang]}</h3>
          </div>
          <ul className="space-y-3">
            {provider.benefits.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed"
              >
                <CheckCircle2 size={14} className="text-[#D97706] mt-1 shrink-0" />
                <span>{b[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to="/register?from=/provider-dashboard"
        className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-sm text-sm font-bold transition-colors"
      >
        {provider.cta[lang]}
      </Link>
    </section>
  );
}