 import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.airlinePolicyCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Failed to fetch airline policy categories:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Category name must be at least 2 characters." },
        { status: 400 }
      );
    }

    const existingCategory =
      await prisma.airlinePolicyCategory.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this name already exists." },
        { status: 409 }
      );
    }

    const category = await prisma.airlinePolicyCategory.create({
      data: {
        name,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A category with this name already exists." },
        { status: 409 }
      );
    }

    console.error("Failed to create airline policy category:", error);

    return NextResponse.json(
      { error: "Failed to create category." },
      { status: 500 }
    );
  }
}
 