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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SEOAnalyzer } from "./SeoAnalyser";
import { MultiSelect } from "@/components/ui/multi-select"; 
import { Plus, LoaderCircle } from "lucide-react";
// --- CATEGORIES ---
 

function slugify(text: string) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

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
};
type BlogCategoryOption = {
  id: string;
  name: string;
  slug: string;
};

export function BlogForm() {
  const router = useRouter();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [imageSourceType, setImageSourceType] = useState("url");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register, handleSubmit, control, watch, setValue, reset,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    defaultValues: { 
        title: "", slug: "", categories: [], content: "", image: "", 
        focusKeyword: "", metaTitle: "", metaDesc: "", metaKeywords: "" 
    },
  });

const [categoriesList, setCategoriesList] = useState<BlogCategoryOption[]>([]);
const [newCategory, setNewCategory] = useState("");
const [isLoadingCategories, setIsLoadingCategories] = useState(true);
const [isAddingCategory, setIsAddingCategory] = useState(false);
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/blog-categories");

      if (!response.ok) {
        throw new Error("Failed to load categories.");
      }

      const categories = await response.json();
      setCategoriesList(categories);
    } catch (error) {
      toast.error("Could not load blog categories.");
    } finally {
      setIsLoadingCategories(false);
    }
  };

  fetchCategories();
}, []);


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
      error instanceof Error ? error.message : "Failed to create category."
    );
  } finally {
    setIsAddingCategory(false);
  }
};


const categoryOptions = categoriesList.map((category) => ({
  label: category.name,
  value: category.name,
}));
  const watchedValues = watch(); 
  const titleValue = watch("title");
  const imageUrlValue = watch("image");

  useEffect(() => {
    if (imageSourceType === "url" && imageUrlValue) {
      setPreviewUrl(imageUrlValue);
    } else if (imageSourceType === "url" && !imageUrlValue) {
      setPreviewUrl(null);
    }
  }, [imageUrlValue, imageSourceType]);

  useEffect(() => {
    if (!isSlugManuallyEdited && titleValue) {
      const newSlug = slugify(titleValue);
      setValue("slug", newSlug, { shouldValidate: true });
    }
  }, [titleValue, isSlugManuallyEdited, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setValue("image", "", { shouldValidate: true }); 
    } else {
        setPreviewUrl(null);
    }
  };

  const onSubmit = async (data: BlogFormInputs) => {
    setIsFormSubmitting(true);
    toast.loading("Submitting blog post...", { id: 'blog-submit' });
    
    let finalImageUrl = data.image; 

    // --- UPLOAD LOGIC ---
    if (imageSourceType === "upload" && imageFile) {
        toast.loading(`Uploading image: ${imageFile.name}...`, { id: 'blog-submit' });
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            const uploadResponse = await fetch("/api/upload", { method: "POST", body: formData });
            
            if (!uploadResponse.ok) throw new Error("Upload failed.");
            
            const uploadData = await uploadResponse.json();
            finalImageUrl = uploadData.imageUrl; 
            toast.success("Image uploaded!", { id: 'blog-submit' });
        } catch (error: any) {
            toast.error("Image Upload Failed", { id: 'blog-submit' });
            setIsFormSubmitting(false);
            return; 
        }
    }
    
    if (!finalImageUrl) {
        toast.error("Missing Image", { description: "Please provide an image.", id: 'blog-submit' });
        setIsFormSubmitting(false);
        return;
    }

    try {
      // 👇 CHANGED: Removed the line that stripped 'focusKeyword'. 
      // We now send 'data' directly so focusKeyword is saved.

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image: finalImageUrl }), // 'data' includes focusKeyword
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      toast.success("Blog post created successfully!", { id: 'blog-submit' });
      reset(); 
      setImageFile(null);
      setPreviewUrl(null); 
      router.refresh(); 

    } catch (error: any) {
      toast.error("Error creating post", { description: error.message, id: 'blog-submit' });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Create New Blog Post</h2>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Title" {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Blog URL (Slug)</Label>
            <Input id="slug" placeholder="slug" {...register("slug", { required: "Slug is required" })} onInput={() => setIsSlugManuallyEdited(true)} />
             {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
          </div>

         
<div className="space-y-3">
  <Label htmlFor="categories">Categories</Label>

  <Controller
    name="categories"
    control={control}
    rules={{
      validate: (value) =>
        value.length > 0 || "At least one category is required",
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
        onChange={(event) => setNewCategory(event.target.value)}
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
        disabled={isAddingCategory || !newCategory.trim()}
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
      New categories are saved to the database and automatically selected
      for this blog post.
    </p>
  </div>
</div>


          <div className="space-y-2">
            <Label>Content</Label>
            <Controller name="content" control={control} rules={{ required: "Content is required" }} render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              )}
            />
             {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          </div>

           {/* --- UPDATED IMAGE SECTION --- */}
           <div className="space-y-4 border p-4 rounded-md bg-gray-50 dark:bg-gray-900/50">
            <Label className="text-lg font-medium">Featured Image</Label>
            
            <RadioGroup defaultValue="url" className="flex gap-4 mb-4" onValueChange={(val) => {
                setImageSourceType(val);
                setPreviewUrl(null); 
            }}>
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
                    <Input id="image" placeholder="https://..." {...register("image")} />
                     {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                </div>
            ) : (
                <div className="space-y-2">
                    <Input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} />
                    <p className="text-xs text-muted-foreground">The image will be uploaded when you click "Save Post".</p>
                </div>
            )}

            {previewUrl && (
                <div className="relative mt-4 w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                    <Image 
                        src={previewUrl} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                        Preview
                    </div>
                </div>
            )}
          </div>

          {/* SEO Section */}
          <div className="pt-6 border-t dark:border-gray-700">
             <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">SEO Metadata</h3>
                    <div className="space-y-2">
                        <Label htmlFor="focusKeyword" className="text-[#FF8C00]">Focus Keyword</Label>
                        <Input id="focusKeyword" {...register("focusKeyword")} placeholder="e.g. flight cancellation" />
                        <p className="text-xs text-muted-foreground">This keyword will be saved for future SEO analysis.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="metaKeywords">Meta Keywords (Tags)</Label>
                        <Input id="metaKeywords" {...register("metaKeywords", { required: true })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input id="metaTitle" {...register("metaTitle", { required: true })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="metaDesc">Meta Description</Label>
                        <Textarea id="metaDesc" {...register("metaDesc", { required: true })} />
                    </div>
                </div>
                 <div className="lg:mt-0 mb-4">
                    <Label className="mb-2 block">Real-time Analysis</Label>
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

        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 rounded-b-lg">
          <Button type="submit" disabled={isFormSubmitting} className="bg-[#FF8C00] hover:bg-[#FFB667] w-full md:w-auto">
            {isFormSubmitting ? "Saving Post..." : "Save Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}