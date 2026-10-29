
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config"; 
 import prisma from "@/lib/prisma";
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Fetch blog categories error:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Not authenticated." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    if (!name || name.length > 80) {
      return NextResponse.json(
        { error: "Category name is required and must be at most 80 characters." },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    if (!slug) {
      return NextResponse.json(
        { error: "Please enter a valid category name." },
        { status: 400 }
      );
    }

    const existingCategories = await prisma.blogCategory.findMany({
      select: { id: true, name: true, slug: true },
    });

    const existing = existingCategories.find(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() ||
        category.slug === slug
    );

    if (existing) {
      return NextResponse.json(
        {
          error: "This category already exists.",
          category: existing,
        },
        { status: 409 }
      );
    }

    const category = await prisma.blogCategory.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This category already exists." },
        { status: 409 }
      );
    }

    console.error("Create blog category error:", error);

    return NextResponse.json(
      { error: "Failed to create category." },
      { status: 500 }
    );
  }
}
