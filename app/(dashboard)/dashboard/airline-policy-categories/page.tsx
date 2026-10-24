 "use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Plus,
  RefreshCw,
  FileText,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
  createdAt: string;
  _count?: {
    policies: number;
  };
  policies?: { id: string }[];
};

export default function AirlinePolicyCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/airline-policy-categories", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load categories.");
      }

      setCategories(data.categories ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <main className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Policy Categories
          </h1>
          <p className="mt-2 text-muted-foreground">
            Organize your airline name correction policies into categories.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/airline-policy-categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center rounded-xl border">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-3 text-sm text-muted-foreground">
            Loading categories...
          </span>
        </div>
      ) : error ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-destructive/30 p-8 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={fetchCategories}
          >
            Try Again
          </Button>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <FolderOpen className="mb-4 h-10 w-10 text-muted-foreground" />
          <h2 className="text-lg font-semibold">No categories yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a category to organize your airline policy articles.
          </p>
          <Button asChild className="mt-5">
            <Link href="/dashboard/airline-policy-categories/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Category
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const policyCount =
                category._count?.policies ?? category.policies?.length ?? 0;

              return (
                <div
                  key={category.id}
                  className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <FolderOpen className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="break-words font-semibold">
                        {category.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Policy category
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>
                        {policyCount}{" "}
                        {policyCount === 1 ? "policy" : "policies"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {category.createdAt
                        ? new Date(category.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-muted-foreground">
            Total categories: {categories.length}
          </p>
        </>
      )}
    </main>
  );
}
