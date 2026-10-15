"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/components/ui/testimonial-card";

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Frequent Flyer",
    rating: 5,
    testimonial:
      "SkyFlyWithUs has transformed the way I book travel. The booking form was incredibly easy to use, and I found the cheapest flight to Bali in seconds. The travel blogs are also a fantastic bonus!",
  },
  {
    name: "Jonathan Yombo",
    role: "Travel Blogger",
    rating: 5,
    testimonial:
      "This is the only site I use now. The Perfect Experience form is a game-changer for finding exactly what I need without the hassle.",
  },
  {
    name: "Yucel Faruksahan",
    role: "Digital Nomad",
    rating: 5,
    testimonial:
      "I got an amazing deal on my flight to Tokyo. The Book Instantly button is no joke. Highly recommend for anyone looking to save time and money.",
  },
  {
    name: "Emily Carter",
    role: "Business Traveler",
    rating: 5,
    testimonial:
      "Finding flight information has never been easier. SkyFlyWithUs makes comparing travel options simple, and the helpful travel guides make planning my next trip much smoother.",
  },
  {
    name: "Michael Anderson",
    role: "Adventure Traveler",
    rating: 5,
    testimonial:
      "I love how easy it is to explore new destinations and find useful flight tips in one place. The website is clean, fast, and genuinely helpful when planning a vacation.",
  },
  {
    name: "Priya Sharma",
    role: "Holiday Planner",
    rating: 5,
    testimonial:
      "The travel blogs are full of useful information, and the website makes researching flights so convenient. I would definitely recommend SkyFlyWithUs to anyone planning their next holiday.",
  },
];

export function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>(
      "[data-testimonial-card]"
    );

    const scrollAmount = card
      ? card.getBoundingClientRect().width + 24
      : container.clientWidth;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white py-16 sm:py-20">
      <div className="container mx-auto space-y-10 px-6">
        {/* Section Header */}
        <div className="max-w-xl space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Reviews &{" "}
            <span className="text-primary">Experiences</span>
          </h2>

          <p className="text-base leading-7 text-gray-600 sm:text-lg">
            Discover what travelers think about SkyFlyWithUs and how our
            flight information and travel guides help make planning easier.
          </p>
        </div>

        {/* Carousel with Side Arrows */}
        <div className="relative px-0 sm:px-12">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                data-testimonial-card
                className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Testimonial
                  {...testimonial}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Previous testimonials"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-primary hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Next testimonials"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-primary hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}