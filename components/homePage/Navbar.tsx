"use client";

import { useState } from "react";
import Link from "next/link";
import { Headset, Phone, Menu, X } from "lucide-react";
import GoogleTranslate from "@/components/GoogleTranslate";
import Image from "next/image";
const navigation = [
    { label: "Home", href: "/" },
    { label: "Flights", href: "/flights" },
    { label: "Hotels", href: "/hotels" },
    { label: "Car Rental", href: "/car-rental" },
    { label: "Deals", href: "/deals" },
    { label: "Group Travel", href: "/group-travel" },
    { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full shadow-lg border-b border-gray-100 bg-white">

            <div className="mx-auto flex min-h-[70px] max-w-[1440px] items-center justify-between gap-3 px-4
             sm:min-h-[76px] sm:px-8 lg:px-12">


                <Link href="/" className="flex shrink-0 items-center">
                    <Image
                        src="/images/skyflywithuslogo.png"
                        alt="SkyFlyWithUs"
                        width={185}
                        height={42}
                        priority
                        className="h-auto w-[150px] sm:w-[185px] object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-5 xl:flex  ">
                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="whitespace-nowrap text-sm font-semibold text-gray-700 transition-colors hover:text-[#548746]  md:text-base"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    {/* Desktop Phone Button */}
                    <a
                       href="tel:+1-855-509-3791"

                        className="hidden items-center gap-2 rounded-full border border-[#548746]/40 px-4 py-2.5 text-sm font-semibold text-[#477b3c] transition-colors hover:bg-[#548746] hover:text-white sm:flex lg:px-5 lg:text-base"
                    >
                        <Phone size={16} />
                        <span>1-855-509-3791</span>
                    </a>

                    {/* Mobile Phone Icon */}
                    <a
                        href="tel:+1-855-509-3791"
                        aria-label="Call customer support"
                        className="flex size-10 items-center justify-center rounded-full border border-[#548746]/40 text-[#548746] transition-colors hover:bg-[#548746] hover:text-white sm:hidden"
                    >
                        <Phone size={16} />
                    </a>

                    {/* Language Selector */}
                    <div className="hidden sm:block">
                        <GoogleTranslate />
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-800 transition-colors hover:border-[#548746] hover:bg-[#EAF2E6] hover:text-[#548746] xl:hidden"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile & Tablet Dropdown Menu */}
            {menuOpen && (
                <div className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white shadow-lg xl:hidden">
                    <nav className="mx-auto flex max-w-[1440px] flex-col px-4 py-3 sm:px-8">
                        {navigation.map((item, index) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center justify-between py-4 text-sm font-semibold text-gray-700 transition-colors hover:text-[#548746] sm:text-base ${index !== navigation.length - 1
                                    ? "border-b border-gray-100"
                                    : ""
                                    }`}
                            >
                                {item.label}
                                <span className="text-lg text-[#548746]">›</span>
                            </Link>
                        ))}

                        {/* Mobile Language Selector */}
                        <div className="border-t border-gray-100 pt-4 sm:hidden">
                            <GoogleTranslate />
                        </div>

                        {/* Mobile Contact Link */}
                        <a
                            href="tel:+18555093791"

                            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#548746] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#416d36] sm:hidden"
                        >
                            <Headset size={19} />
                            Call 1-855-509-3791
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
