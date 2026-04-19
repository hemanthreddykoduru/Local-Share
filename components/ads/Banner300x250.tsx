'use client';

import { useEffect, useRef } from 'react';

export default function Banner300x250() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isLoaded = useRef(false);

    useEffect(() => {
        if (isLoaded.current) return;

        if (containerRef.current) {
            isLoaded.current = true;
            
            const script1 = document.createElement('script');
            script1.type = 'text/javascript';
            script1.innerHTML = `
                atOptions = {
                    'key' : '5f28dddeac0af206a191aa42e6e74557',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                };
            `;
            containerRef.current.appendChild(script1);

            const script2 = document.createElement('script');
            script2.type = 'text/javascript';
            script2.src = 'https://www.highperformanceformat.com/5f28dddeac0af206a191aa42e6e74557/invoke.js';
            containerRef.current.appendChild(script2);
        }
    }, []);

    return (
        <div className="my-6 flex justify-center w-full">
            <div ref={containerRef}></div>
        </div>
    );
}
