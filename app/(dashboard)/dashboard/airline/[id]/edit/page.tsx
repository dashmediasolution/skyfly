
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  RefreshCw,
  Plane,
} from "lucide-react";
import { toast } from "sonner";

import ArticleEditor from "../../ArticleEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = {
  id: string;
  name: string;
};

type PolicyType = "FLIGHT" | "NAME" | "CANCELLATION" | "BAGGAGE";

type Policy = {
  id: string;

  
  policyType?: PolicyType;
  categoryId: string;
  excerpt: string | null;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string[];
  status: string;
  category?: Category;
};

const POLICY_TYPES: { label: string; value: PolicyType }[] = [
  { label: "Flight Change Policy", value: "FLIGHT" },
  { label: "Name Correction Policy", value: "NAME" },
  { label: "Cancellation Policy", value: "CANCELLATION" },
  { label: "Baggage Policy", value: "BAGGAGE" },
];



  

export default function EditAirlinePolicyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const [categories, setCategories] = useState<Category[]>([]);

  
  const [policyType, setPolicyType] = useState<PolicyType>("FLIGHT");
  const [categoryId, setCategoryId] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [status, setStatus] = useState("DRAFT");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadPolicy = useCallback(async () => {
    if (!id) {
      setError("Policy ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [policyResponse, categoryResponse] = await Promise.all([
        fetch(`/api/airline-policies?id=${encodeURIComponent(id)}`, {
          cache: "no-store",
        }),
        fetch("/api/airline-policy-categories", {
          cache: "no-store",
        }),
      ]);

      const policyData = await policyResponse.json();
      const categoryData = await categoryResponse.json();

      if (!policyResponse.ok) {
        throw new Error(
          policyData.error || "Failed to load airline policy."
        );
      }

      if (!categoryResponse.ok) {
        throw new Error(
          categoryData.error || "Failed to load categories."
        );
      }

      const policy: Policy =
        policyData.policy ??
        (Array.isArray(policyData.policies)
          ? policyData.policies.find((item: Policy) => item.id === id)
          : null);

      if (!policy) {
        throw new Error("Airline policy not found.");
      }

   
      ;

      const validPolicyTypes: PolicyType[] = [
        "FLIGHT",
        "NAME",
        "CANCELLATION",
        "BAGGAGE",
      ];

      setPolicyType(
        validPolicyTypes.includes(policy.policyType as PolicyType)
          ? (policy.policyType as PolicyType)
          : "FLIGHT"
      );

      setCategoryId(policy.categoryId ?? policy.category?.id ?? "");
      setExcerpt(policy.excerpt ?? "");
      setContent(policy.content ?? "");
      setMetaTitle(policy.metaTitle ?? "");
      setMetaDescription(policy.metaDescription ?? "");
      setMetaKeywords((policy.metaKeywords ?? []).join(", "));
      setStatus(policy.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT");

      setCategories(
        Array.isArray(categoryData)
          ? categoryData
          : categoryData.categories ?? []
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load policy.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPolicy();
  }, [loadPolicy]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) return;

    if (!id) {
      toast.error("Policy ID is missing.");
      return;
    }

  
    

    if (!POLICY_TYPES.some((type) => type.value === policyType)) {
      toast.error("Please select a valid policy type.");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    if (content.replace(/<[^>]*>/g, "").trim().length < 10) {
      toast.error("Article content must be at least 10 characters.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/airline-policies", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        
          
          policyType,
          categoryId,
          excerpt: excerpt.trim(),
          content,
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
          metaKeywords: metaKeywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean),
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update policy.");
      }

      toast.success("Airline policy updated successfully.");
      router.push("/dashboard/airline");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update policy."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-96 items-center justify-center gap-3 p-6">
        <RefreshCw className="h-5 w-5 animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading airline policy...
        </span>
      </main>
    );
  }

  if (error) {
    return (
      <main className="space-y-4 p-6 md:p-10">
        <p className="text-sm text-destructive">{error}</p>

        <div className="flex gap-3">
          <Button variant="outline" onClick={loadPolicy}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button variant="outline" asChild>
            <Link href="/dashboard/airline">Back to Policies</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-3 -ml-3">
            <Link href="/dashboard/airline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Policies
            </Link>
          </Button>

          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Plane className="h-8 w-8" />
            Edit Airline Policy
          </h1>

          <p className="mt-2 text-muted-foreground">
            Update the article, policy type, category, publication status, and SEO settings.
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
            status === "PUBLISHED"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
          }`}
        >
          {status === "PUBLISHED" ? "Published" : "Draft"}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-xl border bg-card p-5 md:p-8"
      >
        <section className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Article Information</h2>
            <p className="text-sm text-muted-foreground">
              Edit the airline details, policy type, and article URL.
            </p>
          </div>

          

         
          
              <div className="flex gap-8">

           
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {categories.length === 0 && (
              <p className="text-sm text-destructive">
                No categories found. Create a category before updating this policy.
              </p>
            )}
          </div>
 <div className="space-y-2">
            <Label htmlFor="policyType">Policy Type</Label>

            <Select
              value={policyType}
              onValueChange={(value) =>
                setPolicyType(value as PolicyType)
              }
            >
              <SelectTrigger id="policyType">
                <SelectValue placeholder="Select policy type" />
              </SelectTrigger>

              <SelectContent>
                {POLICY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
   </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a short summary for the airline directory."
              rows={3}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Article Content</h2>
            <p className="text-sm text-muted-foreground">
              Edit and format the airline policy article.
            </p>
          </div>

          <ArticleEditor value={content} onChange={setContent} />
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold">SEO Settings</h2>
            <p className="text-sm text-muted-foreground">
              Customize search engine metadata.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Airline Policy"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Enter the search result description."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaKeywords">Meta Keywords</Label>
            <Input
              id="metaKeywords"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              placeholder="airline policy, name correction, airline rules"
            />
            <p className="text-xs text-muted-foreground">
              Separate keywords with commas.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Publication Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3 border-t pt-6">
          <Button type="button" variant="outline" asChild disabled={saving}>
            <Link href="/dashboard/airline">Cancel</Link>
          </Button>

          <Button
            type="submit"
            disabled={saving || categories.length === 0}
          >
            {saving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saving ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </main>
  );
}
