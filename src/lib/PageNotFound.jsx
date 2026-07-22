import { Link, useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

export default function PageNotFound({}) {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  const { data: authData, isFetched } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await base44.auth.me();
        return { user, isAuthenticated: true };
      } catch (error) {
        return { user: null, isAuthenticated: false };
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#1C1917] text-white">
      <div className="max-w-md w-full text-center">
        <p className="text-7xl font-light text-white/20 mb-2">404</p>
        <div className="h-0.5 w-16 bg-[#D97706] mx-auto mb-8" />
        <h2 className="text-2xl font-bold mb-3">{pageName ? `“${pageName}”` : 'الصفحة غير موجودة'}</h2>
        <p className="text-white/45 leading-relaxed mb-10 text-sm">
          الصفحة التي تبحث عنها غير موجودة في هذا التطبيق. تأكد من الرابط أو عُد للصفحة الرئيسية.
        </p>

        {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
          <div className="mb-8 p-4 bg-[#0C0A09] border border-white/10 rounded-sm text-left">
            <p className="text-sm font-bold text-[#FCD34D] mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FCD34D]" /> ملاحظة للمشرف
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              قد يعني هذا أن الصفحة لم تُنفَّذ بعد. اطلب من المساعد الذكي إنشاءها في المحادثة.
            </p>
          </div>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#D97706] hover:bg-[#B45309] text-white rounded-sm transition-colors"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" /> العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}