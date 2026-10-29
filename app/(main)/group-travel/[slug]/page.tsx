 import Image from "next/image";
import Link from "next/link";
import FlightFAQ from "@/components/FlightFAQ";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Headset,
  Heart,
  MapPin,
  PartyPopper,
  Phone,
  Plane,
  ShieldCheck,
  Users,
  Globe,
} from "lucide-react";

const GREEN = "#538440";
const DARK_GREEN = "#3F6632";

const groupPages = {
  "family-travel": {
    title: "Family Group Travel",
    heading: "Plan a Family Vacation Together",
    category: "Family Holidays",
    location: "Orlando, Florida",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=85",
    description:
      "Plan a family getaway with travel options that help everyone enjoy the journey, from young children to older family members.",
    intro:
      "Family travel is about spending quality time together and creating memories along the way. Organize flights, travel dates and destination plans around your family's needs.",
    points: [
      "Compare flight options for your family's travel dates.",
      "Consider convenient departure times and connections.",
      "Review baggage allowances and seating arrangements.",
      "Keep travel documents and booking details accessible.",
    ],
    icon: Heart,
  },
  "corporate-travel": {
    title: "Corporate Group Travel",
    heading: "Simplify Business Group Travel",
    category: "Business Trips",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    description:
      "Coordinate business travel for teams attending meetings, conferences, company events and professional gatherings.",
    intro:
      "Business group travel requires careful coordination of schedules, destinations and budgets. Plan your team's journey around meeting times and work commitments.",
    points: [
      "Compare flight schedules that fit business itineraries.",
      "Coordinate departure and arrival details for team members.",
      "Review fare rules, baggage policies and change conditions.",
      "Keep company travel confirmations organized.",
    ],
    icon: BriefcaseBusiness,
  },
  "friends-getaways": {
    title: "Friends Group Travel",
    heading: "Make Your Next Group Getaway Special",
    category: "Friends' Getaways",
    location: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1400&q=85",
    description:
      "Bring your friends together for a holiday filled with sightseeing, outdoor activities, beach days and shared experiences.",
    intro:
      "Whether you are planning a reunion, a weekend escape or an international adventure, coordinating the essentials early can make group travel easier.",
    points: [
      "Agree on travel dates and your preferred destination.",
      "Compare flights and departure times as a group.",
      "Discuss budgets and accommodation preferences in advance.",
      "Share booking details and itinerary information with everyone.",
    ],
    icon: Users,
  },
  "student-travel": {
    title: "Student Group Travel",
    heading: "Explore, Learn and Discover Together",
    category: "Educational Trips",
    location: "Washington, D.C., USA",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85",
    description:
      "Explore travel options for student groups, educational visits, academic events and learning experiences beyond the classroom.",
    intro:
      "Educational trips give students opportunities to explore new places and learn through real-world experiences. Organize the itinerary with group size, supervision and travel requirements in mind.",
    points: [
      "Confirm passenger numbers and travel dates early.",
      "Review identification and entry requirements for all travelers.",
      "Coordinate group arrival times and transfers.",
      "Keep emergency contacts and travel documents organized.",
    ],
    icon: GraduationCap,
  },
  "celebration-travel": {
    title: "Celebration Group Travel",
    heading: "Celebrate Together, Travel Together",
    category: "Special Occasions",
    location: "Las Vegas, Nevada",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85",
    description:
      "Plan a group getaway for birthdays, anniversaries, reunions and other special occasions worth celebrating together.",
    intro:
      "A celebration trip gives friends and family a chance to spend meaningful time together. Choose a destination, coordinate dates and plan travel arrangements that work for your group.",
    points: [
      "Choose a destination that suits the occasion.",
      "Coordinate travel dates and arrival times.",
      "Compare fares and review booking conditions.",
      "Allow time for activities and shared celebrations.",
    ],
    icon: PartyPopper,
  },
  "international-travel": {
    title: "International Group Travel",
    heading: "Discover the World Together",
    category: "International Holidays",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
    description:
      "Explore international destinations and coordinate flights for friends, families, colleagues and other travel groups.",
    intro:
      "International group trips involve additional planning, including passport validity, entry requirements, connections and local arrangements. Prepare these details before confirming your journey.",
    points: [
      "Check passport validity and visa requirements.",
      "Compare flight routes, layovers and arrival times.",
      "Review baggage allowances and international fare rules.",
      "Keep copies of bookings and important travel documents.",
    ],
    icon: Globe,
  },
} as const;

type GroupSlug = keyof typeof groupPages;
import type { Metadata } from "next";

