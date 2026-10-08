import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { KeyboardEvent, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import type { NotchItemProps } from "@/types/notch-nav";

export const NotchItem = forwardRef<HTMLButtonElement, NotchItemProps>(
  ({ id, label, isActive, icon: Icon, badge, disabled, className, onClick, onSelect, ...props }, ref) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) { event.preventDefault(); return; }
      onSelect(id);
      onClick?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!disabled) onSelect(id);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex h-9 cursor-pointer items-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors outline-none select-none",
          "focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1",
          isActive
            ? "font-semibold text-white"
            : "text-zinc-400 hover:text-zinc-200",
          disabled && "cursor-not-allowed pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {isActive && (
          <motion.span
            layoutId="notch-active-pill"
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(135deg, #e8352d, #ff7226, #ff6838)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {Icon && (
            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors",
                isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
              )}
            />
          )}
          <span className="leading-none">{label}</span>
          {badge && (
            <span className="rounded-full bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-bold tracking-tight uppercase text-orange-300">
              {badge}
            </span>
          )}
        </span>
      </button>
    );
  }
);

NotchItem.displayName = "NotchItem";
