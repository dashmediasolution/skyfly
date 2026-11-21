import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const groupTravels = await prisma.groupTravel.findMany({
            where: {
                status: "PUBLISHED",
            },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                featuredImage: true,
                tags: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            groupTravels,
        });
    } catch (error) {
        console.error("FETCH GROUP TRAVEL ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch group travel pages.",
            },
            { status: 500 }
        );
    }
}