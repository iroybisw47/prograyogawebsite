# Progra for Studios

Landing page that sells Progra to yoga studios. Built from `design_handoff_progra_studios_landing/` (Next.js + Tailwind v4).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Pilot request form

The form posts to `src/app/api/pilot-request/route.ts`, which validates the submission and forwards it as JSON to `PILOT_REQUEST_WEBHOOK_URL` (see `.env.example`). A [Formspree](https://formspree.io) form endpoint works as-is and emails the team inbox.

- In development with no URL set, submissions are logged to the server console and the form shows its success state.
- In production with no URL set, the endpoint returns 500 and the form shows an error, so leads aren't silently dropped.

## Videos

`public/videos/*.mp4` are the exported demos (1080×1920, remuxed with `+faststart`). Posters in `public/images/*-poster.webp` are their first frames. To replace a video, re-export from Claude Design and regenerate the poster, e.g.:

```bash
ffmpeg -i public/videos/member-demo.mp4 -c copy -movflags +faststart out.mp4
ffmpeg -i public/videos/member-demo.mp4 -frames:v 1 -vf scale=720:-2 public/images/member-demo-poster.webp
```

## Open items

- Privacy policy and Terms of service URLs (footer links are `#` placeholders).
- Footer contact email.
- Vector SVG wordmark to replace `public/images/progra-wordmark-purple.png`.
- Confirm pricing currency (USD).
