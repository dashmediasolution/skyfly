export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-[#FFF5EB]/50 py-24">
      <div className="container mx-auto px-6 mt-10">
        
        {/* Back button skeleton */}
        <div className="h-4 w-32 bg-gray-200 rounded mb-8 animate-pulse" />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-8 animate-pulse">
            
            {/* Title & Metadata Area */}
            <div className="space-y-4">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded" />
              <div className="h-10 w-3/4 bg-gray-200 rounded" />
              <div className="flex items-center gap-4 pt-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Featured Image placeholder */}
            <div className="w-full h-[400px] bg-gray-200 rounded-2xl" />

            {/* Content paragraph blocks */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 space-y-6">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-5/6 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-6 animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}