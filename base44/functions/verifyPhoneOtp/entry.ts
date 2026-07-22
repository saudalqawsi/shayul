import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Public OTP-verifier — checks the code the user typed against the most
// recent unverified PhoneVerification record for this phone. Frees the
// record (verified=true) on success so it can't be reused.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let body;
    try { body = await req.json(); } catch { body = {}; }
    const phone = String(body?.phone || "").replace(/[\s()-]/g, "");
    const code = String(body?.code || "").trim();

    if (!/^\+?\d{8,15}$/.test(phone)) {
      return Response.json({ error: "Invalid phone number" }, { status: 400 });
    }
    if (!/^\d{6}$/.test(code)) {
      return Response.json({ error: "Code must be 6 digits" }, { status: 400 });
    }

    const recent = await base44.asServiceRole.entities.PhoneVerification.filter(
      { phone }, "-created_date", 1
    );
    if (recent.length === 0) {
      return Response.json(
        { error: "No code was sent to this number. Request a new one." },
        { status: 400 }
      );
    }
    const record = recent[0];
    const now = Date.now();

    if (new Date(record.expires_at).getTime() < now) {
      return Response.json(
        { error: "Code expired. Request a new one." },
        { status: 400 }
      );
    }
    if (record.verified) {
      return Response.json({ error: "Code already used" }, { status: 400 });
    }
    if ((record.attempts || 0) >= 5) {
      return Response.json(
        { error: "Too many attempts. Request a new code." },
        { status: 429 }
      );
    }

    if (record.code !== code) {
      await base44.asServiceRole.entities.PhoneVerification.update(record.id, {
        attempts: (record.attempts || 0) + 1,
      });
      return Response.json({ error: "Invalid code" }, { status: 400 });
    }

    await base44.asServiceRole.entities.PhoneVerification.update(record.id, {
      verified: true,
    });
    return Response.json({ success: true, phone });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});