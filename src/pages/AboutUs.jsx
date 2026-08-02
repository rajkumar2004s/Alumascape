import { useEffect, useRef, useState } from "react";
import { FiStar } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  dusk: "#2A3B4D",
  paper: "#FAF8F4",
  paperAlt: "#F1ECE3",
  line: "rgba(20,24,28,0.1)",
  lineLight: "rgba(255,255,255,0.15)",
};

const IMAGES = {
  hero: "https://alumascape.com/wp-content/uploads/2025/05/project9-3.jpg",
  refined: "https://alumascape.com/wp-content/uploads/2025/05/project6-7.jpg",
  turnkey:
    "https://alumascape.com/wp-content/uploads/2025/05/alumascape-112.jpg",
};

const STATS = [
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "15-YR", label: "Warranty Coverage" },
];

const REVIEWS = [
  {
    initial: "D",
    color: "#B0492A",
    name: "Denisa Valastiakova",
    time: "1 year ago",
    text: "Our new aluminum pergola looks fantastic and keeps the patio nicely shaded. The crew finished right on schedule.",
  },
  {
    initial: "E",
    color: "#1F6F5C",
    name: "E Phillips",
    time: "1 year ago",
    text: "A genuinely reputable, knowledgeable team — I'd point anyone looking for a landscape contractor their way.",
  },
  {
    initial: "D",
    color: "#1F6F5C",
    name: "Don Webb",
    time: "1 year ago",
    text: "Our backyard transformation still gets compliments three years later. Modern, well-built, and it shows.",
  },
  {
    initial: "J",
    color: "#B0492A",
    name: "Jesse Waite",
    time: "1 year ago",
    text: "We've worked with this team for years — the pergola they installed for us in Newport Beach is top-notch.",
  },
];

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
      { threshold: 0.15 },
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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, center = false, light = false }) {
  return (
    <div
      className={`mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}
    >
      <span
        className="h-px w-8"
        style={{ backgroundColor: light ? COLORS.glow : COLORS.ember }}
      />
      <span
        className="pa-mono text-xs tracking-[0.22em]"
        style={{ color: light ? COLORS.glow : COLORS.ember }}
      >
        {children}
      </span>
      {center && (
        <span
          className="h-px w-8"
          style={{ backgroundColor: light ? COLORS.glow : COLORS.ember }}
        />
      )}
    </div>
  );
}

function Button({ children }) {
  return (
    <button
      className="pa-body inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ backgroundColor: COLORS.ember }}
    >
      {children}
    </button>
  );
}

export default function AboutPage() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Hero — split panel, no photo behind the text */}
      <section className="flex min-h-screen flex-col lg:flex-row">
        {/* Text panel */}
        <div
          className="flex w-full flex-col justify-center px-8 py-20 sm:px-12 lg:w-1/2 lg:px-16 lg:py-0 xl:px-20"
          style={{
            background: `linear-gradient(160deg, ${COLORS.dusk} 0%, ${COLORS.ink} 100%)`,
          }}
        >
          <Reveal>
            <Eyebrow light>Our Story</Eyebrow>
            <h1 className="pa-display text-4xl leading-[1.1] text-white sm:text-5xl">
              Passion for outdoor living,
              <br />
              <span className="italic" style={{ color: COLORS.glow }}>
                built on experience.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="pa-body mt-7 max-w-md text-base leading-relaxed text-white/70">
              I'm Joseph, the owner of Alumascape. After 25+ years building
              high-end pools, landscapes, and full-scale outdoor living
              environments, I wanted to create something simpler, faster, and
              just as impactful.
            </p>
            <p className="pa-body mt-4 max-w-md text-base leading-relaxed text-white/70">
              Alumascape was born out of the need for a luxury product that
              doesn't require months of permitting headaches and construction
              delays.
            </p>
          </Reveal>

          {/* Blueprint-style spec numbers */}
          <Reveal delay={0.3}>
            <div
              className="mt-10 flex max-w-md gap-8 border-t pt-7"
              style={{ borderColor: COLORS.lineLight }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={i > 0 ? "border-l pl-8" : ""}
                  style={{ borderColor: COLORS.lineLight }}
                >
                  <div className="pa-mono text-xl text-white sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="pa-body mt-1 text-xs uppercase tracking-[0.1em] text-white/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Photo panel — single static image, no overlay text */}
        <div className="h-[380px] w-full lg:h-auto lg:w-1/2">
          <Reveal delay={0.1} className="h-full">
            <img
              src={IMAGES.hero}
              alt="Aluminum patio cover overlooking a Southern California hillside at sunset"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Refined & engineered */}
      <section style={{ backgroundColor: COLORS.paper }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.refined}
                  alt="Aluminum pergola with outdoor kitchen overlooking city lights at sunset"
                  className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[480px]"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <Eyebrow>Architecturally Refined</Eyebrow>
              <p
                className="pa-body text-xl leading-relaxed"
                style={{ color: COLORS.ink }}
              >
                With Alumascape, we focus on high-quality, architecturally
                refined aluminum patio covers that are quick to install,
                beautiful to look at, and engineered for longevity.
              </p>
              <p
                className="pa-body mt-6 text-lg leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                We're based in Orange County and know exactly how to build for
                the region's unique blend of aesthetic expectations, climate
                considerations, fire codes, and HOA restrictions.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Turnkey experience */}
      <section style={{ backgroundColor: COLORS.paperAlt }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>Turnkey, Top to Bottom</Eyebrow>
              <p
                className="pa-body text-xl leading-relaxed"
                style={{ color: COLORS.ink }}
              >
                Whether you're building a backyard sanctuary or a luxury outdoor
                entertainment space, you'll get our full attention from design
                to final walkthrough.
              </p>
              <p
                className="pa-body mt-6 text-lg leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                We provide a turnkey experience with high-touch service,
                meticulous craftsmanship, and absolute professionalism.
              </p>
              <Link to="/contact">
              <div className="mt-8">
                <Button>Request a Consultation</Button>
              </div>
              </Link>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.turnkey}
                  alt="Aluminum pergola with linear lighting over a poolside lounge at dusk"
                  className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[480px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ backgroundColor: COLORS.paper }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
          <Reveal className="mx-auto max-w-xl text-center">
            <Eyebrow center>Reviews</Eyebrow>
            <h2
              className="pa-display text-4xl leading-[1.1] sm:text-5xl"
              style={{ color: COLORS.ink }}
            >
              What our customers are saying
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={0.08 * i}>
                <div
                  className="flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: COLORS.paperAlt }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex gap-0.5"
                      style={{ color: COLORS.ember }}
                    >
                      {Array.from({ length: 5 }).map((_, s) => (
                        <FiStar key={s} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <FaGoogle
                      className="h-4 w-4"
                      style={{ color: COLORS.inkSoft }}
                    />
                  </div>

                  <p
                    className="pa-body mt-4 flex-1 text-sm leading-relaxed"
                    style={{ color: COLORS.inkSoft }}
                  >
                    {r.text}
                  </p>

                  <div
                    className="mt-6 flex items-center gap-3 border-t pt-4"
                    style={{ borderColor: COLORS.line }}
                  >
                    <span
                      className="pa-body flex h-9 w-9 flex-none items-center justify-center rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: r.color }}
                    >
                      {r.initial}
                    </span>
                    <div>
                      <p
                        className="pa-body text-sm font-semibold"
                        style={{ color: COLORS.ink }}
                      >
                        {r.name}
                      </p>
                      <p
                        className="pa-body text-xs"
                        style={{ color: COLORS.inkSoft }}
                      >
                        {r.time}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
