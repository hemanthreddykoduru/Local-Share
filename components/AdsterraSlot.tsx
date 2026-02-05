'use client';

import { useEffect, useRef } from 'react';

interface AdsterraSlotProps {
    confKey: string;
    height: number;
    width: number;
    className?: string;
}

export default function AdsterraSlot({ confKey, height, width, className = '' }: AdsterraSlotProps) {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = bannerRef.current;
        if (!container) return;

        // Clean up previous content to avoid duplicates on re-renders
        container.innerHTML = '';

        // Create a friendly iframe to isolate the document.write call
        const iframe = document.createElement('iframe');
        iframe.style.width = `${width}px`;
        iframe.style.height = `${height}px`;
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'no';

        container.appendChild(iframe);

        // Content to write into the iframe
        const adScript = `
            <script type="text/javascript">
                atOptions = {
                    'key' : '${confKey}',
                    'format' : 'iframe',
                    'height' : ${height},
                    'width' : ${width},
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/${confKey}/invoke.js"></script>
        `;

        // Write the script to the iframe's document
        const dev = iframe.contentWindow?.document;
        if (dev) {
            dev.open();
            dev.write(adScript);
            dev.close();
        }

    }, [confKey, height, width]);

    return (
        <div
            ref={bannerRef}
            className={`flex justify-center items-center overflow-hidden rounded-lg bg-gray-50 mx-auto ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        />
    );
}
