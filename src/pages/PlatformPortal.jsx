import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ShieldCheck,
  LogOut,
  ClipboardCheck,
  Building2,
  Truck,
  Lock,
  Inbox,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/shayul/Navbar";
import ApprovalsBoard from "@/components/platform/ApprovalsBoard";
import PlatformProviders from "@/components/platform/PlatformProviders";
import PlatformFleet from "@/components/platform/PlatformFleet";

function Stat({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-[#1C1917] border border-white/10 rounded-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon size={15} style={{ color }} />
        </div>
        <span className="text-white/40 text-xs">{label}</span>
      </div>
      <div className="text-2xl font-bold font-mono text-white">{value}</div>
    </div>
  );
}

export default function PlatformPortal() {
  const { toast } = useToast();
  const [me, setMe] = useState(null);
  const [requests, setRequests] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const [u, rs, eqs, ps] = await Promise.all([
        base44.auth.me(),
        base44.entities.RentalRequest.list("-created_date", 200),
        base44.entities.Equipment.list("-created_date", 300),
        base44.entities.Provider.list("-created_date", 100),
      ]);
      setMe(u);
      setRequests(Array.isArray(rs) ? rs : []);
      setEquipment(Array.isArray(eqs) ? eqs : []);
      setProviders(Array.isArray(ps) ? ps : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const actOnRequest = async (id, patch, successMsg) => {
    try {
      await base44.entities.RentalRequest.update(id, patch);
      toast({ title: successMsg });
      await load();
    } catch (e) {
      toast({ title: "تعذّر تنفيذ الإجراء", description: e.message, variant: "destructive" });
    }
  };

  const logout = async () => {
    try { await base44.auth.logout("/"); } catch (e) { toast({ title: "تعذّر تسجيل الخروج", variant: "destructive" }); }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#1C1917]">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[#D97706] rounded-full animate-spin" />
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen bg-[#1C1917] text-white flex flex-col items-center justify-center gap-4" dir="rtl">
        <Lock size={30} className="text-white/40" />
        <p className="text-white/70">يلزم تسجيل الدخول للوصول إلى لوحة المنصة.</p>
        <Link to="/login?from=/platform-dashboard" className="bg-[#D97706] hover:bg-[#B45309] px-5 py-2 rounded-sm text-sm font-bold">تسجيل الدخول</Link>
      </div>
    );
  }

  if (me.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#1C1917] text-white flex flex-col items-center justify-center gap-4" dir="rtl">
        <Lock size={32} className="text-red-400/70" />
        <p className="text-white font-bold">هذه اللوحة مخصّصة لمشغّلي منصة شيول فقط</p>
        <p className="text-white/45 text-sm">حسابك الحالي لا يملك صلاحية إدارة العمليات والموافقات.</p>
        <Link to="/" className="text-[#D97706] text-sm font-bold hover:underline">العودة للموقع →</Link>
      </div>
    );
  }

  const pending = requests.filter((r) => r.status === "pending");
  const accepted = requests.filter((r) => r.status === "accepted");
  const completed = requests.filter((r) => r.status === "completed");
  const availableEq = equipment.filter((e) => e.status === "available").length;

  return (
    <div className="min-h-screen bg-[#1C1917] text-white" dir="rtl">
      <Navbar scrolled />
      <div className="h-16" />
      <div className="bg-[#1C1917] border-b border-white/10 sticky top-16 z-20">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-[#F59E0B]/15 flex items-center justify-center">
              <ShieldCheck size={14} className="text-[#F59E0B]" />
            </div>
            <span className="text-white/60 text-xs font-bold tracking-widest uppercase">لوحة المنصة</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#F59E0B] text-[10px] font-bold bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2.5 py-1 rounded-full">مشغّل</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm">
              <LogOut size={15} /> خروج
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">لوحة عمليات المنصة</h1>
          <p className="text-white/45 text-sm">اعتمد الطلبات الواردة، طابِقها مع المزوّدين، وتابع مسار العقد الموثّق حتى التسليم.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <Stat icon={ClipboardCheck} label="إجمالي الطلبات" value={requests.length} color="#FCD34D" />
          <Stat icon={Inbox} label="بانتظار الموافقة" value={pending.length} color="#F59E0B" />
          <Stat icon={ClipboardCheck} label="عقود نشطة" value={accepted.length} color="#FCD34D" />
          <Stat icon={ShieldCheck} label="تأجيرات مكتملة" value={completed.length} color="#D97706" />
          <Stat icon={Building2} label="المزوّدون" value={providers.length} color="#D97706" />
          <Stat icon={Truck} label="أسطول متاح" value={`${availableEq}/${equipment.length}`} color="#FCD34D" />
        </div>

        <Tabs defaultValue="approvals" dir="rtl">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-auto flex w-full mb-6">
            <TabsTrigger value="approvals" className="flex-1 data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#1C1917] text-white/60 text-sm gap-2">
              <ClipboardCheck size={15} /> الموافقات والمطابقة
              {pending.length > 0 && <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">{pending.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="providers" className="flex-1 data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#1C1917] text-white/60 text-sm gap-2">
              <Building2 size={15} /> المزوّدون
            </TabsTrigger>
            <TabsTrigger value="fleet" className="flex-1 data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#1C1917] text-white/60 text-sm gap-2">
              <Truck size={15} /> الأسطول
            </TabsTrigger>
          </TabsList>

          <TabsContent value="approvals">
            <ApprovalsBoard requests={requests} providers={providers} onAct={actOnRequest} />
          </TabsContent>
          <TabsContent value="providers">
            <PlatformProviders providers={providers} equipment={equipment} requests={requests} />
          </TabsContent>
          <TabsContent value="fleet">
            <PlatformFleet equipment={equipment} providers={providers} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}