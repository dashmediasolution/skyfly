
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import sanitizeHtml from "sanitize-html";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth.config";

export const dynamic = "force-dynamic";

async function checkAdmin() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return null;
    }

    return session;
}

// GET: Fetch all deals
export async function GET() {
    try {
        const session = await checkAdmin();

        if (!session) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const deals = await prisma.deal.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            deals,
        });
    } catch (error) {
        console.error("GET DEALS ERROR:", error);

        return NextResponse.json(
            { success: false, error: "Failed to fetch deals." },
            { status: 500 }
        );
    }
}

// POST: Create a new deal
export async function POST(request: NextRequest) {
    try {
        const session = await checkAdmin();

        if (!session) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const {
            title,
            slug,
            excerpt,
            content,
            featuredImage,
            tags,
            dealType,
            faqs,
            focusKeyword,
            metaTitle,
            metaDescription,
            metaKeywords,
            canonicalUrl,
            status,
            isFeatured,
        } = body;

        // Required fields
        if (!title?.trim() || !slug?.trim() || !content?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Title, slug and content are required.",
                },
                { status: 400 }
            );
        }

        // Validate status
        const validStatuses = ["DRAFT", "PUBLISHED"];

        if (status && !validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, error: "Invalid deal status." },
                { status: 400 }
            );
        }

        // Normalize slug
        const cleanSlug = slug
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        if (!cleanSlug) {
            return NextResponse.json(
                { success: false, error: "Invalid slug." },
                { status: 400 }
            );
        }

        // Check duplicate slug
        const existingDeal = await prisma.deal.findUnique({
            where: {
                slug: cleanSlug,
            },
            select: {
                id: true,
            },
        });

        if (existingDeal) {
            return NextResponse.json(
                { success: false, error: "This slug already exists." },
                { status: 409 }
            );
        }

        // Sanitize rich text content
        const cleanContent = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                "img",
                "h1",
                "h2",
                "h3",
                "u",
                "iframe",
            ]),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                a: ["href", "name", "target", "rel"],
                img: ["src", "alt", "title", "width", "height", "style"],
                p: ["style"],
                h1: ["style"],
                h2: ["style"],
                h3: ["style"],
                iframe: ["src", "width", "height", "allow", "allowfullscreen"],
            },
            allowedSchemes: ["http", "https", "mailto"],
            transformTags: {
                a: sanitizeHtml.simpleTransform("a", {
                    rel: "noopener noreferrer nofollow",
                }),
            },
        });

        const cleanTitle = title.trim();
        const cleanStatus = status || "DRAFT";

        // Validate and normalize arrays
        const cleanTags = Array.isArray(tags)
            ? tags
                .filter((tag: unknown): tag is string => typeof tag === "string")
                .map((tag: string) => tag.trim())
                .filter(Boolean)
            : [];

        const cleanMetaKeywords = Array.isArray(metaKeywords)
            ? metaKeywords
                .filter(
                    (keyword: unknown): keyword is string =>
                        typeof keyword === "string"
                )
                .map((keyword: string) => keyword.trim())
                .filter(Boolean)
            : [];

        const cleanFaqs = Array.isArray(faqs)
            ? faqs
                .filter(
                    (faq: any) =>
                        typeof faq.question === "string" &&
                        typeof faq.answer === "string" &&
                        faq.question.trim() &&
                        faq.answer.trim()
                )
                .map((faq: any) => ({
                    question: faq.question.trim(),
                    answer: faq.answer.trim(),
                }))
            : [];

        // Create deal
        const deal = await prisma.deal.create({
            data: {
                title: cleanTitle,
                slug: cleanSlug,
                excerpt:
                    typeof excerpt === "string" ? excerpt.trim() : null,
                content: cleanContent,
                featuredImage:
                    typeof featuredImage === "string" ? featuredImage.trim() : null,
                tags: cleanTags,
                dealType:
                    typeof dealType === "string" && dealType.trim()
                        ? dealType.trim()
                        : null,
                faqs: cleanFaqs.length
                    ? (cleanFaqs as Prisma.InputJsonValue)
                    : null,
                focusKeyword: focusKeyword?.trim() || null,
                metaTitle: metaTitle?.trim() || null,
                metaDescription: metaDescription?.trim() || null,
                metaKeywords: cleanMetaKeywords,
                canonicalUrl: canonicalUrl?.trim() || null,
                status: cleanStatus,
                isFeatured: Boolean(isFeatured),
                publishedAt:
                    cleanStatus === "PUBLISHED" ? new Date() : null,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Deal created successfully.",
                deal,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CREATE DEAL ERROR:", error);

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return NextResponse.json(
                { success: false, error: "This slug already exists." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: "Failed to create deal." },
            { status: 500 }
        );
    }
}
