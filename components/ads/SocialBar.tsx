'use client';

import { useEffect, useRef } from 'react';

export default function SocialBar() {
    const isLoaded = useRef(false);

    useEffect(() => {
        if (isLoaded.current) return;
        isLoaded.current = true;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//pl28633299.profitablecpmratenetwork.com/83/bb/92/83bb92b15ba14dc9d8d5247d64086800.js';
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
