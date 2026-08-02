import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { areas } from "../data/areas";

const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  dusk: "#2A3B4D",
  paper: "#FAF8F4",
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
      { threshold: 0.15 }
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

function AreaCard({ area, delay }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/areas/${area.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={area.cardImage}
            alt={area.name}
            className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            style={{
              background: "linear-gradient(0deg, rgba(20,24,28,0.85) 0%, rgba(20,24,28,0.1) 60%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="pa-mono inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-white">
              VIEW AREA
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <FiMapPin className="h-4 w-4" style={{ color: COLORS.ember }} />
          <h3 className="pa-display text-xl" style={{ color: COLORS.ink }}>
            {area.name}
          </h3>
        </div>
        <p className="pa-body mt-2 text-sm leading-relaxed" style={{ color: COLORS.inkSoft }}>
          {area.cardBlurb}
        </p>
      </Link>
    </Reveal>
  );
}

export default function AreasWeServed() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      {/* Hero — no photo, gradient panel */}
      <section
        className="px-6 py-20 text-center sm:px-10 sm:py-24"
        style={{ background: `linear-gradient(160deg, ${COLORS.dusk} 0%, ${COLORS.ink} 100%)` }}
      >
        <Reveal className="mx-auto max-w-2xl">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: COLORS.ember }} />
            <span className="pa-mono text-xs tracking-[0.22em]" style={{ color: COLORS.ember }}>
              Areas We Serve
            </span>
            <span className="h-px w-8" style={{ backgroundColor: COLORS.ember }} />
          </div>
          <h1 className="pa-display text-4xl leading-[1.1] text-white sm:text-5xl">
            Built for your neighborhood
          </h1>
          <p className="pa-body mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Custom aluminum patio covers designed for the architecture, HOA
            standards, and lifestyle of Southern California's most sought
            after communities.
          </p>
        </Reveal>
      </section>

      {/* Area grid */}
      <section style={{ backgroundColor: COLORS.paper }}>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a, i) => (
              <AreaCard key={a.slug} area={a} delay={0.07 * (i % 3)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}