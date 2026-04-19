import { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AuthorBio from '@/components/AuthorBio';
import RelatedPosts from '@/components/RelatedPosts';
export const metadata: Metadata = {
    title: 'How Geo-Cells Work - The Tech Behind GPS Clipboard',
    description: 'A deep dive into the coordinate grid system and geospatial hashing used to power our anonymous local sharing network.',
};

export default function HowGeoCellsWork() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <SiteHeader />
            <article className="max-w-3xl mx-auto px-4 py-16 flex-grow">
                <div className="mb-8">
                    <AdUnit slotId="BLOG_POST_TOP_AD" format="auto" />
                </div>
                <header className="mb-12 text-center">
                    <div className="text-sm font-semibold text-purple-600 uppercase tracking-widest mb-4">Technology Deep Dive</div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Under the Hood: How Geo-Cells Connect You</h1>
                    <div className="flex items-center justify-center text-gray-500 text-sm">
                        <span>Published on January 23, 2026</span>
                        <span className="mx-2">•</span>
                        <span>4 min read</span>
                    </div>
                </header>

                <div className="prose prose-lg mx-auto text-gray-700">
                    <p className="lead text-xl text-gray-600 mb-8">
                        One of the most frequent questions we get is: &quot;How do you know who is near me without tracking where I am?&quot; The answer lies in a concept called Geospatial Lattice Mapping, or as we call them, &quot;Geo-Cells&quot;.
                    </p>

                    <h2>The Privacy Paradox</h2>
                    <p>
                        Traditional location apps work by sending your exact latitude and longitude (e.g., 37.7749, -122.4194) to a central server. The server then calculates the distance between you and every other user using the Haversine formula.
                    </p>
                    <p>
                        <strong>The problem?</strong> To do this, the server must know exactly where you are at all times. This is a privacy nightmare. We wanted a system where the server works blind—connecting people without ever knowing their precise location.
                    </p>

                    <h2>The Solution: The 4-Decimal Grid</h2>
                    <p>
                        Instead of sending raw coordinates, GPS Clipboard performs a &quot;rounding&quot; operation on your device before any data leaves your phone.
                    </p>
                    <ul>
                        <li><strong>Raw Latitude:</strong> 37.7749281 (Pinpoints you to a specific chair)</li>
                        <li><strong>Rounded Latitude:</strong> 37.77 (Pinpoints you to a city block)</li>
                    </ul>
                    <p>
                        By truncating coordinates to roughly 3-4 decimal places, we create a discrete &quot;Bucket&quot; or &quot;Cell&quot;.
                    </p>

                    <h3>How the Algorithm Works</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {`// Simplified Geo-Cell Calculation
function getGeoCell(lat, lon) {
  // Round to ~11 meters precision
  const latGrid = Math.floor(lat * 10000); 
  const lonGrid = Math.floor(lon * 10000);
  
  // Create a unique string ID for this box
  return \`cell_\${latGrid}_\${lonGrid}\`;
}`}
                    </pre>
                    <p>
                        When you post a message, your phone says: <em>&quot;I am in Box #8492. Here is a message for Box #8492.&quot;</em>
                    </p>
                    <p>
                        The server simply stores the message in Box #8492. It has no idea where inside that box you are, or who else is there. It just acts as a dumb mailbox for that specific grid ID.
                    </p>

                    <h2>Why this matters for Speed</h2>
                    <p>
                        Privacy aside, this approach is incredibly fast. Calculating distances between thousands of users is computationally expensive ($O(n^2)$ complexity).
                    </p>
                    <p>
                        With Geo-Cells, looking up messages is an $O(1)$ operation. We just look up a single database key. This is why messages appear instantly, even if thousands of people are using the app simultaneously.
                    </p>

                    <h2>The &quot;Border Problem&quot;</h2>
                    <p>
                        What if you are standing exactly on the line between two cells? You might be 1 meter away from your friend, but if the invisible grid line separates you, you won&apos;t see their messages.
                    </p>
                    <p>
                        To solve this, our client actually subscribes you to your current cell <strong>plus the 8 surrounding neighbor cells</strong>. This ensures that even if you drift across a boundary, you stay connected to everyone in your immediate vicinity.
                    </p>

                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 my-8">
                        <h4 className="text-purple-900 font-bold mb-2">Did you know?</h4>
                        <p className="text-purple-800 text-sm">
                            This same logic is used by ride-sharing apps to find nearby drivers and by video games to load localized maps. It’s a battle-tested pattern for high-performance spatial computing.
                        </p>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Read Next</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <a href="/blog/secure-local-sharing" className="block p-6 border rounded-lg hover:bg-gray-50 transition">
                            <div className="text-primary-600 text-sm font-semibold mb-2">Privacy</div>
                            <div className="font-bold text-gray-900">Why Anonymous Local Sharing is Safer</div>
                        </a>
                        <a href="/blog/top-usage-ideas" className="block p-6 border rounded-lg hover:bg-gray-50 transition">
                            <div className="text-green-600 text-sm font-semibold mb-2">Guides</div>
                            <div className="font-bold text-gray-900">Top 5 Use Cases for Local Sharing</div>
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-sm">
                        If you&apos;re curious, open multiple incognito windows side-by-side or ask a colleague in the same room to open <a href="/" className="text-primary-600 hover:underline">Local Share</a>. You&apos;ll see the magic of geo-cells matching you instantly over WebSockets.
                    </p>
                </div>

                <AuthorBio />
                <RelatedPosts currentPath="/blog/how-geo-cells-work" />
            </article>

            <SiteFooter />
        </main>
    );
}
