import { getArticle, getAllSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  let data;
  try {
    data = getArticle(slug);
  } catch {
    notFound();
  }

  return <ArticleClient meta={data.meta} content={data.content} />;
}
