import { useCallback, useEffect, useRef, useState } from "react";
import { NotchNav } from "@/components/ui/notch-nav/NotchNav";
import { NAV_ITEMS } from "@/types/nav-items";
import { NavLogo } from "./NavLogo";
import { NavSignUp } from "./NavSignUp";
import { Testimonial } from "@/sections/testimonial/Testimonial";
import { Faq } from "@/sections/faq/Faq";

function Placeholder({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-2 text-center"
    >
      <p className="text-sm text-muted-foreground">Section</p>
      <p className="text-3xl font-bold text-foreground capitalize">{label}</p>
    </section>
  );
}

export default function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleActiveChange = useCallback((id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Track which section is in view while scrolling.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { root, threshold: 0.5 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <NotchNav
      items={NAV_ITEMS}
      activeId={activeId}
      position="top"
      logo={<NavLogo />}
      rightContent={<NavSignUp />}
      onActiveChange={handleActiveChange}
      scrollRef={scrollRef}
    >
      {NAV_ITEMS.map(({ id, label }) => {
        if (id === "testimonials") return <Testimonial key={id} />;
        if (id === "faq") return <Faq key={id} />;
        return <Placeholder key={id} id={id} label={label} />;
      })}
    </NotchNav>
  );
}
