 "use client";

import { useState } from "react";
import Link from "next/link";
import {
    Headset,
    Phone,
    Menu,
    X,
    ChevronDown,
} from "lucide-react";
import GoogleTranslate from "@/components/GoogleTranslate";
import Image from "next/image";

const navigation = [
    { label: "Home", href: "/" },
    { label: "Flights", href: "/flights" },
    { label: "Hotels", href: "/hotels" },
    { label: "Car Rental", href: "/car-rental" },
    { label: "Deals", href: "/deals" },
    { label: "Group Travel", href: "/group-travel" },
];

const policyNavigation = [
    { label: "Flight Change Policy", href: "/flight-chnage" },
    { label: "Name Correction Policy", href: "/name-correction" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "Baggage Policy", href: "/baggage" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobilePolicyOpen, setMobilePolicyOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-lg">
            <div className="mx-auto flex min-h-[70px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:min-h-[76px] sm:px-8 lg:px-12">
                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center">
                    <Image
                        src="/images/SF-logo.svg"
                        alt="SkyFlyWithUs"
                        width={185}
                        height={42}
                        priority
                        className="h-auto w-[150px] object-contain sm:w-[185px]"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-5 xl:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="whitespace-nowrap text-sm font-semibold text-gray-700 transition-colors hover:text-[#548746] md:text-base"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Airline Policies Dropdown */}
                    <div className="group relative">
                        <button
                            type="button"
                            className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-gray-700 transition-colors hover:text-[#548746] md:text-base"
                            aria-haspopup="true"
                        >
                            Airline Policies
                            <ChevronDown
                                size={16}
                                className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                            />
                        </button>

                        <div className="invisible absolute left-0 top-full z-50 w-64 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                                {policyNavigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[#EAF2E6] hover:text-[#548746]"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
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

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={menuOpen}
                        onClick={() => {
                            setMenuOpen((open) => !open);
                            setMobilePolicyOpen(false);
                        }}
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
                        {navigation.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-between border-b border-gray-100 py-4 text-sm font-semibold text-gray-700 transition-colors hover:text-[#548746] sm:text-base"
                            >
                                {item.label}
                                <span className="text-lg text-[#548746]">
                                    ›
                                </span>
                            </Link>
                        ))}

                        {/* Mobile Airline Policies Dropdown */}
                        <div className="border-b border-gray-100">
                            <button
                                type="button"
                                aria-expanded={mobilePolicyOpen}
                                onClick={() =>
                                    setMobilePolicyOpen((open) => !open)
                                }
                                className="flex w-full items-center justify-between py-4 text-sm font-semibold text-gray-700 transition-colors hover:text-[#548746] sm:text-base"
                            >
                                Airline Policies
                                <ChevronDown
                                    size={18}
                                    className={`text-[#548746] transition-transform duration-200 ${
                                        mobilePolicyOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {mobilePolicyOpen && (
                                <div className="pb-3 pl-4">
                                    {policyNavigation.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-[#EAF2E6] hover:text-[#548746]"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Language Selector */}
                        <div className="border-t border-gray-100 pt-4 sm:hidden">
                            <GoogleTranslate />
                        </div>

                        {/* Mobile Contact Link */}
                        <a
                            href="tel:+1-855-509-3791"
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
