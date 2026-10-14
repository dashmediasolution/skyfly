"use client";

import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/homePage/HeroSerction";
import { Button } from "@/components/ui/button";
import {
    ShieldCheck,
    Tag,
    Headset,
    Gift,
    ArrowRight,
    MapPin,
    Plane,
    Hotel,
    CarFront,
    CalendarCheck,
    Clock,
    Percent,
    Sparkles,
    CheckCircle2,
} from "lucide-react";

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

const deals = [
    {
        title: "Save on Your Next Flight",
        category: "FLIGHT DEALS",
        description: "Explore flight options to popular destinations and discover fares that suit your travel plans.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
        label: "Flight Offers",
        Icon: Plane,
        href: "/flights",
    },
    {
        title: "Find Your Perfect Hotel Stay",
        category: "HOTEL DEALS",
        description: "Discover hotel options for city breaks, family holidays, and relaxing getaways.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
        label: "Hotel Offers",
        Icon: Hotel,
        href: "/hotels-booking",
    },
    {
        title: "Explore More for Less",
        category: "CAR RENTAL DEALS",
        description: "Find rental car options for airport transfers, road trips, and everyday travel.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
        label: "Car Rental Offers",
        Icon: CarFront,
        href: "/car-booking",
    },
    {
        title: "Discover the Magic of Paris",
        category: "DESTINATION DEALS",
        description: "Explore flight and accommodation options for your next visit to Paris.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
        label: "Paris Offers",
        Icon: MapPin,
        href: "/flights/paris",
    },
    {
        title: "Plan Your Dubai Getaway",
        category: "DESTINATION DEALS",
        description: "Discover travel options for an unforgettable city escape in Dubai.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
        label: "Dubai Offers",
        Icon: MapPin,
        href: "/flights/dubai",
    },
    {
        title: "Experience New York",
        category: "DESTINATION DEALS",
        description: "Explore travel options for an exciting getaway to New York City.",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=900&q=85",
        label: "New York Offers",
        Icon: MapPin,
        href: "/flights/new-york",
    },
    {
        title: "Make Your Summer Special",
        category: "SEASONAL DEALS",
        description: "Get inspired by sunny destinations and start planning your next seasonal escape.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
        label: "Summer Offers",
        Icon: Sparkles,
        href: "/flights",
    },
    {
        title: "Plan a Weekend Escape",
        category: "SHORT GETAWAYS",
        description: "Discover ideas for short breaks, city adventures, and spontaneous trips.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
        label: "Weekend Offers",
        Icon: CalendarCheck,
        href: "/flights",
    },
    {
        title: "Travel Together, Make Memories",
        category: "FAMILY TRAVEL",
        description: "Explore destinations and travel options for your next family holiday.",
        image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        label: "Family Offers",
        Icon: Gift,
        href: "/flights",
    },
    {
        title: "Find a Last-Minute Escape",
        category: "LAST-MINUTE TRAVEL",
        description: "Explore available travel options for your next adventure.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=85",
        label: "Last-Minute Offers",
        Icon: Clock,
        href: "/flights",
    },
    {
        title: "Upgrade Your Travel Experience",
        category: "PREMIUM TRAVEL",
        description: "Explore premium destinations and comfortable stays for special occasions.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85",
        label: "Premium Offers",
        Icon: Sparkles,
        href: "/hotels-booking",
    },
    {
        title: "Your Next Adventure Starts Here",
        category: "TRAVEL INSPIRATION",
        description: "Browse destinations and discover inspiration for your next trip.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85",
        label: "Explore Deals",
        Icon: ArrowRight,
        href: "/flights",
    },
];
export default function DealsBookingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Hero */}
            <HeroSection
                image="/images/dealsBanner.png"
                alt="Beautiful mountain destination for your next travel adventure"
            />

            {/* Deals introduction */}
            <section className="w-[95%] py-3 sm:px-8 md:py-2 lg:pt-20">
                <h2 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                    Discover Travel Deals for Your Next Adventure
                </h2>

                <p className="text-base md:text-xl lg:text-lg">
                    Explore available flight offers, hotel stays, and car
                    rental options for your next journey. Compare travel
                    choices, review offer details, and plan your next getaway
                    with SkyFlyWithUs.
                </p>
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
                                 src="/images/flight-deals.png"
                                alt="Travelers planning their next trip"
                                fill
                                sizes="(max-width: 767px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold leading-tight text-[#538440] sm:text-3xl lg:text-4xl">
                                Your Next Trip Starts with the Right Travel Deal
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                Whether you are planning a family holiday, a
                                weekend escape, or an international adventure,
                                explore travel options that fit your itinerary
                                and budget.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                Browse flight deals, discover accommodation
                                options, and explore car rentals in popular
                                destinations. Review the details of each offer
                                before making your travel plans.
                            </p>

                            <Link href="/flights">
                                <Button className="mt-5 bg-[#538440] text-white hover:bg-[#426D33]">
                                    Explore Flights
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-gray-500 sm:text-base">
                        Make your next journey memorable with travel options
                        for every kind of traveler. Explore new destinations,
                        compare available offers, and find the right starting
                        point for your next adventure with SkyFlyWithUs.
                    </p>

                    {/* Deals grid */}
                    <div className="mt-12 sm:mt-16 lg:mt-20">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div className="max-w-2xl">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#EAF2E6] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#538440]">
                                    <Percent size={14} />
                                    Explore Offers
                                </div>

                                <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                                    Find Your Next
                                    <br className="hidden sm:block" /> Travel Deal
                                </h2>

                                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                                    Explore travel inspiration, browse
                                    available offers, and discover options
                                    for flights, hotels, car rentals, and
                                    popular destinations.
                                </p>
                            </div>
                        </div>

                        {/* All 12 deal cards */}
                        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:gap-6">
                            {deals.map((deal) => {
                                const Icon = deal.Icon;

                                return (
                                    <div
                                        key={deal.title}
                                         className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#538440]/50 hover:shadow-lg"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <Image
                                                src={deal.image}
                                                alt={deal.title}
                                                fill
                                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1.5 text-[10px] font-bold text-[#538440] shadow-sm">
                                                <Icon size={13} />
                                                {deal.category}
                                            </span>
                                        </div>

                                        <div className="flex w-full items-center justify-between gap-3 border-l-4 border-[#538440] px-4 py-4">
                                            <div className="flex w-full flex-col gap-3">
                                                <h3 className="text-base font-bold text-gray-800 transition-colors group-hover:text-[#538440] sm:text-lg">
                                                    {deal.title}
                                                </h3>

                                                <p className="text-sm leading-6 text-gray-600">
                                                    {deal.description}
                                                </p>

                                             
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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