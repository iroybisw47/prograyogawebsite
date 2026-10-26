import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { EYEBROW, PRIMARY_BUTTON, Ticks } from "@/components/ui";

const PATHS = [
  {
    theme: "theme-studios",
    eyebrow: "For studios and instructors",
    heading: "Increase retention at your studio.",
    body: "Members join your studio group, track their practice in and outside class, and cheer each other on. You see who’s showing up and who’s drifting.",
    cta: { label: "Explore Progra for studios", href: "/studios" },
    link: { label: "Request a studio pilot", href: "/studios#request" },
  },
  {
    theme: "theme-trainers",
    eyebrow: "For personal trainers",
    heading: "Keep clients longer.",
    body: "Set a plan for each client, watch it get checked off, and track their weight and volume over time. Clients share sessions and PRs, and you cheer them on.",
    cta: { label: "Explore Progra for trainers", href: "/trainers" },
    link: { label: "Request a trainer pilot", href: "/trainers#request" },
  },
];

const BASICS_FIGURE = "font-serif text-[clamp(30px,3vw,40px)]/none font-medium tracking-[-0.02em] text-ink";
const BASICS_TEXT = "m-0 text-[15px]/[1.55] text-pretty text-muted";

export default function Home() {
  return (
    <div className="theme-home">
      <LegacyHashRedirect />
      <SiteHeader />
      <main>
        <Hero />
        <Paths />
        <Basics />
      </main>
      <SiteFooter page="home" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="pt-[clamp(72px,10vw,140px)] pb-[clamp(56px,7vw,96px)]">
      <div className="page-container flex flex-col items-center gap-7 text-center">
        {/* Inline dot (not flex) so it stays with the first line when this wraps on phones. */}
        <span className="text-[12px] font-semibold tracking-[.14em] text-balance text-brand uppercase">
          <span className="mr-2.5 inline-block size-[7px] -translate-y-px rounded-full bg-brand align-middle" />
          For studios, instructors &amp; personal trainers
        </span>
        <h1 className="m-0 max-w-[13em] font-serif text-[clamp(42px,6vw,84px)]/[1.02] font-medium tracking-[-0.03em] text-balance text-ink">
          <span className="block">Accountability between sessions.</span>
          <em className="block text-brand italic">Better retention.</em>
        </h1>
        <p className="m-0 max-w-[36em] text-[clamp(17px,1.5vw,20px)]/[1.55] text-pretty text-muted">
          Progra is an iOS app that helps the people you coach track their progress in and outside
          of sessions and stay connected to the people they train with. You see who’s showing up,
          and who needs a check-in before they quit.
        </p>
        <Ticks
          items={["14-day free pilot", "Setup in under an hour", "Free for members and clients"]}
          className="justify-center gap-y-3"
        />
      </div>
    </section>
  );
}

function Paths() {
  return (
    <section id="paths" className="scroll-mt-[68px] pb-[clamp(72px,9vw,128px)]">
      <div className="page-container grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
        {PATHS.map((path) => (
          <div
            key={path.cta.href}
            className={`${path.theme} flex flex-col gap-[18px] rounded-[24px] bg-brand-tint p-[clamp(28px,4vw,48px)]`}
          >
            <span className={EYEBROW}>{path.eyebrow}</span>
            <h2 className="m-0 font-serif text-[clamp(30px,3.2vw,42px)]/[1.08] font-medium tracking-[-0.02em] text-balance text-ink">
              {path.heading}
            </h2>
            <p className="m-0 max-w-[30em] text-[16px]/[1.55] text-pretty text-muted">{path.body}</p>
            <span className="flex-1" />
            <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3">
              <Link
                href={path.cta.href}
                className={`${PRIMARY_BUTTON} h-[52px] rounded-[15px] px-[22px] text-[15px]`}
              >
                {path.cta.label}
                <ArrowRightIcon />
              </Link>
              <Link
                href={path.link.href}
                className="border-b-[1.5px] border-brand/35 pb-0.5 text-[15px] font-semibold whitespace-nowrap text-ink transition-colors duration-150 hover:border-brand hover:text-brand"
              >
                {path.link.label}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Basics() {
  return (
    <section id="pricing" className="scroll-mt-[68px] border-t border-rule">
      <div className="page-container section-y flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-8">
        <h2 className="heading-2 flex-[1_1_260px]">The basics</h2>
        <div className="grid min-w-0 flex-[2.4_1_600px] grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-[clamp(24px,3vw,40px)] gap-y-8">
          <BasicsColumn eyebrow="Free pilot">
            <span className={BASICS_FIGURE}>14 days free</span>
            <p className={BASICS_TEXT}>Setup takes under an hour. Nothing is charged during the pilot.</p>
          </BasicsColumn>
          <BasicsColumn eyebrow="The app">
            <span className={BASICS_FIGURE}>iOS</span>
            <p className={BASICS_TEXT}>Progra is an iOS app, free for your members and clients.</p>
          </BasicsColumn>
          <BasicsColumn eyebrow="Pricing">
            <div className="flex flex-col gap-3">
              {[
                ["$2.99", "per active member / month · studios"],
                ["$8.99", "per active client / month · trainers"],
              ].map(([price, label]) => (
                <div key={price} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className={BASICS_FIGURE}>{price}</span>
                  <span className="text-[14px] text-muted">{label}</span>
                </div>
              ))}
            </div>
            <p className={BASICS_TEXT}>After the pilot.</p>
          </BasicsColumn>
        </div>
      </div>
    </section>
  );
}

function BasicsColumn({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-rule pt-[22px]">
      <span className={EYEBROW}>{eyebrow}</span>
      {children}
    </div>
  );
}
