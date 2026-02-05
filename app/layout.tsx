import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL('https://local-share.tech'),
    title: 'Local Share - GPS Clipboard',
    description: 'Local Share tool: Instantly share text, links, and messages with people nearby. No login required. The easiest way to share locally for communities and events.',
    keywords: 'local share, share locally, location based chat, nearby text drop, anonymous local sharing, gps clipboard, community board, geo chat',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    themeColor: '#0ea5e9',
    manifest: '/manifest.json',
    openGraph: {
        title: 'Local Share - GPS Clipboard',
        description: 'Local Share tool: Instantly share text with people nearby using GPS. No login needed.',
        siteName: 'Local Share',
        type: 'website',
        url: 'https://local-share.tech',
    },
    twitter: {
        card: 'summary',
        title: 'Local Share - GPS Clipboard',
        description: 'Local Share tool: Instantly share text with people nearby using GPS.',
    },
    icons: {
        icon: '/icon-192.png',
        shortcut: '/icon-192.png',
        apple: '/icon-192.png',
    },
    alternates: {
        canonical: '/',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
                {/* Google AdSense */}
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334356671488767"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://reschema.org',
                            '@type': 'SoftwareApplication',
                            'name': 'Local Share',
                            'url': 'https://local-share.tech',
                            'applicationCategory': 'SocialNetworkingApplication',
                            'operatingSystem': 'Any',
                            'description': 'Instantly share text, links, and messages with people nearby using GPS. No login required.',
                            'offers': {
                                '@type': 'Offer',
                                'price': '0',
                                'priceCurrency': 'USD'
                            }
                        })
                    }}
                />
            </body>
        </html>
    );
}
