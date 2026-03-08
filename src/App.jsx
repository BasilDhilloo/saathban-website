import { useState, useEffect, useRef, useCallback } from "react";

/* ════════════════════════════════════════════════
   SAATHBAN — Timeless Togetherness
   Addressing Elderly Loneliness Through Community
   ════════════════════════════════════════════════ */

// ─── Color Tokens ───
const C = {
  blue: "#586BA4", deepBlue: "#324376", gold: "#F5DD90", tangerine: "#F68E5F", coral: "#F76C5E",
  coralAlt: "#ED6A5A", chiffon: "#F4F1BB", ash: "#9BC1BC", taupe: "#5D576B", linen: "#E6EBE0",
  bg: "#FAFAF7", white: "#FFFFFF", dark: "#2A2438", textMain: "#3A3347", textMuted: "#6B6480",
};

// ─── Data ───
const TEAM = [
  { name: "Founder Name", role: "Co-Founder & Director", initials: "FN", color: C.deepBlue },
  { name: "Founder Name", role: "Co-Founder & Research Head", initials: "FN", color: C.blue },
  { name: "Team Member", role: "Community Outreach Lead", initials: "TM", color: C.taupe },
  { name: "Team Member", role: "Volunteer Coordinator", initials: "TM", color: C.coral },
];

const EVENTS = [
  { title: "Chai & Conversations", date: "Apr 12, 2026", loc: "Community Hall, Delhi", desc: "An afternoon of storytelling and warm chai with senior residents of local aged care homes.", color: C.tangerine },
  { title: "Bridging Generations Workshop", date: "May 3, 2026", loc: "Virtual Event", desc: "Interactive workshop pairing youth volunteers with elderly individuals for meaningful dialogue.", color: C.blue },
  { title: "Walk With Me — Senior Wellness Walk", date: "Jun 15, 2026", loc: "Lodhi Garden, Delhi", desc: "A gentle group walk promoting physical and mental health among senior citizens.", color: C.ash },
];

const BLOGS = [
  { title: "Why Loneliness is the Silent Epidemic Among Seniors", date: "Feb 28, 2026", excerpt: "Exploring how social isolation deeply impacts elderly health and what communities can do to combat it.", tag: "Research", color: C.coral },
  { title: "Volunteering Changed My Perspective on Aging", date: "Jan 15, 2026", excerpt: "A young volunteer shares their transformative experience at a senior living community.", tag: "Stories", color: C.blue },
  { title: "5 Simple Ways to Support an Elderly Neighbour", date: "Dec 10, 2025", excerpt: "Practical, everyday actions that combat loneliness and build lasting connections with senior citizens.", tag: "Well-being", color: C.tangerine },
];

const RESEARCH = [
  { title: "Social Isolation & Mental Health in Indian Old Age Homes", year: "2025", summary: "A mixed-methods study examining social engagement and mental well-being among senior living residents." },
  { title: "Community-Based Interventions for Elderly Loneliness", year: "2026", summary: "Evidence-based programs that reduce loneliness and improve quality of life in aged care settings." },
];

const NAV_ITEMS = [
  { label: "Home", id: "home" }, { label: "About", id: "about" }, { label: "Our Work", id: "work" },
  { label: "Get Involved", id: "involve" }, { label: "Blog", id: "blog" }, { label: "Contact", id: "contact" },
];

