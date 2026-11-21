import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

import GroupTravelForm from "@/app/(dashboard)/_components/GroupTravelForm";

export default function CreateGroupTravelPage() {
  return (
    <main className="min-h-screen bg-[#F7F9F6] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/group-travel"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#538440]"
          >
            <ArrowLeft size={17} />
            Back to Group Travel
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF2E6] text-[#538440]">
                <Users size={23} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Create New Group Travel
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Create and publish a new group travel page on SkyFlyWithUs.
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE9D6] bg-white px-3 py-2 text-xs font-medium text-[#3F6632]">
              <span className="h-2 w-2 rounded-full bg-[#538440]" />
              Group Travel Management
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <GroupTravelForm />
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          SkyFlyWithUs Admin Dashboard
        </p>
      </div>
    </main>
  );
}