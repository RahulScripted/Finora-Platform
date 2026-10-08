import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NotchDropdownItemProps } from "@/types/notch-nav";

export function NotchDropdownItem({ item, isSelected, onSelect }: NotchDropdownItemProps) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      disabled={item.disabled}
      onClick={() => onSelect(item.id)}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-left text-sm outline-none transition-colors select-none",
        "focus-visible:ring-2 focus-visible:ring-orange-400",
        isSelected
          ? "font-semibold text-white"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200 active:bg-white/10",
        item.disabled && "cursor-not-allowed pointer-events-none opacity-40"
      )}
      style={isSelected ? { background: "linear-gradient(135deg, #e8352d, #ff7226, #ff6838)" } : undefined}
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <Icon className={cn("size-4 shrink-0", isSelected ? "text-white" : "text-zinc-400")} />
        )}
        <span>{item.label}</span>
      </div>
      {isSelected && <Check className="size-3.5 text-white" />}
    </button>
  );
}
