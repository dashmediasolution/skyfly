
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import sanitizeHtml from "sanitize-html";

import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { destinationSchema } from "@/lib/flight-destination";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "admin@domestictravel.com";

async function checkAdmin() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return null;
    }

    const email = session.user.email.toLowerCase();

    if (email !== ADMIN_EMAIL) {
        return null;
    }

    return { email };
}

function sanitizeContent(content: string) {
    return sanitizeHtml(content, {
        allowedTags: [
            "p", "h1", "h2", "h3", "h4",
            "strong", "b", "em", "i", "u",
            "ul", "ol", "li", "blockquote",
            "a", "br", "hr", "pre", "code",
            "s", "del",
            "table", "thead", "tbody", "tr", "th", "td",
        ],
        allowedAttributes: {
            a: ["href", "target", "rel"],
            th: ["colspan", "rowspan"],
            td: ["colspan", "rowspan"],
        },
        allowedSchemes: ["http", "https", "mailto"],
    });
}

// GET ALL DESTINATIONS
export async function GET() {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const destinations = await prisma.flightDestination.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            destinations,
        });
    } catch (error) {
        console.error("GET FLIGHT DESTINATIONS ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Failed to fetch destinations" },
            { status: 500 }
        );
    }
}

// CREATE DESTINATION
export async function POST(request: NextRequest) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const parsed = destinationSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid data",
                    errors: parsed.error.flatten(),
                },
                { status: 400 }
            );
        }

        const data = parsed.data;

        const existing = await prisma.flightDestination.findUnique({
            where: {
                slug: data.slug,
            },
            select: {
                id: true,
            },
        });

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Slug already exists",
                },
                { status: 409 }
            );
        }

        const content = sanitizeContent(data.content);

        const destination = await prisma.flightDestination.create({
            data: {
                ...data,
                content,
                airportCode: data.airportCode || null,
                heroImage: data.heroImage || null,
                excerpt: data.excerpt || null,
                focusKeyword: data.focusKeyword || null,
                metaTitle: data.metaTitle || null,
                metaDescription: data.metaDescription || null,
                metaKeywords: data.metaKeywords || [],

                sections: data.sections as Prisma.InputJsonValue,
                relatedFlights: data.relatedFlights as Prisma.InputJsonValue,
                faqs: data.faqs as Prisma.InputJsonValue,

                publishedAt:
                    data.status === "PUBLISHED"
                        ? new Date()
                        : null,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Destination created successfully",
                destination,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CREATE FLIGHT DESTINATION ERROR:", error);

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "A destination with this slug already exists",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create flight destination",
            },
            { status: 500 }
        );
    }
}
