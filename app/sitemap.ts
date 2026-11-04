
import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const BASE_URL = "https://skyflywithus.com";

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/flights", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/hotels", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/car-rental", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/deals", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/group-travel", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about-us", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact-us", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" as const },
];

const policyTypeRoutes: Record<string, string> = {
  FLIGHT: "flight-change",
  NAME: "name-correction",
  CANCELLATION: "cancellation-and-refund",
  BAGGAGE: "baggage",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    categories,
    blogs,
    destinations,
    deals,
    airlinePolicies,
  ] = await Promise.all([
    prisma.blogCategory.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    }),

    prisma.blog.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    }),

    prisma.flightDestination.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    }),

    prisma.deal.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    }),

    prisma.airlinePolicy.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        policyType: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    }),
  ]);

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog category URLs
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${BASE_URL}/blog/category/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  // Blog detail URLs
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Flight destination URLs
  const destinationRoutes: MetadataRoute.Sitemap = destinations.map(
    (destination) => ({
      url: `${BASE_URL}/flights/${destination.slug}`,
      lastModified: destination.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Travel deal URLs
  const dealRoutes: MetadataRoute.Sitemap = deals.map((deal) => ({
    url: `${BASE_URL}/deals/${deal.slug}`,
    lastModified: deal.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Airline policy URLs
  // URL format: /policy-type/airline-name
  const airlinePolicyRoutes: MetadataRoute.Sitemap =
    airlinePolicies.map((policy) => {
      const type = policy.policyType.toUpperCase();

      const policySlug =
        policyTypeRoutes[type] || slugify(type);

      const airlineSlug = slugify(policy.category.name);

      return {
        url: `${BASE_URL}/${policySlug}/${airlineSlug}`,
        lastModified: policy.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      };
    });

  // Remove duplicate URLs
  const allRoutes = [
    ...routes,
    ...categoryRoutes,
    ...blogRoutes,
    ...destinationRoutes,
    ...dealRoutes,
    ...airlinePolicyRoutes,
  ];

  return Array.from(
    new Map(allRoutes.map((route) => [route.url, route])).values()
  );
}
