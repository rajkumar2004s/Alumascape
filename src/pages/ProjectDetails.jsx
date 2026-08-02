// src/pages/ProjectDetails.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowDown, Expand } from "lucide-react";
import { useProject } from "../hooks/useProjects";
import Lightbox from "../components/Lightbox";

// gives the gallery a bento rhythm instead of a flat, samey grid —
// every 5th and 8th tile in a row runs wide, everything else stays square
function spanFor(i) {
  const cycle = i % 6;
  if (cycle === 0)
    return "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto";
  return "aspect-[4/5]";
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const { project } = useProject(slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!project) {
    return (
      <main className="portfolio-scope flex min-h-[70vh] flex-col items-center justify-center bg-[var(--paper)] px-6 text-center">
        <p className="mb-3 font-body text-[12px] uppercase tracking-[0.3em] text-[var(--ember)]">
          404
        </p>
        <h1 className="mb-6 font-display text-3xl text-[var(--ink)]">
          We couldn't find that project.
        </h1>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-[var(--brass)] underline underline-offset-4"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
      </main>
    );
  }

  return (
    <main className="portfolio-scope bg-[var(--paper)]">
      {/* hero */}
      <section className="relative flex h-[78vh] min-h-[520px] w-full items-end overflow-hidden bg-[var(--ink)]">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/45 to-[var(--ink)]/10" />

        <Link
          to="/portfolio"
          className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-[var(--ink)]/40 px-4 py-2 font-body text-[13px] font-medium text-[var(--paper)] backdrop-blur-sm transition-colors hover:bg-[var(--ink)]/60 sm:left-10 sm:top-10"
        >
          <ArrowLeft size={15} /> All projects
        </Link>

        <div className="relative z-[1] mx-auto w-full max-w-4xl px-6 pb-16 text-center sm:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[var(--brass-soft)]"
          >
            Project {String(project.id).padStart(2, "0")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display text-[2.4rem] font-bold leading-[1.05] tracking-tight text-[var(--paper)] sm:text-[3.4rem]"
          >
            {project.title}
          </motion.h1>

          {project.description?.trim() && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mx-auto mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-[var(--paper)]/85"
            >
              {project.description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{
              opacity: { delay: 0.9, duration: 0.6 },
              y: { delay: 1.2, duration: 1.8, repeat: Infinity },
            }}
            className="mt-10 flex justify-center text-[var(--paper)]/70"
          >
            <ArrowDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* gallery */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
            The Gallery
          </h2>
          <p className="font-body text-[13px] text-[var(--mist)]">
            {project.images.length} photos
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {project.images.map((img, i) => (
            <motion.button
              key={img.src + i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              aria-label={`Open photo ${i + 1} of ${project.images.length}`}
              className={`group relative overflow-hidden rounded-[3px] focus-visible:outline-2 focus-visible:outline-[var(--brass)] focus-visible:outline-offset-4 ${spanFor(i)}`}
            >
              <img
                src={img.src}
                alt={img.alt || project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink)]/0 opacity-0 transition-all duration-300 group-hover:bg-[var(--ink)]/25 group-hover:opacity-100">
                <span className="rounded-full bg-[var(--paper)]/95 p-2.5">
                  <Expand size={16} className="text-[var(--ink)]" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={project.images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
