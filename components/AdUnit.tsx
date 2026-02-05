'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    className?: string;
    style?: React.CSSProperties;
}

// Replace this with your actual Publisher ID from Google AdSense
const CLIENT_ID = 'ca-pub-6334356671488767';

export default function AdUnit({ slotId, format = 'auto', className = '', style }: AdUnitProps) {
    const isDev = process.env.NODE_ENV === 'development';
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        if (adRef.current && !isDev) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error('AdSense error:', err);
            }
        }
    }, [isDev]);

    if (isDev) {
        return (
            <div
                className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 ${className}`}
                style={{ minHeight: '100px', ...style }}
            >
                <span className="font-semibold text-sm">Ad Advertisement Placeholder</span>
                <span className="text-xs mt-1">(Visible in Dev Mode)</span>
                <span className="text-xs mt-1">Slot: {slotId}</span>
            </div>
        );
    }

    return (
        <div className={`text-center overflow-hidden ${className}`} style={style}>
            <ins
                ref={adRef}
                className="adsbygoogle block"
                data-ad-client={CLIENT_ID}
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