// ─── Fade-In Observer ───
function FadeIn({ children, className = "", delay = 0, style: extra = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}s`, ...extra,
    }}>{children}</div>
  );
}

// ─── Section Title ───
function SecTitle({ children, sub, light }) {
  return (
    <div style={{ marginBottom: 52, textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", color: light ? C.white : C.dark, margin: 0, fontWeight: 700, letterSpacing: "-0.01em" }}>{children}</h2>
      {sub && <p style={{ fontSize: 16, color: light ? "rgba(255,255,255,0.75)" : C.textMuted, marginTop: 14, maxWidth: 540, marginInline: "auto", lineHeight: 1.65 }}>{sub}</p>}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 20 }}>
        <div style={{ width: 32, height: 3, borderRadius: 2, background: C.tangerine }} />
        <div style={{ width: 12, height: 3, borderRadius: 2, background: C.gold }} />
        <div style={{ width: 6, height: 3, borderRadius: 2, background: C.blue }} />
      </div>
    </div>
  );
}

// ─── Button ───
function Btn({ children, onClick, variant = "primary", style: s = {}, href }) {
  const base = { fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, border: "none", borderRadius: 50, cursor: "pointer", padding: "14px 36px", letterSpacing: "0.02em", transition: "all 0.35s ease", display: "inline-block", textDecoration: "none" };
  const styles = variant === "primary"
    ? { ...base, background: `linear-gradient(135deg, ${C.tangerine}, ${C.coral})`, color: "#fff", boxShadow: "0 4px 24px rgba(246,140,95,0.35)", ...s }
    : variant === "blue"
      ? { ...base, background: `linear-gradient(135deg, ${C.blue}, ${C.deepBlue})`, color: "#fff", boxShadow: "0 4px 24px rgba(88,107,164,0.35)", ...s }
      : { ...base, background: "transparent", color: C.dark, border: `2px solid ${C.blue}`, ...s };
  const Tag = href ? "a" : "button";
  return <Tag style={styles} onClick={onClick} href={href} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}>{children}</Tag>;
}

// ─── Card ───
function Card({ children, style: s = {}, hover = true }) {
  return (
    <div style={{ background: C.white, borderRadius: 16, padding: 32, boxShadow: "0 2px 20px rgba(42,36,56,0.06)", transition: "all 0.35s ease", ...s }}
      onMouseEnter={hover ? e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(42,36,56,0.1)"; } : undefined}
      onMouseLeave={hover ? e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(42,36,56,0.06)"; } : undefined}
    >{children}</div>
  );
}

// ─── Stat Counter ───
function Stat({ number, label, delay = 0 }) {
  return (
    <FadeIn delay={delay} style={{ textAlign: "center", flex: "1 1 140px" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: C.tangerine }}>{number}</div>
      <div style={{ fontSize: 14, color: C.textMuted, marginTop: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    </FadeIn>
  );
}

/* ════════════════════════════════
   MAIN APP
   ════════════════════════════════ */
export default function Saathban() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const px = { maxWidth: 1160, margin: "0 auto", padding: "0 24px" };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.textMain, background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; }
        ::selection { background: ${C.blue}; color: #fff; }
        input:focus, textarea:focus { outline: 2px solid ${C.blue}; outline-offset: 2px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
        .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media(max-width:900px) { .grid3, .grid4 { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width:640px) { .grid2, .grid3, .grid4 { grid-template-columns: 1fr; } .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } .hero-text { font-size: 2.4rem !important; } .section-pad { padding: 72px 0 !important; } }
        @media(min-width:641px) { .show-mobile { display: none !important; } }
        a { color: ${C.blue}; text-decoration: none; }
        a:hover { color: ${C.deepBlue}; }
      `}</style>

      {/* ────── Hidden SEO ────── */}
      <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }} aria-hidden="true">
        <h1>Saathban — Timeless Togetherness | Combating Elderly Loneliness in Senior Living Communities</h1>
        <p>Saathban addresses loneliness among senior citizens through community engagement, research, and aged care advocacy. We work with old age homes, senior living communities, and senior community housing to improve elderly health, mental health, and well-being. Join us to socialise, volunteer, and build a supportive community for social security and aged care. Keywords: old age homes, senior living, senior citizens, senior community housing, senior living communities, aged care, social security, community, socialise, lonely, loneliness, well-being, elderly health, mental health.</p>
      </div>

      {/* ═══════════ NAVIGATION ═══════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(250,250,247,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(88,107,164,0.12)" : "none",
        transition: "all 0.4s ease", padding: scrolled ? "10px 0" : "18px 0",
      }}>
        <div style={{ ...px, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }} onClick={() => scrollTo("home")}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="13" cy="19" r="10" fill={C.blue} opacity="0.75" />
              <circle cx="25" cy="19" r="10" fill={C.tangerine} opacity="0.75" />
              <path d="M19 12C20.6 13.8 21.5 16.2 21.5 19C21.5 21.8 20.6 24.2 19 26C17.4 24.2 16.5 21.8 16.5 19C16.5 16.2 17.4 13.8 19 12Z" fill={C.gold} opacity="0.9" />
            </svg>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, color: C.dark, fontWeight: 700 }}>Saathban</span>
              <span className="hide-mobile" style={{ display: "block", fontSize: 10, color: C.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: -2, fontWeight: 500 }}>Timeless Togetherness</span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_ITEMS.map(n => (
              <span key={n.id} onClick={() => scrollTo(n.id)} style={{
                cursor: "pointer", fontSize: 13.5, fontWeight: 600, color: C.taupe, letterSpacing: "0.05em",
                textTransform: "uppercase", transition: "color 0.3s", padding: "4px 0",
              }} onMouseEnter={e => e.target.style.color = C.coral} onMouseLeave={e => e.target.style.color = C.taupe}>{n.label}</span>
            ))}
            <Btn variant="primary" onClick={() => scrollTo("involve")} style={{ padding: "10px 24px", fontSize: 13 }}>Get Involved</Btn>
          </div>

          {/* Mobile hamburger */}
          <div className="show-mobile" style={{ display: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 8 }} onClick={() => setMenuOpen(!menuOpen)}>
            <div style={{ width: 24, height: 2.5, background: C.dark, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <div style={{ width: 24, height: 2.5, background: C.dark, borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 24, height: 2.5, background: C.dark, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: C.white, borderTop: `1px solid ${C.linen}`, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_ITEMS.map(n => (
              <span key={n.id} onClick={() => scrollTo(n.id)} style={{ fontSize: 16, fontWeight: 600, color: C.dark, cursor: "pointer", padding: "8px 0", borderBottom: `1px solid ${C.linen}` }}>{n.label}</span>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}25, transparent 70%)` }} />
          <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}15, transparent 70%)` }} />
          <div style={{ position: "absolute", top: "20%", left: "60%", width: 180, height: 180, borderRadius: "50%", border: `2px solid ${C.tangerine}20`, animation: "float 6s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "30%", right: "15%", width: 120, height: 120, borderRadius: "50%", border: `2px solid ${C.blue}20`, animation: "float 8s ease-in-out infinite 1s" }} />
          <svg style={{ position: "absolute", top: "12%", left: "8%", opacity: 0.08 }} width="160" height="160">
            {[...Array(64)].map((_, i) => <circle key={i} cx={(i % 8) * 20 + 10} cy={Math.floor(i / 8) * 20 + 10} r="2" fill={C.deepBlue} />)}
          </svg>
        </div>

        <div style={{ ...px, position: "relative", zIndex: 1, width: "100%", paddingTop: 100, paddingBottom: 80 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "inline-block", background: `${C.blue}12`, borderRadius: 40, padding: "8px 20px", marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.blue, letterSpacing: "0.08em", textTransform: "uppercase" }}>Empowering Elderly Communities</span>
            </div>
            <h1 className="hero-text" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem,5.5vw,4.2rem)", color: C.dark, lineHeight: 1.12, fontWeight: 700, marginBottom: 10 }}>
              Timeless{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                <span style={{ position: "relative", zIndex: 1 }}>Togetherness</span>
                <span style={{ position: "absolute", bottom: 4, left: -4, right: -4, height: 14, background: `${C.gold}60`, borderRadius: 4, zIndex: 0 }} />
              </span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: C.textMuted, marginTop: 20, maxWidth: 540 }}>
              Saathban is a community-driven initiative dedicated to addressing loneliness among senior citizens. We believe no one should age alone — through research, events, and compassionate action, we build bridges of belonging.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
              <Btn onClick={() => scrollTo("work")}>Explore Our Work</Btn>
              <Btn variant="outline" onClick={() => scrollTo("involve")}>Join the Movement</Btn>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: 40, marginTop: 72, flexWrap: "wrap", padding: "32px 0", borderTop: `1px solid ${C.linen}` }}>
            <Stat number="500+" label="Seniors Reached" delay={0.1} />
            <Stat number="50+" label="Volunteers" delay={0.2} />
            <Stat number="12+" label="Events Held" delay={0.3} />
            <Stat number="3" label="Research Papers" delay={0.4} />
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="section-pad" style={{ padding: "100px 0", background: C.white }}>
        <div style={px}>
          <SecTitle sub="Understanding who we are, what drives us, and the people behind Saathban.">About Us</SecTitle>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 44, flexWrap: "wrap" }}>
            {[{ key: "mission", label: "Our Mission" }, { key: "vision", label: "Our Vision" }, { key: "team", label: "Our Team" }].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, padding: "10px 28px", borderRadius: 40, border: "none", cursor: "pointer",
                background: activeTab === t.key ? `linear-gradient(135deg, ${C.blue}, ${C.deepBlue})` : C.linen,
                color: activeTab === t.key ? "#fff" : C.taupe, transition: "all 0.3s ease", letterSpacing: "0.02em",
              }}>{t.label}</button>
            ))}
          </div>

          {/* Mission */}
          {activeTab === "mission" && (
            <FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="grid2">
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.dark, marginBottom: 18 }}>Our Mission</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: C.textMuted, marginBottom: 16 }}>
                    Saathban exists to combat the pervasive loneliness affecting senior citizens across communities. We create meaningful connections between generations, advocate for better aged care, and conduct research that drives systemic change in how society supports its elderly.
                  </p>
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: C.textMuted }}>
                    Through community programs, partnerships with old age homes and senior living communities, and evidence-based interventions, we ensure that every elderly individual feels seen, heard, and valued.
                  </p>
                </div>
                <div style={{ background: `linear-gradient(135deg, ${C.blue}10, ${C.tangerine}10)`, borderRadius: 20, padding: 40, display: "flex", flexDirection: "column", gap: 20, border: `1px solid ${C.linen}` }}>
                  {["Foster genuine human connections across generations", "Advocate for mental health & well-being of seniors", "Conduct impactful research on elderly loneliness", "Build inclusive communities for senior citizens"].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${[C.tangerine, C.blue, C.coral, C.ash][i]}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: [C.tangerine, C.blue, C.coral, C.ash][i] }} />
                      </div>
                      <span style={{ fontSize: 15, color: C.textMain, lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Vision */}
          {activeTab === "vision" && (
            <FadeIn>
              <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 20, opacity: 0.15 }}>✦</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.dark, marginBottom: 20 }}>Our Vision</h3>
                <p style={{ fontSize: 18, lineHeight: 1.8, color: C.textMuted, marginBottom: 24 }}>
                  We envision a world where no senior citizen experiences the weight of loneliness — where ageing is celebrated, communities rally around their elders, and every individual enjoys a dignified, connected, and joyful life in their later years.
                </p>
                <div style={{ background: `linear-gradient(135deg, ${C.gold}30, ${C.chiffon}50)`, borderRadius: 16, padding: "28px 36px", display: "inline-block", marginTop: 12 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", color: C.dark, lineHeight: 1.6 }}>
                    "A society is measured by how it treats its elderly."
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Team */}
          {activeTab === "team" && (
            <FadeIn>
              <div className="grid4">
                {TEAM.map((m, i) => (
                  <Card key={i} style={{ textAlign: "center", padding: 28 }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: `${m.color}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: `2px solid ${m.color}30` }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: m.color }}>{m.initials}</span>
                    </div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{m.name}</h4>
                    <p style={{ fontSize: 13, color: C.blue, fontWeight: 600, marginBottom: 10, letterSpacing: "0.02em" }}>{m.role}</p>
                  </Card>
                ))}
              </div>
              <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: C.textMuted, fontStyle: "italic" }}>
                Update founder names and photos by editing the website content.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ═══════════ OUR WORK ═══════════ */}
      <section id="work" className="section-pad" style={{ padding: "100px 0", background: C.bg }}>
        <div style={px}>
          <SecTitle sub="From grassroots events to academic research — here's how we make a difference.">Our Work</SecTitle>

          {/* Research */}
          <FadeIn>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.dark, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: `${C.deepBlue}14`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.deepBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </span>
              Research & Publications
            </h3>
            <div className="grid2" style={{ marginBottom: 56 }}>
              {RESEARCH.map((r, i) => (
                <Card key={i} style={{ borderLeft: `4px solid ${C.deepBlue}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <h4 style={{ fontSize: 17, fontWeight: 700, color: C.dark, flex: 1, lineHeight: 1.4 }}>{r.title}</h4>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.blue, background: `${C.blue}12`, padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap", marginLeft: 12 }}>{r.year}</span>
                  </div>
                  <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.65 }}>{r.summary}</p>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* Events */}
          <FadeIn delay={0.1}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.dark, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: `${C.tangerine}14`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.tangerine} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </span>
              Upcoming Events
            </h3>
            <div className="grid3">
              {EVENTS.map((ev, i) => (
                <Card key={i} style={{ overflow: "hidden" }}>
                  <div style={{ height: 6, background: ev.color, margin: "-32px -32px 20px -32px", borderRadius: "16px 16px 0 0" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: ev.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{ev.date}</span>
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: C.dark, margin: "8px 0", lineHeight: 1.35 }}>{ev.title}</h4>
                  <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {ev.loc}
                  </p>
                  <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>{ev.desc}</p>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ GET INVOLVED ═══════════ */}
      <section id="involve" style={{ padding: "100px 0", background: `linear-gradient(135deg, ${C.deepBlue}, ${C.blue} 50%, ${C.taupe})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -50, left: -50, width: 250, height: 250, borderRadius: "50%", background: `${C.tangerine}10` }} />

        <div style={{ ...px, position: "relative", zIndex: 1 }}>
          <SecTitle light sub="Whether you give your time or your platform — every contribution counts.">Get Involved</SecTitle>

          <div className="grid2" style={{ maxWidth: 860, margin: "0 auto" }}>
            <FadeIn delay={0.1}>
              <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", borderRadius: 20, padding: 40, border: "1px solid rgba(255,255,255,0.12)", height: "100%" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${C.tangerine}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.tangerine} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", marginBottom: 14 }}>Volunteer With Us</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 24 }}>
                  Spend time with seniors, help organise events, or contribute your skills remotely. Volunteering with Saathban means making a direct impact on elderly well-being in your community.
                </p>
                <Btn variant="primary" onClick={() => scrollTo("contact")} style={{ background: `linear-gradient(135deg, ${C.tangerine}, ${C.coral})` }}>Become a Volunteer →</Btn>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", borderRadius: 20, padding: 40, border: "1px solid rgba(255,255,255,0.12)", height: "100%" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${C.gold}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", marginBottom: 14 }}>Partner With Us</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 24 }}>
                  Are you an organisation, old age home, or senior living community? Let's collaborate to create social programmes, co-host events, or support our research on elderly loneliness.
                </p>
                <Btn variant="primary" onClick={() => scrollTo("contact")} style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.tangerine})` }}>Partner With Us →</Btn>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════ BLOG / STORIES ═══════════ */}
      <section id="blog" className="section-pad" style={{ padding: "100px 0", background: C.white }}>
        <div style={px}>
          <SecTitle sub="Stories, insights, and reflections on elderly care, community, and well-being.">Blog & Stories</SecTitle>

          <div className="grid3">
            {BLOGS.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card style={{ display: "flex", flexDirection: "column", height: "100%", padding: 0, overflow: "hidden" }}>
                  <div style={{ height: 140, background: `linear-gradient(135deg, ${b.color}20, ${b.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: `${b.color}20`, fontWeight: 700 }}>{b.tag[0]}</span>
                    <span style={{ position: "absolute", top: 16, left: 16, fontSize: 11, fontWeight: 700, color: b.color, background: `${b.color}15`, padding: "5px 14px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.06em" }}>{b.tag}</span>
                  </div>
                  <div style={{ padding: "24px 28px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, marginBottom: 8 }}>{b.date}</span>
                    <h4 style={{ fontSize: 17, fontWeight: 700, color: C.dark, lineHeight: 1.4, marginBottom: 10 }}>{b.title}</h4>
                    <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, flex: 1 }}>{b.excerpt}</p>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.blue, marginTop: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      Read More <span style={{ transition: "transform 0.3s" }}>→</span>
                    </span>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Newsletter */}
          <FadeIn delay={0.2}>
            <div style={{ marginTop: 64, background: `linear-gradient(135deg, ${C.linen}, ${C.chiffon}50)`, borderRadius: 20, padding: "48px 40px", textAlign: "center", border: `1px solid ${C.linen}`, maxWidth: 680, marginInline: "auto" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: C.dark, marginBottom: 10 }}>Stay Connected</h3>
              <p style={{ fontSize: 15, color: C.textMuted, marginBottom: 28, lineHeight: 1.6 }}>
                Subscribe to our newsletter for updates on research, events, and stories from the Saathban community.
              </p>
              {subbed ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: C.blue, fontWeight: 600, fontSize: 16 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  Thank you for subscribing!
                </div>
              ) : (
                <div style={{ display: "flex", gap: 12, maxWidth: 440, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
                  <input
                    type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
                    style={{ flex: "1 1 240px", padding: "14px 20px", borderRadius: 50, border: `1.5px solid ${C.linen}`, fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: C.white, color: C.dark, minWidth: 200 }}
                  />
                  <Btn onClick={() => { if (email.includes("@")) setSubbed(true); }}>Subscribe</Btn>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="section-pad" style={{ padding: "100px 0", background: C.bg }}>
        <div style={px}>
          <SecTitle sub="Have questions, ideas, or want to collaborate? We'd love to hear from you.">Contact Us</SecTitle>

          <div className="grid2" style={{ maxWidth: 920, margin: "0 auto", alignItems: "start" }}>
            {/* Contact Info */}
            <FadeIn>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.dark, marginBottom: 24 }}>Reach Out</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <a href="mailto:saathban@gmail.com" style={{ display: "flex", gap: 16, alignItems: "center", textDecoration: "none" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${C.blue}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Email</div>
                      <div style={{ fontSize: 15, color: C.blue, fontWeight: 500 }}>saathban@gmail.com</div>
                    </div>
                  </a>
                  <a href="https://instagram.com/__saathban__" target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 16, alignItems: "center", textDecoration: "none" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${C.coral}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.coral} strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill={C.coral}/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Instagram</div>
                      <div style={{ fontSize: 15, color: C.coral, fontWeight: 500 }}>@__saathban__</div>
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/in/saathban-timeless-togetherness-7636953b4" target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 16, alignItems: "center", textDecoration: "none" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${C.deepBlue}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.deepBlue} strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>LinkedIn</div>
                      <div style={{ fontSize: 15, color: C.deepBlue, fontWeight: 500 }}>Saathban</div>
                    </div>
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.15}>
              <Card>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${C.ash}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <h4 style={{ fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Message Sent!</h4>
                    <p style={{ fontSize: 14, color: C.textMuted }}>We'll get back to you soon.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <h4 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Send Us a Message</h4>
                    <input placeholder="Your Name" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} style={{ padding: "13px 18px", borderRadius: 12, border: `1.5px solid ${C.linen}`, fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: C.bg }} />
                    <input type="email" placeholder="Your Email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} style={{ padding: "13px 18px", borderRadius: 12, border: `1.5px solid ${C.linen}`, fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: C.bg }} />
                    <textarea placeholder="Your Message" rows={4} value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} style={{ padding: "13px 18px", borderRadius: 12, border: `1.5px solid ${C.linen}`, fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: C.bg, resize: "vertical" }} />
                    <Btn onClick={() => { if (contact.name && contact.email && contact.message) setSent(true); }}>Send Message</Btn>
                  </div>
                )}
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ background: C.dark, color: "rgba(255,255,255,0.7)", padding: "60px 0 32px" }}>
        <div style={px}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
                  <circle cx="13" cy="19" r="10" fill={C.blue} opacity="0.75" />
                  <circle cx="25" cy="19" r="10" fill={C.tangerine} opacity="0.75" />
                  <path d="M19 12C20.6 13.8 21.5 16.2 21.5 19C21.5 21.8 20.6 24.2 19 26C17.4 24.2 16.5 21.8 16.5 19C16.5 16.2 17.4 13.8 19 12Z" fill={C.gold} opacity="0.9" />
                </svg>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", fontWeight: 700 }}>Saathban</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>Combating elderly loneliness through community, compassion, and research. No one should age alone.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Quick Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {NAV_ITEMS.map(n => (
                  <span key={n.id} onClick={() => scrollTo(n.id)} style={{ cursor: "pointer", fontSize: 14, transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = C.tangerine} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}>{n.label}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Connect</h4>
              <div style={{ display: "flex", gap: 12 }}>
                <a href="mailto:saathban@gmail.com" style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background = `${C.blue}40`} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
                </a>
                <a href="https://instagram.com/__saathban__" target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background = `${C.coral}40`} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/saathban-timeless-togetherness-7636953b4" target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background = `${C.deepBlue}60`} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            <span>© 2026 Saathban — Timeless Togetherness. All rights reserved.</span>
            <span style={{ fontSize: 12 }}>Dedicated to combating elderly loneliness.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}