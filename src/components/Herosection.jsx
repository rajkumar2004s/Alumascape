import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const slides = [
  "https://res.cloudinary.com/dwdekki8t/image/upload/v1785489648/3f435b35-8044-4c03-a424-87fd253e412e.png",
  "https://res.cloudinary.com/dwdekki8t/image/upload/v1785489604/22f82214-5f4a-4a81-ad0d-860c29438212.png",
  "https://res.cloudinary.com/dwdekki8t/image/upload/v1785490748/84b4f3b5-995f-46a6-aa3b-d062bc2cf549.png",
];

const stats = [
  { value: "500+", label: "Installations" },
  { value: "15 YRS", label: "Experience" },
  { value: "10-YR", label: "Warranty" },
];

const COLORS = {
  ink: "#14181C",
  ember: "#C4622D",
  glow: "#F2B75C",
};

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: COLORS.ink }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,560;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .hero-display { font-family: 'Fraunces', serif; }
        .hero-body { font-family: 'Inter', sans-serif; }
        .hero-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rise-1 { animation: riseIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .rise-2 { animation: riseIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.28s both; }
        .rise-3 { animation: riseIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.46s both; }
        .rise-4 { animation: riseIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.64s both; }
        .rise-5 { animation: riseIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.82s both; }

        @keyframes slatGrow {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        .slat-bar {
          height: 2px;
          transform-origin: left;
          animation: slatGrow 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .rise-1, .rise-2, .rise-3, .rise-4, .rise-5, .slat-bar {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Slides */}
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
            current === i ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
        />
      ))}

      {/* Gradient overlay — heavier bottom-left for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(20,24,28,0.92) 0%, rgba(20,24,28,0.65) 32%, rgba(20,24,28,0.15) 58%, rgba(20,24,28,0.35) 100%), linear-gradient(0deg, rgba(20,24,28,0.55) 0%, rgba(20,24,28,0) 45%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-12 sm:pb-20 lg:px-20">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div className="rise-1 mb-6 flex items-center gap-3">
            <span
              className="h-px w-8"
              style={{ backgroundColor: COLORS.glow }}
            />
            <span
              className="hero-mono text-xs tracking-[0.25em]"
              style={{ color: COLORS.glow }}
            >
              ORANGE COUNTY · ALUMINUM PATIO SYSTEMS
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-display rise-2 text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Custom patio covers,
            <br />
            <span className="italic" style={{ color: COLORS.ember }}>
              engineered to impress.
            </span>
          </h1>

          {/* Slat divider — signature element */}
          <div className="rise-3 my-6 flex gap-[6px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="slat-bar flex-1"
                style={{
                  backgroundColor: COLORS.glow,
                  opacity: 0.55,
                  animationDelay: `${0.5 + i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Subcopy */}
          <p className="hero-body rise-3 text-base leading-relaxed text-white/75 sm:text-lg">
            Motorized aluminum systems designed, built, and installed by Orange
            County's patio specialists — from first sketch to final bolt.
          </p>

          {/* CTAs */}
          <div className="rise-4 mt-8 flex flex-wrap items-center gap-6">
            <Link to="/contact">
              <button
                className="hero-body group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: COLORS.ember }}
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to="/portfolio">
            <button className="hero-body border-b border-white/40 pb-0.5 text-sm font-medium text-white/90 transition-colors duration-300 hover:border-white hover:text-white">
              See Our Work
            </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="rise-5 mt-12 flex gap-8 border-t border-white/15 pt-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className={i > 0 ? "border-l border-white/15 pl-8" : ""}
              >
                <div className="hero-mono text-xl text-white sm:text-2xl">
                  {s.value}
                </div>
                <div className="hero-body mt-1 text-xs uppercase tracking-[0.15em] text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-8 right-6 z-20 flex gap-2 sm:right-12 lg:right-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Show slide ${index + 1}`}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: current === index ? "28px" : "8px",
              backgroundColor:
                current === index ? COLORS.glow : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
