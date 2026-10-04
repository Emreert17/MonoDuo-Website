import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

const SIGNALS = ["Audiences", "Conversations", "Content", "Behavior", "Demand"];

export default function Positioning() {
  return (
    <section aria-labelledby="positioning-title" className="section border-b border-line">
      <div className="shell">
        <Reveal className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <Eyebrow dot>Where we begin</Eyebrow>
          <div className="lg:col-span-2">
            <h2
              id="positioning-title"
              className="text-[clamp(2.125rem,5.6vw,4.5rem)] leading-[1.04] tracking-[-0.045em]"
            >
              <span className="text-muted">We don&rsquo;t start with a product.</span>{" "}
              We start with <em>what people are already asking for.</em>
            </h2>
          </div>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          <p className="label mb-5 text-muted">We don&rsquo;t begin with assumptions. We study</p>
          <ul className="grid grid-cols-2 border-t border-ink sm:grid-cols-3 lg:grid-cols-5">
            {SIGNALS.map((signal, index) => (
              <li
                key={signal}
                className="flex items-baseline gap-3 border-b border-line py-5 lg:border-b-0 lg:py-6"
              >
                <span className="label text-muted">0{index + 1}</span>
                <span className="text-xl tracking-[-0.03em] sm:text-2xl">{signal}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 lg:grid lg:grid-cols-3 lg:gap-12">
            <p className="max-w-xl text-[17px] leading-relaxed text-muted lg:col-span-2 lg:col-start-2">
              Then we turn what we find into products people recognise as theirs, and the
              launch systems that put those products in front of them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
