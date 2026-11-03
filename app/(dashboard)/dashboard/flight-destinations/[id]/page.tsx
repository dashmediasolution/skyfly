
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import DestinationForm from "../_components/DestinationForm";
type Destination = {
    id: string;
    title: string;
    slug: string;
    destination: string;
    country: string;
    airportCode: string | null;
    excerpt: string | null;
    content: string;
    heroImage: string | null;
    sections: {
        id: string;
        heading: string;
        description: string;
    }[];
    relatedFlights: {
        id: string;
        from: string;
        to: string;
        offer: string;
        image: string;
        href: string;
    }[];
    faqs: {
        id: string;
        question: string;
        answer: string;
    }[];
    focusKeyword: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string[];
    status: string;
};

export default function EditDestinationPage() {
     const router = useRouter();

    const [destination, setDestination] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);
const params = useParams();
const id = params?.id as string;
    useEffect(() => {
        async function fetchDestination() {
            try {
                const response = await fetch(
                    `/api/admin/flight-destinations/${id}`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch destination"
                    );
                }

                const data = result.destination || result.data || result;

                setDestination({
                    ...data,
                    id: data.id || data._id,
                    airportCode: data.airportCode || "",
                    excerpt: data.excerpt || "",
                    heroImage: data.heroImage || "",
                    sections: data.sections || [],
                    relatedFlights: data.relatedFlights || [],
                    faqs: data.faqs || [],
                    focusKeyword: data.focusKeyword || "",
                    metaTitle: data.metaTitle || "",
                    metaDescription: data.metaDescription || "",
                    metaKeywords: data.metaKeywords || [],
                    content: data.content || "<p></p>",
                });
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to load destination"
                );

                router.push("/dashboard/flight-destinations");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchDestination();
        }
    }, [id, router]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin text-[#538440]" />
                    Loading destination...
                </div>
            </div>
        );
    }

    if (!destination) {
        return null;
    }

    return (
        <DestinationForm
            initialData={destination}
            edit={true}
        />
    );
}
