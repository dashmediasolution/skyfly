
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";

import TravelDealCard from "./travel-deal-card";

const PRIMARY = "#538440";

type Deal = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  publishedAt?: string | null;
};

export default function TopTravelDeals() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDeals = async () => {
      try {
        const response = await fetch("/api/deals", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch deals");
        }

        const result = await response.json();

        const data = Array.isArray(result)
          ? result
          : result.deals ?? [];

        const latestDeals = [...data]
          .sort(
            (a, b) =>
              new Date(b.publishedAt || 0).getTime() -
              new Date(a.publishedAt || 0).getTime()
          )
          .slice(0, 3);

        setDeals(latestDeals);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Deals API error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDeals();

    return () => controller.abort();
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>(
      "[data-deal-card]"
    );

    const scrollAmount = card
      ? card.getBoundingClientRect().width + 16
      : container.clientWidth;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="top-deals"
      className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mx-auto w-[90%] max-w-[1440px]">

        {/* Section Heading */}
        <div className="relative mb-6 sm:mb-8 lg:mb-10">
          <div className="text-center">
            <div
              className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide"
              style={{
                backgroundColor: "#e4f0e2",
                color: PRIMARY,
              }}
            >
              <Tag className="size-2.5 fill-current" />
              Limited Time Offers
            </div>

            <h2 className="text-[25px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[42px]">
              Unlock Efficient Travel{" "}
              <span style={{ color: PRIMARY }}>Deals</span>
            </h2>

            <p className="mx-auto mt-2 max-w-xl px-2 text-xs leading-5 text-slate-500 sm:mt-3 sm:px-0 sm:text-sm sm:leading-6 md:text-base">
              Save More, Travel More. Explore top-notch holiday
              deals to your favorite destination.
            </p>
          </div>

          <div className="mt-4 flex justify-center sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:text-sm"
              style={{ backgroundColor: PRIMARY }}
            >
              All Deals
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden border border-gray-100"
              >
                <div className="h-[170px] bg-slate-200 sm:h-[145px] lg:h-[152px]" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-2/3 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : deals.length > 0 ? (
          <>
            {/* Carousel */}
            <div className="relative">

              {/* Left Arrow */}
              {deals.length > 1 && (
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  aria-label="Previous travel deals"
                  className="absolute -left-3 top-[42%] z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition hover:border-[#538440] hover:bg-[#538440] hover:text-white sm:flex lg:-left-4"
                >
                  <ChevronLeft className="size-5" />
                </button>
              )}

              {/* Scrollable Cards */}
              <div
                ref={carouselRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {deals.map((deal) => (
                  <div
                    key={deal.id || deal.slug}
                    data-deal-card
                    className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.667px)]"
                  >
                    <TravelDealCard
                      slug={deal.slug}
                      name={deal.title}
                      destination=""
                      tagline={deal.excerpt || ""}
                      overlayTitle={deal.title}
                      discount=""
                      image={deal.featuredImage || ""}
                    />
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              {deals.length > 1 && (
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  aria-label="Next travel deals"
                  className="absolute -right-3 top-[42%] z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition hover:border-[#538440] hover:bg-[#538440] hover:text-white sm:flex lg:-right-4"
                >
                  <ChevronRight className="size-5" />
                </button>
              )}
            </div>

            {/* Mobile Controls */}
            {deals.length > 1 && (
              <div className="mt-2 flex justify-center gap-3 sm:hidden">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  aria-label="Previous travel deals"
                  className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-[#538440] hover:text-white"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  aria-label="Next travel deals"
                  className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-[#538440] hover:text-white"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="py-10 text-center text-sm text-slate-500">
            No travel deals available.
          </p>
        )}
      </div>
    </section>
  );
}
