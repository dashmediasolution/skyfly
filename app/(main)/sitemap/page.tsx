 import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Link2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sitemap | SkyFlyWithUs",
  description:
    "Explore SkyFlyWithUs pages, flight destinations, and travel deals.",
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
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Condition", href: "/terms" },
  { label: "Site Map", href: "/sitemap" },
];

const travelDestinations = [
  { label: "Flights to Amsterdam", href: "/flights/amsterdam" },
  { label: "Flights to Bali", href: "/flights/bali" },
  { label: "Flights to Barcelona", href: "/flights/barcelona" },
  { label: "Flights to London", href: "/flights/london" },
  { label: "Flights to Paris", href: "/flights/paris" },
  { label: "Flights to Dubai", href: "/flights/dubai" },
  { label: "Flights to Singapore", href: "/flights/singapore" },
  { label: "Flights to New York", href: "/flights/new-york" },
  { label: "Flights to Rome", href: "/flights/rome" },
  { label: "Flights to Tokyo", href: "/flights/tokyo" },
  { label: "Flights to Istanbul", href: "/flights/istanbul" },
  { label: "Flights to Bangkok", href: "/flights/bangkok" },
];

const travelDeals = [
  {
    label: "Christmas Day Offer",
    href: "/deals/package/christmas-day-offer",
  },
  {
    label: "Black Friday Offer",
    href: "/deals/package/black-friday-offer",
  },
  {
    label: "Valentine’s Day Offer",
    href: "/deals/package/valentines-day-offer",
  },
];

const linkClass =
  "group flex min-w-0 items-center justify-between gap-2 rounded-md bg-[#F0F5ED] px-2 py-1.5 text-gray-600 transition-colors hover:bg-[#E1ECD9] hover:text-[#355F32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#568747] sm:px-2.5";

function SitemapSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
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
        <Link key={item.href} href={item.href} className={linkClass}>
          <span className="truncate text-xs sm:text-sm">{item.label}</span>

          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#568747] text-white transition-transform group-hover:translate-x-0.5">
            <ArrowUpRight size={10} strokeWidth={2.5} />
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default function SitemapPage() {
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
              <Link
                href="/"
                className="transition-colors text-white"
              >
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
        <SitemapSection title="Quick Links">
          <SitemapLinkGrid
            items={quickLinks}
            label="Sitemap quick links"
          />
        </SitemapSection>

        <SitemapSection title="Handpicked Travel Destinations">
          <SitemapLinkGrid
            items={travelDestinations}
            label="Handpicked travel destinations"
          />
        </SitemapSection>

        <SitemapSection title="Top Travel Deals">
          <SitemapLinkGrid
            items={travelDeals}
            label="Top travel deals"
          />
        </SitemapSection>
      </div>
    </main>
  );
}
 