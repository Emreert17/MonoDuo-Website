import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

// Each statement is split around the word that carries it: [before, emphasis, after].
const PRINCIPLES = [
  {
    statement: ["Demand ", "before", " development."],
    note: "We look for evidence that people want something before we make it. Signals come from repeated questions, conversations, content and real behavior.",
  },
  {
    statement: ["Research ", "before", " assumptions."],
    note: "What an audience says and does outweighs what anyone guesses. That research shapes both what we build and how it should be positioned.",
  },
  {
    statement: ["Small experiments ", "before", " big bets."],
    note: "A pilot with real customers teaches more than a perfect plan. A small launch shows what to keep, change or drop.",
  },
  {
    statement: ["We build ", "with", " the audience, not around them."],
    note: "The people a product is for help decide what it becomes. Their questions and feedback stay in the work from start to finish.",
  },
];

export default function Why() {
  return (
    <section id="why" className="section border-b border-line">
      <div className="shell">
        <SectionHead
          index="04"
          label="Why MonoDuo"
          title={
            <>
              A studio with <em>an order of operations.</em>
            </>
          }
        />

        <ul className="border-b border-ink">
          {PRINCIPLES.map(({ statement: [before, emphasis, after], note }) => (
            <li key={note} className="border-t border-ink">
              <Reveal className="grid gap-x-10 gap-y-3 py-6 lg:grid-cols-12 lg:items-end lg:py-8">
                <p className="text-[clamp(1.875rem,5vw,4rem)] leading-[1.02] tracking-[-0.045em] lg:col-span-9">
                  {before}
                  <em className="text-accent">{emphasis}</em>
                  {after}
                </p>
                <p className="max-w-sm text-[14px] leading-relaxed text-muted lg:col-span-3 lg:pb-1.5">
                  {note}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
