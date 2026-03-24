import { BlogGridSkeleton } from "@/components/blog_components/blog-skeleton";

export default function CategoryLoading() {
  return (
    <main className="w-full min-h-screen bg-[#FFF5EB]/50 py-24">
      <div className="container mx-auto px-6 mt-10">
        
        {/* Header Skeleton specifically for Category style */}
        <div className="text-center mb-16 animate-pulse">
          {/* Breadcrumb skeleton */}
          <div className="flex justify-center items-center mb-3">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-100 mx-2 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
          
          {/* Title skeleton */}
          <div className="h-14 w-3/4 md:w-1/2 bg-gray-200 rounded-lg mx-auto mb-6" />
          
          {/* Description line skeleton */}
          <div className="h-6 w-full max-w-2xl bg-gray-200 rounded mx-auto" />
        </div>

        {/* Reusing the Grid Skeleton we made earlier */}
        <BlogGridSkeleton />

        {/* Pagination placeholder */}
        <div className="mt-16 flex justify-center">
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      
      </div>
    </main>
  );
}