import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiSend,
  FiArrowRight,
} from "react-icons/fi";

const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  dusk: "#2A3B4D",
  paper: "#FAF8F4",
  paperAlt: "#F1ECE3",
  danger: "#B3261E",
  success: "#1F6F5C",
};

const IMAGE_1 =
  "https://alumascape.com/wp-content/uploads/2025/05/project6-5.jpg";
const IMAGE_2 =
  "https://alumascape.com/wp-content/uploads/2025/05/project9-3.jpg";
const PHONE_NUMBER = "+19494158112";
const PHONE_DISPLAY = "(949) 415-8112";
const EMAIL_DISPLAY = "hello@alumascape.com";
const ADDRESS_DISPLAY = "Orange County, CA";
const HOURS_DISPLAY = "Mon – Sat, 8am – 6pm";

/* ---------- scroll reveal ---------- */
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
      { threshold: 0.12 },
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
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- floating-label field ---------- */
function FloatField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  as = "input",
  rows,
}) {
  const Tag = as;
  return (
    <div className="relative">
      <Tag
        id={id}
        type={as === "input" ? type : undefined}
        rows={rows}
        placeholder=" "
        value={value}
        onChange={onChange}
        className={`peer w-full rounded-xl border bg-white px-4 pb-2 pt-6 text-sm text-[#14181C] outline-none transition-all duration-200 placeholder:text-transparent
          ${error ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]/15" : "border-black/15 focus:border-[#C4622D] focus:ring-2 focus:ring-[#C4622D]/15"}
          ${as === "textarea" ? "resize-y" : ""}`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 top-4 text-sm transition-all duration-200
          peer-focus:top-2 peer-focus:text-[11px] peer-focus:tracking-wide
          peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-wide
          ${error ? "text-[#B3261E] peer-focus:text-[#B3261E]" : "text-[#5B5A54] peer-focus:text-[#C4622D]"}`}
      >
        {label}
      </label>
      {error && (
        <p className="fade-in mt-1.5 flex items-center gap-1.5 text-xs text-[#B3261E]">
          <FiAlertCircle className="h-3.5 w-3.5 flex-none" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase = "";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | error | success

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  function validate() {
    const errs = {};
    if (!form.firstName.trim())
      errs.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) errs.lastName = "Please enter your last name.";
    if (!form.phone.trim()) errs.phone = "Please enter your phone number.";
    else if (!/^[\d\s().+-]{7,}$/.test(form.phone.trim()))
      errs.phone = "That doesn't look like a valid phone number.";
    if (!form.email.trim()) errs.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "That doesn't look like a valid email.";
    if (!form.message.trim()) errs.message = "Let us know how we can help.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("error");
      return;
    }
    const body = [
      `Name: ${form.firstName} ${form.lastName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Message: ${form.message}`,
    ].join("\n");
    // Opens the visitor's own messaging app with the note pre-filled to our number.
    // A silent, fully-automatic send requires a backend (e.g. Twilio, or an
    // email service like EmailJS/Formspree) since browsers can't send SMS directly.
    window.location.href = `sms:${PHONE_NUMBER}?&body=${encodeURIComponent(body)}`;
    setStatus("success");
  }

  return (
    <div className="bg-[#FAF8F4]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;1,9..144,440&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }

        .hero-stripes {
          background-image: repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 46px);
          animation: stripeDrift 26s linear infinite;
        }
        @keyframes stripeDrift {
          from { background-position: 0 0; }
          to { background-position: 460px 460px; }
        }

        .glow-orb { animation: orbPulse 7s ease-in-out infinite; }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.28; }
          50% { transform: scale(1.15); opacity: 0.42; }
        }

        .fade-in { animation: fadeIn 0.35s ease-out both; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .banner-in { animation: bannerIn 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes bannerIn {
          from { opacity: 0; transform: translateY(-8px); max-height: 0; }
          to { opacity: 1; transform: translateY(0); max-height: 100px; }
        }

        .photo-tilt-a { transform: rotate(-4deg); }
        .photo-tilt-b { transform: rotate(3deg); }
        .photo-card:hover { transform: rotate(0deg) scale(1.04); }
        .photo-card { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }

        .send-btn:hover .send-icon { transform: translateX(3px); }
        .send-icon { transition: transform 0.25s ease; }

        .info-row:hover .info-icon-wrap {
          background-color: #C4622D;
          border-color: #C4622D;
        }
        .info-row:hover .info-icon-wrap svg { color: #fff; }
        .info-icon-wrap { transition: all 0.25s ease; }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2A3B4D] via-[#1B2530] to-[#14181C] px-6 py-28 sm:py-36">
        <div className="hero-stripes pointer-events-none absolute inset-0" />
        <div
          className="glow-orb pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, #F2B75C 0%, transparent 70%)",
          }}
        />
        <div
          className="glow-orb pointer-events-none absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, #C4622D 0%, transparent 70%)",
            animationDelay: "2.5s",
          }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C4622D]" />
            <span className="pa-mono text-xs uppercase tracking-[0.28em] text-[#F2B75C]">
              Contact Us
            </span>
            <span className="h-px w-8 bg-[#C4622D]" />
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="pa-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
              Let's talk about your{" "}
              <span className="italic text-[#F2B75C]">dream patio</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="pa-body mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              Every great backyard starts with a conversation. Tell us what
              you're picturing — we'll bring the engineering, the honest advice,
              and the follow-through.
            </p>
          </Reveal>
          <Reveal
            delay={0.24}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="pa-body flex items-center gap-2 rounded-full bg-[#C4622D] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C4622D]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a9531f] hover:shadow-xl"
            >
              <FiPhone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href="#contact-form"
              className="pa-body flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white/90 transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Send a message
              <FiArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
          <div className="as-scroll-cue">
            <a
              href="#contact-form"
              className="pa-body flex items-center gap-2 rounded-full  px-6  text-sm font-semibold text-white/90 transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              <span className="text-sm text-white/65">Scroll down</span>
            </a>

            <ChevronDown size={16} className="text-white/65" />
          </div>{" "}
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact-form" className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* ---- info card ---- */}
          <Reveal className="lg:col-span-2">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#2A3B4D] via-[#1B2530] to-[#14181C] p-8 sm:p-10">
              <div className="hero-stripes pointer-events-none absolute inset-0 opacity-60" />

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C4622D]" />
                  <span className="pa-mono text-xs uppercase tracking-[0.22em] text-[#F2B75C]">
                    Get In Touch
                  </span>
                </div>
                <h2 className="pa-display text-2xl leading-snug text-white sm:text-3xl">
                  We'd love to hear about your project
                </h2>

                <div className="mt-8 space-y-5">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="info-row group flex items-center gap-4"
                  >
                    <span className="info-icon-wrap flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <FiPhone className="h-4 w-4 text-[#F2B75C]" />
                    </span>
                    <div>
                      <p className="pa-body text-xs uppercase tracking-wide text-white/40">
                        Call us
                      </p>
                      <p className="pa-body text-sm font-medium text-white">
                        {PHONE_DISPLAY}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${EMAIL_DISPLAY}`}
                    className="info-row group flex items-center gap-4"
                  >
                    <span className="info-icon-wrap flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <FiMail className="h-4 w-4 text-[#F2B75C]" />
                    </span>
                    <div>
                      <p className="pa-body text-xs uppercase tracking-wide text-white/40">
                        Email us
                      </p>
                      <p className="pa-body text-sm font-medium text-white">
                        {EMAIL_DISPLAY}
                      </p>
                    </div>
                  </a>

                  <div className="info-row group flex items-center gap-4">
                    <span className="info-icon-wrap flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <FiMapPin className="h-4 w-4 text-[#F2B75C]" />
                    </span>
                    <div>
                      <p className="pa-body text-xs uppercase tracking-wide text-white/40">
                        Service area
                      </p>
                      <p className="pa-body text-sm font-medium text-white">
                        {ADDRESS_DISPLAY}
                      </p>
                    </div>
                  </div>

                  <div className="info-row group flex items-center gap-4">
                    <span className="info-icon-wrap flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <FiClock className="h-4 w-4 text-[#F2B75C]" />
                    </span>
                    <div>
                      <p className="pa-body text-xs uppercase tracking-wide text-white/40">
                        Hours
                      </p>
                      <p className="pa-body text-sm font-medium text-white">
                        {HOURS_DISPLAY}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* photo collage */}
              <div className="relative mt-10 flex flex-1 items-end justify-center gap-4 pt-6">
                <div className="photo-card photo-tilt-a w-[46%] overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl">
                  <img
                    src={IMAGE_1}
                    alt="Aluminum patio cover over an outdoor kitchen"
                    className="h-36 w-full object-cover sm:h-40"
                  />
                </div>
                <div className="photo-card photo-tilt-b mt-6 w-[46%] overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl">
                  <img
                    src={IMAGE_2}
                    alt="Backyard with fire pit and lounge seating"
                    className="h-36 w-full object-cover sm:h-40"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---- form card ---- */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_20px_60px_-25px_rgba(20,24,28,0.25)] sm:p-10"
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C4622D]" />
                <span className="pa-mono text-xs uppercase tracking-[0.22em] text-[#C4622D]">
                  Project Details
                </span>
              </div>
              <h2 className="pa-display text-2xl text-[#14181C] sm:text-3xl">
                Tell us about your backyard
              </h2>

              {status === "error" && (
                <div className="banner-in mt-6 flex items-center gap-2 overflow-hidden rounded-xl bg-[#B3261E]/8 px-4 py-3">
                  <FiAlertCircle className="h-4 w-4 flex-none text-[#B3261E]" />
                  <p className="pa-body text-sm text-[#B3261E]">
                    Please fill in all required fields before sending.
                  </p>
                </div>
              )}
              {status === "success" && (
                <div className="banner-in mt-6 flex items-center gap-2 overflow-hidden rounded-xl bg-[#1F6F5C]/10 px-4 py-3">
                  <FiCheckCircle className="h-4 w-4 flex-none text-[#1F6F5C]" />
                  <p className="pa-body text-sm text-[#1F6F5C]">
                    Opening your messages app, ready to send to {PHONE_DISPLAY}.
                  </p>
                </div>
              )}

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <FloatField
                  id="firstName"
                  label="First Name"
                  value={form.firstName}
                  onChange={update("firstName")}
                  error={errors.firstName}
                />
                <FloatField
                  id="lastName"
                  label="Last Name"
                  value={form.lastName}
                  onChange={update("lastName")}
                  error={errors.lastName}
                />
                <FloatField
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  error={errors.phone}
                />
                <FloatField
                  id="email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  error={errors.email}
                />
                <div className="sm:col-span-2">
                  <FloatField
                    id="message"
                    label="How can we help you?"
                    as="textarea"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    error={errors.message}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="send-btn pa-body mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#a9531f] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#C4622D]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:px-10"
              >
                Send Your Message
                <FiSend className="send-icon h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
