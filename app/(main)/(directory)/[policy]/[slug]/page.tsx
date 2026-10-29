
import type { Metadata } from "next";
import AirlinePolicyDetailPage from "./AirlinePolicyDetailPage";

const SITE_URL = "https://skyflywithus.com";

const policyConfig: Record<
  string,
  {
    type: string;
    label: string;
  }
> = {
  "flight-change": {
    type: "FLIGHT",
    label: "Flight Change Policy",
  },
  "name-change": {
    type: "NAME",
    label: "Name Change Policy",
  },
  cancellation: {
    type: "CANCELLATION",
    label: "Cancellation Policy",
  },
  baggage: {
    type: "BAGGAGE",
    label: "Baggage Policy",
  },
};

type PageProps = {
  params: Promise<{
    policy: string;
    slug: string;
  }>;
};

type AirlineCategory = {
  id: string;
  name: string;
};

type AirlinePolicy = {
  id: string;
  airlineName: string;
  slug: string;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string[] | null;
  status: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { policy, slug } = await params;

  const policyRoute = policy.toLowerCase();
  const airlineSlug = slug.toLowerCase();
  const config = policyConfig[policyRoute];

  if (!config) {
    return {
      title: "Policy Not Found | SkyFlyWithUs",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl =
    `${SITE_URL}/${policyRoute}/${airlineSlug}`;

  const fallbackTitle =
    `${airlineSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} ${config.label} | SkyFlyWithUs`;

  const fallbackDescription =
    `Read airline-specific ${config.label.toLowerCase()} information, applicable ticket conditions, and important travel requirements. Check the airline's current rules before making changes to your booking.`;

  try {
    const categoriesResponse = await fetch(
      `${SITE_URL}/api/airline-policy-categories`,
      {
        cache: "no-store",
      }
    );

    if (!categoriesResponse.ok) {
      throw new Error("Unable to fetch airline categories");
    }

    const categoriesData = await categoriesResponse.json();

    const categories: AirlineCategory[] =
      categoriesData.categories ?? [];

    const airline = categories.find(
      (category) => toSlug(category.name) === airlineSlug
    );

    if (!airline) {
      return {
        title: fallbackTitle,
        description: fallbackDescription,
        alternates: {
          canonical: canonicalUrl,
        },
      };
    }

    const query = new URLSearchParams({
      categoryId: airline.id,
      policyType: config.type,
      status: "PUBLISHED",
    });

    const policyResponse = await fetch(
      `${SITE_URL}/api/airline-policies?${query.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!policyResponse.ok) {
      throw new Error("Unable to fetch airline policy");
    }

    const policyData = await policyResponse.json();

    const policies: AirlinePolicy[] =
      policyData.policies ?? [];

    const airlinePolicy = policies.find(
      (item) =>
        item.categoryId === airline.id &&
        item.status === "PUBLISHED"
    );

    if (!airlinePolicy) {
      return {
        title: fallbackTitle,
        description: fallbackDescription,
        alternates: {
          canonical: canonicalUrl,
        },
      };
    }

    const title =
      airlinePolicy.metaTitle?.trim() || fallbackTitle;

    const description =
      airlinePolicy.metaDescription?.trim() ||
      airlinePolicy.excerpt?.trim() ||
      fallbackDescription;

    const keywords =
      airlinePolicy.metaKeywords?.filter(
        (keyword) => keyword.trim().length > 0
      ) ?? [];

    return {
      title,
      description,
      ...(keywords.length > 0 ? { keywords } : {}),

      alternates: {
        canonical: canonicalUrl,
      },

      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "SkyFlyWithUs",
        type: "article",
      },

      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  } catch {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }
}

export default function Page() {
  return <AirlinePolicyDetailPage />;
}
