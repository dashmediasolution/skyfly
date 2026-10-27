 
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowUpRight,
    Search,
    Plane,
    ShieldCheck,
    ChevronRight,
    FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";

type PolicyType = "FLIGHT" | "NAME" | "CANCELLATION" | "BAGGAGE";

type AirlineCategory = {
    id: string;
    name: string;
    _count?: {
        policies: number;
    };
};
 
const policyConfig: Record<
    string,
    {
        type: PolicyType;
        title: string;
        description: string;
        directoryTitle: string;
        cardDescription: string;
        infoTitle: string;
        infoDescription: string;
    }
> = {
    "flight-change": {
        type: "FLIGHT",
        title: "Flight Change",
        description:
            "Explore airline-specific flight policies, ticket conditions, and important travel requirements.",
        directoryTitle: "Flight Change Policy Directory",
        cardDescription: "Flight change policy",
        infoTitle: "Before your flight",
        infoDescription:
            "Flight rules and ticket conditions may vary by airline, route, and fare type. Verify the applicable requirements directly with your airline before travelling.",
    },
    "name-correction": {
        type: "NAME",
        title: "Name Correction",
        description:
            "Find airline-specific information about correcting passenger names and reviewing applicable ticket requirements.",
        directoryTitle: "Name Correction Policy Directory",
        cardDescription: "Name correction policy",
        infoTitle: "Before requesting a name correction",
        infoDescription:
            "Airline rules may differ by ticket type, route, and the type of correction required. Verify the applicable policy and any fees directly with your airline before making changes to a reservation.",
    },
    cancellation: {
        type: "CANCELLATION",
        title: "Cancellation",
        description:
            "Explore airline cancellation policies, ticket refund conditions, and applicable cancellation requirements.",
        directoryTitle: "Cancellation Policy Directory",
        cardDescription: "Cancellation policy",
        infoTitle: "Before cancelling a flight",
        infoDescription:
            "Cancellation and refund conditions can vary depending on the airline, fare rules, route, and timing. Check the applicable policy and any fees directly with your airline before cancelling.",
    },
    baggage: {
        type: "BAGGAGE",
        title: "Baggage",
        description:
            "Find airline-specific baggage policies, including applicable baggage allowances and travel requirements.",
        directoryTitle: "Baggage Policy Directory",
        cardDescription: "Baggage policy",
        infoTitle: "Before travelling with baggage",
        infoDescription:
            "Baggage allowances, size limits, weight restrictions, and additional charges may vary by airline, route, cabin, and fare type. Confirm the current requirements directly with your airline.",
    },
};

function toSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function AirlinePolicyDirectoryPage() {
    const params = useParams<{ policy: string }>();
    const policyRoute = params?.policy?.toLowerCase();
    const config = policyRoute ? policyConfig[policyRoute] : undefined;

    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<AirlineCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCategories() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "/api/airline-policy-categories",
                    {
                        method: "GET",
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load airline categories.");
                }

                const data: { categories?: AirlineCategory[] } =
                    await response.json();

                setCategories(
                    Array.isArray(data.categories) ? data.categories : []
                );
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
                        : "Something went wrong while loading airline categories."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchCategories();

        return () => controller.abort();
    }, []);

    const filteredCategories = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        const uniqueCategories = categories.filter(
            (category, index, array) =>
                array.findIndex(
                    (item) =>
                        item.name.trim().toLowerCase() ===
                        category.name.trim().toLowerCase()
                ) === index
        );

        if (!normalizedSearch) {
            return uniqueCategories;
        }

        return uniqueCategories.filter((category) =>
            category.name.toLowerCase().includes(normalizedSearch)
        );
    }, [categories, search]);
 
    if (!config || !policyRoute) {
         return (
            <main className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-5">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Policy directory not found
                    </h1>

                    <p className="mt-3 text-slate-600">
                        The policy directory you requested does not exist.
                    </p>

                    <Link
                        href="/"
                        className="mt-5 inline-flex font-semibold text-primary hover:underline"
                    >
                        Return home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="relative isolate overflow-hidden bg-slate-950">
                <Image
                    src="/images/travel-desk.webp"
                    alt="Travel planning desk with a world map"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />

                <div className="relative mx-auto flex min-h-[250px] max-w-7xl flex-col justify-center px-5 py-12 sm:px-8 lg:min-h-[300px] lg:px-12">
                    <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                        <FileText className="h-4 w-4" />
                        Airline Policy Directory
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {config.title}
                        <span className="block text-primary">
                            Airline Policies
                        </span>
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
                        {config.description}
                    </p>

                    <nav
                        aria-label="Breadcrumb"
                        className="mt-6 flex items-center gap-2 text-sm text-slate-300"
                    >
                        <Link
                            href="/"
                            className="transition hover:text-white"
                        >
                            Home
                        </Link>

                        <ChevronRight className="h-4 w-4" />

                        <span className="font-medium text-white">
                            {config.title}
                        </span>
                    </nav>
                </div>
            </section>

            {/* Directory */}
            <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-10 max-w-3xl text-center">
                        <span className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                            Browse by airline
                        </span>

                        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                            {config.directoryTitle}
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                            Select an airline to explore its{" "}
                            {config.title.toLowerCase()} policy information
                            and relevant travel requirements.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mx-auto mb-8 max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <Input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search airlines by name..."
                                aria-label="Search airlines"
                                className="h-14 rounded-2xl border-slate-200 bg-white pl-12 pr-4 text-base shadow-sm focus-visible:ring-primary"
                            />
                        </div>

                        <div className="mt-3 flex items-center justify-between px-1 text-sm text-slate-500">
                            <span>
                                {loading
                                    ? "Loading airlines..."
                                    : `${filteredCategories.length} airlines listed`}
                            </span>

                            <span className="hidden items-center gap-1 sm:flex">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                Check airline terms before making changes
                            </span>
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

                            <p className="mt-4 text-sm text-slate-500">
                                Loading airline categories...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div
                            role="alert"
                            className="rounded-2xl border border-red-200 bg-red-50 px-5 py-10 text-center"
                        >
                            <h3 className="text-lg font-bold text-red-800">
                                Unable to load airline categories
                            </h3>

                            <p className="mt-2 text-sm text-red-700">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="mt-4 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Dynamic Category Cards */}
                    {!loading &&
                        !error &&
                        filteredCategories.length > 0 && (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredCategories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/${policyRoute}/${toSlug(category.name)}`}
                                        className="group flex min-h-[88px] items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-5"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-primary transition-colors group-hover:bg-teal-700 group-hover:text-white">
                                            <Plane className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="break-words text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-primary sm:text-base">
                                                {category.name}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {config.cardDescription}
                                            </p>
                                        </div>

                                        <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700" />
                                    </Link>
                                ))}
                            </div>
                        )}

                    {/* Empty State */}
                    {!loading &&
                        !error &&
                        filteredCategories.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
                                <Search className="mx-auto h-8 w-8 text-slate-400" />

                                <h3 className="mt-4 text-lg font-bold text-slate-900">
                                    {search
                                        ? "No airlines found"
                                        : "No airline categories available"}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {search
                                        ? "Try searching with another airline name."
                                        : "Airline categories will appear here when they are added."}
                                </p>

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="mt-4 text-sm font-semibold text-primary hover:text-teal-900"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        )}

                    {/* Information Note */}
                    <div className="mt-10 flex gap-4 rounded-2xl border border-teal-100 bg-teal-50/70 p-5 sm:p-6">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                            <ShieldCheck className="h-6 w-6" />
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-900">
                                {config.infoTitle}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {config.infoDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
