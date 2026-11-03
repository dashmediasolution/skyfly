import { NextResponse } from "next/server";
 import prisma from "@/lib/prisma";

export const revalidate = 300;

export async function GET() {
    try {
        const destinations = await prisma.flightDestination.findMany({
            where: { status: "PUBLISHED" },
            select: {
                id: true,
                title: true,
                slug: true,
                destination: true,
                country: true,
                airportCode: true,
                excerpt: true,
                heroImage: true,
                publishedAt: true,
            },
            orderBy: { publishedAt: "desc" },
        });

        return NextResponse.json({ success: true, destinations });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch destinations" },
            { status: 500 }
        );
    }
}