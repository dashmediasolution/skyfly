"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from "lucide-react";

import TravelDealCard from "./travel-deal-card";
import { deals } from "./travel-data";

const PRIMARY = "#538440";

export default function TopTravelDeals() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>(
      "[data-deal-card]"
    );

    const gap = 16;
    const scrollAmount = card
      ? card.getBoundingClientRect().width + gap
      : container.clientWidth;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="destinations"
      className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mx-auto w-[90%] max-w-[1440px]">
       
 
{/* Section Heading */}
<div className="relative mb-6 sm:mb-8 lg:mb-10">
 
  <div className="text-center">
    <div
      className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide"
      style={{ backgroundColor: "#e4f0e2", color: PRIMARY }}
    >
      <Tag className="size-2.5 fill-current" />
      Limited Time Offers
    </div>

    <div className="text-[25px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[42px]">
    Unlock Efficient Travel{" "}
      <span style={{ color: PRIMARY }}>Deals</span>
    </div>

    <p className="mx-auto mt-2 max-w-xl px-2 text-xs leading-5 text-slate-500 sm:mt-3 sm:px-0 sm:text-sm sm:leading-6 md:text-base">
      Save More, Travel More. Explore top-notch holiday deal to your favorite destination.  
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



        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Previous travel deals"
            className="absolute -left-3 top-[42%] z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition hover:border-[#538440] hover:bg-[#538440] hover:text-white sm:flex lg:-left-4"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
 {deals.map((deal) => (
  <div
    key={deal.slug}
    data-deal-card
    className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.667px)]"
  >
    <TravelDealCard
      slug={deal.slug}
      name={deal.title}
      destination={deal.destination}
      tagline={deal.description}
      overlayTitle={deal.overlayTitle}
      discount={deal.discount}
      image={deal.image}
    />
  </div>
))}
           </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Next travel deals"
            className="absolute -right-3 top-[42%] z-10 hidden size-9 translate-y-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition hover:border-[#538440] hover:bg-[#538440] hover:text-white sm:flex lg:-right-4"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Mobile Controls */}
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
      </div>
    </section>
  );
}