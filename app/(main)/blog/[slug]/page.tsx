
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  BookOpen,
} from "lucide-react";

import { LetterAvatar } from "@/components/ui/letter-avatar";
import { Article } from "@/components/blog_components/blog-card";
import { ArticleFaqs } from "@/components/blog_components/article-faq";
import ArticleSchema from "@/components/seo/article-schema";

interface SingleBlogArticle extends Article {
  categories?: string[];
}

interface RelatedBlog {
  id: string;
  slug: string;
  title: string;
  imageUrl?: string;
  image?: string;
  publishDate?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL =
  process.env.NEXTAUTH_URL || "https://skyflywithus.com";

async function getSingleBlog(
  slug: string
): Promise<SingleBlogArticle | null> {
  if (!slug) return null;

  try {
    const response = await fetch(
      `${SITE_URL}/api/blogs/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    const post = data.blog ?? data;

    return {
      ...post,
      imageUrl: post.imageUrl || "/images/airplane-wing2.webp",
      publishDate: post.publishDate || "",
      faqs: post.faqs?.map(
        (
          faq: { id?: string; question: string; answer: string },
          index: number
        ) => ({
          ...faq,
          id: faq.id || `${post.slug}-faq-${index + 1}`,
        })
      ),
    };
  } catch (error) {
    console.error("Individual Blog Fetch Failed:", error);
    return null;
  }
}

async function getRelatedBlogs(
  slug: string
): Promise<RelatedBlog[]> {
  try {
    const response = await fetch(
      `${SITE_URL}/api/blogs/related/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const data = await response.json();

    return Array.isArray(data)
      ? data
      : data.blogs ?? data.relatedBlogs ?? [];
  } catch (error) {
    console.error("Related Post Fetch Error:", error);
    return [];
  }
}

function getAbsoluteImageUrl(imageUrl?: string): string {
  if (!imageUrl) {
    return `${SITE_URL}/images/airplane-wing2.webp`;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return `${SITE_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSingleBlog(slug);

  if (!post) {
    return {
      title: "Article Not Found | SkyFlyWithUs",
      description: "The requested article could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const title = post.metaTitle || `${post.title} | SkyFlyWithUs`;
  const description =
    post.metaDesc ||
    `Read ${post.title} on SkyFlyWithUs for helpful travel advice and flight tips.`;

  const articleUrl = `${SITE_URL}/blog/articles/${post.slug}`;
  const imageUrl = getAbsoluteImageUrl(post.imageUrl);

  return {
    title,
    description,
    keywords: post.metaKeywords
      ?.split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title,
      description,
      url: articleUrl,
      siteName: "SkyFlyWithUs",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function IndividualBlogPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const post = await getSingleBlog(slug);

  if (!post) notFound();

  const relatedBlogs = await getRelatedBlogs(slug);
  const heroImage = getAbsoluteImageUrl(post.imageUrl);

  return (
    <main className="min-h-screen bg-[#FFFCF8]">
      <ArticleSchema article={post} />

      {/* Full-width banner */}
      <section className="w-full overflow-hidden bg-[#17211D]">
        <Image
          src={heroImage}
          alt={post.title}
          width={1648}
          height={928}
          priority
          sizes="100vw"
          className="mx-auto h-auto w-full max-h-[70vh] object-contain"
        />
      </section>
      {/* Article and sticky sidebar */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:px-10 lg:py-14">
        {/* Main article */}
        <div className="min-w-0">
          <article className="rounded-3xl border border-[#ECECE4] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div
              className="blog-content prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#17211D]
                prose-p:leading-8 prose-p:text-[#505A53]
                prose-a:text-[#538440] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#17211D]
                prose-li:text-[#505A53]
                prose-blockquote:border-l-[#538440]
                prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{
                __html: post.content || "",
              }}
            />
          </article>

          {/* FAQ section */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-8 rounded-3xl border border-[#ECECE4] bg-white p-5 shadow-sm sm:p-8">
              <ArticleFaqs questions={post.faqs} />
            </section>
          )}

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-[#DDE5D8] px-5 py-3 text-sm font-semibold text-[#3F6632] transition hover:bg-[#EAF2E6]"
            >
              <ArrowLeft size={16} />
              Browse All Articles
            </Link>
          </div>
        </div>

        {/* Sticky right sidebar */}
        <aside className="h-fit space-y-6 lg:sticky lg:top-24">
          {/* Blog CTA */}
          <div className="rounded-3xl border border-[#E5E9DF] bg-[#EAF2E6] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#538440]">
              <BookOpen size={22} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#538440]">
              SkyFlyWithUs
            </p>

            <h2 className="mt-3 text-xl font-bold leading-snug text-[#17211D]">
              Travel smarter with the right information
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#68716A]">
              Explore practical travel guides, flight tips, and helpful advice
              for your next journey.
            </p>

            <Link
              href="/blog"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#538440] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
            >
              Explore All Articles
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Related articles */}
          <div className="rounded-3xl border border-[#ECECE4] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#17211D]">
                Related Articles
              </h2>
              <span className="rounded-full bg-[#EAF2E6] px-2.5 py-1 text-xs font-semibold text-[#3F6632]">
                {relatedBlogs.length}
              </span>
            </div>

            <div className="mt-5 space-y-5">
              {relatedBlogs.length > 0 ? (
                relatedBlogs.slice(0, 5).map((relatedPost) => (
                  <Link
                    key={relatedPost.id || relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex gap-3"
                  >
                    <div className="relative h-[76px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-[#EAF2E6]">
                      <Image
                        src={getAbsoluteImageUrl(
                          relatedPost.imageUrl || relatedPost.image
                        )}
                        alt={relatedPost.title}
                        fill
                        sizes="88px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="line-clamp-3 text-sm font-semibold leading-5 text-[#17211D] transition group-hover:text-[#538440]">
                        {relatedPost.title}
                      </h3>

                      {relatedPost.publishDate && (
                        <span className="mt-2 block text-xs text-[#68716A]">
                          {relatedPost.publishDate}
                        </span>
                      )}

                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#68716A]">
                        Read Article
                        <ArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm leading-6 text-[#68716A]">
                  No other related articles found.
                </p>
              )}
            </div>
          </div>

          {/* Additional sidebar CTA */}
          <div className="rounded-3xl bg-[#17211D] p-6 text-white">
            <h2 className="text-lg font-bold">More Travel Insights</h2>

            <p className="mt-2 text-sm leading-6 text-white/70">
              Find more guides and useful tips to help you prepare for your
              next trip.
            </p>

            <Link
              href="/blog"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#B9D7A8] transition hover:text-white"
            >
              Visit Our Blog
              <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
