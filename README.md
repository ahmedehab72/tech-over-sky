# Tech Over Sky

A seven-chapter studio portfolio built with React 18, TypeScript and Vite. Scroll through a six-stage store assembly, browse project case studies, and prepare a project enquiry.

## Run locally

Use Node 22.12+ and run `npm install` followed by `npm run dev`. Open the local URL printed by Vite. Run `npm run build` for a production bundle in `dist/` and `npm run preview` to serve it.

## Edit the site

- **Design** — The palette, page gutters, typography, mobile layout and reduced-motion styles are in `src/features/sky/sky.css`. Space Grotesk and Inter are served locally.
- **Content** — Edit the chapter components in `src/features/sky/sections/`. Project stories and their filters live in `Work.tsx`, build-stage captions in `Build.tsx`, statistics in `Studio.tsx` and testimonials in `Journey.tsx`. All clients, metrics and endorsements are sample content.
- **Motion** — `components/Intro.tsx` controls the opening sequence. Clear the session storage key `tos:intro` to replay it. `three/` holds the WebGL scene and its lightweight vector counterpart. Lenis and ScrollTrigger share a clock in `hooks/useFlightMotion.ts`. Stage buttons also work with reduced motion.
- **Contact** — Set `VITE_CONTACT_EMAIL` in a local `.env` or the host's build environment. The form validates inputs and opens an email draft. The visitor sends it in their mail client. The default address uses the reserved .example domain. For direct delivery, set `VITE_CONTACT_ENDPOINT` to a form service that accepts a multipart POST. The site shows success only after a successful response. Set `VITE_LINKEDIN_URL` and `VITE_INSTAGRAM_URL` to display company social links.
- **Metadata** — Edit `index.html` and replace the social preview in `public/assets/images/` when the brand or domain changes. Use the final absolute production URL for og:image on deployment.

## Deploy

Import the repository into Vercel or Netlify, choose Vite, set the build command to `npm run build` and the output directory to `dist`. Configure contact variables before building. SPA fallbacks for both hosts are included so direct links to the template's locale routes resolve correctly.


