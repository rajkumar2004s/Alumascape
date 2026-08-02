// src/components/ProjectCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link
        to={`/portfolio/${project.slug}`}
        aria-label={`View project: ${project.title}`}
        className="relative block overflow-hidden rounded-[4px] bg-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--brass)] focus-visible:outline-offset-4"
      >
        {/* image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
          />

          {/* permanent bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/10 to-transparent opacity-80" />

          {/* brass hairline that draws in on hover — the card's signature detail */}
          <span
            aria-hidden
            className="absolute left-6 right-6 top-6 h-px origin-left scale-x-0 bg-[var(--brass-soft)] transition-transform duration-500 ease-out group-hover:scale-x-100"
          />

          {/* content */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass-soft)]">
              Project {String(project.id).padStart(2, "0")}
            </p>

            <h3 className="font-display text-[1.5rem] font-bold leading-[1.05] tracking-tight text-[var(--paper)]">
              {project.title}
            </h3>

            {/* CTA — reveals on hover/focus, no more mystery button */}
            <div className="mt-4 flex max-h-0 items-center gap-2 overflow-hidden opacity-0 transition-all duration-400 ease-out group-hover:max-h-10 group-hover:opacity-100 group-focus-visible:max-h-10 group-focus-visible:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brass-soft)]/60 px-4 py-1.5 font-body text-[13px] font-medium text-[var(--paper)] transition-colors group-hover:border-[var(--brass-soft)] group-hover:bg-[var(--brass)]/15">
                View the project
                <ArrowUpRight size={14} strokeWidth={2} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
