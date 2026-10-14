import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type DestinationCardProps = {
  name: string;
  country: string;
  tagline: string;
  overlayTitle: string;
  image: string;
};

export default function DestinationCard({
  name,
  country,
  tagline,
  overlayTitle,
  image,
}: DestinationCardProps) {
  return (
    <Card className="group overflow-hidden  rounded-none  border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link  
        href={`/flights/${name.toLowerCase().replace(/\s+/g, "-")}`}
        aria-label={`Explore ${name}, ${country}`}
        className="block"
      >
        <div className="relative h-44 overflow-hidden">
          <Image
            src={image}
            alt={`${name}, ${country}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/5 to-slate-950/20" />

          <div className="absolute left-4 top-4 text-white drop-shadow-md">
            <p className="flex items-center gap-1.5 text-base font-semibold">
              <MapPin className="h-4 w-4 shrink-0" />
              {overlayTitle}
            </p>
            <p className="ml-5 mt-1 text-sm font-medium">
              {country}
            </p>
          </div>
        </div>

        <CardContent className="flex min-h-[88px] items-center gap-3 p-4 rounded-none">
          <div className="min-w-0 flex-1">
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
              {name}
            </h3>

            <p className="mt-2 line-clamp-2 text-base leading-relaxed text-slate-500">
              {tagline}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}