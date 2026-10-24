
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Plane,
  ShieldCheck,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const airlines = [
  { name: "Aegean Airlines", code: "A3", slug: "aegean-airlines" },
  { name: "Aer Lingus", code: "EI", slug: "aer-lingus" },
  { name: "Aerolineas Argentinas", code: "AR", slug: "aerolineas-argentinas" },
  { name: "Aeromexico", code: "AM", slug: "aeromexico" },
  { name: "Air China", code: "CA", slug: "air-china" },
  { name: "American Airlines", code: "AA", slug: "american-airlines" },
  { name: "Austrian Airlines", code: "OS", slug: "austrian-airlines" },
  { name: "Avianca", code: "AV", slug: "avianca" },
  { name: "Bearskin Airlines", code: "JV", slug: "bearskin-airlines" },
  { name: "Breeze Airways", code: "MX", slug: "breeze-airways" },
  { name: "Cape Air", code: "9K", slug: "cape-air" },
  { name: "Caribbean Airlines", code: "BW", slug: "caribbean-airlines" },
  { name: "Cathay Pacific", code: "CX", slug: "cathay-pacific" },
  { name: "China Airlines", code: "CI", slug: "china-airlines" },
  { name: "Copa Airlines", code: "CM", slug: "copa-airlines" },
  { name: "easyJet", code: "U2", slug: "easyjet" },
  { name: "Ethiopian Airlines", code: "ET", slug: "ethiopian-airlines" },
  { name: "Fiji Airways", code: "FJ", slug: "fiji-airways" },
  { name: "Finnair", code: "AY", slug: "finnair" },
  { name: "FlyOne", code: "5F", slug: "flyone" },
  { name: "IndiGo", code: "6E", slug: "indigo" },
  { name: "Japan Airlines", code: "JL", slug: "japan-airlines" },
  { name: "KLM Royal Dutch Airlines", code: "KL", slug: "klm" },
  { name: "Lufthansa", code: "LH", slug: "lufthansa" },
  { name: "Qatar Airways", code: "QR", slug: "qatar-airways" },
  { name: "Singapore Airlines", code: "SQ", slug: "singapore-airlines" },
  { name: "United Airlines", code: "UA", slug: "united-airlines" },
  { name: "Virgin Atlantic", code: "VS", slug: "virgin-atlantic" },
];

export default function NameCorrectionPage() {
  const [search, setSearch] = useState("");

  const filteredAirlines = useMemo(() => {
    return airlines.filter((airline) =>
      airline.name.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <Image
          src="/images/travel-desk.webp"
          alt="Travel planning desk with a world map"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />

        <div className="relative mx-auto flex min-h-[250px] max-w-7xl flex-col justify-center px-5 py-12 sm:px-8 lg:min-h-[300px] lg:px-12">
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <FileText className="h-4 w-4" />
            Airline Policy Directory
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Name Correction
            <span className="block text-primary">
              Airline Policies
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
            Find airline-specific information about correcting passenger
            names and reviewing applicable ticket requirements.
          </p>

          <nav
            aria-label="Breadcrumb"
            className="mt-6 flex items-center gap-2 text-sm text-slate-300"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">
              Name Correction
            </span>
          </nav>
        </div>
      </section>

      {/* Directory */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Browse by airline
            </span>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Name Correction Policy Directory
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Select an airline to explore its name correction policy
              information and relevant ticket requirements.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/5" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search airlines by name..."
                aria-label="Search airlines"
                className="h-14 rounded-2xl border-slate-200 bg-white pl-12 pr-4 text-base shadow-sm focus-visible:ring-primary"
              />
            </div>

            <div className="mt-3 flex items-center justify-between px-1 text-sm text-slate-500">
              <span>
                {filteredAirlines.length} airlines listed
              </span>
              <span className="hidden items-center gap-1 sm:flex">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Check airline terms before making changes
              </span>
            </div>
          </div>

          {/* Airline cards */}
          {filteredAirlines.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAirlines.map((airline) => (
             <Link
  key={airline.code}
  href={`/name-correction/${airline.slug}`}
  className="group flex min-h-[88px] items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-5"
>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-primarytransition-colors group-hover:bg-teal-700 group-hover:text-white">
                    <Plane className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-primary sm:text-base">
                      {airline.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Name correction policy
                    </p>
                  </div>

                  <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-400" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No airlines found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with another airline name.
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-sm font-semibold text-primary hover:text-teal-900"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Information note */}
          <div className="mt-10 flex gap-4 rounded-2xl border border-teal-100 bg-teal-50/70 p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">
                Before requesting a name correction
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Airline rules may differ by ticket type, route, and the
                type of correction required. Verify the applicable policy
                and any fees directly with your airline before making
                changes to a reservation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
