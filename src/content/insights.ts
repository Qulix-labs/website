/**
 * Insights articles. Add entries to publish; the index, detail pages and sitemap update automatically.
 * Body is an array of paragraphs/headings so it can later be swapped for MDX or a CMS response.
 */

export type ArticleBlock = { type: "p"; text: string } | { type: "h2"; text: string };

export type Article = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date */
  published: string;
  topic: string;
  author: string;
  body: ArticleBlock[];
};

export const articles: Article[] = [];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
