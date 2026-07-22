import React, { useState, useEffect } from "react";
import { Phone, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { base44 } from "@/api/base44Client";

const norm = (p) => (p || "").replace(/[\s()-]/g, "");
const validPhone = (p) => /^\+?\d{8,15}$/.test(norm(p));

// Step 1 of the unified login: phone verification gate. Sends a 6-digit
// SMS code via the `sendPhoneOtp` backend function, then verifies it via
// `verifyPhoneOtp`. On success, calls onVerified(normalizedPhone) so the
// parent page can reveal the email/password sign-in step.
export default function PhoneOtpGate({ onVerified }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleSend = async () => {
    setError("");
    const p = norm(phone);
    if (!validPhone(phone)) {
      setError("Enter a valid phone (e.g. +966512345678)");
      return;
    }
    setLoading(true);
    try {
      await base44.functions.invoke("sendPhoneOtp", { phone: p });
      setSent(true);
      setCooldown(60);
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    if (code.length !== 6) return;
    setLoading(true);
    try {
      await base44.functions.invoke("verifyPhoneOtp", {
        phone: norm(phone),
        code,
      });
      onVerified?.(norm(phone));
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone number</Label>
        <div className="relative">
          <Phone
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            placeholder="+966512345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-10 h-12"
            disabled={sent || loading}
            required
          />
        </div>
      </div>

      {!sent && (
        <Button
          type="button"
          onClick={handleSend}
          className="w-full h-11 font-medium"
          disabled={loading || !validPhone(phone)}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Send verification code"
          )}
        </Button>
      )}

      {sent && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Enter the 6-digit code we sent</Label>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleVerify}
            className="w-full h-11 font-medium"
            disabled={loading || code.length < 6}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify code"
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            {cooldown > 0 ? (
              `Resend available in ${cooldown}s`
            ) : (
              <button
                type="button"
                onClick={handleSend}
                className="text-primary font-medium hover:underline"
              >
                Resend code
              </button>
            )}
          </p>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}