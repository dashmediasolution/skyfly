export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
          {/* Image Placeholder */}
          <div className="w-full h-56 bg-gray-200" />
          
          <div className="p-6 space-y-4">
            {/* Category Badge */}
            <div className="h-4 w-24 bg-gray-200 rounded" />
            {/* Title lines */}
            <div className="space-y-2">
              <div className="h-6 w-full bg-gray-200 rounded" />
              <div className="h-6 w-2/3 bg-gray-200 rounded" />
            </div>
            {/* Footer info */}
            <div className="flex items-center gap-3 pt-4">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}