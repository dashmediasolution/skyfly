 import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type TravelDealCardProps = {
  slug: string;
  name: string;
  destination: string;
  tagline: string;
  overlayTitle: string;
  discount: string;
  image: string;
};

export default function TravelDealCard({
  slug,
  name,
  tagline,
  overlayTitle,
  image,
}: TravelDealCardProps) {
  return (
    <Link
      href={`/deals/${slug}`}
      aria-label={`Explore ${name}`}
      className="group block min-w-0 overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-[170px] overflow-hidden sm:h-[145px] lg:h-[152px] xl:h-[200px]">
        <Image
          src={image}
          alt={overlayTitle}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/10" />
      </div>

      <div className="px-2.5 pb-2 pt-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <MapPin
              className="size-3.5 shrink-0"
              color="#538440"
              fill="#538440"
            />

            <p className="truncate text-[13px] font-medium leading-5 text-gray-800 sm:text-sm md:text-lg">
              {name}
            </p>
          </div>

          <span className="flex size-7 p-1 shrink-0 m-2 items-center justify-center rounded-full border border-[#d9e7d5] text-[#538440] transition-colors group-hover:bg-[#538440] group-hover:text-white">
            <ArrowRight className="size-10" />
          </span>
        </div>

        <p className="mt-0.5 truncate text-[10px] leading-4 text-gray-500 sm:text-[11px] md:text-base">
          {tagline}
        </p>
      </div>
    </Link>
  );
}
 