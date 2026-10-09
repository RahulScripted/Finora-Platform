import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { LayoutGroup } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const layoutGroupId = useId();

  const [internalActiveId, setInternalActiveId] = useState<string>(
    defaultActiveId || items[0]?.id || ""
  );
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  /* shared notch bg — warm dark matching logo shadow */
  const notchBg = "bg-[#1c1410]";
  const notchText = "text-zinc-100";
  const wingText = "text-[#1c1410]";

  return (
    <div
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
          className={cn(
            "xl:hidden absolute z-50 flex flex-col select-none transition-colors duration-200",
            notchBg, notchText,
            "w-auto left-1/2 -translate-x-1/2 px-4",
            isBottom ? "bottom-0 rounded-t-[24px]" : "top-0 rounded-b-[24px]"
          )}
        >
          <NotchLeftWing position={position} className={wingText} />
          <NotchRightWing position={position} className={wingText} />

          <div
            className={cn(
              "w-auto flex h-10 items-center justify-between gap-3 sm:gap-5",
              isBottom ? "sm:items-baseline md:items-end" : "sm:items-baseline md:items-start"
            )}
          >
            {showLogo && logo && (
              <div className="flex shrink-0 items-center">{logo}</div>
            )}

            <button
              type="button"
              aria-expanded={isNavOpen}
              aria-haspopup="listbox"
              aria-label="Toggle navigation menu"
              onClick={handleToggleNav}
              className="group flex h-8 sm:h-8.5 w-full cursor-pointer items-center justify-center gap-1.5 rounded-full px-2.5 py-2.5 sm:p-2.5 text-xs sm:text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              {activeItem?.icon && (
                <activeItem.icon className="size-3.5 sm:size-4 shrink-0 text-orange-400" />
              )}
              <span className="leading-none text-zinc-100">{activeItem?.label}</span>
              {isBottom ? (
                <ChevronUp className={cn("size-3.5 text-orange-400 transition-transform duration-200", isNavOpen && "rotate-180")} />
              ) : (
                <ChevronDown className={cn("size-3.5 text-orange-400 transition-transform duration-200", isNavOpen && "rotate-180")} />
              )}
            </button>

            {showRightContent && rightContent && (
              <div className="flex shrink-0 items-center justify-end w-max">
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
              <div className={cn("flex w-full flex-col gap-0.5 px-0.5", isBottom ? "pb-2 pt-1.5" : "pt-1.5 pb-2.5")}>
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
            "relative flex w-full flex-col h-full overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-6",
            isBottom ? "pt-3 pb-17.5" : "pt-17.5 pb-3"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
