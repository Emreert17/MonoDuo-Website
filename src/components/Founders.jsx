import Image from "next/image";
import { founders } from "@/lib/site";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

export default function Founders() {
  return (
    <section id="founders" className="section border-b border-line">
      <div className="shell">
        <SectionHead
          index="05"
          label="The people behind MonoDuo"
          title={
            <>
              Small <em>by design.</em>
            </>
          }
          intro="MonoDuo is built by two people working closely across research, product, strategy and execution."
        />

        {/* Sits in the same two right-hand columns as the section headline. */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-2 lg:col-start-2">
            {founders.map(({ name, role, image }, index) => (
              <li key={image.src} className="border-t border-ink py-8 sm:pt-6 sm:pb-0">
                <Reveal
                  delay={index * 0.1}
                  className="flex flex-col items-center gap-5 text-center"
                >
                  <div className="relative size-32 shrink-0 overflow-hidden rounded-full bg-paper-deep sm:size-44">
                    <Image
                      src={image.src}
                      alt={`${name}, ${role} of MonoDuo`}
                      fill
                      sizes="(min-width: 640px) 230px, 170px"
                      className="object-cover"
                      style={{ objectPosition: image.position, scale: image.scale }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg tracking-[-0.02em]">{name}</h3>
                    <p className="label mt-2 flex items-center justify-center gap-2 text-muted">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                      {role}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
