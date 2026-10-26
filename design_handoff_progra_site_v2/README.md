# Handoff: Progra site v2 — Home page, Personal Trainers page, shared header

## Assumptions about the existing codebase
- The **Progra for yoga studios** landing page from the previous handoff (`design_handoff_progra_studios_landing`, v4) is **already built**.
- Its request form is **already wired to Formspree**.
- This handoff only describes what to **add or change**. Reuse the existing studios-page components, tokens and form handling wherever possible.

## About the design files
The `.dc.html` files are **HTML design references**: prototypes that show the intended look and behavior. They are not production code. Recreate them in the existing codebase using its framework and patterns.

To view them, serve this folder locally (for example `npx serve .`) and open `Progra Home.dc.html`.

## Fidelity
**High-fidelity.** Colors, typography, spacing and copy are final.

## Site structure and routes
| Route | Page | Prototype |
|---|---|---|
| `/` | **Home (new)**: shared promise, then two paths | `Progra Home.dc.html` |
| `/studios` | Existing yoga studios page, **moved here** | `Progra for Studios v4.dc.html` |
| `/trainers` | **Personal trainers page (new)** | `Progra for Trainers.dc.html` |

- If the studios page currently lives at `/`, move it to `/studios`. Add a redirect from any old URL that has been shared.
- In-page targets used by links:
  - `/#pricing`: the Home "The basics" section
  - `/studios#request` and `/trainers#request`: the two request forms
- Every anchored section has `scroll-margin-top: 68px`, so it isn't hidden under the sticky header.

## 1. Shared header (all three pages)
Replace the studios page header with this header, and use the same header on all three pages.

**Container**
- `position: sticky; top: 0; z-index: 50; height: 68px`
- Background `rgba(255,255,255,.92)` with `backdrop-filter: blur(14px)`; bottom border `1px solid #eceef1`.
- Content max-width 1200px, padding `0 clamp(20px,5vw,48px)`, 32px gap.

**Wordmark** (left)
- `assets/progra-wordmark-blue.png` (navy `#1c3a5e`), 28px tall, linking to `/`.
- It is navy on every page, including the studios page.

**Navigation** (hidden under 760px viewport width)
- Links: **For Studios** → `/studios`, **For Trainers** → `/trainers`, **Pricing** → `/#pricing`.
- Style: 14px, weight 500, `#5d6672` (hover `#12171d`), 32px apart.
- The link for the current page is `#12171d`, weight 600, with `aria-current="page"`.

**"Request a free pilot" button and dropdown**
- Button:
  - Text plus a 12px chevron-down.
  - Height 40px, padding `0 16px 0 18px`, radius 12px.
  - Background `#142c49` (hover `#1c3a5e`), white text 14px/600.
  - It toggles a menu. Set `aria-expanded` and `aria-haspopup` on the button.
- Menu panel (`role="menu"`):
  - Absolutely positioned: right 0, top 48px, width 264px.
  - Padding 6px, white background, `1px solid #eceef1` border, radius 14px.
  - Shadow `0 16px 36px -18px rgba(18,23,29,.35)`.
- Menu items: padding `10px 12px`, radius 10px. Each has a title (14px/600 `#12171d`) and a subline (12px `#8b929c`).
  1. "For studios and instructors" / "Request a studio pilot" → `/studios#request` (hover background `#F6F3FA`)
  2. "For personal trainers" / "Request a trainer pilot" → `/trainers#request` (hover background `#F1F5FB`)
- The menu closes on a click outside it, on Escape, and on navigation.

**Remove from the studios page header:** the old in-page links (How it works / Pricing / FAQ). Those sections are still reached by scrolling.

## 2. Footer changes (all three pages)
Keep the existing footer (wordmark · "Progra is an iOS app." · links).

Add site links **before** Instagram, in the same 13px/500 `#5d6672` style:
- On the studios and trainers pages: **Home** · **For studios** · **For trainers**
- On Home: **For studios** · **For trainers**

The footer wordmark is purple on the studios page and navy everywhere else.

## 3. Home page (`/`)

### Hero (centered)
- Padding: top `clamp(72px,10vw,140px)`, bottom `clamp(56px,7vw,96px)`. Items are in a column with a 28px gap.
- **Eyebrow:** a 7px dot, then "For studios, instructors & personal trainers". 12px/600, uppercase, .14em letter-spacing, `#1c3a5e`.
- **H1:** Newsreader 500, `clamp(42px,6vw,84px)`, line-height 1.02, letter-spacing −0.03em, max-width 13em, `#12171d`. Two lines, each `display: block`:
  1. "Accountability between sessions."
  2. "Better retention." in italic, color `#1c3a5e`
