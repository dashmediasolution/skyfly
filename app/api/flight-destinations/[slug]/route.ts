import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 300;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const destination = await prisma.flightDestination.findFirst({
            where: {
                slug,
                status: "PUBLISHED",
            },
        });

        if (!destination) {
            return NextResponse.json(
                { message: "Destination not found" },
                { status: 404 }
            );
        }

        // Fetch related published flights
        const relatedFlights = await prisma.flightDestination.findMany({
            where: {
                status: "PUBLISHED",
                id: {
                    not: destination.id,
                },
                // Add your related-flight condition here if required
            },
            select: {
                id: true,
                slug: true,
                destination: true,
            },
            take: 5,
            orderBy: {
                destination: "asc",
            },
        });

        return NextResponse.json({
            success: true,
            destination,
            relatedFlights,
        });

    } catch (error) {
        console.error("Fetch destination error:", error);

        return NextResponse.json(
            { message: "Failed to fetch destination" },
            { status: 500 }
        );
    }
}