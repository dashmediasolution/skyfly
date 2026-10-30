
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, blogs] = await Promise.all([
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
  ]);

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/blog/category/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...blogRoutes];
}
