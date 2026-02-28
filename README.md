# Premier Cuts Barbershop — Website

**Location:** 455 Chickamauga Dr, Dayton, TN 37321  
**Phone:** (423) 567-0424  
**Hours:** Tue–Fri 10am–6pm | Saturday 9am–4pm

---

## Project Structure

```
premier-cuts/
├── index.html          # Full multi-page site (SPA with hash routing)
├── css/
│   └── style.css       # Complete design system
├── js/
│   └── main.js         # Animations, routing, cursor, nav
├── images/             # Drop photos here (see instructions below)
└── README.md
```

---

## Deploy to Vercel (2 minutes)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import the repo → Deploy
4. Done. Custom domain: add in Vercel settings

## Deploy to GitHub Pages

1. Push to GitHub repo
2. Settings → Pages → Branch: main, Folder: / (root)
3. Site live at `https://yourusername.github.io/premier-cuts`

---

## Adding Real Photos

Replace gallery placeholder elements with `<img>` tags:

```html
<!-- Replace this: -->
<div class="gallery-placeholder"><span class="glyph">✦</span></div>

<!-- With this: -->
<img src="images/fade-1.jpg" alt="Skin fade by Kanaan" loading="lazy">
```

**Recommended image sizes:**
- Gallery square: 800×800px
- Gallery wide: 1600×900px  
- Team cards: 900×1200px
- Hero background: 1920×1080px

---

## Connect Booking Platforms

In `index.html`, find the Book page section and update these hrefs:

```html
<a href="https://booksy.com/YOUR_PROFILE_URL" ...>Book on Booksy</a>
<a href="https://styleseat.com/YOUR_PROFILE_URL" ...>Book on StyleSeat</a>
```

---

## Customization Notes

- All pricing is editable directly in `index.html` (search for `$25`, `$30`, etc.)
- Brand colors are CSS variables in `:root` — change `--gold` to adjust accent
- Google Maps embed: Update the `src` URL with your real Google Maps embed code
- Social links: Find `href="#"` on social icons and replace with real URLs

---

## SEO

Update these meta tags in `<head>` with your real domain once deployed:
- `<link rel="canonical">`
- `<meta property="og:url">`
- `<meta property="og:image">` — upload a 1200×630 preview image

---

Built with semantic HTML5, vanilla CSS, and minimal vanilla JS. No frameworks. No dependencies. Fast.
