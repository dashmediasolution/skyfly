
"use client";

import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

import DestinationCard, {
  type DestinationCardProps,
} from "./destination-card";

export default function HandpickedDestinations() {
  const [destinations, setDestinations] = useState<DestinationCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/flight-destinations", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const result = await response.json();

        const data = Array.isArray(result)
          ? result
          : result.destinations ?? [];

        const latestDestinations = data.slice(0, 8).map((item: any) => ({
          id: item.id || item._id,
          name: item.destination,
          country: item.country,
          tagline: item.excerpt || "",
          overlayTitle: item.title,
          image: item.heroImage || "/images/destination-placeholder.jpg",
          slug: item.slug,
        }));

        setDestinations(latestDestinations);
      } catch (error) {
        console.error("Destination API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section
      id="destinations"
      className="relative isolate overflow-hidden bg-white px-3 py-9 sm:px-5 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* Heading */}
        <div className="mb-6 text-center sm:mb-8 lg:mb-10">
          <div className="mb-3 flex items-center justify-center gap-2.5 text-emerald-600 sm:gap-3">
            <span className="h-px w-7 bg-emerald-500 sm:w-10" />
            <Plane className="h-4 w-4 -rotate-12 sm:h-5 sm:w-5" />
            <span className="h-px w-7 bg-emerald-500 sm:w-10" />
          </div>

          <h2 className="text-[25px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[42px]">
            Explore Our Top{" "}
            <span className="text-emerald-600">
              Destinations
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl px-2 text-xs leading-5 text-slate-500 sm:mt-3 sm:px-0 sm:text-sm sm:leading-6 md:text-base">
            Get ready to explore the world's most iconic cities,
            landmarks and monuments. Experience the unforgettable!
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden border border-slate-200"
              >
                <div className="h-44 bg-slate-200" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-2/3 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                {...destination}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-slate-500">
            No destinations available.
          </p>
        )}
      </div>

      {/* Decorative Circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-16 -z-10 h-40 w-40 rounded-full border border-emerald-100/70 sm:h-56 sm:w-56"
      />
    </section>
  );
}
