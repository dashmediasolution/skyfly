"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

const VISIBLE_CATEGORIES = 8;

export function BlogCategoryNav({
  activeSlug,
}: {
  activeSlug?: string;
}) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const isAllBlogsActive = pathname === "/blog";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/blog-categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result: BlogCategory[] = await response.json();
        setCategories(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching blog categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const visibleCategories = categories.slice(0, VISIBLE_CATEGORIES);
  const remainingCategories = categories.slice(VISIBLE_CATEGORIES);

  const categoryClass = (isActive: boolean) =>
    `shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "border-[#538440] bg-[#538440] text-white"
        : "border-[#E3E9DE] bg-[#FFFCF8] text-[#515B54] hover:border-[#538440] hover:bg-[#EAF2E6] hover:text-[#3F6632]"
    }`;

  return (
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
          className="flex flex-wrap items-center gap-2.5"
        >
          <Link
            href="/blog"
            aria-current={isAllBlogsActive ? "page" : undefined}
            className={categoryClass(isAllBlogsActive)}
          >
            All Blogs
          </Link>

          {!isLoading &&
            visibleCategories.map((category) => {
              const isActive = category.slug === activeSlug;

              return (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={categoryClass(isActive)}
                >
                  {category.name}
                </Link>
              );
            })}

          {!isLoading && remainingCategories.length > 0 && (
            <div className="relative">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setIsOpen((previous) => !previous)}
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E5CF] bg-[#EAF2E6] px-5 py-3 text-sm font-semibold text-[#3F6632] transition hover:border-[#538440] hover:bg-[#DCEBD5]"
              >
                More
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close categories menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-50 mt-3 w-64 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-[#E3E9DE] bg-white p-2 shadow-xl shadow-[#20331D]/10">
                    <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#858D83]">
                      All other categories
                    </p>

                    <div className="max-h-72 overflow-y-auto">
                      {remainingCategories.map((category) => {
                        const isActive = category.slug === activeSlug;

                        return (
                          <Link
                            key={category.id}
                            href={`/blog/category/${category.slug}`}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => setIsOpen(false)}
                            className={`block rounded-xl px-3 py-3 text-sm font-medium transition ${
                              isActive
                                ? "bg-[#EAF2E6] text-[#3F6632]"
                                : "text-[#515B54] hover:bg-[#EAF2E6] hover:text-[#3F6632]"
                            }`}
                          >
                            {category.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </section>
  );
}