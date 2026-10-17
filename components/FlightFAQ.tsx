
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircleQuestion, Minus, Plus } from "lucide-react";
import { flightFAQs } from "./travel-data";

type FlightFAQProps = {
  destinationSlug: string;
  destinationName: string;
};

export default function FlightFAQ({
  destinationSlug,
  destinationName,
}: FlightFAQProps) {
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const faqs = flightFAQs[destinationSlug] ?? [];
  const visibleFAQs = showAll ? faqs : faqs.slice(0, 6);

  const toggleFAQ = (index: number) => {
    setOpenFAQs((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index],
    );
  };

  if (!faqs.length) return null;

  return (
    <section
      id="faqs"
      className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
    >
      <div className="rounded-xl bg-[#EAF4E8] w-full p-4 sm:p-5 lg:p-6">
        {/* Header */}

        <div className="mb-4 flex w-full justify-center text-center">
          <div className="flex w-full flex-col items-center">
            <h2 className="flex items-center justify-center gap-2 text-base font-bold text-[#193C36] sm:text-lg">
              <MessageCircleQuestion size={23} fill="#538440" stroke="white" />
              FAQ (Frequently Asked Questions).
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#193C36] sm:text-sm">
              Quick answers to common queries about flights to {destinationName}.
            </p>
          </div>
        </div>


        {/* FAQ Grid */}
        <div className="grid grid-cols-1 items-start gap-2.5 md:grid-cols-2">
          {visibleFAQs.map((faq, index) => {
            const isOpen = openFAQs.includes(index);

            return (
              <div
                key={`${destinationSlug}-${faq.question}`}
                className="overflow-hidden rounded-lg border border-[#B7D0AD] bg-white transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex min-h-[42px] w-full items-center justify-between gap-3 px-3 py-2.5 text-left sm:px-4"
                >
                  <span className="text-xs font-medium leading-5 text-[#193C36] sm:text-sm">
                    {faq.question}
                  </span>

                  <span className="shrink-0 text-[#202820]">
                    {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#E2EBDD] px-3 py-3 sm:px-4">
                    <p className="text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
