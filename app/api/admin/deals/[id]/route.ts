import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import sanitizeHtml from "sanitize-html";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth.config";
type RouteContext = {
    params: Promise<{ id: string }>;
};

async function checkAdmin() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return null;
    }

    return session;
}

function sanitizeContent(content: string) {
    return sanitizeHtml(content, {
        allowedTags: [
            ...sanitizeHtml.defaults.allowedTags,
            "img",
            "h1",
            "h2",
            "h3",
            "u",
            "iframe",
        ],
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            a: ["href", "name", "target", "rel"],
            img: ["src", "alt", "title", "width", "height", "style"],
            p: ["style"],
            h1: ["style"],
            h2: ["style"],
            h3: ["style"],
            iframe: [
                "src",
                "width",
                "height",
                "frameborder",
                "allow",
                "allowfullscreen",
            ],
        },
        allowedSchemes: ["http", "https", "mailto"],
        transformTags: {
            a: sanitizeHtml.simpleTransform("a", {
                rel: "noopener noreferrer nofollow",
            }),
        },
    });
}

function cleanString(value: unknown): string | null {
    if (typeof value !== "string") return null;

    const trimmed = value.trim();
    return trimmed || null;
}

function cleanStringArray(value: unknown): string[] {
    const items = Array.isArray(value)
        ? value
        : typeof value === "string"
            ? value.split(",")
            : [];

    return items
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
}

function cleanFaqs(value: unknown) {
    if (!Array.isArray(value)) return [];

    return value
        .filter(
            (item): item is { question: string; answer: string } =>
                typeof item === "object" &&
                item !== null &&
                typeof item.question === "string" &&
                typeof item.answer === "string"
        )
        .map((item) => ({
            question: item.question.trim(),
            answer: item.answer.trim(),
        }))
        .filter((item) => item.question && item.answer);
}

// GET: Fetch a single deal
export async function GET(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const session = await checkAdmin();

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const { id } = await params;

        const deal = await prisma.deal.findUnique({
            where: { id },
        });

        if (!deal) {
            return NextResponse.json(
                { success: false, message: "Deal not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            deal,
        });
    } catch (error) {
        console.error("GET DEAL ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Failed to fetch deal." },
            { status: 500 }
        );
    }
}

// PATCH: Update an existing deal
export async function PATCH(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const session = await checkAdmin();

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();

        const existingDeal = await prisma.deal.findUnique({
            where: { id },
        });

        if (!existingDeal) {
            return NextResponse.json(
                { success: false, message: "Deal not found." },
                { status: 404 }
            );
        }

        const data: Prisma.DealUpdateInput = {};

        // Title
        if (body.title !== undefined) {
            if (typeof body.title !== "string" || !body.title.trim()) {
                return NextResponse.json(
                    { success: false, message: "Title is required." },
                    { status: 400 }
                );
            }

            data.title = body.title.trim();
        }

        // Slug
        if (body.slug !== undefined) {
            if (typeof body.slug !== "string" || !body.slug.trim()) {
                return NextResponse.json(
                    { success: false, message: "Slug is required." },
                    { status: 400 }
                );
            }

            const slug = body.slug
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

            if (!slug) {
                return NextResponse.json(
                    { success: false, message: "Please provide a valid slug." },
                    { status: 400 }
                );
            }

            const duplicateSlug = await prisma.deal.findFirst({
                where: {
                    slug,
                    NOT: { id },
                },
            });

            if (duplicateSlug) {
                return NextResponse.json(
                    { success: false, message: "This slug is already in use." },
                    { status: 409 }
                );
            }

            data.slug = slug;
        }

        // Excerpt
        if (body.excerpt !== undefined) {
            data.excerpt = cleanString(body.excerpt);
        }

        // Content
        if (body.content !== undefined) {
            if (typeof body.content !== "string" || !body.content.trim()) {
                return NextResponse.json(
                    { success: false, message: "Deal content is required." },
                    { status: 400 }
                );
            }

            data.content = sanitizeContent(body.content);
        }

// Featured Image
if (body.featuredImage !== undefined) {
    data.featuredImage = cleanString(body.featuredImage);
}

        // Tags
        if (body.tags !== undefined) {
            data.tags = cleanStringArray(body.tags);
        }

        // Deal type
        if (body.dealType !== undefined) {
            data.dealType = cleanString(body.dealType);
        }

        // FAQs
        if (body.faqs !== undefined) {
            const faqs = cleanFaqs(body.faqs);

            data.faqs = faqs.length > 0
                ? (faqs as Prisma.InputJsonValue)
                : null;
        }

        // SEO fields
        if (body.focusKeyword !== undefined) {
            data.focusKeyword = cleanString(body.focusKeyword);
        }

        if (body.metaTitle !== undefined) {
            data.metaTitle = cleanString(body.metaTitle);
        }

        if (body.metaDescription !== undefined) {
            data.metaDescription = cleanString(body.metaDescription);
        }

        if (body.metaKeywords !== undefined) {
            data.metaKeywords = cleanStringArray(body.metaKeywords);
        }

        if (body.canonicalUrl !== undefined) {
            data.canonicalUrl = cleanString(body.canonicalUrl);
        }

        // Featured status
        if (body.isFeatured !== undefined) {
            if (typeof body.isFeatured !== "boolean") {
                return NextResponse.json(
                    { success: false, message: "Invalid featured status." },
                    { status: 400 }
                );
            }

            data.isFeatured = body.isFeatured;
        }

        // Publish status
        if (body.status !== undefined) {
            if (!["DRAFT", "PUBLISHED"].includes(body.status)) {
                return NextResponse.json(
                    { success: false, message: "Invalid deal status." },
                    { status: 400 }
                );
            }

            data.status = body.status;

            if (body.status === "PUBLISHED") {
                data.publishedAt =
                    existingDeal.status === "PUBLISHED" && existingDeal.publishedAt
                        ? existingDeal.publishedAt
                        : new Date();
            } else {
                data.publishedAt = null;
            }
        }

        const updatedDeal = await prisma.deal.update({
            where: { id },
            data,
        });

        return NextResponse.json({
            success: true,
            message: "Deal updated successfully.",
            deal: updatedDeal,
        });
    } catch (error) {
        console.error("UPDATE DEAL ERROR:", error);

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return NextResponse.json(
                { success: false, message: "This slug is already in use." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Failed to update deal." },
            { status: 500 }
        );
    }
}

// DELETE: Delete a deal
export async function DELETE(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const session = await checkAdmin();

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const { id } = await params;

        const existingDeal = await prisma.deal.findUnique({
            where: { id },
        });

        if (!existingDeal) {
            return NextResponse.json(
                { success: false, message: "Deal not found." },
                { status: 404 }
            );
        }

        await prisma.deal.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Deal deleted successfully.",
        });
    } catch (error) {
        console.error("DELETE DEAL ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Failed to delete deal." },
            { status: 500 }
        );
    }
}