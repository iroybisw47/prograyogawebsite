import Image from "next/image";
import type { ReactNode } from "react";
import { DemoVideo } from "@/components/demo-video";
import { Faq } from "@/components/faq";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { PilotRequestForm } from "@/components/pilot-request-form";

const PRIMARY_BUTTON =
  "inline-flex items-center gap-2.5 whitespace-nowrap bg-brand-deep font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-brand-hover active:scale-[.98]";

const STEPS = [
  { title: "Create your group.", body: "Set it up in a few minutes." },
  {
    title: "Invite your members.",
    body: "Everyone in the group is connected, so new members see people they already know and practice with.",
  },
  {
    title: "Practice becomes visible.",
    body: "Members log their sessions in and outside class, see friends’ progress, and send encouragement with Cheer or Nudge.",
  },
  {
    title: "Spot who’s drifting.",
    body: "See when a member’s activity drops, so you can reach out personally before they cancel.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Pricing />
        <section id="faq" className="scroll-mt-[68px]">
          <div className="page-container section-y flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-6">
            <h2 className="heading-2 flex-[1_1_280px]">FAQ</h2>
            <Faq />
          </div>
        </section>
        <RequestPilot />
      </main>
      <Footer />
    </>
  );
}

function Wordmark({ height, eager }: { height: number; eager?: boolean }) {
  return (
    <a href="#top" aria-label="Progra home" className="flex items-center">
      <Image
        src="/images/progra-wordmark-purple.png"
        alt="Progra"
        width={986}
        height={242}
        loading={eager ? "eager" : undefined}
        style={{ height, width: "auto" }}
        className="block"
      />
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white/92 backdrop-blur-[14px]">
      <div className="page-container flex h-[68px] items-center gap-8">
        <Wordmark height={28} eager />
        <span className="flex-1" />
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-[14px] font-medium whitespace-nowrap min-[760px]:flex"
        >
          {[
            ["How It Works", "#how"],
            ["Pricing", "#pricing"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="text-muted transition-colors duration-150 hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#request"
          className="inline-flex h-10 items-center rounded-[12px] bg-brand-deep px-[18px] text-[14px] font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-brand-hover"
        >
          Request a free pilot
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="scroll-mt-[68px] pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
      <div className="page-container split flex-wrap">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold tracking-[.14em] text-brand uppercase">
            <span className="size-[7px] rounded-full bg-brand" />
            Progra for Yoga
          </span>
          <h1 className="m-0 font-serif text-[clamp(40px,4.6vw,64px)]/[1.04] font-medium tracking-[-0.03em] text-balance text-ink">
            <span className="block">Build accountability.</span>
            <em className="block text-brand italic">Increase retention.</em>
            <span className="block">Let your studio members see their progress.</span>
          </h1>
          <p className="m-0 max-w-[33em] text-[clamp(17px,1.4vw,19px)]/[1.55] text-pretty text-muted">
            Progra is an iOS app designed for your Yoga studio to use to help your members track
            their progress inside and outside of class, and stay connected to people that they
            practice with.
          </p>
          <div className="flex flex-wrap items-center gap-x-[26px] gap-y-[14px]">
            <a href="#request" className={`${PRIMARY_BUTTON} h-[54px] rounded-[15px] px-6 text-[16px] shadow-cta`}>
              Request a free pilot
              <ArrowRightIcon />
            </a>
            <a
              href="#how"
              className="border-b-[1.5px] border-control pb-[3px] text-[15px] font-semibold text-ink transition-colors duration-150 hover:border-brand hover:text-brand"
            >
              See how it works
            </a>
          </div>
          <div className="flex flex-wrap gap-x-[22px] gap-y-2 text-[13.5px] font-medium text-muted">
            {["14 days free", "Setup in under an hour", "Free for members"].map((item) => (
              <span key={item} className="inline-flex items-center gap-[7px]">
                <CheckIcon size={14} className="text-brand" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <DemoVideo
          src="/videos/member-demo.mp4"
          poster="/images/member-demo-poster.webp"
          title="Progra member demo: set a goal, clock in, share with your studio group, and see your monthly history"
        />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-[68px] border-t border-rule">
      <div className="page-container section-y split flex-wrap-reverse">
        <DemoVideo
          src="/videos/studio-demo.mp4"
          poster="/images/studio-demo-poster.webp"
          title="Progra studio demo: create a group, invite members, view insights, and spot lapsing members"
        />
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-7">
          <h2 className="heading-2">How it works</h2>
          <ol className="m-0 min-w-0 list-none border-b border-rule p-0">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 border-t border-rule py-6"
              >
                <span className="font-serif text-[28px]/none font-medium text-brand">{i + 1}</span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[19px]/[1.3] font-semibold text-ink">{step.title}</span>
                  <span className="text-[16px]/[1.55] text-pretty text-muted">{step.body}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PricePanel({ eyebrow, figure, body }: { eyebrow: string; figure: ReactNode; body: string }) {
  return (
    <div className="flex flex-col gap-[14px] rounded-[20px] bg-white p-[clamp(24px,3vw,32px)]">
      <span className="text-[11px] font-semibold tracking-[.14em] text-brand uppercase">{eyebrow}</span>
      {figure}
      <p className="m-0 text-[16px]/[1.55] text-pretty text-muted">{body}</p>
    </div>
  );
}

const FIGURE = "font-serif text-[clamp(40px,4.4vw,56px)]/none font-medium tracking-[-0.02em] text-ink";

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-[68px] bg-brand-tint">
      <div className="page-container section-y flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-8">
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-4">
          <h2 className="heading-2">Pilot &amp; pricing</h2>
          <p className="m-0 max-w-[22em] text-[17px]/[1.55] text-pretty text-muted">
            Try it with your members first. You won’t pay if it isn’t working.
          </p>
        </div>
        <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-7">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
            <PricePanel
              eyebrow="Pilot"
              figure={<span className={FIGURE}>14 days free</span>}
              body="Onboarding takes under an hour. Over two weeks, you’ll see whether your members use Progra and whether it improves retention."
            />
            <PricePanel
              eyebrow="After the pilot"
              figure={
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className={FIGURE}>$2.99</span>
                  <span className="text-[15px] text-muted">per active member / month</span>
                </div>
              }
              body="You only pay for members who are actively using Progra."
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href="#request" className={`${PRIMARY_BUTTON} h-[52px] rounded-[15px] px-[22px] text-[15px]`}>
              Start your free pilot
              <ArrowRightIcon />
            </a>
            <span className="text-[14px] text-muted">Nothing is charged during the pilot.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestPilot() {
  return (
    <section id="request" className="scroll-mt-[68px] bg-brand-deep text-white">
      <div className="page-container section-y flex flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-12">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
          <h2 className="m-0 font-serif text-[clamp(34px,4vw,54px)]/[1.04] font-medium tracking-[-0.025em] text-balance text-white">
            Ready to build your studio community?
          </h2>
          <p className="m-0 max-w-[26em] text-[18px]/[1.55] text-pretty text-white/80">
            Tell us about your studio and we’ll reach out within 24 hours.
          </p>
          <div className="mt-3 flex flex-col gap-3 text-[15px] text-white">
            {[
              "14 days free",
              "Setup takes under an hour",
              "$2.99 per active member / month after the pilot",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2.5">
                <CheckIcon className="flex-none text-brand-light" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_440px] rounded-[24px] bg-white p-[clamp(24px,3.2vw,40px)] text-body">
          <PilotRequestForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white">
      <div className="page-container flex flex-wrap items-center gap-x-8 gap-y-4 py-9">
        <Wordmark height={22} />
        <span className="text-[13px] text-caption">Progra is an iOS app.</span>
        <span className="flex-1" />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium">
          <a
            href="https://instagram.com/progra.world"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors duration-150 hover:text-brand"
          >
            Instagram
          </a>
          {/* TODO: point these at the real pages once they exist. */}
          <a href="#" className="text-muted transition-colors duration-150 hover:text-brand">
            Privacy policy
          </a>
          <a href="#" className="text-muted transition-colors duration-150 hover:text-brand">
            Terms of service
          </a>
        </nav>
      </div>
    </footer>
  );
}
