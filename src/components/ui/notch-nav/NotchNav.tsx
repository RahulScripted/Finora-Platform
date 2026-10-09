import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { LayoutGroup } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { NotchItem } from "./NotchItem";
import { NotchDropdownItem } from "./NotchDropdownItem";
import { NotchLeftWing, NotchRightWing, NotchCornerLeftWing, NotchCornerRightWing } from "./wings";
import type { NotchNavProps } from "@/types/notch-nav";

export function NotchNav({
  items,
  activeId: controlledActiveId,
  defaultActiveId,
  position = "top",
  logo,
  rightContent,
  showLogo = true,
  showRightContent = true,
  children,
  onActiveChange,
  className,
  scrollRef,
  ...props
}: NotchNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const layoutGroupId = useId();

  const [internalActiveId, setInternalActiveId] = useState<string>(
    defaultActiveId || items[0]?.id || ""
  );
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isBottom = position === "bottom";
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const activeIndex = useMemo(() => {
    const index = items.findIndex((item) => item.id === activeId);
    return index >= 0 ? index : 0;
  }, [items, activeId]);

  const activeItem = items[activeIndex] || items[0];

  const handleSelect = useCallback(
    (id: string) => {
      if (controlledActiveId === undefined) setInternalActiveId(id);
      setIsNavOpen(false);
      onActiveChange?.(id);
    },
    [controlledActiveId, onActiveChange]
  );

  const handleToggleNav = useCallback(() => setIsNavOpen((p) => !p), []);
  const handleCloseAll = useCallback(() => setIsNavOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setIsNavOpen(false);
    };
    if (isNavOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNavOpen]);

  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(el.scrollTop > 8);
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const notches = root.querySelectorAll<HTMLElement>("[data-notch]");
    if (notches.length === 0) return;
    const fromY = isBottom ? 60 : -60;
    const ctx = gsap.context(() => {
      gsap.from(notches, {
        y: fromY,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
        clearProps: "transform,opacity",
      });
    }, root);
    return () => ctx.revert();
  }, [isBottom]);

  // Animate the mobile dropdown items in/out with GSAP.
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (items.length === 0) return;

    if (isNavOpen) {
      gsap.fromTo(
        items,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [isNavOpen]);

  /* shared notch bg — warm dark matching logo shadow */
  const notchBg = "bg-[#1c1410]";
  const notchText = "text-zinc-100";
  const wingText = "text-[#1c1410]";

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed inset-0 h-screen w-screen overflow-hidden bg-[#1c1410] p-0 md:p-2 transition-colors duration-200",
        className
      )}
      {...props}
    >
      <div className="relative flex h-full w-full flex-col rounded-none md:rounded-2xl bg-background text-foreground antialiased transition-colors duration-200">

        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={handleCloseAll}
          className={cn(
            "absolute inset-0 z-40 rounded-none md:rounded-2xl transition-opacity duration-200 ease-out xl:hidden",
            isNavOpen
              ? "pointer-events-auto bg-black/20 backdrop-blur-[2px] opacity-100"
              : "pointer-events-none opacity-0"
          )}
        />

        {/* Desktop: Logo notch */}
        {showLogo && logo && (
          <aside
            data-notch
            aria-label="Brand logo notch"
            className={cn(
              "hidden xl:flex absolute left-0 z-50 h-10 px-5 select-none transition-colors duration-200",
              notchBg, notchText,
              isBottom ? "bottom-0 rounded-tr-[24px] md:items-end" : "top-0 rounded-br-[24px] md:items-baseline"
            )}
          >
            <div className="flex items-center">{logo}</div>
            <NotchRightWing position={position} className={wingText} />
            <NotchCornerLeftWing position={position} className={wingText} />
          </aside>
        )}

        {/* Desktop: Center nav notch */}
        <header
          data-notch
          role="tablist"
          aria-orientation="horizontal"
          className={cn(
            "hidden xl:flex absolute left-1/2 -translate-x-1/2 z-50 h-11 px-4 select-none transition-colors duration-200",
            notchBg, notchText,
            isBottom ? "bottom-0 rounded-t-[24px] md:items-end" : "top-0 rounded-b-[24px] md:items-start"
          )}
        >
          <NotchLeftWing position={position} className={wingText} />
          <NotchRightWing position={position} className={wingText} />
          <LayoutGroup id={layoutGroupId}>
            <div className="flex items-center gap-1">
              {items.map((item) => (
                <NotchItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  badge={item.badge}
                  disabled={item.disabled}
                  isActive={item.id === activeId}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </LayoutGroup>
        </header>

        {/* Desktop: Right action notch */}
        {showRightContent && rightContent && (
          <aside
            data-notch
            aria-label="User actions notch"
            className={cn(
              "hidden xl:flex absolute right-0 z-50 h-10 px-5 select-none transition-colors duration-200",
              notchBg, notchText,
              isBottom ? "bottom-0 rounded-tl-[24px] md:items-end" : "top-0 rounded-bl-[24px] md:items-start"
            )}
          >
            <NotchLeftWing position={position} className={wingText} />
            <NotchCornerRightWing position={position} className={wingText} />
            <div className="flex items-center">{rightContent}</div>
          </aside>
        )}

        {/* Mobile/Tablet: Single compact notch */}
        <div
          ref={navRef}
          data-notch
          className={cn(
            "xl:hidden absolute left-1/2 -translate-x-1/2 z-50 flex flex-col select-none transition-shadow duration-300 ease-out",
            notchBg, notchText,
            "w-auto max-w-[calc(100%-2rem)] px-3 sm:px-4",
            scrolled && "shadow-lg shadow-black/20",
            isBottom ? "bottom-0 rounded-t-[24px]" : "top-0 rounded-b-[24px]"
          )}
        >
          <NotchLeftWing position={position} className={wingText} />
          <NotchRightWing position={position} className={wingText} />

          <div className="flex h-11 w-full items-center justify-between gap-3">
            {showLogo && logo && (
              <div className="flex shrink-0 items-center">{logo}</div>
            )}

            <button
              type="button"
              aria-expanded={isNavOpen}
              aria-haspopup="listbox"
              aria-label="Toggle navigation menu"
              onClick={handleToggleNav}
              className="group flex h-8 min-w-0 cursor-pointer items-center justify-center gap-2 rounded-full px-3 text-xs sm:text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              {activeItem?.icon && (
                <activeItem.icon className="size-4 shrink-0 text-orange-400" />
              )}
              <span className="leading-none text-zinc-100">{activeItem?.label}</span>
              {isBottom ? (
                <ChevronUp className={cn("size-3.5 shrink-0 text-orange-400 transition-transform duration-200", isNavOpen && "rotate-180")} />
              ) : (
                <ChevronDown className={cn("size-3.5 shrink-0 text-orange-400 transition-transform duration-200", isNavOpen && "rotate-180")} />
              )}
            </button>

            {showRightContent && rightContent && (
              <div className="flex shrink-0 items-center justify-end">
                {rightContent}
              </div>
            )}
          </div>

          {/* Nav dropdown */}
          <div
            role="listbox"
            aria-label="Navigation options"
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-200 ease-out w-full",
              isNavOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
            )}
          >
            <div className="overflow-hidden">
              <div ref={dropdownRef} className={cn("flex w-full flex-col gap-0.5 px-0.5", isBottom ? "pb-2 pt-1.5" : "pt-1.5 pb-2.5")}>
                {items.map((item) => (
                  <NotchDropdownItem
                    key={item.id}
                    item={item}
                    isSelected={item.id === activeId}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className={cn(
            "cinematic-scroll relative flex w-full flex-col h-full overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-6",
            isBottom ? "pt-3 pb-20 md:pb-17.5" : "pt-20 md:pt-17.5 pb-3"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
