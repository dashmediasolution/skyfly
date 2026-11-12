
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        author: {
          select: {
            name: true,
          },
        },

        // Fetch FAQs associated with each blog
        faqs: {
          select: {
            id: true,
            question: true,
            answer: true,
          },
        },
      },
    });

    // Format data for frontend
    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,

      category: blog.categories[0] || "Uncategorized",
      categories: blog.categories,

      categorySlug: (blog.categories[0] || "")
        .toLowerCase()
        .replace(/\s+/g, "-"),

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

      // Return actual FAQs from database
      faqs: blog.faqs.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      })),
    }));

    return NextResponse.json(formattedBlogs, {
      status: 200,
    });

  } catch (error) {
    console.error("Fetch All Blogs Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
