# Nicholas Cheok — Portfolio

A single-page, dependency-free portfolio site for Nicholas Cheok — Business &
Financial Technology student, robotics competitor and robotics coach.

Editorial-technical design: deep navy, electric blue and signal green. Built
with plain HTML, CSS and vanilla JavaScript — no framework, no build step.

## Structure

```
index.html        Markup for the whole page
style.css         Design system and responsive layout
script.js         Menu toggle, scroll reveals, scroll progress, active-nav
favicon.svg       "NC" monogram icon (also mirrored in public/)
og-image.svg      Social share preview (1200×630)
robots.txt        Crawler rules + sitemap reference
sitemap.xml       Single-page sitemap
public/           Mirror of favicon.svg / robots.txt for tooling that expects it
```

## Running locally

It's a static site — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Served by GitHub Pages directly from the `main` branch (no build step):
**Settings → Pages → Build and deployment → Source: Deploy from a branch →
Branch: `main` / `(root)`**. Any push to `main` republishes the site at
<https://nic816.github.io/NicPortfolioWebsite/>.

## Accessibility & progressive enhancement

- Skip-to-content link and visible focus outlines
- Respects `prefers-reduced-motion`
- All content stays visible if JavaScript fails to load
