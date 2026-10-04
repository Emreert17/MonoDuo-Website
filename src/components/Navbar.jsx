"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import ButtonLink from "./ui/Button";
import Logo from "./ui/Logo";

const MENU_ID = "mobile-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event) => event.matches && setOpen(false);

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  // Release the scroll lock before the link's own navigation runs; unlocking
  // afterwards would cancel the smooth scroll to the target section.
  const close = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          solid ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <nav aria-label="Main navigation" className="shell flex h-18 items-center justify-between lg:h-20">
          <a href="#top" aria-label="MonoDuo — back to top" onClick={close}>
            <Logo priority className="h-5 lg:h-[22px]" />
          </a>

          <ul className="hidden items-center gap-9 text-[13px] lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink/75 transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <ButtonLink href="#contact" variant="outline">
              Start a Project
            </ButtonLink>
          </div>

          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      {/* Outside the header: its backdrop-filter would otherwise clip this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={MENU_ID}
            className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="shell flex min-h-full flex-col justify-between gap-10 pt-6 pb-10">
              <ul>
                {nav.map((item, index) => (
                  <li key={item.href} className="border-b border-line">
                    <a
                      href={item.href}
                      onClick={close}
                      className="flex items-baseline gap-5 py-5 text-[2rem] leading-none tracking-[-0.04em]"
                    >
                      <span className="label text-muted">0{index + 1}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ButtonLink href="#contact" variant="ink" onClick={close}>
                Start a Project
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
