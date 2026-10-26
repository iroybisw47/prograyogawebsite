# Handoff: Progra for Studios — landing page (v4)

## Overview
A one-page marketing site that sells Progra, an iOS app, to yoga studios. Studios get a free 14-day pilot, then pay $2.99 per active member per month. The main conversion is the "Request my pilot" form at the bottom of the page; every CTA scrolls to it. The page includes two looping product demo videos: one from the member's side and one from the studio owner's side.

## About the design files
The files in this bundle are **design references built in HTML**: prototypes that show the intended look and behavior. They are **not production code to copy directly**. Recreate the page in the target codebase's existing environment and patterns. If no website exists yet, a static site (for example Next.js or Astro with Tailwind) deployed to Vercel or Netlify is a sensible default.

To view the prototypes, serve this folder locally (for example `npx serve .`) and open `Progra for Studios v4.dc.html`. The `.dc.html` files load sibling files (`support.js`, `_ds/…`, `assets/…`), so opening them straight from the file system may not work.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy and interactions are final. Recreate them exactly.

## Global layout
- Content container: `max-width: 1200px`, centered, horizontal padding `clamp(20px, 5vw, 48px)`.
- Section vertical padding: `clamp(72px, 9vw, 128px)`, except the hero.
- White sections are separated by a 1px `#eceef1` rule. Pricing and the request form are full-bleed color bands.
- Two-column sections use `display: flex; flex-wrap: wrap; align-items: center; gap: 56px clamp(40px, 6vw, 96px)`. Text columns are `flex: 1 1 360px` and video columns are `flex: 1 1 320px; max-width: 400px`, centered. Columns stack below about 800px.
- Every anchored section has `scroll-margin-top: 68px` to clear the sticky header. Use `html { scroll-behavior: smooth }`.

## Sections (top to bottom)

### 1. Header (sticky)
- `position: sticky; top: 0; z-index: 50; height: 68px`
- Background `rgba(255,255,255,.92)` with `backdrop-filter: blur(14px)`; bottom border `1px solid #eceef1`.
- Left: the wordmark `assets/progra-wordmark-purple.png` at 28px tall, linking to `#top`.
- Right: navigation, hidden when the viewport is under 760px. Links are 14px, weight 500, color `#5d6672` (hover `#12171d`), 32px apart:
  - "How It Works" → `#how`
  - "Pricing" → `#pricing`
  - "FAQ" → `#faq`
- CTA "Request a free pilot" → `#request`: height 40px, padding `0 18px`, radius 12px, background `#2a1d47` (hover `#3b2a63`), white text 14px/600.

### 2. Hero (`#top`)
- Padding: top `clamp(48px,7vw,96px)`, bottom `clamp(72px,9vw,120px)`.
- Text column is on the left and the member demo video on the right.

Text column (flex column, items aligned to the start, 28px gap):
- **Eyebrow:** a 7px round dot in `#5b3d94`, then "Progra for Yoga". Text is 12px/600, uppercase, letter-spacing .14em, color `#5b3d94`, 10px gap after the dot.
- **H1:** Newsreader 500, `clamp(40px, 4.6vw, 64px)`, line-height 1.04, letter-spacing −0.03em, color `#12171d`. It has three lines, each `display: block`:
  1. "Build accountability."
  2. "Increase retention." in italic, color `#5b3d94`
  3. "Let your studio members see their progress."
- **Paragraph:** `clamp(17px,1.4vw,19px)`, line-height 1.55, color `#5d6672`, max-width 33em. Copy: "Progra is an iOS app designed for your Yoga studio to use to help your members track their progress inside and outside of class, and stay connected to people that they practice with."
- **CTA row** (gap `14px 26px`):
  - Primary button "Request a free pilot" with a right-arrow icon, linking to `#request`.
    - Size: height 54px, padding `0 24px`, radius 15px.
    - Color: background `#2a1d47` (hover `#3b2a63`), white text 16px/600.
    - Shadow `0 12px 26px -12px rgba(42,29,71,.6)`; scales to .98 on press.
  - Secondary link "See how it works", linking to `#how`.
    - 15px/600, color `#12171d`.
    - Underlined with a 1.5px `#e6e9ed` bottom border and 3px padding-bottom.
    - On hover, the text and border turn `#5b3d94`.
