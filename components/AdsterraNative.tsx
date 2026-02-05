'use client';

import { useEffect, useRef } from 'react';

export default function AdsterraNative() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Native script logic
        // <script async="async" data-cfasync="false" src="https://pl28633303.effectivegatecpm.com/d5023381f48ff6861b638f9b0cb87e69/invoke.js"></script>
        // <div id="container-d5023381f48ff6861b638f9b0cb87e69"></div>

        const container = containerRef.current;
        if (!container) return;

        // Check if script already exists to prevent double loading
        if (container.querySelector('script')) return;

        const script = document.createElement('script');
        script.async = true;
        script.dataset.cfasync = "false";
        script.src = "https://pl28633303.effectivegatecpm.com/d5023381f48ff6861b638f9b0cb87e69/invoke.js";

        const div = document.createElement('div');
        div.id = "container-d5023381f48ff6861b638f9b0cb87e69";

        // Append div first, then script
        container.appendChild(div);
        container.appendChild(script);

        return () => {
            // Cleanup tricky because external script might have modified DOM outside container
            // ideally we just clear container
            if (container) container.innerHTML = '';
        };
    }, []);

    return (
        <div ref={containerRef} className="my-6 min-h-[100px]" />
    );
}
