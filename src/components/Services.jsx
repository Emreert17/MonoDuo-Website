import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

const SERVICES = [
  {
    title: "Audience Research",
    verb: "Listen",
    body: "Understand what an audience wants, struggles with and actively asks for.",
  },
  {
    title: "Product Strategy",
    verb: "Shape",
    body: "Turn those signals into focused digital product opportunities.",
  },
  {
    title: "Product Creation",
    verb: "Make",
    body: "Design and build the product, offer and customer experience.",
  },
  {
    title: "Launch & Growth",
    verb: "Release",
    body: "Create the positioning, launch structure and systems needed to bring it to market.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section border-b border-line">
      <div className="shell">
        <SectionHead
          index="01"
          label="What we do"
          title={
            <>
              Four capabilities, <em>one connected line.</em>
            </>
          }
          intro="Each one feeds the next. Research decides the strategy, strategy decides the product, and the product decides how it launches."
        />

        <ol className="border-b border-ink">
          {SERVICES.map((service, index) => (
            <li key={service.title} className="group border-t border-ink">
              <Reveal className="grid gap-x-6 gap-y-2.5 py-6 lg:grid-cols-12 lg:items-baseline lg:py-8">
                <div className="flex items-baseline justify-between lg:col-span-1 lg:block">
                  <span className="label text-muted">0{index + 1}</span>
                  <span className="label text-accent lg:hidden">{service.verb}</span>
                </div>
                <h3 className="text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] tracking-[-0.04em] transition-transform duration-200 ease-out-soft group-hover:translate-x-1.5 lg:col-span-5">
                  {service.title}
                </h3>
                <p className="max-w-md text-[15px] leading-relaxed text-muted lg:col-span-4">
                  {service.body}
                </p>
                <span className="label hidden text-right text-accent lg:col-span-2 lg:block">
                  {service.verb}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
