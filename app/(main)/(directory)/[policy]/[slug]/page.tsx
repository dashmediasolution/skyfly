 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
    FileText,
    LoaderCircle,
    Plane,
    ShieldCheck,
} from "lucide-react";

type PolicyType = "FLIGHT" | "NAME" | "CANCELLATION" | "BAGGAGE";

type AirlineCategory = {
    id: string;
    name: string;
};

type AirlinePolicy = {
    id: string;
    airlineName: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string[];
    status: string;
    publishedAt?: string | null;
    categoryId: string;
    category?: {
        id: string;
        name: string;
    };
    createdAt?: string;
    updatedAt?: string;
};

const routePolicyTypes: Record<string, PolicyType> = {
    flight: "FLIGHT",
    "name-correction": "NAME",
    cancellation: "CANCELLATION",
    baggage: "BAGGAGE",
};

const policyLabels: Record<PolicyType, string> = {
    FLIGHT: "Flight Change Policy",
    NAME: "Name Correction Policy",
    CANCELLATION: "Cancellation Policy",
    BAGGAGE: "Baggage Policy",
};

function toSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function formatDate(date?: string | null) {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return null;

    return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function AirlinePolicyDetailPage() {
    const params = useParams<{ policy: string; slug: string }>();

    const policyRoute = String(params?.policy ?? "").toLowerCase();
    const airlineSlug = String(params?.slug ?? "").toLowerCase();
    const policyType = routePolicyTypes[policyRoute];

    const [airline, setAirline] = useState<AirlineCategory | null>(null);
    const [policy, setPolicy] = useState<AirlinePolicy | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadPolicy() {
            setLoading(true);
            setError("");
            setAirline(null);
            setPolicy(null);

            try {
                if (!policyType || !airlineSlug) {
                    setError("The requested policy page could not be found.");
                    return;
                }

                // Step 1: Find the airline category using its name.
                const categoriesResponse = await fetch(
                    "/api/airline-policy-categories",
                    {
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                const categoriesData = await categoriesResponse.json();

                if (!categoriesResponse.ok) {
                    throw new Error(
                        categoriesData.error ||
                            "Unable to load airline categories."
                    );
                }

                const categories: AirlineCategory[] =
                    categoriesData.categories ?? [];

                const matchedAirline = categories.find(
                    (category) => toSlug(category.name) === airlineSlug
                );

                if (!matchedAirline) {
                    setError("The requested airline could not be found.");
                    return;
                }

                setAirline(matchedAirline);

                // Step 2: Fetch the published policy for this airline and route.
                const query = new URLSearchParams({
                    categoryId: matchedAirline.id,
                    policyType,
                    status: "PUBLISHED",
                });

                const policiesResponse = await fetch(
                    `/api/airline-policies?${query.toString()}`,
                    {
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                const policiesData = await policiesResponse.json();

                if (!policiesResponse.ok) {
                    throw new Error(
                        policiesData.error ||
                            "Unable to load the airline policy."
                    );
                }

                const policies: AirlinePolicy[] =
                    policiesData.policies ?? [];

                // Validate the category, type and publication status.
                const matchedPolicy = policies.find(
                    (item) =>
                        item.categoryId === matchedAirline.id &&
                        item.status === "PUBLISHED"
                );

                if (matchedPolicy) {
                    setPolicy(matchedPolicy);
                }
            } catch (err) {
                if (
                    err instanceof Error &&
                    err.name === "AbortError"
                ) {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong while loading this policy."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadPolicy();

        return () => controller.abort();
    }, [airlineSlug, policyRoute, policyType]);

    const policyLabel = policyType ? policyLabels[policyType] : "Airline Policy";
    const pageTitle =`${airline?.name ?? "Airline"} ${policyLabel}`;

    if (loading) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
                <div className="text-center">
                    <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-teal-700" />
                    <p className="mt-4 text-sm font-medium text-slate-600">
                        Loading airline policy...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-[60vh] bg-slate-50 px-4 py-16">
                <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <FileText className="h-7 w-7 text-slate-500" />
                    </div>

                    <h1 className="mt-5 text-2xl font-bold text-slate-900">
                        Policy page unavailable
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {error}
                    </p>

                    <Link
                        href={`/${policyRoute || "baggage"}`}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Browse airlines
                    </Link>
                </div>
            </main>
        );
    }

    if (!policy && airline) {
        return (
            <main className="min-h-[60vh] bg-slate-50 px-4 py-16">
                <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
                        <FileText className="h-7 w-7 text-teal-700" />
                    </div>

                    <h1 className="mt-5 text-2xl font-bold text-slate-900">
                        {airline.name} {policyLabel}
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        Policy information for this airline is not yet
                        available. Please check again later.
                    </p>

                    <Link
                        href={`/${policyRoute}`}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Browse airlines
                    </Link>
                </div>
            </main>
        );
    }

    if (!policy || !airline) return null;

    const publishedDate = formatDate(policy.publishedAt);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Article header */}
            <section className="bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-300"
                    >
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>

                        <ChevronRight className="h-4 w-4" />

                        <Link
                            href={`/${policyRoute}`}
                            className="hover:text-white"
                        >
                            {policyLabel}
                        </Link>

                        <ChevronRight className="h-4 w-4" />

                        <span className="font-medium text-white">
                            {airline.name}
                        </span>
                    </nav>

                    <div className="flex items-center gap-3 text-sm font-semibold text-teal-300">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                            <Plane className="h-5 w-5" />
                        </span>

                        {policyLabel}
                    </div>

                    <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        {pageTitle}
                    </h1>

                   

                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
                        <span className="inline-flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-teal-300" />
                            {airline.name}
                        </span>

                        {publishedDate && (
                            <span className="inline-flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-teal-300" />
                                Published {publishedDate}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* Full policy content */}
            <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
                    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
                        <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                                <FileText className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    {airline.name} Policy Details
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {policyLabel}
                                </p>
                            </div>
                        </div>

                        {/*
                          This supports policy content stored as HTML.
                          Only use dangerouslySetInnerHTML when content is
                          trusted and sanitized before being saved.
                        */}
                        <div
                            className="policy-content break-words text-[15px] leading-8 text-slate-700"
                            dangerouslySetInnerHTML={{
                                __html: policy.content || "",
                            }}
                        />

                        <style jsx>{`
                            .policy-content :global(h1) {
                                margin-top: 2rem;
                                margin-bottom: 1rem;
                                font-size: 1.75rem;
                                line-height: 1.3;
                                font-weight: 800;
                                color: #0f172a;
                            }

                            .policy-content :global(h2) {
                                margin-top: 2rem;
                                margin-bottom: 0.85rem;
                                font-size: 1.4rem;
                                line-height: 1.4;
                                font-weight: 750;
                                color: #0f172a;
                            }

                            .policy-content :global(h3) {
                                margin-top: 1.5rem;
                                margin-bottom: 0.75rem;
                                font-size: 1.15rem;
                                line-height: 1.5;
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .policy-content :global(p) {
                                margin-bottom: 1rem;
                            }

                            .policy-content :global(ul) {
                                margin: 1rem 0;
                                padding-left: 1.5rem;
                                list-style: disc;
                            }

                            .policy-content :global(ol) {
                                margin: 1rem 0;
                                padding-left: 1.5rem;
                                list-style: decimal;
                            }

                            .policy-content :global(li) {
                                margin-bottom: 0.5rem;
                                padding-left: 0.25rem;
                            }

                            .policy-content :global(a) {
                                color: #0f766e;
                                text-decoration: underline;
                                overflow-wrap: anywhere;
                            }

                            .policy-content :global(strong),
                            .policy-content :global(b) {
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .policy-content :global(table) {
                                width: 100%;
                                margin: 1.5rem 0;
                                border-collapse: collapse;
                                display: block;
                                overflow-x: auto;
                            }

                            .policy-content :global(th),
                            .policy-content :global(td) {
                                border: 1px solid #e2e8f0;
                                padding: 0.75rem;
                                text-align: left;
                                vertical-align: top;
                            }

                            .policy-content :global(th) {
                                background: #f8fafc;
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .policy-content :global(blockquote) {
                                margin: 1.5rem 0;
                                border-left: 4px solid #0f766e;
                                padding: 0.75rem 1rem;
                                background: #f0fdfa;
                            }

                            .policy-content :global(img) {
                                max-width: 100%;
                                height: auto;
                                border-radius: 0.75rem;
                            }

                            .policy-content :global(hr) {
                                margin: 2rem 0;
                                border-color: #e2e8f0;
                            }
                        `}</style>

                        <div className="mt-10 border-t border-slate-100 pt-5">
                            <p className="text-xs leading-6 text-slate-500">
                                Disclaimer: Airline policies, fees, and
                                conditions may change. Verify the latest
                                applicable information with the airline before
                                travelling.
                            </p>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-5 lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <h2 className="mt-4 text-base font-bold text-slate-900">
                                Before you travel
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Check your ticket conditions and confirm
                                applicable rules with the airline.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-base font-bold text-slate-900">
                                Explore policies
                            </h2>

                            <div className="mt-4 space-y-1">
                                {Object.entries(routePolicyTypes).map(
                                    ([route, type]) => (
                                        <Link
                                            key={route}
                                            href={`/${route}/${toSlug(airline.name)}`}
                                            className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm transition ${
                                                route === policyRoute
                                                    ? "bg-teal-50 font-semibold text-teal-800"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                        >
                                            <span>{policyLabels[type]}</span>
                                            <ChevronRight className="h-4 w-4 shrink-0" />
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>

                        <Link
                            href={`/${policyRoute}`}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-800"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All airlines
                        </Link>
                    </aside>
                </div>
            </section>
        </main>
    );
}