const SITE_URL = "https://skyflywithus.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = groupPages[slug as GroupSlug];

  if (!page) {
    return {
      title: "Group Travel | SkyFlyWithUs",
      description:
        "Explore family holidays, corporate trips, student travel and group vacation options with SkyFlyWithUs.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = `${page.title} | SkyFlyWithUs`;

  const description = page.description;

  const canonicalUrl = `${SITE_URL}/group-travel/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "SkyFlyWithUs",
      type: "website",
      images: [
        {
          url: page.image,
          width: 1400,
          height: 900,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [page.image],
    },
  };
}
const relatedGroups = [
  { title: "Family Travel", slug: "family-travel", Icon: Heart },
  { title: "Corporate Travel", slug: "corporate-travel", Icon: BriefcaseBusiness },
  { title: "Friends' Getaways", slug: "friends-getaways", Icon: Users },
  { title: "Student Travel", slug: "student-travel", Icon: GraduationCap },
  { title: "Celebration Travel", slug: "celebration-travel", Icon: PartyPopper },
  { title: "International Travel", slug: "international-travel", Icon: Globe },
];

export function generateStaticParams() {
  return Object.keys(groupPages).map((slug) => ({ slug }));
}

export default async function GroupTravelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = groupPages[slug as GroupSlug];

  if (!page) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="text-2xl font-bold text-[#538440]">
          Group travel page not found
        </h1>
        <p className="text-sm text-gray-600">
          Choose a group travel category to explore your options.
        </p>
        <Link
          href="/group-travel"
          className="rounded-lg bg-[#538440] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3F6632]"
        >
          Back to Group Travel
        </Link>
      </main>
    );
  }

  const Icon = page.icon;

  const sections = [
    {
      title: `Planning ${page.category}`,
      description: page.intro,
      bullets: [],
    },
    {
      title: `Travel Tips for ${page.category}`,
      description:
        "Use these practical steps to organize your itinerary and prepare for a smoother journey.",
      bullets: page.points,
    },
    {
      title: `Choosing Flights for ${page.location}`,
      description:
        "Compare available flight options, travel dates and connection times before making a reservation. Check the applicable baggage, change and cancellation conditions for your chosen fare.",
      bullets: [],
    },
    {
      title: `Preparing for Your Group Trip`,
      description:
        "Confirm traveler details, keep booking confirmations accessible and share the itinerary with everyone in your group. International travelers should also review relevant passport, visa and entry requirements.",
      bullets: [],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="relative isolate min-h-[240px] overflow-hidden border-t-2 border-[#538440] sm:min-h-[285px] lg:min-h-[315px]">
        <Image
          src={page.image}
          alt={page.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#102D35]/80 via-[#102D35]/55 to-transparent" />

        <div className="relative mx-auto flex min-h-[240px] max-w-[1440px] flex-col justify-center px-5 py-8 sm:min-h-[285px] sm:px-8 lg:min-h-[315px] lg:px-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-white sm:text-sm"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/group-travel" className="hover:underline">
              Group Travel
            </Link>
            <ChevronRight size={13} />
            <span>{page.title}</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {page.heading}
          </h1>

          <p className="mt-3 max-w-xl text-sm text-white/95 sm:text-base">
            {page.description}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 pb-12 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-12 lg:pt-12">
        {/* Simple left-side content, matching the flight page typography */}
        <div className="min-w-0 space-y-6">
          <section className="flex items-start gap-3 sm:gap-4">
            <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
              <Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold leading-tight text-[#538440] sm:text-2xl">
                About {page.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {page.description} Start by confirming your group's needs,
                preferred dates and destination, then compare suitable travel
                arrangements before booking.
              </p>
            </div>
          </section>

          {sections.map((section, index) => (
            <section
              key={section.title}
              className="flex items-start gap-3 sm:gap-4"
            >
              <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
                {index === 1 ? (
                  <CheckCircle2 size={18} />
                ) : index === 2 ? (
                  <Plane size={18} />
                ) : index === 3 ? (
                  <ShieldCheck size={18} />
                ) : (
                  <CalendarDays size={18} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-tight text-[#538440] sm:text-2xl">
                  {section.title}
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
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold leading-tight text-[#538440] sm:text-2xl">
                Group Travel Assistance
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Review the terms of your booking, confirm passenger
                information and check any destination-specific travel
                requirements. If your group has different itineraries, make
                sure each traveler has the correct reservation details.
              </p>
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-5">
          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-5 text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#538440] text-white">
              <Headset size={22} />
            </div>

            <h2 className="mt-3 text-base font-bold leading-5 text-[#538440]">
              Need help planning your group trip?
            </h2>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              Get assistance reviewing your travel options and organizing
              your group's journey.
            </p>
   <div
          
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#538440]"
             >
               <Phone size={16} />
  <a
              href="tel:+18555093791"
              className="mt-4 inline-flex items-center justify-center gap-2 text-lg font-semibold text-gray-700 transition hover:text-[#538440]"
            >
              <Phone size={16} />
              <span>1-855-509-3791</span>
            </a>

            </div>

            <a
              href="tel:+18555093791"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#538440] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
            >
              <Phone size={14} />
              Call for Assistance
            </a>

            
          </div>

          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-3">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <Users size={15} className="text-[#538440]" />
                Explore Group Travel
              </h2>
            </div>

            <div className="space-y-2">
              {relatedGroups
                .filter((group) => group.slug !== slug)
                .map(({ title, slug: relatedSlug, Icon: RelatedIcon }) => (
                  <Link
                    key={relatedSlug}
                    href={`/group-travel/${relatedSlug}`}
                    className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition hover:border-[#538440]/50 hover:shadow-sm"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
                      <RelatedIcon size={16} />
                    </div>

                    <span className="min-w-0 flex-1 text-xs font-semibold text-gray-700 group-hover:text-[#538440]">
                      {title}
                    </span>

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
        destinationSlug="group-travel"
        destinationName="Group Travel"
      />
    </main>
  );
}
 