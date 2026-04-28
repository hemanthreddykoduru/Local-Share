import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Skeleton */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div>
                <Skeleton className="w-32 h-6 mb-1" />
                <Skeleton className="w-48 h-3" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="w-24 h-9 rounded-lg" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-grow">
        {/* Content Skeleton */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Skeleton className="w-3/4 h-8 mb-4" />
            <Skeleton className="w-full h-32 rounded-xl mb-4" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </section>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-48 h-6" />
              <div className="flex gap-2">
                <Skeleton className="w-24 h-8 rounded-lg" />
                <Skeleton className="w-24 h-8 rounded-lg" />
              </div>
            </div>
            <Skeleton className="w-full h-40 rounded-2xl" />
            <Skeleton className="w-full h-40 rounded-2xl" />
            <Skeleton className="w-full h-40 rounded-2xl" />
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
          <Skeleton className="w-64 h-4 mx-auto mb-2" />
          <Skeleton className="w-48 h-3 mx-auto" />
        </div>
      </footer>
    </div>
  );
}
