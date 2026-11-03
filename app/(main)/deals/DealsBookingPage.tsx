"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
    ShieldCheck,
    Tag,
    Headset,
    Gift,
    ArrowRight,
    Heart,
    Percent,
    CheckCircle2,
} from "lucide-react";

type Deal = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    dealType: string | null;
};

const benefits = [
    {
        title: "Exclusive Travel Deals",
        description: "Explore available offers for your next journey.",
        Icon: Tag,
    },
    {
        title: "Transparent Offers",
        description: "Review offer details and applicable conditions.",
        Icon: ShieldCheck,
    },
    {
        title: "24/7 Travel Support",
        description: "Get assistance with your travel enquiries.",
        Icon: Headset,
    },
    {
        title: "Offers for Every Journey",
        description: "Discover deals for flights, hotels, and car rentals.",
        Icon: Gift,
    },
];

export default function DealsBookingPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loadingDeals, setLoadingDeals] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await fetch("/api/deals", {
                    method: "GET",
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.error || data.message || "Failed to fetch deals."
                    );
                }

                setDeals(data.deals || []);
            } catch (error) {
                console.error("Error fetching deals:", error);
                setDeals([]);
            } finally {
                setLoadingDeals(false);
            }
        };

        fetchDeals();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">

            {/* Hero */}
            <section className="relative isolate flex min-h-[310px] w-full items-center overflow-hidden sm:min-h-[360px] lg:min-h-[390px]">
                <Image
                    src="/images/dealsBanner.webp"
                    alt="Luxury beachfront hotel and tropical infinity pool"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8F0]/85 via-[#F4F8F0]/45 to-transparent" />

                <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFD2] px-3 py-1.5 text-xs font-bold tracking-wide text-[#315F2A]">
                            TRAVEL DEALS
                        </span>

                        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#123C32] sm:text-5xl lg:text-6xl">
                            Explore the Best Travel Deals and Offers
                        </h1>


                    </div>
                </div>
            </section>



            {/* Deal benefits */}
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

            {/* Promotional introduction */}
            <section className="w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-[1440px]">

                    <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-7 lg:gap-10">
                        <div className="relative aspect-[3/2] w-full overflow-hidden border-2 border-[#538440]/20">
                            <Image
                                src="/images/dealsImage.webp"
                                alt="Travelers planning their next trip"
                                fill
                                sizes="(max-width: 767px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <div>


                            <p className="  text-sm leading-6 text-gray-600 sm:text-base">
                                At SkyFlyWithUs, we can help you find some great travel offers for your next holiday. Whether you’re looking to plan a family break, romantic getaway, short break or international trip we can help you find the perfect travel options for you within your budget.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                Browse through great flight offers to some of the most popular domestic and international destinations. Find great hotel offers to relax in, as well as great car rental options. We have great offers throughout the year, including during special holidays.
                            </p>
                            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                We believe that planning your next trip should be easy. Browse through our offers and terms to see what is available. Prices, availability and travel conditions may vary so always double-check the latest details before booking.
                                If you need any help planning your trip contact SkyFlyWithUs.                            </p>

                            <div className="mt-3  rounded-xl bg-[#538440]/10 p-5 sm:p-6">
                                <p className="text-base font-semibold leading-8 text-gray-800 lg:text-lg">
                                    Call us on{" "}
                                    <a
                                        href="tel:18555093791"
                                        className="font-bold text-[#538440] hover:underline"
                                    >
                                        1-855-509-3791
                                    </a>{" "}
                                    to get started on finding travel options.
                                </p>
                            </div>
                        </div>
                    </div>



                    {/* Deals grid */}
                    <div className="mt-12 sm:mt-16 lg:mt-20">

                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div className="max-w-2xl">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#EAF2E6] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#538440]">
                                    <Percent size={14} />
                                    Explore Offers
                                </div>

                                <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                                    Find Your Next{" "}
                                    <span className="text-primary">
                                        Travel Deal
                                    </span>
                                </h2>

                                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                                    Explore travel inspiration, browse
                                    available offers, and discover options
                                    for flights, hotels, car rentals, and
                                    popular destinations.
                                </p>
                            </div>
                        </div>

                        {/* Dynamic deals */}
                        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:gap-6">

                            {loadingDeals ? (

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

                            ) : deals.length > 0 ? (

                                /* Real deals from MongoDB */
                                deals.map((deal) => (
                                    <Link
                                        key={deal.id}
                                        href={`/deals/${deal.slug}`}
                                        className="group block overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#538440]/50 hover:shadow-lg"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">

                                            {deal.featuredImage ? (
                                                <Image
                                                    src={deal.featuredImage}
                                                    alt={deal.title}
                                                    fill
                                                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-[#EAF2E6]">
                                                    <Gift className="size-12 text-[#538440]" />
                                                </div>
                                            )}

                                            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1.5 text-[10px] font-bold text-[#538440] shadow-sm">
                                                <Tag size={13} />
                                                {deal.dealType || "Travel Deal"}
                                            </span>
                                        </div>

                                        <div className="border-l-4 border-[#538440] px-4 py-4">
                                            <h3 className="text-base font-bold text-gray-800 transition-colors group-hover:text-[#538440] sm:text-lg">
                                                {deal.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                                {deal.excerpt ||
                                                    "Explore this exclusive travel offer."}
                                            </p>

                                            <span className="mt-4 inline-flex items-center text-sm font-bold text-[#538440]">
                                                Explore Offer
                                                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </Link>
                                ))

                            ) : (

                                /* Empty state */
                                <div className="col-span-full py-10 text-center">
                                    <Gift className="mx-auto size-10 text-[#538440]" />

                                    <h3 className="mt-3 text-lg font-bold text-gray-800">
                                        No Deals Available
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        New travel offers will be available soon.
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
                            Plan with confidence
                        </div>

                        <h2 className="mt-2 text-2xl font-extrabold text-[#183D31] sm:text-3xl lg:text-4xl">
                            Ready to Plan Your Next Journey?
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                            Explore flights, discover hotel options, and find
                            car rental choices to help plan your next trip.
                        </p>
                    </div>

                    <Link href="/flights" className="shrink-0">
                        <Button className="bg-[#538440] px-6 text-white hover:bg-[#426D33]">
                            Start Exploring
                            <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}