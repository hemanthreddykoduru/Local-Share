'use client';

import { useEffect, useState } from 'react';

export default function AdBlockDetector() {
    const [adBlockDetected, setAdBlockDetected] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const baitClass = 'adsbygoogle ad-banner';
        const baitStyle = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;';

        // 1. Create Bait Element
        const bait = document.createElement('div');
        bait.className = baitClass;
        bait.style.cssText = baitStyle;
        document.body.appendChild(bait);

        const detect = async () => {
            let detected = false;

            // Check A: Bait Element Properties
            if (
                !bait ||
                bait.offsetParent === null ||
                bait.offsetHeight === 0 ||
                bait.offsetLeft === 0 ||
                bait.offsetTop === 0 ||
                window.getComputedStyle(bait).display === 'none' ||
                window.getComputedStyle(bait).visibility === 'hidden'
            ) {
                detected = true;
                console.log('AdBlock detected via Bait Element');
            }

            // Check B: Script Injection
            if (!detected) {
                try {
                    // Check 1: Google Ads
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                        script.onerror = () => reject(new Error('Blocked Google'));
                        script.onload = () => { script.remove(); resolve(); };
                        document.head.appendChild(script);
                    });

                    // Check 2: Adsterra
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = 'https://www.highperformanceformat.com/841b7e7d333e3d24d3fdbae0c58425ef/invoke.js';
                        script.onerror = () => reject(new Error('Blocked AdNetwork'));
                        script.onload = () => { script.remove(); resolve(); };
                        document.head.appendChild(script);
                    });
                } catch (e) {
                    detected = true;
                    console.log('AdBlock detected via Script Error:', e instanceof Error ? e.message : 'Unknown error');
                }
            }

            // Check C: Generic Class
            if (!detected) {
                const testAd = document.createElement('div');
                testAd.innerHTML = '&nbsp;';
                testAd.className = 'adsbox';
                document.body.appendChild(testAd);
                if (testAd.offsetHeight === 0) {
                    detected = true;
                    console.log('AdBlock detected via Generic Class Block');
                }
                testAd.remove();
            }

            if (isMounted && detected) {
                setAdBlockDetected(true);
            }

            // Cleanup bait
            if (document.body.contains(bait)) {
                document.body.removeChild(bait);
            }
        };

        const timeoutId = setTimeout(detect, 0);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
            if (document.body.contains(bait)) {
                document.body.removeChild(bait);
            }
        };
    }, []);

    if (!adBlockDetected) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-gray-900/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center border border-gray-200 animate-in fade-in zoom-in duration-300">
                <div className="mb-6 flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full ring-4 ring-red-50">
                        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Ad Blocker Detected
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    We&apos;ve detected that you are using an ad blocker. Our service is free thanks to our sponsors.
                    <br /><br />
                    <span className="font-semibold text-gray-900 bg-red-50 px-2 py-1 rounded">
                        Please disable your ad blocker to continue using Local Share.
                    </span>
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-xl hover:shadow-primary-500/25 transform hover:-translate-y-0.5"
                    >
                        I&apos;ve Disabled It, Refresh Page
                    </button>
                    <p className="text-sm text-gray-400">
                        Refresh required after disabling
                    </p>
                </div>
            </div>
        </div>
    );
}
