import { HalftoneWordmarkFooter } from "@/components/ui/halftone-wordmark-footer/HalftoneWordmarkFooter";
import type {
  FooterColumn,
  FooterLink,
} from "@/components/ui/halftone-wordmark-footer/HalftoneWordmarkFooter";
import { NAV_ITEMS } from "@/types/nav-items";
import logoSvg from "@/assets/svgs/logo.svg";

const SCROLL_PREFIX = "section:";

const MENU_COLUMN: FooterColumn = {
  title: "Menu",
  links: NAV_ITEMS.map((item) => ({
    label: item.label,
    href: `#${SCROLL_PREFIX}${item.id}`,
  })),
};

const CONTACT_COLUMN: FooterColumn = {
  title: "Contact",
  links: [
    { label: "hello@finora.com", href: "mailto:hello@finora.com" },
    { label: "+91 98830 67644", href: "tel:+919883067644" },
  ],
};

const COMPANY_COLUMN: FooterColumn = {
  title: "Finora",
  links: [
    { label: "About", href: `#${SCROLL_PREFIX}about` },
    { label: "Privacy" },
    { label: "Terms" },
  ],
};

const COLUMNS: FooterColumn[] = [MENU_COLUMN, COMPANY_COLUMN, CONTACT_COLUMN];

export function Footer() {
  const handleLinkClick = (link: FooterLink) => {
    if (!link.href?.startsWith(`#${SCROLL_PREFIX}`)) return;
    const id = link.href.slice(`#${SCROLL_PREFIX}`.length);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="-mx-3 -mb-3 mt-16 h-[560px] shrink-0 overflow-hidden rounded-b-none sm:-mx-4 md:-mx-6 md:rounded-b-2xl">
      <HalftoneWordmarkFooter
        wordmark="finora"
        label="Finora"
        meta="©2026 · India"
        brandIcon={<img src={logoSvg} alt="Finora" className="h-6 w-auto" />}
        columns={COLUMNS}
        backToTop={false}
        onLinkClick={handleLinkClick}
        palette={{ background: "#0c0c0b", ink: "#e9e4da", warm: "#ff7226" }}
        height="560px"
      />
    </div>
  );
}

export default Footer;
