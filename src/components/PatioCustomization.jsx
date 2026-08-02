import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  paper: "#FAF8F4",
  paperAlt: "#F1ECE3",
  line: "rgba(20,24,28,0.1)",
};

const IMAGES = {
  poolLounge:
    "https://res.cloudinary.com/dwdekki8t/image/upload/v1785572768/881d1250-c9ea-4039-a89d-95efc0d1fa91.png",
  louverAngle:
    "https://res.cloudinary.com/dwdekki8t/image/upload/v1785572840/a0c2775b-8953-41fb-86ba-ce1a66f3f391.png",
  louverClose:
    "https://res.cloudinary.com/dwdekki8t/image/upload/v1785572899/693650aa-bf29-4f3b-82b3-c2fa5765cfd7.png",
  outdoorKitchen:
    "https://res.cloudinary.com/dwdekki8t/image/upload/v1785572968/5d3ee32c-b901-4b82-89a5-ddeb9f43381b.png",
};

/* Fades a block up into place the first time it enters the viewport */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8" style={{ backgroundColor: COLORS.ember }} />
      <span
        className="pa-mono text-xs tracking-[0.22em]"
        style={{ color: COLORS.ember }}
      >
        {children}
      </span>
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
        style={{ backgroundColor: COLORS.ink }}
      >
        <Check
          className="h-3 w-3"
          style={{ color: COLORS.glow }}
          strokeWidth={3}
        />
      </span>
      <span
        className="pa-body text-base leading-relaxed"
        style={{ color: COLORS.inkSoft }}
      >
        {children}
      </span>
    </li>
  );
}

function Button({ children, variant = "solid" }) {
  const base =
    "pa-body inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300";
  if (variant === "solid") {
    return (
      <button
        className={`${base} hover:-translate-y-0.5 hover:shadow-lg`}
        style={{ backgroundColor: COLORS.ember, color: "#fff" }}
      >
        {children}
        <ArrowRight className="h-4 w-4" />
      </button>
    );
  }
  return (
    <button
      className={`${base} border hover:-translate-y-0.5`}
      style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

const upgrades = [
  "LED lighting — color-changing, recessed, or linear post lights",
  "Outdoor-rated ceiling fans in woodgrain or matte finishes",
  "Built-in heaters, recessed or mounted",
  "Retractable privacy & sun shades, motorized options available",
  "Integrated AV setups — TVs, speakers, and more",
  "Stone or tile accent walls with fireplaces",
  "Smart climate control & lighting with app or voice integration",
  "Motorized louvers and privacy screens for tailored comfort",
];

export default function PatioCustomization() {
  return (
    <div style={{ backgroundColor: COLORS.paperAlt }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      {/* Section 1 — Built-in Customizations */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Make It Yours</Eyebrow>
            <h2
              className="pa-display text-4xl leading-[1.1] sm:text-5xl"
              style={{ color: COLORS.ink }}
            >
              Built-in customizations to make it your own
            </h2>
            <p
              className="pa-body mt-6 max-w-md text-lg leading-relaxed"
              style={{ color: COLORS.inkSoft }}
            >
              Every project can be tailored with optional upgrades like:
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {upgrades.map((u, i) => (
                <CheckItem key={i}>{u}</CheckItem>
              ))}
            </ul>
            <Link to="/contact">
              <div className="mt-9">
                <Button>Tell Us About Your Project</Button>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.poolLounge}
                  alt="Aluminum patio cover overlooking a pool at sunset"
                  className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[360px]"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.louverAngle}
                  alt="Louvered patio cover with linear LED trim"
                  className="h-[180px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[220px]"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.louverClose}
                  alt="Close-up of illuminated aluminum louvers"
                  className="h-[180px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[220px]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3 — Cantilevered Covers */}
      <section style={{ backgroundColor: COLORS.paper }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.outdoorKitchen}
                  alt="Cantilevered aluminum patio cover with no support posts"
                  className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[500px]"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <Eyebrow>No Posts, Full Views</Eyebrow>
              <h2
                className="pa-display text-4xl leading-[1.1] sm:text-5xl"
                style={{ color: COLORS.ink }}
              >
                Cantilevered aluminum patio covers
              </h2>
              <p
                className="pa-body mt-6 text-lg leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                Cantilever pergolas deliver full shade and modern style with no
                posts blocking your view — perfect for pools, patios, and tight
                spaces. Our custom-engineered, extruded aluminum structures are
                non-combustible, fully permitted, and built to handle
                California's wind and fire codes.
              </p>
              <p
                className="pa-body mt-4 text-lg leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                Choose from motorized louvered or solid roof options, with
                upgrades like integrated lighting, heaters, privacy screens, and
                smart controls.
              </p>

             
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
