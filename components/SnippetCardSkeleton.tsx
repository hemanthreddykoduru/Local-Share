import { Skeleton } from './Skeleton';

export default function SnippetCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-fade-in">
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {/* Avatar Skeleton */}
          <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
          <div className="min-w-0">
            {/* Alias Skeleton */}
            <Skeleton className="w-24 h-4 mb-1" />
            {/* Time Skeleton */}
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Action Buttons Skeleton */}
          <Skeleton className="w-12 h-8 rounded-xl" />
          <Skeleton className="w-12 h-8 rounded-xl" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-3/4 h-4 mb-2" />
        <Skeleton className="w-1/2 h-4" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="w-20 h-3" />
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
  );
}
