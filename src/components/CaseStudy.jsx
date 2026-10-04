import Image from "next/image";
import Reveal from "./ui/Reveal";

function ProductPlate({ product }) {
  return (
    <div className="grid place-items-center bg-paper-deep p-6 sm:p-10 lg:p-6 xl:p-10">
      <Image
        src={product.image.src}
        alt={product.image.alt}
        width={product.image.width}
        height={product.image.height}
        sizes="(min-width: 640px) 312px, 80vw"
        className="h-auto w-full max-w-[19.5rem]"
      />
    </div>
  );
}

export default function CaseStudy({ study }) {
  const { product, result } = study;

  return (
    <article className="border-t border-ink">
      <div className="label flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4 text-muted">
        <span>
          {study.client} × MonoDuo / {study.category}
        </span>
        <span className="flex items-center gap-2 text-ink">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {study.status}
        </span>
      </div>

      <div className="grid gap-9 lg:grid-cols-12 lg:items-start lg:gap-14">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
          <ProductPlate product={product} />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h3 className="max-w-xl text-[clamp(1.75rem,3.4vw,2.625rem)] leading-[1.08] tracking-[-0.04em] text-balance">
              {study.title}
            </h3>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">{study.summary}</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed">
              <span className="font-medium">
                {product.name}: {product.subtitle}
              </span>
              <span className="text-muted">
                {" "}
                — {product.format.toLowerCase()}. {product.audience}.
              </span>
            </p>
          </Reveal>

          <Reveal>
            <ol className="mt-9 grid gap-x-10 sm:grid-cols-2">
              {study.phases.map((phase, index) => (
                <li key={phase.title} className="border-t border-line py-5">
                  <span className="label text-accent">0{index + 1}</span>
                  <h4 className="mt-3 text-lg tracking-[-0.02em]">{phase.title}</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{phase.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="grid items-end gap-6 border-t border-ink pt-6 sm:grid-cols-2 sm:gap-10">
            <p className="flex items-end gap-4">
              <span className="text-[5.5rem] leading-[0.8] tracking-[-0.06em] sm:text-[7rem]">
                {result.value}
              </span>
              <span className="label max-w-[11rem] pb-1 text-muted">{result.label}</span>
            </p>
            <p className="text-[14px] leading-relaxed text-muted">{result.note}</p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
