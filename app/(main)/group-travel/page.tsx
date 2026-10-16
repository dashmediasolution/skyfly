 import Image from "next/image";
import Link from "next/link";
import {
    Users,
    MapPin,
    Tag,
    ShieldCheck,
    Headset,
    Gift,
    CalendarCheck,
    Plane,
    Heart,
    BriefcaseBusiness,
    GraduationCap,
    PartyPopper,
    ArrowRight,
    CheckCircle2,
    Globe,
} from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata("groupTravel");
const groupPackages = [
    {
        category: "FAMILY GROUP TRAVEL",
        heading: "Make Memories Together",
        name: "Family Holiday Getaways",
        location: "Orlando, Florida",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=85",
        label: "Family Trips",
        description:
            "Plan a memorable family vacation with travel options designed to bring everyone together.",
        Icon: Heart,
    href: "/group-travel/family-travel",
    },
    {
        category: "CORPORATE GROUP TRAVEL",
        heading: "Business Travel Made Easier",
        name: "Corporate Travel Solutions",
        location: "New York, USA",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
        label: "Business Trips",
        description:
            "Coordinate team travel for conferences, business meetings, and corporate events.",
        Icon: BriefcaseBusiness,
href: "/group-travel/corporate-travel",
    },
    {
        category: "FRIENDS & GROUP GETAWAYS",
        heading: "Adventure Is Better Together",
        name: "Friends' Holiday Packages",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=85",
        label: "Group Getaways",
        description:
            "Discover exciting destinations for reunions, celebrations, and trips with friends.",
        Icon: Users,
href: "/group-travel/friends-getaways",
    },
    {
        category: "STUDENT GROUP TRAVEL",
        heading: "Explore, Learn & Discover",
        name: "Educational Group Trips",
        location: "Washington, D.C., USA",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85",
        label: "Student Trips",
        description:
            "Explore travel ideas for educational visits, student groups, and learning adventures.",
        Icon: GraduationCap,
href: "/group-travel/student-travel",
    },
    {
        category: "CELEBRATION GROUP TRAVEL",
        heading: "Celebrate Every Moment",
        name: "Special Occasion Getaways",
        location: "Las Vegas, Nevada",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
        label: "Celebration Trips",
        description:
            "Bring your favorite people together for birthdays, anniversaries, and special occasions.",
        Icon: PartyPopper,
href: "/group-travel/celebration-travel",
    },
    {
        category: "INTERNATIONAL GROUP TRAVEL",
        heading: "Discover the World Together",
        name: "International Group Holidays",
        location: "Paris, France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
        label: "International Trips",
        description:
            "Explore international destinations and coordinate travel plans for your group.",
        Icon: Globe,
href: "/group-travel/international-travel",    },
];

const destinations = [
    {
        name: "Paris",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Dubai",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Bali",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "New York",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "London",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=85",
    },
];

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

const groupTypes = [
    {
        title: "Family Vacations",
        subtitle: "Bring everyone together",
        Icon: Heart,
    },
    {
        title: "Corporate Travel",
        subtitle: "Travel together for business",
        Icon: BriefcaseBusiness,
    },
    {
        title: "Friends' Getaways",
        subtitle: "Create shared memories",
        Icon: Users,
    },
    {
        title: "Student Trips",
        subtitle: "Learn beyond the classroom",
        Icon: GraduationCap,
    },
];

