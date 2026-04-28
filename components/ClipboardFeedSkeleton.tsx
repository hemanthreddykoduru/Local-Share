import SnippetCardSkeleton from './SnippetCardSkeleton';
import { Skeleton } from './Skeleton';

export default function ClipboardFeedSkeleton() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          {/* Title Skeleton */}
          <Skeleton className="w-48 h-6 mb-2" />
          {/* Subtitle Skeleton */}
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex gap-2">
          {/* Room Buttons Skeleton */}
          <Skeleton className="w-28 h-9 rounded-lg" />
          <Skeleton className="w-24 h-9 rounded-lg" />
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <SnippetCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
