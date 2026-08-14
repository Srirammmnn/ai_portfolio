# Sriram M — Portfolio

A single-page personal portfolio built with React 18, TypeScript, Vite, Tailwind CSS v4, and Framer Motion — content pulled entirely from a JSON data layer, populated from your resume.

## Install & run

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  data/portfolio.json     ← all content lives here (name, bio, experience, projects, skills, education)
  types/portfolio.ts      ← TypeScript types for the data shape
  hooks/usePortfolio.ts   ← typed hook components read from
  components/
    Navbar.tsx
    SocialLinks.tsx
    HeroSection.tsx
    AboutSection.tsx
    ExperienceSection.tsx
    ServicesSection.tsx   ← renders skills.categories
    ProjectsSection.tsx
    ProjectCard.tsx
    TestimonialsSection.tsx  ← auto-hides when testimonials[] is empty
    Footer.tsx
    AgentAvatar.tsx        ← the animated node-graph "avatar" in the hero
```

## Editing content

Everything you'd want to change — your bio, job history, project descriptions, skills, links, education — lives in **`src/data/portfolio.json`**. No component needs to be touched.

- **Projects**: set `"highlight": true` on the one project you want pinned first in the sticky stack.
- **Links**: leave `link` or any social field as `""` to hide that button/icon automatically.
- **Testimonials**: the section is hidden entirely while `testimonials` is an empty array — add real quotes here later, don't fill it with placeholders.
- **Avatar**: the hero avatar is a generated SVG node-graph (`AgentAvatar.tsx`), not an image file, so there's nothing to upload — tweak `nodes`/`edges` in that file if you want a different shape, or swap in a real photo by replacing `<AgentAvatar />` in `HeroSection.tsx` with an `<img>`.

## Deploying

`npm run build` outputs a static `dist/` folder — drag-and-drop it onto Netlify, or connect the repo for continuous deploys (your existing `portfolio93my.netlify.app` domain would work fine here too).

## Notes

- Dark theme, `Sora` display / `Inter` body / `JetBrains Mono` for labels & data.
- Fully responsive, keyboard-focus visible, `prefers-reduced-motion` respected (marquee + animations pause/disable).
- No hardcoded content in any component — only `portfolio.json`.
