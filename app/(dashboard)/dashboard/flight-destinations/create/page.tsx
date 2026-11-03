
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import DestinationForm from "../_components/DestinationForm";

export default function CreateFlightDestinationPage() {
  return (
    <div className="min-h-screen space-y-6 bg-gray-50/70 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard/flight-destinations"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#538440]"
        >
          <ArrowLeft size={16} />
          Back to Flight Destinations
        </Link>

        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#538440]/10 text-[#538440]">
                <MapPin size={21} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#538440]">
                Destination Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Create Flight Destination
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Add destination information, travel content, related flights,
              FAQs, and SEO details.
            </p>
          </div>

          <Link
            href="/dashboard/flight-destinations"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#538440] hover:text-[#538440]"
          >
            Cancel
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6 lg:p-8">
<DestinationForm edit={false} />
        </div>
      </div>
    </div>
  );
}
