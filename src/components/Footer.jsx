import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const COLORS = {
  ink: "#14181C",
  ember: "#C4622D",
  glow: "#F2B75C",
  line: "rgba(255,255,255,0.1)",
  textSoft: "rgba(255,255,255,0.6)",
};

const NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Patio Covers", href: "/patio-covers" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const AREAS = [
  { label: "Newport Coast", href: "/areas/newport-coast" },
  { label: "Corona del Mar", href: "/areas/corona-del-mar" },
  { label: "Shady Canyon", href: "/areas/shady-canyon" },
  { label: "Pelican Hill", href: "/areas/pelican-hill" },
  { label: "Emerald Bay", href: "/areas/emerald-bay" },
  { label: "Monarch Beach", href: "/areas/monarch-beach" },
];

function Column({ title, children }) {
  return (
    <div>
      <h3
        className="pa-mono mb-5 text-xs tracking-[0.22em]"
        style={{ color: COLORS.ember }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function LinkItem({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="pa-body group relative inline-block text-sm text-white/65 transition-colors duration-300 hover:text-white"
      >
        {children}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
          style={{ backgroundColor: COLORS.glow }}
        />
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: COLORS.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/">
              <h2 className="pa-display text-2xl text-white">Alumascape</h2>
            </Link>
            <p
              className="pa-mono mt-1 text-[11px] tracking-[0.18em]"
              style={{ color: COLORS.glow }}
            >
              CUSTOM ALUMINUM PERGOLAS
            </p>
            <p
              className="pa-body mt-5 max-w-xs text-sm leading-relaxed"
              style={{ color: COLORS.textSoft }}
            >
              Engineered, permitted, and installed aluminum patio covers for
              homeowners across Southern California.
            </p>

            <a
              href="tel:+19494158112"
              className="pa-body mt-6 flex w-fit items-center gap-2 text-sm font-medium text-white transition-colors duration-300 hover:text-white/80"
            >
              <FaPhone
                className="h-3.5 w-3.5"
                style={{ color: COLORS.ember }}
              />
              (949) 415-8112
            </a>
            <div className="mt-2 flex items-start gap-2">
              <FaMapMarkerAlt
                className="mt-0.5 h-3.5 w-3.5 flex-none"
                style={{ color: COLORS.ember }}
              />
              <span
                className="pa-body text-sm"
                style={{ color: COLORS.textSoft }}
              >
                Serving Orange County & Southern California
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/people/Alumascape/61578875166885/"
                aria-label="Alumascape on Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <FaFacebookF className="h-4 w-4 text-white" />
              </a>
              <a
                href="https://www.instagram.com/alumascape/"
                aria-label="Alumascape on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <FaInstagram className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <Column title="Company">
            <ul className="space-y-3">
              {NAV.map((n) => (
                <LinkItem key={n.label} to={n.href}>
                  {n.label}
                </LinkItem>
              ))}
            </ul>
          </Column>

          {/* Areas served */}
          <Column title="Areas We Serve">
            <ul className="space-y-3">
              {AREAS.map((a) => (
                <LinkItem key={a.label} to={a.href}>
                  {a.label}
                </LinkItem>
              ))}
            </ul>
          </Column>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-6 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left lg:px-16">
          <p className="pa-body text-xs" style={{ color: COLORS.textSoft }}>
            © {new Date().getFullYear()} Alumascape · License #806651
          </p>
          <p className="pa-body text-xs" style={{ color: COLORS.textSoft }}>
            Website and Marketing by{" "}
            <span className="font-semibold text-white">
              Adapt Digital Solutions
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}