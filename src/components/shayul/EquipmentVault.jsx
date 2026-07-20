import React, { useState, useRef } from "react";
import { Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const equipment = [
  {
    name: "شيول / لودر",
    nameEn: "Wheel Loader",
    specs: { weight: "١٨ طن", hp: "٢٥٠ حصان", size: "مقاس ٦٦" },
    daily: "٨٠٠",
    monthly: "١٨,٠٠٠",
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/420130dcc_generated_a0a87dcb.png",
    tag: "الأعلى طلباً",
  },
  {
    name: "حفارة JCB",
    nameEn: "JCB Backhoe Loader",
    specs: { weight: "٨ طن", hp: "٩٢ حصان", size: "باك لودر" },
    daily: "٦٠٠",
    monthly: "١٥,٠٠٠",
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/c06c2d727_generated_3f652c52.png",
    tag: "متوفر الآن",
  },
  {
    name: "قريدر",
    nameEn: "Motor Grader G14",
    specs: { weight: "١٤ طن", hp: "٢٠٠ حصان", size: "G14" },
    daily: "١,٥٠٠",
    monthly: "٢٨,٠٠٠",
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/0cf6d667d_generated_a0b183a3.png",
    tag: "للمشاريع الكبرى",
  },
  {
    name: "بلدوزر",
    nameEn: "Bulldozer D9",
    specs: { weight: "٤٩ طن", hp: "٤١٠ حصان", size: "800-D9" },
    daily: "٣,٠٠٠",
    monthly: "—",
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/db4997345_generated_1d460221.png",
    tag: "دفع مقدّم",
  },
];

function EquipCard({ eq }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-72 md:w-80 bg-[#0d2240] border border-white/10 rounded-sm overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={eq.img}
          alt={eq.name}
          className={`w-full h-full transition-all duration-500 ${hovered ? "scale-110 saturate-125" : "scale-100 saturate-90"}`}
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2240] via-transparent to-transparent" />

        {/* Tag */}
        <div className="absolute top-3 right-3 bg-[#0A1A30]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/70 border border-white/10">
          {eq.tag}
        </div>

        {/* Coverage Halo */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#009466]/90 px-2.5 py-1 rounded-full">
          <Shield size={10} className="text-white" />
          <span className="text-white text-xs font-bold">مغطّى بالكامل</span>
        </div>

        {/* Dimension lines on hover */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-4 right-4 h-px bg-[#009466]/40 border-t border-dashed border-[#009466]/40" />
            <div className="absolute top-4 bottom-4 left-1/2 w-px bg-[#009466]/40 border-l border-dashed border-[#009466]/40" />
            <div className="absolute top-4 left-6 text-[#009466] text-xs font-mono">H: {eq.specs.weight}</div>
          </div>
        )}
      </div>

      {/* Quick Spec Overlay on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-[#009466] transition-all duration-300 ${
          hovered ? "h-28" : "h-0"
        } overflow-hidden`}
      >
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {Object.entries(eq.specs).map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-white font-bold text-sm font-mono">{v}</div>
                <div className="text-white/70 text-xs">{k === "weight" ? "الوزن" : k === "hp" ? "القدرة" : "المقاس"}</div>
              </div>
            ))}
          </div>
          <a href="#request" className="block w-full bg-white text-[#009466] text-center py-1.5 rounded-sm text-xs font-bold">
            أضف للطلب
          </a>
        </div>
      </div>

      {/* Card Body */}
      <div className={`p-5 transition-all duration-300 ${hovered ? "mb-28" : ""}`}>
        <div className="mb-1">
          <h3 className="text-white font-bold text-lg">{eq.name}</h3>
          <p className="text-white/40 text-xs font-mono tracking-widest">{eq.nameEn.toUpperCase()}</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <span className="text-[#009466] font-bold text-2xl font-mono">{eq.daily}</span>
            <span className="text-white/40 text-sm mr-1">ر.س / يوم</span>
          </div>
          {eq.monthly !== "—" && (
            <div className="text-white/30 text-sm">
              <span className="font-mono">{eq.monthly}</span>
              <span className="mr-1 text-xs">شهري</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EquipmentVault() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  };

  return (
    <section id="equipment" className="py-24 bg-[#081626] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#009466] text-xs font-bold tracking-widest uppercase mb-4">
              معرض المعدات
            </p>
            <h2
              className="text-white font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
            >
              الخزينة الحديدية —
              <br />
              <span className="text-white/40">كل معدة جاهزة للتسليم.</span>
            </h2>
          </div>
          {/* Scroll Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 bg-white/8 border border-white/15 rounded-sm flex items-center justify-center text-white hover:bg-[#009466] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 bg-white/8 border border-white/15 rounded-sm flex items-center justify-center text-white hover:bg-[#009466] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-6 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {equipment.map((eq) => (
          <EquipCard key={eq.name} eq={eq} />
        ))}
        {/* CTA Card */}
        <div className="flex-shrink-0 w-72 md:w-80 bg-[#009466]/10 border border-[#009466]/30 border-dashed rounded-sm flex flex-col items-center justify-center p-8 text-center">
          <div className="w-14 h-14 bg-[#009466]/20 rounded-sm flex items-center justify-center mb-4">
            <Shield size={28} className="text-[#009466]" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">لا تجد ما تحتاجه؟</h3>
          <p className="text-white/40 text-sm mb-5 leading-relaxed">
            أرسل طلبك وسنبحث لك عن المعدة المناسبة من شبكتنا
          </p>
          <a
            href="#request"
            className="bg-[#009466] hover:bg-[#007a54] text-white px-6 py-2.5 rounded-sm text-sm font-bold transition-colors"
          >
            أرسل طلبك
          </a>
        </div>
      </div>
    </section>
  );
}