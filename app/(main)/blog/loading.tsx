import { BlogGridSkeleton } from "@/components/blog_components/blog-skeleton";

export default function BlogLoading() {
  return (
    <main className="w-full min-h-screen bg-[#FFF5EB]/50 py-24">
      <div className="container mx-auto px-6 mt-10">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center mb-16 animate-pulse">
          <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
          <div className="h-12 w-64 bg-gray-200 rounded mb-6" />
          <div className="h-6 w-full max-w-xl bg-gray-200 rounded" />
        </div>

        {/* Grid Skeleton */}
        <BlogGridSkeleton />
      </div>
    </main>
  );
}