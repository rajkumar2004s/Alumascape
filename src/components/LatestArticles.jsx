import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { articles } from "../data/articles";

const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  paper: "#f7eede",
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

function ArticleCard({ article, delay }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/blog/${article.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={article.image}
            alt={article.title}
            className="h-60 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(0deg, rgba(20,24,28,0.75) 0%, rgba(20,24,28,0) 60%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="pa-mono inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-white">
              READ ARTICLE
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <h3
          className="pa-display mt-5 text-xl leading-snug transition-colors duration-300 group-hover:opacity-80"
          style={{ color: COLORS.ink }}
        >
          {article.title}
        </h3>

        <div
          className="mt-4 flex items-center border-t pt-3"
          style={{ borderColor: COLORS.line }}
        >
          <span
            className="pa-mono text-xs tracking-[0.1em]"
            style={{ color: COLORS.inkSoft }}
          >
            {article.date.toUpperCase()}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Articles() {
  return (
    <section style={{ backgroundColor: COLORS.paper }} id="latest">
      <style>{`
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <Reveal>
          <div className="flex items-center gap-6">
            <h2
              className="pa-display whitespace-nowrap text-3xl sm:text-4xl"
              style={{ color: COLORS.ink }}
            >
              Latest <span style={{ color: COLORS.ember }}>Articles</span>
            </h2>
            <span
              className="h-px w-full"
              style={{ backgroundColor: COLORS.line }}
            />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} delay={0.06 * (i % 3)} />
          ))}
        </div>
      </div>
    </section>
  );
}