- **Proof row** (gap `8px 22px`; text 13.5px/500 `#5d6672`): each item has a 14px check icon in `#5b3d94`. Items: "14 days free", "Setup in under an hour", "Free for members".

Video column: the member demo inside a frame (see "Videos").

### 3. How it works (`#how`)
- The studio demo video is on the **left** and the steps are on the **right**. Use `flex-wrap: wrap-reverse` so that on narrow screens the text sits above the video.
- **H2 "How it works":** Newsreader 500, `clamp(32px,3.6vw,48px)`, line-height 1.05, letter-spacing −0.02em, `#12171d`. All H2s on the page use this style unless noted.
- **Ordered list** with no markers. Each item:
  - Grid `48px | 1fr`, 16px column gap, padding `24px 0`, top border 1px `#eceef1`. The list also has a bottom border.
  - Number: Newsreader 28px/500, `#5b3d94`.
  - Title: 19px/600, line-height 1.3, `#12171d`.
  - Description: 16px, line-height 1.55, `#5d6672`.
- Steps:
  1. **Create your group.** Set it up in a few minutes.
  2. **Invite your members.** Everyone in the group is connected, so new members see people they already know and practice with.
  3. **Practice becomes visible.** Members log their sessions in and outside class, see friends’ progress, and send encouragement with Cheer or Nudge.
  4. **Spot who’s drifting.** See when a member’s activity drops, so you can reach out personally before they cancel.

### 4. Pilot & pricing (`#pricing`)
- Full-bleed band with background `#F6F3FA`.
- **Left column** (`flex: 1 1 280px`): H2 "Pilot & pricing", then a lede in 17px `#5d6672`: "Try it with your members first. You won’t pay if it isn’t working."
- **Right column** (`flex: 2 1 560px`): two white panels in a grid (`repeat(auto-fit, minmax(min(100%,250px), 1fr))`, 16px gap).
  - Each panel: radius 20px, padding `clamp(24px,3vw,32px)`, flex column with a 14px gap.
  - Eyebrow style: 11px/600, uppercase, .14em letter-spacing, `#5b3d94`.
  - Large figure style: Newsreader 500, `clamp(40px,4.4vw,56px)`, line-height 1, `#12171d`.
  - Panel 1:
    - Eyebrow "Pilot"
    - Figure "14 days free"
    - Body (16px `#5d6672`): "Onboarding takes under an hour. Over two weeks, you’ll see whether your members use Progra and whether it improves retention."
  - Panel 2:
    - Eyebrow "After the pilot"
    - Figure "$2.99", followed on the same baseline by "per active member / month" in 15px `#5d6672`
    - Body: "You only pay for members who are actively using Progra."
- **Below the panels:**
  - Button "Start your free pilot" with an arrow, linking to `#request`: height 52px, padding `0 22px`, radius 15px, `#2a1d47`, white 15px/600.
  - Next to it, a note in 14px `#5d6672`: "Nothing is charged during the pilot."

### 5. FAQ (`#faq`)
- H2 "FAQ" on the left; accordion on the right.
- Accordion styling:
  - Items are separated by 1px `#eceef1` rules, with a closing rule at the bottom.
  - Each question is a full-width button: padding `22px 0`, question text 18px/600 `#12171d`.
  - A 16px chevron in `#8b929c` rotates 180° when the item is open, with a 0.25s transition.
  - Answers are 16px, line-height 1.6, `#5d6672`, padding `0 40px 24px 0`.
