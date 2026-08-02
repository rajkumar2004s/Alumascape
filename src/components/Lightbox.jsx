// src/components/Lightbox.jsx
//
// Dumb, reusable image viewer. Takes an `images` array ({ src, alt }) and a
// controlled `index` — knows nothing about "projects". Drop it into any
// gallery on the site.

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, index, onClose, onChange }) {
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);

  const total = images.length;

  const goTo = useCallback(
    (nextIndex, dir) => {
      setDirection(dir);
      onChange((nextIndex + total) % total);
    },
    [onChange, total],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  // lock page scroll while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // basic touch swipe for mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 60) prev();
    else if (delta < -60) next();
    touchStartX.current = null;
  };

  const current = images[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir >= 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir >= 0 ? -60 : 60 }),
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Project image viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--ink)]/96 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close image viewer"
        className="absolute right-5 top-5 z-10 rounded-full p-2.5 text-[var(--paper)]/80 transition-colors hover:bg-white/10 hover:text-[var(--paper)]"
      >
        <X size={22} />
      </button>

      {/* counter */}
      <div className="absolute left-6 top-6 font-body text-[13px] tracking-[0.15em] text-[var(--brass-soft)]">
        {String(index + 1).padStart(2, "0")}{" "}
        <span className="text-[var(--paper)]/40">
          / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* prev */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous image"
          className="group absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)] sm:left-6"
        >
          <span className="absolute inset-0 rounded-full bg-white/0 transition-colors group-hover:bg-white/10" />
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>
      )}

      {/* image */}
      <div
        className="relative flex h-full w-full max-w-6xl items-center justify-center px-16 py-20 sm:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt || "Project photo"}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-full max-w-full select-none rounded-[2px] object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* next */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next image"
          className="group absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)] sm:right-6"
        >
          <span className="absolute inset-0 rounded-full bg-white/0 transition-colors group-hover:bg-white/10" />
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>
      )}

      {/* caption */}
      {/* {current.alt && (
        <p className="absolute bottom-6 left-1/2 max-w-md -translate-x-1/2 text-center font-body text-[13px] text-[var(--paper)]/60">
          {current.alt}
        </p>
      )} */}
    </motion.div>
  );
}
