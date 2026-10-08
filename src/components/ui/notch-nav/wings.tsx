import { cn } from "@/lib/utils";
import type { NotchWingProps } from "@/types/notch-nav";

export function NotchLeftWing({ position = "top", className }: NotchWingProps) {
  const isBottom = position === "bottom";
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute right-full size-2.5 md:size-4 overflow-visible select-none transition-colors duration-200",
        isBottom ? "bottom-0" : "top-0",
        className
      )}
    >
      <path
        d={isBottom ? "M 0 20 C 11.046 20 20 11.046 20 0 H 21 V 21 H 0 Z" : "M 0 0 C 11.046 0 20 8.954 20 20 H 21 V -1 H 0 Z"}
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchRightWing({ position = "top", className }: NotchWingProps) {
  const isBottom = position === "bottom";
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute left-full size-2.5 md:size-4 overflow-visible select-none transition-colors duration-200",
        isBottom ? "bottom-0" : "top-0",
        className
      )}
    >
      <path
        d={isBottom ? "M 20 20 C 8.954 20 0 11.046 0 0 H -1 V 21 H 20 Z" : "M 20 0 C 8.954 0 0 8.954 0 20 H -1 V -1 H 20 Z"}
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchCornerLeftWing({ position = "top", className }: NotchWingProps) {
  const isBottom = position === "bottom";
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute left-0 size-2.5 md:size-4 overflow-visible select-none transition-colors duration-200",
        isBottom ? "bottom-full" : "top-full",
        className
      )}
    >
      <path
        d={isBottom ? "M 0 20 H 20 C 8.954 20 0 11.046 0 0 V 20 Z" : "M 0 0 H 20 C 8.954 0 0 8.954 0 20 V 0 Z"}
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchCornerRightWing({ position = "top", className }: NotchWingProps) {
  const isBottom = position === "bottom";
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute right-0 size-2.5 md:size-4 overflow-visible select-none transition-colors duration-200",
        isBottom ? "bottom-full" : "top-full",
        className
      )}
    >
      <path
        d={isBottom ? "M 20 20 H 0 C 11.046 20 20 11.046 20 0 V 20 Z" : "M 20 0 H 0 C 11.046 0 20 8.954 20 20 V 0 Z"}
        fill="currentColor"
      />
    </svg>
  );
}