- **Paragraph:** `clamp(17px,1.5vw,20px)`, line-height 1.55, `#5d6672`, max-width 36em. Copy: "Progra is an iOS app that helps the people you coach track their progress in and outside of sessions and stay connected to the people they train with. You see who’s showing up, and who needs a check-in before they quit."
- **Ticks:** 14px checks in `#1c3a5e`, text 13.5px/500 `#5d6672`, gap `12px 22px`. Items: "14-day free pilot", "Setup in under an hour", "Free for members and clients".

### Two paths (`#paths`)
- Grid `repeat(auto-fit, minmax(min(100%,340px), 1fr))` with a 20px gap. That gives two side-by-side panels down to about 780px.
- Each panel: padding `clamp(28px,4vw,48px)`, radius 24px, flex column with an 18px gap.
- Panel parts, top to bottom:
  - Eyebrow: 11px/600, uppercase, .14em letter-spacing.
  - Heading: Newsreader 500, `clamp(30px,3.2vw,42px)`, line-height 1.08, `#12171d`.
  - Body: 16px, line-height 1.55, `#5d6672`.
  - Actions row (gap `12px 22px`):
    - Primary button: 52px tall, radius 15px, white 15px/600 text, arrow-right icon.
    - Text link: 15px/600 `#12171d`, underlined with a 1.5px bottom border in the panel's accent at 35% alpha. On hover the text and border turn the accent color.

| | Studios panel | Trainers panel |
|---|---|---|
| Background | `#F6F3FA` | `#F1F5FB` |
| Accent (eyebrow, link) | `#5b3d94` | `#33518F` |
| Button | `#2a1d47`, hover `#3b2a63` | `#142c49`, hover `#1c3a5e` |
| Eyebrow | For studios and instructors | For personal trainers |
| Heading | Increase retention at your studio. | Keep clients longer. |
| Body | Members join your studio group, track their practice in and outside class, and cheer each other on. You see who’s showing up and who’s drifting. | Set a plan for each client, watch it get checked off, and track their weight and volume over time. Clients share sessions and PRs, and you cheer them on. |
| Button | Explore Progra for studios → `/studios` | Explore Progra for trainers → `/trainers` |
| Text link | Request a studio pilot → `/studios#request` | Request a trainer pilot → `/trainers#request` |

### The basics (`#pricing`)
- The section has a 1px `#eceef1` top rule.
- Left: H2 "The basics" (Newsreader 500, `clamp(32px,3.6vw,48px)`).
- Right: three columns in a grid of `repeat(auto-fit, minmax(min(100%,200px), 1fr))`.
  - Each column has a 1px top rule, 22px top padding and a 12px gap between items.
  - Eyebrow: 11px/600, uppercase, `#1c3a5e`.
  - Large figure: Newsreader 500, `clamp(30px,3vw,40px)`.
  - Text: 15px `#5d6672`.
- Columns:
  1. **Free pilot:** "14 days free". Text: "Setup takes under an hour. Nothing is charged during the pilot."
  2. **The app:** "iOS". Text: "Progra is an iOS app, free for your members and clients."
  3. **Pricing:** two rows, each a large figure followed by a 14px `#5d6672` label on the same baseline:
     - "$2.99" — "per active member / month · studios"
     - "$8.99" — "per active client / month · trainers"
     Then the text "After the pilot."

## 4. Personal trainers page (`/trainers`)
The **layout is identical to the studios page**. Reuse its section components and swap the theme and copy below. The form uses the same validation and Formspree handling as the studios form.

### Theme swap (studios → trainers)
| Use | Studios | Trainers |
|---|---|---|
| Buttons and request band | `#2a1d47` | `#142c49` |
| Hover | `#3b2a63` | `#1c3a5e` |
| Accent (eyebrows, numbers, headline italic) | `#5b3d94` | `#33518F` |
| Pricing band | `#F6F3FA` | `#F1F5FB` |
| Checks on the request band | `#c9b8ea` | `#A9C3E6` |
| CTA shadow | `rgba(42,29,71,.6)` | `rgba(20,44,73,.55)` |

Wordmarks are navy (`progra-wordmark-blue.png`).

### Copy (verbatim)
**Hero**
- Eyebrow: Progra for Personal Trainers
- H1, one line per item; the 2nd line is italic in the accent color:
  - Build accountability.
  - Keep clients longer.
  - Let your clients see their progress.
- Paragraph: Progra turns every workout into visible progress, so your clients stay motivated and you can see who needs a check-in before they quit.
- Buttons: Request a free pilot · See how it works. "Request a free pilot" → `#request`; "See how it works" → `#how`.
- Ticks: 14 days free · Setup in under an hour · Free for clients
- Video: **Trainer demo** (see Videos)

