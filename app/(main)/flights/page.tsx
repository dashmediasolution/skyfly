
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/homePage/HeroSerction";
import FlightSearch from "@/components/homePage/FlightSearch";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
    ShieldCheck,
    FileCheck,
    Headset,
    ThumbsUp,
    ArrowRight,
    MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Flights | SkyFlyWithUs",
  robots: {
    index: false,
    follow: false,
  },
}
const benefits = [
    {
        title: "Best Price Guarantee",
        description: "Get the best deals on your flights.",
        Icon: ShieldCheck,
    },
    {
        title: "Clear Policies",
        description: "Know your fare policies before you fly.",
        Icon: FileCheck,
    },
    {
        title: "24/7 Support",
        description: "We're here whenever you need us.",
        Icon: Headset,
    },
    {
        title: "Trusted by Travelers",
        description: "Millions of happy travelers worldwide.",
        Icon: ThumbsUp,
    },
];

// Keep all 12 destination cards in this array.

const popularRoutes = [
    {
        destination: "Amsterdam",
        image: "/images/routes/amsterdam.webp",
        description: "Book Now",
        href: "/flights/amsterdam",
    },
    {
        destination: "Bali",
        image: "/images/routes/bali.webp",
        description: "Book Now",
        href: "/flights/bali",
    },
    {
        destination: "Barcelona",
        image: "/images/routes/barcelona.webp",
        description: "Book Now",
        href: "/flights/barcelona",
    },
    {
        destination: "London",
        image: "/images/routes/london.webp",
        description: "Book Now",
        href: "/flights/london",
    },
    {
        destination: "Paris",
        image: "/images/routes/image_60.webp",
        description: "Book Now",
        href: "/flights/paris",
    },
    {
        destination: "Dubai",
        image: "/images/routes/dubai.webp",
        description: "Book Now",
        href: "/flights/dubai",
    },
    {
        destination: "Singapore",
        image: "/images/routes/singapore.webp",
        description: "Book Now",
        href: "/flights/singapore",
    },
    {
        destination: "New York",
        image: "/images/routes/new-york.webp",
        description: "Book Now",
        href: "/flights/new-york",
    },
    {
        destination: "Rome",
        image: "/images/routes/rome.webp",
        description: "Book Now",
        href: "/flights/rome",
    },
    {
        destination: "Tokyo",
        image: "/images/routes/tokyo.png",
        description: "Book Now",
        href: "/flights/tokyo",
    },
    {
        destination: "Istanbul",
        image: "/images/routes/istanbul.webp",
        description: "Book Now",
        href: "/flights/istanbul",
    },
    {
        destination: "Bangkok",
        image: "/images/routes/bangkok.webp",
        description: "Book Now",
        href: "/flights/bangkok",
    },
];

export default function FlightBookingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <HeroSection
                image="/images/FlightBanner.webp"
                alt="Explore destinations around the world"
            />


            {/* Flight Benefits */}
      <section className="mx-auto w-full max-w-[1440px] px-5 py-6 sm:px-8 lg:px-12 lg:pt-12">
    <h2 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
        Plan Your Next Flight Journey
    </h2>

    <p className="mt-2 max-w-5xl text-base leading-7 text-gray-600 md:text-lg">
        Planning your next trip or need help with an existing flight
        booking? Explore flight services for reservations, booking changes,
        cancellations, and travel information. Get assistance understanding
        available options and organizing your travel plans with
        SkyFlyWithUs.
    </p>
</section>

{/* Flight Benefits */}
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

            {/* Flight Deals Introduction */}
            <section className="w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-[1440px]">
                    <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-7 lg:gap-10">
                        <div className="relative aspect-[3/2] w-full overflow-hidden border-2 border-[#538440]/20">
                            <Image
                                src="/images/flight-deals.webp"
                                alt="Traveler enjoying a flight"
                                fill
                                sizes="(max-width: 767px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold leading-tight text-[#538440] sm:text-3xl lg:text-4xl">
                                Unbeatable Flight Deals: Discover the Lowest Fare to Your
                                Favorite Cities
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                Are you ready to travel at competitive rates? Discover
                                affordable flights to popular destinations and find deals
                                suited to your travel plans and budget.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                From last-minute escapes to carefully planned vacations,
                                explore flight options to exciting cities around the world.
                                Start planning your next adventure with a flight that works
                                for you.
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-gray-500 sm:text-base">
                        We are here to turn your travel dreams into reality, whether it
                        is a solo trip or a family holiday. Pack your bags and embark on
                        your next adventure with us. Your gateway to flight deals starts
                        here!
                    </p>

                    {/* Popular Flight Routes */}
                    <div className="mt-12 sm:mt-16 lg:mt-20">
                        <div className="flex flex-col justify-center gap-5 sm:flex-row sm:items-end">
                            <div className="max-w-5xl">
                                <div className="mb-3 inline-flex justify-center w-full items-center  gap-2 rounded-full  px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#538440]">
                                   <div className=" bg-[#EAF2E6] inline-flex px-3 py-1.5 text-xs rounded-full gap-3">

                                    <MapPin size={14} />
                                    Travel More
                                   </div>
                                </div>

                                <h2 className="text-3xl font-extrabold text-center leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                                    Explore Popular Flight Routes
                                </h2>

                                <p className="mt-3 max-w-full text-center text-sm leading-6 text-gray-600 sm:text-base">
                                    From bustling cities to serene getaways, discover
                                    destinations around the world. Find your next flight
                                    and start planning your adventure.
                                </p>
                            </div>


                        </div>

                        {/* All 12 Destination Cards */}
                        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:gap-6">
                            {popularRoutes.map((route) => (
                                <Link
                                    key={route.destination}
                                    href={route.href}
                                    className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#538440]/50 hover:shadow-lg"
                                >
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <Image
                                            src={route.image}
                                            alt={`Flights to ${route.destination}`}
                                            fill
                                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex w-full items-center  justify-between gap-3 mr-2 border-l-4 border-[#538440] px-4 py-3">
                                        <div className="flex w-full flex-col gap-3">
                                            <p className="text-sm font-semibold text-center text-gray-800 sm:text-base md:text-xl">
                                                Flight to {route.destination}
                                            </p>
                                            <div className="w-full      flex justify-center items-center">
                                                <Button className="cursor-pointer" >
                                                    {route.description}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
