import type { FaqItem } from "@/components/faq";
import type { PilotRequestFormCopy } from "@/components/pilot-request-form";
import type { Audience } from "@/lib/pilot-request";

type Video = { src: string; poster: string; title: string };

export type AudienceContent = {
  audience: Audience;
  hero: {
    eyebrow: string;
    /** Three lines; the second is italic in the accent color. */
    headline: [string, string, string];
    body: string;
    ticks: string[];
    video: Video;
  };
  how: {
    heading: string;
    steps: { title: string; body: string }[];
    video: Video;
  };
  pricing: {
    heading: string;
    lede: string;
    pilotBody: string;
    price: string;
    priceUnit: string;
    priceBody?: string;
  };
  faq: { heading: string; items: FaqItem[] };
  request: {
    heading: string;
    body: string;
    ticks: string[];
    form: PilotRequestFormCopy;
  };
};

export const STUDIOS: AudienceContent = {
  audience: "studios",
  hero: {
    eyebrow: "Progra for Yoga",
    headline: ["Build accountability.", "Increase retention.", "Let your studio members see their progress."],
    body: "Progra is an iOS app designed for your Yoga studio to use to help your members track their progress inside and outside of class, and stay connected to people that they practice with.",
    ticks: ["14 days free", "Setup in under an hour", "Free for members"],
    video: {
      src: "/videos/member-demo.mp4",
      poster: "/images/member-demo-poster.webp",
      title: "Progra member demo: set a goal, clock in, share with your studio group, and see your monthly history",
    },
  },
  how: {
    heading: "How it works",
    steps: [
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
    ],
    video: {
      src: "/videos/studio-demo.mp4",
      poster: "/images/studio-demo-poster.webp",
      title: "Progra studio demo: create a group, invite members, view insights, and spot lapsing members",
    },
  },
  pricing: {
    heading: "Pilot & pricing",
    lede: "Try it with your members first. You won’t pay if it isn’t working.",
    pilotBody:
      "Onboarding takes under an hour. Over two weeks, you’ll see whether your members use Progra and whether it improves retention.",
    price: "$2.99",
    priceUnit: "per active member / month",
    priceBody: "You only pay for members who are actively using Progra.",
  },
  faq: {
    heading: "FAQ",
    items: [
      { q: "Who is Progra for?", a: "Recurring-class studios, including yoga, pilates, cycling, and HIIT." },
      { q: "Do members need to pay?", a: "No. Members use Progra for free. Your studio covers the cost." },
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
      { q: "How long does setup take?", a: "Most studios are set up in under an hour. We’ll walk you through it." },
      {
        q: "What if my members don’t use it?",
        a: "That’s exactly what the pilot is for. We’ll look at engagement with you at the end, and you won’t pay if it isn’t working.",
      },
      {
        q: "Who’s behind Progra?",
        a: "Progra was founded by a team that includes certified personal trainers and students of fitness, business, and philosophy.",
      },
    ],
  },
  request: {
    heading: "Ready to build your studio community?",
    body: "Tell us about your studio and we’ll reach out within 24 hours.",
    ticks: ["14 days free", "Setup takes under an hour", "$2.99 per active member / month after the pilot"],
    form: {
      studioLabel: "Studio name",
      studioPlaceholder: "Tidewater Yoga",
      membersLabel: "Approximate number of members",
      membersPlaceholder: "120",
      challengeLabel: "What’s your biggest retention challenge?",
    },
  },
};

export const TRAINERS: AudienceContent = {
  audience: "trainers",
  hero: {
    eyebrow: "Progra for Personal Trainers",
    headline: ["Build accountability.", "Keep clients longer.", "Let your clients see their progress."],
    body: "Progra turns every workout into visible progress, so your clients stay motivated and you can see who needs a check-in before they quit.",
    ticks: ["14 days free", "Setup in under an hour", "Free for clients"],
    video: {
      src: "/videos/trainer-demo.mp4",
      poster: "/images/trainer-demo-poster.webp",
      title: "Progra trainer demo: set a gym goal, check off the plan, share a PR, and see your monthly history",
    },
  },
  how: {
    heading: "How Progra works for your training business",
    steps: [
      {
        title: "Create your roster.",
        body: "Add your training group or your one-on-one clients in a few minutes.",
      },
      { title: "Invite your clients.", body: "They join from their phone with a single link." },
      {
        title: "Progress becomes visible.",
        body: "Sessions, streaks, and milestones show up for both you and your client.",
      },
      {
        title: "Spot who’s drifting.",
        body: "See who has missed sessions or gone quiet, and reach out before they cancel.",
      },
    ],
    video: {
      src: "/videos/coach-demo.mp4",
      poster: "/images/coach-demo-poster.webp",
      title: "Progra coach demo: client roster, send a plan, live check-offs, client feed, and weight and volume charts",
    },
  },
  pricing: {
    heading: "Try it with your clients first.",
    lede: "You won’t pay if it isn’t working.",
    pilotBody: "Setup takes under an hour.",
    price: "$8.99",
    priceUnit: "per active client / month",
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "What is Progra?",
        a: "Progra is an app that helps personal trainers track client progress and keep clients accountable between sessions.",
      },
      {
        q: "Do my clients need to pay?",
        a: "No. Progra is free for clients. You pay for your roster after the pilot.",
      },
      {
        q: "How long does setup take?",
        a: "Most trainers finish setup in under an hour, including inviting their first clients.",
      },
      {
        q: "What counts as an active client?",
        a: "An active client is someone who logged activity during the month. Clients who go inactive don’t count toward your bill.",
      },
      {
        q: "Can I use Progra with group training?",
        a: "Yes. You can run a group roster for a class or small-group program, and track each person’s progress within it.",
      },
      {
        q: "Is my clients’ data private?",
        a: "Yes. Client information is used only to run Progra for you. See our Privacy policy for details.",
      },
      {
        q: "Can I cancel during the pilot?",
        a: "Yes. Cancel any time during the 14 days and you won’t be charged.",
      },
      { q: "Is Progra available on Android?", a: "Progra is currently an iOS app." },
    ],
  },
  request: {
    heading: "Ready to build your training community?",
    body: "We reply within 24 hours.",
    ticks: ["14 days free", "Nothing charged during the pilot", "Setup in under an hour"],
    form: {
      studioLabel: "Gym or studio name",
      studioPlaceholder: "Northside Strength",
      membersLabel: "Approximate number of clients",
      membersPlaceholder: "40",
      challengeLabel: "Client retention challenge",
    },
  },
};
