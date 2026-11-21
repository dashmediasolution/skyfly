import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

export const dynamic = "force-dynamic";

// Check Admin
async function checkAdmin() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return null;
    }

    return session;
}

// Clean string
function cleanString(value: unknown): string | null {
    if (typeof value !== "string") {
        return null;
    }

    return value.trim() || null;
}

// Clean string array
function cleanStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
}

// Clean FAQs
function cleanFaqs(value: unknown) {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .filter(
            (faq: any) =>
                faq &&
                typeof faq.question === "string" &&
                typeof faq.answer === "string" &&
                faq.question.trim() &&
                faq.answer.trim()
        )
        .map((faq: any) => ({
            question: faq.question.trim(),
            answer: faq.answer.trim(),
        }));
}

// Sanitize rich text content
function sanitizeContent(content: string) {
    return sanitizeHtml(content, {
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
            iframe: [
                "src",
                "width",
                "height",
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

// GET: Fetch all group travel pages
export async function GET() {
    try {
        const session = await checkAdmin();

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const groupTravels = await prisma.groupTravel.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            groupTravels,
        });
    } catch (error) {
        console.error("GET GROUP TRAVEL ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch group travel pages.",
            },
            { status: 500 }
        );
    }
}

// POST: Create a new group travel page
export async function POST(request: NextRequest) {
    try {
        const session = await checkAdmin();

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
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
            faqs,
            focusKeyword,
            metaTitle,
            metaDescription,
            metaKeywords,
            canonicalUrl,
            status,
            isFeatured,
        } = body;

        // Validate required fields
        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof slug !== "string" ||
            !slug.trim() ||
            typeof content !== "string" ||
            !content.trim()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Title, slug and content are required.",
                },
                { status: 400 }
            );
        }

        // Validate status
        const validStatuses = [
            "DRAFT",
            "PUBLISHED",
            "ARCHIVED",
        ];

        if (
            status !== undefined &&
            !validStatuses.includes(status)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid group travel status.",
                },
                { status: 400 }
            );
        }

        // Validate isFeatured
        if (
            isFeatured !== undefined &&
            typeof isFeatured !== "boolean"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "isFeatured must be a boolean.",
                },
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
                {
                    success: false,
                    error: "Invalid slug.",
                },
                { status: 400 }
            );
        }

        // Check duplicate slug
        const existingGroupTravel = await prisma.groupTravel.findUnique({
            where: {
                slug: cleanSlug,
            },
            select: {
                id: true,
            },
        });

        if (existingGroupTravel) {
            return NextResponse.json(
                {
                    success: false,
                    error: "This slug already exists.",
                },
                { status: 409 }
            );
        }

        // Sanitize content
        const cleanContent = sanitizeContent(content);

        // Normalize status
        const cleanStatus = status || "DRAFT";

        // Clean FAQs
        const cleanFaqList = cleanFaqs(faqs);

        // Create group travel page
        const groupTravel = await prisma.groupTravel.create({
            data: {
                title: title.trim(),
                slug: cleanSlug,

                excerpt: cleanString(excerpt),

                content: cleanContent,

                featuredImage: cleanString(featuredImage),

                tags: cleanStringArray(tags),

                faqs: cleanFaqList.length
                    ? (cleanFaqList as Prisma.InputJsonValue)
                    : null,

                focusKeyword: cleanString(focusKeyword),

                metaTitle: cleanString(metaTitle),

                metaDescription: cleanString(metaDescription),

                metaKeywords: cleanStringArray(metaKeywords),

                canonicalUrl: cleanString(canonicalUrl),

                status: cleanStatus,

                isFeatured: isFeatured ?? false,

                publishedAt:
                    cleanStatus === "PUBLISHED"
                        ? new Date()
                        : null,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Group travel page created successfully.",
                groupTravel,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CREATE GROUP TRAVEL ERROR:", error);

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "This slug already exists.",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: "Failed to create group travel page.",
            },
            { status: 500 }
        );
    }
}