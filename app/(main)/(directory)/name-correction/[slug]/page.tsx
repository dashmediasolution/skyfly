
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileText,
  Info,
  Landmark,
  ListChecks,
  MessageCircle,
  Plane,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

type PolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type AirlinePolicy = {
  name: string;
  code: string;
  intro: string;
  summary: string;
  sections: PolicySection[];
  faqs: { question: string; answer: string }[];
};

const airlinePolicies: Record<string, AirlinePolicy> = {
  "aerolineas-argentinas": {
    name: "Aerolineas Argentinas",
    code: "AR",
    intro:
      "Understand the process for correcting a passenger name on an Aerolineas Argentinas ticket, including documentation, correction requests, and important ticket restrictions.",
    summary:
      "The name on your ticket should match your government-issued identification. Whether a correction is permitted depends on the type of error, your ticket conditions, and the airline's current rules.",
    sections: [
      {
        id: "policy-overview",
        title: "Aerolineas Argentinas Name Correction Policy",
        paragraphs: [
          "Aerolineas Argentinas passengers should check their ticket details against their passport or other applicable travel identification as soon as possible after receiving their confirmation.",
          "Minor spelling errors and other corrections may be considered by the airline. Approval, supporting documents, applicable charges, and processing time depend on the circumstances and fare conditions.",
          "Correcting a passenger's existing name is different from transferring a ticket to another person. Do not assume that a ticket can be transferred or that a correction will be approved automatically.",
        ],
      },
      {
        id: "eligible-corrections",
        title: "What Types of Name Corrections May Be Requested?",
        paragraphs: [
          "Contact the airline to determine whether your particular request qualifies as a correction. The airline may ask for documents to establish the passenger's correct legal name.",
        ],
        bullets: [
          "Minor spelling mistakes or typographical errors",
          "Missing or incorrectly entered middle names or initials",
          "Name discrepancies involving a legal name change",
          "Differences between ticket details and government-issued identification",
        ],
      },
      {
        id: "online-process",
        title: "How to Request a Name Correction Online",
        paragraphs: [
          "Start with the airline's official website and its booking-management options. If the requested correction is not available online, contact customer support for guidance.",
        ],
        bullets: [
          "Open the airline's official website.",
          "Locate your reservation using the requested booking information.",
          "Review the passenger name against the relevant identification document.",
          "Check whether an online correction option is available.",
          "Submit any requested supporting documents and review any applicable fee before confirming.",
          "Check your updated itinerary or ticket confirmation before travelling.",
        ],
      },
      {
        id: "offline-process",
        title: "Requesting a Correction Through Customer Support",
        paragraphs: [
          "If you cannot make the correction online, contact Aerolineas Argentinas through its official customer support channels. Explain the exact discrepancy and ask whether it can be corrected on your existing ticket.",
          "Keep your booking reference, ticket number, and relevant identification available. If your ticket was issued by a travel agency, contact the issuing agency as well, since it may need to handle the request.",
        ],
      },
      {
        id: "documents",
        title: "Documents You May Need",
        paragraphs: [
          "Documentation requirements depend on the correction requested and the passenger's circumstances. Confirm the exact requirements with the airline before sending personal documents.",
        ],
        bullets: [
          "Booking confirmation or reservation reference",
          "E-ticket number, if requested",
          "Valid passport or other applicable government-issued identification",
          "Marriage certificate or other legal name-change document, where relevant",
          "Additional documentation specifically requested by the airline",
        ],
      },
      {
        id: "fees",
        title: "Name Correction Fees and Processing Time",
        paragraphs: [
          "There is no single fee or processing time that can be guaranteed for every Aerolineas Argentinas name-correction request. The amount and eligibility may depend on the ticket, route, point of sale, correction type, and applicable fare conditions.",
          "Ask the airline or issuing travel agency to confirm the total charge, whether the existing ticket can be retained, and how long processing is expected to take before proceeding.",
        ],
      },
      {
        id: "important-tips",
        title: "Important Things to Check Before Travelling",
        paragraphs: [
          "Resolve name discrepancies as early as possible, particularly for international travel. Do not assume that airport staff will be able to correct a ticket at check-in.",
        ],
        bullets: [
          "Check the full passenger name immediately after ticket issuance.",
          "Use the name shown on the identification required for your journey.",
          "Ask whether the correction requires ticket reissuance.",
          "Confirm any fee and processing deadline before approving the request.",
          "Keep the updated confirmation and relevant supporting documents accessible.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Can I correct a spelling mistake on an Aerolineas Argentinas ticket?",
        answer:
          "A minor spelling correction may be considered, but approval depends on the circumstances and ticket conditions. Contact the airline promptly and provide the correct name and any requested identification.",
      },
      {
        question:
          "Can I change the passenger name to another person's name?",
        answer:
          "A name correction should not be treated as a passenger transfer. Ask Aerolineas Argentinas whether your request is permitted under its current ticket rules before making any changes.",
      },
      {
        question:
          "Will I have to pay a name correction fee?",
        answer:
          "Charges depend on the type of request and applicable ticket conditions. Ask the airline or issuing agency for the exact amount before authorizing the correction.",
      },
      {
        question:
          "What documents are required for a name correction?",
        answer:
          "You may need your booking reference, ticket number, and valid identification. Legal name changes can require additional supporting documents. Confirm the exact requirements with the airline.",
      },
      {
        question:
          "What if I booked through a travel agency?",
        answer:
          "Contact the agency that issued your ticket and ask whether it must submit the correction request. The airline may direct agency-issued bookings back to the issuing agent.",
      },
      {
        question:
          "How early should I request a correction?",
        answer:
          "Request it as soon as you discover the discrepancy. Processing times vary, so ask the airline about the applicable deadline and obtain confirmation before travelling.",
      },
    ],
  },
};

function formatAirlineName(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = airlinePolicies[slug];
  const airlineName = policy?.name ?? formatAirlineName(slug);

  return {
    title: `${airlineName} Name Correction Policy`,
    description: `Learn about ${airlineName} name correction requests, required documents, applicable fees, and ticket requirements.`,
    alternates: {
      canonical: `/name-correction/${slug}`,
    },
  };
}

export default async function AirlineNameCorrectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = airlinePolicies[slug];
  const airlineName = policy?.name ?? formatAirlineName(slug);

  const sections = policy?.sections ?? [
    {
      id: "policy-overview",
      title: `${airlineName} Name Correction Policy`,
      paragraphs: [
        `Review ${airlineName}'s current ticket conditions and contact the airline directly to establish whether your name discrepancy can be corrected.`,
        "The permitted correction types, required documents, charges, and processing deadlines must be confirmed with the airline. Do not assume that another airline's rules apply.",
      ],
    },
    {
      id: "correction-process",
      title: "How to Request a Name Correction",
      paragraphs: [
        "Contact the airline through its official website or customer support channel. If your ticket was issued through a travel agency, contact the issuing agency as well.",
      ],
      bullets: [
        "Locate your booking confirmation and ticket number.",
        "Compare the ticket name with your travel identification.",
        "Explain the exact error and ask which corrections are permitted.",
        "Confirm required documents, fees, and deadlines.",
        "Check the updated ticket before travelling.",
      ],
    },
    {
      id: "documents",
      title: "Documents You May Need",
      paragraphs: [
        "Requirements depend on the airline and the type of correction. Confirm which documents are necessary before submitting personal information.",
      ],
      bullets: [
        "Booking confirmation",
        "E-ticket number, if requested",
        "Valid government-issued identification",
        "Supporting legal documents, where applicable",
      ],
    },
  ];

  const faqs = policy?.faqs ?? [
    {
      question: `How do I correct my name on a ${airlineName} ticket?`,
      answer:
        "Contact the airline through its official website or customer support. Explain the discrepancy and ask about the permitted correction process.",
    },
    {
      question: "Are name correction fees applicable?",
      answer:
        "Fees depend on the airline, ticket conditions, and type of correction. Confirm the total charge directly with the airline.",
    },
    {
      question: "Which documents may be required?",
      answer:
        "You may need your booking reference, ticket number, and valid identification. Additional documents may be required for legal name changes.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#073452]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(21,155,156,0.35),transparent_55%)]" />
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-16 h-56 w-56 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-300"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/name-correction"
              className="transition hover:text-white"
            >
              Name Correction
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">{airlineName}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-teal-100 backdrop-blur">
              <FileCheck2 className="h-4 w-4" />
              Airline Policy Guide
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {airlineName}
              <span className="mt-2 block text-teal-300">
                Name Correction Policy
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              {policy?.intro ??
                `Understand how to request a name correction on a ${airlineName} ticket, including the process, documents, and important ticket conditions.`}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#correction-process"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#159b9c] px-5 text-sm font-bold text-white transition hover:bg-[#117f80]"
              >
                View correction process
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#frequently-asked-questions"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Read FAQs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: UserRoundCheck,
              title: "Passenger identity",
              text: "Check your ticket against the required travel ID.",
            },
            {
              icon: FileText,
              title: "Required documents",
              text: "Prepare your reservation details and supporting ID.",
            },
            {
              icon: Clock3,
              title: "Act promptly",
              text: "Ask about deadlines before your departure.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-[#117f80]">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-[#159b9c]" />
                <h2 className="font-bold text-slate-900">
                  On this page
                </h2>
              </div>

              <nav aria-label="Policy sections" className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2.5 text-sm leading-5 text-slate-600 transition hover:bg-teal-50 hover:text-teal-800"
                  >
                    {section.title}
                  </a>
                ))}
                <a
                  href="#frequently-asked-questions"
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-teal-50 hover:text-teal-800"
                >
                  Frequently asked questions
                </a>
              </nav>
            </div>

            <div className="mt-4 rounded-2xl bg-[#073452] p-5 text-white">
              <MessageCircle className="mb-3 h-6 w-6 text-teal-300" />
              <h3 className="font-bold">Need clarification?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Confirm your specific ticket conditions with the airline
                or the travel agency that issued your ticket.
              </p>
            </div>
          </aside>

          {/* Article */}
          <article className="min-w-0 space-y-6">
            <section
              id="overview"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#117f80]">
                  <Plane className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Overview
                </h2>
              </div>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                {policy?.summary ??
                  `Name correction rules for ${airlineName} depend on its current policies and the conditions of your ticket. Verify eligibility and applicable requirements with the airline before requesting an update.`}
              </p>
            </section>

            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
              >
                <h2 className="text-xl font-extrabold leading-snug text-slate-900 sm:text-2xl">
                  {section.title}
                </h2>

                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm leading-7 text-slate-600 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#159b9c]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Important note */}
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              <div>
                <h2 className="font-bold text-amber-950">
                  Important policy notice
                </h2>
                <p className="mt-2 text-sm leading-6 text-amber-900/80">
                  This guide provides general information, not a guarantee
                  that a correction will be approved or free of charge.
                  Airline rules and ticket conditions can change. Verify
                  the current requirements directly with the airline
                  before making a decision.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <section
              id="frequently-asked-questions"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#117f80]">
                  <CircleHelp className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Answers to common name-correction questions.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                      <span className="text-sm leading-6 sm:text-base">
                        {faq.question}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-open:rotate-90 group-open:bg-teal-50 group-open:text-teal-800">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </summary>
                    <p className="pt-3 pr-8 text-sm leading-7 text-slate-600 sm:text-base">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <Link
              href="/name-correction"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#117f80] transition hover:text-[#073452]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all airline policies
            </Link>
          </article>
        </div>
      </div>
    </main>
  );
}
