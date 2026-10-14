"use client";

import Image from "next/image";
import {
  CheckCircle2,
  Plane,
  ShieldCheck,
  Wallet,
  Compass,
  Headset,
  ArrowRight,
  Globe2,
  Sparkles,
  Clock3,
} from "lucide-react";

export function AboutUsSection() {
  const features = [
    {
      icon: Wallet,
      title: "Smarter Flight Deals",
      description: "Discover affordable fares and practical ways to save on your next trip.",
    },
    {
      icon: Compass,
      title: "Expert Travel Guidance",
      description: "Get helpful insights to make planning your journey simpler.",
    },
    {
      icon: ShieldCheck,
      title: "Travel With Confidence",
      description: "Understand airline policies, booking options, and travel essentials.",
    },
    {
      icon: Headset,
      title: "Dedicated Travel Support",
      description: "Find guidance for flight changes, cancellations, and travel questions.",
    },
  ];

  const highlights = [
    "Flight deals and money-saving tips",
    "Airline policies explained clearly",
    "Destination inspiration and travel guides",
    "Helpful booking and itinerary guidance",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#eaf7f6] via-white to-[#f1f6fa] py-16 sm:py-20 lg:py-28">
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#159b9c]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#073452]/10 blur-3xl" />

      <div className="container relative mx-auto mt-4 px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#159b9c]/20 bg-white/80 px-4 py-2 text-sm font-bold text-[#159b9c] shadow-sm">
            <Sparkles className="h-4 w-4" />
            ABOUT SKYFLYWITHUS
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#073452] sm:text-4xl lg:text-5xl">
            Your Journey Begins With
            <span className="block bg-gradient-to-r from-[#159b9c] via-[#117f91] to-[#073452] bg-clip-text text-transparent">
              Smarter Travel Choices
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Great journeys start with the right information. We help you explore
            flight options, understand travel policies, and plan your next
            adventure with greater confidence and clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image composition */}
          <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
            <div className="absolute -left-4 -top-4 h-28 w-28 rounded-tl-[2rem] border-l-4 border-t-4 border-[#159b9c]/60 sm:-left-5 sm:-top-5" />

            <div className="relative h-[340px] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-[#073452]/15 sm:h-[440px] lg:h-[520px]">
              <Image
                src="/images/airplane-wing2.jpg"
                alt="Airplane soaring above the clouds on a memorable journey"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#073452]/75 via-[#073452]/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex items-center gap-3 text-white">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                    <Plane className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xl font-bold sm:text-2xl">
                      Every Journey Matters
                    </p>
                    <p className="mt-1 text-sm text-white/80 sm:text-base">
                      Plan better. Travel smarter. Explore more.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating experience card */}
            <div className="absolute -bottom-7 right-4 max-w-[235px] rounded-2xl border border-white/70 bg-white/95 p-5 shadow-xl shadow-[#073452]/10 backdrop-blur-md sm:-right-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#159b9c] to-[#073452] text-white">
                  <Globe2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#073452]">
                    Travel Better
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    One smart choice at a time
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -right-3 -top-5 hidden h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#159b9c] to-[#073452] text-white shadow-lg sm:flex">
              <Plane className="h-9 w-9 -rotate-12" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="pt-5 lg:pt-0">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#159b9c]">
              Travel Made Simpler
            </span>

            <h3 className="mt-3 text-3xl font-extrabold leading-tight text-[#073452] sm:text-4xl">
              Explore More.
              <br />
              <span className="bg-gradient-to-r from-[#159b9c] to-[#073452] bg-clip-text text-transparent">
                Spend Smarter.
              </span>
            </h3>

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              At SkyFlyWithUs, we believe travel should feel exciting, not
              overwhelming. Finding suitable flights, understanding airline
              rules, and keeping your trip within budget can take time. Our goal
              is to make those decisions easier with accessible travel
              information and practical guidance.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Whether you are planning a family holiday, a business trip, or a
              spontaneous getaway, we help you navigate the details so you can
              focus on what matters most: the experience waiting at your
              destination.
            </p>

            {/* Feature list */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#159b9c]" />
                  <span className="text-sm font-semibold leading-6 text-[#073452] sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-9 grid grid-cols-2 gap-4">
              <div className="group rounded-2xl border border-[#159b9c]/15 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#159b9c]/40 hover:shadow-lg sm:p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#159b9c]/15 to-[#073452]/10 text-[#159b9c]">
                  <Globe2 className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-extrabold text-[#073452] sm:text-2xl">
                  Global Inspiration
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ideas and insights for your next destination.
                </p>
              </div>

              <div className="group rounded-2xl border border-[#159b9c]/15 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#159b9c]/40 hover:shadow-lg sm:p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#159b9c]/15 to-[#073452]/10 text-[#159b9c]">
                  <Clock3 className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-extrabold text-[#073452] sm:text-2xl">
                  Less Planning Stress
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Clear information to help simplify travel decisions.
                </p>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-7 flex items-start gap-4 rounded-2xl border border-[#159b9c]/15 bg-gradient-to-r from-[#159b9c]/10 to-transparent p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#159b9c] to-[#073452] text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#073452]">
                  Information You Can Travel With
                </h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We focus on helpful travel resources and straightforward
                  guidance to support more informed booking and planning
                  decisions.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#159b9c] to-[#073452] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#159b9c]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#159b9c]/30 focus:outline-none focus:ring-2 focus:ring-[#159b9c] focus:ring-offset-2"
            >
              Start Exploring
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Bottom feature strip */}
        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#159b9c]/30 hover:shadow-xl hover:shadow-[#073452]/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#159b9c] to-[#073452] text-white shadow-md shadow-[#159b9c]/15 transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>

              <h4 className="text-lg font-bold text-[#073452]">{title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}