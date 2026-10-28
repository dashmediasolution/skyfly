 
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ArticleEditor from "./ArticleEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { POLICY_TYPES } from "@/app/types/airline-policy"
import PolicyFaqEditor, {
  type PolicyFAQ,
} from "@/app/(dashboard)/_components/PolicyFaqEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
};

type PolicyStatus = "DRAFT" | "PUBLISHED";




export default function PolicyForm() {
  const router = useRouter();
  const submitStatus = useRef<PolicyStatus>("DRAFT");
const [faqs, setFaqs] = useState<PolicyFAQ[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  
  const [categoryId, setCategoryId] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);
const [policyType, setPolicyType] = useState("FLIGHT");
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(
          "/api/airline-policy-categories",
          { cache: "no-store" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load categories.");
        }

        setCategories(
          Array.isArray(data) ? data : data.categories ?? []
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (saving) return;

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    

    if (content.replace(/<[^>]*>/g, "").trim().length < 10) {
      toast.error("Please enter at least 10 characters of content.");
      return;
    }

    const status = submitStatus.current;
    setSaving(true);

    try {
      const response = await fetch("/api/airline-policies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

           
            
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
          faqs
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save policy.");
      }

      toast.success(
        status === "PUBLISHED"
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Article Information</h2>
          <p className="text-sm text-muted-foreground">
            Add airline details and select a category.
          </p>
        </div>



        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label>Category</Label>
            <Button
              type="button"
              variant="link"
              className="h-auto p-0"
              onClick={() =>
                router.push("/dashboard/airline-policy-categories/new")
              }
            >
              + Create Category
            </Button>
          </div>

          <Select
            value={categoryId}
            onValueChange={setCategoryId}
            disabled={loadingCategories || categories.length === 0}
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
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
<div className="space-y-2">
  <Label htmlFor="policyType">Policy Type</Label>

  <Select
    value={policyType}
    onValueChange={setPolicyType}
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
            Write and format your airline policy article.
          </p>
        </div>

        <ArticleEditor value={content} onChange={setContent} />
      </section>
<PolicyFaqEditor faqs={faqs} onChange={setFaqs} />
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">SEO Settings</h2>
          <p className="text-sm text-muted-foreground">
            Customize the metadata for search engines.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Airline Name Correction Policy"
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
      </section>

      <div className="flex flex-wrap justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="outline"
          disabled={saving || loadingCategories || categories.length === 0}
          onClick={() => {
            submitStatus.current = "DRAFT";
          }}
        >
          {saving && submitStatus.current === "DRAFT"
            ? "Saving..."
            : "Save Draft"}
        </Button>

        <Button
          type="submit"
          disabled={saving || loadingCategories || categories.length === 0}
          onClick={() => {
            submitStatus.current = "PUBLISHED";
          }}
        >
          {saving && submitStatus.current === "PUBLISHED"
            ? "Publishing..."
            : "Publish Article"}
        </Button>
      </div>
    </form>
  );
}
