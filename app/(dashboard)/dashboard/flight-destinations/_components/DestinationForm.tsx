"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Save,
    Loader2,
    Upload,
    Image as ImageIcon,
} from "lucide-react";
import TiptapEditor from "./TiptapEditor";

type Section = {
    id: string;
    heading: string;
    description: string;
};

type RelatedFlight = {
    id: string;
    from: string;
    to: string;
    offer: string;
    image: string;
    href: string;
};

type FAQ = {
    id: string;
    question: string;
    answer: string;
};

type Destination = {
    id?: string;
    title: string;
    slug: string;
    destination: string;
    country: string;
    airportCode: string | null;
    excerpt: string | null;
    content: string;
    heroImage: string | null;
    sections: Section[];
    relatedFlights: RelatedFlight[];
    faqs: FAQ[];
    focusKeyword: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string[];
    status: string;
};

const emptyDestination: Destination = {
    title: "",
    slug: "",
    destination: "",
    country: "",
    airportCode: "",
    excerpt: "",
    content: "<p></p>",
    heroImage: "",
    sections: [],
    relatedFlights: [],
    faqs: [],
    focusKeyword: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    status: "DRAFT",
};

const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#538440] focus:ring-2 focus:ring-[#538440]/10";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

export default function DestinationForm({
    initialData,
    edit = false,
}: {
    initialData?: Destination;
    edit?: boolean;
}) {
    const router = useRouter();
const [heroUploading, setHeroUploading] = useState(false);
const [flightUploading, setFlightUploading] = useState<string | null>(null);
    const [form, setForm] = useState<Destination>(
        initialData || emptyDestination
    );
    const [keywords, setKeywords] = useState(
        initialData?.metaKeywords?.join(", ") || ""
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
            setKeywords(initialData.metaKeywords?.join(", ") || "");
        }
    }, [initialData]);


