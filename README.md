# HMZ Marketing Site

A React 18 + Vite marketing site for HMZ. Two pages (Home and About),
built as a single-page app with smooth-scroll anchor navigation.

## Run it locally

You need Node.js installed (https://nodejs.org, the LTS version).
Then, in a terminal, from this folder:

    npm install
    npm run dev

Open the address it prints (usually http://localhost:5173).

## Put it online with Vercel (free preview link)

You do NOT need a terminal for this.

1. Go to https://github.com and create a new empty repository
   (call it something like "hmz-site"). Do not add a README when prompted.
2. On the new repo page, click "uploading an existing file".
3. Drag in EVERYTHING from this folder EXCEPT the "node_modules" and
   "dist" folders (if they exist). Vercel rebuilds those itself.
4. Click "Commit changes".
5. Go to https://vercel.com and sign in with your GitHub account.
6. Click "Add New Project", pick your "hmz-site" repo, click "Import".
7. Vercel auto-detects Vite. Leave everything as-is. Click "Deploy".
8. After a minute you get a live link like hmz-site.vercel.app.
   It updates automatically every time you change the repo.

## Where to swap in real images

Two images are generic Unsplash stand-ins, not HMZ brand assets:

- Hero team lineup: in src/App.jsx, find the Hero component,
  replace the src on the first <img> in that section.
- Founder photo (Kym O'Leary): in src/App.jsx, find the About
  component, replace the src on the founder <img>.

Product cards and Instagram tiles are also stand-in photos and can
be swapped the same way.

## Notes for handover

- "Ask Hemmy" buttons are disabled placeholders by design.
- Testimonials are honest placeholders ("Insert Doug / Leigh quote",
  "To be confirmed") pending real quotes.
- Instagram section is a placeholder grid. The Elfsight app id is
  noted in a comment in the InstagramFeed component.
- Copy uses Australian English and always says "patented and
  patent-pending". No em dashes anywhere.
