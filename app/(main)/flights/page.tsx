
import Image from "next/image";
import Link from "next/link";

import {
    ShieldCheck,
    FileCheck,
    Headset,
    ThumbsUp,
    MapPin,
} from "lucide-react";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("flights");

const SITE_URL =
    process.env.NEXTAUTH_URL || "http://localhost:3000";

type FlightDestination = {
    id: string;
    title: string;
    slug: string;
    destination: string;
    country: string;
    airportCode?: string | null;
    excerpt?: string | null;
    heroImage?: string | null;
    metaTitle?: string | null;
    publishedAt?: string | null;
};

const benefits = [
    {
        title: "Best Price Guarantee",
        description: "Get the best deals on your flights.",
        Icon: ShieldCheck,
    },
    {
        title: "Clear Policies",
        description: "Know your fare policies before you fly.",
        Icon: FileCheck,
    },
    {
        title: "24/7 Support",
        description: "We're here whenever you need us.",
        Icon: Headset,
    },
    {
        title: "Trusted by Travelers",
        description: "Millions of happy travelers worldwide.",
        Icon: ThumbsUp,
    },
];

async function getFlightDestinations(): Promise<FlightDestination[]> {
    try {
        const response = await fetch(
            `${SITE_URL}/api/flight-destinations`,
            {
                next: {
                    revalidate: 300,
                },
            }
        );

        if (!response.ok) {
            console.error(
                "Flight destinations API error:",
                response.status,
                response.statusText
            );

            return [];
        }

        const data = await response.json();

        if (!data.success || !Array.isArray(data.destinations)) {
            return [];
        }

        return data.destinations;
    } catch (error) {
        console.error("Failed to fetch flight destinations:", error);
        return [];
    }
}

export default async function FlightBookingPage() {
    const destinations = await getFlightDestinations();

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">

            {/* Flight Hero */}
            <section className="relative isolate flex min-h-[310px] w-full items-center overflow-hidden sm:min-h-[360px] lg:min-h-[390px]">
                <Image
                    src="/images/FlightBanner1.webp"
                    alt="Flight travel and destination"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8F0]/95 via-[#F4F8F0]/55 to-transparent" />

                <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFD2] px-3 py-1.5 text-xs font-bold tracking-wide text-[#315F2A]">
                            FLIGHTS
                        </span>

                        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight  sm:text-5xl lg:text-6xl">
                        Cheap Flights to Your Most Popular Destinations
                        </h1>

                        

                     
                    </div>
                </div>
            </section>

            {/* Flight Benefits */}
            <section className="w-full px-4 py-5 sm:px-6 md:px-8 lg:px-12">
                <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map(({ title, description, Icon }) => (
                        <div
                            key={title}
                            className="flex items-start gap-3 border border-[#538440]/15 bg-[#F8FBF6] p-4 transition hover:border-[#538440]/40 hover:shadow-sm"
                        >
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
                                <Icon size={23} />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                                    {title}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Flight Deals Introduction */}
            <section className="w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-[1440px]">

                 
<div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
  {/* Left Image */}
  <div className="relative w-full lg:sticky lg:top-24">
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-[#538440]/20 sm:h-[420px] lg:h-[560px]">
      <Image
        src="/images/flight-deals.webp"
        alt="Traveler enjoying a flight"
        fill
        sizes="(max-width: 1023px) 100vw, 42vw"
        className="object-cover"
      />
    </div>
  </div>

  {/* Right Content */}
  <div className="space-y-7">
    <div>
      

      <p className="mt-4 text-base leading-8 text-gray-600 lg:text-lg">
        We can help you find some great cheap flights, whether you are looking
        to travel to popular destinations within the US or worldwide. Whether
        you want to fly to New York, Los Angeles and Chicago or overseas to
        London, Paris, Dubai or Toronto, we have some great travel opportunities.
      </p>

      <p className="mt-4 text-base leading-8 text-gray-600 lg:text-lg">
        With us, you can explore the flight options available and compare
        different travel options. Whether you need a one-way flight, a return
        flight or help planning a multi-city trip, we can help.
      </p>
    </div>

    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
        Booking Flights Made Easy!
      </h3>

      <p className="mt-4 text-base leading-8 text-gray-600 lg:text-lg">
        We know that sometimes your travel plans can change. We can help with
        flight bookings, amending bookings, cancellations, name corrections
        and providing information about airline policies. We want to help you
        understand your options better.
      </p>

      <p className="mt-4 text-base leading-8 text-gray-600 lg:text-lg">
        Before you book, always check baggage allowances, pricing, change
        policies and cancellation policies. These will depend on the airline
        and the ticket you purchase.
      </p>
    </div>

    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
        Plan Your Next Adventure
      </h3>

      <p className="mt-4 text-base leading-8 text-gray-600 lg:text-lg">
        Whether you are looking to travel to popular destinations, find cheap
        flights or need help with your travel plans, SkyFlyWithUs is here to
        help you explore your options.
      </p>
    </div>

    <div className="rounded-xl bg-[#538440]/10 p-5 sm:p-6">
      <p className="text-base font-semibold leading-8 text-gray-800 lg:text-lg">
        Call SkyFlyWithUs at{" "}
        <a
          href="tel:18555093791"
          className="font-bold text-[#538440] hover:underline"
        >
          1-855-509-3791
        </a>{" "}
        so we can help you with your flight bookings.
      </p>
    </div>
  </div>
</div>



                    {/* Popular Flight Routes */}
                    <div className="mt-12 sm:mt-16 lg:mt-20">

                        <div className="flex flex-col justify-center gap-5">
                            <div className="mx-auto max-w-5xl text-center">
                                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#EAF2E6] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#538440]">
                                    <MapPin size={14} className="mr-2" />
                                    Travel More
                                </div>

                                <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                                    Explore Popular Flight Routes
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                    From bustling cities to serene getaways,
                                    discover destinations around the world.
                                    Find your next flight and start planning
                                    your adventure.
                                </p>
                            </div>
                        </div>

                        {/* Dynamic Destination Cards */}
                        {destinations.length > 0 ? (
                            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:gap-6">

                                {destinations.map((destination) => (
                                    <Link
                                        key={destination.id}
                                        href={`/flights/${destination.slug}`}
                                        className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#538440]/50 hover:shadow-lg"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden bg-[#EAF2E6]">

                                            <Image
                                                src={
                                                    destination.heroImage ||
                                                    "/images/FlightBanner1.webp"
                                                }
                                                alt={`Flights to ${destination.destination}`}
                                                fill
                                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                        </div>

                                        <div className="flex w-full items-center justify-between gap-3 border-l-4 border-[#538440] px-4 py-4">
                                            <div className="flex w-full flex-col gap-1">
                                                <h3 className="text-center text-base font-semibold text-gray-800 sm:text-lg">
                                                    Flights to {destination.destination}
                                                </h3>

                                                <p className="text-center text-sm text-gray-500">
                                                    {destination.country}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        ) : (
                            <div className="mt-10 border border-dashed border-gray-300 bg-gray-50 px-5 py-12 text-center">
                                <MapPin
                                    size={32}
                                    className="mx-auto text-[#538440]"
                                />

                                <h3 className="mt-3 text-lg font-bold text-gray-900">
                                    No destinations available
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Published flight destinations will appear here.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </main>
    );
}
