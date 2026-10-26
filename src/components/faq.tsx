"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <div className="min-w-0 flex-[2_1_560px] border-b border-rule">
      {items.map((item, i) => {
        const open = !!faqOpen[i];
        return (
          <div key={item.q} className="border-t border-rule">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setFaqOpen((s) => ({ ...s, [i]: !s[i] }))}
              className="flex w-full cursor-pointer items-center gap-5 py-[22px] text-left"
            >
              <span className="flex-1 text-[18px]/[1.35] font-semibold text-ink">{item.q}</span>
              <ChevronDownIcon
                className={`flex-none text-caption transition-transform duration-250 ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <p
                id={`faq-answer-${i}`}
                className="m-0 pr-10 pb-6 text-[16px]/[1.6] text-pretty text-muted"
              >
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
