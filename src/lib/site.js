export const site = {
  name: "MonoDuo",
  title: "MonoDuo — Audience-Led Digital Products",
  description:
    "MonoDuo turns audience insight into digital products, launch systems and growth opportunities.",
  tagline: "A digital growth and product studio for creators and businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  // Public address shown in the footer and contact section. The inbox that
  // receives form submissions is set separately, server-side, by CONTACT_EMAIL.
  email: "partnerships@monoduo.site",
  // Placeholder social links — replace with the real ones.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

// The file names in /public do not match their contents, so every brand asset
// is referenced from here by what the file actually contains.
export const brand = {
  logo: {
    ink: "/monoduo-symbol-white.svg", // symbol + wordmark, black
    paper: "/monoduo-app-icon-dark.svg", // symbol + wordmark, off-white
  },
  ogImage: "/monoduo-logo-primary-white.png", // 1024×1024 app icon, dark
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "What We Do", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why MonoDuo", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export const stages = ["Insight", "Product", "Launch", "Growth"];

// The creator testimonial. `width` / `height` are the displayed size of the file
// (it is a portrait clip); the player corrects them from the video's own metadata.
// A poster is picked up automatically from /public/videos — see lib/testimonialVideo.js.
export const testimonialVideo = {
  src: "/videos/reference.mp4",
  width: 480,
  height: 848,
  title: "Creator testimonial",
  credit: "Mike × MonoDuo",
};
