'use client';

import { useEffect, useRef } from 'react';

export default function Banner728x90() {
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
                    'key' : '902fd7bb53e5c530ed5c74f8aac32749',
                    'format' : 'iframe',
                    'height' : 90,
                    'width' : 728,
                    'params' : {}
                };
            `;
            containerRef.current.appendChild(script1);

            const script2 = document.createElement('script');
            script2.type = 'text/javascript';
            script2.src = 'https://www.highperformanceformat.com/902fd7bb53e5c530ed5c74f8aac32749/invoke.js';
            containerRef.current.appendChild(script2);
        }
    }, []);

    // hidden md:block hides it on mobile
    return (
        <div className="my-4 hidden md:flex justify-center w-full">
            <div ref={containerRef}></div>
        </div>
    );
}
