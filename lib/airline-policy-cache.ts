
import { unstable_cache } from "next/cache";
import  prisma  from "@/lib/prisma";

type PolicyType = "FLIGHT" | "NAME" | "CANCELLATION" | "BAGGAGE";

export function getAirlinePolicyCategories(policyType: PolicyType) {
    const getCachedCategories = unstable_cache(
        async () => {
            return prisma.airlinePolicyCategory.findMany({
                where: {
                    policies: {
                        some: {
                            policyType,
                            status: "PUBLISHED",
                        },
                    },
                },
                select: {
                    id: true,
                    name: true,
                },
                orderBy: {
                    name: "asc",
                },
            });
        },
        ["airline-policy-categories", policyType],
        {
            tags: [
                "airline-policy-categories",
                `airline-policy-categories-${policyType}`,
            ],
        }
    );

    return getCachedCategories();
}
