import React, { useState, useEffect, useRef } from "react";
import {
  Instagram, Linkedin, Menu, X, Sun, Moon, ArrowRight, Scissors,
  MapPin, Phone, Clock, Quote, Leaf, Users, Check,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * HMZ  |  Tear-able Garments
 * Single-file preview. Follows the Replit content, with a cleaner,
 * friendlier UX. Design tokens inlined so it renders standalone.
 * No em dashes anywhere in copy.
 * ------------------------------------------------------------------ */

const TOKENS = `
:root{
  --background:40 15% 98%; --foreground:202 9% 31%; --border:202 5% 82%;
  --card:0 0% 100%; --card-foreground:202 9% 31%; --muted:40 6% 94%;
  --muted-foreground:202 5% 50%; --accent:17 90% 41%; --accent-foreground:0 0% 100%;
  --primary:202 9% 31%; --primary-foreground:0 0% 100%; --secondary:40 8% 92%;
  --secondary-foreground:202 9% 31%; --ring:17 90% 41%;
  --stone:202 9% 31%; --stone-deep:202 12% 22%;
  --radius:0.9rem;
}
.dark{
  --background:202 13% 8%; --foreground:40 8% 92%; --border:202 6% 22%;
  --card:202 9% 12%; --card-foreground:40 8% 92%; --muted:202 7% 14%;
  --muted-foreground:202 5% 62%; --accent:17 88% 53%; --accent-foreground:202 13% 8%;
  --primary:40 8% 85%; --primary-foreground:202 13% 8%;
  --stone:202 10% 16%; --stone-deep:202 14% 11%;
}
.hmz{
  --oswald:'Oswald',system-ui,sans-serif;
  --roboto:'Roboto',system-ui,sans-serif;
  --slab:'Roboto Slab',Georgia,serif;
  background:hsl(var(--background)); color:hsl(var(--foreground));
  font-family:var(--roboto); min-height:100vh; line-height:1.6;
  transition:background .4s ease,color .4s ease;
}
.hmz *{box-sizing:border-box;}
.hmz ::selection{background:hsl(var(--accent));color:hsl(var(--accent-foreground));}
.hmz .display{font-family:var(--oswald);text-transform:uppercase;font-weight:700;line-height:.94;letter-spacing:-.005em;}
.hmz .slab{font-family:var(--slab);}
.hmz .eyebrow{font-size:.72rem;text-transform:uppercase;letter-spacing:.26em;color:hsl(var(--muted-foreground));font-weight:600;}
.hmz .wrap{max-width:1200px;margin:0 auto;padding-left:1.25rem;padding-right:1.25rem;}
@media(min-width:640px){.hmz .wrap{padding-left:2rem;padding-right:2rem;}}
.hmz a{color:inherit;text-decoration:none;}
.hmz .accent{color:hsl(var(--accent));}

.hmz .btn{position:relative;display:inline-flex;align-items:center;gap:.5rem;font-family:var(--oswald);
  text-transform:uppercase;letter-spacing:.05em;font-weight:600;font-size:.82rem;padding:.8rem 1.5rem;
  border-radius:999px;cursor:pointer;border:1.5px solid transparent;
  transition:transform .2s ease,filter .2s ease,background .2s ease,color .2s ease,border-color .2s ease,box-shadow .2s ease;}
.hmz .btn:hover{transform:translateY(-2px);}
.hmz .btn:active{transform:translateY(0);}
.hmz .btn .arw{transition:transform .2s ease;}
.hmz .btn:hover .arw{transform:translateX(3px);}
.hmz .btn-rust{background:hsl(var(--accent));color:hsl(var(--accent-foreground));box-shadow:0 8px 20px -10px hsl(var(--accent)/.7);}
.hmz .btn-rust:hover{filter:brightness(1.07);box-shadow:0 12px 26px -10px hsl(var(--accent)/.8);}
.hmz .btn-outline{background:transparent;border-color:hsl(var(--border));color:hsl(var(--foreground));}
.hmz .btn-outline:hover{border-color:hsl(var(--accent));color:hsl(var(--accent));}
.hmz .btn[disabled]{opacity:.4;cursor:not-allowed;}
.hmz .btn[disabled]:hover{transform:none;box-shadow:none;}
.hmz .btn-sm{padding:.55rem 1.1rem;font-size:.74rem;}
.hmz :focus-visible{outline:2px solid hsl(var(--ring));outline-offset:3px;border-radius:4px;}

.hmz .card{background:hsl(var(--card));color:hsl(var(--card-foreground));border:1px solid hsl(var(--border));
  border-radius:var(--radius);transition:transform .24s ease,border-color .24s ease,box-shadow .24s ease;}
.hmz .card-hover:hover{transform:translateY(-5px);border-color:hsl(var(--accent)/.5);
  box-shadow:0 18px 40px -24px hsl(var(--stone)/.55);}
.hmz .section{padding-top:5.5rem;padding-bottom:5.5rem;}
.hmz .soft-bg{background:hsl(var(--muted)/.5);}
.hmz .pill{display:inline-flex;align-items:center;gap:.45rem;background:hsl(var(--card));
  border:1px solid hsl(var(--border));border-radius:999px;padding:.35rem .85rem;font-size:.72rem;
  text-transform:uppercase;letter-spacing:.16em;font-weight:600;color:hsl(var(--muted-foreground));}

/* tactile tear seam */
.hmz .seam{display:block;height:14px;background-image:radial-gradient(circle at center,hsl(var(--accent)) 0 2px,transparent 2.5px);
  background-size:11px 14px;background-repeat:repeat-x;background-position:left center;}
.hmz .tearwrap{position:relative;display:flex;align-items:center;gap:.6rem;}
.hmz .tearwrap .scis{opacity:0;transform:translateX(-6px);transition:opacity .35s ease,transform .35s ease;color:hsl(var(--accent));}
.hmz .tearwrap:hover .scis{opacity:1;transform:translateX(0);}

/* scroll reveal */
.hmz .reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);}
.hmz .reveal.in{opacity:1;transform:none;}
@keyframes riseIn{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.hmz .h-a{animation:riseIn .8s cubic-bezier(.2,.7,.2,1) both;}
.hmz .h-b{animation:riseIn .8s cubic-bezier(.2,.7,.2,1) .1s both;}
.hmz .h-c{animation:riseIn .8s cubic-bezier(.2,.7,.2,1) .2s both;}
.hmz .h-d{animation:riseIn .8s cubic-bezier(.2,.7,.2,1) .3s both;}

@media(prefers-reduced-motion:reduce){
  .hmz *{animation:none!important;}
  .hmz .reveal{opacity:1!important;transform:none!important;transition:none!important;}
  .hmz .btn:hover,.hmz .card-hover:hover{transform:none;}
}
`;

/* ------------------------------ data ------------------------------ */

const PRODUCTS = [
  { t: "Industrial Work Pants", img: "https://images.unsplash.com/photo-1621570360371-fb2c78b4b3f9?auto=format&fit=crop&w=700&q=80",
    d: "Reinforced construction for demanding work. Built-in length options, designed for resources, mining, and construction." },
  { t: "Cargo Work Pants", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80",
    d: "Multi-pocket design with HMZ tear-away technology. The right length without alterations, with room for everything you carry." },
  { t: "Hi-Vis Safety Pants", img: "https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&w=700&q=80",
    d: "High-visibility workwear with built-in length options. Correct hem length from day one means better compliance and safer movement." },
];

const USUALLY = ["Too long, send it away", "Wrong fit, make do", "Weeks waiting, hope it comes back right"];
const HMZWAY = ["Tear. Adjust. Done.", "On site. On the day.", "No scissors. No tailor. No waiting."];

const INDIVIDUAL = ["5'1 or 6'2, it works", "First day, it fits", "On swing, sorted in minutes", "Tear it. Wear it."];

const WHY_BRANDS = ["Fewer SKUs", "Fewer returns", "No more alterations", "Better fit from day one", "Built for compliance", "Easy to scale"];

const BRAND_REQUESTS = ["Wrangler", "Levi's", "Gorman", "Lee", "H&M", "Uniqlo", "Helly Hansen", "Citeco", "Carhartt", "Bisley", "Dickies", "Hard Yakka"];

const SUSTAIN = ["Less alterations", "Less inventory", "Less landfill"];

const FIELD_STATS = ["Returns are dropping.", "Teams are simplifying.", "People are adjusting on day one."];

function useTheme() {
  const [dark, setDark] = useState(false);
  return [dark, () => setDark((d) => !d)];
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.14 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: 999, background: "hsl(var(--accent))", flexShrink: 0, display: "inline-block" }} />;
}

