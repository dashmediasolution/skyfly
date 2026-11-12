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
       <section
        className="relative flex h-[45vh] min-h-0 items-center overflow-hidden border-b border-[#E7EDE3] bg-[#F5F8F2]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F8F2] via-[#F5F8F2]/95 via-45% to-[#F5F8F2]/10" />

        {/* Decorative Circles */}
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-[#DCE8D5]/60" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-72 w-72 rounded-full border border-[#DCE8D5]/60" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">

            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#538440]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#538440] sm:text-xs">
                Our Blog
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-semibold leading-[1.15] tracking-tight text-[#20331D] sm:text-4xl lg:text-5xl">
              Travel tips, guides {" "}
              <span className="mt-1  font-serif font-normal italic text-[#538440]">
                and stories.
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-6 text-[#53634F] sm:text-sm md:text-base sm:leading-7">
              Read our latest blogs for travel tips, flight information,
              airline guides, and ideas for your next trip.
            </p>

          </div>
        </div>
      </section>

      <BlogCategoryNav activeSlug={category.slug} />

      <section
        id="category-articles"
        className="mx-auto max-w-7xl px-5  sm:px-8 mb-10  "
      >
        <div className="mb-7 flex flex-col justify-between gap-5 border-b border-[#E7EDE3]   sm:flex-row sm:items-end">
 

            
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