import type { ReactNode } from "react";
import type { AudienceContent } from "@/content/audiences";
import { DemoVideo } from "./demo-video";
import { Faq } from "./faq";
import { ArrowRightIcon, CheckIcon } from "./icons";
import { PilotRequestForm } from "./pilot-request-form";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { EYEBROW, PRIMARY_BUTTON, Ticks } from "./ui";

/**
 * The studios and trainers landing pages: identical layout, with copy from
 * `content` and colors from the `.theme-{audience}` class.
 */
export function AudiencePage({ content }: { content: AudienceContent }) {
  return (
    <div className={`theme-${content.audience}`}>
      <SiteHeader wordmark={content.audience === "studios" ? "purple" : "navy"} />
      <main>
        <Hero hero={content.hero} />
        <HowItWorks how={content.how} />
        <Pricing pricing={content.pricing} />
        <section id="faq" className="scroll-mt-[68px]">
          <div className="page-container section-y flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-6">
            <h2 className="heading-2 flex-[1_1_280px]">{content.faq.heading}</h2>
            <Faq items={content.faq.items} />
          </div>
        </section>
        <RequestPilot audience={content.audience} request={content.request} />
      </main>
      <SiteFooter page={content.audience} />
    </div>
  );
}

function Hero({ hero }: { hero: AudienceContent["hero"] }) {
  const [line1, line2, line3] = hero.headline;
  return (
    <section id="top" className="scroll-mt-[68px] pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
      <div className="page-container split flex-wrap">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold tracking-[.14em] text-brand uppercase">
            <span className="size-[7px] rounded-full bg-brand" />
            {hero.eyebrow}
          </span>
          <h1 className="m-0 font-serif text-[clamp(40px,4.6vw,64px)]/[1.04] font-medium tracking-[-0.03em] text-balance text-ink">
            <span className="block">{line1}</span>
            <em className="block text-brand italic">{line2}</em>
            <span className="block">{line3}</span>
          </h1>
          <p className="m-0 max-w-[33em] text-[clamp(17px,1.4vw,19px)]/[1.55] text-pretty text-muted">{hero.body}</p>
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
          <Ticks items={hero.ticks} className="gap-y-2" />
        </div>
        <DemoVideo {...hero.video} />
      </div>
    </section>
  );
}

function HowItWorks({ how }: { how: AudienceContent["how"] }) {
  return (
    <section id="how" className="scroll-mt-[68px] border-t border-rule">
      <div className="page-container section-y split flex-wrap-reverse">
        <DemoVideo {...how.video} />
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-7">
          <h2 className="heading-2">{how.heading}</h2>
          <ol className="m-0 min-w-0 list-none border-b border-rule p-0">
            {how.steps.map((step, i) => (
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

function PricePanel({ eyebrow, figure, body }: { eyebrow: string; figure: ReactNode; body?: string }) {
  return (
    <div className="flex flex-col gap-[14px] rounded-[20px] bg-white p-[clamp(24px,3vw,32px)]">
      <span className={EYEBROW}>{eyebrow}</span>
      {figure}
      {body && <p className="m-0 text-[16px]/[1.55] text-pretty text-muted">{body}</p>}
    </div>
  );
}

const FIGURE = "font-serif text-[clamp(40px,4.4vw,56px)]/none font-medium tracking-[-0.02em] text-ink";

function Pricing({ pricing }: { pricing: AudienceContent["pricing"] }) {
  return (
    <section id="pricing" className="scroll-mt-[68px] bg-brand-tint">
      <div className="page-container section-y flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-8">
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-4">
          <h2 className="heading-2">{pricing.heading}</h2>
          <p className="m-0 max-w-[22em] text-[17px]/[1.55] text-pretty text-muted">{pricing.lede}</p>
        </div>
        <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-7">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
            <PricePanel
              eyebrow="Pilot"
              figure={<span className={FIGURE}>14 days free</span>}
              body={pricing.pilotBody}
            />
            <PricePanel
              eyebrow="After the pilot"
              figure={
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className={FIGURE}>{pricing.price}</span>
                  <span className="text-[15px] text-muted">{pricing.priceUnit}</span>
                </div>
              }
              body={pricing.priceBody}
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

function RequestPilot({
  audience,
  request,
}: {
  audience: AudienceContent["audience"];
  request: AudienceContent["request"];
}) {
  return (
    <section id="request" className="scroll-mt-[68px] bg-brand-deep text-white">
      <div className="page-container section-y flex flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-12">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
          <h2 className="m-0 font-serif text-[clamp(34px,4vw,54px)]/[1.04] font-medium tracking-[-0.025em] text-balance text-white">
            {request.heading}
          </h2>
          <p className="m-0 max-w-[26em] text-[18px]/[1.55] text-pretty text-white/80">{request.body}</p>
          <div className="mt-3 flex flex-col gap-3 text-[15px] text-white">
            {request.ticks.map((item) => (
              <span key={item} className="inline-flex items-center gap-2.5">
                <CheckIcon className="flex-none text-brand-light" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_440px] rounded-[24px] bg-white p-[clamp(24px,3.2vw,40px)] text-body">
          <PilotRequestForm audience={audience} copy={request.form} />
        </div>
      </div>
    </section>
  );
}
