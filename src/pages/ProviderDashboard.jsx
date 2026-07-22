import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Truck, ClipboardList, PackagePlus } from "lucide-react";
import DashboardChrome from "@/components/shayul/DashboardChrome";
import EnlistEquipment from "@/components/provider/EnlistEquipment";
import FleetList from "@/components/provider/FleetList";
import RequestsList from "@/components/provider/RequestsList";

export default function ProviderDashboard() {
  const [equipment, setEquipment] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [eqs, reqs] = await Promise.all([
        base44.entities.Equipment.list("-created_date", 100),
        base44.entities.RentalRequest.list("-created_date", 100),
      ]);
      setEquipment(eqs);
      setRequests(reqs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const addEquipment = async (data) => { await base44.entities.Equipment.create(data); await load(); };
  const changeStatus = async (eq, status) => { await base44.entities.Equipment.update(eq.id, { status }); await load(); };
  const removeEq = async (eq) => { await base44.entities.Equipment.delete(eq.id); await load(); };
  const actRequest = async (req, status) => { await base44.entities.RentalRequest.update(req.id, { status }); await load(); };

  const stats = {
    total: equipment.length,
    available: equipment.filter((e) => e.status === "available").length,
    rented: equipment.filter((e) => e.status === "rented").length,
    pending: requests.filter((r) => r.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-[#1C1917] text-white" dir="rtl">
      <DashboardChrome roleLabel={{ ar: "لوحة المزوّد", en: "Provider Dashboard" }} />

      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "إجمالي المعدات", val: stats.total },
            { label: "متاحة", val: stats.available, color: "#D97706" },
            { label: "مؤجّرة", val: stats.rented, color: "#FCD34D" },
            { label: "طلبات جديدة", val: stats.pending, color: "#D4A537" },
          ].map((s) => (
            <div key={s.label} className="bg-white/4 border border-white/10 rounded-sm p-4">
              <div className="text-2xl font-mono font-bold" style={{ color: s.color || "#fff" }}>{s.val}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-white/20 border-t-[#D97706] rounded-full animate-spin" />
          </div>
        ) : (
          <Tabs defaultValue="enlist" dir="rtl">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-auto flex w-full mb-6">
              <TabsTrigger value="enlist" className="flex-1 data-[state=active]:bg-[#D97706] data-[state=active]:text-white text-white/60 text-sm gap-2">
                <PackagePlus size={15} /> تسجيل معدة
              </TabsTrigger>
              <TabsTrigger value="fleet" className="flex-1 data-[state=active]:bg-[#D97706] data-[state=active]:text-white text-white/60 text-sm gap-2">
                <Truck size={15} /> حالة الأسطول
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex-1 data-[state=active]:bg-[#D97706] data-[state=active]:text-white text-white/60 text-sm gap-2">
                <ClipboardList size={15} /> طلبات التأجير
                {stats.pending > 0 && <span className="bg-amber-500 text-black text-[10px] font-bold rounded-full px-1.5">{stats.pending}</span>}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enlist">
              <div className="bg-white/3 border border-white/10 rounded-sm p-6">
                <h2 className="text-white font-bold text-base mb-1">أضف معدة جديدة لأسطولك</h2>
                <p className="text-white/45 text-xs mb-6">أدخل تفاصيل المعدة وأسعارها لتظهر متاحة لاستقبال الطلبات.</p>
                <EnlistEquipment onCreated={load} />
              </div>
            </TabsContent>

            <TabsContent value="fleet">
              <div className="bg-white/3 border border-white/10 rounded-sm p-6">
                <h2 className="text-white font-bold text-base mb-1">حالة الأسطول</h2>
                <p className="text-white/45 text-xs mb-6">تابع حالة كل معدة وحدّث حالتها بين متاحة / مؤجّرة / صيانة.</p>
                <FleetList equipment={equipment} onChange={changeStatus} onDelete={removeEq} />
              </div>
            </TabsContent>

            <TabsContent value="requests">
              <div className="bg-white/3 border border-white/10 rounded-sm p-6">
                <h2 className="text-white font-bold text-base mb-1">طلبات التأجير الواردة</h2>
                <p className="text-white/45 text-xs mb-6">راجع الطلبات الواردة على معداتك وقم بقبولها أو رفضها.</p>
                <RequestsList requests={requests} onAct={actRequest} />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}