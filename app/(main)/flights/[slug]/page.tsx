
 import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import type { FAQ } from "@/lib/data/popularRoutes/types";

import PopularRouteContent, {
    type RelatedFlight,
} from "@/components/flight_components/PopularRouteContent";

const SITE_URL =
    process.env.NEXTAUTH_URL || "http://localhost:3000";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

type FlightDestination = {
    id: string;
    title: string;
    slug: string;
    destination: string;
    country: string;
    airportCode?: string | null;
    excerpt?: string | null;
    content: string;
    heroImage?: string | null;
    sections?: unknown;
    faqs?: FAQ[] | null;
    focusKeyword?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string[];
    status: string;
    publishedAt?: string | null;
};

type DestinationApiResponse = {
    success: boolean;
    destination: FlightDestination;
    relatedFlights: RelatedFlight[];
};

type DestinationData = {
    destination: FlightDestination;
    relatedFlights: RelatedFlight[];
};

// Fetch destination and related flights
async function getDestination(
    slug: string
): Promise<DestinationData | null> {
    try {
        const response = await fetch(
            `${SITE_URL}/api/flight-destinations/${encodeURIComponent(slug)}`,
            {
                next: {
                    revalidate: 300,
                },
            }
        );

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            console.error(
                "Destination API error:",
                response.status,
                response.statusText
            );

            return null;
        }

        const data: DestinationApiResponse =
            await response.json();

        if (!data.success || !data.destination) {
            return null;
        }
        console.log(data, "response123")
        return {
            destination: data.destination,
            relatedFlights: Array.isArray(data.relatedFlights)
                ? data.relatedFlights
                : [],
        };
    } catch (error) {
        console.error("Failed to fetch destination:", error);
        return null;
    }
}

// Dynamic SEO Metadata
export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    const result = await getDestination(slug);

    if (!result) {
        return {
            title: "Page Not Found | SkyFlyWithUs",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const { destination } = result;

    const title =
        destination.metaTitle?.trim() ||
        `Cheap Flights to ${destination.destination} | SkyFlyWithUs`;

    const description =
        destination.metaDescription?.trim() ||
        destination.excerpt?.trim() ||
        `Find cheap flights to ${destination.destination}. Compare flight options, explore travel deals and plan your next trip with SkyFlyWithUs.`;

    const canonicalUrl =
        `${SITE_URL}/flights/${destination.slug}`;

    const keywords = [
        ...(destination.metaKeywords || []),
        ...(destination.focusKeyword
            ? [destination.focusKeyword]
            : []),
    ];

    const images = destination.heroImage
        ? [
            {
                url: destination.heroImage,
                alt: `Flights to ${destination.destination}`,
            },
        ]
        : [];

    return {
        title,
        description,
        keywords,

        alternates: {
            canonical: canonicalUrl,
        },

        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "SkyFlyWithUs",
            type: "website",
            images,
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: destination.heroImage
                ? [destination.heroImage]
                : [],
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}

// Destination Page
export default async function PopularRoutePage({
    params,
}: Props) {
    const { slug } = await params;

    const result = await getDestination(slug);

    if (!result) {
        notFound();
    }

    const { destination, relatedFlights } = result;

    const content =
        typeof destination.content === "string"
            ? destination.content
            : "";

    const faqs = Array.isArray(destination.faqs)
        ? destination.faqs
        : [];
    console.log(faqs,"hgjhj")
    return (
        <main className="min-h-screen bg-white">

            {/* Destination Hero */}
            <section className="relative flex min-h-[300px] items-center overflow-hidden bg-[#3F6632] sm:min-h-[380px]">

                {destination.heroImage && (
                    <Image
                        src={destination.heroImage}
                        alt={`Flights to ${destination.destination}`}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                )}

                {/* Hero Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Hero Content */}
                <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">

                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                        Flights to {destination.destination}
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white sm:text-base">
                        {destination.excerpt ||
                            `Explore available flights, compare fares, and plan your next journey to ${destination.destination}.`}
                    </p>

                    {destination.airportCode && (
                        <p className="mt-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                            Airport Code: {destination.airportCode}
                        </p>
                    )}

                </div>
            </section>

            {/* Destination Content, Related Flights and FAQs */}
            <PopularRouteContent
                content={content}
                destinationSlug={destination.slug}
                destinationName={destination.destination}
                relatedFlights={relatedFlights}
                faqs={faqs}
            />

        </main>
    );
}
