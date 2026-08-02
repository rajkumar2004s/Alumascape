import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  paper: "#FAF8F4",
};

const GALLERY = [
  "https://alumascape.com/wp-content/uploads/2025/05/project4-6.jpg",
  "https://alumascape.com/wp-content/uploads/2025/05/project12-2.jpg",
  "https://alumascape.com/wp-content/uploads/2025/05/project15-3.jpg",
  "https://alumascape.com/wp-content/uploads/2025/05/project9-3.jpg",
  "https://alumascape.com/wp-content/uploads/2025/05/project14-6.jpg",
  "https://alumascape.com/wp-content/uploads/2025/05/project11-5.jpg",
];

const CTA_IMAGE =
  "https://alumascape.com/wp-content/uploads/2025/05/project12-2.jpg";

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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, center = false }) {
  return (
    <div
      className={`mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}
    >
      <span className="h-px w-8" style={{ backgroundColor: COLORS.ember }} />
      <span
        className="pa-mono text-xs tracking-[0.22em]"
        style={{ color: COLORS.ember }}
      >
        {children}
      </span>
      {center && (
        <span className="h-px w-8" style={{ backgroundColor: COLORS.ember }} />
      )}
    </div>
  );
}

export default function PatioShowcase() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      {/* Gallery */}
      <section style={{ backgroundColor: COLORS.paper }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
          <Reveal className="mx-auto max-w-xl text-center">
            <Eyebrow center>Project Gallery</Eyebrow>
            <h2
              className="pa-display text-4xl leading-[1.1] sm:text-5xl"
              style={{ color: COLORS.ink }}
            >
              Ideas to inspire your project
            </h2>
            <p
              className="pa-body mt-5 text-lg leading-relaxed"
              style={{ color: COLORS.inkSoft }}
            >
              A look at the outdoor spaces we've designed and installed across
              Southern California.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((src, i) => (
              <Reveal key={src} delay={0.08 * (i % 3)}>
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src={src}
                    alt={`Alumascape installed patio cover project ${i + 1}`}
                    className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(20,24,28,0.55) 0%, rgba(20,24,28,0) 55%)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
