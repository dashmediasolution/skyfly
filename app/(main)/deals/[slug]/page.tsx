
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Plane,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { deals } from "@/components/travel-data";

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

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Image Only */}
      <section className="relative min-h-[400px] overflow-hidden sm:min-h-[480px] lg:min-h-[540px]">
  <Image
    src={deal.image}
    alt={deal.title}
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
</section>

      {/* Deal Details - Full Width Layout */}
      <section className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#538440]">
              Discover the Offer
            </p>

            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Make Your Next Journey Special with {deal.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600">
              {deal.description} Whether you are planning a family
              holiday, a business trip, a weekend escape, or a visit
              to a new destination, exploring available flight options
              can help you make a more informed travel decision.
            </p>

            <p className="mt-4 text-base leading-8 text-gray-600">
              Our {deal.category.toLowerCase()} offer page helps you
              discover relevant travel information and explore options
              for your upcoming journey. Compare available itineraries,
              review your travel dates, and consider the conditions
              that apply before confirming a booking.
            </p>

            <p className="mt-4 text-base leading-8 text-gray-600">
              Planning ahead can help you compare flight schedules,
              understand ticket restrictions, and prepare for your
              journey. Always review the latest fare details and
              applicable airline policies before making a reservation.
            </p>
          </div>

          {/* Travel Benefits */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <article className="flex items-start gap-4 rounded-xl border border-gray-200 p-5 transition hover:border-[#538440]/40 hover:shadow-md sm:p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#538440]/10">
                <Plane className="size-5 text-[#538440]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Explore Available Flights
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Review flight options based on your departure city,
                  destination, travel dates, and preferred schedule.
                  Availability and fares may vary.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-4 rounded-xl border border-gray-200 p-5 transition hover:border-[#538440]/40 hover:shadow-md sm:p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#538440]/10">
                <CheckCircle2 className="size-5 text-[#538440]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Review Offer Terms
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Check fare rules, baggage allowances, change and
                  cancellation policies, and eligibility requirements
                  before booking.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-4 rounded-xl border border-gray-200 p-5 transition hover:border-[#538440]/40 hover:shadow-md sm:p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#538440]/10">
                <Tag className="size-5 text-[#538440]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Compare Travel Costs
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Compare total fares, including applicable taxes,
                  baggage charges, and optional extras, to understand
                  the overall cost of your journey.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-4 rounded-xl border border-gray-200 p-5 transition hover:border-[#538440]/40 hover:shadow-md sm:p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#538440]/10">
                <CheckCircle2 className="size-5 text-[#538440]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Prepare for Your Trip
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Confirm passenger details, travel documents,
                  check-in requirements, and airline instructions
                  before departure.
                </p>
              </div>
            </article>
          </div>

          <div className="mt-9">
            <Link href="/flights" className="inline-flex">
              <Button className="h-12 bg-[#538440] px-6 text-base font-bold text-white hover:bg-[#426D33]">
                Explore Flights
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Explore This Deal */}
      <section className="bg-[#F8FBF6] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#538440]">
              Travel Planning Made Easier
            </p>

            <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
              Find Travel Options That Fit Your Plans
            </h2>

            <p className="mt-4 text-base leading-8 text-gray-600">
              Every journey starts with the right information. Take
              time to compare available routes, understand fare
              conditions, and prepare for the details that matter
              before your departure.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-lg bg-[#538440]/10">
                <Plane className="size-6 text-[#538440]" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Compare Travel Choices
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Explore routes, departure times, and available fares
                to find an itinerary that matches your preferences.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-lg bg-[#538440]/10">
                <CheckCircle2 className="size-6 text-[#538440]" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Understand the Details
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Check baggage rules, ticket restrictions, payment
                conditions, and cancellation policies before
                completing your reservation.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">
              <div className="flex size-12 items-center justify-center rounded-lg bg-[#538440]/10">
                <Tag className="size-6 text-[#538440]" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Check Current Offers
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Review promotion eligibility, validity, and restrictions.
                Discounts and availability depend on the applicable
                offer terms.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Booking Tips */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-extrabold uppercase tracking-wider text-[#538440]">
            Before You Travel
          </p>

          <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
            Helpful Tips Before Booking Your Flight
          </h2>

          <p className="mt-4 text-base leading-8 text-gray-600">
            A little preparation can make planning your trip easier.
            Keep these points in mind while comparing flights and
            reviewing offers.
          </p>

          <ul className="mt-7 space-y-5">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#538440]" />
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                <strong className="text-gray-900">
                  Compare the total price.
                </strong>{" "}
                Consider taxes, baggage fees, seat selection, and
                other applicable charges instead of comparing the
                base fare alone.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#538440]" />
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                <strong className="text-gray-900">
                  Check ticket conditions.
                </strong>{" "}
                Review change, cancellation, and refund rules before
                purchasing your ticket.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#538440]" />
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                <strong className="text-gray-900">
                  Verify your details.
                </strong>{" "}
                Ensure passenger names and other booking information
                match the relevant travel documents.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#538440]" />
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                <strong className="text-gray-900">
                  Confirm offer availability.
                </strong>{" "}
                Promotions may have limited validity, eligible routes,
                booking periods, or other restrictions.
              </p>
            </li>
          </ul>

          <div className="mt-10 rounded-xl bg-[#F8FBF6] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Ready to Plan Your Next Trip?
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
              Explore available flights, compare your options, and
              review the applicable conditions to make an informed
              travel decision.
            </p>

            <Link href="/flights" className="mt-5 inline-flex">
              <Button className="bg-[#538440] px-6 text-white hover:bg-[#426D33]">
                Find Flights
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="border-t border-gray-100 px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-extrabold uppercase tracking-wider text-[#538440]">
            Need More Information?
          </p>

          <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 divide-y divide-gray-200">
            <article className="py-5">
              <h3 className="text-lg font-bold text-gray-900">
                What is the {deal.title}?
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {deal.description} Review the details displayed on
                this page to understand the promotion and check any
                applicable terms before making a booking.
              </p>
            </article>

            <article className="py-5">
              <h3 className="text-lg font-bold text-gray-900">
                How can I explore flights for this offer?
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Visit our flights page to explore available travel
                options. Compare routes, travel dates, fares, and
                applicable booking conditions before confirming
                your plans.
              </p>
            </article>

            <article className="py-5">
              <h3 className="text-lg font-bold text-gray-900">
                Are advertised discounts available on every flight?
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Not necessarily. Availability can depend on the airline,
                route, travel dates, fare type, eligibility requirements,
                and promotion terms. Check the conditions that apply
                to your booking.
              </p>
            </article>

            <article className="py-5">
              <h3 className="text-lg font-bold text-gray-900">
                Should I check airline policies before travelling?
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Yes. Review the airline's current baggage, check-in,
                cancellation, change, and refund policies. Rules may
                differ by airline and ticket type.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* More Deals */}
      <section className="border-t border-gray-100 bg-[#F8FBF6] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#538440]">
              More Travel Inspiration
            </p>

            <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Explore More Deals
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Discover more offers and travel information for your
              next journey.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals
              .filter((item) => item.slug !== deal.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/deals/${item.slug}`}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-[#538440]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {item.description}
                    </p>

                    <span className="mt-5 inline-flex items-center text-sm font-bold text-[#538440]">
                      View Offer
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
