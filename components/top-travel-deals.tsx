
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { unstable_cache } from "next/cache";

import  prisma  from "@/lib/prisma";
import TravelDealsCarousel from "./travel-deals-carousel";

const PRIMARY = "#538440";

const getTopDeals = unstable_cache(
  async () => {
    return prisma.deal.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        featuredImage: true,
      },
    });
  },
  ["homepage-top-travel-deals"],
  {
    revalidate: 432000,
    tags: ["travel-deals"],
  }
);

export default async function TopTravelDeals() {
  const deals = await getTopDeals();

  return (
    <section
      id="top-deals"
      className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mx-auto w-[90%] max-w-[1440px]">

        {/* Section Heading */}
        <div className="relative mb-6 sm:mb-8 lg:mb-10">
          <div className="text-center">
            <div
              className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide"
              style={{
                backgroundColor: "#e4f0e2",
                color: PRIMARY,
              }}
            >
              <Tag className="size-2.5 fill-current" />
              Limited Time Offers
            </div>

            <h2 className="text-[25px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[42px]">
              Unlock Efficient Travel{" "}
              <span style={{ color: PRIMARY }}>Deals</span>
            </h2>

            <p className="mx-auto mt-2 max-w-xl px-2 text-xs leading-5 text-slate-500 sm:mt-3 sm:px-0 sm:text-sm sm:leading-6 md:text-base">
              Save More, Travel More. Explore top-notch holiday
              deals to your favorite destination.
            </p>
          </div>

          <div className="mt-4 flex justify-center sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:text-sm"
              style={{ backgroundColor: PRIMARY }}
            >
              All Deals
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Deals */}
        {deals.length > 0 ? (
          <TravelDealsCarousel deals={deals} />
        ) : (
          <p className="py-10 text-center text-sm text-slate-500">
            No travel deals available.
          </p>
        )}
      </div>
    </section>
  );
}
