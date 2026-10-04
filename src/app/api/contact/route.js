import { NextResponse } from "next/server";
import { buildInquiryEmail } from "@/lib/inquiryEmail";
import { contactConfig, getResend } from "@/lib/resend";
import { normalizeInquiry, validateInquiry } from "@/lib/validation";

const MAX_BODY_BYTES = 20_000;

const fail = (status, error, fields) =>
  NextResponse.json({ ok: false, error, ...(fields && { fields }) }, { status });

export async function POST(request) {
  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return fail(413, "That message is too long.");
    body = JSON.parse(raw);
  } catch {
    return fail(400, "We couldn't read that request.");
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return fail(400, "We couldn't read that request.");
  }

  // Honeypot: real visitors never fill this hidden field. Pretend it worked.
  if (body.fax) return NextResponse.json({ ok: true });

  const values = normalizeInquiry(body);
  const fields = validateInquiry(values);
  if (Object.keys(fields).length > 0) {
    return fail(422, "Please check the highlighted fields.", fields);
  }

  const resend = getResend();
  if (!resend || !contactConfig.to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_EMAIL is not configured.");
    return fail(503, "Our contact form is temporarily unavailable. Please email us directly.");
  }

  try {
    const { error } = await resend.emails.send({
      from: contactConfig.from,
      to: contactConfig.to,
      replyTo: values.email,
      ...buildInquiryEmail(values),
    });

    if (error) {
      console.error("[contact] Resend rejected the email:", error.name, error.message);
      return fail(502, "We couldn't send your message. Please try again or email us directly.");
    }
  } catch (error) {
    console.error("[contact] Resend request failed:", error?.message);
    return fail(502, "We couldn't send your message. Please try again or email us directly.");
  }

  return NextResponse.json({ ok: true });
}
