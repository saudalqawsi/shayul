import React, { useState, useEffect } from "react";
import Navbar from "@/components/shayul/Navbar";
import HeroSection from "@/components/shayul/HeroSection";
import TrustLayer from "@/components/shayul/TrustLayer";
import EquipmentVault from "@/components/shayul/EquipmentVault";
import HowItWorks from "@/components/shayul/HowItWorks";
import PricingSection from "@/components/shayul/PricingSection";
import RequestForm from "@/components/shayul/RequestForm";
import FAQ from "@/components/shayul/FAQ";
import FooterSection from "@/components/shayul/FooterSection";
import { LanguageProvider, useI18n } from "@/lib/i18n";

function HomeContent() {
  const { dir } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#1C1917] text-white min-h-screen overflow-x-hidden" dir={dir}>
      <Navbar scrolled={scrolled} />
      <HeroSection />
      <TrustLayer />
      <EquipmentVault />
      <HowItWorks />
      <PricingSection />
      <RequestForm />
      <FAQ />
      <FooterSection />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}