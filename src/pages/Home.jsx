import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/shayul/Navbar";
import HeroSection from "@/components/shayul/HeroSection";
import TrustLayer from "@/components/shayul/TrustLayer";
import EquipmentVault from "@/components/shayul/EquipmentVault";
import HowItWorks from "@/components/shayul/HowItWorks";
import PricingSection from "@/components/shayul/PricingSection";
import RequestForm from "@/components/shayul/RequestForm";
import FooterSection from "@/components/shayul/FooterSection";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0A1A30] text-white min-h-screen overflow-x-hidden" dir="rtl">
      <Navbar scrolled={scrolled} />
      <HeroSection />
      <TrustLayer />
      <EquipmentVault />
      <HowItWorks />
      <PricingSection />
      <RequestForm />
      <FooterSection />
    </div>
  );
}