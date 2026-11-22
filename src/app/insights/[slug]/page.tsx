import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, PageHero, defaultCta } from "@/components/sections/blocks";
import { Container } from "@/components/ui/primitives";
import { JsonLd } from "@/components/ui/json-ld";
import { articles, getArticle } from "@/content/insights";
import { site } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

/** A placeholder param keeps the route prerenderable while there are no articles; it 404s. */
export function generateStaticParams() {
  return articles.length > 0 ? articles.map((a) => ({ slug: a.slug })) : [{ slug: "_placeholder" }];
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.summary, path: `/insights/${a.slug}` });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <>
      <PageHero
        eyebrow={a.topic}
        title={a.title}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: a.title, path: `/insights/${a.slug}` },
        ]}
        description={
          <p className="text-base">
            {a.author} · <time dateTime={a.published}>{a.published}</time>
          </p>
        }
      />
      <article className="bg-white py-20">
        <Container className="max-w-3xl">
          {a.body.map((block, i) =>
            block.type === "h2" ? (
              <h2 key={i} className="mt-12 mb-4 text-2xl font-semibold">
                {block.text}
              </h2>
            ) : (
              <p key={i} className="mb-6 text-lg leading-relaxed">
                {block.text}
              </p>
            ),
          )}
        </Container>
      </article>
      <CtaBand {...defaultCta} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.summary,
          datePublished: a.published,
          author: { "@type": "Person", name: a.author },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: absoluteUrl(`/insights/${a.slug}`),
        }}
      />
    </>
  );
}
