import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import RoleTabs from "@/components/auth/RoleTabs";
import PhoneOtpGate from "@/components/auth/PhoneOtpGate";
import { useI18n } from "@/lib/i18n";
import { toast } from "@/components/ui/use-toast";

// Maps the route-param-driven `from` URL our dashboards live on to the
// matching role tab + the post-login destination. The navbar role menu
// links to "/login?from=/X-dashboard" so the tab pre-selects per role.
const ROLE_TO_FROM = {
  client: "/client-dashboard",
  provider: "/provider-dashboard",
  platform: "/platform-dashboard",
};
const FROM_TO_ROLE = Object.fromEntries(
  Object.entries(ROLE_TO_FROM).map(([r, f]) => [f, r])
);
const ROLE_TO_REGISTER = Object.fromEntries(
  Object.entries(ROLE_TO_FROM).map(([r, f]) => [r, `/register?from=${f}`])
);

// Single source of truth for the page copy: every visible string is keyed
// by language so the Login screen switches to Arabic the moment the
// visitor toggles the language, mirroring the rest of the site.
const T = {
  title: { ar: "أهلاً بعودتك", en: "Welcome back" },
  subtitle: { ar: "سجّل الدخول إلى شيول", en: "Sign in to Shaywal" },
  google: { ar: "تابع عبر جوجل", en: "Continue with Google" },
  or: { ar: "أو", en: "or" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
  password: { ar: "كلمة المرور", en: "Password" },
  forgot: { ar: "نسيت كلمة المرور؟", en: "Forgot password?" },
  logIn: { ar: "تسجيل الدخول", en: "Log in" },
  loggingIn: { ar: "جارٍ الدخول...", en: "Logging in..." },
  badCreds: { ar: "بريد أو كلمة مرور غير صحيحة", en: "Invalid email or password" },
  orPhone: { ar: "أو الدخول عبر الهاتف", en: "or sign in by phone" },
  phoneVerifiedTitle: { ar: "تم التحقق من هاتفك", en: "Phone verified" },
  phoneVerifiedDesc: {
    ar: "الدخول بالهاتف قيد التطوير — يتم توجيهك الآن. يمكنك أيضاً استخدام البريد أو جوجل.",
    en: "Phone sign-in is being prepared — continuing. You can also use email or Google.",
  },
  noAccountQ: { ar: "ليس لديك حساب؟", en: "Don't have an account?" },
  createOne: { ar: "أنشئ حساباً", en: "Create one" },
};

export default function Login() {
  const { lang } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const fromUrl = searchParams.get("from") || "/";
  const [role, setRole] = useState(FROM_TO_ROLE[fromUrl] || "client");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRole = (next) => {
    setRole(next);
    setSearchParams({ from: ROLE_TO_FROM[next] });
  };

  const fromForRole = ROLE_TO_FROM[role];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = fromForRole;
    } catch (err) {
      setError(err.message || T.badCreds[lang]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", fromForRole);
  };

  // Phone-only sign-in stays a placeholder path: verifying the SMS code
  // routes the user to the role dashboard without an account lookup, since
  // phone→account linking is a future enhancement per the user's note that
  // OTP/payments should remain placeholders for now.
  const handlePhoneVerified = () => {
    toast({
      title: T.phoneVerifiedTitle[lang],
      description: T.phoneVerifiedDesc[lang],
    });
    setTimeout(() => {
      window.location.href = fromForRole;
    }, 700);
  };

  return (
    <AuthLayout
      icon={LogIn}
      title={T.title[lang]}
      subtitle={T.subtitle[lang]}
      footer={
        <>
          {T.noAccountQ[lang]}{" "}
          <Link
            to={ROLE_TO_REGISTER[role]}
            className="text-primary font-medium hover:underline"
          >
            {T.createOne[lang]}
          </Link>
        </>
      }
    >
      <RoleTabs role={role} onChange={handleRole} />

      {/* Google — alternative one-click sign-in */}
      <Button
        variant="outline"
        className="w-full h-12 text-sm font-medium mb-4"
        onClick={handleGoogle}
      >
        <GoogleIcon className="w-5 h-5 mr-2" />
        {T.google[lang]}
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">{T.or[lang]}</span>
        </div>
      </div>

      {/* Email + password — alternative sign-in */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{T.email[lang]}</Label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{T.password[lang]}</Label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              {T.forgot[lang]}
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {T.loggingIn[lang]}
            </>
          ) : (
            T.logIn[lang]
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">{T.orPhone[lang]}</span>
        </div>
      </div>

      {/* Phone OTP — alternative SMS sign-in (placeholder) */}
      <PhoneOtpGate onVerified={handlePhoneVerified} />
    </AuthLayout>
  );
}