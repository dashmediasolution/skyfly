import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE_URL = "https://skyflywithus.com";

const policyRoutes: Record<string, string> = {
    FLIGHT: "flight-change",
    NAME: "name-change",
    CANCELLATION: "cancellation",
    BAGGAGE: "baggage",
};

function toSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export async function GET() {
    try {
        const [blogs, policies] = await Promise.all([
            prisma.blog.findMany({
                select: {
                    title: true,
                    slug: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.airlinePolicy.findMany({
                where: {
                    status: "PUBLISHED",
                },
                select: {
                    policyType: true,
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: {
                    updatedAt: "desc",
                },
            }),
        ]);

        const blogLinks = blogs
            .map(
                (blog) =>
                    `- [${blog.title}](${BASE_URL}/blog/${blog.slug})`
            )
            .join("\n");

        const policyLinks = policies
            .map((policy) => {
                const route = policyRoutes[policy.policyType];

                if (!route || !policy.category?.name) {
                    return null;
                }

                const airlineSlug = toSlug(policy.category.name);

                return `- [${policy.category.name} - ${route.replace(
                    /-/g,
                    " "
                )} Policy](${BASE_URL}/${route}/${airlineSlug})`;
            })
            .filter(Boolean)
            .join("\n");

        const content = `# SkyFlyWithUs

> SkyFlyWithUs provides flight-related information, travel deals, travel guides, and airline policy resources to help travelers plan their journeys.

SkyFlyWithUs helps visitors explore flight information, discover travel deals, and learn about airline policies, travel planning, and related services.

## Main Pages

- [Home](${BASE_URL}/): Main website and travel resources.
- [About Us](${BASE_URL}/about): Learn about SkyFlyWithUs and its mission.
- [Contact Us](${BASE_URL}/contact): Contact and support information.
- [Flights](${BASE_URL}/flights): Flight-related information and search tools.
- [Deals](${BASE_URL}/deals): Travel deals and promotional offers.
- [Hotels](${BASE_URL}/hotels): Hotel-related travel information.
- [Car Rental](${BASE_URL}/car-rental): Car rental information and resources.
- [Blog](${BASE_URL}/blog): Travel articles, tips, and guides.

## Travel Guides and Blog Articles

The following links contain individual travel articles, guides, and informational resources.

${blogLinks || "- No blog articles are currently available."}

## Airline Policies

The following pages contain published airline policy information.

${policyLinks || "- No published airline policy pages are currently available."}

## Legal Information

- [Disclaimer](${BASE_URL}/disclaimer): Website disclaimer and limitations.
- [Privacy Policy](${BASE_URL}/privacy): Information about privacy practices.
- [Terms and Conditions](${BASE_URL}/terms): Terms governing website use.

## Technical Resources

- [XML Sitemap](${BASE_URL}/sitemap.xml): Sitemap for discovering publicly accessible website URLs.
- [Robots.txt](${BASE_URL}/robots.txt): Website crawling directives.

## Content Guidance

- Refer to the relevant page for information about its subject.
- Flight prices, availability, baggage allowances, cancellation policies, fees, and promotional offers may change.
- Verify time-sensitive travel information with the relevant airline or service provider.
- Do not assume that every promotion or policy applies to every flight, passenger, or booking.
- Informational content does not guarantee flight availability, pricing, or booking outcomes.
`;

        return new NextResponse(content, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        console.error("LLMS.txt generation error:", error);

        return new NextResponse("Unable to generate llms.txt", {
            status: 500,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });
    }
}