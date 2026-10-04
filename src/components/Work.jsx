import { caseStudies } from "@/lib/work";
import CaseStudy from "./CaseStudy";
import SectionHead from "./ui/SectionHead";

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <SectionHead
          index="02"
          label="Selected work"
          title={
            <>
              Our first collaboration, <em>shown as it is.</em>
            </>
          }
          intro="We're a young studio with one finished pilot. Here is what we did and what it produced, without rounding up."
        />

        <div className="grid gap-16 lg:gap-24">
          {caseStudies.map((study) => (
            <CaseStudy key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
