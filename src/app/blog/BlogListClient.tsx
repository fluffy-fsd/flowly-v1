"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import type { ArticleMeta } from "@/lib/blog";

interface Props {
  articles: ArticleMeta[];
}

export default function BlogListClient({ articles }: Props) {
  const { lang, t } = useLang();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="relative overflow-hidden pt-36 pb-20"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 60%)",
        }}
      >
        {/* Grid */}
        <svg className="absolute inset-0 -z-10 h-full w-full" style={{ stroke: "rgba(226,232,240,0.5)" }} aria-hidden="true">
          <defs>
            <pattern id="bl-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0V60M0 60H60" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#bl-grid)" />
        </svg>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(219,228,255,0.5), transparent)" }} />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Nav row */}
          <div className="flex items-center justify-between mb-12">
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Flowly
            </a>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
              style={{ background: "rgba(76,110,245,0.08)", color: "#4c6ef5", border: "1px solid rgba(76,110,245,0.15)" }}
            >
              {t.blog.sectionLabel}
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {t.blog.title}
            </h1>
            <p className="text-slate-500 text-lg max-w-xl">
              {t.blog.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.a
              key={article.slug}
              href={`/blog/${article.slug}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(76,110,245,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(76,110,245,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
              }}
            >
              {/* Cover */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${article.coverColor}22, ${article.coverColor}44)` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                  style={{ background: `${article.coverColor}22`, color: article.coverColor, fontFamily: "var(--font-sora)" }}
                >
                  {article.title[0]}
                </div>
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${article.coverColor}18`, color: article.coverColor, border: `1px solid ${article.coverColor}30` }}
                >
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-400">
                    {new Date(article.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2
                  className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-blue-600 transition-colors"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {article.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
                  {article.excerpt}
                </p>

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
                      <p className="text-[11px] text-slate-400">{article.readTime} {t.blog.minRead}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                    {t.blog.readMore}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