/* ----------------------------- header ----------------------------- */

function Header({ dark, toggle, page, setPage }) {
  const [open, setOpen] = useState(false);
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  const go = (anchor) => {
    if (page !== "home") { setPage("home"); setTimeout(() => scrollTo(anchor), 90); }
    else scrollTo(anchor);
    setOpen(false);
  };
  const links = [["Solutions", "solutions"], ["Products", "products"], ["Brand Partners", "partners"]];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "hsl(var(--background)/.85)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid hsl(var(--border)/.7)",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4.5rem" }}>
        <button onClick={() => setPage("home")} className="display" style={{ fontSize: "1.7rem", letterSpacing: ".02em", background: "none", border: 0, cursor: "pointer", color: "hsl(var(--foreground))" }}>
          HMZ
        </button>
        <nav className="desktop-nav" style={{ display: "none", gap: "2.25rem", alignItems: "center" }}>
          {links.map(([l, a]) => (
            <button key={a} onClick={() => go(a)} className="eyebrow navlink" style={{ background: "none", border: 0, cursor: "pointer", letterSpacing: ".12em", fontSize: ".78rem", fontWeight: 500 }}>{l}</button>
          ))}
          <button onClick={() => setPage("about")} className="eyebrow navlink" style={{ background: "none", border: 0, cursor: "pointer", letterSpacing: ".12em", fontSize: ".78rem", fontWeight: 500, color: page === "about" ? "hsl(var(--accent))" : undefined }}>About</button>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="https://www.instagram.com/hmz.hemming/" target="_blank" rel="noreferrer" aria-label="HMZ on Instagram" className="soc"><Instagram size={18} /></a>
          <a href="#" aria-label="HMZ on LinkedIn" className="soc"><Linkedin size={18} /></a>
          <button onClick={toggle} aria-label="Toggle dark mode" className="soc" style={{ background: "none", border: 0, cursor: "pointer", color: "inherit", display: "flex" }}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn btn-rust btn-sm hemmy" disabled title="Coming soon">
            <span className="hbadge">H</span> Ask Hemmy
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="mobile-toggle" style={{ background: "none", border: 0, cursor: "pointer", color: "inherit", display: "flex" }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ padding: "1rem 0", borderTop: "1px solid hsl(var(--border))" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {links.map(([l, a]) => (
              <button key={a} onClick={() => go(a)} className="eyebrow" style={{ background: "none", border: 0, textAlign: "left", cursor: "pointer", fontWeight: 500 }}>{l}</button>
            ))}
            <button onClick={() => { setPage("about"); setOpen(false); }} className="eyebrow" style={{ background: "none", border: 0, textAlign: "left", cursor: "pointer", fontWeight: 500 }}>About</button>
          </div>
        </div>
      )}
      <style>{`
        @media(min-width:920px){ .hmz .desktop-nav{display:flex!important;} .hmz .mobile-toggle{display:none!important;} }
        .hmz .navlink{transition:color .2s ease;}
        .hmz .navlink:hover{color:hsl(var(--accent));}
        .hmz .soc{display:flex;color:hsl(var(--muted-foreground));transition:color .2s ease;}
        .hmz .soc:hover{color:hsl(var(--accent));}
        .hmz .hbadge{display:inline-flex;align-items:center;justify-content:center;width:1.15rem;height:1.15rem;
          border-radius:999px;background:hsl(var(--accent-foreground));color:hsl(var(--accent));font-size:.68rem;font-weight:700;}
        @media(max-width:520px){ .hmz .hemmy{display:none!important;} }
      `}</style>
    </header>
  );
}

