
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Tag,
  Pencil,
  Trash2,
  Eye,
  Star,
  RefreshCw,
  Loader2,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Deal = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  dealType?: string | null;
  status: string;
  isFeatured: boolean;
  publishedAt?: string | null;
  createdAt: string;
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/deals", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch deals.");
      }

      setDeals(Array.isArray(data.deals) ? data.deals : []);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch deals."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.title.toLowerCase().includes(search.toLowerCase()) ||
        deal.slug.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || deal.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [deals, search, statusFilter]);

  const publishedCount = deals.filter(
    (deal) => deal.status === "PUBLISHED"
  ).length;

  const draftCount = deals.filter(
    (deal) => deal.status === "DRAFT"
  ).length;

  const featuredCount = deals.filter(
    (deal) => deal.isFeatured
  ).length;

  const handleDelete = async (deal: Deal) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${deal.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(deal.id);

    try {
      const response = await fetch(`/api/admin/deals/${deal.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete deal.");
      }

      setDeals((prev) => prev.filter((item) => item.id !== deal.id));
      toast.success("Deal deleted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete deal."
      );
    } finally {
      setDeletingId(null);
    }
  };

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
              <Tag className="h-6 w-6 text-[#538440]" />
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Manage Deals
              </h1>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Create, edit and manage your website deals.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={fetchDeals}
              disabled={loading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Button
              asChild
              className="bg-[#538440] hover:bg-[#3F6632]"
            >
              <Link href="/dashboard/deals/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Deal
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Deals"
            value={deals.length}
            icon={<Tag className="h-5 w-5" />}
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
            title="Featured Deals"
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
                placeholder="Search deals by title or slug..."
                className="h-11 pl-10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#538440]"
            >
              <option value="ALL">All Deals</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Drafts</option>
            </select>
          </div>
        </div>

        {/* Deals Table */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-semibold text-gray-900">
                All Deals
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                {filteredDeals.length} deals found
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#538440]" />
            </div>
          ) : filteredDeals.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
              <div className="mb-3 rounded-full bg-[#538440]/10 p-4">
                <Tag className="h-8 w-8 text-[#538440]" />
              </div>

              <h3 className="font-semibold text-gray-900">
                No deals found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {search || statusFilter !== "ALL"
                  ? "Try changing your search or filter."
                  : "Start by creating your first deal."}
              </p>

              {!search && statusFilter === "ALL" && (
                <Button
                  asChild
                  className="mt-4 bg-[#538440] hover:bg-[#3F6632]"
                >
                  <Link href="/dashboard/deals/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Deal
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Deal</th>
                    <th className="px-5 py-4 font-semibold">Type</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Featured</th>
                    <th className="px-5 py-4 font-semibold">Created</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredDeals.map((deal) => (
                    <tr
                      key={deal.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex min-w-[280px] items-center gap-3">
                          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {deal.featuredImage ? (
                              <Image
                                src={deal.featuredImage}
                                alt={deal.title}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <Tag className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="line-clamp-1 font-semibold text-gray-900">
                              {deal.title}
                            </p>
                            <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                              /deals/{deal.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                          {deal.dealType || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            deal.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {deal.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {deal.isFeatured ? (
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

                      <td className="px-5 py-4 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-gray-400" />
                          {formatDate(deal.createdAt)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            asChild
                            size="icon"
                            variant="outline"
                            title="Edit deal"
                          >
                            <Link
                              href={`/dashboard/deals/edit/${deal.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>

                          {deal.status === "PUBLISHED" && (
                            <Button
                              asChild
                              size="icon"
                              variant="outline"
                              title="View deal"
                            >
                              <Link
                                href={`/deals/${deal.slug}`}
                                target="_blank"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}

                          <Button
                            size="icon"
                            variant="outline"
                            title="Delete deal"
                            disabled={deletingId === deal.id}
                            onClick={() => handleDelete(deal)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            {deletingId === deal.id ? (
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
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="rounded-lg bg-[#538440]/10 p-2 text-[#538440]">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
