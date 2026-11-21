
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
    ImagePlus,
    X,
    Loader2,
    Plus,
    Trash2,
    Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "./rich_text_editor";

type FAQ = {
    question: string;
    answer: string;
};

type GroupTravelFormData = {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string | null;
    content?: string;
    featuredImage?: string | null;
    tags?: string[];
    faqs?: FAQ[] | null;
    focusKeyword?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string[];
    canonicalUrl?: string | null;
    status?: string;
    isFeatured?: boolean;
};

type GroupTravelFormProps = {
    initialData?: GroupTravelFormData;
    isEdit?: boolean;
};

const initialFAQ: FAQ = {
    question: "",
    answer: "",
};

export default function GroupTravelForm({
    initialData,
    isEdit = false,
}: GroupTravelFormProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        featuredImage: initialData?.featuredImage || "",
        tags: initialData?.tags?.join(", ") || "",
        focusKeyword: initialData?.focusKeyword || "",
        metaTitle: initialData?.metaTitle || "",
        metaDescription: initialData?.metaDescription || "",
        metaKeywords: initialData?.metaKeywords?.join(", ") || "",
        canonicalUrl: initialData?.canonicalUrl || "",
        status: initialData?.status || "DRAFT",
        isFeatured: initialData?.isFeatured || false,
    });

    const [faqs, setFaqs] = useState<FAQ[]>(
        initialData?.faqs || []
    );

    const updateField = useCallback(
        (name: string, value: string | boolean) => {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    // Generate slug
    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    };

    // Handle title change
    const handleTitleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            title: value,
            slug: generateSlug(value),
            metaTitle: prev.metaTitle || value,
        }));
    };

    // Featured image upload
    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image.");
            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB.");
            event.target.value = "";
            return;
        }

        const toastId = toast.loading("Uploading featured image...");

        setUploading(true);

        try {
            const uploadData = new FormData();

            uploadData.append("file", file);
            uploadData.append("folder", "group-travel");

            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const data = await response.json();

            if (!response.ok || !data.imageUrl) {
                throw new Error(
                    data.message || data.error || "Image upload failed."
                );
            }

            updateField("featuredImage", data.imageUrl);

            toast.success("Featured image uploaded successfully.", {
                id: toastId,
            });
        } catch (error) {
            console.error("Group travel image upload error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Image upload failed.",
                { id: toastId }
            );
        } finally {
            setUploading(false);
            event.target.value = "";
        }
    };

    // FAQ handlers
    const addFAQ = () => {
        setFaqs((prev) => [...prev, { ...initialFAQ }]);
    };

    const updateFAQ = (
        index: number,
        field: keyof FAQ,
        value: string
    ) => {
        setFaqs((prev) =>
            prev.map((faq, i) =>
                i === index
                    ? { ...faq, [field]: value }
                    : faq
            )
        );
    };

    const removeFAQ = (index: number) => {
        setFaqs((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // Form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Please enter group travel title.");
            return;
        }

        if (!formData.slug.trim()) {
            toast.error("Please enter group travel slug.");
            return;
        }

        if (
            !formData.content.trim() ||
            formData.content === "<p></p>"
        ) {
            toast.error("Please add group travel content.");
            return;
        }

        if (
            faqs.some(
                (faq) =>
                    !faq.question.trim() ||
                    !faq.answer.trim()
            )
        ) {
            toast.error(
                "Please complete all FAQ questions and answers."
            );
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...formData,

                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),

                metaKeywords: formData.metaKeywords
                    .split(",")
                    .map((keyword) => keyword.trim())
                    .filter(Boolean),

                faqs,
            };

            const response = await fetch(
                isEdit
                    ? `/api/admin/group-travel/${initialData?.id}`
                    : "/api/admin/group-travel",
                {
                    method: isEdit ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error ||
                    data.message ||
                    "Failed to save group travel page."
                );
            }

            toast.success(
                isEdit
                    ? "Group travel page updated successfully."
                    : "Group travel page created successfully."
            );

            router.push("/dashboard/group-travel");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "h-11 rounded-lg border-gray-300 focus-visible:ring-[#538440]";

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic Information */}
            <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add the main information about your group travel page.
                    </p>
                </div>

                <div className="space-y-5">

                    {/* Title */}
                    <div className="space-y-2">
                        <Label>Group Travel Title *</Label>

                        <Input
                            value={formData.title}
                            onChange={(e) =>
                                handleTitleChange(e.target.value)
                            }
                            placeholder="Enter group travel title"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <Label>Slug *</Label>

                        <Input
                            value={formData.slug}
                            onChange={(e) =>
                                updateField("slug", e.target.value)
                            }
                            placeholder="group-travel-url-slug"
                            className={inputClass}
                            required
                        />

                        <p className="text-xs text-gray-500">
                            URL: /group-travel/
                            {formData.slug || "your-group-travel-slug"}
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <Label>Excerpt</Label>

                        <Textarea
                            value={formData.excerpt}
                            onChange={(e) =>
                                updateField("excerpt", e.target.value)
                            }
                            placeholder="Write a short description of this group travel page..."
                            rows={3}
                            className="resize-none"
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Label>Tags</Label>

                        <Input
                            value={formData.tags}
                            onChange={(e) =>
                                updateField("tags", e.target.value)
                            }
                            placeholder="Family Travel, Corporate Travel, Group Holidays"
                            className={inputClass}
                        />

                        <p className="text-xs text-gray-500">
                            Separate multiple tags with commas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    Featured Image
                </h2>

                <p className="mb-5 text-sm text-gray-500">
                    Upload one featured image for this group travel page.
                </p>

                {formData.featuredImage ? (
                    <div className="relative max-w-xl overflow-hidden rounded-xl border">
                        <div className="relative aspect-video">
                            <Image
                                src={formData.featuredImage}
                                alt={
                                    formData.title ||
                                    "Group travel featured image"
                                }
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                updateField("featuredImage", "")
                            }
                            className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white shadow hover:bg-red-700"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-[#538440] hover:bg-[#538440]/5">
                        {uploading ? (
                            <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#538440]" />
                        ) : (
                            <ImagePlus className="mb-3 h-8 w-8 text-gray-400" />
                        )}

                        <span className="font-medium text-gray-700">
                            {uploading
                                ? "Uploading..."
                                : "Click to upload image"}
                        </span>

                        <span className="mt-1 text-xs text-gray-500">
                            PNG, JPG or WebP (Max 5MB)
                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="hidden"
                        />
                    </label>
                )}
            </section>

            {/* Rich Text Content */}
            <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    Group Travel Content *
                </h2>

                <p className="mb-5 text-sm text-gray-500">
                    Write and format your group travel content using the rich text editor.
                </p>

                <RichTextEditor
                    value={formData.content}
                    onChange={(value) =>
                        updateField("content", value)
                    }
                    onBlur={() => {}}
                />
            </section>

            {/* FAQs */}
            <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Frequently Asked Questions
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add questions and answers related to this group travel page.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={addFAQ}
                        className="bg-[#538440] hover:bg-[#3F6632]"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add FAQ
                    </Button>
                </div>

                {faqs.length === 0 && (
                    <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
                        No FAQs added yet.
                    </div>
                )}

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="space-y-4 rounded-lg border bg-gray-50 p-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-gray-800">
                                    FAQ {index + 1}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() => removeFAQ(index)}
                                    className="rounded-md p-2 text-red-500 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <Label>Question</Label>

                                <Input
                                    value={faq.question}
                                    onChange={(e) =>
                                        updateFAQ(
                                            index,
                                            "question",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter question"
                                    className={inputClass}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Answer</Label>

                                <Textarea
                                    value={faq.answer}
                                    onChange={(e) =>
                                        updateFAQ(
                                            index,
                                            "answer",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter answer"
                                    rows={3}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SEO Settings */}
            <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    SEO Settings
                </h2>

                <p className="mb-5 text-sm text-gray-500">
                    Configure search engine metadata for this group travel page.
                </p>

                <div className="space-y-5">

                    {/* Focus Keyword */}
                    <div className="space-y-2">
                        <Label>Focus Keyword</Label>

                        <Input
                            value={formData.focusKeyword}
                            onChange={(e) =>
                                updateField("focusKeyword", e.target.value)
                            }
                            placeholder="Enter focus keyword"
                            className={inputClass}
                        />
                    </div>

                    {/* Meta Title */}
                    <div className="space-y-2">
                        <Label>Meta Title</Label>

                        <Input
                            value={formData.metaTitle}
                            onChange={(e) =>
                                updateField("metaTitle", e.target.value)
                            }
                            placeholder="Enter meta title"
                            className={inputClass}
                        />
                    </div>

                    {/* Meta Description */}
                    <div className="space-y-2">
                        <Label>Meta Description</Label>

                        <Textarea
                            value={formData.metaDescription}
                            onChange={(e) =>
                                updateField(
                                    "metaDescription",
                                    e.target.value
                                )
                            }
                            placeholder="Enter meta description"
                            rows={3}
                        />
                    </div>

                    {/* Meta Keywords */}
                    <div className="space-y-2">
                        <Label>Meta Keywords</Label>

                        <Input
                            value={formData.metaKeywords}
                            onChange={(e) =>
                                updateField("metaKeywords", e.target.value)
                            }
                            placeholder="Group travel, family travel, corporate travel"
                            className={inputClass}
                        />

                        <p className="text-xs text-gray-500">
                            Separate keywords with commas.
                        </p>
                    </div>

                    {/* Canonical URL */}
                    <div className="space-y-2">
                        <Label>Canonical URL</Label>

                        <Input
                            value={formData.canonicalUrl}
                            onChange={(e) =>
                                updateField("canonicalUrl", e.target.value)
                            }
                            placeholder="https://skyflywithus.com/group-travel/example"
                            className={inputClass}
                        />
                    </div>
                </div>
            </section>

            {/* Publishing Settings */}
            <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
                <h2 className="mb-5 text-lg font-semibold text-gray-900">
                    Publishing Settings
                </h2>

                <div className="space-y-5">

                    {/* Status */}
                    <div className="space-y-2">
                        <Label>Publication Status</Label>

                        <select
                            value={formData.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#538440]"
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                    </div>

                    {/* Featured */}
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
                        <input
                            type="checkbox"
                            checked={formData.isFeatured}
                            onChange={(e) =>
                                updateField(
                                    "isFeatured",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 accent-[#538440]"
                        />

                        <div>
                            <p className="font-medium text-gray-800">
                                Featured Group Travel
                            </p>

                            <p className="text-xs text-gray-500">
                                Highlight this group travel page on your website.
                            </p>
                        </div>
                    </label>
                </div>
            </section>

            {/* Form Actions */}
            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        router.push("/dashboard/group-travel")
                    }
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={loading || uploading}
                    className="bg-[#538440] hover:bg-[#3F6632]"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            {isEdit
                                ? "Update Group Travel"
                                : "Create Group Travel"}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
