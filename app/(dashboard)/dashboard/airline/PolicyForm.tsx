
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RichTextEditor } from "../../_components/rich_text_editor";
import PolicyFaqEditor, {
  type PolicyFAQ,
} from "@/app/(dashboard)/_components/PolicyFaqEditor";

import { POLICY_TYPES } from "@/app/types/airline-policy";

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

// -----------------------------
// Types
// -----------------------------

export type PolicyStatus = "DRAFT" | "PUBLISHED";

export type PolicyFormInitialData = {
  id: string;
  categoryId: string;
  policyType: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: PolicyStatus;
  faqs: PolicyFAQ[];
};

type PolicyFormProps = {
  initialData?: PolicyFormInitialData;
};

type Category = {
  id: string;
  name: string;
};

// -----------------------------
// Component
// -----------------------------

export default function PolicyForm({
  initialData,
}: PolicyFormProps) {
  const router = useRouter();

  const isEditing = Boolean(initialData?.id);

  const submitStatus = useRef<PolicyStatus>(
    initialData?.status ?? "DRAFT"
  );

  // Form states
  const [faqs, setFaqs] = useState<PolicyFAQ[]>(
    initialData?.faqs ?? []
  );

  const [categories, setCategories] = useState<Category[]>([]);

  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId ?? ""
  );

  const [excerpt, setExcerpt] = useState(
    initialData?.excerpt ?? ""
  );

  const [content, setContent] = useState(
    initialData?.content ?? ""
  );

  const [metaTitle, setMetaTitle] = useState(
    initialData?.metaTitle ?? ""
  );

  const [metaDescription, setMetaDescription] = useState(
    initialData?.metaDescription ?? ""
  );

  const [metaKeywords, setMetaKeywords] = useState(
    initialData?.metaKeywords ?? ""
  );

  const [policyType, setPolicyType] = useState(
    initialData?.policyType ?? "FLIGHT"
  );

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);

  // -----------------------------
  // Load Categories
  // -----------------------------

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(
          "/api/airline-policy-categories",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load categories."
          );
        }

        setCategories(
          Array.isArray(data)
            ? data
            : data.categories ?? []
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load categories."
        );
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  // -----------------------------
  // Submit Form
  // -----------------------------

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (saving) return;

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    if (content.replace(/<[^>]*>/g, "").trim().length < 10) {
      toast.error(
        "Please enter at least 10 characters of content."
      );
      return;
    }

    const status = submitStatus.current;
    const policyId = initialData?.id;

    setSaving(true);

    try {
      const response = await fetch("/api/airline-policies", {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(policyId ? { id: policyId } : {}),
          categoryId,
          excerpt: excerpt.trim(),
          content,
          policyType,
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
          metaKeywords: metaKeywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean),
          status,
          faqs,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save airline policy."
        );
      }

      toast.success(
        isEditing
          ? status === "PUBLISHED"
            ? "Airline policy updated and published successfully."
            : "Airline policy updated and saved as draft."
          : status === "PUBLISHED"
            ? "Airline policy published successfully."
            : "Airline policy saved as draft."
      );

      router.push("/dashboard/airline");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Article Information */}

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">
            {isEditing
              ? "Edit Article Information"
              : "Article Information"}
          </h2>

          <p className="text-sm text-muted-foreground">
            Add airline details and select a category.
          </p>
        </div>

        {/* Category */}

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label>Category</Label>

            <Button
              type="button"
              variant="link"
              className="h-auto p-0"
              onClick={() =>
                router.push(
                  "/dashboard/airline-policy-categories/new"
                )
              }
            >
              + Create Category
            </Button>
          </div>

          <Select
            value={categoryId}
            onValueChange={setCategoryId}
            disabled={
              loadingCategories || categories.length === 0
            }
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  loadingCategories
                    ? "Loading categories..."
                    : categories.length
                      ? "Select a category"
                      : "Create a category first"
                }
              />
            </SelectTrigger>

            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Policy Type */}

        <div className="space-y-2">
          <Label htmlFor="policyType">
            Policy Type
          </Label>

          <Select
            value={policyType}
            onValueChange={setPolicyType}
          >
            <SelectTrigger id="policyType">
              <SelectValue placeholder="Select policy type" />
            </SelectTrigger>

            <SelectContent>
              {POLICY_TYPES.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Excerpt */}

        <div className="space-y-2">
          <Label htmlFor="excerpt">
            Excerpt
          </Label>

          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a short summary for the airline directory."
            rows={3}
          />
        </div>
      </section>

      {/* Article Content */}
{/* Article Content */}
{/* Article Content */}

<section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
  <h2 className="mb-2 text-lg font-semibold text-gray-900">
    Article Content *
  </h2>

  <p className="mb-5 text-sm text-gray-500">
    Write and format your airline policy article using the rich text editor.
  </p>

  <RichTextEditor
    value={content}
    onChange={setContent}
    onBlur={() => {}}
  />
</section>

      {/* FAQs */}

      <section className="space-y-4">
        <PolicyFaqEditor
          faqs={faqs}
          onChange={setFaqs}
        />
      </section>

      {/* SEO Settings */}

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">
            SEO Settings
          </h2>

          <p className="text-sm text-muted-foreground">
            Customize the metadata for search engines.
          </p>
        </div>

        {/* Meta Title */}

        <div className="space-y-2">
          <Label htmlFor="metaTitle">
            Meta Title
          </Label>

          <Input
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Airline Name Correction Policy"
          />
        </div>

        {/* Meta Description */}

        <div className="space-y-2">
          <Label htmlFor="metaDescription">
            Meta Description
          </Label>

          <Textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) =>
              setMetaDescription(e.target.value)
            }
            placeholder="Enter the search result description."
            rows={3}
          />
        </div>

        {/* Meta Keywords */}

        <div className="space-y-2">
          <Label htmlFor="metaKeywords">
            Meta Keywords
          </Label>

          <Input
            id="metaKeywords"
            value={metaKeywords}
            onChange={(e) =>
              setMetaKeywords(e.target.value)
            }
            placeholder="airline policy, name correction, airline rules"
          />

          <p className="text-xs text-muted-foreground">
            Separate keywords with commas.
          </p>
        </div>
      </section>

      {/* Form Actions */}

      <div className="flex flex-wrap justify-end gap-3 border-t pt-6">

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </Button>

        {/* Save Draft */}

        <Button
          type="submit"
          variant="outline"
          disabled={
            saving ||
            loadingCategories ||
            categories.length === 0
          }
          onClick={() => {
            submitStatus.current = "DRAFT";
          }}
        >
          {saving && submitStatus.current === "DRAFT"
            ? "Saving..."
            : isEditing
              ? "Save Changes as Draft"
              : "Save Draft"}
        </Button>

        {/* Publish */}

        <Button
          type="submit"
          disabled={
            saving ||
            loadingCategories ||
            categories.length === 0
          }
          onClick={() => {
            submitStatus.current = "PUBLISHED";
          }}
        >
          {saving && submitStatus.current === "PUBLISHED"
            ? "Publishing..."
            : isEditing
              ? "Update & Publish"
              : "Publish Article"}
        </Button>
      </div>
    </form>
  );
}
