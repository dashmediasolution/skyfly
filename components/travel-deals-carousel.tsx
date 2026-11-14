
"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import TravelDealCard from "./travel-deal-card";

type Deal = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
};

export default function TravelDealsCarousel({
  deals,
}: {
  deals: Deal[];
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

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
            key={deal.id}
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
    </div>
  );
}
