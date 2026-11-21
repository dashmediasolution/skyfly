"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
    ShieldCheck,
    Users,
    Headset,
    Plane,
    ArrowRight,
    CheckCircle2,
    Luggage,
    CalendarCheck,
    Tag,
} from "lucide-react";

type GroupTravel = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    tags: string[];
};

const benefits = [
    {
        title: "Group Travel Assistance",
        description:
            "Get help coordinating travel arrangements for your group.",
        Icon: Users,
    },
    {
        title: "Travel Options for Every Budget",
        description:
            "Explore options that match your group's travel budget.",
        Icon: Tag,
    },
    {
        title: "Flexible Planning",
        description:
            "Organize travel plans around your group's schedule and needs.",
        Icon: CalendarCheck,
    },
    {
        title: "Dedicated Travel Support",
        description:
            "Get assistance with questions throughout your planning process.",
        Icon: Headset,
    },
];


export default function GroupTravelPage() {
    const [groupTravels, setGroupTravels] = useState<GroupTravel[]>([]);
    const [loadingGroupTravels, setLoadingGroupTravels] = useState(true);

    useEffect(() => {
        const fetchGroupTravels = async () => {
            try {
                const response = await fetch("/api/group-travel", {
                    method: "GET",
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.error ||
                        data.message ||
                        "Failed to fetch group travel pages."
                    );
                }

                setGroupTravels(data.groupTravels || []);
            } catch (error) {
                console.error("Error fetching group travel:", error);
                setGroupTravels([]);
            } finally {
                setLoadingGroupTravels(false);
            }
        };

        fetchGroupTravels();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">

            {/* Hero */}
            <section className="relative isolate flex min-h-[310px] w-full items-center overflow-hidden sm:min-h-[360px] lg:min-h-[390px]">
                <Image
                    src="/images/groupTravelBanner.png"
                    alt="Group of travelers enjoying a trip together"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8F0]/80 via-[#F4F8F0]/25 to-transparent" />

                <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFD2] px-3 py-1.5 text-xs font-bold tracking-wide text-[#315F2A]">
                            <Users size={14} />
                            GROUP TRAVEL
                        </span>

                        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#123C32] sm:text-5xl lg:text-6xl">
                            Make Every Journey Better Together
                        </h1>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-gray-700 sm:text-base">
                            Discover group travel options for family holidays,
                            friends, corporate trips, and special occasions.
                            Explore travel ideas and plan your next journey together.
                        </p>
                    </div>
                </div>
            </section>

            {/* Group travel benefits */}
            <section className="w-full px-4 py-5 sm:px-6 md:px-8 lg:px-12">
                <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map(({ title, description, Icon }) => (
                        <div
                            key={title}
                            className="flex items-start gap-3 border border-[#538440]/15 bg-[#F8FBF6] p-4 transition hover:border-[#538440]/40 hover:shadow-sm"
                        >
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EAF2E6] text-[#538440]">
                                <Icon size={23} />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                                    {title}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Group travel introduction */}
            <section className="w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-[1440px]">
                    <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-7 lg:gap-10">

                        <div className="relative aspect-[3/2] w-full overflow-hidden border-2 border-[#538440]/20">
                            <Image
                                src="/images/groupTravelImage.webp"
                                alt="Friends traveling together and enjoying a vacation"
                                fill
                                sizes="(max-width: 767px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <p className="text-sm leading-6 text-gray-600 sm:text-base">
                                Traveling together can make every journey more
                                memorable. Whether you are organizing a family
                                holiday, a trip with friends, a corporate outing,
                                or a special group occasion, SkyFlyWithUs can
                                help you explore suitable travel options.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                From choosing destinations to exploring flight
                                options, group travel requires thoughtful
                                planning. Consider your group size, preferred
                                travel dates, destination, and individual travel
                                requirements when preparing your journey.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                Browse our group travel resources to discover
                                ideas and useful information for planning your
                                next trip. Travel prices, availability, and
                                conditions may vary depending on your booking
                                requirements.
                            </p>

                            <div className="mt-4 rounded-xl bg-[#538440]/10 p-5 sm:p-6">
                                <p className="text-base font-semibold leading-8 text-gray-800 lg:text-lg">
                                    Need help planning your group trip? Call us on{" "}
                                    <a
                                        href="tel:18555093791"
                                        className="font-bold text-[#538440] hover:underline"
                                    >
                                        1-855-509-3791
                                    </a>{" "}
                                    to discuss your travel requirements.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Group travel pages */}
                    <div className="mt-12 sm:mt-16 lg:mt-20">

                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div className="max-w-2xl">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#EAF2E6] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#538440]">
                                    <Users size={14} />
                                    Explore Group Travel
                                </div>

                                <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                                    Discover Travel{" "}
                                    <span className="text-primary">
                                        Together
                                    </span>
                                </h2>

                                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                                    Explore group travel options, get inspiration
                                    for your next trip, and find helpful
                                    information for planning a journey together.
                                </p>
                            </div>
                        </div>

                        {/* Dynamic group travel cards */}
                        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:gap-6">

                            {loadingGroupTravels ? (

                                /* Loading skeleton */
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="animate-pulse overflow-hidden border border-gray-200 bg-white"
                                    >
                                        <div className="aspect-[16/9] bg-gray-200" />

                                        <div className="space-y-3 border-l-4 border-gray-200 px-4 py-4">
                                            <div className="h-5 w-3/4 rounded bg-gray-200" />
                                            <div className="h-4 w-full rounded bg-gray-200" />
                                            <div className="h-4 w-2/3 rounded bg-gray-200" />
                                        </div>
                                    </div>
                                ))

                            ) : groupTravels.length > 0 ? (

                                /* Real group travel pages from MongoDB */
                                groupTravels.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/group-travel/${item.slug}`}
                                        className="group block overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#538440]/50 hover:shadow-lg"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">

                                            {item.featuredImage ? (
                                                <Image
                                                    src={item.featuredImage}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-[#EAF2E6]">
                                                    <Users className="size-12 text-[#538440]" />
                                                </div>
                                            )}

                                            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1.5 text-[10px] font-bold text-[#538440] shadow-sm">
                                                <Users size={13} />
                                                Group Travel
                                            </span>
                                        </div>

                                        <div className="border-l-4 border-[#538440] px-4 py-4">
                                            <h3 className="text-base font-bold text-gray-800 transition-colors group-hover:text-[#538440] sm:text-lg">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                                {item.excerpt ||
                                                    "Explore group travel options and plan your next journey together."}
                                            </p>

                                            {item.tags?.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {item.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="rounded-full bg-[#EAF2E6] px-2.5 py-1 text-[10px] font-medium text-[#3F6632]"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <span className="mt-4 inline-flex items-center text-sm font-bold text-[#538440]">
                                                Explore Group Travel
                                                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </Link>
                                ))

                            ) : (

                                /* Empty state */
                                <div className="col-span-full py-10 text-center">
                                    <Users className="mx-auto size-10 text-[#538440]" />

                                    <h3 className="mt-3 text-lg font-bold text-gray-800">
                                        No Group Travel Pages Available
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        New group travel information will be available soon.
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            {/* Final call to action */}
            <section className="w-full border-y border-[#DDEAD7] bg-[#F0F6EC] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
                <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 text-sm font-bold text-[#538440]">
                            <CheckCircle2 size={18} />
                            Plan your journey together
                        </div>

                        <h2 className="mt-2 text-2xl font-extrabold text-[#183D31] sm:text-3xl lg:text-4xl">
                            Ready to Plan Your Group Trip?
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                            Explore travel options and get started with
                            planning your next group journey.
                        </p>
                    </div>

                    <Link href="/contact" className="shrink-0">
                        <Button className="bg-[#538440] px-6 text-white hover:bg-[#426D33]">
                            Plan Your Trip
                            <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}