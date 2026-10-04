"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

// Each step waits for the one before it, so the line reads as one pass.
const STEP_DELAY_MS = 140;

const TRANSITION =
  "duration-500 ease-out-soft [transition-delay:calc(var(--step)*var(--step-delay))]";

// A vertical timeline on small screens, a horizontal one from lg up. Once in view,
// the line fills and the markers switch on in order.
export default function ProcessTimeline({ steps }) {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <ol
      ref={ref}
      data-active={active}
      style={{ "--step-delay": `${STEP_DELAY_MS}ms` }}
      className="group lg:grid lg:grid-cols-5"
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          style={{ "--step": index }}
          className="relative border-l border-line pb-9 pl-7 last:pb-0 lg:border-t lg:border-l-0 lg:pt-8 lg:pr-8 lg:pb-0 lg:pl-0"
        >
          <span
            aria-hidden="true"
            className={`absolute top-0 -left-px h-full w-px origin-top scale-y-0 bg-ink transition-transform group-data-[active=true]:scale-y-100 lg:-top-px lg:left-0 lg:h-px lg:w-full lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:group-data-[active=true]:scale-x-100 ${TRANSITION}`}
          />
          <span
            aria-hidden="true"
            className={`absolute top-0 -left-[5px] size-[9px] rounded-full bg-line transition-colors group-data-[active=true]:bg-accent lg:-top-[5px] lg:left-0 ${TRANSITION}`}
          />
          <div
            className={`opacity-0 transition-opacity group-data-[active=true]:opacity-100 ${TRANSITION}`}
          >
            <span className="label block text-muted">0{index + 1}</span>
            <h3 className="mt-3 text-[1.75rem] leading-none tracking-[-0.04em] lg:mt-9">
              {step.title}
            </h3>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed">{step.body}</p>
            <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-muted">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
