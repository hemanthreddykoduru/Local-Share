import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <SiteHeader />
            <div className="max-w-3xl mx-auto prose py-12 px-4 flex-grow">
                <h1>Privacy Policy for GPS Clipboard</h1>
                <p>Last updated: January 22, 2026</p>

                <h2>1. Introduction</h2>
                <p>Welcome to GPS Clipboard. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>

                <h2>2. Data We Collect</h2>
                <p>Unlike other platforms, we collect minimal data:</p>
                <ul>
                    <li><strong>Location Data:</strong> We use your GPS coordinates solely to categorize your &quot;geo-cell&quot; for matching you with nearby users. This precise location is processed on your device and converted into a grid index. We do not store your exact history of movements.</li>
                    <li><strong>Messages:</strong> Text snippets you post are stored temporarily and automatically expire after 1 hour.</li>
                </ul>

                <h2>3. Cookies and Web Beacons</h2>
                <p>Like any other website, GPS Clipboard uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.</p>

                <h2>4. Google DoubleClick DART Cookie</h2>
                <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to local-share.tech and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>

                <h2>5. Advertising Partners Privacy Policies</h2>
                <p>You may consult this list to find the Privacy Policy for each of the advertising partners of GPS Clipboard.</p>
                <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on GPS Clipboard, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
                <p>Note that GPS Clipboard has no access to or control over these cookies that are used by third-party advertisers.</p>

                <h2>6. Consent</h2>
                <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>

                <div className="mt-8 pt-8 border-t">
                </div>
            </div>
            <SiteFooter />
        </main>
    );
}
