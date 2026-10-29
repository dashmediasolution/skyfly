
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Headset,
  Phone,
  Plane,
  ShieldCheck,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { deals } from "@/components/travel-data";
import FlightFAQ from "@/components/FlightFAQ";

const GREEN = "#538440";
const DARK_GREEN = "#3F6632";

type DealPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DealDetailPage({
  params,
}: DealPageProps) {
  const { slug } = await params;

  const deal = deals.find((item) => item.slug === slug);

  if (!deal) {
    notFound();
  }

  const otherDeals = deals
    .filter((item) => item.slug !== deal.slug)
    .slice(0, 4);

  const contentSections = [
    {
      title: "Explore Available Flights",
      description: `Explore flight options related to ${deal.title}. Compare available routes, departure times, travel dates, and fare conditions to find an itinerary that suits your plans.`,
      bullets: [
        "Compare available flight schedules and routes.",
        "Consider flexible travel dates when possible.",
        "Review baggage allowances and stopover details.",
      ],
    },
    {
      title: "How to Make the Most of This Deal",
      description:
        "Planning ahead can help you compare available fares and understand the conditions associated with your journey.",
      bullets: [
        "Check the total fare, including applicable taxes and charges.",
        "Review offer validity and eligibility requirements.",
        "Confirm the passenger details before completing a reservation.",
      ],
    },
    {
      title: "Review Booking Conditions",
      description:
        "Every airline and fare type may have different booking conditions. Review the applicable terms before confirming your travel arrangements.",
      bullets: [
        "Check ticket change and cancellation policies.",
        "Confirm baggage limits and additional fees.",
        "Review refund eligibility and payment conditions.",
      ],
    },
    {
      title: "Prepare for Your Journey",
      description:
        "Keep your travel information organized and review the requirements that apply to your selected route before departure.",
      bullets: [
        "Verify passenger names and travel documents.",
        "Check airline check-in requirements.",
        "Keep your booking confirmation accessible.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative w-full isolate flex min-h-[310px] items-center overflow-hidden sm:min-h-[360px] lg:min-h-[390px]">
        <Image
          src="/images/dealsBanner.webp"
          alt="Luxury beachfront hotel and tropical infinity pool"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8F0]/95 via-[#F4F8F0]/55 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFD2] px-3 py-1.5 text-xs font-bold tracking-wide text-[#315F2A]">
              TRAVEL DEALS
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#123C32] sm:text-5xl lg:text-6xl">
              Discover Deals for Your Next Journey
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#344740] sm:text-base">
              Explore exciting flight offers, seasonal discounts, and travel deals
              to make your next getaway easier on your budget.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[#538440]/20 bg-white/80 px-4 py-2 text-sm text-[#315F2A] shadow-sm">
                <ShieldCheck size={17} />
                Offers for Every Journey
              </div>

              <div className="flex items-center gap-2 rounded-full border border-[#538440]/20 bg-white/80 px-4 py-2 text-sm text-[#315F2A] shadow-sm">
                Exclusive Travel Offers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content and Sidebar */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 pb-12 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-12 lg:pt-12">
        {/* Main Information */}
        <div className="min-w-0 space-y-7">
          {/* Introduction */}
          <section className="flex items-start gap-3 sm:gap-4">
            <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
              <Tag size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold uppercase tracking-wider text-[#538440]">
                Discover the Offer
              </p>

              <h2 className="mt-2 text-xl font-bold leading-tight text-[#538440] sm:text-2xl">
                Make Your Next Journey Special
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {deal.description} Whether you are planning a family
                holiday, a business trip, a weekend escape, or a visit
                to a new destination, exploring available flight options
                can help you make an informed travel decision.
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Our {deal.category.toLowerCase()} information helps you
                explore relevant travel options for your upcoming journey.
                Compare available itineraries, review your preferred
                dates, and check the conditions that apply before
                confirming a booking.
              </p>
            </div>
          </section>

          {/* Content Sections */}
          {contentSections.map((section, index) => (
            <section
              key={section.title}
              className="flex items-start gap-3 sm:gap-4"
            >
              <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
                {index === 0 ? (
                  <Plane size={18} />
                ) : index === 1 ? (
                  <Tag size={18} />
                ) : index === 2 ? (
                  <ShieldCheck size={18} />
                ) : (
                  <CheckCircle2 size={18} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-tight text-[#538440] sm:text-2xl">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {section.description}
                </p>

                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600 marker:text-[#538440]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          {/* Travel Assistance */}
          <section className="flex items-start gap-3 sm:gap-4">
            <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
              <ShieldCheck size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold leading-tight text-[#538440] sm:text-2xl">
                Travel Assistance for Your Journey
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Before making a reservation, review the relevant airline
                policies, baggage allowance, and ticket conditions. Fare
                availability, prices, and promotional terms may change.
                Always verify the applicable details before completing
                your booking.
              </p>

              <Link href="/flights" className="mt-5 inline-flex">
                <Button className="h-11 bg-[#538440] px-5 text-sm font-bold text-white hover:bg-[#3F6632]">
                  Explore Flights
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-5">
          {/* Assistance Card */}
          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-5 text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#538440] text-white">
              <Headset size={22} />
            </div>

            <h2 className="mt-3 text-base font-bold leading-5 text-[#538440]">
              Need Help Planning Your Trip?
            </h2>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              Get assistance reviewing available travel options and
              understanding the conditions that apply to your journey.
            </p>

            <a
              href="tel:+18555093791"
              className="mt-4 inline-flex items-center justify-center gap-2 text-lg font-semibold text-gray-700 transition hover:text-[#538440]"
            >
              <Phone size={16} />
              <span>1-855-509-3791</span>
            </a>

            <a
              href="tel:+18555093791"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#538440] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
            >
              <Phone size={14} />
              Call for Assistance
            </a>
          </div>

          {/* Popular Deals */}
          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-3">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <Tag size={15} className="text-[#538440]" />
                More Travel Deals
              </h2>

              <Link
                href="/deals"
                className="flex items-center gap-1 text-xs text-[#538440] hover:underline"
              >
                View All
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-2">
              {otherDeals.map((item) => (
                <Link
                  key={item.slug}
                  href={`/deals/${item.slug}`}
                  className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-2 transition hover:border-[#538440]/50 hover:shadow-sm"
                >
                  <div className="relative h-12 w-[78px] shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="78px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-semibold text-[#538440]">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500">
                      Explore travel options
                    </p>
                  </div>

                  <ArrowRight
                    size={14}
                    className="shrink-0 text-[#538440]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Frequently Asked Questions */}
      <FlightFAQ
        destinationSlug="travel-deals"
        destinationName="Travel Deals"
      />
    </main>
  );
}
