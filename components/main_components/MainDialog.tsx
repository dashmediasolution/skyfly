
"use client";

import { useState } from "react";
import {
    X,
    Phone,
    Megaphone,
    ShieldCheck,
    RefreshCw,
    Clock3,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Dialog() {
    const [flag, setFlag] = useState(true);
    const phoneNumber = "+18555093791";

    return (
        <AnimatePresence>
            {flag && (
                <motion.div
                    key="dialog-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 px-4 py-3 backdrop-blur-sm"
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-title"
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: 20,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                        className="relative flex min-h-0 w-full max-w-sm flex-col items-center justify-evenly rounded-2xl bg-white px-5 py-6 text-center shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setFlag(false)}
                            aria-label="Close dialog"
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                        >
                            <X size={17} />
                        </button>

                        {/* Offer Badge */}
                        <div className="flex w-fit items-center gap-2 rounded-full bg-[#E6F6F2] px-3 py-2 text-[11px] font-bold text-[#00876A]">
                            <Megaphone size={14} />
                            Call Us Today
                        </div>

                        {/* Heading */}
                        <h2
                            id="dialog-title"
                            className="mt-2 text-lg font-extrabold leading-snug text-slate-900 sm:text-xl"
                        >
                            Limited-Time{" "}
                            <span className="text-[#008F70]">
                                Phone-Only Deal!
                            </span>
                        </h2>

                        {/* Discount */}
                        <h3 className="flex flex-col items-center gap-2 text-5xl font-black leading-none text-[#008F70]">
                            <span className="text-2xl">Up to</span>
                            50% OFF
                        </h3>

                        {/* Offer Details */}
                        <div>
                            <p className="mt-2 text-base font-semibold text-slate-700">
                                Flight Ticket Reservations
                            </p>

                            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-600">
                                Planning your next trip? Call our travel assistance
                                team to explore exclusive phone-only deals and
                                available savings on flight reservations.
                            </p>
                        </div>

                        {/* Phone Number */}
                        <a
                            href={`tel:${phoneNumber}`}
                            className="my-3 flex items-center justify-center gap-2 text-lg font-extrabold text-[#008F70]"
                        >
                            <Phone size={19} />
                            +1 (855) 509-3791
                        </a>

                        {/* Trust Indicators */}
                        <div className="grid w-full grid-cols-3 items-center gap-1 rounded-xl bg-[#EAF7F3] px-2 py-4">
                            <div className="flex flex-col items-center gap-2">
                                <ShieldCheck size={22} className="text-[#00876A]" />
                                <span className="text-center text-[10px] font-semibold text-slate-700 sm:text-xs">
                                    Reliable Support
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <Clock3 size={22} className="text-[#00876A]" />
                                <span className="text-center text-[10px] font-semibold text-slate-700 sm:text-xs">
                                    24/7 Assistance
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <RefreshCw size={22} className="text-[#00876A]" />
                                <span className="text-center text-[10px] font-semibold text-slate-700 sm:text-xs">
                                    Rebooking Help
                                </span>
                            </div>
                        </div>

                        {/* Call Button */}
                        <div className="mt-3 w-full">
                            <a
                                href={`tel:${phoneNumber}`}
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008F70] px-3 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#00765C] sm:text-base"
                            >
                                <Phone size={17} />
                                Call Now to Claim Your Deal!
                            </a>

                            <p className="mt-3 text-[11px] text-slate-500">
                                Speak with our travel assistance team
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
