import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ProviderOnboarding from "@/components/provider/ProviderOnboarding";
import ProviderDashboard from "@/pages/ProviderDashboard";

export default function ProviderPortal() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const u = await base44.auth.me();
      setUser(u);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#1C1917]">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[#D97706] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1C1917] text-white flex flex-col items-center justify-center gap-4" dir="rtl">
        <p className="text-white/70">يلزم تسجيل الدخول للوصول إلى لوحة المزوّد.</p>
        <Link to="/login?from=/provider" className="bg-[#D97706] hover:bg-[#B45309] px-5 py-2 rounded-sm text-sm font-bold">تسجيل الدخول</Link>
      </div>
    );
  }

  return user?.provider_onboarded
    ? <ProviderDashboard />
    : <ProviderOnboarding onComplete={load} />;
}