"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stages } from "@/lib/site";

// One continuous line that rises once for each stage, on a 1200 × 320 grid.
const LINE =
  "M75 320V150A75 75 0 0 1 225 150V170A75 75 0 0 0 375 170V150A75 75 0 0 1 525 150V170A75 75 0 0 0 675 170V150A75 75 0 0 1 825 150V170A75 75 0 0 0 975 170V150A75 75 0 0 1 1125 150V320";

// Each crest sits at the centre of its stage column, 75 / 320 from the top.
const CREST_TOP = `${(75 / 320) * 100}%`;
const crestLeft = (index) => `${((index + 0.5) / stages.length) * 100}%`;

function Line({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
    >
      <path d={LINE} fill="none" vectorEffect="non-scaling-stroke" className={className} />
    </svg>
  );
}

export default function HeroFlow() {
  const reduceMotion = useReducedMotion();

  return (
    <figure aria-label="One line connecting audience insight, product, launch and growth">
      <div className="relative h-28 overflow-hidden bg-paper-deep/50 sm:h-48 lg:h-64">
        <Line className="stroke-paper [stroke-width:7px] sm:[stroke-width:18px] lg:[stroke-width:34px]" />
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        >
          <Line className="stroke-ink [stroke-width:1px]" />
          {stages.map((stage, index) => (
            <span
              key={stage}
              aria-hidden="true"
              style={{ left: crestLeft(index), top: CREST_TOP }}
              className="absolute size-1.5 -translate-1/2 rounded-full bg-accent ring-[3px] ring-paper lg:size-2"
            />
          ))}
        </motion.div>
      </div>

      <ol className="grid grid-cols-4 border-b border-line">
        {stages.map((stage, index) => (
          <li key={stage} className="flex flex-col items-center gap-1.5 py-4 text-center">
            <span className="label text-muted">0{index + 1}</span>
            <span className="text-[13px] font-medium tracking-tight sm:text-[15px]">
              {index === 0 && <span className="hidden sm:inline">Audience </span>}
              {stage}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
