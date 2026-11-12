
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultiSelect } from "@/components/ui/multi-select";
import { RichTextEditor } from "./rich_text_editor";

// Category type
interface BlogCategory {
    id: string;
    name: string;
    slug: string;
}

// FAQ type
interface FaqInput {
    id?: string;
    question: string;
    answer: string;
}

// Form data
interface BlogData {
    id: string;
    title: string;
    slug: string;
    categories: string[];
    content: string;
    image: string;
    metaTitle: string;
    focusKeyword?: string;
    metaDesc: string;
    metaKeywords: string;
    author: { name: string };
    faqs: FaqInput[];
}

interface UpdateBlogDialogProps {
    blog: BlogData;
}

// Helper function to create a slug
function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}

export function UpdateBlogDialog({ blog }: UpdateBlogDialogProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [imageSourceType, setImageSourceType] = useState(
        blog.image && blog.image.startsWith("http") ? "url" : "upload"
    );

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    // Categories from database
    const [categoriesList, setCategoriesList] = useState<BlogCategory[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const categoryOptions = categoriesList.map((category) => ({
        label: category.name,
        value: category.name,
    }));

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm<BlogData>({
        defaultValues: {
            ...blog,
            categories: blog.categories || [],
            focusKeyword: blog.focusKeyword || "",
            faqs: blog.faqs || [],
        },
    });

    // Fetch categories from database
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoadingCategories(true);

                const response = await fetch("/api/blog-categories");

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await response.json();
                setCategoriesList(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to load blog categories");
            } finally {
                setIsLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    // Slug generation
    const titleValue = watch("title");

    useEffect(() => {
        if (!isSlugManuallyEdited && open && titleValue !== blog.title) {
            const newSlug = slugify(titleValue || "");

            setValue("slug", newSlug, {
                shouldValidate: true,
            });
        }
    }, [
        titleValue,
        isSlugManuallyEdited,
        setValue,
        open,
        blog.title,
    ]);

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            reset({
                ...blog,
                categories: blog.categories || [],
                focusKeyword: blog.focusKeyword || "",
                faqs: blog.faqs || [],
            });

            setImageSourceType(
                blog.image && blog.image.startsWith("http")
                    ? "url"
                    : "upload"
            );

            setImageFile(null);
            setIsSlugManuallyEdited(false);
        }
    }, [open, blog, reset]);

    // FAQ handlers
    const handleAddFaq = () => {
        const currentFaqs = watch("faqs") || [];

        setValue(
            "faqs",
            [
                ...currentFaqs,
                {
                    question: "",
                    answer: "",
                },
            ],
            { shouldDirty: true }
        );
    };

    const handleRemoveFaq = (index: number) => {
        const currentFaqs = watch("faqs") || [];

        setValue(
            "faqs",
            currentFaqs.filter((_, i) => i !== index),
            { shouldDirty: true }
        );
    };

    const handleFaqChange = (
        index: number,
        field: "question" | "answer",
        value: string
    ) => {
        const currentFaqs = [...(watch("faqs") || [])];

        currentFaqs[index] = {
            ...currentFaqs[index],
            [field]: value,
        };

        setValue("faqs", currentFaqs, {
            shouldDirty: true,
        });
    };

    // Image upload handler
    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0] || null;

        setImageFile(file);

        if (file) {
            toast.info(`Ready to upload: ${file.name}`);
        } else {
            toast.warning("No file selected.");
        }
    };

    // Submit form
    const onSubmit = async (data: BlogData) => {
        // Validate FAQs
        const faqs = (data.faqs || []).map((faq) => ({
            ...(faq.id ? { id: faq.id } : {}),
            question: faq.question?.trim() || "",
            answer: faq.answer?.trim() || "",
        }));

        const invalidFaq = faqs.find(
            (faq) => !faq.question || !faq.answer
        );

        if (invalidFaq) {
            toast.error("Incomplete FAQ", {
                description: "Please enter both question and answer for every FAQ, or remove the empty FAQ.",
            });
            return;
        }

        setLoading(true);

        toast.loading(`Updating ${data.title}...`, {
            id: "update-status",
        });

        let finalImageUrl = data.image;

        // Cloudinary upload
        if (imageSourceType === "upload" && imageFile) {
            toast.loading("Uploading new image...", {
                id: "image-upload",
            });

            try {
                const formData = new FormData();
                formData.append("file", imageFile);

                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(
                        errorData.error || "Upload failed."
                    );
                }

                const uploadData = await uploadResponse.json();
                finalImageUrl = uploadData.imageUrl;

                toast.success("New image uploaded!", {
                    id: "image-upload",
                });
            } catch (error: any) {
                toast.error("Image Upload Failed", {
                    description: error.message,
                    id: "update-status",
                });

                setLoading(false);
                return;
            }
        }

        // Final image check
        if (!finalImageUrl) {
            toast.error("Missing Image", {
                description: "Please provide an image URL or upload a file.",
                id: "update-status",
            });

            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/blogs/${blog.slug}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    image: finalImageUrl,
                    faqs,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(
                    errorData.error || "Failed to update post."
                );
            }

            toast.success("Post Updated", {
                description: `Changes to "${data.title}" saved successfully.`,
                id: "update-status",
            });

            setOpen(false);
            router.refresh();
        } catch (error: any) {
            toast.error("Update Failed", {
                description: error.message,
                id: "update-status",
            });
        } finally {
            setLoading(false);
        }
    };

    const faqs = watch("faqs") || [];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4 mr-2" />
                    Update
                </Button>
            </DialogTrigger>

            <DialogContent className="!w-[95vw] !max-w-none max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Update Blog Post: {blog.title}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="title"
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />

                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <Label htmlFor="slug">Blog URL (Slug)</Label>

                        <Input
                            id="slug"
                            {...register("slug", {
                                required: "Slug is required",
                            })}
                            onInput={() =>
                                setIsSlugManuallyEdited(true)
                            }
                        />

                        {errors.slug && (
                            <p className="text-sm text-red-500">
                                {errors.slug.message}
                            </p>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                        <Label htmlFor="categories">
                            Categories
                        </Label>

                        <Controller
                            name="categories"
                            control={control}
                            rules={{
                                required: "At least one category is required",
                            }}
                            render={({ field }) => (
                                <MultiSelect
                                    options={categoryOptions}
                                    selected={field.value || []}
                                    onChange={field.onChange}
                                    placeholder={
                                        isLoadingCategories
                                            ? "Loading categories..."
                                            : "Select categories"
                                    }
                                />
                            )}
                        />

                        {errors.categories && (
                            <p className="text-sm text-red-500">
                                {errors.categories.message}
                            </p>
                        )}

                        {!isLoadingCategories &&
                            categoriesList.length === 0 && (
                                <p className="text-sm text-red-500">
                                    No categories found. Please add categories first.
                                </p>
                            )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <Label>Content</Label>

                        <Controller
                            name="content"
                            control={control}
                            rules={{
                                required: "Content is required",
                            }}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />

                        {errors.content && (
                            <p className="text-sm text-red-500">
                                {errors.content.message}
                            </p>
                        )}
                    </div>

                    {/* FAQs */}
                    <div className="space-y-4 border-t pt-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    FAQs
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Add, edit, or remove frequently asked questions.
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddFaq}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add FAQ
                            </Button>
                        </div>

                        {faqs.length === 0 && (
                            <div className="rounded-md border border-dashed p-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    No FAQs added yet.
                                </p>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-3"
                                    onClick={handleAddFaq}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add First FAQ
                                </Button>
                            </div>
                        )}

                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id || index}
                                className="space-y-3 rounded-lg border p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <h4 className="font-medium">
                                        FAQ {index + 1}
                                    </h4>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                        onClick={() =>
                                            handleRemoveFaq(index)
                                        }
                                        aria-label={`Remove FAQ ${index + 1}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`faq-question-${index}`}>
                                        Question
                                    </Label>

                                    <Input
                                        id={`faq-question-${index}`}
                                        value={faq.question || ""}
                                        onChange={(event) =>
                                            handleFaqChange(
                                                index,
                                                "question",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter FAQ question"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`faq-answer-${index}`}>
                                        Answer
                                    </Label>

                                    <Textarea
                                        id={`faq-answer-${index}`}
                                        value={faq.answer || ""}
                                        onChange={(event) =>
                                            handleFaqChange(
                                                index,
                                                "answer",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter FAQ answer"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Configuration */}
                    <div className="space-y-2 border-t pt-4">
                        <Label>
                            Featured Image (Current Image:{" "}
                            {blog.image ? "Available" : "None"})
                        </Label>

                        <RadioGroup
                            value={imageSourceType}
                            className="flex gap-4"
                            onValueChange={setImageSourceType}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="url"
                                    id="r-url"
                                />

                                <Label htmlFor="r-url">
                                    Paste URL (Current:{" "}
                                    {blog.image ? "Yes" : "No"})
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="upload"
                                    id="r-upload"
                                />

                                <Label htmlFor="r-upload">
                                    Upload New Image
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {imageSourceType === "url" ? (
                        <div className="space-y-2">
                            <Label htmlFor="image">
                                Image URL
                            </Label>

                            <Input
                                id="image"
                                placeholder="https://your-image-url.com/image.jpg"
                                {...register("image", {
                                    required: "Image URL is required",
                                })}
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="imageUpload">
                                New Image Upload
                            </Label>

                            <Input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            {imageFile && (
                                <p className="text-sm text-muted-foreground">
                                    Selected: {imageFile.name}
                                </p>
                            )}
                        </div>
                    )}

                    {/* SEO Section */}
                    <div className="space-y-4 pt-4 border-t dark:border-gray-700">
                        <h3 className="text-lg font-medium">
                            SEO Settings
                        </h3>

                        <div className="space-y-2">
                            <Label
                                htmlFor="focusKeyword"
                                className="text-[#FF8C00]"
                            >
                                Focus Keyword
                            </Label>

                            <Input
                                id="focusKeyword"
                                {...register("focusKeyword")}
                                placeholder="e.g. flight refund"
                            />

                            <p className="text-xs text-muted-foreground">
                                Used for SEO analysis scoring.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="metaTitle">
                                Meta Title
                            </Label>

                            <Input
                                id="metaTitle"
                                {...register("metaTitle", {
                                    required: "Meta Title is required",
                                })}
                            />

                            {errors.metaTitle && (
                                <p className="text-sm text-red-500">
                                    {errors.metaTitle.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="metaDesc">
                                Meta Description (Card Summary)
                            </Label>

                            <Textarea
                                id="metaDesc"
                                {...register("metaDesc", {
                                    required: "Meta Description is required",
                                })}
                            />

                            {errors.metaDesc && (
                                <p className="text-sm text-red-500">
                                    {errors.metaDesc.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="metaKeywords">
                                Meta Keywords
                            </Label>

                            <Input
                                id="metaKeywords"
                                {...register("metaKeywords", {
                                    required: "Keywords are required",
                                })}
                            />

                            {errors.metaKeywords && (
                                <p className="text-sm text-red-500">
                                    {errors.metaKeywords.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
