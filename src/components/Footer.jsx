import { nav, site } from "@/lib/site";
import Logo from "./ui/Logo";

const LINK_CLASS = "text-muted-dark transition-colors hover:text-paper";

export default function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink text-paper">
      <div className="shell py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <a href="#top" aria-label="MonoDuo — back to top" className="inline-block">
              <Logo tone="paper" />
            </a>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-muted-dark">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[13px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={LINK_CLASS}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-dark pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            <li>
              <a href={`mailto:${site.email}`} className={LINK_CLASS}>
                {site.email}
              </a>
            </li>
            {site.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label text-muted-dark">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
