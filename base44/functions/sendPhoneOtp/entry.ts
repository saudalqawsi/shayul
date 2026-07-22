import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Public OTP-sender endpoint — anonymous callers (login flow before auth).
// Sends a 6-digit SMS code via Twilio and stores the code in the
// PhoneVerification entity so verifyPhoneOtp can confirm it later.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let body;
    try { body = await req.json(); } catch { body = {}; }
    const phone = String(body?.phone || "").replace(/[\s()-]/g, "");

    if (!/^\+?\d{8,15}$/.test(phone)) {
      return Response.json({ error: "Invalid phone number" }, { status: 400 });
    }

    // Rate limit per phone: 60s between sends, 5 per hour.
    const recent = await base44.asServiceRole.entities.PhoneVerification.filter(
      { phone }, "-created_date", 5
    );
    const now = Date.now();
    if (recent.length > 0) {
      const last = recent[0];
      if (now - new Date(last.created_date).getTime() < 60_000) {
        return Response.json(
          { error: "Please wait a minute before requesting another code" },
          { status: 429 }
        );
      }
      const lastHour = recent.filter(
        (r) => now - new Date(r.created_date).getTime() < 3_600_000
      );
      if (lastHour.length >= 5) {
        return Response.json(
          { error: "Too many requests from this number. Try again later." },
          { status: 429 }
        );
      }
    }

    const sid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const token = Deno.env.get("TWILIO_AUTH_TOKEN");
    const from = Deno.env.get("TWILIO_FROM_NUMBER");
    if (!sid || !token || !from) {
      return Response.json(
        {
          error:
            "SMS gateway not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER in dashboard Settings → Environment Variables.",
        },
        { status: 503 }
      );
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(now + 5 * 60 * 1000).toISOString();

    await base44.asServiceRole.entities.PhoneVerification.create({
      phone,
      code,
      expires_at: expiresAt,
      verified: false,
      attempts: 0,
    });

    const auth = btoa(`${sid}:${token}`);
    const form = new URLSearchParams();
    form.append("From", from);
    form.append("To", phone);
    form.append("Body", `Shaywal: your verification code is ${code}. It expires in 5 minutes.`);

    const smsRes = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      }
    );

    if (!smsRes.ok) {
      const errText = await smsRes.text();
      return Response.json(
        { error: `Failed to send SMS: ${errText.slice(0, 200)}` },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});