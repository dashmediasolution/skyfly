
import type { Metadata } from "next";
import AirlinePolicyDirectoryPage from "./AirlinePolicyDirectoryPage";

const SITE_URL = "https://skyflywithus.com";

const policyMetadata: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "flight-change": {
    title: "Flight Change Policies by Airline | SkyFlyWithUs",
    description:
      "Explore airline flight change policies, ticket conditions, change fees, and rebooking requirements. Review applicable rules before changing your flight.",
    keywords: [
      "flight change policy",
      "airline flight change policies",
      "flight rescheduling policy",
      "flight change fees",
      "airline ticket change rules",
      "flight rebooking",
      "SkyFlyWithUs",
    ],
  },

  "name-change": {
    title: "Airline Name Change and Correction Policies | SkyFlyWithUs",
    description:
      "Find airline name correction policies, passenger name spelling rules, ticket requirements, and applicable fees before requesting a correction.",
    keywords: [
      "airline name change policy",
      "flight ticket name correction",
      "passenger name correction",
      "airline name correction rules",
      "flight ticket spelling mistake",
      "name correction fees",
      "SkyFlyWithUs",
    ],
  },

  cancellation: {
    title: "Airline Cancellation and Refund Policies | SkyFlyWithUs",
    description:
      "Explore airline cancellation and refund policies, ticket refund conditions, cancellation fees, and fare rules before cancelling your flight.",
    keywords: [
      "airline cancellation policy",
      "flight cancellation policy",
      "airline refund policy",
      "flight cancellation fees",
      "flight refund rules",
      "ticket refund conditions",
      "SkyFlyWithUs",
    ],
  },

  baggage: {
    title: "Airline Baggage Allowance and Policies | SkyFlyWithUs",
    description:
      "Check airline baggage policies, cabin baggage allowances, checked luggage limits, weight restrictions, and applicable excess baggage fees.",
    keywords: [
      "airline baggage policy",
      "baggage allowance",
      "cabin baggage allowance",
      "checked baggage limits",
      "airline luggage restrictions",
      "excess baggage fees",
      "SkyFlyWithUs",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ policy: string }>;
}): Promise<Metadata> {
  const { policy } = await params;
  const slug = policy.toLowerCase();
  const metadata = policyMetadata[slug];

  if (!metadata) {
    return {
      title: "Policy Directory Not Found | SkyFlyWithUs",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = `${SITE_URL}/${slug}`;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: canonicalUrl,
      siteName: "SkyFlyWithUs",
      type: "website",
    },

    twitter: {
      card: "summary",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default function Page() {
  return <AirlinePolicyDirectoryPage />;
}