**How it works** (studio-side video on the left, steps on the right)
- H2: How Progra works for your training business
1. **Create your roster.** Add your training group or your one-on-one clients in a few minutes.
2. **Invite your clients.** They join from their phone with a single link.
3. **Progress becomes visible.** Sessions, streaks, and milestones show up for both you and your client.
4. **Spot who’s drifting.** See who has missed sessions or gone quiet, and reach out before they cancel.
- Video: **Coach demo** (see Videos)

**Pricing** (`#pricing`, pale blue band)
- H2: Try it with your clients first.
- Lede: You won’t pay if it isn’t working.
- Panel 1: Pilot 14 days free Setup takes under an hour.
- Panel 2: After the pilot $8.99 per active client / month — **$8.99 per active client / month**. This panel has no body paragraph.
- Button: Start your free pilot. Note: Nothing is charged during the pilot.

**FAQ** (`#faq`)
- H2: Frequently asked questions
- The first item is open by default.
1. **What is Progra?** Progra is an app that helps personal trainers track client progress and keep clients accountable between sessions.
2. **Do my clients need to pay?** No. Progra is free for clients. You pay for your roster after the pilot.
3. **How long does setup take?** Most trainers finish setup in under an hour, including inviting their first clients.
4. **What counts as an active client?** An active client is someone who logged activity during the month. Clients who go inactive don’t count toward your bill.
5. **Can I use Progra with group training?** Yes. You can run a group roster for a class or small-group program, and track each person’s progress within it.
6. **Is my clients’ data private?** Yes. Client information is used only to run Progra for you. See our Privacy policy for details.
7. **Can I cancel during the pilot?** Yes. Cancel any time during the 14 days and you won’t be charged.
8. **Is Progra available on Android?** Progra is currently an iOS app.

**Request a pilot** (`#request`, navy band `#142c49`)
- H2: Ready to build your training community?
- Paragraph: We reply within 24 hours.
- Ticks: 14 days free · Nothing charged during the pilot · Setup in under an hour
- Form fields:
- Gym or studio name — placeholder "Northside Strength"
- Your name — placeholder "Jane Smith"
- Email — placeholder "you@yourstudio.com"
- Approximate number of clients — placeholder "40"
- Client retention challenge (optional) — textarea, 3 rows, full width
- Submit button: Request my pilot
- Success message: Thanks for reaching out. We’ll be in touch within 24 hours to set up a short call.
- Validation is the same as on the studios form, except the name-field error reads "Add your gym or studio name."
- **Formspree:** use a separate form, or the existing one with a hidden field `audience=trainers` (and `audience=studios` on the studios form), so the team can tell the leads apart.

## 5. Videos (export to MP4, embed like the studios page videos)
Open each prototype in Claude Design and export it with Share → Export → Video (9:16, 1080×1920). Embed each as `<video autoplay muted loop playsinline preload="metadata">` in the same frame as the studios page: `aspect-ratio 9/16`, max-width 360px, radius 24px, `object-fit: cover`.

- **Trainer demo** (`Progra Trainer Demo.dc.html`, about 28.5s), for the **trainers hero**: set a gym goal (3× a week) → clock into leg day and check off the plan → photo and clock out → trainer and crew cheer, with a comment → PR post → monthly History → navy end card.
- **Coach demo** (`Progra Coach Demo.dc.html`, about 24.5s), for **trainers "How it works"**: client roster → build and send a plan → live check-offs → client feed with cheers → weight and volume charts → end card.
- These use a light `#F3F6FA` frame background, so use that as the video frame background color.
- The studios page keeps its existing videos (member demo and studio demo).

## Files in this bundle
- **Prototypes:**
  - `Progra Home.dc.html`
  - `Progra for Trainers.dc.html`
  - `Progra for Studios v4.dc.html`: the studios page with the new shared header and footer links; use it as a reference for the changes
- **Video sources:**
  - `Progra Trainer Demo.dc.html` + `progra-trainer-demo.jsx`
  - `Progra Coach Demo.dc.html` + `progra-coach-demo.jsx`
  - The studios videos (member and studio demos), included so the studios prototype runs
- **Prototype runtime only (not for production):** `animations-v3.jsx`, `tweaks-panel.jsx`, `support.js` and `_ds/`
- **Assets:** `assets/progra-wordmark-*.png`, transparent PNGs in blue (navy), purple, cream, green and black. Replace them with the SVG wordmark if you have one.

## Open items
- Privacy policy and Terms URLs, and a contact email.
- A Formspree form or field for trainer leads (see above).
- Pricing is shown in USD.
