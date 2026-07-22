import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2, BadgeCheck } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import RoleTabs from "@/components/auth/RoleTabs";
import PhoneOtpGate from "@/components/auth/PhoneOtpGate";

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

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const fromUrl = searchParams.get("from") || "/";
  const [role, setRole] = useState(FROM_TO_ROLE[fromUrl] || "client");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState("");

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
    if (!phoneVerified) {
      setError("Verify your phone first");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = fromForRole;
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", fromForRole);
  };

  return (
    <AuthLayout
      icon={LogIn}
      title="Welcome back"
      subtitle="Sign in to Shaywal"
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to={ROLE_TO_REGISTER[role]}
            className="text-primary font-medium hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >
      <RoleTabs role={role} onChange={handleRole} />

      {/* Step 1 — phone verification gate */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide mb-2">
          Step 1 — Verify your phone
        </p>
        {phoneVerified ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-700 text-sm border border-emerald-500/20">
            <BadgeCheck className="w-4 h-4" />
            <span dir="ltr">{verifiedPhone}</span> verified
          </div>
        ) : (
          <PhoneOtpGate
            onVerified={(p) => {
              setPhoneVerified(true);
              setVerifiedPhone(p);
            }}
          />
        )}
      </div>

      {/* Step 2 — Base44 email/password sign-in, gated behind phone verify */}
      <div
        className={
          phoneVerified
            ? ""
            : "opacity-50 pointer-events-none select-none"
        }
      >
        <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide mb-2">
          Step 2 — Complete sign-in
        </p>
        <Button
          variant="outline"
          className="w-full h-12 text-sm font-medium mb-4"
          onClick={handleGoogle}
        >
          <GoogleIcon className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground">or email</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
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
          <Button
            type="submit"
            className="w-full h-12 font-medium"
            disabled={loading || !phoneVerified}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}