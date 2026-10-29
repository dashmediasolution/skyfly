
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Headset,
  MapPin,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

const GREEN = "#538440";
const DARK_GREEN = "#3F6632";
import FlightSearch from "@/components/homePage/FlightSearch";
import FlightFAQ from "@/components/FlightFAQ";
const destinations: Record<
  string,
  {
    name: string;
    country: string;
    image: string;
    description: string;
  }
> = {
  amsterdam: {
    name: "Amsterdam",
    country: "Netherlands",
    image: "/images/routes/amsterdam.webp",
    description: "Discover canals, historic streets and beautiful Dutch architecture.",
  },
  bali: {
    name: "Bali",
    country: "Indonesia",
    image: "/images/routes/bali.webp",
    description: "Discover tropical beaches, beautiful temples and island adventures.",
  },
  barcelona: {
    name: "Barcelona",
    country: "Spain",
    image: "/images/routes/barcelona.webp",
    description: "Explore vibrant streets, iconic architecture and Mediterranean beaches.",
  },
  london: {
    name: "London",
    country: "United Kingdom",
    image: "/images/destinations/london2.webp",
    description: "Discover historic landmarks, culture and iconic city attractions.",
  },
  paris: {
    name: "Paris",
    country: "France",
        image: "/images/routes/image_60.webp",
    description: "Compare fares and plan your unforgettable Paris escape.",
  },
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    image: "/images/routes/dubai.webp",
    description: "Discover world-class attractions, shopping and desert adventures.",
  },
  singapore: {
    name: "Singapore",
    country: "Singapore",
    image: "/images/routes/singapore.webp",
    description: "Explore beautiful gardens, incredible food and vibrant city life.",
  },
  "new-york": {
    name: "New York",
    country: "United States",
    image: "/images/routes/new-york.webp",
    description: "Plan your city escape and discover the sights of New York.",
  },
  rome: {
    name: "Rome",
    country: "Italy",
    image: "/images/routes/rome.webp",
    description: "Experience ancient landmarks, Italian food and timeless streets.",
  },
  tokyo: {
    name: "Tokyo",
    country: "Japan",
    image: "/images/routes/tokyo.webp",
    description: "Discover modern attractions and traditional Japanese culture.",
  },
  istanbul: {
    name: "Istanbul",
    country: "Türkiye",
    image: "/images/routes/istanbul.webp",
    description: "Explore historic landmarks, lively markets and waterfront views.",
  },
  bangkok: {
    name: "Bangkok",
    country: "Thailand",
    image: "/images/routes/bangkok.webp",
    description: "Discover temples, street food and exciting city adventures.",
  },
};

const popularRoutes = [
  {
    name: "Bali",
    image: "/images/routes/bali.webp",
    href: "/flights/bali",
  },
  {
    name: "Dubai",
    image: "/images/routes/dubai.webp",
    href: "/flights/dubai",
  },
 
  {
    name: "Italy",
    image: "/images/routes/rome.webp",
    href: "/flights/rome",
  },
  {
    name: "Paris",
    image: "/images/routes/image_60.webp",
    href: "/flights/paris",
  },
];

const contentSections = [
  {
    title: "How to Find Flights",
    description:
      "Finding the right flight is easier than you think. Compare available options to find a journey that suits your schedule and budget.",
    bullets: [
      "Compare flight options and departure times.",
      "Check baggage allowances and layover details.",
      "Consider flexible travel dates when possible.",
      "Look for seasonal offers and available deals.",
    ],
  },
  {
    title: "How Can I Book a Flight Ticket?",
    description:
      "Booking your flight is simple. Enter your departure city, destination and travel dates. Compare available options, select a suitable flight and follow the booking provider's instructions to complete your reservation.",
    bullets: [],
  },
  {
    title: "Best Tips to Book Flights",
    description:
      "A little planning can make it easier to find a flight that suits your itinerary and budget.",
    bullets: [
      "Compare fares across different travel dates.",
      "Check flight duration and stopover details.",
      "Review cancellation and change policies.",
      "Confirm passenger details before payment.",
    ],
  },
  {
    title: "Keep These Things in Mind Before Booking",
    description:
      "Review your travel details carefully before confirming your reservation.",
    bullets: [
      "Check passport and entry requirements.",
      "Confirm baggage limits and additional charges.",
      "Allow sufficient time for connecting flights.",
      "Keep your booking confirmation accessible.",
    ],
  },
  {
    title: "Best Time to Visit",
    description:
      "The best time to visit depends on the local climate, seasonal activities and your travel preferences. Check local weather conditions before finalizing your travel dates.",
    bullets: [],
  },
  {
    title: "Places to Visit",
    description:
      "Explore local attractions, cultural landmarks, food and activities while planning your stay. Organize your itinerary around your arrival time and the length of your trip.",
    bullets: [],
  },
];

