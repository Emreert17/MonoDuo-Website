import HeroFlow from "./HeroFlow";
import ButtonLink from "./ui/Button";
import Eyebrow from "./ui/Eyebrow";

export default function Hero() {
  return (
    <section className="pt-28 sm:pt-32 lg:pt-40">
      <div className="shell">
        <div className="flex items-center justify-between gap-6">
          <Eyebrow dot>Digital growth &amp; product studio</Eyebrow>
          <p className="label hidden text-muted md:block">
            Insight → Product → Launch → Growth
          </p>
        </div>

        <h1 className="display-1 mt-8 max-w-[15ch] text-balance sm:mt-10">
          Turning audience insight into <em className="text-accent">products people actually want.</em>
        </h1>

        <div className="mt-9 mb-12 flex flex-col gap-8 sm:mt-10 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-[17px] leading-relaxed text-muted">
            We research audiences, uncover real demand, build digital products, and design
            the systems that bring them to market.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" variant="ink">
              Start a Project
            </ButtonLink>
            <ButtonLink href="#work" variant="outline">
              See Our Work
            </ButtonLink>
          </div>
        </div>

        <HeroFlow />
      </div>
    </section>
  );
}
