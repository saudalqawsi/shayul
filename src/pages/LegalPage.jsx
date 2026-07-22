import React from "react";
import { useParams, Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import Navbar from "@/components/shayul/Navbar";
import FooterSection from "@/components/shayul/FooterSection";
import { useI18n } from "@/lib/i18n";

const TITLES = {
  privacy: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  terms: { ar: "شروط الاستخدام", en: "Terms of Use" },
  service: { ar: "اتفاقية الخدمة", en: "Service Agreement" },
};

// Single placeholder legal page driven by the `:type` route param. We
// publish it now so every link on the site resolves to a real page rather
// than `#`; the full legal copy lands here before public launch.
export default function LegalPage() {
  const { lang, dir } = useI18n();
  const { type } = useParams();
  const title = TITLES[type] || TITLES.privacy;

  return (
    <div className="min-h-screen bg-[#1C1917] text-white" dir={dir}>
      <Navbar scrolled />
      <div className="h-16" />

      <div className="bg-[#0C0A09] border-b border-white/10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <FileText size={20} className="text-[#D97706]" />
            <p className="text-[#D97706] text-xs font-bold tracking-widest uppercase">
              {lang === "ar" ? "وثائق قانونية" : "Legal"}
            </p>
          </div>
          <h1
            className="text-white font-bold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
          >
            {title[lang]}
          </h1>
          <p className="text-white/40 text-sm mt-3 font-mono">
            {lang === "ar" ? "الإصدار ١.٠ — قيد الإعداد" : "Version 1.0 — being prepared"}
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-[#0C0A09] border border-white/10 rounded-sm p-8 mb-8">
          <p className="text-white/55 leading-relaxed mb-6">
            {lang === "ar"
              ? "هذه الصفحة قيد الإعداد. وضعتها المنصة كي تبقى جميع الروابط سليمة وَلا تؤدّي إلىلا مكان؛ تُنشر النسخة الكاملة قُبيل إطلاق شيول رسمياً."
              : "This page is being prepared. The platform ships it now so every link resolves somewhere rather than nowhere; the full text will be published before Shaywal's public launch."}
          </p>
          <p className="text-white/55 leading-relaxed">
            {lang === "ar"
              ? "حتى ذلك الحين، تفضّل بإرسال أي سؤال أو ملاحظة عبر نموذج الطلب وسنرد عليك مباشرة."
              : "Until then, feel free to send any questions or feedback via the request form and we'll respond directly."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/#request"
            className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-sm text-sm font-bold transition-colors"
          >
            {lang === "ar" ? "اطلب المعدة" : "Request a unit"}
          </Link>
          <Link
            to="/trust"
            className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-6 py-3 rounded-sm text-sm font-bold transition-colors inline-flex items-center gap-2"
          >
            {lang === "ar" ? "صفحة الثقة" : "Trust page"}
            <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}