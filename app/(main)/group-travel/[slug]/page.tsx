
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    ArrowRight,
    ChevronRight,
    FileText,
    Headset,
    Phone,
    ShieldCheck,
    Users,
} from "lucide-react";

import prisma from "@/lib/prisma";
import FlightFAQ from "@/components/FlightFAQ";
import sanitizeHtml from "sanitize-html";

const SITE_URL = "https://skyflywithus.com";
const SUPPORT_PHONE = "1-855-509-3791";
const SUPPORT_PHONE_LINK = "tel:+18555093791";

type GroupTravelPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

type GroupTravelFAQ = {
    question: string;
    answer: string;
};

// Convert rich HTML content into plain text.
function getPlainText(value: string | null | undefined) {
    if (!value) return "";

    return value
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

// Generate page description.
function getGroupTravelDescription(groupTravel: {
    excerpt: string | null;
    content: string | null;
}) {
    return groupTravel.excerpt?.trim() || groupTravel.content || "";
}

// Sanitize HTML content before rendering.
function getSafeHtml(value: string | null | undefined) {
    if (!value) return "";

    return sanitizeHtml(value, {
        allowedTags: [
            "h1", "h2", "h3", "h4", "h5", "h6",
            "p", "br", "hr",
            "strong", "b", "em", "i", "u", "s",
            "ul", "ol", "li",
            "a", "blockquote", "span", "div",
            "table", "thead", "tbody", "tfoot",
            "tr", "th", "td", "caption",
            "colgroup", "col",
            "sub", "sup",
        ],

        allowedAttributes: {
            a: ["href", "target", "rel"],
            table: [
                "class",
                "style",
                "border",
                "cellpadding",
                "cellspacing",
                "width",
            ],
            th: [
                "class",
                "style",
                "colspan",
                "rowspan",
                "scope",
                "width",
            ],
            td: [
                "class",
                "style",
                "colspan",
                "rowspan",
                "width",
            ],
            col: ["span", "width", "style"],
            "*": ["class", "style"],
        },

        allowedStyles: {
            "*": {
                border: [/^[\w\s#(),.%/-]+$/],
                "border-width": [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem)$/,
                ],
                "border-style": [
                    /^(solid|dashed|dotted|none|double)$/,
                ],
                "border-color": [
                    /^#[0-9a-fA-F]{3,8}$/,
                    /^rgb\(.+\)$/,
                    /^rgba\(.+\)$/,
                ],
                "border-collapse": [
                    /^(collapse|separate)$/,
                ],
                "border-spacing": [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem)$/,
                ],
                width: [
                    /^\d+(?:\.\d+)?(?:px|%|em|rem)$/,
                ],
                "min-width": [
                    /^\d+(?:\.\d+)?(?:px|%|em|rem)$/,
                ],
                "vertical-align": [
                    /^(top|middle|bottom)$/,
                ],
                color: [
                    /^#[0-9a-fA-F]{3,8}$/,
                    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
                    /^rgba\(.+\)$/,
                ],
                "background-color": [
                    /^#[0-9a-fA-F]{3,8}$/,
                    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
                    /^rgba\(.+\)$/,
                ],
                "font-size": [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/,
                ],
                "font-weight": [
                    /^(normal|bold|[1-9]00)$/,
                ],
                "font-style": [
                    /^(normal|italic|oblique)$/,
                ],
                "text-align": [
                    /^(left|right|center|justify)$/,
                ],
                "text-decoration": [
                    /^(none|underline|line-through)$/,
                ],
                padding: [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/,
                ],
                "padding-top": [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/,
                ],
                "padding-bottom": [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/,
                ],
                "padding-left": [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/,
                ],
                "padding-right": [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/,
                ],
                margin: [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/,
                ],
                "border-radius": [
                    /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/,
                ],
            },
        },

        allowedSchemes: ["http", "https", "mailto", "tel"],

        transformTags: {
            a: sanitizeHtml.simpleTransform("a", {
                rel: "nofollow noopener noreferrer",
            }),
        },
    });
}

// Validate FAQ data from MongoDB.
function getSafeFaqs(value: unknown): GroupTravelFAQ[] {
    if (!Array.isArray(value)) return [];

    return value.filter((item): item is GroupTravelFAQ => {
        return (
            item !== null &&
            typeof item === "object" &&
            !Array.isArray(item) &&
            "question" in item &&
            "answer" in item &&
            typeof item.question === "string" &&
            item.question.trim().length > 0 &&
            typeof item.answer === "string" &&
            item.answer.trim().length > 0
        );
    });
}

// Fetch published Group Travel page.
async function getGroupTravelBySlug(slug: string) {
    return prisma.groupTravel.findFirst({
        where: {
            slug,
            status: "PUBLISHED",
        },
    });
}

// Generate SEO metadata.
export async function generateMetadata({
    params,
}: GroupTravelPageProps): Promise<Metadata> {
    const { slug } = await params;

    const groupTravel = await getGroupTravelBySlug(slug);

    if (!groupTravel) {
        return {
            title: "Group Travel | SkyFlyWithUs",
            description:
                "Explore group travel options and plan your next journey with SkyFlyWithUs.",
            robots: {
                index: false,
                follow: true,
            },
        };
    }

    const description = getGroupTravelDescription(groupTravel);
    const plainText = getPlainText(description);

    const title =
        groupTravel.metaTitle?.trim() ||
        `${groupTravel.title} | SkyFlyWithUs`;

    const metaDescription =
        groupTravel.metaDescription?.trim() ||
        (plainText.length > 155
            ? `${plainText.slice(0, 152).trimEnd()}...`
            : plainText) ||
        "Explore group travel options with SkyFlyWithUs.";

    const canonicalUrl =
        groupTravel.canonicalUrl?.trim() ||
        `${SITE_URL}/group-travel/${groupTravel.slug}`;

    const image = groupTravel.featuredImage;

    return {
        title,
        description: metaDescription,

        alternates: {
            canonical: canonicalUrl,
        },

        ...(groupTravel.metaKeywords?.length
            ? {
                keywords: groupTravel.metaKeywords,
            }
            : {}),

        openGraph: {
            title,
            description: metaDescription,
            url: canonicalUrl,
            siteName: "SkyFlyWithUs",
            type: "website",

            ...(image
                ? {
                    images: [
                        {
                            url: image,
                            alt: groupTravel.title,
                        },
                    ],
                }
                : {}),
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,

            ...(image
                ? {
                    images: [image],
                }
                : {}),
        },
    };
}

export default async function GroupTravelDetailPage({
    params,
}: GroupTravelPageProps) {
    const { slug } = await params;

    const groupTravel = await getGroupTravelBySlug(slug);

    if (!groupTravel) {
        notFound();
    }

    // Fetch other published Group Travel pages.
    const otherGroupTravels = await prisma.groupTravel.findMany({
        where: {
            status: "PUBLISHED",
            slug: {
                not: groupTravel.slug,
            },
        },
        orderBy: [
            {
                isFeatured: "desc",
            },
            {
                publishedAt: "desc",
            },
            {
                createdAt: "desc",
            },
        ],
        take: 4,
        select: {
            id: true,
            title: true,
            slug: true,
            featuredImage: true,
        },
    });

    const faqs = getSafeFaqs(groupTravel.faqs);

    // FAQ structured data.
    const faqJsonLd =
        faqs.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: getPlainText(faq.question),
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: getPlainText(faq.answer),
                    },
                })),
            }
            : null;

    // Breadcrumb structured data.
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Group Travel",
                item: `${SITE_URL}/group-travel`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: groupTravel.title,
                item: `${SITE_URL}/group-travel/${groupTravel.slug}`,
            },
        ],
    };

    return (
        <main className="min-h-screen overflow-hidden bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />

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

            {/* Hero Banner */}
            <section className="relative w-full overflow-hidden bg-white">
                {groupTravel.featuredImage ? (
                    <div className="relative aspect-[16/9] w-full sm:aspect-[21/7] lg:aspect-[1440/430]">
                        <Image
                            src={groupTravel.featuredImage}
                            alt={groupTravel.title}
                            fill
                            priority
                            sizes="100vw"
                            className="object-contain sm:object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex min-h-[220px] items-center justify-center px-5 py-12 sm:min-h-[320px]">
                        <h1 className="text-center text-3xl font-bold text-[#123C32] sm:text-4xl">
                            {groupTravel.title}
                        </h1>
                    </div>
                )}
            </section>

            {/* Breadcrumb */}
            <div className="border-b border-slate-200 bg-white">
                <nav
                    aria-label="Breadcrumb"
                    className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-8 lg:px-12"
                >
                    <Link href="/" className="transition hover:text-[#538440]">
                        Home
                    </Link>

                    <ChevronRight size={14} />

                    <Link
                        href="/group-travel"
                        className="transition hover:text-[#538440]"
                    >
                        Group Travel
                    </Link>

                    <ChevronRight size={14} />

                    <span className="font-semibold text-[#538440]">
                        {groupTravel.title}
                    </span>
                </nav>
            </div>

            {/* Main Content and Sidebar */}
            <section className="px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">

                    {/* Main Article */}
                    <article className="min-w-0   p-5   sm:p-8 lg:p-10">

                        {/* Article Header */}
                        <div className="mb-6 border-b border-slate-100 pb-6">
                            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#538440]">
                                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF2E6] px-3 py-1.5">
                                    <Users size={14} />
                                    Group Travel
                                </span>

                                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-slate-500">
                                    <ShieldCheck size={14} />
                                    Travel Information
                                </span>
                            </div>

                            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                                {groupTravel.title}
                            </h1>

                            {groupTravel.excerpt && (
                                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                    {groupTravel.excerpt}
                                </p>
                            )}
                        </div>

                        {/* Tags */}
                        {groupTravel.tags.length > 0 && (
                            <div className="mb-7 flex flex-wrap gap-2">
                                {groupTravel.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-[#DCE9D6] bg-[#F0F6EC] px-3 py-1.5 text-xs font-medium text-[#3F6632]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Dynamic HTML Content */}
                        <div
                            className="group-travel-content break-words text-[15px] leading-8 text-slate-700"
                            dangerouslySetInnerHTML={{
                                __html: getSafeHtml(groupTravel.content),
                            }}
                        />

                        {/* Responsive Content Styling */}
                        <style>{`
                            .group-travel-content {
                                width: 100%;
                                min-width: 0;
                                overflow-wrap: anywhere;
                                word-break: normal;
                            }

                            .group-travel-content h1 {
                                margin-top: 2rem;
                                margin-bottom: 1rem;
                                font-size: 1.75rem;
                                line-height: 1.3;
                                font-weight: 800;
                                color: #0f172a;
                            }

                            .group-travel-content h2 {
                                margin-top: 2rem;
                                margin-bottom: 0.85rem;
                                font-size: 1.4rem;
                                line-height: 1.4;
                                font-weight: 750;
                                color: #0f172a;
                            }

                            .group-travel-content h3 {
                                margin-top: 1.5rem;
                                margin-bottom: 0.75rem;
                                font-size: 1.15rem;
                                line-height: 1.5;
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .group-travel-content h4,
                            .group-travel-content h5,
                            .group-travel-content h6 {
                                margin-top: 1.25rem;
                                margin-bottom: 0.65rem;
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .group-travel-content p {
                                margin-bottom: 1rem;
                            }

                            .group-travel-content ul {
                                margin: 1rem 0;
                                padding-left: 1.5rem;
                                list-style: disc;
                            }

                            .group-travel-content ol {
                                margin: 1rem 0;
                                padding-left: 1.5rem;
                                list-style: decimal;
                            }

                            .group-travel-content li {
                                margin-bottom: 0.5rem;
                                padding-left: 0.25rem;
                            }

                            .group-travel-content a {
                                color: #538440;
                                text-decoration: underline;
                                overflow-wrap: anywhere;
                            }

                            .group-travel-content strong,
                            .group-travel-content b {
                                font-weight: 700;
                                color: #0f172a;
                            }

                            .group-travel-content blockquote {
                                margin: 1.5rem 0;
                                border-left: 4px solid #538440;
                                padding: 0.75rem 1rem;
                                background: #F0F6EC;
                                border-radius: 0 0.75rem 0.75rem 0;
                            }

                            .group-travel-content img {
                                display: block;
                                max-width: 100%;
                                height: auto;
                                margin: 1.5rem auto;
                                border-radius: 0.75rem;
                            }

                            .group-travel-content hr {
                                margin: 2rem 0;
                                border-color: #e2e8f0;
                            }

                            .group-travel-content table {
                                display: block;
                                width: 100%;
                                max-width: 100%;
                                margin: 1.5rem 0;
                                overflow-x: auto;
                                border-collapse: collapse;
                                border: 1px solid #e2e8f0;
                                -webkit-overflow-scrolling: touch;
                            }

                            .group-travel-content thead,
                            .group-travel-content tbody,
                            .group-travel-content tfoot {
                                width: 100%;
                            }

                            .group-travel-content th,
                            .group-travel-content td {
                                min-width: 110px;
                                border: 1px solid #e2e8f0;
                                padding: 0.75rem;
                                text-align: left;
                                vertical-align: top;
                                font-size: 14px;
                                line-height: 1.6;
                            }

                            .group-travel-content th {
                                background: #F0F6EC;
                                font-weight: 700;
                                color: #3F6632;
                            }

                            .group-travel-content tr:nth-child(even) td {
                                background: #fafafa;
                            }

                            .group-travel-content caption {
                                margin-bottom: 0.5rem;
                                text-align: left;
                                font-weight: 700;
                                color: #0f172a;
                            }

                            @media (max-width: 640px) {
                                .group-travel-content {
                                    font-size: 14px;
                                    line-height: 1.8;
                                }

                                .group-travel-content h1 {
                                    font-size: 1.5rem;
                                }

                                .group-travel-content h2 {
                                    font-size: 1.25rem;
                                }

                                .group-travel-content h3 {
                                    font-size: 1.1rem;
                                }

                                .group-travel-content table {
                                    margin-left: 0;
                                    margin-right: 0;
                                    font-size: 12px;
                                }

                                .group-travel-content th,
                                .group-travel-content td {
                                    min-width: 120px;
                                    padding: 0.6rem;
                                    font-size: 12px;
                                }
                            }
                        `}</style>

                       
                    </article>

                    {/* Sidebar */}
                    <aside className="min-w-0 w-full space-y-4 lg:sticky lg:top-28">

                        {/* Assistance Card */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="bg-gradient-to-br from-[#538440]/15 via-[#EAF2E6] to-white px-5 py-5 text-center">
                                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#538440] text-white shadow-sm">
                                    <Headset size={23} />
                                </div>

                                <h2 className="mt-3 text-lg font-extrabold leading-6 text-slate-900">
                                    Need Help Planning Group Travel?
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Get assistance discussing your group
                                    size, travel requirements, and available
                                    options.
                                </p>

                                <a
                                    href={SUPPORT_PHONE_LINK}
                                    className="mt-4 inline-flex items-center justify-center gap-2 text-lg font-bold text-[#538440] transition hover:text-[#3F6632]"
                                >
                                    <Phone size={17} />
                                    {SUPPORT_PHONE}
                                </a>

                                <a
                                    href={SUPPORT_PHONE_LINK}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#538440] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#3F6632]"
                                >
                                    <Phone size={15} />
                                    Call for Assistance
                                </a>
                            </div>
                        </div>

                        {/* Related Group Travel */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 bg-[#F0F6EC] px-4 py-4">
                                <div className="flex items-center justify-between gap-2">
                                    <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                                        <Users
                                            size={17}
                                            className="text-[#538440]"
                                        />
                                        More Group Travel
                                    </h2>

                                    <Link
                                        href="/group-travel"
                                        className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#538440] hover:underline"
                                    >
                                        View All
                                        <ArrowRight size={13} />
                                    </Link>
                                </div>

                                <p className="mt-1 text-xs text-slate-500">
                                    Explore other group travel guides.
                                </p>
                            </div>

                            <div className="space-y-1 p-3">
                                {otherGroupTravels.length > 0 ? (
                                    otherGroupTravels.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/group-travel/${item.slug}`}
                                            className="group flex min-w-0 items-center gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-200 hover:border-[#538440]/20 hover:bg-[#538440]/5"
                                        >
                                            <div className="relative h-12 w-[76px] shrink-0 overflow-hidden rounded-lg bg-[#EAF2E6]">
                                                {item.featuredImage ? (
                                                    <Image
                                                        src={item.featuredImage}
                                                        alt={item.title}
                                                        fill
                                                        sizes="76px"
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Users
                                                            size={19}
                                                            className="text-[#538440]"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition-colors group-hover:text-[#538440]">
                                                    {item.title}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Group Travel Guide
                                                </p>
                                            </div>

                                            <ChevronRight
                                                size={17}
                                                className="shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-[#538440]"
                                            />
                                        </Link>
                                    ))
                                ) : (
                                    <div className="rounded-xl border border-dashed border-slate-200 px-3 py-6 text-center">
                                        <FileText className="mx-auto h-6 w-6 text-slate-300" />

                                        <p className="mt-2 text-sm font-bold text-slate-700">
                                            No guides available
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Other Group Travel pages will
                                            appear here when available.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Browse All */}
                        <Link
                            href="/group-travel"
                            className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-[#538440]/30 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2E6] text-[#538440]">
                                    <ArrowRight size={17} />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-slate-800">
                                        Browse All Group Travel
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Explore all available guides
                                    </p>
                                </div>
                            </div>

                            <ChevronRight
                                size={17}
                                className="shrink-0 text-slate-400 transition-colors group-hover:text-[#538440]"
                            />
                        </Link>
                    </aside>
                </div>
            </section>

            {/* FAQs */}
            {faqs.length > 0 && (
                <section className="bg-white py-8 sm:py-12">
                    <FlightFAQ
                        destinationSlug={groupTravel.slug}
                        destinationName={groupTravel.title}
                        faqs={faqs}
                    />
                </section>
            )}
        </main>
    );
}
