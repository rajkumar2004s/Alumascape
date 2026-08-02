import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  PenTool,
  FileCheck2,
  Hammer,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    n: "01",
    icon: Home,
    title: "Free Consultation",
    copy: "We visit your home, show real material samples, and listen to your vision for the space.",
    img: "https://alumascape.com/wp-content/uploads/2025/05/project10-2.jpg",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Design & Estimate",
    copy: "We help you choose your pergola style, present layouts and visuals, and give you a transparent quote.",
    img: "https://alumascape.com/wp-content/uploads/2025/05/project11-1.jpg",
  },
  {
    n: "03",
    icon: FileCheck2,
    title: "Permitting & Engineering",
    copy: "We manage the entire process — permits, engineering, every piece of red tape — so you don't have to.",
    img: "https://alumascape.com/wp-content/uploads/2025/05/project14-6.jpg",
  },
  {
    n: "04",
    icon: Hammer,
    title: "Fast Install",
    copy: "Our crew builds on site with precision, care for your property, and minimal disruption to your day.",
    img: "https://alumascape.com/wp-content/uploads/2025/05/project10-1.jpg",
  },
  {
    n: "05",
    icon: CheckCircle2,
    title: "Final Walkthrough",
    copy: "We walk the finished space with you, test every component, and make sure you're fully satisfied.",
    img: "https://alumascape.com/wp-content/uploads/2025/05/project11-1.jpg",
  },
];

export default function PergolaProcess() {
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);
  const [fillPercent, setFillPercent] = useState(0);
  const [active, setActive] = useState(() => STEPS.map(() => false));

  useEffect(() => {
    let raf = null;
    function measure() {
      raf = null;
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.55;
      const progress = (viewportAnchor - rect.top) / rect.height;
      setFillPercent(Math.min(1, Math.max(0, progress)) * 100);
    }
    function onScroll() {
      if (raf == null) raf = requestAnimationFrame(measure);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setActive((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="as-root">
      {/* HERO */}
      <section className="as-hero">
        <div className="as-grid-overlay" />
        <span className="as-eyebrow">The Alumascape Process</span>
        <h1 className="as-display">
          From first sketch to <em>final light-up.</em>
        </h1>
        <p>
          Five steps, one team, zero red tape. Here's exactly what happens
          between your first call and the night you switch the lights on.
        </p>
        <div className="as-scroll-cue">
          <span>Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* SECTION HEAD */}
      <div className="as-section-head">
        <span className="as-eyebrow">How It Works</span>
        <h2 className="as-display">A full-service build, start to finish</h2>
      </div>

      {/* TIMELINE */}
      <div className="as-timeline-wrap" ref={timelineRef}>
        <div className="as-rail-track" />
        <div className="as-rail-fill" style={{ height: `${fillPercent}%` }} />

        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isReverse = idx % 2 === 1;
          return (
            <div
              key={step.n}
              data-idx={idx}
              ref={(el) => (stepRefs.current[idx] = el)}
              className={`as-step ${isReverse ? "as-row as-reverse" : "as-row"} ${
                active[idx] ? "is-active" : ""
              }`}
            >
              <div className="as-row-text">
                <span className="as-step-num">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>

              <div className="as-medallion-col">
                <div className="as-medallion">
                  <Icon />
                </div>
              </div>

              <div className="as-row-media">
                <img src={step.img} alt={step.title} loading="lazy" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="as-cta">
        <div className="as-cta-bg" />
        <blockquote>
          "You never have to chase city inspectors, hire an electrician, or
          coordinate third parties. We do it all, under one roof."
        </blockquote>
        <Link to="/contact">
          <button className="as-cta-btn">Get a Quote</button>
        </Link>

        <div className="as-reassure">
          <div className="as-reassure-item">
            <ShieldCheck />
            <span>No permit chasing</span>
          </div>
          <div className="as-reassure-item">
            <Zap />
            <span>No separate electrician</span>
          </div>
          <div className="as-reassure-item">
            <Users />
            <span>No third parties to manage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
