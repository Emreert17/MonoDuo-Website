import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

// Asymmetric section header: small label on the left, headline on the right.
export default function SectionHead({ index, label, title, intro }) {
  return (
    <Reveal className="mb-10 grid gap-5 lg:mb-16 lg:grid-cols-3 lg:gap-12">
      <Eyebrow index={index}>{label}</Eyebrow>
      <div className="lg:col-span-2">
        <h2 className="display-2 max-w-3xl text-balance">{title}</h2>
        {intro && (
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">{intro}</p>
        )}
      </div>
    </Reveal>
  );
}
