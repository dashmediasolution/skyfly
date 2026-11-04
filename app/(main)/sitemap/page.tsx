
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Link2 } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Sitemap | SkyFlyWithUs",
  description:
    "Explore SkyFlyWithUs pages, flight destinations, airline policies, and travel deals.",
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Car Rental", href: "/car-rental" },
  { label: "Deals", href: "/deals" },
  { label: "Group Travel", href: "/group-travel" },
  { label: "Blogs", href: "/blog" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Sitemap", href: "/sitemap" },
];

const policyTypeRoutes: Record<string, string> = {
  FLIGHT: "flight-change",
  NAME: "name-change",
  CANCELLATION: "cancellation-and-refund",
  BAGGAGE: "baggage",
};

const policyTypeLabels: Record<string, string> = {
  FLIGHT: "Flight Change",
  NAME: "Name Change",
  CANCELLATION: "Cancellation & Refund",
  BAGGAGE: "Baggage",
};

const policyOrder = [
  "FLIGHT",
  "NAME",
  "CANCELLATION",
  "BAGGAGE",
];

const linkClass =
  "group flex min-w-0 items-center justify-between gap-2 rounded-md bg-[#F0F5ED] px-2 py-1.5 text-gray-600 transition-colors hover:bg-[#E1ECD9] hover:text-[#355F32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#568747] sm:px-2.5";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function SitemapSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-5 overflow-hidden rounded-lg border border-[#C9DCC1]">
      <div className="flex items-center gap-2 bg-[#F0F5ED] px-3 py-2">
        <Link2
          size={17}
          className="shrink-0 text-[#568747]"
          aria-hidden="true"
        />

        <h2 className="text-sm font-bold text-[#193A35] sm:text-base">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function SitemapLinkGrid({
  items,
  label,
}: {
  items: { label: string; href: string }[];
  label: string;
}) {
  return (
    <nav
      aria-label={label}
      className="grid grid-cols-2 gap-x-3 gap-y-2 p-2 sm:grid-cols-3 sm:gap-x-5 sm:p-2.5 lg:grid-cols-4"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={linkClass}
        >
          <span className="truncate text-xs sm:text-sm">
            {item.label}
          </span>

          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#568747] text-white transition-transform group-hover:translate-x-0.5">
            <ArrowUpRight size={10} strokeWidth={2.5} />
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default async function SitemapPage() {
  const [destinations, deals, airlinePolicies] = await Promise.all([
    // Published flight destinations
    prisma.flightDestination.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        destination: true,
        slug: true,
      },
      orderBy: {
        destination: "asc",
      },
    }),

    // Published travel deals
    prisma.deal.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        title: true,
        slug: true,
      },
      orderBy: {
        title: "asc",
      },
    }),

    // Published airline policies
    prisma.airlinePolicy.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        policyType: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    }),
  ]);

  // Dynamic destination links
  const travelDestinations = destinations.map((destination) => ({
    label: `Flights to ${destination.destination}`,
    href: `/flights/${destination.slug}`,
  }));

  // Dynamic deal links
  const travelDeals = deals.map((deal) => ({
    label: deal.title,
    href: `/deals/${deal.slug}`,
  }));

  // Group airline policies by policy type
  const groupedPolicies: Record<
    string,
    { label: string; href: string }[]
  > = {};

  airlinePolicies.forEach((policy) => {
    const type = policy.policyType.toUpperCase();

    const policySlug =
      policyTypeRoutes[type] || slugify(type);

    const airlineSlug = slugify(policy.category.name);

    if (!groupedPolicies[type]) {
      groupedPolicies[type] = [];
    }

    groupedPolicies[type].push({
      label: policy.category.name,
      href: `/${policySlug}/${airlineSlug}`,
    });
  });

  // Remove duplicate airline links and sort alphabetically
  Object.keys(groupedPolicies).forEach((type) => {
    groupedPolicies[type] = Array.from(
      new Map(
        groupedPolicies[type].map((item) => [item.href, item])
      ).values()
    ).sort((a, b) => a.label.localeCompare(b.label));
  });

  // Include standard policy types first, followed by any additional types
  const availablePolicyTypes = [
    ...policyOrder,
    ...Object.keys(groupedPolicies)
      .filter((type) => !policyOrder.includes(type))
      .sort(),
  ];

  return (
    <main className="min-h-screen bg-white pb-12">
      {/* Sitemap Hero */}
      <section className="relative isolate overflow-hidden">
        <div
          className="relative flex min-h-[280px] items-center bg-cover bg-center bg-no-repeat sm:min-h-[320px] lg:min-h-[400px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/80 via-white/45 to-transparent" />

          <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Explore Our Sitemap
            </h1>

            <nav
              aria-label="Breadcrumb"
              className="mt-3 flex items-center gap-3 text-sm text-white"
            >
              <Link href="/" className="text-white transition-colors">
                Home
              </Link>

              <span aria-hidden="true">/</span>

              <span aria-current="page" className="text-white">
                Sitemap
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Sitemap Links */}
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">

        {/* Quick Links */}
        <SitemapSection title="Quick Links">
          <SitemapLinkGrid
            items={quickLinks}
            label="Sitemap quick links"
          />
        </SitemapSection>

        {/* Dynamic Destinations */}
        {travelDestinations.length > 0 && (
          <SitemapSection title="Flight Destinations">
            <SitemapLinkGrid
              items={travelDestinations}
              label="Flight destinations"
            />
          </SitemapSection>
        )}

        {/* Dynamic Deals */}
        {travelDeals.length > 0 && (
          <SitemapSection title="Travel Deals">
            <SitemapLinkGrid
              items={travelDeals}
              label="Travel deals"
            />
          </SitemapSection>
        )}

        {/* Airline Policies Grouped by Type */}
        {availablePolicyTypes.map((type) => {
          const policies = groupedPolicies[type];

          if (!policies?.length) return null;

          const title =
            policyTypeLabels[type] ||
            type.replace(/_/g, " ");

          return (
            <SitemapSection
              key={type}
              title={`${title} Policies`}
            >
              <SitemapLinkGrid
                items={policies}
                label={`${title} airline policies`}
              />
            </SitemapSection>
          );
        })}
      </div>
    </main>
  );
}
