# FMCSA Explorer

A personal learning project — a carrier safety lookup tool built on FMCSA public data.

## Purpose

Two goals in one project:

1. **Explore FMCSA data firsthand.** The Federal Motor Carrier Safety Administration maintains a public API with safety records on every commercial trucking carrier in the US — inspection history, crash data, operating status, and BASIC safety categories. This app makes that data browsable without needing to understand the raw API.

2. **Learn how web apps are built.** This project is a hands-on introduction to the tools and patterns used in modern frontend development — what they are, why they exist, and how they fit together.

---

## What It Does

- Look up any carrier by USDOT number
- Browse the top 10 largest US carriers via a sidebar (click to auto-load)
- See carrier identity, operating status, fleet size, and safety rating
- View BASIC category data — violation counts and measure values by safety category
- Hover any field label for a plain-English definition (the app assumes no domain knowledge)

> **Note on BASIC percentiles:** The public FMCSA API returns violation counts and raw measure values, but redacts percentile rankings as "Not Public." Percentiles are only available via the [FMCSA SMS portal](https://ai.fmcsa.dot.gov/SMS/) with a login.

---

## The Stack

A plain-English guide to every tool used, what category it falls into, why it exists, and what the alternatives are.

---

### React — *UI Framework*

**What we use:** React
**Alternatives:** Vue, Angular, Svelte

React is how you describe what the interface looks like. Think of it as a set of LEGO instructions — you define reusable pieces (called components, like `CarrierCard` or `BasicScores`), and React assembles them into a page. The key feature is *reactivity*: when data changes (you click a new carrier in the sidebar), React figures out the minimum set of pieces to redraw automatically. Without it, you'd have to manually tell the browser what to update — tedious and error-prone at scale.

Vue and Svelte solve the same problem with slightly different syntax. Angular is older, more opinionated, and backed by Google. React has the largest ecosystem of the group, which is why it's the default choice for most teams.

---

### Vite — *Build Tool / Bundler*

**What we use:** Vite
**Alternatives:** Webpack, Parcel, esbuild, Rollup

Vite is the workshop. When you're building, it watches your files and instantly reflects changes in the browser the moment you save — no manual refresh needed. For production, it *bundles* your code: your dozens of source files get compiled, minified, and packed into a few small files a browser can efficiently download.

Think of it as the factory that turns your raw materials (source code) into a finished product (the `dist/` folder). Webpack is the old industry standard — incredibly powerful but notoriously slow and complex to configure. Vite is the modern replacement: much faster, almost no configuration needed. esbuild and Rollup are lower-level tools that Vite actually uses internally.

---

### Tailwind — *CSS Framework*

**What we use:** Tailwind CSS
**Alternatives:** plain CSS, Bootstrap, styled-components, Sass, CSS Modules

Tailwind is a pre-built vocabulary of visual styles. Instead of writing CSS like `color: #6b7280; font-size: 12px; margin-top: 4px`, you write `text-gray-500 text-xs mt-1` directly in your HTML. Think of it as clip-art for styling — every common visual decision already has a shorthand name you snap on.

Bootstrap is the classic alternative: pre-built full components (buttons, cards, navbars) rather than raw utility classes. Think of Bootstrap as buying pre-assembled IKEA furniture vs. Tailwind giving you a huge pile of standardized parts to combine yourself. Plain CSS is sewing your own clothes from scratch.

---

### Vercel — *Hosting Platform*

**What we use:** Vercel
**Alternatives:** Netlify, GitHub Pages, AWS, Render, Fly.io

Vercel is the landlord. Your finished app needs to live somewhere with a public address so anyone with a URL can reach it. Vercel hosts it, assigns it a URL, and every time you push new code to GitHub it automatically rebuilds and redeploys — like a landlord who replaces your furniture overnight without you having to move out.

Crucially, Vercel also runs *serverless functions* — small server-side scripts that handle things a static host can't. This app uses one to work around a CORS restriction (see below). Netlify is Vercel's closest rival with nearly identical features. GitHub Pages is free but static-only — no serverless functions. AWS is the industrial-grade option: infinitely powerful, but like renting a warehouse and building your own shelving vs. moving into a furnished apartment.

---

### Vercel Serverless Function — *API Proxy*

**What we use:** `api/fmcsa.js` (Vercel serverless function)
**Alternatives:** Netlify Functions, AWS Lambda, Cloudflare Workers

The FMCSA API has a CORS restriction — a browser security rule that blocks JavaScript from calling a different domain's API directly. The fix is a middleman: instead of the app calling FMCSA directly, it calls our own server (`/api/fmcsa`), which relays the request to FMCSA and passes the response back. The browser trusts your own server, so no security alarm trips.

"Serverless" is a slightly misleading term — there is a server, you just don't manage it. Think of it as hiring a courier on-demand rather than employing a full-time one: the function spins up, handles one request, and disappears. AWS Lambda is the original and most powerful version. Cloudflare Workers run at the network edge — physically closer to users worldwide.

---

### GitHub — *Version Control*

**What we use:** Git + GitHub
**Alternatives:** GitLab, Bitbucket (for hosting); Git itself has no real alternative

Git is a time machine for your code. Every commit is a snapshot you can rewind to. GitHub is just a website that hosts your Git repository and adds collaboration features. It also acts as the trigger for Vercel: push to GitHub → Vercel sees it → automatically redeploys the live site.

GitLab and Bitbucket offer similar hosting with different pricing and tooling. GitHub is the dominant platform for open source projects.

---

## How It All Fits Together

The full chain when the app loads:

1. Browser hits the Vercel URL
2. Vercel serves the React app (built by Vite, styled with Tailwind)
3. React renders the sidebar and auto-loads J.B. Hunt (USDOT 80806)
4. The app calls `/api/fmcsa` — our serverless proxy on Vercel
5. The proxy calls the FMCSA API with the API key
6. FMCSA returns carrier data
7. React updates the UI with the result

In engineer-speak: *"Vite + React SPA, Tailwind for styling, deployed to Vercel with a serverless proxy function, source on GitHub."*

---

## Local Development

```bash
# Install dependencies
npm install

# Add your FMCSA API key (get one free at ai.fmcsa.dot.gov)
echo "FMCSA_API_KEY=your_key_here" > .env.local

# Start the dev server
npm run dev
```

The Vite dev server proxies `/api/fmcsa` requests directly to FMCSA, so the serverless function is only needed in production.
