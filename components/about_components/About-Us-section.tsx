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
      description:
        "Discover affordable fares and practical ways to save on your next trip.",
    },
    {
      icon: Compass,
      title: "Expert Travel Guidance",
      description:
        "Get helpful insights to make planning your journey simpler.",
    },
    {
      icon: ShieldCheck,
      title: "Travel With Confidence",
      description:
        "Understand airline policies, booking options, and travel essentials.",
    },
    {
      icon: Headset,
      title: "Dedicated Travel Support",
      description:
        "Find guidance for flight changes, cancellations, and travel questions.",
    },
  ];

  const highlights = [
    "Flight deals and money-saving tips",
    "Airline policies explained clearly",
    "Destination inspiration and travel guides",
    "Helpful booking and itinerary guidance",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary/10 via-background to-muted/40 py-16 sm:py-20 lg:py-28">
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative mx-auto mt-4 px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-bold text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            ABOUT SKYFLYWITHUS
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Your Journey Begins With
            <span className="block text-primary">
              Smarter Travel Choices
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Great journeys start with the right information. We help you explore
            flight options, understand travel policies, and plan your next
            adventure with greater confidence and clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image composition */}
          <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
            <div className="absolute -left-4 -top-4 h-28 w-28 rounded-tl-[2rem] border-l-4 border-t-4 border-primary/60 sm:-left-5 sm:-top-5" />

            <div className="relative h-[340px] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-primary/10 sm:h-[440px] lg:h-[520px]">
              <Image
                src="/images/airplane-wing2.jpg"
                alt="Airplane soaring above the clouds on a memorable journey"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

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
            <div className="absolute -bottom-7 right-4 max-w-[235px] rounded-2xl border border-border bg-background/95 p-5 shadow-xl backdrop-blur-md sm:-right-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Globe2 className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-foreground">
                    Travel Better
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    One smart choice at a time
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -right-3 -top-5 hidden h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg sm:flex">
              <Plane className="h-9 w-9 -rotate-12" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="pt-5 lg:pt-0">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Travel Made Simpler
            </span>

            <h3 className="mt-3 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Explore More.
              <br />
              <span className="text-primary">Spend Smarter.</span>
            </h3>

            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              At SkyFlyWithUs, we believe travel should feel exciting, not
              overwhelming. Finding suitable flights, understanding airline
              rules, and keeping your trip within budget can take time. Our goal
              is to make those decisions easier with accessible travel
              information and practical guidance.
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Whether you are planning a family holiday, a business trip, or a
              spontaneous getaway, we help you navigate the details so you can
              focus on what matters most: the experience waiting at your
              destination.
            </p>

            {/* Feature list */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-semibold leading-6 text-foreground sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-9 grid grid-cols-2 gap-4">
              <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Globe2 className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-extrabold text-foreground sm:text-2xl">
                  Global Inspiration
                </h4>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ideas and insights for your next destination.
                </p>
              </div>

              <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-extrabold text-foreground sm:text-2xl">
                  Less Planning Stress
                </h4>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Clear information to help simplify travel decisions.
                </p>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-7 flex items-start gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <h4 className="font-bold text-foreground">
                  Information You Can Travel With
                </h4>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  We focus on helpful travel resources and straightforward
                  guidance to support more informed booking and planning
                  decisions.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:opacity-90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>

              <h4 className="text-lg font-bold text-foreground">{title}</h4>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 