import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Plane,
  Sparkles,
} from "lucide-react";

import {
  BlogCard,
  type Article,
} from "@/components/blog_components/blog-card";
import { BlogCategoryNav } from "../../blog_components/blog-category-nav";
import { PaginationControls } from "@/components/ui/pagination-controls";
import prisma from "@/lib/prisma";

const PAGE_SIZE = 6;
const SITE_URL = "https://skyflywithus.com";

async function getCategoryBySlug(categorySlug: string) {
  return prisma.blogCategory.findUnique({
    where: {
      slug: categorySlug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
}

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

interface BlogMetadata {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

async function getFilteredBlogs(
  categoryName: string,
  page: number
): Promise<{ data: Article[]; metadata: BlogMetadata }> {
  const where = {
    categories: {
      has: categoryName,
    },
  };

  const [totalPosts, blogs] = await Promise.all([
    prisma.blog.count({
      where,
    }),
    prisma.blog.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    }),
  ]);

  const data: Article[] = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    categories: blog.categories,
    category:
      blog.categories.length > 0
        ? blog.categories[0]
        : "Uncategorized",
    categorySlug:
      blog.categories.length > 0
        ? blog.categories[0].toLowerCase().replace(/\s+/g, "-")
        : "uncategorized",
    description: blog.metaDesc,
    imageUrl: blog.image,
    authorName: blog.author?.name || "Unknown Author",
    publishDate: new Date(blog.createdAt).toLocaleDateString("en-GB"),
    content: blog.content,
    focusKeyword: blog.focusKeyword || "",
    metaTitle: blog.metaTitle,
    metaDesc: blog.metaDesc,
    metaKeywords: blog.metaKeywords,
    faqs: [],
  }));

  return {
    data,
    metadata: {
      totalPosts,
      totalPages: Math.max(1, Math.ceil(totalPosts / PAGE_SIZE)),
      currentPage: page,
      limit: PAGE_SIZE,
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | SkyFlyWithUs",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: `${category.name} Articles | SkyFlyWithUs`,
    description: `Explore travel articles, expert tips, and helpful guides about ${category.name.toLowerCase()} on SkyFlyWithUs.`,
    alternates: {
      canonical: `${SITE_URL}/blog/category/${category.slug}`,
    },
  };
}

export default async function CategoryBlogPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const parsedPage = Number.parseInt(resolvedSearchParams.page || "1", 10);
  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const { data: filteredBlogs, metadata } = await getFilteredBlogs(
    category.name,
    requestedPage
  );

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#FFFCF8] text-[#17211D]">
      <section className="relative border-b border-[#E7EDE3]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(83,132,64,0.13),_transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-24 lg:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-sm"
          >
            <Link
              href="/blog"
              className="font-medium text-[#68716A] transition hover:text-[#538440]"
            >
              Journal
            </Link>

            <span className="text-[#B6C0B1]">/</span>

            <span
              aria-current="page"
              className="font-semibold text-[#538440]"
            >
              {category.name}
            </span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D6E5CF] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#3F6632]">
                <Sparkles size={14} />
                Explore our journal
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                {category.name}
                <span className="text-[#538440]">.</span>
                <br />
                <span className="font-serif font-normal italic text-[#538440]">
                  Made clearer.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#68716A] sm:text-lg">
                Explore helpful articles, expert insights, and practical
                travel guides about {category.name.toLowerCase()}. Find the
                information you need to make your next journey easier.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#category-articles"
                  className="inline-flex items-center gap-3 rounded-full bg-[#538440] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#538440]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#3F6632]"
                >
                  Explore articles
                  <ArrowRight size={17} />
                </a>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-[#DDE6D8] bg-white px-6 py-4 text-sm font-semibold text-[#3F6632] transition hover:bg-[#EAF2E6]"
                >
                  <ArrowLeft size={16} />
                  All topics
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#E7EDE3] pt-6">
                <div className="flex items-center gap-2 text-sm text-[#68716A]">
                  <BookOpen size={17} className="text-[#538440]" />
                  Helpful guides
                </div>

                <div className="flex items-center gap-2 text-sm text-[#68716A]">
                  <CheckCircle2 size={17} className="text-[#538440]" />
                  Practical insights
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#D6E5CF]/80 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-[#DDE7D7] bg-[#EAF2E6] p-7 sm:p-10">
                <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/80" />
                <div className="absolute -right-3 top-2 h-40 w-40 rounded-full border border-white/80" />
                <div className="absolute bottom-10 left-10 h-36 w-36 rounded-full bg-white/50 blur-3xl" />

                <div className="relative flex min-h-[270px] flex-col justify-between sm:min-h-[320px]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#3F6632]">
                      Your travel guide
                    </span>

                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#538440] shadow-sm">
                      {category.slug === "airport" ? (
                        <Plane size={22} />
                      ) : (
                        <Compass size={22} />
                      )}
                    </span>
                  </div>

                  <div>
                    <p className="font-serif text-4xl leading-tight tracking-tight text-[#20331D] sm:text-5xl">
                      Know more.
                      <br />
                      Travel smarter.
                    </p>

                    <p className="mt-5 max-w-xs text-sm leading-7 text-[#687A62]">
                      Discover the answers, tips, and insights that help you
                      prepare for the journey ahead.
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#CCDCC5] pt-5">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#53684D]">
                      SkyFlyWithUs journal
                    </span>

                    <ArrowRight size={19} className="text-[#538440]" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-2 rounded-2xl border border-[#E5E9E1] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(23,33,29,0.08)] sm:-left-5">
                <p className="text-xs font-medium text-[#858D83]">
                  Browse this topic
                </p>

                <p className="mt-1 text-sm font-bold text-[#20331D]">
                  {metadata.totalPosts}{" "}
                  {metadata.totalPosts === 1 ? "article" : "articles"} to
                  explore
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogCategoryNav activeSlug={category.slug} />

      <section
        id="category-articles"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#E7EDE3] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#538440]">
              Curated for you
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Explore the insights
              <span className="text-[#538440]">.</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-[#68716A] sm:text-base">
              Browse our latest articles on {category.name.toLowerCase()} and
              find useful information for your travels.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E3E9DE] bg-white px-4 py-2.5 text-sm text-[#53684D]">
            <BookOpen size={16} className="text-[#538440]" />
            <span>
              {metadata.totalPosts}{" "}
              {metadata.totalPosts === 1 ? "article" : "articles"}
            </span>
          </div>
        </div>

        {filteredBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredBlogs.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>

            {metadata.totalPages > 1 && (
              <div className="mt-16 flex justify-center border-t border-[#E7EDE3] pt-10">
                <PaginationControls
                  currentPage={metadata.currentPage}
                  totalPages={metadata.totalPages}
                />
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#D6E5CF] bg-white px-6 py-20 text-center sm:px-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2E6] text-[#538440]">
              <BookOpen size={27} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#538440]">
              More insights coming soon
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#20331D] sm:text-2xl">
              No articles in this category just yet.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#68716A]">
              We are preparing more helpful content for this topic. In the
              meantime, explore our other travel guides and articles.
            </p>

            <Link
              href="/blog"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#538440] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
            >
              Browse all articles
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#20331D] px-7 py-10 sm:px-12 sm:py-14 lg:px-16">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9D6AC]">
                Keep exploring
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                Your next journey starts with better information.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#D0DCCB] sm:text-base">
                Discover more travel insights, helpful guides, and ideas for
                your next adventure.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-[#538440] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3F6632] sm:self-auto"
            >
              Explore the journal
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}