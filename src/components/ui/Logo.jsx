import Image from "next/image";
import { brand } from "@/lib/site";

// tone: "ink" for light backgrounds, "paper" for dark backgrounds.
export default function Logo({ tone = "ink", className = "h-[22px]", priority = false }) {
  return (
    <Image
      src={brand.logo[tone]}
      alt="MonoDuo"
      width={335.5}
      height={52.5}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
