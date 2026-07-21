import React, { useState } from "react";
import { Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { pricing } from "@/lib/content";

export default function PricingSection() {
  const { lang, num, dir } = useI18n();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="pricing" className="py-24 bg-[#081626] relative" dir={dir}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      








































































      
    </section>);

}