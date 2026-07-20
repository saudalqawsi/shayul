import React, { useState } from "react";
import { Shield } from "lucide-react";

const categories = [
  {
    name: "شيول",
    items: [
      { name: "شيول مقاس ٣٦", daily: 600, monthly: 15000 },
      { name: "شيول مقاس ٥٠", daily: 600, monthly: 15000, note: "بنفس أسعار مقاس ٣٦" },
      { name: "شيول مقاس ٦٦", daily: 800, monthly: 18000 },
      { name: "شيول مقاس ٨٠", daily: 1000, monthly: 25000 },
      { name: "شيول ٩٢٠", daily: 500, monthly: 13000 },
    ],
  },
  {
    name: "بوبكات",
    items: [
      { name: "بوبكات ترانشر", daily: 1400, monthly: null },
      { name: "بوبكات مكنسة", daily: 600, monthly: 15000 },
      { name: "بوبكات قشّاطة", daily: 1400, monthly: null },
    ],
  },
  {
    name: "حفارات JCB",
    items: [
      { name: "JCB — باك لودر", daily: 600, monthly: 15000 },
      { name: "JCB — شوكية", daily: 700, monthly: 22000 },
    ],
  },
  {
    name: "بوكلين",
    items: [
      { name: "بوكلين", daily: 800, monthly: 20000 },
      { name: "بوكلين كسّارة", daily: 1800, monthly: 45000 },
    ],
  },
  {
    name: "قالبات ونقل",
    items: [
      { name: "قالب سكس", daily: 650, monthly: 15000 },
      { name: "قالب تريلة", daily: 800, monthly: 18000 },
      { name: "وايت موية سكس", daily: 600, monthly: 15000, note: "غير شامل تعبئة المياه" },
    ],
  },
  {
    name: "أخرى",
    items: [
      { name: "قريدر G14", daily: 1500, monthly: 28000 },
      { name: "بلدوزر 800-D9", daily: 3000, monthly: null, note: "يُشترط الدفع المقدّم" },
      { name: "فوركلفت ٥/٧/١٠ طن", daily: 1000, monthly: null },
    ],
  },
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="pricing" className="py-24 bg-[#081626] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
              دليل الأسعار
            </p>
            <h2
              className="text-white font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
            >
              أسعار استرشادية
              <br />
              <span className="text-white/40">للسوق — الرياض.</span>
            </h2>
          </div>
          <div className="bg-[#009466]/10 border border-[#009466]/30 rounded-sm px-4 py-3 flex items-center gap-2 max-w-xs">
            <Shield size={16} className="text-[#009466] flex-shrink-0" />
            <p className="text-white/60 text-xs leading-relaxed">
              السعر يشمل السائق والديزل والإعاشة. ما زاد عن وردية عمل معتادة يُحتسب إضافياً.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-sm text-sm font-bold transition-colors border ${
                activeTab === i
                  ? "bg-[#009466] border-[#009466] text-white"
                  : "bg-transparent border-white/15 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="border border-white/10 rounded-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 bg-white/5 px-6 py-3 border-b border-white/10">
            <div className="col-span-6 text-white/40 text-xs font-bold tracking-widest uppercase">المعدة</div>
            <div className="col-span-3 text-white/40 text-xs font-bold tracking-widest uppercase text-center">يومي (ر.س)</div>
            <div className="col-span-3 text-white/40 text-xs font-bold tracking-widest uppercase text-center">شهري (ر.س)</div>
          </div>

          {categories[activeTab].items.map((item, i) => (
            <div
              key={item.name}
              className={`grid grid-cols-12 px-6 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors ${
                i % 2 === 0 ? "" : "bg-white/2"
              }`}
            >
              <div className="col-span-6">
                <div className="text-white font-medium text-sm">{item.name}</div>
                {item.note && <div className="text-white/35 text-xs mt-0.5">{item.note}</div>}
              </div>
              <div className="col-span-3 text-center">
                <span className="text-[#009466] font-bold font-mono text-base">{item.daily.toLocaleString()}</span>
              </div>
              <div className="col-span-3 text-center">
                {item.monthly ? (
                  <span className="text-white/60 font-mono text-sm">{item.monthly.toLocaleString()}</span>
                ) : (
                  <span className="text-white/20 text-sm">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/25 text-xs mt-4 text-center">
          أسعار استرشادية من السوق · التسعير الفعلي يحدده العقد عبر شيول
        </p>
      </div>
    </section>
  );
}