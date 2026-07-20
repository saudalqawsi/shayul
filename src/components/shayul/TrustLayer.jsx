import React from "react";
import { FileText, Shield, Banknote, Zap } from "lucide-react";

const pillars = [
  {
    icon: FileText,
    title: "العقد الموثّق قانونياً",
    subtitle: "01",
    desc: "كل اتفاق شفهي يتحوّل إلى عقد إلكتروني موثّق يحدد نطاق العمل، الأسعار، وجدول السداد — سند قانوني يحمي حق المعدة قبل التسليم.",
    color: "#009466",
  },
  {
    icon: Shield,
    title: "التأمين المدمج",
    subtitle: "02",
    desc: "بوليصة تأمين تصدر من بيانات العقد ذاتها مع كل عقد — تغطّي المعدة والأضرار الناتجة في الموقع، وتتيح الوصول للمشاريع الكبرى والحكومية.",
    color: "#0696B0",
  },
  {
    icon: Banknote,
    title: "تحصيل مضمون وسريع",
    subtitle: "03",
    desc: "المدفوعات تمر عبر طرف محايد مرخّص. صاحب المعدة يستلم مستحقاته خلال يوم إلى يومين من تأكيد التسليم — بدون انتظار صاحب المشروع.",
    color: "#009466",
  },
  {
    icon: Zap,
    title: "تسليم اليوم أو التالي",
    subtitle: "04",
    desc: "الطلب يوزَّع فوراً على شركات المعدات المطابقة جغرافياً. غالبية الطلبات تُلبّى في اليوم نفسه أو اليوم التالي — كما تعوّد السوق.",
    color: "#0696B0",
  },
];

export default function TrustLayer() {
  return (
    <section className="py-24 bg-[#0A1A30] relative">
      {/* Hairline top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
            لماذا شيول
          </p>
          <h2
            className="text-white font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
          >
            طبقة الثقة
            <br />
            <span className="text-white/40">فوق الصفقة.</span>
          </h2>
        </div>

        {/* Market Problem Bar */}
        <div className="bg-white/5 border border-white/10 rounded-sm p-6 mb-16">
          <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-3">المشكلة في السوق اليوم</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "٨–٩", label: "رسائل واتساب لإسناد طلب واحد" },
              { num: "٤٥", label: "يوماً قد تمتد آجال السداد" },
              { num: "٠٪", label: "عقود موثّقة في الغالب" },
              { num: "X", label: "معدات غير مؤمّنة تُستبعد من المشاريع الكبرى" },
            ].map((s) => (
              <div key={s.num} className="border-r border-white/10 pr-6 last:border-0">
                <div className="text-3xl font-bold text-white/20 mb-1 font-mono">{s.num}</div>
                <div className="text-white/50 text-xs leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white/4 border border-white/10 hover:border-[#009466]/40 rounded-sm p-6 group transition-all duration-300 hover:bg-white/7"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-11 h-11 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: `${p.color}20` }}
                  >
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <span className="text-white/15 font-mono text-xs">{p.subtitle}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-3 leading-snug">{p.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div className="mt-12 border-r-2 border-[#009466] pr-6">
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
            شيول لا تنافس على سرعة إيجاد المعدة — بل تعيد بناء الطبقة الغائبة:{" "}
            <span className="text-white font-semibold">الثقة.</span>
          </p>
        </div>
      </div>
    </section>
  );
}