- The first item is open by default. Items open and close independently. Set `aria-expanded` on each button.
- Questions and answers, verbatim:
  1. **Who is Progra for?** Recurring-class studios, including yoga, pilates, cycling, and HIIT.
  2. **Do members need to pay?** No. Members use Progra for free. Your studio covers the cost.
  3. **Do members need an iPhone?** Progra is currently available on iOS. Tell us if most of your members use Android, and we’ll talk about what that means for your pilot.
  4. **Does this replace my booking software?** No. Progra adds a community and tracking layer. It doesn’t manage your schedule or payments.
  5. **Do I need to track check-ins manually?** Members log their own sessions. We’re exploring integrations with booking software, and we’ll tell you if that becomes available.
  6. **How long does setup take?** Most studios are set up in under an hour. We’ll walk you through it.
  7. **What if my members don’t use it?** That’s exactly what the pilot is for. We’ll look at engagement with you at the end, and you won’t pay if it isn’t working.
  8. **Who’s behind Progra?** Progra was founded by a team that includes certified personal trainers and students of fitness, business, and philosophy.

### 6. Request a pilot (`#request`)
- Full-bleed band with background `#2a1d47`, white text.

Left column (`flex: 1 1 360px`):
- H2 "Ready to build your studio community?": Newsreader 500, `clamp(34px,4vw,54px)`, white.
- Paragraph: 18px, `rgba(255,255,255,.8)`: "Tell us about your studio and we’ll reach out within 24 hours."
- Three rows, each with a check icon in `#c9b8ea` and text in 15px white:
  - "14 days free"
  - "Setup takes under an hour"
  - "$2.99 per active member / month after the pilot"

Right column (`flex: 1 1 440px`):
- White panel, radius 24px, padding `clamp(24px,3.2vw,40px)`.
- The form uses a grid of `repeat(auto-fit, minmax(min(100%,280px), 1fr))` with a `18px 16px` gap. That gives 2 columns on desktop and 1 on mobile.
- Fields, as label → placeholder:
  - "Studio name" → "Tidewater Yoga"
  - "Your name" → "Jane Smith"
  - "Email" → "you@yourstudio.com"
  - "Approximate number of members" → "120"
  - "What’s your biggest retention challenge? (optional)": a textarea with 3 rows, full width. "(optional)" is weight 500 in `#8b929c`.
- Field styling:
  - Labels: 13px/600, `#1b2129`, with 7px between the label and its input.
  - Inputs: height 48px, padding `0 14px`, border `1.5px solid #e6e9ed`, radius 12px, text 15px `#12171d`.
  - Focus border `#5b3d94`; placeholder `#b4b9c0`.
- Submit button "Request my pilot": full width, height 54px, radius 15px, `#2a1d47` (hover `#3b2a63`), white 16px/600, with the same shadow as the hero CTA.
- **Errors:** shown under the field in 12px `#9c5148`.
- **Success state** replaces the form with:
  - A 44px circle in `#266b4d` containing a white check.
  - Text in Newsreader 26px `#12171d`: "Thanks for reaching out. We’ll be in touch within 24 hours to set up a short call."

### 7. Footer
- White background, padding `36px` vertical. Items in a row with a `16px 32px` gap.
- Left: the wordmark at 22px tall, then "Progra is an iOS app." in 13px `#8b929c`.
- Right: links in 13px/500 `#5d6672` (hover `#5b3d94`):
  - "Instagram" → https://instagram.com/progra.world, opening in a new tab
  - "Privacy policy" → URL to be decided
  - "Terms of service" → URL to be decided

## Interactions & behavior
- All CTAs smooth-scroll to `#request`. Navigation links scroll to their sections.
- Form validation runs when the form is submitted:
  - Studio name is required. Error: "Add your studio’s name."
  - Your name is required. Error: "Add your name."
  - Email must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Error: "Add a valid email."
  - Approximate number of members is required. Error: "Add a rough number."
  - A field's error clears as soon as that field is edited.
- On a valid submit, show the success state. **No backend exists yet.** Post the form to a handler (for example Formspree, a serverless function or a CRM) that sends it to the team inbox. While submitting, show a disabled "Sending…" state on the button.
- Buttons scale to .98 when pressed. Hover transitions on colors take 0.15s.

