import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

const validPolicyTypes = ["FLIGHT", "NAME", "CANCELLATION", "BAGGAGE"] as const;
type PolicyType = (typeof validPolicyTypes)[number];
type PolicyStatus = "DRAFT" | "PUBLISHED";
type PolicyFAQ = { question: string; answer: string };

function isValidPolicyType(value: unknown): value is PolicyType {
    return typeof value === "string" && validPolicyTypes.includes(value as PolicyType);
}

function isValidStatus(value: unknown): value is PolicyStatus {
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

function parseFaqs(value: unknown): { faqs: PolicyFAQ[]; error?: string } {
    if (value === undefined || value === null) return { faqs: [] };
    if (!Array.isArray(value)) return { faqs: [], error: "FAQs must be an array." };
    if (value.length > 50) return { faqs: [], error: "A policy can contain up to 50 FAQs." };

    const faqs: PolicyFAQ[] = [];

    for (let index = 0; index < value.length; index++) {
        const item = value[index];

        if (
            !item ||
            typeof item !== "object" ||
            typeof item.question !== "string" ||
            typeof item.answer !== "string"
        ) {
            return { faqs: [], error: `FAQ ${index + 1} must include a question and answer.` };
        }

        const question = item.question.trim();
        const answer = item.answer.trim();

        if (!question && !answer) continue;
        if (!question || !answer) {
            return { faqs: [], error: `FAQ ${index + 1} must have both a question and an answer.` };
        }
        if (question.length > 300) {
            return { faqs: [], error: `FAQ ${index + 1} question must be 300 characters or fewer.` };
        }
        if (answer.length > 5000) {
            return { faqs: [], error: `FAQ ${index + 1} answer must be 5,000 characters or fewer.` };
        }

        faqs.push({ question, answer });
    }

    return { faqs };
}

function includeCategory() {
    return {
        category: {
            select: { id: true, name: true },
        },
    } as const;
}

function isRecordNotFound(error: unknown) {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
    );
}

// GET /api/airline-policies
// Optional query parameters: id, status, categoryId, policyType, search, excludeId, limit.
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const status = searchParams.get("status");
        const categoryId = searchParams.get("categoryId");
        const policyType = searchParams.get("policyType");
        const search = searchParams.get("search")?.trim();
        const excludeId = searchParams.get("excludeId");
        const limitParam = searchParams.get("limit");
        console.log(policyType,"ksldfjklsjfklsdjflksdfklsdf")
        
        if (id && !isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid policy ID." }, { status: 400 });
        }
        if (policyType && !isValidPolicyType(policyType)) {
            return NextResponse.json({ error: "Invalid policy type." }, { status: 400 });
        }
        if (status && !isValidStatus(status)) {
            return NextResponse.json({ error: "Invalid policy status." }, { status: 400 });
        }
        if (categoryId && !isValidObjectId(categoryId)) {
            return NextResponse.json({ error: "Invalid category ID." }, { status: 400 });
        }
        if (excludeId && !isValidObjectId(excludeId)) {
            return NextResponse.json({ error: "Invalid policy ID." }, { status: 400 });
        }

        if (id) {
            const policy = await prisma.airlinePolicy.findUnique({
                where: { id },
                include: includeCategory(),
            });

            if (!policy) {
                return NextResponse.json({ error: "Airline policy not found." }, { status: 404 });
            }

            return NextResponse.json({ policy });
        }

        let take: number | undefined;
        if (limitParam !== null) {
            take = Number(limitParam);
            if (!Number.isInteger(take) || take < 1 || take > 100) {
                return NextResponse.json(
                    { error: "Limit must be between 1 and 100." },
                    { status: 400 }
                );
            }
        }

        const policies = await prisma.airlinePolicy.findMany({
            where: {
                ...(status ? { status } : {}),
                ...(categoryId ? { categoryId } : {}),
                ...(policyType ? { policyType } : {}),
                ...(excludeId ? { id: { not: excludeId } } : {}),
                ...(search
                    ? {
                          category: {
                              is: {
                                  name: { contains: search, mode: "insensitive" },
                              },
                          },
                      }
                    : {}),
            },
            include: includeCategory(),
            orderBy: { updatedAt: "desc" },
            ...(take !== undefined ? { take } : {}),
        });

        return NextResponse.json({ policies, total: policies.length });
    } catch (error) {
        console.error("Failed to fetch airline policies:", error);
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2032"
        ) {
            return NextResponse.json(
                { error: "Some airline policy records contain invalid data. Repair the existing MongoDB documents and try again." },
                { status: 500 }
            );
        }
        return NextResponse.json({ error: "Failed to fetch airline policies." }, { status: 500 });
    }
}

