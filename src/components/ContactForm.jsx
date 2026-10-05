"use client";

import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { LIMITS, PROJECT_TYPES, normalizeInquiry, validateInquiry } from "@/lib/validation";
import { ButtonArrow, buttonClass } from "./ui/Button";

const INPUT_CLASS =
  "min-h-12 w-full rounded-none border-0 border-b border-ink/25 bg-transparent py-2.5 text-[16px] text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 hover:border-ink/50 focus:border-accent focus:shadow-[0_1px_0_0_var(--color-accent)] focus:outline-none aria-invalid:border-red-700 aria-invalid:focus:shadow-[0_1px_0_0_var(--color-red-700)]";

function Field({ label, name, error, optional, as: Control = "input", children, ...props }) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="label flex justify-between text-muted">
        {label}
        {optional && <span>Optional</span>}
      </label>
      <Control
        id={id}
        name={name}
        className={INPUT_CLASS}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {children}
      </Control>
      {error && (
        <p id={errorId} className="mt-2 text-[13px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ fallbackEmail }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  // The form's height at the moment it succeeds, so the confirmation fills the same space.
  const [formHeight, setFormHeight] = useState(0);

  const clearError = (event) => {
    const { name } = event.target;
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const fieldErrors = validateInquiry(normalizeInquiry(raw));

    setErrors(fieldErrors);
    setFormError("");

    const firstInvalid = Object.keys(fieldErrors)[0];
    if (firstInvalid) {
      form.elements[firstInvalid]?.focus();
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.ok) {
        setFormHeight(form.offsetHeight);
        setStatus("success");
        return;
      }

      setErrors(result?.fields ?? {});
      setFormError(result?.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again.");
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" style={{ minHeight: formHeight }} className="border-t border-ink pt-8">
        <span className="grid size-11 place-items-center rounded-full bg-accent text-paper">
          <Check aria-hidden="true" size={20} />
        </span>
        <h3 className="mt-6 text-3xl tracking-[-0.04em]">Thank you. It&rsquo;s with us.</h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          We read every inquiry ourselves and will reply by email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 border-b border-ink pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form noValidate onSubmit={handleSubmit} onChange={clearError} className="grid gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required maxLength={LIMITS.name} error={errors.name} />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={LIMITS.email}
          error={errors.email}
        />
        <Field
          label="Company / creator name"
          name="company"
          autoComplete="organization"
          optional
          maxLength={LIMITS.company}
          error={errors.company}
        />
        <Field
          label="Website or Instagram"
          name="website"
          placeholder="@handle or a link"
          optional
          maxLength={LIMITS.website}
          error={errors.website}
        />
      </div>

      <Field
        label="What are you looking to build?"
        name="projectType"
        as="select"
        optional
        defaultValue=""
        error={errors.projectType}
      >
        <option value="">Choose one</option>
        {PROJECT_TYPES.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </Field>

      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={5}
        required
        maxLength={LIMITS.message}
        placeholder="Your audience, your idea, or the problem you keep running into."
        error={errors.message}
      />

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Fax
          <input name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" disabled={loading} className={buttonClass("ink", "enabled:cursor-pointer")}>
          {loading ? "Sending…" : "Start the Conversation"}
          {loading ? (
            <LoaderCircle aria-hidden="true" size={16} className="animate-spin" />
          ) : (
            <ButtonArrow />
          )}
        </button>
        <p aria-live="polite" className="text-[13px] leading-relaxed text-red-700">
          {status === "error" && (
            <>
              {formError}{" "}
              <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-4">
                {fallbackEmail}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
