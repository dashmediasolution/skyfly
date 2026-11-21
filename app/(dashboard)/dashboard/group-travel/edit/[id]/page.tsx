"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Users } from "lucide-react";
import { toast } from "sonner";

import GroupTravelForm from "@/app/(dashboard)/_components/GroupTravelForm";

export default function EditGroupTravelPage() {
    const params = useParams();
    const id = params?.id as string;

    const [groupTravel, setGroupTravel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchGroupTravel = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/admin/group-travel/${id}`,
                    {
                        cache: "no-store",
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        result.error ||
                        "Failed to fetch group travel."
                    );
                }

                setGroupTravel(result.groupTravel);
            } catch (error) {
                console.error("FETCH GROUP TRAVEL ERROR:", error);

                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to load group travel."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGroupTravel();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-[#538440]" />

                    <p className="text-sm text-gray-500">
                        Loading group travel details...
                    </p>
                </div>
            </div>
        );
    }

    if (!groupTravel) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <Users size={25} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900">
                        Group Travel Not Found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        The group travel page may have been deleted or the URL is invalid.
                    </p>

                    <Link
                        href="/dashboard/group-travel"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#538440] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3F6632]"
                    >
                        <ArrowLeft size={16} />
                        Back to Group Travel
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F9F6] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/dashboard/group-travel"
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#538440]"
                    >
                        <ArrowLeft size={17} />
                        Back to Group Travel
                    </Link>

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF2E6] text-[#538440]">
                                <Users size={23} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    Edit Group Travel
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update your group travel details, content and SEO settings.
                                </p>
                            </div>
                        </div>

                        <span
                            className={`inline-flex w-fit items-center rounded-full px-3 py-2 text-xs font-semibold ${
                                groupTravel.status === "PUBLISHED"
                                    ? "bg-green-100 text-green-700"
                                    : groupTravel.status === "ARCHIVED"
                                      ? "bg-gray-100 text-gray-700"
                                      : "bg-amber-100 text-amber-700"
                            }`}
                        >
                            {groupTravel.status}
                        </span>
                    </div>
                </div>

                {/* Group Travel Form */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                    <GroupTravelForm
                        key={groupTravel.id}
                        initialData={groupTravel}
                        isEdit={true}
                    />
                </div>

                <p className="mt-5 text-center text-xs text-gray-400">
                    SkyFlyWithUs Admin Dashboard
                </p>
            </div>
        </main>
    );
}