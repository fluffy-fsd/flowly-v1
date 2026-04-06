import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { formatDateShort } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Clock, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — FStudios",
  description: "Articles techniques sur Next.js, React, Tailwind, Firebase, IA et architecture SaaS. Par Dorian Gosselin, développeur full stack senior.",
  alternates: { canonical: "https://fstudios.fr/blog" },
  openGraph: { title: "Blog FStudios — Dev senior", description: "Articles tech : Next.js, React, IA, SaaS", url: "https://fstudios.fr/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featured = posts.filter(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 dot-grid relative overflow-hidden" aria-labelledby="blog-heading">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/[0.065] rounded-full blur-[100px] pointer-events-none" />
          <div className="fs-container relative">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-px h-5 bg-indigo-400" />
                <p className="text-indigo-400 text-xs font-semibold tracking-[0.18em] uppercase">Blog technique</p>
              </div>
              {/* H1 unique de cette page */}
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-[-0.03em] text-white" style={{ fontFamily: "var(--font-syne)" }}>
                Du code<br /><span className="gradient-text">qui compte.</span>
              </h1>
              <p className="text-white/42 text-lg leading-relaxed">Next.js, React, IA, architecture SaaS. Des articles techniques écrits par un dev qui build en prod.</p>
            </div>
          </div>
        </section>

        <div className="fs-container pb-24">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            <span className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Tag className="w-3 h-3" />Tous ({posts.length})
            </span>
            {categories.map(cat => (
              <span key={cat} className="bg-white/[0.04] border border-white/[0.07] text-white/45 text-xs font-medium px-3 py-1.5 rounded-full hover:border-white/14 hover:text-white/65 cursor-default transition-colors">
                {cat}
              </span>
            ))}
          </div>

          {/* Featured grid */}
          {featured.length > 0 && (
            <div className="mb-14">
              <h2 className="text-white/35 text-xs font-semibold uppercase tracking-[0.18em] mb-6">Articles à la une</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((post, i) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}
                    className={`group fs-card rounded-2xl overflow-hidden flex flex-col ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                    {/* Gradient cover */}
                    <div className={`h-36 bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 dot-grid opacity-30" />
                      <div className="absolute bottom-4 left-5">
                        <span className="bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 text-xs px-2.5 py-1 rounded-full">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <h3 className="text-white font-bold text-base leading-snug group-hover:text-indigo-200 transition-colors line-clamp-2" style={{ fontFamily: "var(--font-syne)" }}>
                        {post.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.055]">
                        <div className="flex items-center gap-3 text-white/25 text-xs">
                          <span>{formatDateShort(post.publishedAt)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime} min</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-indigo-400/60 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All posts */}
          {rest.length > 0 && (
            <div>
              <h2 className="text-white/35 text-xs font-semibold uppercase tracking-[0.18em] mb-6">Tous les articles</h2>
              <div className="space-y-2">
                {rest.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}
                    className="group fs-card rounded-xl p-5 flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${post.coverGradient} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-indigo-200 transition-colors truncate" style={{ fontFamily: "var(--font-syne)" }}>{post.title}</h3>
                      <p className="text-white/35 text-xs mt-0.5 truncate">{post.excerpt}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-white/22 text-xs shrink-0">
                      <span className="bg-white/[0.04] border border-white/[0.065] px-2 py-0.5 rounded-full">{post.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime} min</span>
                      <span>{formatDateShort(post.publishedAt)}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-20 text-white/28">
              <p className="text-lg mb-2">Articles en cours de rédaction…</p>
              <p className="text-sm">Revenez bientôt.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
