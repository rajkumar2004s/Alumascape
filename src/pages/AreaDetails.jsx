import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { areas } from "../data/areas";
// import { Link } from "react-router-dom";
const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  dusk: "#2A3B4D",
  paper: "#FAF8F4",
  paperAlt: "#F1ECE3",
  line: "rgba(20,24,28,0.12)",
};

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
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
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
        <FiCheck
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

function Button({ children }) {
  return (
    <button
      className="pa-body inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ backgroundColor: COLORS.ember }}
    >
      {children}
      <FiArrowRight className="h-4 w-4" />
    </button>
  );
}

export default function AreaDetails() {
  const { slug } = useParams();
  const area = areas.find((a) => a.slug === slug);

  if (!area) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="pa-display text-3xl" style={{ color: COLORS.ink }}>
          Area not found
        </h1>
        <Link
          to="/areas"
          className="pa-body mt-4 inline-block"
          style={{ color: COLORS.ember }}
        >
          ← Back to all areas
        </Link>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      {/* Hero */}
      <section style={{ backgroundColor: COLORS.paper }}>
        <div className="mx-auto max-w-7xl px-6 pt-10 sm:px-10 lg:px-16">
          <Link
            to="/areas"
            className="pa-body inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:opacity-70"
            style={{ color: COLORS.inkSoft }}
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to all areas
          </Link>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={area.hero.image}
                  alt={area.name}
                  className="h-[380px] w-full object-cover sm:h-[460px]"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <Eyebrow>{area.name}</Eyebrow>
              <h1
                className="pa-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl"
                style={{ color: COLORS.ink }}
              >
                {area.hero.title}
              </h1>
              <div className="mt-6 space-y-4">
                {area.hero.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="pa-body text-base leading-relaxed sm:text-lg"
                    style={{ color: COLORS.inkSoft }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why aluminum */}
      <section style={{ backgroundColor: COLORS.paperAlt }}>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={area.why.image}
                  alt={area.why.title}
                  className="h-[380px] w-full object-cover sm:h-[440px]"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <Eyebrow>Built to Last</Eyebrow>
              <h2
                className="pa-display text-3xl leading-[1.1] sm:text-4xl"
                style={{ color: COLORS.ink }}
              >
                {area.why.title}
              </h2>
              <p
                className="pa-body mt-6 max-w-md text-lg leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                {area.why.intro}
              </p>
              <ul className="mt-7 space-y-4">
                {area.why.list.map((item, i) => (
                  <CheckItem key={i}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Styles */}
      <section style={{ backgroundColor: COLORS.paper }}>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>Find Your Fit</Eyebrow>
              <h2
                className="pa-display text-3xl leading-[1.1] sm:text-4xl"
                style={{ color: COLORS.ink }}
              >
                {area.styles.title}
              </h2>

              <div
                className="mt-8 flex flex-col divide-y"
                style={{ borderColor: COLORS.line }}
              >
                {area.styles.items.map((s, i) => (
                  <div key={s.title} className="py-6 first:pt-0">
                    <h3
                      className="pa-mono text-xs tracking-[0.1em]"
                      style={{ color: COLORS.ember }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </h3>
                    <h4
                      className="pa-display mt-1 text-xl"
                      style={{ color: COLORS.ink }}
                    >
                      {s.title}
                    </h4>
                    <p
                      className="pa-body mt-2 text-base leading-relaxed"
                      style={{ color: COLORS.inkSoft }}
                    >
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/patio-covers">
                <div className="mt-8">
                  <Button>Find Out More</Button>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={area.styles.image}
                  alt={area.styles.title}
                  className="h-[420px] w-full object-cover sm:h-[560px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ backgroundColor: COLORS.paperAlt }}>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 overflow-hidden rounded-2xl">
                  <img
                    src={area.addOns.images[0]}
                    alt={area.addOns.title}
                    className="h-[280px] w-full object-cover sm:h-[340px]"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={area.addOns.images[1]}
                    alt=""
                    className="h-[160px] w-full object-cover sm:h-[200px]"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={area.addOns.images[2]}
                    alt=""
                    className="h-[160px] w-full object-cover sm:h-[200px]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <Eyebrow>Make It Yours</Eyebrow>
              <h2
                className="pa-display text-3xl leading-[1.1] sm:text-4xl"
                style={{ color: COLORS.ink }}
              >
                {area.addOns.title}
              </h2>
              {area.addOns.intro && (
                <p
                  className="pa-body mt-5 max-w-md text-lg leading-relaxed"
                  style={{ color: COLORS.inkSoft }}
                >
                  {area.addOns.intro}
                </p>
              )}
              <ul className="mt-7 space-y-4">
                {area.addOns.list.map((item, i) => (
                  <CheckItem key={i}>{item}</CheckItem>
                ))}
              </ul>
              <Link to="/contact">
                <div className="mt-8">
                  <Button>{area.addOns.cta}</Button>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Install / turnkey process — optional per area */}
      {area.install && (
        <section style={{ backgroundColor: COLORS.paper }}>
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <Eyebrow>How It Works</Eyebrow>
                <h2
                  className="pa-display text-3xl leading-[1.1] sm:text-4xl"
                  style={{ color: COLORS.ink }}
                >
                  {area.install.title}
                </h2>

                {area.install.intro && (
                  <p
                    className="pa-body mt-5 max-w-md text-lg leading-relaxed"
                    style={{ color: COLORS.inkSoft }}
                  >
                    {area.install.intro}
                  </p>
                )}

                {area.install.list ? (
                  <ul className="mt-7 space-y-4">
                    {area.install.list.map((step, i) => (
                      <CheckItem key={i}>
                        <span
                          className="font-semibold"
                          style={{ color: COLORS.ink }}
                        >
                          {step.label}
                        </span>{" "}
                        — {step.text}
                      </CheckItem>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="pa-body mt-5 max-w-md text-lg leading-relaxed"
                    style={{ color: COLORS.inkSoft }}
                  >
                    {area.install.text}
                  </p>
                )}
              </Reveal>

              <Reveal delay={0.15}>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={area.install.image}
                    alt={area.install.title}
                    className="h-[380px] w-full object-cover sm:h-[440px]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
