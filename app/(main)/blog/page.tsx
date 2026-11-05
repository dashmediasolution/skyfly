
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Plane } from "lucide-react";

import {
  BlogCard,
  type Article,
} from "@/components/blog_components/blog-card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { BlogCategoryNav } from "./blog_components/blog-category-nav";

export const metadata: Metadata = {
  title: "Travel Blog, Flight Tips & Travel Guides | SkyFlyWithUs",
  description:
    "Explore the SkyFlyWithUs travel blog for practical flight tips, airline policies, baggage information, cancellation and refund guides, and expert travel advice to plan your journey with confidence.",
  keywords: [
    "Travel Blog",
    "Flight Tips",
    "Travel Guides",
    "Airline Policies",
    "Flight Booking Tips",
    "Flight Cancellation Policy",
    "Flight Refund Guide",
    "Flight Change Policy",
    "Airline Baggage Allowance",
    "Travel Advice",
    "Air Travel Tips",
    "SkyFlyWithUs Blog",
  ],
  alternates: {
    canonical: "https://skyflywithus.com/blog",
  },
  openGraph: {
    title: "Travel Blog, Flight Tips & Travel Guides | SkyFlyWithUs",
    description:
      "Discover flight tips, airline policy guides, baggage information, cancellation advice, and useful travel insights on the SkyFlyWithUs blog.",
    url: "https://skyflywithus.com/blog",
    siteName: "SkyFlyWithUs",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
    <main className="min-h-screen bg-white text-[#17211D] by-6">

      {/* HERO SECTION - 50% VIEWPORT HEIGHT */}



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



      {/* BLOG CONTENT */}
      <section className="mx-auto max-w-7xl  ">

        <BlogCategoryNav />


        {/* LATEST ARTICLES */}
        <div id="latest-articles" className="scroll-mt-6 mb-16">

          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#E7EDE3] pb-4">

          </div>

          {allBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {allBlogs.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>

              {metadata.totalPages > 1 && (
                <div className="mt-8 flex justify-center border-t border-[#E7EDE3] pt-6">
                  <PaginationControls
                    currentPage={metadata.currentPage}
                    totalPages={metadata.totalPages}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-[#D6E5CF] bg-[#F8FAF6] px-5 py-10 text-center">
              <BookOpen className="mx-auto text-[#538440]" size={26} />

              <h3 className="mt-3 text-lg font-semibold text-[#20331D]">
                Articles coming soon.
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68716A]">
                We are preparing more travel insights and practical guides.
                Please check back soon.
              </p>

              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#538440]"
              >
                Back to homepage
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

      </section>
    </main>
  );

}
