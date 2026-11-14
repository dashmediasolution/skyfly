
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Headset,
  Phone,
} from "lucide-react";

import prisma from "@/lib/prisma";

import FAQSchema from "../blog_components/faq-schema";
import { ArticleFaqs } from "@/components/blog_components/article-faq";
import ArticleSchema from "@/components/seo/article-schema";

import type { Article } from "@/components/blog_components/blog-card";

interface SingleBlogArticle extends Article {
  content: string;
  metaTitle: string;
  metaKeywords: string;
  faqs?: {
    id: string;
    question: string;
    answer: string;
  }[];
}

interface RelatedBlog {
  id: string;
  slug: string;
  title: string;
  imageUrl: string | null;
  publishDate: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL =
  process.env.NEXTAUTH_URL || "https://skyflywithus.com";

const FALLBACK_IMAGE = "/images/airplane-wing2.webp";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getAbsoluteImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) {
    return `${SITE_URL}${FALLBACK_IMAGE}`;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return `${SITE_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

// Cached individual blog
const getSingleBlog = unstable_cache(
  async (slug: string): Promise<SingleBlogArticle | null> => {
    const post = await prisma.blog.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        image: true,
        categories: true,
        focusKeyword: true,
        metaTitle: true,
        metaDesc: true,
        metaKeywords: true,
        faqs: true,
        createdAt: true,
      },
    });

    if (!post) return null;

    const faqs = Array.isArray(post.faqs)
      ? post.faqs.map((faq, index) => {
          const item = faq as {
            id?: string;
            question: string;
            answer: string;
          };

          return {
            id: item.id || `${post.slug}-faq-${index + 1}`,
            question: item.question,
            answer: item.answer,
          };
        })
      : [];

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content || "",
      imageUrl: post.image || FALLBACK_IMAGE,
      categories: post.categories || [],
      metaDesc: post.metaDesc || "",
      metaTitle: post.metaTitle || "",
      metaKeywords: post.metaKeywords || "",
      publishDate: formatDate(post.createdAt),
      faqs,
    };
  },
  ["individual-blog"],
  {
    revalidate: 3600,
    tags: ["blogs"],
  }
);

// Cached related blogs
const getRelatedBlogs = unstable_cache(
  async (slug: string): Promise<RelatedBlog[]> => {
    const currentPost = await prisma.blog.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        categories: true,
      },
    });

    if (!currentPost) return [];

    const relatedPosts = await prisma.blog.findMany({
      where: {
        slug: {
          not: slug,
        },
        ...(currentPost.categories.length > 0
          ? {
              categories: {
                hasSome: currentPost.categories,
              },
            }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        slug: true,
        title: true,
        image: true,
        createdAt: true,
      },
    });

    return relatedPosts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      imageUrl: post.image || FALLBACK_IMAGE,
      publishDate: formatDate(post.createdAt),
    }));
  },
  ["related-blogs"],
  {
    revalidate: 3600,
    tags: ["blogs"],
  }
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getSingleBlog(slug);

  if (!post) {
    return {
      title: "Blog Not Found | SkyFlyWithUs",
      description: "The requested blog could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = post.metaTitle || `${post.title} | SkyFlyWithUs`;

  const description =
    post.metaDesc ||
    `Read ${post.title} on SkyFlyWithUs for helpful travel advice and flight tips.`;

  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
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

  if (!post) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(slug);

  const heroImage = getAbsoluteImageUrl(post.imageUrl);

  return (
    <main className="min-h-screen bg-[#FFFCF8]">
      {/* Structured Data */}
      <ArticleSchema article={post} />
      <FAQSchema faqs={post.faqs} />

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
              className="
                blog-content
                prose prose-lg max-w-none
                prose-headings:font-bold
                prose-headings:tracking-tight
                prose-headings:text-[#17211D]
                prose-p:leading-8
                prose-p:text-[#505A53]
                prose-a:text-[#538440]
                prose-a:no-underline
                hover:prose-a:underline
                prose-strong:text-[#17211D]
                prose-li:text-[#505A53]
                prose-blockquote:border-l-[#538440]
                prose-img:rounded-2xl
                prose-table:w-full
                prose-table:border-collapse
                prose-th:border
                prose-th:border-[#DDE5D8]
                prose-th:bg-[#EAF2E6]
                prose-th:px-4
                prose-th:py-3
                prose-th:text-left
                prose-th:text-sm
                prose-th:font-bold
                prose-th:text-[#20331D]
                prose-td:border
                prose-td:border-[#DDE5D8]
                prose-td:px-4
                prose-td:py-3
                prose-td:text-sm
                prose-td:text-[#505A53]
                prose-tr:border-b
                prose-tr:border-[#DDE5D8]
              "
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

          {/* Back to blog */}
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

          {/* Assistance Card */}
          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-4 text-center">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#538440] text-white">
              <Headset size={20} />
            </div>

            <h2 className="mt-3 text-base font-bold text-[#538440]">
              Need Help Booking Flights?
            </h2>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              Speak with our travel team for help with your flight plans.
            </p>

            <a
              href="tel:+18555093791"
              className="mt-3 flex items-center justify-center gap-2 text-base font-bold text-gray-800 hover:text-[#538440]"
            >
              <Phone size={16} />
              1-855-509-3791
            </a>

            <a
              href="tel:+18555093791"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#538440] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
            >
              <Phone size={15} />
              Call for Assistance
            </a>
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
                relatedBlogs.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex gap-3"
                  >
                    <div className="relative h-[76px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-[#EAF2E6]">
                      <Image
                        src={getAbsoluteImageUrl(
                          relatedPost.imageUrl
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
        </aside>
      </div>
    </main>
  );
}
