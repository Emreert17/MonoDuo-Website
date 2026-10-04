import ProcessTimeline from "./ProcessTimeline";
import SectionHead from "./ui/SectionHead";

const STEPS = [
  {
    title: "Discover",
    body: "We analyze the creator, business, audience and existing demand.",
    detail: "The goal is to understand what is already working before deciding what to build.",
  },
  {
    title: "Validate",
    body: "We identify the strongest pain points, desires and product opportunities.",
    detail: "We look for repeated patterns rather than isolated opinions.",
  },
  {
    title: "Build",
    body: "We turn the opportunity into a focused digital product and offer.",
    detail: "Every decision should trace back to something the audience actually needs.",
  },
  {
    title: "Launch",
    body: "We create the positioning, content and launch system.",
    detail: "The first launch is designed to test demand as much as generate sales.",
  },
  {
    title: "Learn",
    body: "We collect customer feedback and use real behavior to improve the next iteration.",
    detail: "What happens after launch informs what comes next.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section border-b border-line">
      <div className="shell">
        <SectionHead
          index="03"
          label="Process"
          title={
            <>
              Five steps. <em>Each one earns the next.</em>
            </>
          }
        />
        <ProcessTimeline steps={STEPS} />
      </div>
    </section>
  );
}
