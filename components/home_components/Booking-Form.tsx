"use client";

import React from "react";
import Image from "next/image";
import { Tag, BookOpen, Headset } from "lucide-react";
import { TravelpayoutsWidget } from "@/components/home_components/TravelpayoutsWidget";

// --- FEATURES DATA ---
const features = [
  {
    icon: <Tag className="h-6 w-6 text-white" />,
    title: "Exclusive Deals",
    description: "Unlock hidden fares and limited-access discounts thanks to our direct partnerships with major airlines. Travel smarter and save more."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-white" />,
    title: "Expert Travel Advice",
    description: "Beyond booking, access expert-crafted guides on compensation, upgrades, and practical travel tips to smooth your journey."
  },
  {
    icon: <Headset className="h-6 w-6 text-white" />,
    title: "24/7 Helpline Support",
    description: "We are always here for you. Enjoy round-the-clock customer support dedicated purely to your comfort and peace of mind."
  }
];

export function BookingForm() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fdfdfd]" id="booking-form-section">

      {/* 1. Shared Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-white to-white" />
      </div>

      {/* 2. The Main Glow (Extended to flow behind everything) */}
      <div
        className="absolute top-[600px] left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[800px] h-[500px] 
                   rounded-full bg-[#FF8C00] 
                   blur-[200px] opacity-25 z-0 pointer-events-none"
      />

      {/* 3. Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-24 md:pt-24">

        {/* --- PART 1: HERO & WIDGET --- */}
        <div className="mb-32"> 

          {/* Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-10 mt-10">

            {/* Left Column: Text */}
            <div className="text-center sm:text-left pl-10">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                Your Dream Trip <br />
                Starts with a <span className="text-[#FF8C00]">Smart Search</span>
              </h1>
              <p className="text-lg text-gray-600 font-normal max-w-xl leading-relaxed">
                We've streamlined the booking process. Enter your details below to compare the world's best airlines and lock in your perfect itinerary in seconds.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full hidden md:block flex justify-center lg:justify-end">
              <div className="relative w-[600px] h-[500px]">
                <Image
                  src="/images/booking-banner.png"
                  alt="Booking Process"
                  fill
                  className="object-cover drop-shadow-xl" 
                  priority
                />
              </div>
            </div>
          </div>

          {/* 🚀 THE NEW TRAVELPAYOUTS WIDGET 🚀 */}
          <div className="w-full max-w-5xl mx-auto relative z-20">
            <TravelpayoutsWidget />
          </div>

        </div>

        {/* --- PART 2: WHY CHOOSE US --- */}

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 rounded-3xl border border-gray-200 flex flex-col items-center text-center relative z-10 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon Wrapper */}
              <div className="flex-shrink-0 mb-6 p-4 bg-[#FF8C00] rounded-full shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Card Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}