async function uploadImage(
    file: File,
    onSuccess: (url: string) => void
) {
    if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5 MB.");
        return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("folder", "skyfly_flights");

    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body: data,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Image upload failed.");
        }

        onSuccess(result.imageUrl);

        toast.success("Image uploaded successfully.");
    } catch (error) {
        toast.error(
            error instanceof Error
                ? error.message
                : "Failed to upload image."
        );
    }
}
    function update<K extends keyof Destination>(
        key: K,
        value: Destination[K]
    ) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function createId() {
        return crypto.randomUUID();
    }

    function generateSlug(value: string) {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function addSection() {
        update("sections", [
            ...form.sections,
            { id: createId(), heading: "", description: "" },
        ]);
    }

    function addFlight() {
        update("relatedFlights", [
            ...form.relatedFlights,
            {
                id: createId(),
                from: "",
                to: "",
                offer: "",
                image: "",
                href: "",
            },
        ]);
    }

    function addFAQ() {
        update("faqs", [
            ...form.faqs,
            { id: createId(), question: "", answer: "" },
        ]);
    }

    function updateSection(id: string, key: keyof Section, value: string) {
        update(
            "sections",
            form.sections.map((item) =>
                item.id === id ? { ...item, [key]: value } : item
            )
        );
    }

    function updateFlight(id: string, key: keyof RelatedFlight, value: string) {
        update(
            "relatedFlights",
            form.relatedFlights.map((item) =>
                item.id === id ? { ...item, [key]: value } : item
            )
        );
    }

    function updateFAQ(id: string, key: keyof FAQ, value: string) {
        update(
            "faqs",
            form.faqs.map((item) =>
                item.id === id ? { ...item, [key]: value } : item
            )
        );
    }

    async function handleSubmit(status: "DRAFT" | "PUBLISHED") {
        if (!form.title.trim()) {
            toast.error("Please enter destination title");
            return;
        }

        if (!form.destination.trim() || !form.country.trim()) {
            toast.error("Destination and country are required");
            return;
        }

        if (!form.content || form.content === "<p></p>") {
            toast.error("Please enter article content");
            return;
        }

        const slug = generateSlug(form.slug || form.title);

        if (!slug) {
            toast.error("Please enter a valid slug");
            return;
        }

        const payload = {
            ...form,
            slug,
            status,
            metaKeywords: keywords
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        };

        setLoading(true);

        try {
            const response = await fetch(
                edit
                    ? `/api/admin/flight-destinations/${initialData?.id}`
                    : "/api/admin/flight-destinations",
                {
                    method: edit ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            toast.success(result.message);

            router.push("/dashboard/flight-destinations");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to save destination"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6 pb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <Link
                        href="/dashboard/flight-destinations"
                        className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#538440]"
                    >
                        <ArrowLeft size={16} />
                        Back to destinations
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-900">
                        {edit ? "Edit Destination" : "Create Destination"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your flight destination landing page.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleSubmit("DRAFT")}
                        className="rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                    >
                        Save Draft
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleSubmit("PUBLISHED")}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#538440] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3f6632] disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        {loading ? "Saving..." : "Publish"}
                    </button>
                </div>
            </div>

            {/* Basic Information */}
            <section className="space-y-5 rounded-xl border bg-white p-5 md:p-6">
                <div>
                    <h2 className="text-lg font-semibold">Basic Information</h2>
                    <p className="text-sm text-gray-500">
                        Enter the destination page details.
                    </p>
                </div>

                <div>
                    <label className={labelClass}>Page Title *</label>
                    <input
                        className={inputClass}
                        placeholder="Flights to London"
                        value={form.title}
                        onChange={(e) => {
                            const title = e.target.value;
                            setForm((prev) => ({
                                ...prev,
                                title,
                                ...(prev.slug === "" || prev.slug === generateSlug(prev.title)
                                    ? { slug: generateSlug(title) }
                                    : {}),
                            }));
                        }}
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>URL Slug *</label>
                        <input
                            className={inputClass}
                            placeholder="flights-to-london"
                            value={form.slug}
                            onChange={(e) => update("slug", generateSlug(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Airport Code</label>
                        <input
                            className={inputClass}
                            placeholder="LHR"
                            maxLength={4}
                            value={form.airportCode || ""}
                            onChange={(e) =>
                                update("airportCode", e.target.value.toUpperCase())
                            }
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Destination *</label>
                        <input
                            className={inputClass}
                            placeholder="London"
                            value={form.destination}
                            onChange={(e) => update("destination", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Country *</label>
                        <input
                            className={inputClass}
                            placeholder="United Kingdom"
                            value={form.country}
                            onChange={(e) => update("country", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Short Description</label>
                    <textarea
                        className={inputClass}
                        rows={3}
                        placeholder="Write a short introduction about this destination..."
                        value={form.excerpt || ""}
                        onChange={(e) => update("excerpt", e.target.value)}
                    />
                </div>
            </section>

            {/* Hero Image */}
         {/* Hero Image */}
<section className="space-y-4 rounded-xl border bg-white p-5 md:p-6">
    <div>
        <h2 className="text-lg font-semibold">Hero Image</h2>
        <p className="text-sm text-gray-500">
            Upload the main destination banner image.
        </p>
    </div>

    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition hover:border-[#538440] hover:bg-green-50">
        {heroUploading ? (
            <Loader2 size={30} className="mb-3 animate-spin text-[#538440]" />
        ) : (
            <Upload size={30} className="mb-3 text-gray-500" />
        )}

        <span className="text-sm font-semibold text-gray-700">
            {heroUploading ? "Uploading image..." : "Click to upload hero image"}
        </span>

        <span className="mt-1 text-xs text-gray-400">
            JPG, PNG, WEBP, GIF or AVIF · Maximum 5 MB
        </span>

        <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            className="hidden"
            disabled={heroUploading}
            onChange={async (e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                setHeroUploading(true);

                try {
                    await uploadImage(file, (url) => {
                        update("heroImage", url);
                    });
                } finally {
                    setHeroUploading(false);
                    e.target.value = "";
                }
            }}
        />
    </label>

    {form.heroImage && (
        <div className="relative max-w-xl overflow-hidden rounded-xl border">
            <img
                src={form.heroImage}
                alt="Destination hero preview"
                className="h-56 w-full object-cover"
            />

            <button
                type="button"
                onClick={() => update("heroImage", "")}
                className="absolute right-3 top-3 rounded-lg bg-white p-2 text-red-600 shadow-md transition hover:bg-red-50"
            >
                <Trash2 size={17} />
            </button>

            <div className="bg-gray-50 px-3 py-2 text-xs text-gray-500">
                Hero image uploaded successfully
            </div>
        </div>
    )}
</section>

            {/* Main Article */}
            <section className="space-y-4 rounded-xl border bg-white p-5 md:p-6">
                <div>
                    <h2 className="text-lg font-semibold">Main Article Content</h2>
                    <p className="text-sm text-gray-500">
                        Write the main destination article using the rich text editor.
                    </p>
                </div>

                <TiptapEditor
                    value={form.content}
                    onChange={(value) => update("content", value)}
                />
            </section>

            {/* Article Sections */}
            <section className="space-y-4 rounded-xl border bg-white p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold">Additional Sections</h2>
                        <p className="text-sm text-gray-500">
                            Add more headings and descriptions.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addSection}
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                        <Plus size={16} /> Add Section
                    </button>
                </div>

                {form.sections.map((section, index) => (
                    <div key={section.id} className="space-y-3 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">Section {index + 1}</h3>
                            <button
                                type="button"
                                onClick={() =>
                                    update("sections", form.sections.filter(
                                        (item) => item.id !== section.id
                                    ))
                                }
                                className="text-red-500"
                            >
                                <Trash2 size={17} />
                            </button>
                        </div>

                        <input
                            className={inputClass}
                            placeholder="Section heading"
                            value={section.heading}
                            onChange={(e) =>
                                updateSection(section.id, "heading", e.target.value)
                            }
                        />

                        <textarea
                            className={inputClass}
                            rows={4}
                            placeholder="Section description"
                            value={section.description}
                            onChange={(e) =>
                                updateSection(section.id, "description", e.target.value)
                            }
                        />
                    </div>
                ))}

                {form.sections.length === 0 && (
                    <p className="rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
                        No additional sections added.
                    </p>
                )}
            </section>

            {/* Related Flights */}
            <section className="space-y-4 rounded-xl border bg-white p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold">Related Flights</h2>
                        <p className="text-sm text-gray-500">
                            Add flight routes related to this destination.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addFlight}
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                        <Plus size={16} /> Add Flight
                    </button>
                </div>

              {form.relatedFlights.map((flight, index) => (
    <div key={flight.id} className="space-y-4 rounded-lg border p-4">
        <div className="flex justify-between">
            <h3 className="font-medium">Flight {index + 1}</h3>

            <button
                type="button"
                onClick={() =>
                    update(
                        "relatedFlights",
                        form.relatedFlights.filter(
                            (item) => item.id !== flight.id
                        )
                    )
                }
                className="text-red-500 hover:text-red-700"
            >
                <Trash2 size={17} />
            </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
            <input
                className={inputClass}
                placeholder="From: New York"
                value={flight.from}
                onChange={(e) =>
                    updateFlight(flight.id, "from", e.target.value)
                }
            />

            <input
                className={inputClass}
                placeholder="To: London"
                value={flight.to}
                onChange={(e) =>
                    updateFlight(flight.id, "to", e.target.value)
                }
            />

            <input
                className={inputClass}
                placeholder="Offer or starting price"
                value={flight.offer}
                onChange={(e) =>
                    updateFlight(flight.id, "offer", e.target.value)
                }
            />

            {/* Flight Image Upload */}
            <div className="space-y-2">
                <label className={labelClass}>Flight Image</label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 text-sm text-gray-600 transition hover:border-[#538440] hover:bg-green-50">
                    {flightUploading === flight.id ? (
                        <Loader2
                            size={18}
                            className="animate-spin text-[#538440]"
                        />
                    ) : (
                        <Upload size={18} />
                    )}

                    {flightUploading === flight.id
                        ? "Uploading..."
                        : "Choose Flight Image"}

                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                        className="hidden"
                        disabled={flightUploading === flight.id}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];

                            if (!file) return;

                            setFlightUploading(flight.id);

                            try {
                                await uploadImage(file, (url) => {
                                    updateFlight(
                                        flight.id,
                                        "image",
                                        url
                                    );
                                });
                            } finally {
                                setFlightUploading(null);
                                e.target.value = "";
                            }
                        }}
                    />
                </label>

                {flight.image && (
                    <div className="relative overflow-hidden rounded-lg border">
                        <img
                            src={flight.image}
                            alt={`${flight.from} to ${flight.to}`}
                            className="h-36 w-full rounded-lg object-cover"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                updateFlight(flight.id, "image", "")
                            }
                            className="absolute right-2 top-2 rounded-lg bg-white p-2 text-red-600 shadow-md hover:bg-red-50"
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                )}
            </div>
        </div>

        <input
            className={inputClass}
            placeholder="Flight page URL"
            value={flight.href}
            onChange={(e) =>
                updateFlight(flight.id, "href", e.target.value)
            }
        />
    </div>
))}
                {form.relatedFlights.length === 0 && (
                    <p className="rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
                        No related flights added.
                    </p>
                )}
            </section>

            {/* FAQs */}
            <section className="space-y-4 rounded-xl border bg-white p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
                        <p className="text-sm text-gray-500">
                            Add destination-specific FAQs.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addFAQ}
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                        <Plus size={16} /> Add FAQ
                    </button>
                </div>

                {form.faqs.map((faq, index) => (
                    <div key={faq.id} className="space-y-3 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">FAQ {index + 1}</h3>
                            <button
                                type="button"
                                onClick={() =>
                                    update("faqs", form.faqs.filter(
                                        (item) => item.id !== faq.id
                                    ))
                                }
                                className="text-red-500"
                            >
                                <Trash2 size={17} />
                            </button>
                        </div>

                        <input
                            className={inputClass}
                            placeholder="Question"
                            value={faq.question}
                            onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
                        />

                        <textarea
                            className={inputClass}
                            rows={3}
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                        />
                    </div>
                ))}
            </section>

            {/* SEO */}
            <section className="space-y-4 rounded-xl border bg-white p-5 md:p-6">
                <div>
                    <h2 className="text-lg font-semibold">SEO Settings</h2>
                    <p className="text-sm text-gray-500">
                        Optimize your flight destination page for search engines.
                    </p>
                </div>

                <div>
                    <label className={labelClass}>Focus Keyword</label>
                    <input
                        className={inputClass}
                        placeholder="Flights to London"
                        value={form.focusKeyword || ""}
                        onChange={(e) => update("focusKeyword", e.target.value)}
                    />
                </div>

                <div>
                    <label className={labelClass}>Meta Title</label>
                    <input
                        className={inputClass}
                        maxLength={70}
                        placeholder="Flights to London | SkyFlyWithUs"
                        value={form.metaTitle || ""}
                        onChange={(e) => update("metaTitle", e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        {(form.metaTitle || "").length}/70 characters
                    </p>
                </div>

                <div>
                    <label className={labelClass}>Meta Description</label>
                    <textarea
                        className={inputClass}
                        rows={3}
                        maxLength={170}
                        placeholder="Discover flights to London..."
                        value={form.metaDescription || ""}
                        onChange={(e) => update("metaDescription", e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        {(form.metaDescription || "").length}/170 characters
                    </p>
                </div>

                <div>
                    <label className={labelClass}>Meta Keywords</label>
                    <input
                        className={inputClass}
                        placeholder="flights to London, cheap flights, London flights"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Separate keywords using commas.
                    </p>
                </div>
            </section>

            <div className="flex flex-wrap justify-end gap-3">
                <Link
                    href="/dashboard/flight-destinations"
                    className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
                >
                    Cancel
                </Link>

                <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSubmit("DRAFT")}
                    className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                >
                    Save Draft
                </button>

                <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSubmit("PUBLISHED")}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#538440] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3f6632] disabled:opacity-50"
                >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {edit ? "Update Destination" : "Publish Destination"}
                </button>
            </div>
        </div>
    );
}