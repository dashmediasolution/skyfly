
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/airline-policy-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create category.");
      }

      toast.success("Category created successfully.");
      router.push("/admin/airline-policy-categories");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category-name">Category name</Label>
        <Input
          id="category-name"
          value={name}
          onChange={(e) => {
            const nextName = e.target.value;
            setName(nextName);
            if (!slugEdited) setSlug(makeSlug(nextName));
          }}
          placeholder="Name Correction"
          required
          minLength={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-slug">Category slug</Label>
        <Input
          id="category-slug"
          value={slug}
          onChange={(e) => {
            setSlug(makeSlug(e.target.value));
            setSlugEdited(true);
          }}
          placeholder="name-correction"
          required
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
        />
        <p className="text-sm text-muted-foreground">
          Use lowercase letters, numbers, and hyphens.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-description">
          Description <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="category-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the policies included in this category."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
