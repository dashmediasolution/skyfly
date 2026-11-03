import { z } from "zod";

export const destinationSchema = z.object({
    title: z.string().min(3, "Title is required"),
    slug: z.string().min(3, "Slug is required"),
    destination: z.string().min(2),
    country: z.string().min(2),
    airportCode: z.string().optional().nullable(),
    excerpt: z.string().optional().default(""),
    content: z.string().min(1, "Content is required"),
    heroImage: z.string().optional().nullable(),

    sections: z.array(
        z.object({
            id: z.string(),
            heading: z.string(),
            description: z.string(),
        })
    ).default([]),

    relatedFlights: z.array(
        z.object({
            id: z.string(),
            from: z.string(),
            to: z.string(),
            offer: z.string().optional().default(""),
            image: z.string().optional().default(""),
            href: z.string().optional().default(""),
        })
    ).default([]),

    faqs: z.array(
        z.object({
            id: z.string(),
            question: z.string(),
            answer: z.string(),
        })
    ).default([]),

    focusKeyword: z.string().optional().default(""),
    metaTitle: z.string().optional().default(""),
    metaDescription: z.string().optional().default(""),
    metaKeywords: z.array(z.string()).default([]),
    status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type DestinationFormData = z.infer<typeof destinationSchema>;