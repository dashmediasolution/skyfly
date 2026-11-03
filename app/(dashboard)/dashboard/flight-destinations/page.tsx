
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ExternalLink,
  Loader2,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Destination = {
  id: string;
  title: string;
  slug: string;
  destination: string;
  country: string;
  heroImage: string | null;
  status: string;
  createdAt: string;
};

export default function FlightDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDestinations = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        search,
        status,
        page: String(page),
        limit: "10",
      });

      const response = await fetch(
        `/api/admin/flight-destinations?${params}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load destinations");
      }

      setDestinations(result.destinations || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, page]);

  useEffect(() => {
    const timeout = setTimeout(fetchDestinations, 300);

    return () => clearTimeout(timeout);
  }, [fetchDestinations]);

  async function deleteDestination(id: string, title: string) {
    if (deletingId) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `/api/admin/flight-destinations/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete destination");
      }

      toast.success(
        result.message || "Destination deleted successfully"
      );

      // Refresh the listing after successful deletion.
      // If the current page has only one item, move to the previous page.
      if (destinations.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchDestinations();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete destination"
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Plane size={17} />
              Dashboard / Flight Destinations
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Flight Destinations
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage destination landing pages and SEO content.
            </p>
          </div>

          <Link
            href="/dashboard/flight-destinations/create"
            className="inline-flex items-center gap-2 rounded-lg bg-[#538440] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3f6632]"
          >
            <Plus size={18} />
            Add Destination
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="rounded-xl border bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search destination, country or title..."
                className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#538440]"
              />
            </div>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-[#538440]"
            >
              <option value="">All Status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
        </div>

        {/* Destination Table */}
        <div className="overflow-hidden rounded-xl border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4">Destination</th>
                  <th className="px-5 py-4">Slug</th>
                  <th className="px-5 py-4">Country</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <Loader2
                        className="mx-auto animate-spin text-[#538440]"
                        size={28}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Loading destinations...
                      </p>
                    </td>
                  </tr>
                ) : destinations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <Plane
                        className="mx-auto text-gray-300"
                        size={35}
                      />

                      <p className="mt-3 font-medium text-gray-700">
                        No destinations found
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Create your first flight destination.
                      </p>
                    </td>
                  </tr>
                ) : (
                  destinations.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {item.heroImage ? (
                            <Image
                              src={item.heroImage}
                              alt={item.destination}
                              width={52}
                              height={52}
                              unoptimized
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                              <Plane
                                size={20}
                                className="text-gray-400"
                              />
                            </div>
                          )}

                          <span className="font-medium text-gray-900">
                            {item.title}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        /{item.slug}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {item.country}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            item.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("en-IN")}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {item.status === "PUBLISHED" && (
                            <Link
                              href={`/flights/${item.slug}`}
                              target="_blank"
                              title="View page"
                              className="rounded-lg border p-2 text-gray-600 hover:bg-gray-100"
                            >
                              <ExternalLink size={16} />
                            </Link>
                          )}

                          <Link
                            href={`/dashboard/flight-destinations/${item.id}`}
                            title="Edit"
                            className="rounded-lg border p-2 text-[#538440] hover:bg-green-50"
                          >
                            <Pencil size={16} />
                          </Link>

                          <button
                            type="button"
                            title="Delete"
                            onClick={() =>
                              deleteDestination(item.id, item.title)
                            }
                            disabled={deletingId !== null}
                            className="rounded-lg border p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === item.id ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4">
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-lg border p-2 transition hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-lg border p-2 transition hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