const SITE_URL = "https://skyflywithus.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string }>;
}): Promise<Metadata> {
  const { destination: slug } = await params;
  const destination = destinations[slug.toLowerCase()];

  if (!destination) {
    return {
      title: "Destination Not Found | SkyFlyWithUs",
      description:
        "Explore available flight routes and find your next destination with SkyFlyWithUs.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const name = destination.name;
  const country = destination.country;
  const pageTitle = `Flights to ${name}, ${country} | SkyFlyWithUs`;

  const description = `Compare flights to ${name}, ${country} with SkyFlyWithUs. Explore flight options, check travel tips and plan your next trip with ease.`;

  const keywords = [
    `flights to ${name}`,
    `cheap flights to ${name}`,
    `flight tickets to ${name}`,
    `${name} flights`,
    `flights to ${name} ${country}`,
    `air tickets to ${name}`,
    `book flights to ${name}`,
    `${name} travel guide`,
    "cheap flights",
    "SkyFlyWithUs",
  ];

  const canonicalUrl = `${SITE_URL}/flights/${slug.toLowerCase()}`;

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: "SkyFlyWithUs",
      type: "website",
      images: [
        {
          url: destination.image,
          alt: `Flights to ${name}`,
        },
      ],
    },
  
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination: slug } = await params;
  const destination = destinations[slug.toLowerCase()];

  if (!destination) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="text-2xl font-bold text-[#538440]">
          Destination not found
        </h1>
        <p className="text-sm text-gray-600">
          Please choose a destination from our flight routes.
        </p>
        <Link
          href="/flights"
          className="rounded-lg bg-[#538440] px-5 py-3 text-white hover:bg-[#3F6632]"
        >
          Back to Flights
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative isolate min-h-[240px] overflow-hidden border-t-2 border-[#538440] sm:min-h-[285px] lg:min-h-[315px]">
        <Image
          src={destination.image}
          alt={`Flights to ${destination.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#102D35]/75 via-[#102D35]/40 to-transparent" />

        <div className="relative mx-auto flex min-h-[240px] max-w-[1440px] flex-col justify-center px-5 py-8 sm:min-h-[285px] sm:px-8 lg:min-h-[315px] lg:px-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-white sm:text-sm"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/flights" className="hover:underline">
              Flights
            </Link>
            <ChevronRight size={13} />
            <span>Flights to {destination.name}</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Flights to {destination.name}
          </h1>

          <p className="mt-3 max-w-xl text-sm text-white/95 sm:text-base">
            Compare fares and plan your {destination.name} escape.
          </p>
        </div>
      </section>
 
      {/* Destination Content and Sidebar */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 pb-12 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-12 lg:pt-12">
        {/* Main Information */}
        <div className="min-w-0 space-y-6">
          {contentSections.map((section) => (
            <section
              key={section.title}
              className="flex items-start gap-3 sm:gap-4"
            >
              <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
                <Plane size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-tight text-[#538440] sm:text-2xl">
                  {section.title} {destination.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {section.description}
                </p>

                {section.bullets.length > 0 && (
                  <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm leading-5 text-gray-600 marker:text-[#538440]">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="flex items-start gap-3 sm:gap-4">
            <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#538440] sm:text-2xl">
                Travel Assistance for {destination.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Before travelling to {destination.country}, review your
                airline ticket conditions, baggage allowance and applicable
                entry requirements. Keep your booking confirmation and travel
                documents accessible throughout your journey.
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Help Card */}
          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-5 text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#538440] text-white">
              <Headset size={22} />
            </div>

            <h2 className="mt-3 text-base font-bold leading-5 text-[#538440]">
              Need help planning
              <br />
              your flight?
            </h2>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              Our travel team can help you review your options and plan your trip.
            </p>

            <div
          
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#538440]"
             >
               <Phone size={16} />
             <span className="text-xl">1-855-509-3791</span>

            </div>

            

            <a
                href="tel:+18555093791"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#538440] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
            >
              <Phone size={14} />
              Request a Call
            </a>
          </div>

          {/* Popular Routes */}
          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-3">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <Plane size={15} className="text-[#538440]" />
                Popular Routes
              </h2>

              <Link
                href="/flights"
                className="flex items-center gap-1 text-xs text-[#538440] hover:underline"
              >
                View All <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-2">
              {popularRoutes.map((route) => (
                <Link
                  key={route.name}
                  href={route.href}
                  className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-2 transition hover:border-[#538440]/50 hover:shadow-sm"
                >
                  <div className="relative h-12 w-[78px] shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={route.image}
                      alt={route.name}
                      fill
                      sizes="78px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#538440]">
                      Flights to {route.name}
                    </p>
                    <p className="mt-1 text-[10px] text-gray-500">
                      Compare flight options
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
        <FlightFAQ
        destinationSlug={slug.toLowerCase()}
        destinationName={destination.name}
      />
    </main>
  );
}
