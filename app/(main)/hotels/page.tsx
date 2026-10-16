
import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  CalendarDays,
  MapPin,
  Tag,
  ShieldCheck,
  Headset,
  Gift,
  CalendarCheck,
  ArrowRight,
  Plane,
  CheckCircle2,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata("hotels");
const hotels = [
  {
    category: "TOP AIRPORT HOTELS",
    heading: "Popular Airport Hotels Near Dallas-Fort Worth (DFW)",
    name: "La Quinta Inn & Suites by Wyndham Dallas DFW Airport North",
    location: "Dallas, Texas",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
  {
    category: "TOP AIRPORT HOTELS",
    heading: "Popular Airport Hotels Near Dallas-Fort Worth (DFW)",
    name: "Comfort Suites DFW Airport",
    location: "Dallas, Texas",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
  {
    category: "TOP AIRPORT HOTELS",
    heading: "Popular Airport Hotels Near Dallas-Fort Worth (DFW)",
    name: "Wingate by Wyndham DFW North Irving",
    location: "Dallas, Texas",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
  {
    category: "BUDGET-FRIENDLY HOTELS",
    heading: "Affordable Hotels Near Major East Coast Airports",
    name: "Holiday Inn Express",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
  {
    category: "BUDGET-FRIENDLY HOTELS",
    heading: "Affordable Hotels Near Major East Coast Airports",
    name: "Hampton Inn",
    location: "Boston, USA",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
  {
    category: "BUDGET-FRIENDLY HOTELS",
    heading: "Affordable Hotels Near Major East Coast Airports",
    name: "Hyatt Place",
    location: "Philadelphia, USA",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
  {
    category: "LUXURY & PREMIUM STAYS",
    heading: "Top-Rated Hotels Near West Coast Airports",
    name: "Aloft San Francisco Airport",
    location: "San Francisco, USA",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
  {
    category: "LUXURY & PREMIUM STAYS",
    heading: "Top-Rated Hotels Near West Coast Airports",
    name: "San Francisco Airport Marriott",
    location: "San Francisco, USA",
    image:
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
  {
    category: "LUXURY & PREMIUM STAYS",
    heading: "Top-Rated Hotels Near West Coast Airports",
    name: "Hilton Los Angeles Airport",
    location: "Los Angeles, USA",
    image:
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=900&q=85",
    discount: "20% Off",
  },
];

const destinations = [
  {
  name: "Paris",
  image:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=85",
},
{
  name: "Tokyo",
  image:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=85",
},
{
  name: "Bali",
  image:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=85",
},
  {
    name: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "New York",
    image:
      "https://images.unsplash.com/photo-1764782979306-1e489462d895?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    name: "Los Angeles",
    image:
      "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Amsterdam",
    image:
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Venice",
    image:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=85",
  },
];

const benefits = [
  {
    title: "Unbeatable Rates",
    description: "Get the best hotel prices with exclusive offers.",
    Icon: Tag,
  },
  {
    title: "Secure Payment Options",
    description: "Multiple payment methods for a safe booking experience.",
    Icon: ShieldCheck,
  },
  {
    title: "Special Offers & Packages",
    description: "Enjoy seasonal deals and group packages.",
    Icon: Gift,
  },
  {
    title: "Flexible Cancellation Policies",
    description: "Choose from available cancellation options for peace of mind.",
    Icon: CalendarCheck,
  },
];

const hotelGroups = [
  {
    category: "TOP AIRPORT HOTELS",
    heading: "Popular Airport Hotels Near Dallas-Fort Worth (DFW)",
    hotels: hotels.slice(0, 3),
  },
  {
    category: "BUDGET-FRIENDLY HOTELS",
    heading: "Affordable Hotels Near Major East Coast Airports",
    hotels: hotels.slice(3, 6),
  },
  {
    category: "LUXURY & PREMIUM STAYS",
    heading: "Top-Rated Hotels Near West Coast Airports",
    hotels: hotels.slice(6, 9),
  },
];

export default function HotelsBookingPage() {
  return (
    <main className="min-h-screen overflow-hidden   bg-[#F8FBF6] text-[#172C26]">
      {/* Hero section — no search bar */}
      <section className="relative isolate flex min-h-[310px] items-center overflow-hidden sm:min-h-[360px] lg:min-h-[390px]">
        <Image
  src="/images/HotelBanner.png"
  alt="Luxury beachfront hotel and tropical infinity pool"
  fill
  priority
  sizes="100vw"
  className="object-cover object-center"
/>

        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8F0]/95 via-[#F4F8F0]/55 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFD2] px-3 py-1.5 text-xs font-bold tracking-wide text-[#315F2A]">
              <BedDouble size={15} />
              HOTELS
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#123C32] sm:text-5xl lg:text-6xl">
              Find Your Perfect Stay
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#344740] sm:text-base">
              From budget hotels to luxury resorts, discover the best stays
              at top destinations worldwide.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[#538440]/20 bg-white/80 px-4 py-2 text-sm text-[#315F2A] shadow-sm">
                <ShieldCheck size={17} />
                Trusted stays
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#538440]/20 bg-white/80 px-4 py-2 text-sm text-[#315F2A] shadow-sm">
                <Tag size={17} />
                Exclusive deals
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel benefits strip */}
      <section className="border-y border-[#DDEAD7] bg-[#EFF6EA]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 py-5 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            {
              title: "Wide Range of Hotels",
              subtitle: "Budget to luxury stays",
              Icon: BedDouble,
            },
            {
              title: "Best Prices",
              subtitle: "Exclusive deals & offers",
              Icon: Tag,
            },
            {
              title: "Secure Booking",
              subtitle: "Safe and reliable reservations",
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
                index % 2 === 0 ? "border-r border-[#DDEAD7] lg:border-r" : ""
              } ${
                index < 2 ? "border-b border-[#DDEAD7] lg:border-b-0" : ""
              } ${
                index === 1 ? "lg:border-r" : ""
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

      {/* Hotel card groups */}
      <section className="mx-auto max-w-[1440px] space-y-8 px-5 py-8 sm:px-8 sm:py-14 lg:space-y-18 lg:px-12">
        {hotelGroups.map((group) => (
          <div key={group.category}>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold tracking-wider text-[#538440] sm:text-xs">
                  {group.category}
                </p>
                <h2 className="mt-1 text-xl font-extrabold leading-tight text-[#202D3C] sm:text-2xl lg:text-3xl">
                  {group.heading}
                </h2>
              </div>

             
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {group.hotels.map((hotel) => (
                <div
                  key={hotel.name}
    
                  className="group overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden sm:h-44 lg:h-40">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#538440] shadow-sm">
                      SPECIAL DEAL
                    </span>
                  </div>

                  <div className="p-3">
                    <h3 className="line-clamp-2 min-h-10 text-lg font-bold leading-5 text-[#202D3C] group-hover:text-[#538440]">
                      {hotel.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1.5 text-lg text-gray-500">
                        <MapPin
                          size={14}
                          className="shrink-0 text-[#538440]"
                        />
                        <span className="truncate">{hotel.location}</span>
                      </span>

                      <span className="shrink-0 text-sm font-extrabold text-[#55A52D] sm:text-base, md:text-lg">
                        {hotel.discount}
                      </span>
                    </div>
                  </div>
                </div>
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
              src="/images/HotelPromotion.png"
              alt="Tropical beachside hotel with ocean views"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="relative flex items-center px-6 py-8 sm:px-10 lg:px-12">
            <div className="relative z-10 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#538440]">
                Your next getaway
              </p>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#123C32] sm:text-3xl">
                Stay Anywhere,
                <br />
                Anytime, Where You Want!
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
                From bustling city centers to serene beachside escapes, find
                the perfect accommodation for every journey.
              </p>
             
            </div>

            <div className="pointer-events-none absolute -right-8 -top-10 size-52 rounded-full bg-white/40 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      
<section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 lg:px-12">
  <div className="mb-5">
    <p className="text-[10px] font-extrabold tracking-wider text-[#538440] sm:text-xs">
      POPULAR DESTINATIONS
    </p>

    <h2 className="mt-1 text-xl font-extrabold text-[#202D3C] sm:text-2xl lg:text-3xl">
      Explore Hotels in Top Destinations
    </h2>
  </div>

  <Carousel
    opts={{
      align: "start",
      loop: false,
    }}
    className="relative w-full"
  >
    <CarouselContent className="-ml-3">
      {destinations.map((destination) => (
        <CarouselItem
          key={destination.name}
          className="basis-1/2 pl-3 sm:basis-1/3 lg:basis-1/6"
        >
          <div className="group">
            <div className="relative h-28 overflow-hidden rounded-lg shadow-sm sm:h-32 lg:h-28">
              <Image
                src={destination.image}
                alt={`Hotels in ${destination.name}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-2 text-center">
                <span className="text-xs font-bold text-white sm:text-sm">
                  {destination.name}
                </span>
              </div>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    <CarouselPrevious className="-left-3 size-8 border-gray-200 bg-white text-gray-700 shadow-md hover:bg-[#538440] hover:text-white sm:-left-4 sm:size-9" />

    <CarouselNext className="-right-3 size-8 border-gray-200 bg-white text-gray-700 shadow-md hover:bg-[#538440] hover:text-white sm:-right-4 sm:size-9" />
  </Carousel>
</section>

      {/* Booking benefits */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-[#202D3C] sm:text-3xl">
            Unbeatable Rates, Zero Hidden Fees
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Book your perfect stay with complete transparency and exclusive hotel deals.
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
