import ButtonLink from "./ui/Button";
import Reveal from "./ui/Reveal";

export default function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-ink py-20 text-paper sm:py-28 lg:py-36">
      <Reveal className="shell">
        <h2
          id="final-cta-title"
          className="text-[clamp(2.25rem,6.6vw,5.75rem)] leading-[1.02] tracking-[-0.05em]"
        >
          <span className="block">Have an audience.</span>
          <span className="block">Have a problem worth solving.</span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 border-t border-line-dark pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <p className="font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight tracking-[-0.02em] text-accent-soft italic">
            Let&rsquo;s find what should exist next.
          </p>
          <ButtonLink href="#contact" variant="paper" className="shrink-0">
            Start a Project
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
