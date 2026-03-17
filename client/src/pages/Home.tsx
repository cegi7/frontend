/**
 * CHEWS — Marketing Strategy Page (Guest-Centric)
 * Design: Craft Kitchen Journal — warm editorial aesthetics
 * Palette: Dark chocolate (#1C1008) + warm cream (#F4ECD8) + burnt orange (#D4500A)
 * Fonts: Playfair Display (headings) + DM Sans (body) + DM Mono (stats/labels)
 * 
 * Focus: What guests experience at CHEWS — not operational details
 */

import { useEffect, useRef, useState } from "react";
import {
  Star,
  MapPin,
  TrendingUp,
  Zap,
  Target,
  Clock,
  ChefHat,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Utensils,
  Heart,
  Flame,
  Timer,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

// ─── Image URLs ───────────────────────────────────────────────
const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663445430328/FSBnwfEpGQDw9N2N7pvwtD/chews-hero-bg-8Lkz4CoNvRMBuuurdiiHR5.webp";
const BURGER_CLOSEUP =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663445430328/FSBnwfEpGQDw9N2N7pvwtD/chews-burger-closeup-QdAECzWvMW3W3f2FpEKoMU.webp";
const KITCHEN_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663445430328/FSBnwfEpGQDw9N2N7pvwtD/chews-kitchen-ZUVSqft3qT6iNZrprszkmS.webp";
const INSTAGRAM_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663445430328/FSBnwfEpGQDw9N2N7pvwtD/chews-instagram-CcA7MgziLKQecSbGs4fGYJ.webp";

// ─── Intersection Observer Hook ───────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Section Wrapper ──────────────────────────────────────────
function Section({
  children,
  className = "",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      style={style}
      className={`${className} ${inView ? "animate-fade-in-up" : "opacity-0-init"}`}
    >
      {children}
    </section>
  );
}

// ─── Feature Card ─────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  description,
  delay = "",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}) {
  return (
    <div
      className={`p-6 border border-[oklch(0.86_0.018_65)] bg-[oklch(0.99_0.008_75)] lift-card ${delay}`}
    >
      <div
        className="w-10 h-10 flex items-center justify-center mb-4"
        style={{ background: "oklch(0.52 0.155 38 / 0.12)", color: "var(--chews-orange)" }}
      >
        {icon}
      </div>
      <h3
        className="text-lg font-bold mb-3"
        style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
        {description}
      </p>
    </div>
  );
}

