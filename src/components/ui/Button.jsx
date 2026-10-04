import { ArrowUpRight } from "lucide-react";

const BASE =
  "group inline-flex h-12 items-center justify-between gap-8 rounded-full px-6 text-[13px] font-medium leading-none whitespace-nowrap transition-colors duration-200 disabled:cursor-progress disabled:opacity-70";

const VARIANTS = {
  ink: "bg-ink text-paper hover:bg-accent disabled:hover:bg-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  paper: "bg-paper text-ink hover:bg-accent hover:text-paper",
};

export const buttonClass = (variant = "ink", className = "") =>
  `${BASE} ${VARIANTS[variant]} ${className}`;

export function ButtonArrow() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      size={16}
      strokeWidth={1.75}
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  );
}

export default function ButtonLink({ href, variant, className, children, ...props }) {
  return (
    <a href={href} className={buttonClass(variant, className)} {...props}>
      {children}
      <ButtonArrow />
    </a>
  );
}
