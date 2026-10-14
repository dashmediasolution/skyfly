import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Tag } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TravelDealCardProps = {
  name: string;
  destination: string;
  tagline: string;
  overlayTitle: string;
  discount: string;
  image: string;
};

export default function TravelDealCard({
  name,
  destination,
  tagline,
  overlayTitle,
  discount,
  image,
}: TravelDealCardProps) {
  return (
    <Card className="group overflow-hidden  rounded-none  border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/deals/${destination.toLowerCase().replace(/\s+/g, "-")}`}
        aria-label={`Explore ${name}`}
        className="block"
      >
        <div className="relative h-44 overflow-hidden">
          <Image
            src={image}
            alt={`${destination} travel package`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/10" />

          <Badge className="absolute left-3 top-3 rounded-full border-0 bg-emerald-600 px-3 py-1 text-[13px] font-semibold text-white hover:bg-emerald-600">
            <Tag className="mr-1 h-3 w-3" />
            {discount}
          </Badge>

          <div className="absolute bottom-3 left-4 text-white drop-shadow-md">
            <p className="flex items-center gap-1.5 text-base font-bold">
              <MapPin className="h-4 w-4 shrink-0" />
              {overlayTitle}
            </p>

            <p className="ml-5 mt-0.5 text-base font-medium">
              {destination}
            </p>
          </div>
        </div>

        <CardContent className="flex min-h-[72px] items-center gap-3 p-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-slate-900">
              {name}
            </h3>

            <p className="mt-1.5 line-clamp-2 text-base leading-relaxed text-slate-500">
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