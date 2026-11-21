
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
    Plus,
    Search,
    Users,
    Pencil,
    Trash2,
    Eye,
    Star,
    RefreshCw,
    Loader2,
    CalendarDays,
    MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type GroupTravel = {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    featuredImage?: string | null;
    tags: string[];
    faqs?: unknown;
    focusKeyword?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords: string[];
    canonicalUrl?: string | null;
    status: string;
    isFeatured: boolean;
    publishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
};

export default function GroupTravelPage() {
    const [groupTravels, setGroupTravels] = useState<GroupTravel[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Fetch group travel pages
    const fetchGroupTravels = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/admin/group-travel", {
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to fetch group travel pages."
                );
            }

            setGroupTravels(
                Array.isArray(data.groupTravels) ? data.groupTravels : []
            );
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch group travel pages."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGroupTravels();
    }, [fetchGroupTravels]);

    // Search and status filtering
    const filteredGroupTravels = useMemo(() => {
        return groupTravels.filter((item) => {
            const searchTerm = search.toLowerCase();

            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm) ||
                item.slug.toLowerCase().includes(searchTerm) ||
                item.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchTerm)
                );

            const matchesStatus =
                statusFilter === "ALL" || item.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [groupTravels, search, statusFilter]);

    // Statistics
    const publishedCount = groupTravels.filter(
        (item) => item.status === "PUBLISHED"
    ).length;

    const draftCount = groupTravels.filter(
        (item) => item.status === "DRAFT"
    ).length;

    const featuredCount = groupTravels.filter(
        (item) => item.isFeatured
    ).length;

    // Delete group travel page
    const handleDelete = async (item: GroupTravel) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${item.title}"?`
        );

        if (!confirmed) return;

        setDeletingId(item.id);

        try {
            const response = await fetch(
                `/api/admin/group-travel/${item.id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to delete group travel page."
                );
            }

            setGroupTravels((prev) =>
                prev.filter((groupTravel) => groupTravel.id !== item.id)
            );

            toast.success("Group travel page deleted successfully.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete group travel page."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // Format date
    const formatDate = (date?: string | null) => {
        if (!date) return "—";

        return new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-7xl space-y-7">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <Users className="h-6 w-6 text-[#538440]" />

                            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                Manage Group Travel
                            </h1>
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            Create, edit and manage your website group travel pages.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            onClick={fetchGroupTravels}
                            disabled={loading}
                        >
                            <RefreshCw
                                className={`mr-2 h-4 w-4 ${
                                    loading ? "animate-spin" : ""
                                }`}
                            />
                            Refresh
                        </Button>

                        <Button
                            asChild
                            className="bg-[#538440] hover:bg-[#3F6632]"
                        >
                            <Link href="/dashboard/group-travel/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Group Travel
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Pages"
                        value={groupTravels.length}
                        icon={<Users className="h-5 w-5" />}
                    />

                    <StatCard
                        title="Published"
                        value={publishedCount}
                        icon={<Eye className="h-5 w-5" />}
                    />

                    <StatCard
                        title="Drafts"
                        value={draftCount}
                        icon={<Pencil className="h-5 w-5" />}
                    />

                    <StatCard
                        title="Featured Pages"
                        value={featuredCount}
                        icon={<Star className="h-5 w-5" />}
                    />
                </div>

                {/* Search and Filter */}
                <div className="rounded-xl border bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title, slug or tag..."
                                className="h-11 pl-10"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#538440]"
                        >
                            <option value="ALL">All Pages</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="DRAFT">Drafts</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                    </div>
                </div>

                {/* Group Travel Table */}
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b px-5 py-4">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                All Group Travel Pages
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredGroupTravels.length} pages found
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex min-h-64 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-[#538440]" />
                        </div>
                    ) : filteredGroupTravels.length === 0 ? (
                        <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
                            <div className="mb-3 rounded-full bg-[#538440]/10 p-4">
                                <Users className="h-8 w-8 text-[#538440]" />
                            </div>

                            <h3 className="font-semibold text-gray-900">
                                No group travel pages found
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {search || statusFilter !== "ALL"
                                    ? "Try changing your search or filter."
                                    : "Start by creating your first group travel page."}
                            </p>

                            {!search && statusFilter === "ALL" && (
                                <Button
                                    asChild
                                    className="mt-4 bg-[#538440] hover:bg-[#3F6632]"
                                >
                                    <Link href="/dashboard/group-travel/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Group Travel
                                    </Link>
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left">
                                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-5 py-4 font-semibold">
                                            Group Travel
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Tags
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Featured
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Created
                                        </th>

                                        <th className="px-5 py-4 text-right font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {filteredGroupTravels.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            {/* Group Travel */}
                                            <td className="px-5 py-4">
                                                <div className="flex min-w-[280px] items-center gap-3">
                                                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                        {item.featuredImage ? (
                                                            <Image
                                                                src={item.featuredImage}
                                                                alt={item.title}
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center">
                                                                <MapPin className="h-5 w-5 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="line-clamp-1 font-semibold text-gray-900">
                                                            {item.title}
                                                        </p>

                                                        <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                                                            /group-travel/{item.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Tags */}
                                            <td className="px-5 py-4">
                                                <div className="flex max-w-[200px] flex-wrap gap-1.5">
                                                    {item.tags?.length ? (
                                                        <>
                                                            {item.tags.slice(0, 2).map((tag, index) => (
                                                                <span
                                                                    key={`${tag}-${index}`}
                                                                    className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}

                                                            {item.tags.length > 2 && (
                                                                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                                                    +{item.tags.length - 2}
                                                                </span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">
                                                            —
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        item.status === "PUBLISHED"
                                                            ? "bg-green-100 text-green-700"
                                                            : item.status === "ARCHIVED"
                                                            ? "bg-gray-100 text-gray-600"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            {/* Featured */}
                                            <td className="px-5 py-4">
                                                {item.isFeatured ? (
                                                    <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600">
                                                        <Star className="h-4 w-4 fill-current" />
                                                        Yes
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">
                                                        No
                                                    </span>
                                                )}
                                            </td>

                                            {/* Created */}
                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                <span className="inline-flex items-center gap-2">
                                                    <CalendarDays className="h-4 w-4 text-gray-400" />
                                                    {formatDate(item.createdAt)}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        asChild
                                                        size="icon"
                                                        variant="outline"
                                                        title="Edit group travel"
                                                    >
                                                        <Link
                                                            href={`/dashboard/group-travel/edit/${item.id}`}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>

                                                    {item.status === "PUBLISHED" && (
                                                        <Button
                                                            asChild
                                                            size="icon"
                                                            variant="outline"
                                                            title="View group travel"
                                                        >
                                                            <Link
                                                                href={`/group-travel/${item.slug}`}
                                                                target="_blank"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}

                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        title="Delete group travel"
                                                        disabled={deletingId === item.id}
                                                        onClick={() => handleDelete(item)}
                                                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    >
                                                        {deletingId === item.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Statistics Card
function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                    {title}
                </p>

                <div className="rounded-lg bg-[#538440]/10 p-2 text-[#538440]">
                    {icon}
                </div>
            </div>

            <p className="mt-3 text-3xl font-bold text-gray-900">
                {value}
            </p>
        </div>
    );
}
