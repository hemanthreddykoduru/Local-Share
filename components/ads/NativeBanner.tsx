'use client';

import { useEffect, useRef } from 'react';

export default function NativeBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isLoaded = useRef(false);

    useEffect(() => {
        if (isLoaded.current) return;

        if (containerRef.current) {
            isLoaded.current = true;
            const script = document.createElement('script');
            script.async = true;
            script.dataset.cfasync = 'false';
            script.src = 'https://pl28633303.profitablecpmratenetwork.com/d5023381f48ff6861b638f9b0cb87e69/invoke.js';
            
            containerRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="my-8 flex justify-center w-full">
            <div ref={containerRef} id="container-d5023381f48ff6861b638f9b0cb87e69"></div>
        </div>
    );
}
