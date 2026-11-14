import { unstable_cache } from "next/cache";
import  prisma  from "@/lib/prisma";

export type PolicyType =
    | "FLIGHT"
    | "NAME"
    | "CANCELLATION"
    | "BAGGAGE";

export const policyRoutes: Record<string, PolicyType> = {
    "flight-change": "FLIGHT",
    "name-change": "NAME",
    cancellation: "CANCELLATION",
    baggage: "BAGGAGE",
};

export function toSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Fetch selected airline and its published policy
export function getAirlinePolicyDetail(
    policyType: PolicyType,
    airlineSlug: string
) {
    const getCachedDetail = unstable_cache(
        async () => {
            const categories =
                await prisma.airlinePolicyCategory.findMany({
                    select: {
                        id: true,
                        name: true,
                    },
                });

            const airline = categories.find(
                (item) => toSlug(item.name) === airlineSlug
            );

            if (!airline) {
                return null;
            }

            const policy = await prisma.airlinePolicy.findFirst({
                where: {
                    categoryId: airline.id,
                    policyType,
                    status: "PUBLISHED",
                },
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });

            if (!policy) {
                return {
                    airline,
                    policy: null,
                };
            }

            return {
                airline,
                policy,
            };
        },
        ["airline-policy-detail", policyType, airlineSlug],
        {
            tags: [
                `airline-policy-detail-${policyType}-${airlineSlug}`,
            ],
        }
    );

    return getCachedDetail();
}

// Fetch only lightweight data for related airline links
export function getRelatedAirlinePolicies(
    policyType: PolicyType,
    currentCategoryId: string
) {
    const getCachedRelated = unstable_cache(
        async () => {
            const policies = await prisma.airlinePolicy.findMany({
                where: {
                    policyType,
                    status: "PUBLISHED",
                    categoryId: {
                        not: currentCategoryId,
                    },
                },
                select: {
                    id: true,
                    categoryId: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    updatedAt: "desc",
                },
            });

            const uniquePolicies = Array.from(
                new Map(
                    policies.map((item) => [
                        item.categoryId,
                        item,
                    ])
                ).values()
            );

            return uniquePolicies.slice(0, 5);
        },
        [
            "related-airline-policies",
            policyType,
            currentCategoryId,
        ],
        {
            tags: [
                `airline-policy-related-${policyType}`,
            ],
        }
    );

    return getCachedRelated();
}