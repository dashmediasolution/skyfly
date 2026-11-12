
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DeleteBlogDialog } from "./DeleteBlogDialog";
import { UpdateBlogDialog } from "./UpdateBlogDialog";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Prisma } from "@prisma/client";
import { SeoReportDialog } from "./SeoReportDialog";
import Link from "next/link";

// Blog payload with author and FAQs
type BlogTablePayload = Prisma.BlogGetPayload<{
    include: {
        author: {
            select: {
                name: true;
            };
        };
        faqs: {
            select: {
                id: true;
                question: true;
                answer: true;
            };
        };
    };
}>;

interface PaginatedData {
    data: BlogTablePayload[];
    metadata: {
        totalPosts: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

// Fetch blogs
async function getBlogs(
    page: number,
    limit: number
): Promise<PaginatedData> {
    const skip = (page - 1) * limit;

    const emptyResult = {
        data: [],
        metadata: {
            totalPosts: 0,
            totalPages: 1,
            currentPage: page,
            limit,
        },
    };

    try {
        const totalPosts = await prisma.blog.count();

        const blogs = await prisma.blog.findMany({
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
                faqs: {
                    select: {
                        id: true,
                        question: true,
                        answer: true,
                    },
                },
            },
        });

        return {
            data: blogs,
            metadata: {
                totalPosts,
                totalPages: Math.max(1, Math.ceil(totalPosts / limit)),
                currentPage: page,
                limit,
            },
        };
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return emptyResult;
    }
}

interface BlogTableProps {
    searchParams:
        | { page?: string }
        | Promise<{ page?: string }>;
}

export async function BlogTable({
    searchParams,
}: BlogTableProps) {
    const limit = 10;

    const resolvedSearchParams = await searchParams;

    const parsedPage = parseInt(
        resolvedSearchParams.page || "1",
        10
    );

    const currentPage =
        Number.isFinite(parsedPage) && parsedPage > 0
            ? parsedPage
            : 1;

    const { data: blogs, metadata } = await getBlogs(
        currentPage,
        limit
    );

    return (
        <>
            <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold">
                        Existing Blog Posts (Page {currentPage} of{" "}
                        {metadata.totalPages})
                    </h2>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                S.No.
                            </TableHead>

                            <TableHead>Title</TableHead>

                            <TableHead>Author</TableHead>

                            <TableHead>Published At</TableHead>

                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {blogs.map((blog, index) => (
                            <TableRow key={blog.id}>
                                <TableCell>
                                    {(currentPage - 1) * limit +
                                        index +
                                        1}
                                </TableCell>

                                <TableCell className="font-medium max-w-xs truncate">
                                    {blog.title}
                                </TableCell>

                                <TableCell>
                                    {blog.author.name}
                                </TableCell>

                                <TableCell>
                                    {formatDate(blog.createdAt)}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <SeoReportDialog blog={blog} />

                                        <UpdateBlogDialog
                                            blog={{
                                                ...blog,
                                                faqs: blog.faqs || [],
                                            }}
                                        />

                                        <DeleteBlogDialog
                                            blogSlug={blog.slug}
                                            blogTitle={blog.title}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {blogs.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                        No blog posts found. Create one above to get started.
                    </p>
                )}
            </div>

            <PaginationControls
                currentPage={metadata.currentPage}
                totalPages={metadata.totalPages}
            />
        </>
    );
}
