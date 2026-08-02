import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";

const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  line: "rgba(20,24,28,0.08)",
};

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Patio Covers", to: "/patio-covers" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Blog", to: "/blog" },
  { label: "Areas We Served", to: "/areas" },
  { label: "Contact", to: "/contact" },
];

function NavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="pa-body group relative text-[15px] font-medium"
      style={{ color: COLORS.ink }}
    >
      {children}
      <span
        className="absolute -bottom-1.5 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: COLORS.ember }}
      />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // If a Link points to the page we're already on, react-router won't
  // trigger a navigation/route change, so ScrollToTop never fires.
  // This manually scrolls to top in that case (logo + Home link).
  const scrollToTopIfSamePage = (to) => {
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${COLORS.line}`,
        boxShadow: scrolled ? "0 8px 24px rgba(20,24,28,0.06)" : "none",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .pa-display {
          font-family: 'Fraunces', serif;
        }

        .pa-body {
          font-family: 'Inter', sans-serif;
        }

        .pa-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .drop-panel {
          animation: dropIn 0.2s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => scrollToTopIfSamePage("/")}
          className="flex items-center gap-3"
        >
          <img
            src="https://res.cloudinary.com/dwdekki8t/image/upload/v1785488810/aluma-logo_hnrfyf.png"
            alt="Alumascape"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => scrollToTopIfSamePage(link.to)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-3">
          <a
            href="tel:9494158112"
            className="pa-body hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg xl:flex"
            style={{ backgroundColor: COLORS.ember }}
          >
            <FiPhone size={16} />
            (949) 415-8112
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            style={{
              backgroundColor: "#F1ECE3",
              color: COLORS.ink,
            }}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          className="drop-panel border-t px-6 py-4 lg:hidden"
          style={{
            borderColor: COLORS.line,
            backgroundColor: "#fff",
          }}
        >
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => {
                  setMobileOpen(false);
                  scrollToTopIfSamePage(link.to);
                }}
                className="pa-body rounded-xl px-3 py-3 text-[15px] font-medium transition-colors hover:bg-gray-50"
                style={{ color: COLORS.ink }}
              >
                {link.label}
              </Link>
            ))}

            <a
              href="tel:9494158112"
              className="pa-body mt-3 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: COLORS.ember }}
            >
              <FiPhone size={16} />
              (949) 415-8112
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}