import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts, markdownToHtml } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Clock, ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title, description: post.excerpt,
      type: "article", publishedTime: post.publishedAt,
      authors: [post.author.name],
      url: `${SITE_CONFIG.url}/blog/${slug}`,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
    alternates: { canonical: `${SITE_CONFIG.url}/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = markdownToHtml(post.content);
  const related = getRelatedPosts(slug, post.category);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role, url: SITE_CONFIG.url },
    publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_CONFIG.url}/blog/${slug}` },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "fr-FR",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Navbar />
      <main>
        {/* Article hero */}
        <div className={`relative pt-28 pb-14 bg-gradient-to-b ${post.coverGradient} border-b border-white/[0.06] overflow-hidden`}>
          <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07090f] pointer-events-none" />
          <div className="relative fs-container max-w-3xl space-y-5">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />Retour au blog
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-indigo-500/18 border border-indigo-500/28 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Tag className="w-3 h-3" />{post.category}
              </span>
              {post.tags.map(tag => (
                <span key={tag} className="bg-white/[0.06] text-white/40 text-xs px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            {/* H1 unique de cette page article */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-[-0.025em] text-white leading-[1.12]"
              style={{ fontFamily: "var(--font-syne)" }}>
              {post.title}
            </h1>
            <p className="text-white/48 text-lg leading-relaxed max-w-2xl">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-white/32 text-sm pt-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-500/22 border border-indigo-500/28 flex items-center justify-center text-indigo-300 text-xs font-bold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white/65 font-medium text-sm">{post.author.name}</p>
                  <p className="text-white/30 text-xs">{post.author.role}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/[0.1] hidden sm:block" />
              <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(post.publishedAt)}</div>
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readingTime} min de lecture</div>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="fs-container max-w-3xl py-14">
          <article
            className="prose-fs"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Tags footer */}
          <div className="mt-12 pt-8 border-t border-white/[0.065] flex flex-wrap items-center gap-2">
            <span className="text-white/28 text-sm mr-1">Tags :</span>
            {post.tags.map(tag => (
              <span key={tag} className="bg-white/[0.04] border border-white/[0.065] text-white/40 text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          {/* Author bio */}
          <div className="mt-10 bg-white/[0.025] border border-white/[0.065] rounded-2xl p-6 flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-indigo-500/22 border border-indigo-500/28 flex items-center justify-center text-indigo-200 font-bold text-lg shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <p className="text-white font-semibold" style={{ fontFamily: "var(--font-syne)" }}>{post.author.name}</p>
              <p className="text-indigo-400/70 text-sm">{post.author.role}</p>
              <p className="text-white/38 text-sm leading-relaxed">Développeur full stack senior spécialisé Next.js, React Native et intégration IA. Fondateur de FStudios.</p>
              <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm transition-colors mt-1">
                LinkedIn <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-white/[0.065] py-16 bg-white/[0.014]" aria-labelledby="related-heading">
            <div className="fs-container max-w-3xl">
              <h2 id="related-heading" className="text-white font-bold text-xl mb-7" style={{ fontFamily: "var(--font-syne)" }}>
                Articles similaires
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map(p => (
                  <Link key={p.slug} href={`/blog/${p.slug}`}
                    className="group fs-card rounded-xl p-5 flex flex-col gap-3">
                    <div className={`h-24 rounded-lg bg-gradient-to-br ${p.coverGradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 dot-grid opacity-20" />
                    </div>
                    <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-indigo-200 transition-colors line-clamp-2"
                      style={{ fontFamily: "var(--font-syne)" }}>{p.title}</h3>
                    <div className="flex items-center justify-between text-white/25 text-xs">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readingTime} min</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA blog */}
        <section className="py-16" aria-label="Appel à l'action">
          <div className="fs-container max-w-3xl">
            <div className="relative overflow-hidden rounded-2xl bg-indigo-500/[0.055] border border-indigo-500/18 p-8 sm:p-10 text-center">
              <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
              <div className="relative space-y-4">
                <p className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>
                  Besoin d&apos;un dev pour votre projet ?
                </p>
                <p className="text-white/38 text-sm">Devis gratuit en 2 minutes. Réponse sous 24h.</p>
                <Link href="/#quote"
                  className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-indigo-500/18">
                  Obtenir un devis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