export default function GroupTravelPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#F8FBF6] text-[#172C26]">
            {/* Hero section */}
            <section className="relative isolate flex min-h-[310px] items-center overflow-hidden sm:min-h-[360px] lg:min-h-[390px]">
                <Image
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=90"
                    alt="Friends enjoying a group travel adventure"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8F0]/95 via-[#F4F8F0]/80 to-transparent" />

                <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFD2] px-3 py-1.5 text-xs font-bold tracking-wide text-[#315F2A]">
                            <Users size={15} />
                            GROUP TRAVEL
                        </span>

                        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#123C32] sm:text-5xl lg:text-6xl">
                            Travel Together,
                            <br />
                            Create Memories
                        </h1>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-[#344740] sm:text-base">
                            From family holidays to corporate trips and
                            adventures with friends, discover travel options
                            that bring your group closer together.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 rounded-full border border-[#538440]/20 bg-white/80 px-4 py-2 text-sm text-[#315F2A] shadow-sm">
                                <ShieldCheck size={17} />
                                Trusted assistance
                            </div>

                            <div className="flex items-center gap-2 rounded-full border border-[#538440]/20 bg-white/80 px-4 py-2 text-sm text-[#315F2A] shadow-sm">
                                <Tag size={17} />
                                Group travel options
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Group travel benefits strip */}
            <section className="border-y border-[#DDEAD7] bg-[#EFF6EA]">
                <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 py-5 sm:px-8 lg:grid-cols-4 lg:px-12">
                    {groupTypes.map(({ title, subtitle, Icon }, index) => (
                        <div
                            key={title}
                            className={`flex items-center gap-3 px-2 py-3 sm:px-4 lg:px-6 ${
                                index % 2 === 0
                                    ? "border-r border-[#DDEAD7]"
                                    : ""
                            } ${
                                index < 2
                                    ? "border-b border-[#DDEAD7] lg:border-b-0"
                                    : ""
                            } ${
                                index === 1
                                    ? "lg:border-r"
                                    : ""
                            } ${
                                index === 3
                                    ? "lg:border-r-0"
                                    : ""
                            }`}
                        >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DCEFD2] text-[#538440] sm:size-12">
                                <Icon size={23} />
                            </div>

                            <div>
                                <h3 className="text-xs font-bold leading-5 text-[#183D31] sm:text-sm">
                                    {title}
                                </h3>
                                <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-xs">
                                    {subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Group travel introduction */}
            <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 sm:py-14 lg:px-12">
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-9 lg:gap-12">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#DDEAD7] shadow-sm">
                        <Image
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
                            alt="Group working together to plan a trip"
                            fill
                            sizes="(max-width: 767px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <p className="text-xs font-extrabold tracking-widest text-[#538440]">
                            YOUR GROUP, YOUR JOURNEY
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#123C32] sm:text-3xl lg:text-4xl">
                            Make Every Group Journey Special
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                            Planning a trip for several people can take time.
                            SkyFlyWithUs helps you explore travel options for
                            family holidays, company events, student groups,
                            reunions, and special celebrations.
                        </p>

                        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                            Whether you are traveling across the country or
                            exploring an international destination, start
                            organizing your group's travel plans in one place.
                            Find options that suit your itinerary, preferences,
                            and budget.
                        </p>

                        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#DDEAD7] bg-white p-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4E5] text-[#538440]">
                                <CheckCircle2 size={22} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#183D31]">
                                    Planning made easier
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                                    Explore travel choices for different group
                                    sizes and occasions with assistance when
                                    you need it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Group travel package cards */}
 {/* Group travel package cards */}
<section className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-12">
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
            <p className="text-[10px] font-extrabold tracking-wider text-[#538440] sm:text-xs">
                FIND YOUR TRAVEL STYLE
            </p>

            <h2 className="mt-1 text-2xl font-extrabold leading-tight text-[#202D3C] sm:text-3xl lg:text-4xl">
                Group Trips for Every Occasion
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                Discover travel inspiration for the people you
                want to travel with, wherever your next journey
                takes you.
            </p>
        </div>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {groupPackages.map((item) => (
            <Link
                key={item.name}
                href={item.href}
                className="group block overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#538440] focus-visible:ring-offset-2"
            >
                <div className="relative h-52 overflow-hidden sm:h-48 lg:h-44">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#538440] shadow-sm">
                        {item.label}
                    </span>
                </div>

                <div className="p-4">
                    <p className="text-[10px] font-extrabold tracking-wider text-[#538440]">
                        {item.category}
                    </p>

                    <h3 className="mt-1 text-lg font-bold leading-6 text-[#202D3C] transition-colors group-hover:text-[#538440]">
                        {item.name}
                    </h3>

                    <p className="mt-2 min-h-[60px] text-sm leading-5 text-gray-600">
                        {item.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin
                            size={15}
                            className="shrink-0 text-[#538440]"
                        />
                        <span>{item.location}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-sm font-semibold text-[#538440]">
                        <span>Explore travel options</span>
                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </div>
                </div>
            </Link>
        ))}
    </div>
</section>
 
            {/* Promotional banner */}
       <section className="relative overflow-hidden w-full flex justify-center items-center">
        <div className="grid min-h-[220px] grid-cols-1 lg:grid-cols-2 w-[93%]  border-y border-[#DDEAD7] bg-[#EAF4E5]">
                    <div className="relative min-h-[220px] lg:min-h-[300px]">
                        <Image
                            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85"
                            alt="Friends celebrating together on a group trip"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="relative flex items-center px-6 py-8 sm:px-10 lg:px-12">
                        <div className="relative z-10 max-w-xl">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#538440]">
                                Better Together
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#123C32] sm:text-3xl lg:text-4xl">
                                One Group,
                                <br />
                                A World of Memories
                            </h2>

                            <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
                                From family vacations to team outings and
                                unforgettable adventures with friends, start
                                planning a trip everyone can look forward to.
                            </p>

                        </div>

                        <div className="pointer-events-none absolute -right-8 -top-10 size-52 rounded-full bg-white/40 blur-3xl" />
                    </div>
                </div>
            </section>

            {/* Popular group destinations */}
            <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 lg:px-12">
                <div className="mb-5">
                    <p className="text-[10px] font-extrabold tracking-wider text-[#538440] sm:text-xs">
                        EXPLORE TOGETHER
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold text-[#202D3C] sm:text-2xl lg:text-3xl">
                        Popular Group Travel Destinations
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                        Get inspired by exciting cities, relaxing island
                        escapes, and destinations that are perfect for sharing
                        new experiences.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
                    {destinations.map((destination) => (
                        <Link
                            key={destination.name}
                            href="/flights"
                            className="group"
                        >
                            <div className="relative h-28 overflow-hidden rounded-lg shadow-sm sm:h-32 lg:h-28">
                                <Image
                                    src={destination.image}
                                    alt={`Group travel to ${destination.name}`}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                    className="object-cover transition duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-2 text-center">
                                    <span className="text-xs font-bold text-white sm:text-sm">
                                        {destination.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Booking benefits */}
            <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
                <div className="mb-5">
                    <h2 className="text-2xl font-extrabold text-[#202D3C] sm:text-3xl">
                        Group Travel, Made Simpler
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                        Get started with helpful travel options and support
                        for coordinating your next group adventure.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map(({ title, description, Icon }) => (
                        <div
                            key={title}
                            className="flex items-center gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm transition hover:border-[#538440]/40 hover:shadow-md"
                        >
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#EAF4E5] text-[#538440]">
                                <Icon size={24} />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold leading-5 text-[#202D3C]">
                                    {title}
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
 