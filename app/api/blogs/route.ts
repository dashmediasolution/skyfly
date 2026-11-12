
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";
import { revalidatePath, revalidateTag } from "next/cache";

// ==========================================
// POST - Create Blog with Multiple Categories + FAQs
// ==========================================

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const data = await req.json();

    // 1. Validate required fields
    if (
      !data.title ||
      !data.slug ||
      !Array.isArray(data.categories) ||
      data.categories.length === 0 ||
      !data.content ||
      !data.image
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Validate FAQs
    if (
      data.faqs !== undefined &&
      !Array.isArray(data.faqs)
    ) {
      return NextResponse.json(
        { error: "FAQs must be an array." },
        { status: 400 }
      );
    }

    const faqs = (data.faqs || []).map((faq: any) => ({
      question: String(faq.question || "").trim(),
      answer: String(faq.answer || "").trim(),
    }));

    if (
      faqs.some(
        (faq: { question: string; answer: string }) =>
          !faq.question || !faq.answer
      )
    ) {
      return NextResponse.json(
        {
          error: "Every FAQ must have a question and answer.",
        },
        { status: 400 }
      );
    }

    // 3. Check for slug conflict
    const existingSlug = await prisma.blog.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          error: "This slug (blog URL) is already in use.",
        },
        { status: 409 }
      );
    }

    // 4. Create blog and FAQs together
    const newBlog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        categories: data.categories,
        content: data.content,
        image: data.image,

        focusKeyword: data.focusKeyword || "",

        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        metaKeywords: data.metaKeywords,

        authorId: session.user.id,

        // Create multiple FAQs with the blog
        faqs: {
          create: faqs,
        },
      },

      include: {
        faqs: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    // 5. Revalidate cache
    revalidateTag("blogs");
    revalidateTag("homepage-recent-blogs");
    revalidatePath("/");

    return NextResponse.json(newBlog, {
      status: 201,
    });

  } catch (error: any) {
    console.error("Blog Creation Error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This slug is already in use." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong on the server" },
      { status: 500 }
    );
  }
}

// ==========================================
// GET - Fetch Blogs with Pagination + Category Filter + FAQs
// ==========================================

export async function GET(req: Request) {
  const url = new URL(req.url);

  const categoryName =
    url.searchParams.get("category")?.trim() || "";

  const parsedPage = Number.parseInt(
    url.searchParams.get("page") || "1",
    10
  );

  const parsedLimit = Number.parseInt(
    url.searchParams.get("limit") || "6",
    10
  );

  const page =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const limit =
    Number.isFinite(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, 100)
      : 6;

  const skip = (page - 1) * limit;

  try {
    const whereClause = categoryName
      ? {
          categories: {
            has: categoryName,
          },
        }
      : {};

    const [totalPosts, blogs] = await Promise.all([
      prisma.blog.count({
        where: whereClause,
      }),

      prisma.blog.findMany({
        where: whereClause,

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,

        include: {
          author: {
            select: {
              name: true,
            },
          },

          // Fetch associated FAQs
          faqs: {
            select: {
              id: true,
              question: true,
              answer: true,
            },
          },
        },
      }),
    ]);

    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,

      categories: blog.categories,

      category:
        blog.categories.length > 0
          ? blog.categories[0]
          : "Uncategorized",

      categorySlug:
        blog.categories.length > 0
          ? blog.categories[0]
              .toLowerCase()
              .replace(/\s+/g, "-")
          : "uncategorized",

      description: blog.metaDesc,
      imageUrl: blog.image,

      authorName: blog.author?.name || "Unknown Author",

      publishDate: new Date(
        blog.createdAt
      ).toLocaleDateString("en-GB"),

      content: blog.content,

      focusKeyword: blog.focusKeyword || "",

      metaTitle: blog.metaTitle,
      metaDesc: blog.metaDesc,
      metaKeywords: blog.metaKeywords,

      // Return FAQs instead of an empty array
      faqs: blog.faqs.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      })),
    }));

    return NextResponse.json(
      {
        data: formattedBlogs,

        metadata: {
          totalPosts,
          totalPages: Math.ceil(totalPosts / limit),
          currentPage: page,
          limit,
        },
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error("Fetch Blogs Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