/* ------------------------------ hero ------------------------------ */

function Hero() {
  return (
    <section className="section" style={{ paddingTop: "4rem", overflow: "hidden" }}>
      <div className="wrap hero-grid" style={{ display: "grid", gap: "3rem", gridTemplateColumns: "1fr", alignItems: "center" }}>
        <div>
          <div className="eyebrow h-a" style={{ marginBottom: "1.1rem" }}>Tear-able Garments</div>
          <h1 className="display" style={{ fontSize: "clamp(3.5rem,11vw,7rem)", margin: 0 }}>
            <span className="h-a" style={{ display: "block" }}>Tear It.</span>
            <span className="accent h-b" style={{ display: "block" }}>Wear It.</span>
          </h1>
          <div className="tearwrap h-c" style={{ margin: "1.9rem 0" }}>
            <span className="seam" style={{ width: "6.5rem" }} aria-hidden="true" />
            <Scissors className="scis" size={16} aria-hidden="true" />
          </div>
          <p className="h-c" style={{ fontSize: "1.08rem", maxWidth: "33rem", marginBottom: "1rem" }}>
            Built-in length options. One garment. No scissors, no tailor. Patented and patent-pending tear-away hem technology designed for individuals and organisations across every industry.
          </p>
          <p className="h-c" style={{ color: "hsl(var(--muted-foreground))", marginBottom: "2rem", fontWeight: 500 }}>Because fit shouldn't take weeks.</p>
          <div className="h-d" style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
            <button className="btn btn-rust" onClick={() => document.getElementById("partners")?.scrollIntoView({ behavior: "smooth" })}>Become a Brand Partner <ArrowRight className="arw" size={16} /></button>
            <button className="btn btn-outline" disabled title="Coming soon">Ask Hemmy <ArrowRight className="arw" size={16} /></button>
          </div>
        </div>
        <div className="h-b">
          <div style={{ borderRadius: "var(--radius)", overflow: "hidden", background: "hsl(var(--muted))", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 24px 60px -30px hsl(var(--stone)/.5)", position: "relative" }}>
            <div aria-hidden="true" style={{ position: "absolute", textAlign: "center", padding: "2rem" }}>
              <div className="display" style={{ fontSize: "2.5rem", color: "hsl(var(--muted-foreground))" }}>HMZ</div>
              <div className="eyebrow" style={{ marginTop: ".5rem" }}>Team lineup image</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
              alt="The HMZ team in workwear across six industries"
              style={{ position: "relative", width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <p className="eyebrow" style={{ marginTop: "1rem", textAlign: "center" }}>Built for every team. Every length. Every industry.</p>
        </div>
      </div>
      <style>{`@media(min-width:920px){.hmz .hero-grid{grid-template-columns:1.05fr .95fr!important;}}`}</style>
    </section>
  );
}

/* --------------------------- how it works -------------------------- */

function Solutions() {
  return (
    <section id="solutions" className="section soft-bg">
      <div className="wrap">
        <Reveal className="compare" as="div" style={{ display: "grid", gridTemplateColumns: "1fr", borderRadius: "calc(var(--radius) + .3rem)", overflow: "hidden", border: "1px solid hsl(var(--border))" }}>
          <div style={{ background: "hsl(var(--card))", padding: "2.75rem 2.25rem" }}>
            <div className="eyebrow" style={{ marginBottom: "1.75rem" }}>How It Usually Works</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              {USUALLY.map((u) => (
                <li key={u} style={{ display: "flex", gap: ".8rem", alignItems: "center", color: "hsl(var(--muted-foreground))" }}>
                  <ArrowRight size={15} style={{ flexShrink: 0, opacity: .5 }} /> {u}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "hsl(var(--stone))", color: "hsl(0 0% 100%)", padding: "2.75rem 2.25rem" }}>
            <div className="eyebrow" style={{ marginBottom: "1.75rem", color: "hsl(var(--accent))" }}>How HMZ Works</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              {HMZWAY.map((h) => (
                <li key={h} style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
                  <ArrowRight size={15} className="accent" style={{ flexShrink: 0 }} /> {h}
                </li>
              ))}
            </ul>
            <div className="display" style={{ fontSize: "1.5rem" }}>One Garment. Built-In Length.</div>
          </div>
        </Reveal>
      </div>
      <style>{`@media(min-width:820px){.hmz .compare{grid-template-columns:1fr 1fr!important;}}`}</style>
    </section>
  );
}

/* -------------------------- built for individuals ------------------ */

function Individuals() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>Real-World Proof</div>
          <h2 className="display" style={{ fontSize: "clamp(2.25rem,6vw,3.75rem)", margin: "0 0 2rem" }}>
            Built For <span className="accent">Individuals</span>
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2.5rem" }}>
          {INDIVIDUAL.map((i, idx) => (
            <Reveal key={i} delay={idx * 80} style={{ display: "flex", gap: ".7rem", alignItems: "center", fontWeight: 500 }}>
              <Dot /> {i}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- products ---------------------------- */

function Products() {
  return (
    <section id="products" className="section soft-bg">
      <div className="wrap">
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 110} className="card card-hover" as="div" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ aspectRatio: "16/11", background: "hsl(var(--muted))", overflow: "hidden" }}>
                <img src={p.img} alt={p.t} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }}
                  onError={(e) => { e.currentTarget.style.opacity = ".25"; }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }} />
              </div>
              <div style={{ padding: "1.6rem 1.6rem 1.9rem" }}>
                <h3 className="display" style={{ fontSize: "1.3rem", margin: "0 0 .6rem" }}>{p.t}</h3>
                <p style={{ color: "hsl(var(--muted-foreground))", margin: 0, fontSize: ".95rem" }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- brand partners ------------------------ */

function Partners() {
  return (
    <section id="partners" style={{ background: "hsl(var(--stone))", color: "hsl(0 0% 100%)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: .08,
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0 0% 100%) 1px,transparent 1px)",
        backgroundSize: "64px 64px" }} />
      <div className="wrap section" style={{ position: "relative" }}>
        <Reveal>
          <div className="eyebrow" style={{ color: "hsl(var(--accent))", marginBottom: "1rem" }}>Brand Partners</div>
          <h2 className="display" style={{ fontSize: "clamp(2.25rem,6vw,4rem)", margin: "0 0 1.5rem" }}>
            HMZ Is An <span className="accent">Ingredient</span>
          </h2>
          <p style={{ maxWidth: "40rem", fontSize: "1.1rem", opacity: .92, marginBottom: "1rem" }}>
            Like YKK. Like Velcro. Like GORE-TEX. But for hems. Built in, not added later, because length shouldn't need a tailor.
          </p>
          <p style={{ opacity: .6, fontSize: ".92rem" }}>Patented and patent-pending. Available to licence.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------- why brands + request grid ------------------ */

function WhyBrands() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>The Case For HMZ</div>
          <h2 className="display" style={{ fontSize: "clamp(2rem,5vw,3rem)", margin: "0 0 2.5rem" }}>Why Brands Are Building With HMZ</h2>
        </Reveal>
        <div style={{ display: "grid", gap: "1rem 2rem", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", marginBottom: "3rem" }}>
          {WHY_BRANDS.map((w, i) => (
            <Reveal key={w} delay={i * 70} style={{ display: "flex", gap: ".7rem", alignItems: "center", fontWeight: 500 }}>
              <Dot /> {w}
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <button className="btn btn-rust" disabled title="Coming soon">Talk to Hemmy about licensing <ArrowRight className="arw" size={16} /></button>
        </Reveal>
      </div>
    </section>
  );
}

function BrandRequest() {
  return (
    <section className="section soft-bg">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="display" style={{ fontSize: "clamp(2rem,6vw,3.5rem)", margin: "0 0 1rem" }}>
            Still Rolling Your <span className="accent">Pants Up?</span>
          </h2>
          <p style={{ color: "hsl(var(--muted-foreground))", maxWidth: "34rem", margin: "0 auto 2.5rem" }}>
            Let's fix that. Tell us which brands you want to see HMZ on, and we'll take it from there.
          </p>
        </Reveal>
        <div style={{ display: "grid", gap: ".85rem", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", maxWidth: "62rem", margin: "0 auto 2.5rem" }}>
          {BRAND_REQUESTS.map((b, i) => (
            <Reveal key={b} delay={i * 45} as="button" className="brandchip"
              style={{ padding: ".95rem 1rem", borderRadius: "999px", border: "1.5px dashed hsl(var(--border))",
                background: "transparent", color: "hsl(var(--muted-foreground))", cursor: "pointer", fontWeight: 500,
                fontSize: ".92rem", transition: "all .2s ease" }}>
              {b}
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <button className="btn btn-outline">Ask your favourite brand for HMZ <ArrowRight className="arw" size={16} /></button>
        </Reveal>
      </div>
      <style>{`.hmz .brandchip:hover{border-color:hsl(var(--accent))!important;border-style:solid!important;color:hsl(var(--accent))!important;transform:translateY(-2px);}`}</style>
    </section>
  );
}

/* -------------------------- sustainability ------------------------- */

function Sustainability() {
  return (
    <section className="section">
      <div className="wrap sustain-grid" style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "1fr", alignItems: "start" }}>
        <Reveal>
          <span className="pill" style={{ marginBottom: "1.25rem" }}><Leaf size={13} /> Sustainability</span>
          <h2 className="display" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", margin: "0 0 1.25rem" }}>Less Waste. By Design.</h2>
          <p style={{ color: "hsl(var(--muted-foreground))", maxWidth: "32rem", margin: 0, fontSize: "1.05rem" }}>
            HMZ is a quiet form of sustainability. No campaigns, no slogans, just smart construction that takes a category of waste out of the workwear lifecycle.
          </p>
        </Reveal>
        <Reveal delay={120} className="card" as="div">
          <div style={{ padding: "2.25rem" }}>
            <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>Not A Campaign. Not A Claim. Just Better Construction.</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {SUSTAIN.map((s) => (
                <li key={s} style={{ display: "flex", gap: ".7rem", alignItems: "center", fontWeight: 500 }}><Dot /> {s}</li>
              ))}
            </ul>
            <p className="slab" style={{ margin: 0, fontStyle: "italic", color: "hsl(var(--muted-foreground))", fontSize: ".95rem" }}>
              Because getting the length right the first time matters.
            </p>
          </div>
        </Reveal>
      </div>
      <style>{`@media(min-width:820px){.hmz .sustain-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
    </section>
  );
}

/* --------------------------- testimonials -------------------------- */

function Testimonials() {
  return (
    <section className="section soft-bg">
      <div className="wrap">
        <Reveal>
          <span className="pill" style={{ marginBottom: "1.25rem" }}><Users size={13} /> In The Field</span>
          <h2 className="display" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", margin: "0 0 .75rem" }}>
            Already Making A <span className="accent">Difference</span>
          </h2>
          <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "2.5rem" }}>This is what's happening on the ground.</p>
        </Reveal>
        <div className="field-grid" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr", alignItems: "center" }}>
          <Reveal className="card" as="div">
            <div style={{ padding: "2rem", borderTop: "3px solid hsl(var(--accent))", borderRadius: "var(--radius)" }}>
              <Quote size={26} className="accent" style={{ marginBottom: "1rem" }} />
              <p className="slab" style={{ fontStyle: "italic", fontSize: "1.05rem", margin: "0 0 1.5rem", color: "hsl(var(--muted-foreground))" }}>
                (Insert Doug / Leigh quote)
              </p>
              <div style={{ display: "flex", gap: ".9rem", alignItems: "center" }}>
                <div style={{ width: 42, height: 42, borderRadius: 999, background: "hsl(var(--accent)/.15)", color: "hsl(var(--accent))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>D</div>
                <div>
                  <div className="display" style={{ fontSize: ".95rem" }}>Name, Role</div>
                  <div className="eyebrow" style={{ fontSize: ".64rem", marginTop: ".2rem" }}>To Be Confirmed</div>
                </div>
              </div>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {FIELD_STATS.map((f, i) => (
              <Reveal key={f} delay={i * 110} style={{ display: "flex", gap: ".9rem", alignItems: "center" }}>
                <Dot />
                <span className="display" style={{ fontSize: "1.15rem" }}>{f}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:820px){.hmz .field-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
    </section>
  );
}

/* --------------------------- instagram ----------------------------- */

function InstagramFeed() {
  const posts = [
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
  ];
  return (
    <section className="section">
      <div className="wrap">
        <Reveal style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: ".75rem", display: "flex", alignItems: "center", gap: ".4rem" }}><Instagram size={13} /> Latest From Instagram</div>
            <h2 className="display" style={{ fontSize: "clamp(2rem,5vw,3.25rem)", margin: 0 }}>
              Follow Along: <span className="accent">@HMZ.Hemming</span>
            </h2>
          </div>
          <a className="btn btn-outline" href="https://www.instagram.com/hmz.hemming/" target="_blank" rel="noreferrer">
            <Instagram size={15} /> Follow on Instagram <ArrowRight className="arw" size={15} />
          </a>
        </Reveal>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          {posts.map((src, i) => (
            <Reveal key={i} delay={i * 80} as="a" className="ig-tile"
              href="https://www.instagram.com/hmz.hemming/" target="_blank" rel="noreferrer"
              style={{ aspectRatio: "1", borderRadius: "var(--radius)", overflow: "hidden", background: "hsl(var(--muted))", position: "relative", display: "block" }}>
              <img src={src} alt="HMZ Instagram post" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.opacity = ".3"; }} />
            </Reveal>
          ))}
        </div>
        <p className="pill" style={{ margin: "1.5rem auto 0", width: "fit-content" }}>
          <Instagram size={12} /> Free Instagram Feed Widget
        </p>
        {/* Elfsight app id: 4fe7d98b-ddbd-45c4-9b1a-4ecb9412d62a */}
      </div>
      <style>{`.hmz .ig-tile img{transition:transform .5s ease;}.hmz .ig-tile:hover img{transform:scale(1.06);}`}</style>
    </section>
  );
}

/* ----------------------------- contact ----------------------------- */

function Contact() {
  const rows = [
    { icon: Phone, label: "Office", val: "(07) 4633 0231" },
    { icon: Phone, label: "Mobile", val: "+61 459 211 117" },
    { icon: Clock, label: "Office Hours", val: "Weekdays 9am to 4pm AEST" },
    { icon: MapPin, label: "Address", val: "12/493 South Street, Harristown QLD 4350" },
  ];
  return (
    <section id="contact" className="section soft-bg">
      <div className="wrap contact-grid" style={{ display: "grid", gap: "3rem", gridTemplateColumns: "1fr", alignItems: "center" }}>
        <Reveal>
          <h2 className="display" style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)", margin: "0 0 1.25rem" }}>
            Still Rolling <span className="accent">Them Up?</span>
          </h2>
          <p style={{ color: "hsl(var(--muted-foreground))", maxWidth: "30rem", marginBottom: "2rem", fontSize: "1.05rem" }}>
            Too long? Too short? Too hard to fix? We've been there. That's why HMZ exists. If you're thinking about bringing it into your garments, or just want to understand how it works, reach out.
          </p>
          <button className="btn btn-rust" disabled title="Coming soon">Talk to us <ArrowRight className="arw" size={16} /></button>
        </Reveal>
        <Reveal delay={120} className="card" as="div">
          <div style={{ padding: "2.25rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {rows.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span style={{ width: 42, height: 42, borderRadius: 12, background: "hsl(var(--accent)/.12)", color: "hsl(var(--accent))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <div className="eyebrow" style={{ fontSize: ".64rem" }}>{r.label}</div>
                    <div style={{ marginTop: ".2rem", fontWeight: 500 }}>{r.val}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
      <style>{`@media(min-width:820px){.hmz .contact-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
    </section>
  );
}

/* ------------------------------ footer ----------------------------- */

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
      <div className="wrap" style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
        <div>
          <div className="display" style={{ fontSize: "1.9rem", marginBottom: ".75rem" }}>HMZ</div>
          <p style={{ color: "hsl(var(--muted-foreground))", maxWidth: "20rem", margin: "0 0 1.25rem" }}>
            Tear-able garments. Built-in length. Finally.
          </p>
          <div className="eyebrow" style={{ marginBottom: ".75rem" }}>Follow HMZ</div>
          <div style={{ display: "flex", gap: ".9rem" }}>
            <a href="https://www.instagram.com/hmz.hemming/" target="_blank" rel="noreferrer" aria-label="Instagram" className="soc"><Instagram size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="soc"><Linkedin size={18} /></a>
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: "1.1rem" }}>The HMZ Company</div>
          <div style={{ color: "hsl(var(--muted-foreground))", display: "flex", flexDirection: "column", gap: ".75rem", fontSize: ".92rem" }}>
            <span style={{ display: "flex", gap: ".6rem", alignItems: "center" }}><Phone size={14} className="accent" /> Office (07) 4633 0231</span>
            <span style={{ display: "flex", gap: ".6rem", alignItems: "center" }}><Phone size={14} className="accent" /> Mobile +61 459 211 117</span>
            <span style={{ display: "flex", gap: ".6rem", alignItems: "center" }}><Clock size={14} className="accent" /> Weekdays 9am to 4pm AEST</span>
            <span style={{ display: "flex", gap: ".6rem", alignItems: "center" }}><MapPin size={14} className="accent" /> 12/493 South Street, Harristown QLD 4350</span>
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: "1.1rem" }}>Site</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".7rem", fontSize: ".92rem" }}>
            <button onClick={() => setPage("about")} className="foot-link" style={{ background: "none", border: 0, textAlign: "left", cursor: "pointer", color: "hsl(var(--muted-foreground))" }}>About</button>
            <a href="#" className="foot-link" style={{ color: "hsl(var(--muted-foreground))" }}>Privacy Policy</a>
            <a href="#" className="foot-link" style={{ color: "hsl(var(--muted-foreground))" }}>Terms of Use</a>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid hsl(var(--border))", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between" }}>
        <p className="eyebrow" style={{ letterSpacing: ".12em", fontWeight: 500 }}>2026 HMZ. Made in Australia. Patented and patent-pending.</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" className="foot-link eyebrow" style={{ fontWeight: 500 }}>Privacy Policy</a>
          <a href="#" className="foot-link eyebrow" style={{ fontWeight: 500 }}>Terms of Use</a>
        </div>
      </div>
      <style>{`.hmz .foot-link{transition:color .2s ease;}.hmz .foot-link:hover{color:hsl(var(--accent));}`}</style>
    </footer>
  );
}

/* ---------------------------- about page --------------------------- */

function About({ setPage }) {
  return (
    <>
      <section className="section" style={{ paddingTop: "4rem", overflow: "hidden" }}>
        <div className="wrap" style={{ maxWidth: "46rem" }}>
          <div className="eyebrow h-a" style={{ marginBottom: "1.1rem" }}>About HMZ</div>
          <h1 className="display h-b" style={{ fontSize: "clamp(2.75rem,9vw,5.5rem)", margin: 0 }}>
            Built From <span className="accent">The Ground</span> Up.
          </h1>
          <div className="seam h-c" style={{ width: "7rem", margin: "1.75rem 0" }} aria-hidden="true" />
          <p className="h-c" style={{ fontSize: "1.1rem", color: "hsl(var(--muted-foreground))", maxWidth: "38rem" }}>
            HMZ is an Australian innovation in workwear, a patented and patent-pending tear-away hem technology that lets wearers adjust garment length themselves, on site, without tools. No tailors. No guesswork. Just fit.
          </p>
        </div>
      </section>

      <section className="section soft-bg">
        <div className="wrap founder-grid" style={{ display: "grid", gap: "3rem", gridTemplateColumns: "1fr", alignItems: "center" }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: "1rem" }}>The Founder</div>
            <h2 className="display" style={{ fontSize: "clamp(2rem,5vw,3rem)", margin: "0 0 1.5rem" }}>
              Kym <span className="accent">O'Leary</span>
            </h2>
            <p style={{ marginBottom: "1.25rem" }}>
              Kym grew up on a farm in Bowen, Queensland, in a family where showing up and getting the job done was simply what you did. When the work was finished, everyone went fishing. That's the whole philosophy.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              The idea for HMZ came from opening a bag of chook feed. A simple tear along a seam, clean and deliberate, and Kym had a thought: could a garment work the same way? Could a single pair of pants come with built-in length options, no scissors, no tailor, no guesswork?
            </p>
            <blockquote style={{ borderLeft: "3px solid hsl(var(--accent))", paddingLeft: "1.5rem", margin: "0 0 1.5rem" }}>
              <p className="slab" style={{ fontStyle: "italic", fontSize: "1.2rem", lineHeight: 1.5, margin: 0 }}>
                "Could we develop a method to deliver pants with multiple leg length options, in a single garment?"
              </p>
            </blockquote>
            <p style={{ margin: 0 }}>
              That question became a construction method. The construction method became a patent. And the patent became HMZ, a technology now licensed to workwear brands across Australia, quietly solving a problem the industry had accepted for decades.
            </p>
          </Reveal>
          <Reveal delay={120} as="div">
            <div style={{ borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "0 24px 60px -30px hsl(var(--stone)/.5)", position: "relative", aspectRatio: "4/5", background: "hsl(var(--muted))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="eyebrow" aria-hidden="true" style={{ position: "absolute", padding: "0 1rem", textAlign: "center" }}>Founder photo: Kym O{"\u2019"}Leary</span>
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=700&q=80" alt="Kym O'Leary, founder of HMZ" style={{ position: "relative", width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div style={{ position: "absolute", left: "1rem", bottom: "1rem", background: "hsl(var(--background)/.92)", padding: ".5rem .9rem", borderRadius: "999px", zIndex: 2 }}>
                <span className="eyebrow" style={{ fontSize: ".62rem" }}>Kym O{"\u2019"}Leary, Founder, HMZ</span>
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`@media(min-width:900px){.hmz .founder-grid{grid-template-columns:1.1fr .9fr!important;}}`}</style>
      </section>

      <section className="section">
        <div className="wrap tech-grid" style={{ display: "grid", gap: "3rem", gridTemplateColumns: "1fr", alignItems: "center" }}>
          <Reveal as="div">
            <div style={{ borderRadius: "var(--radius)", overflow: "hidden", aspectRatio: "5/4", background: "hsl(var(--muted))", boxShadow: "0 24px 60px -30px hsl(var(--stone)/.5)" }}>
              <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80" alt="HMZ tear-away hem detail on folded garments" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.opacity = ".3"; }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="eyebrow" style={{ marginBottom: "1rem" }}>The Technology</div>
            <h2 className="display" style={{ fontSize: "clamp(2rem,5vw,3rem)", margin: "0 0 1.5rem" }}>
              An Ingredient, <span className="accent">Not A Product.</span>
            </h2>
            <p style={{ marginBottom: "1.25rem" }}>
              HMZ is a construction method built into a garment at the point of manufacture. Like Velcro. Like Gore-Tex. You don't buy HMZ, you buy the garment it's inside.
            </p>
            <p style={{ marginBottom: "1.25rem" }}>
              Brand partners, workwear manufacturers and labels, license the HMZ method and incorporate it into their own ranges. When a factory adopts HMZ for one brand, it typically spreads across every brand they produce for. That's how HMZ scales, quietly, through the supply chain.
            </p>
            <p style={{ marginBottom: "1.75rem" }}>
              The result is a garment that comes with built-in length options, so the person wearing it can get the right fit without any alterations.
            </p>
            <span className="pill"><Scissors size={13} className="accent" /> Patented and patent-pending technology</span>
          </Reveal>
        </div>
        <style>{`@media(min-width:900px){.hmz .tech-grid{grid-template-columns:.9fr 1.1fr!important;}}`}</style>
      </section>

      <section className="section soft-bg">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: "1rem" }}>Why It Matters</div>
            <h2 className="display" style={{ fontSize: "clamp(2rem,5vw,3.25rem)", margin: "0 0 3rem" }}>
              Designed For The <span className="accent">Individual.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}>
            {[
              { h: "Not A Sizing Fix. An Equity Fix.", d: "Standard garments assume a standard person. HMZ responds to the actual individual, whatever their height, their role, their industry." },
              { h: "Workwear That Fits From Day One.", d: "When gear fits properly, people wear it properly. That means better compliance, fewer hazards, and less garment waste from hems that get hacked with a Stanley knife." },
              { h: "Built For Where Work Happens.", d: "Resources, construction, healthcare, engineering, transport, corporate. If a garment has a hem, it can carry HMZ technology." },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 110} className="card card-hover" as="div">
                <div style={{ padding: "1.9rem", height: "100%" }}>
                  <Check size={22} className="accent" style={{ marginBottom: ".9rem" }} />
                  <h3 className="display" style={{ fontSize: "1.15rem", margin: "0 0 .6rem" }}>{c.h}</h3>
                  <p style={{ color: "hsl(var(--muted-foreground))", margin: 0, fontSize: ".95rem" }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "hsl(var(--accent))", color: "hsl(0 0% 100%)" }}>
        <div className="wrap section cta-grid" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr", alignItems: "center" }}>
          <div>
            <h2 className="display" style={{ fontSize: "clamp(2.75rem,7vw,4.5rem)", margin: 0 }}>
              Tear It.<br />Wear It.
            </h2>
            <p style={{ marginTop: "1.25rem", maxWidth: "28rem", opacity: .95 }}>
              Questions about the technology, licensing, or where to find HMZ garments? Hemmy knows.
            </p>
          </div>
          <div style={{ display: "flex", gap: ".9rem", flexWrap: "wrap", justifyContent: "flex-start" }} className="cta-btns">
            <button className="btn" disabled title="Coming soon" style={{ background: "hsl(202 12% 22%)", color: "#fff" }}>Ask Hemmy <ArrowRight className="arw" size={16} /></button>
            <button className="btn" style={{ background: "#fff", color: "hsl(var(--accent))" }}
              onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 90); }}>
              Get in touch
            </button>
          </div>
        </div>
        <style>{`@media(min-width:820px){.hmz .cta-grid{grid-template-columns:1fr auto!important;}.hmz .cta-btns{justify-content:flex-end!important;}}`}</style>
      </section>
    </>
  );
}

/* ------------------------------- app ------------------------------- */

export default function App() {
  const [dark, toggle] = useTheme();
  const [page, setPage] = useState("home");

  useEffect(() => {
    if (!document.getElementById("hmz-fonts")) {
      const l = document.createElement("link");
      l.id = "hmz-fonts";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Roboto+Slab:wght@300;400;500;600;700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div className={`hmz${dark ? " dark" : ""}`}>
      <style>{TOKENS}</style>
      <Header dark={dark} toggle={toggle} page={page} setPage={setPage} />
      {page === "home" ? (
        <>
          <Hero />
          <Solutions />
          <Individuals />
          <Products />
          <Partners />
          <WhyBrands />
          <BrandRequest />
          <Sustainability />
          <Testimonials />
          <InstagramFeed />
          <Contact />
        </>
      ) : (
        <About setPage={setPage} />
      )}
      <Footer setPage={setPage} />
    </div>
  );
}
