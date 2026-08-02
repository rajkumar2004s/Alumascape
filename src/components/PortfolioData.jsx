// src/pages/Portfolio.jsx
import { motion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";

export default function Portfolio() {
  const { projects } = useProjects();

  return (
    <main className="portfolio-scope bg-[var(--paper)]"  id="our-work">
      {/* header */}
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-28 text-center sm:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-[var(--ember)]"
        >
          <span className="h-px w-6 bg-[var(--ember)]" />
          Our Work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-[var(--ink)] sm:text-[3.6rem]"
        >
          Outdoor spaces,
          <br />
          built to be lived in.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-5 max-w-xl font-body text-[15px] leading-relaxed text-[var(--mist)]"
        >
          A collection of custom pergolas, patio covers, and full outdoor
          living builds — each one shaped around how a family actually uses
          the space.
        </motion.p>
      </section>

      {/* grid */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
