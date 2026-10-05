import "server-only";
import { Resend } from "resend";

let client;

// Created lazily so a missing key fails the request, not the build.
export function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

export const contactConfig = {
  get to() {
    return process.env.CONTACT_EMAIL || null;
  },
  // Sender on the monoduo.live domain verified in Resend.
  from: "MonoDuo <hello@monoduo.live>",
};
