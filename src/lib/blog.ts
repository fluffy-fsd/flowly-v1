import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "Sans titre",
        excerpt: data.excerpt ?? "",
        content,
        category: data.category ?? "Développement",
        tags: data.tags ?? [],
        publishedAt: data.publishedAt ?? new Date().toISOString(),
        readingTime: getReadingTime(content),
        author: { name: data.authorName ?? "Dorian Gosselin", role: data.authorRole ?? "Founder @ FStudios" },
        featured: data.featured ?? false,
        coverGradient: data.coverGradient ?? "from-indigo-600/20 to-violet-600/10",
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "Sans titre",
    excerpt: data.excerpt ?? "",
    content,
    category: data.category ?? "Développement",
    tags: data.tags ?? [],
    publishedAt: data.publishedAt ?? new Date().toISOString(),
    readingTime: getReadingTime(content),
    author: { name: data.authorName ?? "Dorian Gosselin", role: data.authorRole ?? "Founder @ FStudios" },
    featured: data.featured ?? false,
    coverGradient: data.coverGradient ?? "from-indigo-600/20 to-violet-600/10",
  };
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured).slice(0, 3);
}

export function getRelatedPosts(currentSlug: string, category: string): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, 3);
}

export function getAllCategories(): string[] {
  const cats = getAllPosts().map((p) => p.category);
  return [...new Set(cats)];
}

export function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^---$/gm, "<hr>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]+?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|b|p|o|l|c|i|a])(.*)/gm, (_, line) => (line.trim() ? `<p>${line}</p>` : ""))
    .replace(/<p><\/p>/g, "")
    .replace(/<p>(<h[23]>)/g, "$1")
    .replace(/(<\/h[23]>)<\/p>/g, "$1")
    .replace(/<p>(<ul>)/g, "$1")
    .replace(/(<\/ul>)<\/p>/g, "$1")
    .replace(/<p>(<blockquote>)/g, "$1")
    .replace(/(<\/blockquote>)<\/p>/g, "$1")
    .replace(/<p>(<pre>)/g, "$1")
    .replace(/(<\/pre>)<\/p>/g, "$1")
    .replace(/<p>(<hr>)<\/p>/g, "$1");
}
