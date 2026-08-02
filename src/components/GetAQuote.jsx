import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COLORS, Reveal, Eyebrow } from "./shared/Reveal";

const DEFAULT_IMAGE =
  "https://alumascape.com/wp-content/uploads/2025/05/project12-2.jpg";

export default function GetAQuote({
  image = DEFAULT_IMAGE,
  eyebrow = "Let's Get Started",
  heading = "Ready to build your dream patio? Let's talk",
  description = "If you're in Orange County or anywhere in Southern California, give us a call. Whether you want a simple, solid roof or a fully loaded smart patio cover, we'll walk you through every option and handle the hard stuff.",
  buttonText = "Get a Free Quote",
  buttonTo = "/contact",
}) {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden px-6 py-28 text-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      <img
        src={image}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,24,28,0.75) 0%, rgba(20,24,28,0.55) 45%, rgba(20,24,28,0.8) 100%)",
        }}
      />

      <Reveal className="relative z-10 mx-auto max-w-2xl">
        <Eyebrow center>{eyebrow}</Eyebrow>
        <h2 className="pa-display text-4xl leading-[1.1] text-white sm:text-5xl">
          {heading}
        </h2>
        <p className="pa-body mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
          {description}
        </p>

        <div className="mt-9 flex justify-center">
          <Link
            to={buttonTo}
            className="pa-body inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: COLORS.ember }}
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}