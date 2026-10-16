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
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" as const },
];

const categories = [
  "cancellation-and-refund",
  "change-flight",
  "compensation",
  "seat-upgrade",
  "voucher",
  "lost-and-found",
  "check-in",
  "airport",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((slug) => ({
    url: `${BASE_URL}/blog/category/${slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogs = await prisma.blog.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/articles/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...blogRoutes];
}