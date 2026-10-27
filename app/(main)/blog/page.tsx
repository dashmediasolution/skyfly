 

import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Plane,
  Sparkles,
} from "lucide-react";

import {
  BlogCard,
  type Article,
} from "@/components/blog_components/blog-card";
import { PaginationControls } from "@/components/ui/pagination-controls";

export const metadata: Metadata = {
  title: "Travel Journal & Flight Tips | SkyFlyWithUs",
  description:
    "Explore expert travel advice, flight tips, airline policies, refunds, and smarter ways to plan your next journey with SkyFlyWithUs.",
  robots: {
    index: false,
    follow: true,
  },
};

const emptyMetadata = {
  totalPosts: 0,
  totalPages: 1,
  currentPage: 1,
  limit: 6,
};

type BlogResponse = {
  data: Article[];
  metadata: typeof emptyMetadata;
};

async function getAllBlogs(page: number): Promise<BlogResponse> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;

    if (!baseUrl) {
      console.error("NEXTAUTH_URL is not configured.");
      return { data: [], metadata: emptyMetadata };
    }

    const response = await fetch(
      `${baseUrl}/api/blogs?page=${page}&limit=6`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return { data: [], metadata: emptyMetadata };
    }

    const result = await response.json();

    return {
      data: Array.isArray(result.data) ? result.data : [],
      metadata: {
        ...emptyMetadata,
        ...(result.metadata ?? {}),
      },
    };
  } catch (error) {
    console.error("All Blogs Page Fetch Error:", error);
    return { data: [], metadata: emptyMetadata };
  }
}

const categories = [
  { name: "Cancellation & Refund", slug: "cancellation-and-refund" },
  { name: "Flight Changes", slug: "change-flight" },
  { name: "Compensation", slug: "compensation" },
  { name: "Seat Upgrades", slug: "seat-upgrade" },
  { name: "Vouchers", slug: "voucher" },
  { name: "Lost & Found", slug: "lost-and-found" },
  { name: "Check-in", slug: "check-in" },
  { name: "Airport Guides", slug: "airport" },
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const parsedPage = Number.parseInt(
    resolvedSearchParams.page || "1",
    10
  );

  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const { data: allBlogs, metadata } = await getAllBlogs(currentPage);

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#FFFCF8] text-[#17211D]">
      {/* Hero Section */}
      <section className="relative border-b border-[#E7EDE3]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(83,132,64,0.13),_transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-24 lg:pt-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D6E5CF] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#3F6632]">
                <Sparkles size={14} />
                The SkyFly travel journal
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Travel better.
                <br />
                <span className="font-serif italic font-normal text-[#538440]">
                  Know more.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#68716A] sm:text-lg">
                Your next journey starts with the right information.
                Discover practical flight advice, airline policy guides,
                and travel insights that help you make confident decisions.
              </p>

              <a
                href="#latest-articles"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#538440] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#538440]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#3F6632]"
              >
                Explore the journal
                <ArrowDownRight size={18} />
              </a>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#E7EDE3] pt-6">
                <div className="flex items-center gap-2 text-sm text-[#68716A]">
                  <BookOpen size={17} className="text-[#538440]" />
                  Helpful travel guides
                </div>

                <div className="flex items-center gap-2 text-sm text-[#68716A]">
                  <Plane size={17} className="text-[#538440]" />
                  Smarter flight planning
                </div>
              </div>
            </div>

            {/* Editorial Illustration */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#D6E5CF]/80 blur-2xl sm:-right-5 sm:-top-5" />

              <div className="relative overflow-hidden rounded-[2rem] border border-[#E3E9DE] bg-[#EAF2E6] p-7 sm:p-10">
                <div className="absolute -right-14 -top-12 h-56 w-56 rounded-full border border-white/80" />
                <div className="absolute -right-5 -top-3 h-40 w-40 rounded-full border border-white/80" />
                <div className="absolute bottom-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />

                <div className="relative flex min-h-[280px] flex-col justify-between sm:min-h-[330px]">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3F6632]">
                      A little inspiration
                    </span>

                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#538440] shadow-sm">
                      <Plane size={22} />
                    </span>
                  </div>

                  <div>
                    <p className="font-serif text-4xl leading-tight tracking-tight text-[#20331D] sm:text-5xl">
                      Every journey
                      <br />
                      has a story.
                    </p>

                    <p className="mt-5 max-w-xs text-sm leading-7 text-[#687A62]">
                      Get the details right, discover something new,
                      and make every mile count.
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#CCDCC5] pt-5">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#53684D]">
                      Read. Plan. Explore.
                    </span>

                    <ArrowRight size={19} className="text-[#538440]" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-2 rounded-2xl border border-[#E5E9E1] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(23,33,29,0.08)] sm:-left-5">
                <p className="text-xs font-medium text-[#858D83]">
                  Your travel companion
                </p>

                <p className="mt-1 text-sm font-bold text-[#20331D]">
                  Insights worth knowing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-[#E7EDE3] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#53684D]">
              Browse by topic
            </h2>

            <span className="text-xs text-[#858D83]">
              Find what you need
            </span>
          </div>

          <nav
            aria-label="Blog categories"
            className="flex gap-2.5 overflow-x-auto pb-2"
          >
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="shrink-0 rounded-full border border-[#E3E9DE] bg-[#FFFCF8] px-5 py-3 text-sm font-medium text-[#515B54] transition-all duration-200 hover:border-[#538440] hover:bg-[#EAF2E6] hover:text-[#3F6632]"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Latest Articles */}
      <section
        id="latest-articles"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#E7EDE3] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#538440]">
              Fresh perspectives
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Latest articles
              <span className="text-[#538440]">.</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-[#68716A] sm:text-base">
              Straightforward answers, useful tips, and ideas for your next
              adventure.
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

        {allBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {allBlogs.map((article) => (
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

            <h3 className="mt-6 text-xl font-semibold tracking-tight text-[#20331D]">
              Something worth reading is on its way.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#68716A]">
              We are preparing more travel insights and practical guides.
              Please check back soon.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#538440] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
            >
              Back to homepage
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#20331D] px-7 py-10 sm:px-12 sm:py-14 lg:px-16">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9D6AC]">
                Before you take off
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                A better trip begins with better information.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#D0DCCB] sm:text-base">
                Explore our guides and feel more prepared for the journey
                ahead.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-[#538440] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3F6632] sm:self-auto"
            >
              Start exploring
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
