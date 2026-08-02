import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import LatestArticles from "../components/LatestArticles";
import { HashLink } from "react-router-hash-link";
import GetAQuote from "../components/GetAQuote";
const COLORS = {
  ink: "#14181C",
  dusk: "#2A3B4D",
  ember: "#C4622D",
  glow: "#F2B75C",
  paper: "#FAF8F4",
};

const PHOTOS = {
  wideTopLeft:
    "https://alumascape.com/wp-content/uploads/2025/05/project2-1.jpg",
  smallTopRight:
    "https://alumascape.com/wp-content/uploads/2025/05/project3-1.jpg",
  wideBottom:
    "https://alumascape.com/wp-content/uploads/2025/05/project5-5.jpg",
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Cell({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.96)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Photo({ src, alt }) {
  return (
    <div className="group h-full w-full overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </div>
  );
}

export default function BlogHero() {
  return (
    <section style={{ backgroundColor: COLORS.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }

        .bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 220px);
          gap: 1rem;
        }
        .bento-head  { grid-column: 1 / 3; grid-row: 1 / 3; }
        .bento-small { grid-column: 3 / 4; grid-row: 1 / 2; }
        .bento-tall  { grid-column: 4 / 5; grid-row: 1 / 3; }
        .bento-wide  { grid-column: 3 / 4; grid-row: 2 / 3; }

        @media (max-width: 1024px) {
          .bento { grid-template-columns: repeat(2, 1fr); grid-template-rows: none; }
          .bento-head  { grid-column: 1 / 3; grid-row: auto; }
          .bento-small { grid-column: 1 / 2; grid-row: auto; }
          .bento-tall  { grid-column: 2 / 3; grid-row: span 2; }
          .bento-wide  { grid-column: 1 / 2; grid-row: auto; }
        }

        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="bento">
          <Cell className="bento-head">
            <div
              className="flex h-full flex-col justify-center rounded-2xl px-8 py-10 sm:px-10"
              style={{
                background: `linear-gradient(150deg, ${COLORS.dusk} 0%, ${COLORS.ink} 100%)`,
              }}
            >
              <span
                className="pa-mono mb-4 text-xs tracking-[0.22em]"
                style={{ color: COLORS.glow }}
              >
                INSIGHTS &amp; IDEAS
              </span>
              <h1 className="pa-display text-3xl leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]">
                Our{" "}
                <span className="italic" style={{ color: COLORS.glow }}>
                  Blog
                </span>
              </h1>
              <p className="pa-body mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                Discover design inspiration, expert tips, and the latest trends
                in outdoor living with our custom aluminum pergola blog —
                bringing your backyard vision to life.
              </p>
              <HashLink
                smooth
                to="/blog#latest"
                className="pa-body mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: COLORS.ember }}
              >
                Read the Latest
                <FiArrowRight className="h-4 w-4" />
              </HashLink>
            </div>
          </Cell>

          <Cell delay={0.1} className="bento-small">
            <Photo
              src={PHOTOS.smallTopRight}
              alt="Louvered patio cover over a modern lounge"
            />
          </Cell>
          <Cell delay={0.18} className="bento-tall">
            <Photo
              src={PHOTOS.wideTopLeft}
              alt="Two-story home with an aluminum patio cover"
            />
          </Cell>
          <Cell delay={0.26} className="bento-wide">
            <Photo
              src={PHOTOS.wideBottom}
              alt="Illuminated louvered pergola over an outdoor kitchen"
            />
          </Cell>
        </div>
      </div>
      <LatestArticles id="latest" />
      <GetAQuote />
    </section>
  );
}
