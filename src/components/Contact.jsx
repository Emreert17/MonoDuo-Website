import { site } from "@/lib/site";
import ContactForm from "./ContactForm";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <Eyebrow dot>Start a project</Eyebrow>
          <h2
            id="contact-title"
            className="mt-7 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] tracking-[-0.045em] text-balance"
          >
            Tell us what your audience <em>keeps asking for.</em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            A few lines is enough. You don&rsquo;t need a product idea yet. Finding the
            right one is part of the work.
          </p>
          <p className="label mt-10 text-muted">Or write to us directly</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block border-b border-ink pb-1 text-lg tracking-[-0.02em] transition-colors hover:border-accent hover:text-accent"
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm fallbackEmail={site.email} />
        </Reveal>
      </div>
    </section>
  );
}
