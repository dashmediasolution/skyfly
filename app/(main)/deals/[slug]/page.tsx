
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Headset,
  Phone,
  Plane,
  ShieldCheck,
  Tag,
} from "lucide-react";

import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import FlightFAQ from "@/components/FlightFAQ";
import sanitizeHtml from "sanitize-html";
const SITE_URL = "https://skyflywithus.com";

type DealPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type DealFAQ = {
  question: string;
  answer: string;
};

// Remove HTML tags from content for metadata and structured data.
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

// Use excerpt first, then fall back to content.
function getDealDescription(deal: {
  excerpt: string | null;
  content: string | null;
}) {
  const description = deal.excerpt?.trim() || deal.content || "";

  return description;
}
function getSafeHtml(value: string | null | undefined) {
  if (!value) return "";

  return sanitizeHtml(value, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "span",
      "div",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "nofollow noopener noreferrer",
      }),
    },
  });
}
// Validate FAQ JSON from MongoDB.
function getSafeFaqs(value: unknown): DealFAQ[] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is DealFAQ => {
    return (
      item !== null &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      typeof item.question === "string" &&
      item.question.trim().length > 0 &&
      typeof item.answer === "string" &&
      item.answer.trim().length > 0
    );
  });
}

// Fetch published deal by slug.
async function getDealBySlug(slug: string) {
  return prisma.deal.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });
}

// Dynamic SEO metadata.
export async function generateMetadata({
  params,
}: DealPageProps): Promise<Metadata> {
  const { slug } = await params;

  const deal = await getDealBySlug(slug);

  if (!deal) {
    return {
      title: "Travel Deals | SkyFlyWithUs",
      description:
        "Explore flight offers, seasonal discounts, and travel deals with SkyFlyWithUs.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const description = getDealDescription(deal);

  const title =
    deal.metaTitle?.trim() || `${deal.title} | SkyFlyWithUs`;

  const metaDescription =
    deal.metaDescription?.trim() ||
    (description.length > 155
      ? `${description.slice(0, 152).trimEnd()}...`
      : description) ||
    "Explore travel offers and deals with SkyFlyWithUs.";

  const canonicalUrl =
    deal.canonicalUrl?.trim() ||
    `${SITE_URL}/deals/${deal.slug}`;

  const image = deal.featuredImage;

  return {
    title,
    description: metaDescription,

    alternates: {
      canonical: canonicalUrl,
    },

    ...(deal.metaKeywords
      ? {
        keywords: deal.metaKeywords,
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
              alt: deal.title,
            },
          ],
        }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,

      ...(image
        ? {
          images: [image],
        }
        : {}),
    },
  };
}

export default async function DealDetailPage({
  params,
}: DealPageProps) {
  const { slug } = await params;

  const deal = await getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  // Fetch other published deals for sidebar.
  const otherDeals = await prisma.deal.findMany({
    where: {
      status: "PUBLISHED",
      slug: {
        not: deal.slug,
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

  const description = getDealDescription(deal);
  const category = deal.dealType || "Travel Deal";

  // FAQs from MongoDB.
  const faqs = getSafeFaqs(deal.faqs);

  // FAQ JSON-LD structured data.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: getPlainText(faq.answer),
      },
    })),
  };

 

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative isolate flex min-h-[310px] w-full items-center overflow-hidden sm:min-h-[360px] lg:min-h-[430px]">
        <Image
          src={`${deal?.featuredImage}`}
          alt={`${deal?.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8F0]/95 via-[#F4F8F0]/55 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFD2] px-3 py-1.5 text-xs font-bold tracking-wide text-[#315F2A]">
              TRAVEL DEALS
            </span>

            <h1 className="mt-4 text-xl font-extrabold leading-tight tracking-tight text-[#123C32] sm:text-5xl lg:text-4xl">
            {deal?.title}
            </h1>
 

         
          </div>
        </div>
      </section>

      {/* Main Content and Sidebar */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 pb-12 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-12 lg:pt-12">
        {/* Main Information */}
        <div className="min-w-0 space-y-7">
          {/* Introduction */}
          <section className="flex items-start gap-3 sm:gap-4">
          

            <div className="min-w-0 flex-1">
              


              <div
                className="
    deal-content
    
    text-base
    leading-7
    
    [&_h1]:mb-4
    [&_h1]:mt-6
    [&_h1]:text-2xl
    [&_h1]:font-bold
    [&_h1]:text-[#123C32]
    [&_h2]:mb-3
    [&_h2]:mt-6
    [&_h2]:text-xl
    [&_h2]:font-bold
    [&_h2]:text-[#123C32]
    [&_h3]:mb-2
    [&_h3]:mt-5
    [&_h3]:text-lg
    [&_h3]:font-semibold
    [&_h3]:text-[#123C32]
    [&_p]:mb-4
    [&_ul]:mb-4
    [&_ul]:ml-5
    [&_ul]:list-disc
    [&_ol]:mb-4
    [&_ol]:ml-5
    [&_ol]:list-decimal
    [&_li]:mb-2
    [&_a]:font-medium
    [&_a]:text-[#538440]
    [&_a]:underline
    [&_strong]:font-bold
    [&_blockquote]:my-4
    [&_blockquote]:border-l-4
    [&_blockquote]:border-[#538440]
    [&_blockquote]:pl-4
  "
                dangerouslySetInnerHTML={{
                  __html: getSafeHtml(description),
                }}
              />


            </div>
          </section>




        </div>

        {/* Right Sidebar */}
        <aside className="space-y-5">
          {/* Assistance Card */}
          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-5 text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#538440] text-white">
              <Headset size={22} />
            </div>

            <h2 className="mt-3 text-base font-bold leading-5 text-[#538440]">
              Need Help Planning Your Trip?
            </h2>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              Get assistance reviewing available travel options and
              understanding the conditions that apply to your journey.
            </p>

            <a
              href="tel:+18555093791"
              className="mt-4 inline-flex items-center justify-center gap-2 text-lg font-semibold text-gray-700 transition hover:text-[#538440]"
            >
              <Phone size={16} />
              <span>1-855-509-3791</span>
            </a>

            <a
              href="tel:+18555093791"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#538440] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
            >
              <Phone size={14} />
              Call for Assistance
            </a>
          </div>

          {/* Popular Deals */}
          <div className="rounded-xl border border-[#538440]/30 bg-[#F0F6EC] p-3">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <Tag size={15} className="text-[#538440]" />
                More Travel Deals
              </h2>

              <Link
                href="/deals"
                className="flex items-center gap-1 text-xs text-[#538440] hover:underline"
              >
                View All
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-2">
              {otherDeals.map((item) => (
                <Link
                  key={item.id}
                  href={`/deals/${item.slug}`}
                  className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-2 transition hover:border-[#538440]/50 hover:shadow-sm"
                >
                  <div className="relative h-12 w-[78px] shrink-0 overflow-hidden rounded-md">
                    {item.featuredImage ? (
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        sizes="78px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#EAF2E6]">
                        <Tag size={18} className="text-[#538440]" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-semibold text-[#538440]">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500">
                      Explore travel options
                    </p>
                  </div>

                  <ArrowRight
                    size={14}
                    className="shrink-0 text-[#538440]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Frequently Asked Questions */}
      {faqs.length > 0 && (
        <>
          <FlightFAQ
            destinationSlug={deal.slug}
            destinationName={deal.title}
            faqs={faqs}
          />

          {/* FAQ JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
            }}
          />
        </>
      )}
    </main>
  );
}
