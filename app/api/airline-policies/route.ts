 import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

const validPolicyTypes = [
    "FLIGHT",
    "NAME",
    "CANCELLATION",
    "BAGGAGE",
] as const;

type PolicyType = (typeof validPolicyTypes)[number];

function isValidPolicyType(value: unknown): value is PolicyType {
    return (
        typeof value === "string" &&
        validPolicyTypes.includes(value as PolicyType)
    );
}

function isValidStatus(value: unknown): value is "DRAFT" | "PUBLISHED" {
    return value === "DRAFT" || value === "PUBLISHED";
}

function isValidObjectId(value: string) {
    return /^[a-f\d]{24}$/i.test(value);
}

function cleanKeywords(value: unknown): string[] {
    if (!Array.isArray(value)) return [];

    return value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
}

// GET: Fetch policies with optional filters.

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const status = searchParams.get("status");
        const categoryId = searchParams.get("categoryId");
        const policyType = searchParams.get("policyType");
        const search = searchParams.get("search")?.trim();

        if (policyType && !isValidPolicyType(policyType)) {
            return NextResponse.json(
                { error: "Invalid policy type." },
                { status: 400 }
            );
        }

        if (status && !["DRAFT", "PUBLISHED"].includes(status)) {
            return NextResponse.json(
                { error: "Invalid policy status." },
                { status: 400 }
            );
        }

        if (categoryId && !isValidObjectId(categoryId)) {
            return NextResponse.json(
                { error: "Invalid category ID." },
                { status: 400 }
            );
        }

        const policies = await prisma.airlinePolicy.findMany({
            where: {
                ...(status ? { status } : {}),
                ...(categoryId ? { categoryId } : {}),
                ...(policyType
                    ? { policyType: policyType as PolicyType }
                    : {}),
                ...(search
                    ? {
                          category: {
                              is: {
                                  name: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                          },
                      }
                    : {}),
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        return NextResponse.json({ policies });
    } catch (error) {
        console.error("Failed to fetch airline policies:", error);

        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2032"
        ) {
            return NextResponse.json(
                {
                    error:
                        "Some airline policy records contain invalid data. Repair the existing MongoDB documents and try again.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Failed to fetch airline policies." },
            { status: 500 }
        );
    }
}

// POST: Create a policy using categoryId and policyType.
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const categoryId =
            typeof body.categoryId === "string"
                ? body.categoryId.trim()
                : "";

        const policyType = body.policyType;
        const excerpt =
            typeof body.excerpt === "string"
                ? body.excerpt.trim()
                : "";

        const content =
            typeof body.content === "string"
                ? body.content.trim()
                : "";

        const metaTitle =
            typeof body.metaTitle === "string"
                ? body.metaTitle.trim()
                : "";

        const metaDescription =
            typeof body.metaDescription === "string"
                ? body.metaDescription.trim()
                : "";

        const metaKeywords = cleanKeywords(body.metaKeywords);

        const status =
            body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

        if (!categoryId || !isValidObjectId(categoryId)) {
            return NextResponse.json(
                { error: "Please select a valid airline category." },
                { status: 400 }
            );
        }

        if (!isValidPolicyType(policyType)) {
            return NextResponse.json(
                { error: "Please select a valid policy type." },
                { status: 400 }
            );
        }

        if (content.replace(/<[^>]*>/g, "").trim().length < 10) {
            return NextResponse.json(
                {
                    error:
                        "Article content must be at least 10 characters.",
                },
                { status: 400 }
            );
        }

        const category =
            await prisma.airlinePolicyCategory.findUnique({
                where: { id: categoryId },
                select: { id: true, name: true },
            });

        if (!category) {
            return NextResponse.json(
                { error: "The selected airline category does not exist." },
                { status: 404 }
            );
        }

        const policy = await prisma.airlinePolicy.create({
            data: {
                categoryId,
                policyType,
                excerpt: excerpt || null,
                content,
                metaTitle: metaTitle || null,
                metaDescription: metaDescription || null,
                metaKeywords,
                status,
                publishedAt:
                    status === "PUBLISHED" ? new Date() : null,
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json({ policy }, { status: 201 });
    } catch (error) {
        console.error("Failed to create airline policy:", error);

        return NextResponse.json(
            { error: "Failed to create airline policy." },
            { status: 500 }
        );
    }
}

// PATCH: Update an existing policy.
export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        const id = typeof body.id === "string" ? body.id.trim() : "";
        const categoryId =
            typeof body.categoryId === "string"
                ? body.categoryId.trim()
                : "";

        const policyType = body.policyType;
        const excerpt =
            typeof body.excerpt === "string"
                ? body.excerpt.trim()
                : "";

        const content =
            typeof body.content === "string"
                ? body.content.trim()
                : "";

        const metaTitle =
            typeof body.metaTitle === "string"
                ? body.metaTitle.trim()
                : "";

        const metaDescription =
            typeof body.metaDescription === "string"
                ? body.metaDescription.trim()
                : "";

        const metaKeywords = cleanKeywords(body.metaKeywords);
        const status = body.status;

        if (!id || !isValidObjectId(id)) {
            return NextResponse.json(
                { error: "A valid policy ID is required." },
                { status: 400 }
            );
        }

        if (!categoryId || !isValidObjectId(categoryId)) {
            return NextResponse.json(
                { error: "Please select a valid airline category." },
                { status: 400 }
            );
        }

        if (!isValidPolicyType(policyType)) {
            return NextResponse.json(
                { error: "Please select a valid policy type." },
                { status: 400 }
            );
        }

        if (!isValidStatus(status)) {
            return NextResponse.json(
                { error: "Please select a valid policy status." },
                { status: 400 }
            );
        }

        if (content.replace(/<[^>]*>/g, "").trim().length < 10) {
            return NextResponse.json(
                {
                    error:
                        "Article content must be at least 10 characters.",
                },
                { status: 400 }
            );
        }

        const existingPolicy =
            await prisma.airlinePolicy.findUnique({
                where: { id },
            });

        if (!existingPolicy) {
            return NextResponse.json(
                { error: "Airline policy not found." },
                { status: 404 }
            );
        }

        const category =
            await prisma.airlinePolicyCategory.findUnique({
                where: { id: categoryId },
                select: { id: true },
            });

        if (!category) {
            return NextResponse.json(
                { error: "Airline category not found." },
                { status: 404 }
            );
        }

        const policy = await prisma.airlinePolicy.update({
            where: { id },
            data: {
                categoryId,
                policyType,
                excerpt: excerpt || null,
                content,
                metaTitle: metaTitle || null,
                metaDescription: metaDescription || null,
                metaKeywords,
                status,
                publishedAt:
                    status === "PUBLISHED"
                        ? existingPolicy.publishedAt ?? new Date()
                        : null,
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json({ policy });
    } catch (error) {
        console.error("Failed to update airline policy:", error);

        return NextResponse.json(
            { error: "Failed to update airline policy." },
            { status: 500 }
        );
    }
}

// DELETE: Delete a policy by its database ID.
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id || !isValidObjectId(id)) {
            return NextResponse.json(
                { error: "A valid policy ID is required." },
                { status: 400 }
            );
        }

        const existingPolicy =
            await prisma.airlinePolicy.findUnique({
                where: { id },
                select: { id: true },
            });

        if (!existingPolicy) {
            return NextResponse.json(
                { error: "Airline policy not found." },
                { status: 404 }
            );
        }

        await prisma.airlinePolicy.delete({
            where: { id },
        });

        return NextResponse.json({
            message: "Airline policy deleted successfully.",
        });
    } catch (error) {
        console.error("Failed to delete airline policy:", error);

        return NextResponse.json(
            { error: "Failed to delete airline policy." },
            { status: 500 }
        );
    }
}
 