interface RelatedPost {
    title: string;
    description: string;
    href: string;
    category: string;
}

const ALL_POSTS: RelatedPost[] = [
    {
        title: "Privacy-First Design",
        description: "How we built a tool that never stores your exact location.",
        href: "/blog/privacy-first-design",
        category: "Deep Dive"
    },
    {
        title: "Classroom Collaboration Guide",
        description: "10 ways teachers can use Local Share instantly.",
        href: "/blog/classroom-collaboration-guide",
        category: "Education"
    },
    {
        title: "Share WiFi Instantly",
        description: "Stop spelling out complex WiFi passwords for guests.",
        href: "/blog/share-wifi-passwords",
        category: "Tips"
    },
    {
        title: "Event Networking",
        description: "How to run conferences without mandatory apps.",
        href: "/blog/event-networking",
        category: "Events"
    },
    {
        title: "How Geo-Cells Work",
        description: "The technical architecture behind our local matching.",
        href: "/blog/how-geo-cells-work",
        category: "Technical"
    },
    {
        title: "Local Networking Without Apps",
        description: "Why the browser is the perfect medium for local sharing.",
        href: "/blog/local-networking-without-apps",
        category: "Opinion"
    },
    {
        title: "Top 5 Usage Ideas",
        description: "Creative ways to utilize GPS clipboards in daily life.",
        href: "/blog/top-usage-ideas",
        category: "Inspiration"
    },
    {
        title: "Secure Local Sharing",
        description: "Understanding the security mechanics of anonymous sharing.",
        href: "/blog/secure-local-sharing",
        category: "Security"
    }
];

interface RelatedPostsProps {
    currentPath: string;
}

export default function RelatedPosts({ currentPath }: RelatedPostsProps) {
    // Filter out the current post and grab 3 random posts
    const availablePosts = ALL_POSTS.filter(post => post.href !== currentPath);

    // Simple deterministic shuffle based on path length to keep SSR stable
    const shuffled = [...availablePosts].sort((a, b) => {
        const hashA = (a.title.length * currentPath.length) % 10;
        const hashB = (b.title.length * currentPath.length) % 10;
        return hashA - hashB;
    });

    const selectedPosts = shuffled.slice(0, 3);

    return (
        <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Read More Like This</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {selectedPosts.map((post) => (
                    <a
                        key={post.href}
                        href={post.href}
                        className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all block group"
                    >
                        <div className="text-xs font-semibold text-primary-600 uppercase mb-2 group-hover:text-primary-700">{post.category}</div>
                        <h3 className="font-bold text-gray-800 mb-2 group-hover:text-primary-600">{post.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
