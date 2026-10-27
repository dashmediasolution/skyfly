 // components/home_components/Recent-Articles.tsx

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Tag,
} from "lucide-react";

import { BlogCard, Article } from "@/components/blog_components/blog-card";

// Fetch the latest blog articles
 async function getRecentBlogs(): Promise<Article[]> {
  try {
     const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blogs/all`,
      {
        cache: "no-store",
      }
    );
     if (!response.ok) {
      console.error("API Fetch Failed:", response.status);
      return [];
    }

    const allBlogs: Article[] = await response.json();
     return allBlogs.slice(0, 3);
  } catch (error) {
    console.error("Homepage Blog Fetch Error:", error);
    return [];
  }
}
 
export async function RecentArticles() {
  const recentArticles = await getRecentBlogs();

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
      
{/* Section Heading */}
<div className="relative mb-8 sm:mb-10">
  <div className="text-center">
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EAF2E6] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#538440] sm:text-sm">
      <Tag size={16} />
      Traveling Stories
    </div>

    <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
      Level up your knowledge
      <br className="hidden sm:block" /> with our fresh blogs
    </h2>

    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
      Stay ahead with our latest travel updates, expert insights, and
      helpful airline guides. Explore our newest articles for practical
      advice and inspiration for your next journey.
    </p>
  </div>

  <div className="mt-5 flex justify-center md:absolute md:right-0 md:top-1/2 md:mt-0 md:-translate-y-1/2">
    <Link
      href="/blog"
      className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#538440] px-5 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#426D33] hover:shadow-md sm:px-6"
    >
      All Blogs
      <ArrowRight size={21} />
    </Link>
  </div>
</div>


        {/* Recent Blog Articles */}
        {recentArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {recentArticles.map((article) => (
              <article
                key={article.id}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Existing Blog Card */}
                <div className="flex flex-1 flex-col">
                  <BlogCard article={article} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-[#F6F8F3] px-5 py-12 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
              <CalendarDays size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              No recent articles yet
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Check back soon for our latest travel guides and updates.
            </p>
          </div>
        )}

        {/* Mobile-friendly bottom link */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#538440] transition-colors hover:text-[#426D33]"
          >
            Explore all articles
            <ChevronRight size={21} />
          </Link>
        </div>
      </div>
    </section>
  );
}
 