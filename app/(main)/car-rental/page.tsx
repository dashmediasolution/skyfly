import Image from "next/image";
import {
    CarFront,
    MapPin,
    Tag,
    ShieldCheck,
    Headset,
    Gift,
    CalendarCheck,
    Fuel,
    Users,
    BriefcaseBusiness,
    Gauge,
    CheckCircle2,
    Plane,
    Clock,
    KeyRound,
} from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata("carRental");
const cars = [
    {
        category: "ECONOMY CARS",
        heading: "Affordable Cars for Everyday Travel",
        name: "Toyota Corolla",
        type: "Compact Sedan",
        location: "Dallas, Texas",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=85",
        discount: "20% Off",
        passengers: "5 Seats",
        luggage: "2 Bags",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
    {
        category: "ECONOMY CARS",
        heading: "Affordable Cars for Everyday Travel",
        name: "Honda Civic",
        type: "Compact Sedan",
        location: "Dallas, Texas",
        image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=85",
        discount: "15% Off",
        passengers: "5 Seats",
        luggage: "2 Bags",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
    {
        category: "ECONOMY CARS",
        heading: "Affordable Cars for Everyday Travel",
        name: "Hyundai Elantra",
        type: "Standard Sedan",
        location: "Dallas, Texas",
        image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=900&q=85",
        discount: "20% Off",
        passengers: "5 Seats",
        luggage: "3 Bags",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
    {
        category: "SUV & FAMILY CARS",
        heading: "Spacious SUVs for Family Adventures",
        name: "Toyota RAV4",
        type: "Compact SUV",
        location: "New York, USA",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
        discount: "20% Off",
        passengers: "5 Seats",
        luggage: "3 Bags",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
    {
        category: "SUV & FAMILY CARS",
        heading: "Spacious SUVs for Family Adventures",
        name: "Ford Explorer",
        type: "Full-Size SUV",
        location: "Boston, USA",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=85",
        discount: "15% Off",
        passengers: "7 Seats",
        luggage: "4 Bags",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
    {
        category: "SUV & FAMILY CARS",
        heading: "Spacious SUVs for Family Adventures",
        name: "Jeep Grand Cherokee",
        type: "Premium SUV",
        location: "Philadelphia, USA",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=85",
        discount: "20% Off",
        passengers: "5 Seats",
        luggage: "4 Bags",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
    {
        category: "PREMIUM & LUXURY CARS",
        heading: "Premium Cars for a First-Class Journey",
        name: "Mercedes-Benz C-Class",
        type: "Luxury Sedan",
        location: "San Francisco, USA",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85",
        discount: "15% Off",
        passengers: "5 Seats",
        luggage: "3 Bags",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
    {
        category: "PREMIUM & LUXURY CARS",
        heading: "Premium Cars for a First-Class Journey",
        name: "BMW 5 Series",
        type: "Executive Sedan",
        location: "San Francisco, USA",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
        discount: "20% Off",
        passengers: "5 Seats",
        luggage: "3 Bags",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
    {
        category: "PREMIUM & LUXURY CARS",
        heading: "Premium Cars for a First-Class Journey",
        name: "Porsche 911",
        type: "Luxury Sports Car",
        location: "Los Angeles, USA",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
        discount: "10% Off",
        passengers: "2 Seats",
        luggage: "1 Bag",
        transmission: "Automatic",
        fuel: "Gasoline",
    },
];

const destinations = [
    {
        name: "Los Angeles",
        image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "New York",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Miami",
        image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Las Vegas",
        image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "San Francisco",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Orlando",
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=85",
    },
];

const benefits = [
    {
        title: "Competitive Rental Rates",
        description: "Explore available vehicles and rental offers for your trip.",
        Icon: Tag,
    },
    {
        title: "Secure Booking",
        description: "Get assistance with booking details and rental requirements.",
        Icon: ShieldCheck,
    },
    {
        title: "Special Car Rental Deals",
        description: "Discover offers on selected vehicles and rental periods.",
        Icon: Gift,
    },
    {
        title: "Flexible Rental Options",
        description: "Compare available pickup, return, and cancellation terms.",
        Icon: CalendarCheck,
    },
];

const carGroups = [
    {
        category: "ECONOMY CARS",
        heading: "Affordable Cars for Everyday Travel",
        cars: cars.slice(0, 3),
    },
    {
        category: "SUV & FAMILY CARS",
        heading: "Spacious SUVs for Family Adventures",
        cars: cars.slice(3, 6),
    },
    {
        category: "PREMIUM & LUXURY CARS",
        heading: "Premium Cars for a First-Class Journey",
        cars: cars.slice(6, 9),
    },
];

export default function CarBookingPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#F8FBF6] text-[#172C26]">
            {/* Hero */}
            <section className="relative isolate flex min-h-[310px] items-center overflow-hidden sm:min-h-[360px] lg:min-h-[390px]">
                <Image
                    src="/images/CarBanner1.webp"
                    alt="Premium car ready for a road trip"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8F0]/95 via-[#F4F8F0]/70 to-transparent" />

                <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFD2] px-3 py-1.5 text-xs font-bold tracking-wide text-[#315F2A]">
                            <CarFront size={15} />
                            CAR RENTALS
                        </span>

                        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#123C32] sm:text-5xl lg:text-6xl">
                            Find Your Perfect Ride
                        </h1>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-[#344740] sm:text-base">
                            From affordable city cars to premium SUVs, explore
                            rental options for your next road trip or airport
                            transfer.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 rounded-full border border-[#538440]/20 bg-white/80 px-4 py-2 text-sm text-[#315F2A] shadow-sm">
                                <ShieldCheck size={17} />
                                Trusted rental options
                            </div>

                            <div className="flex items-center gap-2 rounded-full border border-[#538440]/20 bg-white/80 px-4 py-2 text-sm text-[#315F2A] shadow-sm">
                                <Tag size={17} />
                                Exclusive deals
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits strip */}
            <section className="border-y border-[#DDEAD7] bg-[#EFF6EA]">
                <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 py-5 sm:px-8 lg:grid-cols-4 lg:px-12">
                    {[
                        {
                            title: "Wide Vehicle Selection",
                            subtitle: "Economy to luxury cars",
                            Icon: CarFront,
                        },
                        {
                            title: "Rental Offers",
                            subtitle: "Explore available deals",
                            Icon: Tag,
                        },
                        {
                            title: "Booking Assistance",
                            subtitle: "Help with rental details",
                            Icon: ShieldCheck,
                        },
                        {
                            title: "24/7 Support",
                            subtitle: "We're here to help",
                            Icon: Headset,
                        },
                    ].map(({ title, subtitle, Icon }, index) => (
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
                                index === 3 ? "lg:border-r-0" : ""
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

            {/* Car categories */}
            <section className="mx-auto max-w-[1440px] space-y-8 px-5 py-8 sm:px-8 sm:py-14 lg:space-y-14 lg:px-12">
                {carGroups.map((group) => (
                    <div key={group.category}>
                        <div className="mb-4">
                            <p className="text-[10px] font-extrabold tracking-wider text-[#538440] sm:text-xs">
                                {group.category}
                            </p>

                            <h2 className="mt-1 text-xl font-extrabold leading-tight text-[#202D3C] sm:text-2xl lg:text-3xl">
                                {group.heading}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                            {group.cars.map((car) => (
                                <article
                                    key={car.name}
                                    className="group overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="relative h-48 overflow-hidden sm:h-44 lg:h-40">
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#538440] shadow-sm">
                                            SPECIAL DEAL
                                        </span>
                                    </div>

                                    <div className="p-4">
                                        <p className="text-[13px] font-semibold uppercase tracking-wide text-[#538440]">
                                            {car.type}
                                        </p>

                                        <h3 className="mt-1 line-clamp-2 min-h-10 text-xl font-bold leading-5 text-[#202D3C] transition-colors group-hover:text-[#538440]">
                                            {car.name}
                                        </h3>

                                        <div className="mt-2 flex items-center gap-1.5 text-lg text-gray-500">
                                            <MapPin
                                                size={14}
                                                className="shrink-0 text-[#538440]"
                                            />
                                            <span>{car.location}</span>
                                        </div>

                                        

                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-base text-gray-500">
                                                Rental deal
                                            </span>

                                            <span className="text-sm font-extrabold text-[#55A52D] sm:text-base md:text-lg">
                                                {car.discount}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Promotional banner */}
          <section className="relative overflow-hidden w-full flex justify-center items-center">
        <div className="grid min-h-[220px] grid-cols-1 lg:grid-cols-2 w-[93%]  border-y border-[#DDEAD7] bg-[#EAF4E5]">
                    <div className="relative min-h-[210px] lg:min-h-[260px]">
                        <Image
                            src="/images/CarPromotion.webp"
                            alt="Car ready for a scenic road trip"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="relative flex items-center px-6 py-8 sm:px-10 lg:px-12">
                        <div className="relative z-10 max-w-xl">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#538440]">
                                Your journey, your way
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#123C32] sm:text-3xl">
                                More Freedom,
                                <br />
                                More Places to Explore!
                            </h2>

                            <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
                                Plan a weekend getaway, explore a new city, or
                                enjoy the freedom of the open road with a
                                rental option that fits your journey.
                            </p>
                        </div>

                        <div className="pointer-events-none absolute -right-8 -top-10 size-52 rounded-full bg-white/40 blur-3xl" />
                    </div>
                </div>
            </section>

            {/* Popular destinations */}
            <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 lg:px-12">
                <div className="mb-4">
                    <p className="text-[10px] font-extrabold tracking-wider text-[#538440] sm:text-xs">
                        POPULAR DESTINATIONS
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold text-[#202D3C] sm:text-2xl lg:text-3xl">
                        Explore Car Rentals in Top Destinations
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
                    {destinations.map((destination) => (
                        <div key={destination.name} className="group">
                            <div className="relative h-28 overflow-hidden rounded-lg shadow-sm sm:h-32 lg:h-28">
                                <Image
                                    src={destination.image}
                                    alt={`Car rentals in ${destination.name}`}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                    className="object-cover transition duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-90" />

                                <div className="absolute inset-x-0 bottom-0 p-2 text-center">
                                    <span className="text-xs font-bold text-white">
                                        {destination.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Rental benefits */}
            <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
                <div className="mb-5">
                    <h2 className="text-2xl font-extrabold text-[#202D3C] sm:text-3xl">
                        The Right Car for Every Journey
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                        Explore rental options, compare vehicle features, and
                        get assistance with your travel plans.
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