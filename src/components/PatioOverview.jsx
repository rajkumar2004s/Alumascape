import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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
  backyard:
    "https://res.cloudinary.com/dwdekki8t/image/upload/v1785490748/84b4f3b5-995f-46a6-aa3b-d062bc2cf549.png",
  fireSafe:
    "https://res.cloudinary.com/dwdekki8t/image/upload/v1785572648/f21d0853-8e81-496f-8a13-69d142758350.png",
  styles:
    "https://res.cloudinary.com/dwdekki8t/image/upload/v1785572695/919ec5f4-8935-443c-85c2-38d757024b4c.png",
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
      style={{ borderColor: COLORS.ink, color: COLORS.ink }}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

const styleCards = [
  {
    tag: "01",
    title: "Louvered Aluminum Patio Covers",
    meta: "Motorized",
    copy: "Our most popular system. Adjust the amount of sun or shade with a remote or phone app. Durable, aircraft-grade aluminum that looks stunning and works hard.",
  },
  {
    tag: "02",
    title: "Solid Roof Aluminum Covers",
    meta: "Fixed Roof",
    copy: "Permanent shade, clean lines, and no moving parts. A great choice for those who want simplicity without sacrificing quality — roughly 25% more affordable than louvered systems.",
  },
  {
    tag: "03",
    title: "Lattice Covers",
    meta: "Classic",
    copy: "Classic look with a modern twist. Provides filtered shade and style using the same durable, low-maintenance aluminum material.",
  },
];

export default function PatioOverview() {
  return (
    <div style={{ backgroundColor: COLORS.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      {/* Section 1 — Turn Your Backyard */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={IMAGES.backyard}
                alt="Modern aluminum patio cover with outdoor kitchen at dusk"
                className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[520px]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Eyebrow>Custom Aluminum Pergolas</Eyebrow>
            <h2
              className="pa-display text-4xl leading-[1.1] sm:text-5xl"
              style={{ color: COLORS.ink }}
            >
              Turn your backyard into a stylish outdoor space
            </h2>
            <p
              className="pa-body mt-6 text-lg leading-relaxed"
              style={{ color: COLORS.inkSoft }}
            >
              At Alumascape, we specialize in custom aluminum patio covers that
              do more than provide shade — they redefine how you use your
              backyard.
            </p>

            <div
              className="mt-8 grid gap-6 border-t pt-8 sm:grid-cols-2"
              style={{ borderColor: COLORS.line }}
            >
              <p
                className="pa-body text-sm leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                Whether you're hosting guests, relaxing after work, or
                protecting your property from sun and fire risk, our louvered
                and solid roof systems are built to deliver.
              </p>
              <p
                className="pa-body text-sm leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                We serve homeowners across Southern California where fire
                regulations are changing how people build outdoor structures —
                fully engineered, permitted, and installed by our own team.
              </p>
            </div>

            <HashLink smooth to="/#project-ideas">
              <div className="mt-9">
                <Button variant="outline">See Our Previous Work</Button>
              </div>
            </HashLink>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Why Aluminum over Wood */}
      <section style={{ backgroundColor: COLORS.paperAlt }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>Built to Last</Eyebrow>
              <h2
                className="pa-display text-4xl leading-[1.1] sm:text-5xl"
                style={{ color: COLORS.ink }}
              >
                Why more homeowners are replacing wood with aluminum
              </h2>
              <p
                className="pa-body mt-6 max-w-md text-lg leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                If you're in a fire hazard zone, your insurer may already be
                requiring you to remove wood structures. Our extruded aluminum
                patio covers are a smart, beautiful solution.
              </p>

              <ul className="mt-8 space-y-4">
                <CheckItem>Non-combustible and fire-safe</CheckItem>
                <CheckItem>Low maintenance</CheckItem>
                <CheckItem>
                  Long-lasting finish with a 15-year powder coat warranty
                </CheckItem>
                <CheckItem>Modern design with motorized options</CheckItem>
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.fireSafe}
                  alt="Aluminum patio cover with integrated lighting at sunset"
                  className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[500px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 3 — Three Styles */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>
            <span className="mx-auto">Find Your Fit</span>
          </Eyebrow>
          <h2
            className="pa-display text-4xl leading-[1.1] sm:text-5xl"
            style={{ color: COLORS.ink }}
          >
            Three patio cover styles to fit your home and budget
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={IMAGES.styles}
                alt="Louvered aluminum roof glowing at dusk"
                className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-full"
              />
            </div>
          </Reveal>

          <div
            className="flex flex-col divide-y"
            style={{ borderColor: COLORS.line }}
          >
            {styleCards.map((s, i) => (
              <Reveal
                key={s.tag}
                delay={0.15 + i * 0.1}
                className="py-7 first:pt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="pa-mono text-sm"
                    style={{ color: COLORS.ember }}
                  >
                    {s.tag}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3
                        className="pa-display text-2xl"
                        style={{ color: COLORS.ink }}
                      >
                        {s.title}
                      </h3>
                      <span
                        className="pa-mono rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.15em]"
                        style={{
                          backgroundColor: COLORS.ink,
                          color: COLORS.glow,
                        }}
                      >
                        {s.meta}
                      </span>
                    </div>
                    <p
                      className="pa-body mt-3 text-base leading-relaxed"
                      style={{ color: COLORS.inkSoft }}
                    >
                      {s.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Link to="/patio-covers">
              <Reveal delay={0.5} className="pt-7">
                <Button>Find Out More</Button>
              </Reveal> 
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
