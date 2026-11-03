    import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import sanitizeHtml from "sanitize-html";

import { authOptions } from "@/lib/auth.config";
 import prisma from "@/lib/prisma";
import { destinationSchema } from "@/lib/flight-destination";

export const dynamic = "force-dynamic";

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session?.user?.email) {
        return false;
    }

    const adminEmails = [
        "admin@domestictravel.com",
    ];

    return adminEmails.includes(session.user.email);
}
type Context = {
    params: Promise<{ id: string }>;
};

export async function GET(
    request: NextRequest,
    { params }: Context
) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        if (!/^[a-f\d]{24}$/i.test(id)) {
            return NextResponse.json(
                { message: "Invalid ID" },
                { status: 400 }
            );
        }

        const destination = await prisma.flightDestination.findUnique({
            where: { id },
        });

        if (!destination) {
            return NextResponse.json(
                { message: "Destination not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            destination,
        });
    } catch (error) {
        console.error("GET FLIGHT DESTINATION ERROR:", error);

        return NextResponse.json(
            { message: "Failed to fetch destination" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: Context
) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        if (!/^[a-f\d]{24}$/i.test(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }

        const parsed = destinationSchema.safeParse(await request.json());

        if (!parsed.success) {
            return NextResponse.json({
                message: "Invalid data",
                errors: parsed.error.flatten(),
            }, { status: 400 });
        }

        const data = parsed.data;

        const existing = await prisma.flightDestination.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        const duplicate = await prisma.flightDestination.findFirst({
            where: {
                slug: data.slug,
                NOT: { id },
            },
        });

        if (duplicate) {
            return NextResponse.json({ message: "Slug already exists" }, { status: 409 });
        }

        const content = sanitizeHtml(data.content, {
            allowedTags: [
                "p", "h1", "h2", "h3", "h4",
                "strong", "b", "em", "i", "u",
                "ul", "ol", "li", "blockquote",
                "a", "br", "hr", "pre", "code", "s", "del",
            ],
            allowedAttributes: { a: ["href", "target", "rel"] },
            allowedSchemes: ["http", "https", "mailto"],
        });

        const destination = await prisma.flightDestination.update({
            where: { id },
            data: {
                ...data,
                content,
                airportCode: data.airportCode || null,
                heroImage: data.heroImage || null,
                excerpt: data.excerpt || null,
                focusKeyword: data.focusKeyword || null,
                metaTitle: data.metaTitle || null,
                metaDescription: data.metaDescription || null,
                sections: data.sections as Prisma.InputJsonValue,
                relatedFlights: data.relatedFlights as Prisma.InputJsonValue,
                faqs: data.faqs as Prisma.InputJsonValue,
                publishedAt: data.status === "PUBLISHED"
                    ? existing.publishedAt || new Date()
                    : null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Destination updated successfully",
            destination,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to update destination" }, { status: 500 });
    }
}

 

 

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Use the same admin authorization check as your existing
    // POST and PUT APIs here.

    const { id } = await params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid destination ID" },
        { status: 400 }
      );
    }

    const destination = await prisma.flightDestination.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
      },
    });

    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Flight destination not found" },
        { status: 404 }
      );
    }

    await prisma.flightDestination.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `${destination.title} deleted successfully`,
    });
  } catch (error) {
    console.error("DELETE FLIGHT DESTINATION ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete flight destination" },
      { status: 500 }
    );
  }
}

 