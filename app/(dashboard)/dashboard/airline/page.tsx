 "use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Plane,
  RefreshCw,
  Pencil,
  Trash2,
  Eye,
  Search,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type PolicyType = "FLIGHT" | "NAME" | "CANCELLATION" | "BAGGAGE";

type Policy = {
  id: string;
  policyType: PolicyType;
  excerpt: string | null;
  status: string;
  updatedAt: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
};

const policyLabels: Record<PolicyType, string> = {
  FLIGHT: "Flight Change Policy",
  NAME: "Name Correction",
  CANCELLATION: "Cancellation",
  BAGGAGE: "Baggage",
};

const policyRoutes: Record<PolicyType, string> = {
  FLIGHT: "flight-change",
  NAME: "name-correction",
  CANCELLATION: "cancellation",
  BAGGAGE: "baggage",
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AirlinePoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [policyTypeFilter, setPolicyTypeFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchPolicies = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/airline-policies", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load airline policies.");
      }

      setPolicies(data.policies ?? []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  async function handleDelete(policy: Policy) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the ${policyLabels[policy.policyType]} for ${policy.category.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(policy.id);

    try {
      const response = await fetch(
        `/api/airline-policies?id=${encodeURIComponent(policy.id)}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete policy.");
      }

      setPolicies((current) =>
        current.filter((item) => item.id !== policy.id)
      );

      toast.success("Airline policy deleted successfully.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete policy."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const filteredPolicies = policies.filter((policy) => {
    const searchTerm = search.trim().toLowerCase();

    const categoryName = policy.category?.name ?? "";
    const policyLabel = policyLabels[policy.policyType] ?? policy.policyType;

    const matchesSearch =
      categoryName.toLowerCase().includes(searchTerm) ||
      policyLabel.toLowerCase().includes(searchTerm) ||
      (policy.excerpt ?? "").toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "ALL" || policy.status === statusFilter;

    const matchesType =
      policyTypeFilter === "ALL" ||
      policy.policyType === policyTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <main className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Plane className="h-8 w-8" />
            Airline Policies
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage airline policy articles by category and policy type.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/airline/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Policy
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Policies</p>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="mt-3 text-3xl font-bold">{policies.length}</p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="mt-3 text-3xl font-bold">
            {policies.filter((p) => p.status === "PUBLISHED").length}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Drafts</p>
          <p className="mt-3 text-3xl font-bold">
            {policies.filter((p) => p.status === "DRAFT").length}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search airline, policy type, or excerpt..."
            className="pl-9"
          />
        </div>

        <select
          value={policyTypeFilter}
          onChange={(e) => setPolicyTypeFilter(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
          aria-label="Filter by policy type"
        >
          <option value="ALL">All policy types</option>
          <option value="FLIGHT">Flight</option>
          <option value="NAME">Name correction</option>
          <option value="CANCELLATION">Cancellation</option>
          <option value="BAGGAGE">Baggage</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
          aria-label="Filter by status"
        >
          <option value="ALL">All statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>

        <Button
          variant="outline"
          onClick={fetchPolicies}
          disabled={loading}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border">
        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3">
            <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Loading airline policies...
            </span>
          </div>
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" onClick={fetchPolicies}>
              Try Again
            </Button>
          </div>
        ) : filteredPolicies.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <Plane className="mb-4 h-10 w-10 text-muted-foreground" />

            <h2 className="text-lg font-semibold">
              {policies.length === 0
                ? "No airline policies yet"
                : "No matching policies"}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {policies.length === 0
                ? "Create your first airline policy article to get started."
                : "Try changing your search or filters."}
            </p>

            {policies.length === 0 && (
              <Button asChild className="mt-5">
                <Link href="/dashboard/airline/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Policy
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      Airline
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      Policy Type
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      Last Updated
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredPolicies.map((policy) => {
                    const airlineName =
                      policy.category?.name ?? "Unknown airline";

                    const policyType =
                      policyLabels[policy.policyType] ?? policy.policyType;

                    const publicUrl = `/${policyRoutes[policy.policyType]}/${toSlug(airlineName)}`;

                    return (
                      <tr
                        key={policy.id}
                        className="transition-colors hover:bg-muted/30"
                      >
                        <td className="px-4 py-4">
                          <div className="flex min-w-44 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Plane className="h-5 w-5 text-primary" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-medium">{airlineName}</p>
                              <p className="mt-1 max-w-52 truncate text-xs text-muted-foreground">
                                {policy.excerpt || "No excerpt provided"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          {policyType}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              policy.status === "PUBLISHED"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {policy.status === "PUBLISHED"
                              ? "Published"
                              : "Draft"}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                          {new Date(policy.updatedAt).toLocaleDateString()}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              title="View policy"
                              aria-label={`View ${airlineName} ${policyType}`}
                              disabled={policy.status !== "PUBLISHED"}
                            >
                              <Link
                                href={publicUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>

                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              title="Edit policy"
                              aria-label={`Edit ${airlineName} ${policyType}`}
                            >
                              <Link
                                href={`/dashboard/airline/${policy.id}/edit`}
                              >
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              title="Delete policy"
                              aria-label={`Delete ${airlineName} ${policyType}`}
                              disabled={deletingId === policy.id}
                              onClick={() => handleDelete(policy)}
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              {deletingId === policy.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t px-4 py-3 text-sm text-muted-foreground">
              Showing {filteredPolicies.length} of {policies.length} policies
            </div>
          </>
        )}
      </div>
    </main>
  );
}
