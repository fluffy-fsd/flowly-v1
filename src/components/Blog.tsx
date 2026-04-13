"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import type { ArticleMeta } from "@/lib/blog";

interface BlogProps {
  articles: ArticleMeta[];
}

export default function Blog({ articles }: BlogProps) {
  const { t } = useLang();

  return (
    <section id="blog" className="relative bg-white py-24 sm:py-32">
      {/* Subtle grid background */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ stroke: "rgba(226,232,240,0.5)" }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="blog-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0V60M0 60H60" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#blog-grid)" />
      </svg>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "rgba(76,110,245,0.08)",
              color: "#4c6ef5",
              border: "1px solid rgba(76,110,245,0.15)",
            }}
          >
            {t.blog.sectionLabel}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            {t.blog.title}
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            {t.blog.subtitle}
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, i) => (
            <motion.a
              key={article.slug}
              href={`/blog/${article.slug}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px rgba(76,110,245,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(76,110,245,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 12px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
              }}
            >
              {/* Cover */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${article.coverColor}22, ${article.coverColor}44)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                  style={{
                    background: `${article.coverColor}22`,
                    color: article.coverColor,
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  {article.title[0]}
                </div>
                {/* Category badge */}
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${article.coverColor}18`,
                    color: article.coverColor,
                    border: `1px solid ${article.coverColor}30`,
                  }}
                >
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-blue-600 transition-colors"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #4c6ef5, #3b5bdb)" }}
                    >
                      {article.author[0]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-700">{article.author}</p>
                      <p className="text-[11px] text-slate-400">
                        {article.readTime} {t.blog.minRead}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-semibold transition-colors group-hover:text-blue-600"
                    style={{ color: "#4c6ef5" }}
                  >
                    {t.blog.readMore}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            {t.blog.viewAll}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
