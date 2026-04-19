import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'How It Works | Local Share',
    description: 'Learn how Local Share uses geo-cells and secure private rooms to seamlessly connect devices nearby.',
};

export default function HowItWorks() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">How Local Share Works</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. GPS Proximity Mode</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    Local Share utilizes privacy-preserving GPS geo-cells to connect users who are physically close to each other. When you open the website and grant location access, your browser estimates your coordinates and snaps them to an anonymous "grid cell" (approximately 200m x 200m).
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    Anyone else who connects to that exact same grid cell will instantly join your real-time secure feed. We do not store or transmit your exact latitude and longitude, only the hashed identifier of the cell you fall into.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Private Rooms</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    If you prefer complete privacy or don't want to rely on GPS, you can create a <strong>Private Room</strong>. Clicking "Create Room" bypasses GPS tracking entirely and generates a secure, randomized 6-digit access code linked to a real-time Firestore database listener.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    You can show your automatically generated Room QR code to a friend, or tell them the 6-digit code. They will instantly join your secure room. When the room creator leaves or closes the tab, the room is completely destroyed and all users are kicked out automatically.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Data Ephemerality</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    Local Share is built fundamentally around the idea of data minimalism. There are no user accounts, no tracking cookies, and nothing is retained indefinitely. 
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>All GPS proximity messages automatically expire and delete themselves off the server after exactly 1 hour.</li>
                    <li>Private room messages are strictly tied to the existence of the room. When the room is destroyed, the messages disappear.</li>
                    <li>Your identity is represented by an anonymous superhero pseudonym (e.g. Iron Man, Wonder Woman) which resets every time you clear your session.</li>
                </ul>
            </section>

            <div className="bg-primary-50 rounded-xl p-8 text-center mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to try it out?</h3>
                <Link href="/" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Open Local Share
                </Link>
            </div>
        </div>
    );
}
