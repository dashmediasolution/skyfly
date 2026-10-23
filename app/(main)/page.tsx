
import { BookingForm } from "@/components/home_components/Booking-Form";
import { PopularDestinations } from "@/components/home_components/Popular-Destinations";
import { RecentArticles } from "@/components/home_components/Recent-Articles";
import { Testimonials } from "@/components/home_components/Testimonials";
import type { Metadata } from 'next';
import HeroSection from "@/components/homePage/HeroSerction";
import Benefits from "@/components/homePage/Benefits";
import FlightSearch from "@/components/homePage/FlightSearch";
import HandpickedDestinations from "@/components/handpicked-destinations";
import TopTravelDeals from "@/components/top-travel-deals";
import TravelInformation from "@/components/homePage/TravelInformation";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata("home");
 

export default function Home() {
  return (

    <main className="flex min-h-screen bg-white flex-col items-center justify-between ">
      <HeroSection
        image="/images/HeroBanner.png"
        alt="Explore destinations around the world"
      />
      <FlightSearch />
      <Benefits />
      <HandpickedDestinations />
      <TopTravelDeals />
      <RecentArticles />
      <TravelInformation />
      <Testimonials />
    </main>
  );
}