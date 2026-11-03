
import sanitizeHtml from "sanitize-html";
import Link from "next/link";
import type { FAQ } from "@/lib/data/popularRoutes/types";
import FlightFAQ from "@/components/FlightFAQ";
import { Phone, Headset, ArrowRight } from "lucide-react";

export type RelatedFlight = {
    id: string;
    slug: string;
    destination: string;
};

type PopularRouteContentProps = {
    content: string;
    destinationSlug: string;
    destinationName: string;
    relatedFlights?: RelatedFlight[] | null;
    faqs?: FAQ[] | null;
};

export default function PopularRouteContent({
    content,
    relatedFlights,
    destinationSlug,
    destinationName,
    faqs,
}: PopularRouteContentProps) {

    // Handle null and undefined values
    const safeRelatedFlights = relatedFlights ?? [];
    const safeFaqs = faqs ?? [];

    // FAQ JSON-LD Structured Data
    const faqJsonLd = safeFaqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: safeFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        }
        : null;

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content || "", {
        allowedTags: [
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "strong",
            "b",
            "em",
            "i",
            "u",
            "s",
            "ul",
            "ol",
            "li",
            "a",
            "blockquote",
            "br",
            "hr",
            "table",
            "thead",
            "tbody",
            "tr",
            "th",
            "td",
            "img",
            "span",
            "div",
            "sub",
            "sup",
        ],
        allowedAttributes: {
            a: ["href", "target", "rel"],
            img: ["src", "alt", "width", "height"],
            th: ["colspan", "rowspan"],
            td: ["colspan", "rowspan"],
            span: ["class"],
            div: ["class"],
        },
        allowedSchemes: ["http", "https", "mailto"],
    });

    return (
        <>
            {/* FAQ JSON-LD Structured Data */}
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqJsonLd).replace(
                            /</g,
                            "\\u003c"
                        ),
                    }}
                />
            )}

            <section className="w-full bg-white">
                <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-start gap-8 px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12 lg:px-12 lg:py-16">

                    {/* Left: Destination Content */}
                    <article
                        className="
                            order-2 lg:order-1
                            prose prose-lg max-w-none
                            prose-headings:font-bold
                            prose-headings:text-gray-900
                            prose-h1:text-3xl
                            prose-h2:text-2xl
                            prose-h2:text-[#538440]
                            prose-h3:text-xl
                            prose-p:leading-8
                            prose-p:text-gray-600
                            prose-li:text-gray-600
                            prose-a:text-[#538440]
                            prose-a:no-underline
                            hover:prose-a:underline
                            prose-strong:text-gray-900
                            prose-blockquote:border-[#538440]
                            prose-img:rounded-xl
                            prose-table:w-full
                            prose-table:overflow-x-auto
                        "
                        dangerouslySetInnerHTML={{
                            __html: sanitizedContent,
                        }}
                    />

                    {/* Right: Sidebar */}
                    <aside className="order-1 w-full space-y-4 lg:sticky lg:top-24 lg:order-2">

                        {/* Assistance Card */}
                        <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-4 text-center">

                            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#538440] text-white">
                                <Headset size={20} />
                            </div>

                            <h2 className="mt-3 text-base font-bold text-[#538440]">
                                Need Help Booking Flights?
                            </h2>

                            <p className="mt-2 text-xs leading-5 text-gray-600">
                                Speak with our travel team for help with your flight plans.
                            </p>

                            <a
                                href="tel:+18555093791"
                                className="mt-3 flex items-center justify-center gap-2 text-base font-bold text-gray-800 hover:text-[#538440]"
                            >
                                <Phone size={16} />
                                1-855-509-3791
                            </a>

                            <a
                                href="tel:+18555093791"
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#538440] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
                            >
                                <Phone size={15} />
                                Call for Assistance
                            </a>
                        </div>

                        {/* Related Flights */}
                        {safeRelatedFlights.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-4">

                                <h2 className="mb-3 text-base font-bold text-gray-900">
                                    Related Flights
                                </h2>

                                <div className="space-y-2">
                                    {safeRelatedFlights.map((flight) => (
                                        <Link
                                            key={flight.id}
                                            href={`/flights/${flight.slug}`}
                                            className="group flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3 transition hover:border-[#538440]/40 hover:bg-[#F0F6EC]"
                                        >
                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-[#538440]">
                                                Flights to {flight.destination}
                                            </span>

                                            <ArrowRight
                                                size={16}
                                                className="shrink-0 text-[#538440] transition-transform group-hover:translate-x-1"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </aside>
                </div>
            </section>

            {/* Destination FAQs */}
            {safeFaqs.length > 0 && (
                <FlightFAQ
                    destinationSlug={destinationSlug}
                    destinationName={destinationName}
                    faqs={safeFaqs}
                />
            )}
        </>
    );
}
