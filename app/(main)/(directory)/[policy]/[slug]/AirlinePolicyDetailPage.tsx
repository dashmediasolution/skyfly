
import Link from "next/link";
import {
    ArrowLeft,
    ChevronRight,
    FileText,
    Plane,
    ShieldCheck,
} from "lucide-react";

import type { PolicyType } from "@/lib/detail-airline-policy-cache";

import type {
    getAirlinePolicyDetail,
    getRelatedAirlinePolicies,
} from "@/lib/detail-airline-policy-cache";

type DetailResult = NonNullable<
    Awaited<ReturnType<typeof getAirlinePolicyDetail>>
>;

type AirlinePolicyDetailProps = {
    airline: DetailResult["airline"];
    policy: NonNullable<DetailResult["policy"]>;
    relatedPolicies: Awaited<
        ReturnType<typeof getRelatedAirlinePolicies>
    >;
    policyType: PolicyType;
    policyRoute: string;
};

type FAQ = {
    question: string;
    answer: string;
};

const policyLabels: Record<PolicyType, string> = {
    FLIGHT: "Flight Change Policy",
    NAME: "Name Change Policy",
    CANCELLATION: "Cancellation Policy",
    BAGGAGE: "Baggage Policy",
};

const policyRoutes: Record<PolicyType, string> = {
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

function isValidFAQ(value: unknown): value is FAQ {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    if (!("question" in value) || !("answer" in value)) {
        return false;
    }

    return (
        typeof value.question === "string" &&
        typeof value.answer === "string" &&
        value.question.trim().length > 0 &&
        value.answer.trim().length > 0
    );
}

export default function AirlinePolicyDetailPage({
    airline,
    policy,
    relatedPolicies,
    policyType,
    policyRoute,
}: AirlinePolicyDetailProps) {
    const policyLabel = policyLabels[policyType];
    const pageTitle = `${airline.name} ${policyLabel}`;

    const validFaqs: FAQ[] = Array.isArray(policy.faqs)
        ? policy.faqs.filter(isValidFAQ)
        : [];

    const faqJsonLd =
        validFaqs.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: validFaqs.map((faq) => ({
                      "@type": "Question",
                      name: faq.question.trim(),
                      acceptedAnswer: {
                          "@type": "Answer",
                          text: faq.answer.trim(),
                      },
                  })),
              }
            : null;

    return (
        <main className="min-h-screen bg-slate-50">
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

                    <h1 className="mt-5 w-full text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                        {pageTitle}
                    </h1>

                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
                        <span className="inline-flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-teal-300" />
                            {airline.name}
                        </span>
                    </div>
                </div>
            </section>

            {/* Policy content */}
            <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
                    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
                        <div
                            className="policy-content break-words text-[15px] leading-8 text-slate-700"
                            dangerouslySetInnerHTML={{
                                __html: policy.content || "",
                            }}
                        />

                        <style>{`
                            .policy-content h1 {
                                margin-top: 2rem;
                                margin-bottom: 1rem;
                                font-size: 1.75rem;
                                line-height: 1.3;
                                font-weight: 800;
                                color: #0f172a;
                            }

                            .policy-content h2 {
                                margin-top: 2rem;
                                margin-bottom: 0.85rem;
                                font-size: 1.4rem;
                                line-height: 1.4;
                                font-weight: 750;
                                color: #0f172a;
                            }

                            .policy-content h3 {
                                margin-top: 1.5rem;
                                margin-bottom: 0.75rem;
                                font-size: 1.15rem;
                                line-height: 1.5;
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .policy-content p {
                                margin-bottom: 1rem;
                            }

                            .policy-content ul {
                                margin: 1rem 0;
                                padding-left: 1.5rem;
                                list-style: disc;
                            }

                            .policy-content ol {
                                margin: 1rem 0;
                                padding-left: 1.5rem;
                                list-style: decimal;
                            }

                            .policy-content li {
                                margin-bottom: 0.5rem;
                                padding-left: 0.25rem;
                            }

                            .policy-content a {
                                color: #0f766e;
                                text-decoration: underline;
                                overflow-wrap: anywhere;
                            }

                            .policy-content strong,
                            .policy-content b {
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .policy-content table {
                                width: 100%;
                                margin: 1.5rem 0;
                                border-collapse: collapse;
                                display: block;
                                overflow-x: auto;
                            }

                            .policy-content th,
                            .policy-content td {
                                border: 1px solid #e2e8f0;
                                padding: 0.75rem;
                                text-align: left;
                                vertical-align: top;
                            }

                            .policy-content th {
                                background: #f8fafc;
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .policy-content blockquote {
                                margin: 1.5rem 0;
                                border-left: 4px solid #0f766e;
                                padding: 0.75rem 1rem;
                                background: #f0fdfa;
                            }

                            .policy-content img {
                                max-width: 100%;
                                height: auto;
                                border-radius: 0.75rem;
                            }

                            .policy-content hr {
                                margin: 2rem 0;
                                border-color: #e2e8f0;
                            }
                        `}</style>

                        {/* FAQs */}
                        {validFaqs.length > 0 && (
                            <section
                                className="mt-10 border-t border-slate-200 pt-8"
                                aria-labelledby="policy-faq-heading"
                            >
                                <div className="mb-6">
                                    <h2
                                        id="policy-faq-heading"
                                        className="text-2xl font-bold tracking-tight text-slate-900"
                                    >
                                        Frequently Asked Questions
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        Common questions about the{" "}
                                        {airline.name}{" "}
                                        {policyLabel.toLowerCase()}.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {validFaqs.map((faq, index) => (
                                        <details
                                            key={`${faq.question}-${index}`}
                                            className="group rounded-xl border border-slate-200 bg-white transition-colors open:border-[#538440]/40 open:bg-[#EAF2E6]/40"
                                        >
                                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 marker:hidden sm:p-5">
                                                <h3 className="text-sm font-semibold leading-6 text-slate-800 sm:text-base">
                                                    {faq.question}
                                                </h3>

                                                <ChevronRight className="h-5 w-5 shrink-0 text-[#538440] transition-transform group-open:rotate-90" />
                                            </summary>

                                            <div className="px-4 pb-5 sm:px-5">
                                                <p className="text-sm leading-7 text-slate-600">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Disclaimer */}
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
                    <aside className="w-full space-y-3 lg:sticky lg:top-28 lg:w-[260px] lg:shrink-0">
                        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                            <div className="border-b border-slate-100 bg-gradient-to-br from-[#538440]/10 via-white to-white px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-sm">
                                        <FileText className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                                            {policyLabel} guides
                                        </h2>

                                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                                            Airline Policies
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm leading-5 text-slate-600">
                                    Explore {policyLabel.toLowerCase()}{" "}
                                    information for other airlines.
                                </p>
                            </div>

                            <div className="p-3">
                                <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Explore airlines
                                </h3>

                                <div className="space-y-1">
                                    {relatedPolicies.length > 0 ? (
                                        relatedPolicies.map((item) => {
                                            const airlineName =
                                                item.category?.name;

                                            if (!airlineName) {
                                                return null;
                                            }

                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={`/${policyRoutes[policyType]}/${toSlug(airlineName)}`}
                                                    className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-200 hover:border-[#538440]/20 hover:bg-[#538440]/5"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-[#538440]/10 group-hover:text-[var(--primary)]">
                                                        <FileText className="h-4 w-4" />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-bold text-slate-800 transition-colors group-hover:text-[var(--primary)]">
                                                            {airlineName}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate-500">
                                                            {policyLabel}
                                                        </p>
                                                    </div>

                                                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-slate-200 px-3 py-5 text-center">
                                            <FileText className="mx-auto h-6 w-6 text-slate-300" />

                                            <p className="mt-2 text-sm font-bold text-slate-700">
                                                No policies available
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                Other airline policies will
                                                appear here when available.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/${policyRoute}`}
                            className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-[#538440]/30 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-[#538440]/10 group-hover:text-[var(--primary)]">
                                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-slate-800">
                                        Browse all airlines
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        View all {policyLabel.toLowerCase()}{" "}
                                        pages
                                    </p>
                                </div>
                            </div>

                            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-[var(--primary)]" />
                        </Link>
                    </aside>
                </div>
            </section>
        </main>
    );
}