// ─── Menu Item ────────────────────────────────────────────────
function MenuItem({
  name,
  price,
  tag,
  isHero = false,
}: {
  name: string;
  price: string;
  tag: string;
  isHero?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-4 border-b border-[oklch(0.86_0.018_65)] last:border-0 group ${isHero ? "py-5" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
          style={{ background: isHero ? "var(--chews-orange)" : "var(--chews-amber)" }}
        />
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-semibold ${isHero ? "text-lg" : "text-base"}`}
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--chews-dark)",
              }}
            >
              {name}
            </span>
            <span
              className="text-xs px-2 py-0.5"
              style={{
                background: isHero ? "oklch(0.52 0.155 38 / 0.12)" : "oklch(0.86 0.018 65 / 0.5)",
                color: isHero ? "var(--chews-orange)" : "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
                border: isHero ? "1px solid oklch(0.52 0.155 38 / 0.3)" : "none",
              }}
            >
              {tag}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`font-bold flex-shrink-0 ml-4 ${isHero ? "text-xl" : "text-base"}`}
        style={{
          fontFamily: "var(--font-mono)",
          color: isHero ? "var(--chews-orange)" : "var(--chews-dark)",
        }}
      >
        {price}
      </div>
    </div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────
function CTAButton({
  label,
  href,
  variant = "primary",
}: {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all hover:gap-3"
      style={{
        background: variant === "primary" ? "var(--chews-orange)" : "transparent",
        color: variant === "primary" ? "white" : "var(--chews-orange)",
        border: variant === "secondary" ? "2px solid var(--chews-orange)" : "none",
        fontFamily: "var(--font-body)",
      }}
    >
      {label}
      <ExternalLink size={14} />
    </a>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect on hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const bg = heroRef.current.querySelector(".hero-bg") as HTMLElement;
        if (bg) {
          bg.style.transform = `translateY(${scrollY * 0.35}px)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "oklch(0.14 0.025 45 / 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid oklch(1 0 0 / 0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center text-sm font-black"
            style={{
              background: "var(--chews-orange)",
              color: "white",
              fontFamily: "var(--font-display)",
              clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
            }}
          >
            C
          </div>
          <span
            className="text-white font-bold tracking-widest text-sm"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.25em" }}
          >
            CHEWS
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {["Zanat", "Iskustvo", "Meni", "Gde"].map((item, i) => (
            <a
              key={i}
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-widest animated-underline"
              style={{
                color: "oklch(0.85 0.005 75)",
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {item}
            </a>
          ))}
        </div>
        <div
          className="text-xs px-3 py-1.5"
          style={{
            border: "1px solid oklch(0.52 0.155 38 / 0.6)",
            color: "var(--chews-orange)",
            fontFamily: "var(--font-mono)",
          }}
        >
          4.7★ · 107 recenzija
        </div>
      </nav>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        {/* Background image with parallax */}
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            willChange: "transform",
          }}
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.14 0.025 45 / 0.97) 0%, oklch(0.14 0.025 45 / 0.75) 40%, oklch(0.14 0.025 45 / 0.3) 100%)",
          }}
        />
        {/* Content */}
        <div className="container relative z-10 pb-20 pt-32">
          <div className="max-w-3xl">
            <div className="section-label mb-5 animate-fade-in-up" style={{ color: "oklch(0.75 0.12 75)" }}>
              Artizanski Burgeri · Novi Sad · Bulevar Oslobođenja 12
            </div>
            <h1
              className="text-5xl md:text-7xl font-black leading-[0.95] mb-6 animate-fade-in-up delay-100"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.97 0.012 75)" }}
            >
              CHEWS
              <br />
              <em className="italic font-normal" style={{ color: "var(--chews-orange)" }}>
                Zanat
              </em>
              <br />
              u svakom zalogaju
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed max-w-xl mb-8 animate-fade-in-up delay-200"
              style={{ color: "oklch(0.82 0.012 70)", fontFamily: "var(--font-body)" }}
            >
              Svaki burger se pravi ručno, od svežih sastojaka, pred tvojim očima.
              Nema zamrznutog, nema unapred pripremljenog. Samo autentičnost i ukus koji zaslužuješ.
            </p>
            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-8 animate-fade-in-up delay-300">
              {[
                { v: "4.7★", l: "Prosečna ocena" },
                { v: "107", l: "Recenzija" },
                { v: "500–1000", l: "RSD cenovni rang" },
                { v: "Wolt", l: "Dostava" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-2xl font-bold leading-none"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--chews-orange)" }}
                  >
                    {s.v}
                  </span>
                  <span
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.65 0.015 65)", fontFamily: "var(--font-mono)" }}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <CTAButton label="Naruči na Wolt-u" href="https://wolt.com" variant="primary" />
              <CTAButton label="Pronađi nas na Maps" href="https://maps.google.com" variant="secondary" />
            </div>
          </div>
        </div>
        {/* Bottom address bar */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-6 py-3"
          style={{
            background: "oklch(0.52 0.155 38 / 0.95)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <MapPin size={14} className="text-white" />
          <span className="text-white text-xs tracking-widest uppercase">
            Bulevar Oslobođenja 12, Novi Sad
          </span>
        </div>
      </div>

      {/* ── WHAT IS CHEWS ── */}
      <Section className="py-20 border-b border-[oklch(0.86_0.018_65)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Image */}
            <div className="relative">
              <img
                src={BURGER_CLOSEUP}
                alt="CHEWS burger"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3", filter: "contrast(1.05) saturate(1.1)" }}
              />
              {/* Stamp badge */}
              <div
                className="absolute -bottom-5 -right-5 w-20 h-20 stamp-badge"
                style={{
                  background: "var(--chews-orange)",
                  color: "white",
                  border: "2px solid white",
                  fontSize: "0.55rem",
                  letterSpacing: "0.08em",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                <div>
                  <div className="font-bold text-base" style={{ fontFamily: "var(--font-mono)" }}>
                    4.7
                  </div>
                  <div>★★★★★</div>
                  <div>107 rev.</div>
                </div>
              </div>
            </div>
            {/* Right: Description */}
            <div>
              <div className="section-label mb-3">Šta je CHEWS?</div>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
              >
                Burger kako bi trebalo da bude
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--muted-foreground)" }}
              >
                Nismo brzi. Nismo jeftini. Ali smo <strong style={{ color: "var(--chews-dark)" }}>autentični</strong>.
              </p>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "var(--muted-foreground)" }}
              >
                Svaki burger se pravi od nule — svež meso, svež brioche, svež sastojci.
                Nema zamrznutih polufabrikata. Nema "brze" hrane. Samo zanat i ukus.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <ChefHat size={16} />, text: "Ručno pravljeni burgeri — zanat u svakom zalogaju" },
                  { icon: <Heart size={16} />, text: "Ljubazno osoblje — osećaćeš se kao kod kuće" },
                  { icon: <Flame size={16} />, text: "Svež i kvalitetan — bez kompromisa" },
                  { icon: <Star size={16} />, text: "Dostupna cena — luksuz koji možeš priuštiti" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.52 0.155 38 / 0.12)", color: "var(--chews-orange)" }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm" style={{ color: "var(--chews-dark)" }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── THE CRAFT ── */}
      <Section
        id="zanat"
        className="py-20 border-b border-[oklch(0.86_0.018_65)]"
        style={{ background: "oklch(0.93 0.012 75)" } as React.CSSProperties}
      >
        <div className="container">
          <div className="mb-12">
            <div className="section-label mb-3">Zanat</div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
            >
              Vidiš kako se pravi
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: "320px" }}>
              <img
                src={KITCHEN_IMG}
                alt="CHEWS kuhinja"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05) saturate(0.95)" }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "oklch(0.14 0.025 45 / 0.55)" }}
              >
                <div className="text-center">
                  <Flame size={40} style={{ color: "var(--chews-orange)", marginBottom: "1rem" }} />
                  <p
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.018 80)" }}
                  >
                    Svaki burger se pravi pred tvojim očima
                  </p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--muted-foreground)" }}
              >
                Nema misterije. Nema "kuhinje" gde se stvari dešavaju. Vidiš kako se meso pečeni,
                kako se brioche tostira, kako se sve slaže. To je naša transparentnost.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Sveže meso",
                    desc: "Svaki dan — novo meso, nova pripremanja. Nema zamrznutog.",
                  },
                  {
                    title: "Brioche koji se tostira",
                    desc: "Topao, hrskav, sa blagim maslom. Svaki put isti.",
                  },
                  {
                    title: "Sastojci koji se slažu",
                    desc: "Povrće, sos, sir — sve se pravi sa pažnjom.",
                  },
                  {
                    title: "Čekanje je deo iskustva",
                    desc: "15–20 minuta čekanja znači da je tvoj burger upravo sada spreman.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                    }}
                  >
                    <h4
                      className="font-bold mb-1"
                      style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── THE EXPERIENCE ── */}
      <Section id="iskustvo" className="py-20 border-b border-[oklch(0.86_0.018_65)]">
        <div className="container">
          <div className="mb-12">
            <div className="section-label mb-3">Iskustvo</div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
            >
              Šta očekuješ kada dođeš
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Clock size={20} />}
              title="Transparentnost čekanja"
              description="Kada naručiš, odmah ćeš znati koliko će trajati. Nema iznenađenja, samo čekanja sa razlogom — jer se tvoj burger pravi upravo sada."
              delay="delay-100"
            />
            <FeatureCard
              icon={<Heart size={20} />}
              title="Ljubaznost"
              description="Naš tim je tu da ti pomogne. Pitanja, preporuke, specijalne želje — sve je moguće. Osećaćeš se kao kod kuće."
              delay="delay-200"
            />
            <FeatureCard
              icon={<Utensils size={20} />}
              title="Kvalitet"
              description="Svaki zalogaj je pažljivo napravljen. Nema kompromisa. To je ono što te čini da se vraćaš."
              delay="delay-300"
            />
          </div>

          {/* Why wait */}
          <div
            className="mt-12 p-8 text-center"
            style={{
              border: "2px solid var(--chews-orange)",
              background: "oklch(0.52 0.155 38 / 0.06)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
            >
              Zašto čekati?
            </h3>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
              Jer <strong style={{ color: "var(--chews-dark)" }}>pravi ukus ne može da se požuri</strong>. 
              Čekanje od 15–20 minuta nije problem — to je garantija da je tvoj burger upravo sada spreman, 
              sa svežim sastojcima i pažljom. To je razlika između brzine i kvaliteta. 
              Mi biramo kvalitet.
            </p>
          </div>
        </div>
      </Section>

      {/* ── MENU ── */}
      <Section id="meni" className="py-20 border-b border-[oklch(0.86_0.018_65)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Menu */}
            <div className="lg:col-span-3">
              <div className="section-label mb-3">Meni</div>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
              >
                Odaberi svoj burger
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted-foreground)" }}>
                Svaki burger je napravljen sa istim zanatom i pažnjom. Razlika je samo u topinjima.
              </p>

              {/* Burgers */}
              <div
                className="mb-6 p-5"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
              >
                <div className="section-label mb-4">Burgeri</div>
                <MenuItem
                  name="CHEWS Classic"
                  price="550 RSD"
                  tag="Bestseller"
                  isHero
                />
                <MenuItem
                  name="Double Smash"
                  price="750 RSD"
                  tag="Za veći apetit"
                />
                <MenuItem
                  name="Crispy Chicken"
                  price="650 RSD"
                  tag="Alternativa"
                />
                <MenuItem
                  name="Mushroom Swiss"
                  price="700 RSD"
                  tag="Premium"
                />
                <MenuItem
                  name="CHEWS Junior"
                  price="450 RSD"
                  tag="Manji apetit"
                />
              </div>

              {/* Sides */}
              <div
                className="mb-6 p-5"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
              >
                <div className="section-label mb-4">Strane</div>
                <MenuItem
                  name="Pomfrit (mali/veliki)"
                  price="200/300 RSD"
                  tag="Klasik"
                />
                <MenuItem
                  name="Coleslaw"
                  price="180 RSD"
                  tag="Svež"
                />
              </div>

              {/* Drinks */}
              <div
                className="p-5"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
              >
                <div className="section-label mb-4">Piće</div>
                <MenuItem
                  name="Domaća limonada"
                  price="200 RSD"
                  tag="Signature"
                />
                <MenuItem
                  name="Gazirana pića"
                  price="150 RSD"
                  tag="Standardno"
                />
              </div>
            </div>

            {/* Right: Why this menu */}
            <div className="lg:col-span-2 space-y-6">
              <div
                className="p-6"
                style={{ background: "var(--chews-dark)", color: "white" }}
              >
                <div className="section-label mb-4" style={{ color: "var(--chews-gold)" }}>
                  Zašto je meni mali?
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.72 0.015 65)" }}>
                  Jer <strong style={{ color: "oklch(0.92 0.012 75)" }}>fokus na kvalitet</strong> znači
                  manje opcija. Svaki burger je savršen. Nema "filler" stavki.
                </p>
                <div className="space-y-3">
                  {[
                    "Svaki burger se pravi sa istim zanatlijom",
                    "Svaki je spreman u isto vreme",
                    "Svaki ima istu pažnju i kvalitet",
                    "Nema čekanja na nešto što nije na meniju",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--chews-orange)" }}
                      />
                      <span className="text-xs leading-relaxed" style={{ color: "oklch(0.65 0.015 65)" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instagram */}
              <div
                className="p-6"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
              >
                <div className="section-label mb-4">Prati nas</div>
                <img
                  src={INSTAGRAM_IMG}
                  alt="CHEWS Instagram"
                  className="w-full mb-4 object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
                <div className="flex items-center gap-2 mb-3">
                  <Instagram size={14} style={{ color: "var(--chews-orange)" }} />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--chews-dark)", fontFamily: "var(--font-body)" }}
                  >
                    @chews.novisad
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  Svakodnevne fotografije iz kuhinje, recenzije gostiju, i priče iza svakog burgera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── WHERE TO FIND ── */}
      <Section
        id="gde"
        className="py-20 border-b border-[oklch(0.86_0.018_65)]"
        style={{ background: "oklch(0.93 0.012 75)" } as React.CSSProperties}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="section-label mb-3">Gde nas pronađeš</div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
            >
              Dolazimo do tebe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="p-6 text-center lift-card"
              style={{ border: "1px solid var(--border)", background: "var(--card)" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.52 0.155 38 / 0.12)", color: "var(--chews-orange)" }}
              >
                <MapPin size={20} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
              >
                Fizička lokacija
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                Bulevar Oslobođenja 12, Novi Sad
              </p>
              <CTAButton label="Otkrij na Maps" href="https://maps.google.com" variant="secondary" />
            </div>

            <div
              className="p-6 text-center lift-card"
              style={{ border: "1px solid var(--border)", background: "var(--card)" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.52 0.155 38 / 0.12)", color: "var(--chews-orange)" }}
              >
                <TrendingUp size={20} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
              >
                Wolt dostava
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                Dostava do tvoje kuće — brzo i sigurno
              </p>
              <CTAButton label="Naruči na Wolt-u" href="https://wolt.com" variant="secondary" />
            </div>

            <div
              className="p-6 text-center lift-card"
              style={{ border: "1px solid var(--border)", background: "var(--card)" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.52 0.155 38 / 0.12)", color: "var(--chews-orange)" }}
              >
                <Instagram size={20} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--chews-dark)" }}
              >
                Prati nas
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                Svakodnevne fotografije i priče iz kuhinje
              </p>
              <CTAButton label="Instagram" href="https://instagram.com" variant="secondary" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── CLOSING ── */}
      <Section
        className="py-20"
        style={{ background: "var(--chews-dark)" } as React.CSSProperties}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <MessageSquare
              size={32}
              className="mx-auto mb-6"
              style={{ color: "var(--chews-orange)" }}
            />
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.018 80)" }}
            >
              "Pravi ukus
              <br />
              <em className="italic" style={{ color: "var(--chews-orange)" }}>
                ne može da se požuri.
              </em>
              "
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "oklch(0.72 0.015 65)" }}>
              Čekanje od 15–20 minuta je garantija da je tvoj burger upravo sada spreman,
              sa svežim sastojcima i pažnjom. To je razlika između brzine i kvaliteta.
              Mi biramo kvalitet.
            </p>
            <div className="editorial-divider mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton label="Naruči sada" href="https://wolt.com" variant="primary" />
              <CTAButton label="Pronađi nas" href="https://maps.google.com" variant="secondary" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 border-t"
        style={{
          borderColor: "oklch(0.86 0.018 65)",
          background: "var(--card)",
        }}
      >
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 flex items-center justify-center text-xs font-black"
              style={{
                background: "var(--chews-orange)",
                color: "white",
                fontFamily: "var(--font-display)",
                clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
              }}
            >
              C
            </div>
            <span
              className="text-xs tracking-widest"
              style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}
            >
              CHEWS · Artizanski Burgeri · Novi Sad
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} style={{ color: "var(--chews-orange)" }} />
            <span
              className="text-xs"
              style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
            >
              Bulevar Oslobođenja 12, Novi Sad
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
