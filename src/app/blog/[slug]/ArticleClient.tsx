"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import type { ArticleMeta } from "@/lib/blog";

interface Props {
  meta: ArticleMeta;
  content: string;
}

// Simple MDX-to-HTML renderer using basic markdown parsing
function renderMarkdown(md: string): string {
  return md
    // Tables
    .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (_m, header, rows) => {
      const ths = header.split("|").filter(Boolean).map((h: string) => `<th>${h.trim()}</th>`).join("");
      const trs = rows.trim().split("\n").map((row: string) => {
        const tds = row.split("|").filter(Boolean).map((c: string) => `<td>${c.trim()}</td>`).join("");
        return `<tr>${tds}</tr>`;
      }).join("");
      return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
    })
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]+?<\/li>)(?=\s*(?:<li>|$))/g, (match) => `<ul>${match}</ul>`)
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Paragraphs (lines not wrapped in block tags)
    .replace(/^(?!<[hultb])(.+)$/gm, "<p>$1</p>")
    // Clean up extra newlines
    .replace(/\n{3,}/g, "\n\n");
}

export default function ArticleClient({ meta, content }: Props) {
  const { t } = useLang();
  const html = renderMarkdown(content);

  const formattedDate = new Date(meta.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Article hero */}
      <div
        className="relative overflow-hidden pt-20 pb-16"
        style={{
          background: `linear-gradient(135deg, ${meta.coverColor}10 0%, #ffffff 70%)`,
        }}
      >
        {/* Grid */}
        <svg className="absolute inset-0 -z-10 h-full w-full" style={{ stroke: "rgba(226,232,240,0.4)" }} aria-hidden="true">
          <defs>
            <pattern id="art-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0V60M0 60H60" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#art-grid)" />
        </svg>

        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {/* Top row */}
          <div className="mb-12">
            <a
              href="/blog"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium w-fit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t.blog.backToBlog.replace("← ", "")}
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category badge */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{
                background: `${meta.coverColor}18`,
                color: meta.coverColor,
                border: `1px solid ${meta.coverColor}30`,
              }}
            >
              {meta.category}
            </span>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {meta.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #4c6ef5, #3b5bdb)" }}
                >
                  {meta.author[0]}
                </div>
                <span className="font-medium text-slate-700">
                  {t.blog.by} {meta.author}
                </span>
              </div>
              <span>·</span>
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{meta.readTime} {t.blog.minRead}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto max-w-3xl px-5 sm:px-8 py-12 pb-24"
      >
        <div
          className="prose-flowly"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            fontFamily: "var(--font-sans)",
            color: "#334155",
            lineHeight: 1.8,
            fontSize: "1.0625rem",
          }}
        />
      </motion.div>

      {/* Back to blog footer */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pb-24">
        <div
          className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <div>
            <p className="font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sora)" }}>
              Flowly
            </p>
            <p className="text-sm text-slate-500">{t.blog.subtitle}</p>
          </div>
          <a
            href="/blog"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #4c6ef5, #4263eb)", boxShadow: "0 6px 20px rgba(76,110,245,0.25)" }}
          >
            {t.blog.viewAll.replace(" →", "")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .prose-flowly h1 { font-family: var(--font-sora); font-size: 2rem; font-weight: 700; color: #0f172a; margin: 2.5rem 0 1rem; line-height: 1.2; }
        .prose-flowly h2 { font-family: var(--font-sora); font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 2.5rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #f1f5f9; }
        .prose-flowly h3 { font-family: var(--font-sora); font-size: 1.2rem; font-weight: 600; color: #1e293b; margin: 2rem 0 0.75rem; }
        .prose-flowly p { margin: 0 0 1.25rem; }
        .prose-flowly ul { list-style: none; margin: 0 0 1.25rem; padding: 0; }
        .prose-flowly ul li { position: relative; padding-left: 1.5rem; margin-bottom: 0.5rem; }
        .prose-flowly ul li::before { content: ""; position: absolute; left: 0; top: 0.65rem; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg, #4c6ef5, #3b5bdb); }
        .prose-flowly strong { font-weight: 700; color: #1e293b; }
        .prose-flowly em { font-style: italic; }
        .prose-flowly table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
        .prose-flowly th { background: linear-gradient(135deg, #4c6ef5, #4263eb); color: white; padding: 0.75rem 1rem; text-align: left; font-size: 0.875rem; font-weight: 600; }
        .prose-flowly td { padding: 0.75rem 1rem; font-size: 0.9rem; border-bottom: 1px solid #f1f5f9; }
        .prose-flowly tr:last-child td { border-bottom: none; }
        .prose-flowly tr:nth-child(even) td { background: #f8fafc; }
      `}</style>
    </div>
  );
}
