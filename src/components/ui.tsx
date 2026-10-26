import { CheckIcon } from "./icons";

/** Filled CTA in the current theme; add height, radius, padding and text size per use. */
export const PRIMARY_BUTTON =
  "inline-flex items-center gap-2.5 whitespace-nowrap bg-brand-deep font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-brand-hover active:scale-[.98]";

/** Small-caps label above headings and figures. */
export const EYEBROW = "text-[11px] font-semibold tracking-[.14em] text-brand uppercase";

/** Row of "✓ item" proof points in the theme accent. */
export function Ticks({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-[22px] text-[13.5px] font-medium text-muted ${className}`}>
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-[7px]">
          <CheckIcon size={14} className="text-brand" />
          {item}
        </span>
      ))}
    </div>
  );
}
