
"use client";

import { useState } from "react";
import {
    X,
    Megaphone,
    Phone,
    RefreshCw,
    ShieldCheck,
    Clock3,
} from "lucide-react";

export default function Dialog() {
    const [flag, setFlag] = useState(true);

    if (!flag) return null;

    const phoneNumber = "+18555093791";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-350/60 px-4 py-5 backdrop-blur-sm">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => setFlag(false)}
                    aria-label="Close dialog"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                >
                    <X size={17} />
                </button>

                <div className="px-5 pb-6 pt-9 sm:px-7 sm:pb-7 sm:pt-10">

                    {/* Badge */}
                    <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-[#E6F6F2] px-4 py-2 text-xs font-bold text-[#00876A]">
                        <Megaphone size={16} />
                        Call Us Today!
                    </div>

                    {/* Heading */}
                    <div className="mt-5 text-center">
                        <h2
                            id="dialog-title"
                            className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl"
                        >
                            Plan Your Trip
                            <span className="block text-[#009966]">
                                with Confidence!
                            </span>
                        </h2>

                        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#009966]" />


                    </div>

                    {/* Description */}
                    <p className="mx-auto mt-3 max-w-sm text-sm flex justify-center items-center md:text-base leading-5 text-slate-600">
                    Need help with your travel plans? Our dedicated travel assistance team is here to make your journey easier. 
                     Whether you need help with travel-related questions, we're just a call away.
                    </p>

                    <a
                        href="tel:+18555093791"
                        className="mt-3  flex w-full justify-center items-center gap-2 text-lg md:text-xl font-extrabold text-[#008F70]"
                    >
                        <Phone size={18} />
                        +1 (855) 509-3791
                    </a>

                    {/* Compact Trust Indicators */}
                    <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-[#EAF7F3] px-5 py-3">
                        <div className="flex flex-col items-center gap-1.5">
                            <ShieldCheck size={22} className="text-[#00876A]" />
                            <span className="text-[10px] font-semibold text-slate-700 sm:text-xs">
                                Reliable Support
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-1.5">
                            <Clock3 size={22} className="text-[#00876A]" />
                            <span className="text-[10px] font-semibold text-slate-700 sm:text-xs">
                                24/7 Assistance
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-1.5">
                            <RefreshCw size={22} className="text-[#00876A]" />
                            <span className="text-[10px] font-semibold text-slate-700 sm:text-xs">
                                Easy Rebooking
                            </span>
                        </div>
                    </div>
                    {/* Call Button */}
                    <div className="mt-6 border-t border-slate-200 pt-5 text-center">
                        <p className="mb-3 text-xs font-medium text-slate-600">
                            Talk to a travel expert today
                        </p>

                        <a
                            href={`tel:${phoneNumber}`}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008F70] px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#00765C] sm:text-base"
                        >
                            <Phone size={18} />
                            +1 (855) 509-3791
                        </a>

                        <p className="mt-3 text-[11px] text-slate-500">
                            Speak with our travel assistance team
                        </p>
                    </div>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-[#B9E8D9] via-[#009966] to-[#B9E8D9]" />
            </div>
        </div>
    );
}
