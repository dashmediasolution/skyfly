import { Tag } from "lucide-react";

import TravelDealCard from "./travel-deal-card";
import { travelDeals } from "./travel-data";

export default function TopTravelDeals() {
  return (
   <section
      id="destinations"
      className="relative overflow-hidden  w-full    px-4 py-12 sm:px-6 "
    >
      <div className="mx-auto w-[95%] ">
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3 text-emerald-600">
            <span className="h-px w-10 bg-emerald-500" />
            <Tag className="h-5 w-5 -rotate-12" />
            <span className="h-px w-10 bg-emerald-500" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Top Travel{" "}
            <span className="text-emerald-600">
              Deals
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Discover exclusive offers and save more on your
            international trips.
          </p>
        </div>

  <div
          className="grid grid-cols-1 gap-3
                     sm:gap-4
                     md:grid-cols-2 md:gap-5
                     lg:grid-cols-3 lg:gap-6
                     xl:grid-cols-4"
        >          {travelDeals.map((deal) => (
            <TravelDealCard
              key={deal.name}
              {...deal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}