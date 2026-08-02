import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { articles } from "../data/articles";

const COLORS = {
  ink: "#14181C",
  inkSoft: "#5B5A54",
  ember: "#C4622D",
  glow: "#F2B75C",
  dusk: "#2A3B4D",
  paper: "#FAF8F4",
  paperAlt: "#F1ECE3",
  line: "rgba(20,24,28,0.12)",
};

function Block({ block }) {
  if (block.type === "heading") {
    return (
      <h2
        className="pa-display mt-10 text-2xl leading-snug sm:text-3xl"
        style={{ color: COLORS.ink }}
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p
        className="pa-body mt-5 text-base leading-relaxed sm:text-lg"
        style={{ color: COLORS.inkSoft }}
      >
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 flex-none rounded-full"
              style={{ backgroundColor: COLORS.ember }}
            />
            <span
              className="pa-body text-base leading-relaxed"
              style={{ color: COLORS.inkSoft }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "table") {
    return (
      <div
        className="mt-6 overflow-hidden rounded-2xl"
        style={{ backgroundColor: COLORS.paperAlt }}
      >
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              {block.headers.map((h) => (
                <th
                  key={h}
                  className="pa-mono px-5 py-3 text-xs tracking-[0.08em]"
                  style={{ color: COLORS.ember }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="pa-body px-5 py-3 text-sm leading-relaxed"
                    style={{ color: COLORS.ink }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

export default function ArticleDetails() {
  const { slug } = useParams();
  const index = articles.findIndex((a) => a.slug === slug);
  const article = articles[index];

  if (!article) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="pa-display text-3xl" style={{ color: COLORS.ink }}>
          Article not found
        </h1>
        <Link
          to="/blog"
          className="pa-body mt-4 inline-block"
          style={{ color: COLORS.ember }}
        >
          ← Back to all articles
        </Link>
      </div>
    );
  }

  const otherArticles = articles.filter((a) => a.slug !== slug);
  const next = articles[(index + 1) % articles.length];
  // Replace this with your actual production domain if needed
  const articleUrl = window.location.href;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    articleUrl,
  )}`;

  const twitterShare = `https://x.com/intent/post?text=${encodeURIComponent(
    article.title,
  )}&url=${encodeURIComponent(articleUrl)}`;

  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl,
  )}`;
  return (
    <div style={{ backgroundColor: COLORS.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .pa-display { font-family: 'Fraunces', serif; }
        .pa-body { font-family: 'Inter', sans-serif; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      {/* Banner — solid color block with a floating photo card */}
      <section
        className="relative overflow-hidden px-6 pb-28 pt-14 sm:px-10 sm:pb-32 lg:px-16"
        style={{
          background: `linear-gradient(135deg, ${COLORS.ember} 0%, #9C4A20 100%)`,
        }}
      >
        <div className="mx-auto max-w-7xl">
          <Link
            to="/blog"
            className="pa-body inline-flex items-center gap-2 text-sm font-medium text-white/90 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to all
          </Link>

          <h1 className="pa-display mt-6 max-w-2xl text-3xl leading-[1.15] text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Floating image card, overlapping the banner */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="-mt-20 flex justify-end sm:-mt-24">
          <div className="w-full overflow-hidden rounded-2xl shadow-xl sm:w-2/3 lg:w-1/2">
            <img
              src={article.image}
              alt={article.title}
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        </div>
      </div>

      {/* Content + sidebar */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[2fr_1fr]">
          {/* Main content */}
          <article>
            <p
              className="pa-mono text-xs tracking-[0.1em]"
              style={{ color: COLORS.inkSoft }}
            >
              {article.date.toUpperCase()}
            </p>
            {article.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>

          {/* Sidebar */}
          <aside className="lg:pl-4">
            <div className="lg:sticky lg:top-24">
              <div
                className="flex items-center gap-3 border-b pb-6"
                style={{ borderColor: COLORS.line }}
              >
                <span
                  className="pa-mono text-xs tracking-[0.15em]"
                  style={{ color: COLORS.ember }}
                >
                  SHARE
                </span>
                <div className="flex gap-2">
                  <a
                    href={facebookShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: COLORS.ink }}
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF className="h-3.5 w-3.5 text-white" />
                  </a>

                  <a
                    href={twitterShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: COLORS.ink }}
                    aria-label="Share on X"
                  >
                    <FaTwitter className="h-3.5 w-3.5 text-white" />
                  </a>

                  <a
                    href={linkedinShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: COLORS.ink }}
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn className="h-3.5 w-3.5 text-white" />
                  </a>
                </div>
              </div>

              <h3
                className="pa-mono mt-8 mb-5 text-xs tracking-[0.2em]"
                style={{ color: COLORS.ember }}
              >
                MORE POSTS
              </h3>
              <div className="space-y-5">
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.slug}`}
                    className="group flex gap-3"
                  >
                    <div className="h-16 w-20 flex-none overflow-hidden rounded-xl">
                      <img
                        src={a.image}
                        alt={a.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p
                      className="pa-body text-sm font-medium leading-snug transition-colors duration-300"
                      style={{ color: COLORS.ink }}
                    >
                      {a.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Next post */}
      <Link
        to={`/blog/${next.slug}`}
        className="group block border-t"
        style={{ borderColor: COLORS.line }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-8 sm:px-10 lg:px-16">
          <div>
            <span
              className="pa-mono text-xs tracking-[0.2em]"
              style={{ color: COLORS.ember }}
            >
              NEXT
            </span>
            <p
              className="pa-display mt-1 text-lg transition-colors duration-300 sm:text-xl"
              style={{ color: COLORS.ink }}
            >
              {next.title}
            </p>
          </div>
          <FiArrowRight
            className="h-6 w-6 flex-none transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: COLORS.ember }}
          />
        </div>
      </Link>
    </div>
  );
}
