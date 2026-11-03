import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const deals = await prisma.deal.findMany({
            where: {
                status: "PUBLISHED",
            },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                featuredImage: true,
                dealType: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(
            {
                success: true,
                deals,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store",
                },
            }
        );
    } catch (error) {
        console.error("PUBLIC DEALS API ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch deals.",
            },
            { status: 500 }
        );
    }
}