"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "./icons";
import { Wordmark } from "./wordmark";

const NAV = [
  { label: "For Studios", href: "/studios" },
  { label: "For Trainers", href: "/trainers" },
  { label: "Pricing", href: "/#pricing" },
];

const PILOT_MENU = [
  {
    title: "For studios and instructors",
    sub: "Request a studio pilot",
    href: "/studios#request",
    theme: "theme-studios",
  },
  {
    title: "For personal trainers",
    sub: "Request a trainer pilot",
    href: "/trainers#request",
    theme: "theme-trainers",
  },
];

/** The CTA follows the page theme (`brand-deep`); the wordmark color is passed in. */
export function SiteHeader({ wordmark = "navy" }: { wordmark?: "navy" | "purple" }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white/92 backdrop-blur-[14px]">
      <div className="page-container flex h-[68px] items-center gap-8">
        <Wordmark height={28} color={wordmark} eager />
        <span className="flex-1" />
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-[14px] font-medium whitespace-nowrap min-[760px]:flex"
        >
          {NAV.map(({ label, href }) => {
            const current = href === pathname;
            return (
              <Link
                key={href}
                href={href}
                aria-current={current ? "page" : undefined}
                className={`transition-colors duration-150 hover:text-ink ${current ? "font-semibold text-ink" : "text-muted"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div ref={menuRef} className="relative">
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[12px] bg-brand-deep pr-4 pl-[18px] text-[14px] font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-brand-hover"
          >
            Request a free pilot
            <ChevronDownIcon size={12} strokeWidth={2} />
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute top-12 right-0 flex w-[264px] flex-col gap-0.5 rounded-[14px] border border-rule bg-white p-1.5 shadow-[0_16px_36px_-18px_rgba(18,23,29,.35)]"
            >
              {PILOT_MENU.map((item) => (
                <Link
                  key={item.href}
                  role="menuitem"
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`${item.theme} flex flex-col gap-0.5 rounded-[10px] px-3 py-2.5 outline-none hover:bg-brand-tint focus-visible:bg-brand-tint`}
                >
                  <span className="text-[14px] font-semibold text-ink">{item.title}</span>
                  <span className="text-[12px] text-caption">{item.sub}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
