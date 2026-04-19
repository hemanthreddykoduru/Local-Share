'use client';

import { useEffect, useRef } from 'react';

export default function Popunder() {
    const isLoaded = useRef(false);

    useEffect(() => {
        if (isLoaded.current) return;
        isLoaded.current = true;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://tightslybella.com/99/39/a8/9939a88a4b01fd4915f1a68ac3c68af3.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return null;
}