// POST /api/airline-policies

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const categoryId =
            typeof body.categoryId === "string"
                ? body.categoryId.trim()
                : "";

        const policyType = body.policyType;
        const excerpt =
            typeof body.excerpt === "string" ? body.excerpt.trim() : "";
        const content =
            typeof body.content === "string" ? body.content.trim() : "";
        const metaTitle =
            typeof body.metaTitle === "string" ? body.metaTitle.trim() : "";
        const metaDescription =
            typeof body.metaDescription === "string"
                ? body.metaDescription.trim()
                : "";
        const metaKeywords = cleanKeywords(body.metaKeywords);
        const status: PolicyStatus =
            body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
        const parsedFaqs = parseFaqs(body.faqs);
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
                { error: "Article content must be at least 10 characters." },
                { status: 400 }
            );
        }

        if (parsedFaqs.error) {
            return NextResponse.json(
                { error: parsedFaqs.error },
                { status: 400 }
            );
        }

        const category = await prisma.airlinePolicyCategory.findUnique({
            where: { id: categoryId },
            select: { id: true, name: true },
        });

        if (!category) {
            return NextResponse.json(
                { error: "The selected airline category does not exist." },
                { status: 404 }
            );
        }

        const existingPolicy = await prisma.airlinePolicy.findFirst({
            where: {
                categoryId,
                policyType,
            },
            select: {
                id: true,
                policyType: true,
                status: true,
            },
        });

        if (existingPolicy) {
            return NextResponse.json(
                {
                    error: `A ${policyType.toLowerCase()} policy already exists for ${category.name}. Please edit the existing policy instead of creating a duplicate.`,
                    existingPolicyId: existingPolicy.id,
                },
                { status: 409 }
            );
        }

        const policy = await prisma.airlinePolicy.create({
            data: {
                category: {
                    connect: { id: categoryId },
                },
                policyType,
                excerpt: excerpt || null,
                content,
                metaTitle: metaTitle || null,
                metaDescription: metaDescription || null,
                metaKeywords,
                faqs: parsedFaqs.faqs as unknown as Prisma.InputJsonValue,
                status,
                publishedAt: status === "PUBLISHED" ? new Date() : null,
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

// PATCH /api/airline-policies
export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        const id = typeof body.id === "string" ? body.id.trim() : "";
        const categoryId = typeof body.categoryId === "string" ? body.categoryId.trim() : "";
        const policyType = body.policyType;
        const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
        const content = typeof body.content === "string" ? body.content.trim() : "";
        const metaTitle = typeof body.metaTitle === "string" ? body.metaTitle.trim() : "";
        const metaDescription = typeof body.metaDescription === "string" ? body.metaDescription.trim() : "";
        const metaKeywords = cleanKeywords(body.metaKeywords);
        const status = body.status;
        const parsedFaqs = parseFaqs(body.faqs);

        if (!id || !isValidObjectId(id)) {
            return NextResponse.json({ error: "A valid policy ID is required." }, { status: 400 });
        }
        if (!categoryId || !isValidObjectId(categoryId)) {
            return NextResponse.json({ error: "Please select a valid airline category." }, { status: 400 });
        }
        if (!isValidPolicyType(policyType)) {
            return NextResponse.json({ error: "Please select a valid policy type." }, { status: 400 });
        }
        if (!isValidStatus(status)) {
            return NextResponse.json({ error: "Please select a valid policy status." }, { status: 400 });
        }
        if (content.replace(/<[^>]*>/g, "").trim().length < 10) {
            return NextResponse.json({ error: "Article content must be at least 10 characters." }, { status: 400 });
        }
        if (parsedFaqs.error) {
            return NextResponse.json({ error: parsedFaqs.error }, { status: 400 });
        }

        const existingPolicy = await prisma.airlinePolicy.findUnique({ where: { id } });
        if (!existingPolicy) {
            return NextResponse.json({ error: "Airline policy not found." }, { status: 404 });
        }

        const category = await prisma.airlinePolicyCategory.findUnique({
            where: { id: categoryId },
            select: { id: true },
        });
        if (!category) {
            return NextResponse.json({ error: "Airline category not found." }, { status: 404 });
        }

   const policy = await prisma.airlinePolicy.update({
  where: { id },
  data: {
    category: {
      connect: { id: categoryId },
    },
    policyType,
    excerpt: excerpt || null,
    content,
    metaTitle: metaTitle || null,
    metaDescription: metaDescription || null,
    metaKeywords,
faqs: parsedFaqs.faqs as unknown as Prisma.InputJsonValue,
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
        return NextResponse.json({ error: "Failed to update airline policy." }, { status: 500 });
    }
}

// DELETE /api/airline-policies?id=<policyId>
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id || !isValidObjectId(id)) {
            return NextResponse.json({ error: "A valid policy ID is required." }, { status: 400 });
        }

        const existingPolicy = await prisma.airlinePolicy.findUnique({
            where: { id },
            select: { id: true },
        });
        if (!existingPolicy) {
            return NextResponse.json({ error: "Airline policy not found." }, { status: 404 });
        }

        await prisma.airlinePolicy.delete({ where: { id } });
        return NextResponse.json({ message: "Airline policy deleted successfully." });
    } catch (error) {
        console.error("Failed to delete airline policy:", error);
        if (isRecordNotFound(error)) {
            return NextResponse.json({ error: "Airline policy not found." }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete airline policy." }, { status: 500 });
    }
}
