"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";

const ITEMS = [
  {
    q: "Who is Progra for?",
    a: "Recurring-class studios, including yoga, pilates, cycling, and HIIT.",
  },
  {
    q: "Do members need to pay?",
    a: "No. Members use Progra for free. Your studio covers the cost.",
  },
  {
    q: "Do members need an iPhone?",
    a: "Progra is currently available on iOS. Tell us if most of your members use Android, and we’ll talk about what that means for your pilot.",
  },
  {
    q: "Does this replace my booking software?",
    a: "No. Progra adds a community and tracking layer. It doesn’t manage your schedule or payments.",
  },
  {
    q: "Do I need to track check-ins manually?",
    a: "Members log their own sessions. We’re exploring integrations with booking software, and we’ll tell you if that becomes available.",
  },
  {
    q: "How long does setup take?",
    a: "Most studios are set up in under an hour. We’ll walk you through it.",
  },
  {
    q: "What if my members don’t use it?",
    a: "That’s exactly what the pilot is for. We’ll look at engagement with you at the end, and you won’t pay if it isn’t working.",
  },
  {
    q: "Who’s behind Progra?",
    a: "Progra was founded by a team that includes certified personal trainers and students of fitness, business, and philosophy.",
  },
];

export function Faq() {
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <div className="min-w-0 flex-[2_1_560px] border-b border-rule">
      {ITEMS.map((item, i) => {
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
