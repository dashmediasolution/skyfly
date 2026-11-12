
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "./rich_text_editor";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { SEOAnalyzer } from "./SeoAnalyser";
import { MultiSelect } from "@/components/ui/multi-select";

import {
  Plus,
  LoaderCircle,
  Trash2,
} from "lucide-react";

// ------------------------------------
// TYPES
// ------------------------------------

type FaqInput = {
  question: string;
  answer: string;
};

type BlogFormInputs = {
  title: string;
  slug: string;
  categories: string[];
  content: string;
  image: string;
  focusKeyword: string;
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string;
  faqs: FaqInput[];
};

type BlogCategoryOption = {
  id: string;
  name: string;
  slug: string;
};

// ------------------------------------
// SLUG GENERATOR
// ------------------------------------

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// ------------------------------------
// BLOG FORM
// ------------------------------------

export function BlogForm() {
  const router = useRouter();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [imageSourceType, setImageSourceType] = useState("url");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    defaultValues: {
      title: "",
      slug: "",
      categories: [],
      content: "",
      image: "",
      focusKeyword: "",
      metaTitle: "",
      metaDesc: "",
      metaKeywords: "",
      faqs: [],
    },
  });

  // ------------------------------------
  // CATEGORY STATES
  // ------------------------------------

  const [categoriesList, setCategoriesList] = useState<
    BlogCategoryOption[]
  >([]);

  const [newCategory, setNewCategory] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // ------------------------------------
  // FETCH CATEGORIES
  // ------------------------------------

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/blog-categories");

        if (!response.ok) {
          throw new Error("Failed to load categories.");
        }

        const categories = await response.json();
        setCategoriesList(categories);
      } catch {
        toast.error("Could not load blog categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ------------------------------------
  // ADD CATEGORY
  // ------------------------------------

  const handleAddCategory = async () => {
    const name = newCategory.trim();

    if (!name) {
      toast.error("Please enter a category name.");
      return;
    }

    const existing = categoriesList.find(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() ||
        category.slug === slugify(name)
    );

    if (existing) {
      toast.info("This category already exists.");

      const selected = watch("categories") || [];

      if (!selected.includes(existing.name)) {
        setValue("categories", [...selected, existing.name], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }

      setNewCategory("");
      return;
    }

    setIsAddingCategory(true);

    try {
      const response = await fetch("/api/blog-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      if (response.status === 409 && result.category) {
        const existingCategory = result.category;

        setCategoriesList((previous) => {
          const alreadyAdded = previous.some(
            (category) => category.id === existingCategory.id
          );

          return alreadyAdded
            ? previous
            : [...previous, existingCategory].sort((a, b) =>
                a.name.localeCompare(b.name)
              );
        });

        const selected = watch("categories") || [];

        if (!selected.includes(existingCategory.name)) {
          setValue("categories", [...selected, existingCategory.name], {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        setNewCategory("");
        toast.info("Existing category selected.");
        return;
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to create category.");
      }

      const createdCategory = result as BlogCategoryOption;

      setCategoriesList((previous) =>
        [...previous, createdCategory].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );

      const selected = watch("categories") || [];

      setValue("categories", [...selected, createdCategory.name], {
        shouldValidate: true,
        shouldDirty: true,
      });

      setNewCategory("");
      toast.success("Category created and selected.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create category."
      );
    } finally {
      setIsAddingCategory(false);
    }
  };

  const categoryOptions = categoriesList.map((category) => ({
    label: category.name,
    value: category.name,
  }));

  // ------------------------------------
  // WATCH FORM VALUES
  // ------------------------------------

  const watchedValues = watch();
  const titleValue = watch("title");
  const imageUrlValue = watch("image");
  const faqs = watch("faqs") || [];

  // ------------------------------------
  // IMAGE PREVIEW
  // ------------------------------------

  useEffect(() => {
    if (imageSourceType === "url" && imageUrlValue) {
      setPreviewUrl(imageUrlValue);
    } else if (imageSourceType === "url" && !imageUrlValue) {
      setPreviewUrl(null);
    }
  }, [imageUrlValue, imageSourceType]);

  // ------------------------------------
  // AUTOMATIC SLUG
  // ------------------------------------

  useEffect(() => {
    if (!isSlugManuallyEdited && titleValue) {
      const newSlug = slugify(titleValue);

      setValue("slug", newSlug, {
        shouldValidate: true,
      });
    }
  }, [titleValue, isSlugManuallyEdited, setValue]);

  // ------------------------------------
  // IMAGE UPLOAD PREVIEW
  // ------------------------------------

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;

    setImageFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      setValue("image", "", {
        shouldValidate: true,
      });
    } else {
      setPreviewUrl(null);
    }
  };

  // ------------------------------------
  // FAQ MANAGEMENT
  // ------------------------------------

  const handleAddFaq = () => {
    setValue(
      "faqs",
      [
        ...faqs,
        {
          question: "",
          answer: "",
        },
      ],
      {
        shouldDirty: true,
      }
    );
  };

  const handleRemoveFaq = (index: number) => {
    setValue(
      "faqs",
      faqs.filter((_, faqIndex) => faqIndex !== index),
      {
        shouldDirty: true,
      }
    );
  };

  const handleFaqChange = (
    index: number,
    field: keyof FaqInput,
    value: string
  ) => {
    const updatedFaqs = [...faqs];

    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: value,
    };

    setValue("faqs", updatedFaqs, {
      shouldDirty: true,
    });
  };

  // ------------------------------------
  // SUBMIT BLOG
  // ------------------------------------

  const onSubmit = async (data: BlogFormInputs) => {
    setIsFormSubmitting(true);

    toast.loading("Submitting blog post...", {
      id: "blog-submit",
    });

    let finalImageUrl = data.image;

    // Validate FAQs
    const validFaqs = data.faqs.filter(
      (faq) =>
        faq.question.trim() !== "" &&
        faq.answer.trim() !== ""
    );

    const hasIncompleteFaq = data.faqs.some(
      (faq) =>
        !faq.question.trim() ||
        !faq.answer.trim()
    );

    if (hasIncompleteFaq) {
      toast.error(
        "Incomplete FAQ",
        {
          description:
            "Please fill in both the question and answer for every FAQ, or remove the incomplete FAQ.",
          id: "blog-submit",
        }
      );

      setIsFormSubmitting(false);
      return;
    }

    // IMAGE UPLOAD
    if (imageSourceType === "upload" && imageFile) {
      toast.loading(`Uploading image: ${imageFile.name}...`, {
        id: "blog-submit",
      });

      try {
        const formData = new FormData();

        formData.append("file", imageFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Upload failed.");
        }

        const uploadData = await uploadResponse.json();

        finalImageUrl = uploadData.imageUrl;

        if (!finalImageUrl) {
          throw new Error("Image URL was not returned.");
        }
      } catch (error) {
        toast.error("Image Upload Failed", {
          description:
            error instanceof Error ? error.message : "Upload failed.",
          id: "blog-submit",
        });

        setIsFormSubmitting(false);
        return;
      }
    }

    if (!finalImageUrl) {
      toast.error("Missing Image", {
        description: "Please provide an image.",
        id: "blog-submit",
      });

      setIsFormSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...data,
        image: finalImageUrl,
        faqs: validFaqs.map((faq) => ({
          question: faq.question.trim(),
          answer: faq.answer.trim(),
        })),
      };

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to create post."
        );
      }

      toast.success("Blog post created successfully!", {
        id: "blog-submit",
      });

      reset();

      setImageFile(null);
      setPreviewUrl(null);
      setImageSourceType("url");
      setIsSlugManuallyEdited(false);

      router.refresh();
    } catch (error) {
      toast.error("Error creating post", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        id: "blog-submit",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // ------------------------------------
  // UI
  // ------------------------------------

  return (
    <div className="rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 p-6">

          <h2 className="text-2xl font-semibold">
            Create New Blog Post
          </h2>

          {/* TITLE */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              placeholder="Title"
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

          {/* SLUG */}
          <div className="space-y-2">
            <Label htmlFor="slug">Blog URL (Slug)</Label>

            <Input
              id="slug"
              placeholder="slug"
              {...register("slug", {
                required: "Slug is required",
              })}
              onInput={() => setIsSlugManuallyEdited(true)}
            />

            {errors.slug && (
              <p className="text-sm text-red-500">
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* CATEGORIES */}
          <div className="space-y-3">
            <Label htmlFor="categories">Categories</Label>

            <Controller
              name="categories"
              control={control}
              rules={{
                validate: (value) =>
                  value.length > 0 ||
                  "At least one category is required",
              }}
              render={({ field }) => (
                <MultiSelect
                  options={categoryOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder={
                    isLoadingCategories
                      ? "Loading categories..."
                      : "Select categories..."
                  }
                />
              )}
            />

            {errors.categories && (
              <p className="text-sm text-red-500">
                {errors.categories.message}
              </p>
            )}

            <div className="rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
              <Label htmlFor="newCategory" className="mb-2 block">
                Add New Category
              </Label>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="newCategory"
                  value={newCategory}
                  onChange={(event) =>
                    setNewCategory(event.target.value)
                  }
                  placeholder="Enter category name"
                  maxLength={80}
                  disabled={isAddingCategory}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();

                      if (!isAddingCategory) {
                        void handleAddCategory();
                      }
                    }
                  }}
                />

                <Button
                  type="button"
                  onClick={() => void handleAddCategory()}
                  disabled={
                    isAddingCategory || !newCategory.trim()
                  }
                  className="bg-[#FF8C00] hover:bg-[#e67e00]"
                >
                  {isAddingCategory ? (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Add Category
                </Button>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                New categories are saved to the database and
                automatically selected for this blog post.
              </p>
            </div>
          </div>

          {/* CONTENT */}
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

          {/* FAQ SECTION */}
          <div className="space-y-5 rounded-lg border bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/50">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  Frequently Asked Questions
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Add questions and answers related to this blog post.
                </p>
              </div>

              <Button
                type="button"
                onClick={handleAddFaq}
                className="bg-[#FF8C00] hover:bg-[#e67e00]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add FAQ
              </Button>
            </div>

            {faqs.length === 0 ? (
              <div className="rounded-md border border-dashed bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                <p className="text-sm text-muted-foreground">
                  No FAQs added yet.
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Click Add FAQ to create your first question and answer.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="space-y-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-semibold">
                        FAQ {index + 1}
                      </h4>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveFaq(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`faq-question-${index}`}>
                        Question
                      </Label>

                      <Input
                        id={`faq-question-${index}`}
                        value={faq.question}
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
                        value={faq.answer}
                        onChange={(event) =>
                          handleFaqChange(
                            index,
                            "answer",
                            event.target.value
                          )
                        }
                        placeholder="Enter FAQ answer"
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FEATURED IMAGE */}
          <div className="space-y-4 rounded-md border bg-gray-50 p-4 dark:bg-gray-900/50">
            <Label className="text-lg font-medium">
              Featured Image
            </Label>

            <RadioGroup
              value={imageSourceType}
              className="mb-4 flex gap-4"
              onValueChange={(value) => {
                setImageSourceType(value);
                setPreviewUrl(null);
                setImageFile(null);
                setValue("image", "");
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="url" id="r-url" />
                <Label htmlFor="r-url">Paste Image URL</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="r-upload" />
                <Label htmlFor="r-upload">Upload Image</Label>
              </div>
            </RadioGroup>

            {imageSourceType === "url" ? (
              <div className="space-y-2">
                <Input
                  id="image"
                  placeholder="https://..."
                  {...register("image")}
                />

                {errors.image && (
                  <p className="text-sm text-red-500">
                    {errors.image.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                <p className="text-xs text-muted-foreground">
                  The image will be uploaded when you click Save Post.
                </p>
              </div>
            )}

            {previewUrl && (
              <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />

                <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  Preview
                </div>
              </div>
            )}
          </div>

          {/* SEO SECTION */}
          <div className="border-t pt-6 dark:border-gray-700">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  SEO Metadata
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
                    placeholder="e.g. flight cancellation"
                  />

                  <p className="text-xs text-muted-foreground">
                    This keyword will be saved for future SEO analysis.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">
                    Meta Keywords (Tags)
                  </Label>

                  <Input
                    id="metaKeywords"
                    {...register("metaKeywords", {
                      required: true,
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaTitle">
                    Meta Title
                  </Label>

                  <Input
                    id="metaTitle"
                    {...register("metaTitle", {
                      required: true,
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDesc">
                    Meta Description
                  </Label>

                  <Textarea
                    id="metaDesc"
                    {...register("metaDesc", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              <div className="mb-4 lg:mt-0">
                <Label className="mb-2 block">
                  Real-time Analysis
                </Label>

                <SEOAnalyzer
                  content={watchedValues.content || ""}
                  keyword={watchedValues.focusKeyword || ""}
                  title={watchedValues.title || ""}
                  metaTitle={watchedValues.metaTitle || ""}
                  metaDesc={watchedValues.metaDesc || ""}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="rounded-b-lg border-t bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
          <Button
            type="submit"
            disabled={isFormSubmitting}
            className="w-full bg-[#FF8C00] hover:bg-[#FFB667] md:w-auto"
          >
            {isFormSubmitting ? "Saving Post..." : "Save Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
