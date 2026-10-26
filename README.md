# Progra

Marketing site for Progra (Next.js + Tailwind v4), built from `design_handoff_progra_studios_landing/` and `design_handoff_progra_site_v2/`.

| Route | Page |
|---|---|
| `/` | Home: shared promise, two paths, "The basics" (`/#pricing`) |
| `/studios` | Yoga studios landing page (was `/`; old `/#request`, `/#how`, `/#faq` links redirect here) |
| `/trainers` | Personal trainers landing page |

`/studios` and `/trainers` share one template (`src/components/audience-page.tsx`); their copy lives in `src/content/audiences.ts` and their colors come from the `.theme-studios` / `.theme-trainers` classes in `src/app/globals.css`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Pilot request forms

Both forms post to `src/app/api/pilot-request/route.ts`, which validates the submission and forwards it as JSON to `PILOT_REQUEST_WEBHOOK_URL` (see `.env.example`). A [Formspree](https://formspree.io) form endpoint works as-is and emails the team inbox. Each submission includes `audience` (`studios` or `trainers`), and the email subject reads "Studio pilot request: …" or "Trainer pilot request: …".

- In development with no URL set, submissions are logged to the server console and the form shows its success state.
- In production with no URL set, the endpoint returns 500 and the form shows an error, so leads aren't silently dropped.

## Videos

`public/videos/*.mp4` are the exported demos (member + studio on `/studios`, trainer + coach on `/trainers`) (1080×1920, remuxed with `+faststart`). Posters in `public/images/*-poster.webp` are their first frames. To replace a video, re-export from Claude Design and regenerate the poster, e.g.:

```bash
ffmpeg -i public/videos/member-demo.mp4 -c copy -movflags +faststart out.mp4
ffmpeg -i public/videos/member-demo.mp4 -frames:v 1 -vf scale=720:-2 public/images/member-demo-poster.webp
```

## Open items

- Privacy policy and Terms of service URLs (footer links are `#` placeholders).
- Footer contact email.
- Trainers FAQ links to the Privacy policy, which doesn't exist yet.
- Vector SVG wordmark to replace `public/images/progra-wordmark-purple.png`.
- Confirm pricing currency (USD).
