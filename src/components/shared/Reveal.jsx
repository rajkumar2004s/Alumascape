import { useEffect, useRef, useState } from "react";

export const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  paper: "#FAF8F4",
};

/* Fades a block up into place the first time it enters the viewport */
export function useReveal() {
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

export function Reveal({ children, delay = 0, className = "" }) {
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

export function Eyebrow({ children, center = false }) {
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
