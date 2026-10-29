 import { Plane } from "lucide-react";

import DestinationCard from "./destination-card";
import { destinations } from "./travel-data";

export default function HandpickedDestinations() {
  return (
    <section
      id="destinations"
      className="relative isolate overflow-hidden bg-white px-3 py-9
                 sm:px-5 sm:py-6
                 md:px-6 md:py-8
                 lg:px-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading */}
        <div className="mb-6 text-center sm:mb-8 lg:mb-10">
          <div className="mb-3 flex items-center justify-center gap-2.5 text-emerald-600 sm:gap-3">
            <span className="h-px w-7 bg-emerald-500 sm:w-10" />

            <Plane className="h-4 w-4 -rotate-12 sm:h-5 sm:w-5" />

            <span className="h-px w-7 bg-emerald-500 sm:w-10" />
          </div>

          <p className="text-[25px] font-extrabold leading-tight tracking-tight text-slate-900
                         sm:text-3xl
                         md:text-4xl
                         lg:text-[42px]">
            Explore Our Top{" "}
            <span className="text-emerald-600">
              Destinations
            </span>
          </p>

          <p className="mx-auto mt-2 max-w-xl px-2 text-xs leading-5 text-slate-500
                        sm:mt-3 sm:px-0 sm:text-sm sm:leading-6
                        md:text-base">
            Explore the world&apos;s most loved cities, iconic
            landmarks and unforgettable experiences.
          </p>
        </div>

        {/* Responsive Destination Grid */}
        <div
          className="grid grid-cols-1 gap-3
                     sm:gap-4
                     md:grid-cols-2 md:gap-5
                     lg:grid-cols-3 lg:gap-6
                     xl:grid-cols-4"
        >
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.name}
              {...destination}
            />
          ))}
        </div>
      </div>

      {/* Decorative Circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-16 -z-10
                   h-40 w-40 rounded-full border border-emerald-100/70
                   sm:h-56 sm:w-56"
      />
    </section>
  );
}
 