## State
- `faqOpen`: a map from item index to boolean, defaulting to `{0: true}`.
- `form`: `{ studio, name, email, members, challenge }`.
- `errors`: a map from field to message.
- `submitted`: boolean.
- Viewport width, used only to hide the navigation under 760px. This can be done with CSS instead.

## Videos
Two looping product demos are built as HTML animations on a cream background, with captions above an iPhone frame:
- **Member demo** (`Progra Member Demo.dc.html`, about 29s): set a goal → clock in → photo → studio group feed → likes count up → comment → monthly History → end card.
- **Studio demo** (`Progra Studio Demo.dc.html`, about 21.5s): create the group → invite members → insights (active members per month, class attendance) → lapsing members → end card.

**For production, use exported MP4 files, not the HTML animations.**
1. Open each demo in Claude Design and export it with Share → Export → Video. The 9:16 output is 1080×1920.
2. Embed each video as `<video autoplay muted loop playsinline preload="metadata" poster="…">`.
3. Put it inside a frame with `aspect-ratio: 9/16`, `max-width: 360px`, `border-radius: 24px`, `overflow: hidden`, background `#F7F5F0`, and `object-fit: cover`.
4. Use the first frame as the poster image.

## Design tokens
Colors:
- Purple:
  - Deep (CTAs, request band): `#2a1d47`
  - Hover: `#3b2a63`
  - Accent (eyebrows, numbers, italic headline): `#5b3d94`
  - Light (checks on the dark band): `#c9b8ea`
  - Pricing band tint: `#F6F3FA`
- Ink:
  - Headings: `#12171d`
  - Body and labels: `#1b2129`
  - Secondary text: `#5d6672`
  - Captions: `#8b929c`
  - Placeholders: `#b4b9c0`
- Lines:
  - Rules: `#eceef1`
  - Input borders: `#e6e9ed`
- States:
  - Success: `#266b4d`
  - Error: `#9c5148`
- Video frame background: `#F7F5F0`

Typography:
- **Newsreader**, weight 500 with italic 500, for headings and big figures. Load it from Google Fonts.
- **Hanken Grotesk**, weights 400–700, for everything else. Load it from Google Fonts.
- Sizes are listed per section above. The scale runs 11, 12, 13, 13.5, 14, 15, 16, 17–19, 18, 19 and 26px, plus the clamp-based headline sizes.

Radii:
- Header button and inputs: 12px
- Large buttons: 15px
- Pricing panels: 20px
- Video frames and the form panel: 24px

Shadow: the primary CTA uses `0 12px 26px -12px rgba(42,29,71,.6)`. Nothing else on the page has a shadow.

## Assets
- `assets/progra-wordmark-*.png`: transparent 986×242 PNGs in purple (used), green, black and cream (cream is used on the video end cards). They were cut from the supplied wordmark JPG. **Replace them with the vector SVG wordmark from the brand files if one is available.**
- Icons are simple inline SVG strokes: an arrow-right, a check and a chevron-down. Lucide's `arrow-right`, `check` and `chevron-down` are equivalent.
- There are no photos.

## Files in this bundle
- `Progra for Studios v4.dc.html`: the landing page prototype.
- `Progra Member Demo.dc.html` and `progra-member-demo.jsx`: source for the member video.
- `Progra Studio Demo.dc.html` and `progra-studio-demo.jsx`: source for the studio video.
- `animations-v3.jsx`, `tweaks-panel.jsx` and `support.js`: the runtime that makes the prototypes run. Not needed in production.
- `_ds/progra-…/`: the Progra design-system stylesheet and tokens used by the prototypes.
- `assets/`: wordmark images.

## Open items before launch
- Contact email for the footer: not provided yet.
- Privacy policy and Terms of service pages or URLs.
- A backend or service for the form.
- Founder names, photos and a short bio for "Who’s behind Progra?", if wanted.
- Pricing is shown in USD. Confirm the currency.
