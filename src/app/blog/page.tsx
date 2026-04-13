import { getArticles } from "@/lib/blog";
import BlogListClient from "./BlogListClient";

export default function BlogPage() {
  const articles = getArticles();
  return <BlogListClient articles={articles} />;
}
