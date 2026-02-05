import useSWR from 'swr';
import { fetchSnippetsForGeoCell } from '@/lib/firebase';
import { Snippet } from '@/types';
import { Timestamp } from 'firebase/firestore';

/**
 * Hook to fetch and cache clipboard snippets for a geo-cell
 * Uses SWR for automatic revalidation and caching
 */
export function useClipboard(geoCell: string | null) {
    const { data, error, mutate } = useSWR<Snippet[]>(
        geoCell ? `snippets-${geoCell}` : null,
        () => geoCell ? fetchSnippetsForGeoCell(geoCell) : [],
        {
            refreshInterval: 30000, // Refresh every 30 seconds
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );

    // Filter expired snippets on client side as backup
    const activeSnippets = data?.filter(snippet => {
        const expiresAt = snippet.expires_at as Timestamp;
        return expiresAt.toMillis() > Date.now();
    }) || [];

    return {
        snippets: activeSnippets,
        isLoading: !error && !data,
        error,
        refresh: mutate,
    };
}
