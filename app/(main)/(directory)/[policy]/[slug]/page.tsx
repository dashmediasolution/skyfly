
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AirlinePolicyDetailPage from "./AirlinePolicyDetailPage";

import {
    policyRoutes,
    getAirlinePolicyDetail,
    getRelatedAirlinePolicies,
} from "@/lib/detail-airline-policy-cache";

const SITE_URL = "https://skyflywithus.com";

type PageProps = {
    params: Promise<{
        policy: string;
        slug: string;
    }>;
};

const policyLabels = {
    FLIGHT: "Flight Change Policy",
    NAME: "Name Change Policy",
    CANCELLATION: "Cancellation Policy",
    BAGGAGE: "Baggage Policy",
};

async function getPageData(policy: string, slug: string) {
    const policyType = policyRoutes[policy];

    if (!policyType) {
        return null;
    }

    const result = await getAirlinePolicyDetail(
        policyType,
        slug
    );

    if (!result?.airline || !result.policy) {
        return null;
    }

    const relatedPolicies = await getRelatedAirlinePolicies(
        policyType,
        result.airline.id
    );

    return {
        policyType,
        airline: result.airline,
        policy: result.policy,
        relatedPolicies,
    };
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { policy, slug } = await params;

    const policyType = policyRoutes[policy];

    if (!policyType) {
        return {
            title: "Policy Not Found | SkyFlyWithUs",
        };
    }

    const canonicalUrl = `${SITE_URL}/${policy}/${slug}`;

    const label = policyLabels[policyType];

    const fallbackTitle =
        `${slug.split("-").map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        ).join(" ")} ${label} | SkyFlyWithUs`;

    const fallbackDescription =
        `Read airline-specific ${label.toLowerCase()} information, applicable ticket conditions, and important travel requirements.`;

    try {
        const result = await getAirlinePolicyDetail(
            policyType,
            slug
        );

        if (!result?.policy) {
            return {
                title: fallbackTitle,
                description: fallbackDescription,
                alternates: {
                    canonical: canonicalUrl,
                },
            };
        }

        const airlinePolicy = result.policy;

        const title =
            airlinePolicy.metaTitle?.trim() || fallbackTitle;

        const description =
            airlinePolicy.metaDescription?.trim() ||
            airlinePolicy.excerpt?.trim() ||
            fallbackDescription;

        const keywords =
            airlinePolicy.metaKeywords?.filter(
                (keyword) => keyword.trim().length > 0
            ) ?? [];

        return {
            title,
            description,
            ...(keywords.length > 0 ? { keywords } : {}),
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title,
                description,
                url: canonicalUrl,
                siteName: "SkyFlyWithUs",
                type: "article",
            },
            twitter: {
                card: "summary",
                title,
                description,
            },
        };
    } catch {
        return {
            title: fallbackTitle,
            description: fallbackDescription,
            alternates: {
                canonical: canonicalUrl,
            },
        };
    }
}

export default async function Page({ params }: PageProps) {
    const { policy, slug } = await params;

    const data = await getPageData(policy, slug);

    if (!data) {
        notFound();
    }

    return (
        <AirlinePolicyDetailPage
            airline={data.airline}
            policy={data.policy}
            relatedPolicies={data.relatedPolicies}
            policyType={data.policyType}
            policyRoute={policy}
        />
    );
}
