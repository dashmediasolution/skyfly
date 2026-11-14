
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AirlinePolicyDirectoryClient from "./AirlinePolicyDirectoryClient";
import { getAirlinePolicyCategories } from "@/lib/airline-policy-cache";

const policyRoutes = {
    "flight-change": "FLIGHT",
    "name-change": "NAME",
    cancellation: "CANCELLATION",
    baggage: "BAGGAGE",
} as const;

type PolicyRoute = keyof typeof policyRoutes;

interface PageProps {
    params: Promise<{
        policy: string;
    }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { policy } = await params;

    const titles: Record<PolicyRoute, string> = {
        "flight-change": "Flight Change",
        "name-change": "Name Change",
        cancellation: "Cancellation & Refund",
        baggage: "Baggage",
    };

    if (!(policy in titles)) {
        return { title: "Policy Directory Not Found" };
    }

    return {
        title: `${titles[policy as PolicyRoute]} Airline Policies`,
    };
}

export default async function AirlinePolicyDirectoryPage({
    params,
}: PageProps) {
    const { policy } = await params;

    if (!(policy in policyRoutes)) {
        notFound();
    }

    const policyType = policyRoutes[policy as PolicyRoute];

    const categories = await getAirlinePolicyCategories(policyType);

    return (
        <AirlinePolicyDirectoryClient
            policyRoute={policy}
            categories={categories}
        />
    );
}
