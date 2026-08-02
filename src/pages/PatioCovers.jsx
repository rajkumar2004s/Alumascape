import { useState } from "react";
import {
  FiCheck,
  FiZap,
  FiSliders,
  FiWind,
  FiSun,
  FiTv,
  FiArrowRight,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import Idea from "../components/Ideas";
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
};

const STYLES = [
  {
    id: "louvered",
    tag: "01",
    label: "Louvered",
    fullLabel: "Louvered Patio Covers",
    image:
      "https://res.cloudinary.com/dwdekki8t/image/upload/v1785572695/919ec5f4-8935-443c-85c2-38d757024b4c.png",
    spec: "Motorized · Adjustable shade",
    badges: [
      "Aircraft-grade aluminum",
      "App / remote control",
      "Smart-home ready",
    ],
    paragraphs: [
      "Our motorized louvered patio covers let you control sunlight, shade, and rain protection with the touch of a button — built for those who value both elegance and innovation.",
      "Crafted from aircraft-grade extruded aluminum with clean architectural lines, every system includes discreet rain gutters and full integration options for heaters, fans, LED lighting, and privacy screens.",
      "Ideal for elevated patios, poolside lounges, and fire-compliant zones — fully customizable and compatible with smart home systems.",
    ],
  },
  {
    id: "solid",
    tag: "02",
    label: "Solid Roof",
    fullLabel: "Solid Roof Patio Covers",
    image: "https://alumascape.com/wp-content/uploads/2025/05/project6-7.jpg",
    spec: "Fixed roof · Zero maintenance",
    badges: ["No moving parts", "HOA-compliant", "Insulated panels"],
    paragraphs: [
      "Our solid roof patio covers create full-shade extensions that blend perfectly with your home's architecture — no moving parts, no maintenance, just clean lines and timeless appeal.",
      "Ideal for outdoor kitchens, dining areas, carports, or backyard lounges. Add stone or stucco columns, recessed lighting, ceiling fans, and heaters to elevate the experience.",
      'Engineered to meet HOA requirements and stand up to sun, wind, and weather with 3–6" thick insulated aluminum roof panels.',
    ],
  },
  {
    id: "lattice",
    tag: "03",
    label: "Lattice",
    fullLabel: "Lattice Patio Covers",
    image:
      "https://alumascape.com/wp-content/uploads/2025/05/alumascape-112.jpg",
    spec: "Classic profile · Filtered shade",
    badges: ["Fire-safe & UV-stable", "Termite-proof", "Custom patterns"],
    paragraphs: [
      "Our aluminum lattice patio covers bring the charm of classic wood pergolas without the upkeep — available in a variety of patterns, colors, and beam sizes to match your space.",
      "Built with fire-safe, termite-proof, and UV-stable finishes, they're perfect for gardens, breezeways, and side patios — and pair beautifully with climbing vines or outdoor lighting.",
    ],
  },
];

const FEATURES = [
  {
    icon: FiZap,
    title: "Color-changing LED lighting",
    copy: "Ambient, recessed, or post-mounted.",
  },
  {
    icon: FiSliders,
    title: "Smart shades",
    copy: "Motorized sun/privacy screens in custom fabrics.",
  },
  {
    icon: FiWind,
    title: "Outdoor ceiling fans",
    copy: "Whisper-quiet, remote-controlled, weather-rated.",
  },
  {
    icon: FiSun,
    title: "Overhead heating",
    copy: "Flush-mounted or framed with brackets.",
  },
  {
    icon: FiTv,
    title: "Entertainment walls",
    copy: "TVs, speakers, AV wiring, stone cladding.",
  },
  {
    icon: FaFire,
    title: "Fireplaces & accent walls",
    copy: "Integrated seating with tile or stone finishes.",
  },
];

function Eyebrow({ children, light = false }) {
  return (
    <div className="mb-4 flex items-center gap-3">
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
    </div>
  );
}

export default function PatioCoversPage() {
  const [active, setActive] = useState("louvered");
  const current = STYLES.find((s) => s.id === active);

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes fadeSwap {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .swap { animation: fadeSwap 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Hero — bold intro + the style selector itself */}
      <section
        className="relative overflow-hidden px-6 py-24 text-center sm:px-10 sm:py-28"
        style={{
          background: `linear-gradient(160deg, ${COLORS.dusk} 0%, ${COLORS.ink} 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 flex gap-2 opacity-[0.06]">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="h-full flex-1 -skew-x-12"
              style={{ backgroundColor: "#fff" }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <Eyebrow light>Patio Covers</Eyebrow>
          <h1 className="pa-display text-4xl leading-[1.1] text-white sm:text-5xl">
            Explore our custom patio cover options
          </h1>
          <p className="pa-body mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/70">
            Three engineered systems, one goal — shade and style built for the
            way you actually use your backyard.
          </p>
        </div>

        {/* Segmented style selector */}
        <div
          className="relative z-10 mx-auto mt-10 flex w-fit gap-2 rounded-full p-1.5"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="pa-body relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300"
              style={{
                backgroundColor: active === s.id ? COLORS.ember : "transparent",
                color: active === s.id ? "#fff" : "rgba(255,255,255,0.65)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Synced detail panel */}
      <section style={{ backgroundColor: COLORS.paper }}>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
          <div
            key={current.id}
            className="swap grid items-start gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={current.image}
                alt={current.fullLabel}
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <span
                  className="pa-mono text-sm"
                  style={{ color: COLORS.ember }}
                >
                  {current.tag}
                </span>
                <h2
                  className="pa-display text-3xl sm:text-4xl"
                  style={{ color: COLORS.ink }}
                >
                  {current.fullLabel}
                </h2>
              </div>
              <p
                className="pa-mono mt-2 text-xs tracking-[0.15em]"
                style={{ color: COLORS.inkSoft }}
              >
                {current.spec.toUpperCase()}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {current.badges.map((b) => (
                  <span
                    key={b}
                    className="pa-mono rounded-full px-3 py-1.5 text-[11px] tracking-[0.08em]"
                    style={{
                      backgroundColor: COLORS.paperAlt,
                      color: COLORS.ink,
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <div className="mt-7 space-y-4">
                {current.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="pa-body text-base leading-relaxed"
                    style={{ color: COLORS.inkSoft }}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <Link to="/portfolio">
                <button
                  className="pa-body mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: COLORS.ember }}
                >
                  Find Out More
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom features — icon grid instead of a checklist */}
      <section style={{ backgroundColor: COLORS.paperAlt }}>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Fully Customizable</Eyebrow>
              <h2
                className="pa-display text-3xl leading-[1.1] sm:text-4xl"
                style={{ color: COLORS.ink }}
              >
                Design the outdoor space you actually want
              </h2>
              <p
                className="pa-body mt-5 max-w-md text-lg leading-relaxed"
                style={{ color: COLORS.inkSoft }}
              >
                We build outdoor spaces that feel like a natural extension of
                your home. Our team helps you select features that blend luxury,
                comfort, and technology seamlessly.
              </p>

              <div className="mt-9">
                <Link to="/contact">
                  <button
                    className="pa-body inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ backgroundColor: COLORS.ember }}
                  >
                    Request a Consultation
                    <FiArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl bg-white p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: COLORS.ink }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: COLORS.glow }}
                      />
                    </span>
                    <h3
                      className="pa-body mt-4 text-sm font-semibold"
                      style={{ color: COLORS.ink }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="pa-body mt-1.5 text-xs leading-relaxed"
                      style={{ color: COLORS.inkSoft }}
                    >
                      {f.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Idea />
    </div>
  );
}
