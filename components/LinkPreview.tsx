'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface LinkPreviewProps {
    url: string;
}

export default function LinkPreview({ url }: LinkPreviewProps) {
    const { data, error, isLoading } = useSWR(`https://api.microlink.io/?url=${encodeURIComponent(url)}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 3600000 // Only re-fetch if component unmounts and remounts 1 hour later
    });

    if (error) return null; // Fallback gracefully if API fails

    if (isLoading) {
        return (
            <div className="animate-pulse flex items-center border border-gray-200 bg-gray-50 rounded-lg overflow-hidden h-24 mt-3">
                <div className="w-24 h-full bg-gray-200 flex-shrink-0"></div>
                <div className="p-3 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (!data || data.status !== 'success' || !data.data) {
        return null;
    }

    const { title, description, image, url: targetUrl } = data.data;
    const imageUrl = image?.url;

    // Determine hostname to show as fallback
    let hostname = url;
    try {
        hostname = new URL(targetUrl || url).hostname;
    } catch (e) {
        // Safe fallback
    }

    return (
        <a 
            href={targetUrl || url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-stretch border border-gray-200 bg-white hover:bg-gray-50 transition-colors rounded-lg overflow-hidden max-w-full group mt-3 no-underline shadow-sm hover:shadow"
        >
            {imageUrl && (
                <div className="w-24 sm:w-28 flex-shrink-0 bg-gray-100 border-r border-gray-200 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={imageUrl} 
                        alt={title || 'Link preview'} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                </div>
            )}
            <div className="p-3 flex-1 flex flex-col justify-center min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate mb-1">
                    {title || hostname}
                </h4>
                {description && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </a>
    );
}
