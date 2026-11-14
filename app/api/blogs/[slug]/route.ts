
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
// @ts-ignore
import { authOptions } from "@/lib/auth.config";
import { revalidatePath, revalidateTag } from "next/cache";
import { submitToIndexNow } from "@/lib/indexnow";
interface Params {
  slug: string;
}

// ==========================================
// GET - Fetch single blog by slug or ID
// ==========================================

export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: 400 }
    );
  }

  const isId = slug.length === 24 && /^[0-9a-fA-F]+$/.test(slug);

  try {
    const blog = await prisma.blog.findUnique({
      where: isId ? { id: slug } : { slug },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        faqs: {
          select: {
            id: true,
            question: true,
            answer: true,
            blogId: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const formattedBlog = {
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

      publishDate: new Date(blog.createdAt).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),

      content: blog.content,

      focusKeyword: blog.focusKeyword || "",

      metaTitle: blog.metaTitle,
      metaDesc: blog.metaDesc,
      metaKeywords: blog.metaKeywords,

      faqs: blog.faqs.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      })),
    };

    return NextResponse.json(formattedBlog, {
      status: 200,
    });
  } catch (error) {
    console.error("Single Blog Fetch Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// ==========================================
// PATCH - Update blog and its FAQs
// ==========================================

export async function PATCH(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const { slug: blogSlug } = await params;

  try {
    const data = await req.json();

    // Validate FAQs
    if (
      data.faqs !== undefined &&
      !Array.isArray(data.faqs)
    ) {
      return NextResponse.json(
        { error: "FAQs must be an array." },
        { status: 400 }
      );
    }

    const faqs =
      data.faqs?.map((faq: any) => ({
        question: String(faq.question || "").trim(),
        answer: String(faq.answer || "").trim(),
      })) ?? [];

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

    // Check whether blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: {
        slug: blogSlug,
      },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // Check slug conflict
    if (data.slug && data.slug !== blogSlug) {
      const existingSlug = await prisma.blog.findUnique({
        where: {
          slug: data.slug,
        },
      });

      if (existingSlug) {
        return NextResponse.json(
          {
            error: "This slug is already in use by another post.",
          },
          { status: 409 }
        );
      }
    }

    // Update blog and FAQs together
    const updatedBlog = await prisma.blog.update({
      where: {
        slug: blogSlug,
      },

      data: {
        title: data.title,
        slug: data.slug,
        categories: data.categories,
        content: data.content,
        image: data.image,

        focusKeyword: data.focusKeyword,

        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        metaKeywords: data.metaKeywords,

        // Update FAQs only when provided
        ...(data.faqs !== undefined && {
          faqs: {
            deleteMany: {},
            create: faqs,
          },
        }),

        updatedAt: new Date(),
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

revalidateTag("blogs");
revalidatePath("/blog");
 
  await submitToIndexNow([
    `https://skyflywithus.com/blogs/${updatedBlog.slug}`,
  ]);
 
    return NextResponse.json(updatedBlog, {
      status: 200,
    });
  } catch (error) {
    console.error("Blog Update Error:", error);

    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// ==========================================
// DELETE - Delete blog and associated FAQs
// ==========================================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const { slug: blogSlug } = await params;

  try {
    const blogToDelete = await prisma.blog.findUnique({
      where: {
        slug: blogSlug,
      },
    });

    if (!blogToDelete) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete FAQs first
    await prisma.faq.deleteMany({
      where: {
        blogId: blogToDelete.id,
      },
    });

    // Delete blog
    await prisma.blog.delete({
      where: {
        id: blogToDelete.id,
      },
    });

revalidateTag("blogs" );
revalidatePath("/blog");

    return NextResponse.json(
      {
        message: "Blog and associated FAQs deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Blog Delete Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
