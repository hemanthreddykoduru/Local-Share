'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import SiteHeader from '@/components/SiteHeader';

function RedirectContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('id');
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!slug) {
      setError('No link ID provided.');
      return;
    }

    const fetchLink = async () => {
      try {
        const docRef = doc(db, 'pdf_links', slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPdfUrl(data.url);
          setFileName(data.file_name || 'Document.pdf');
          setOwnerId(data.owner_id || null);

          // Increment view count
          const { updateDoc, increment } = await import('firebase/firestore');
          await updateDoc(docRef, {
            views: increment(1)
          });
        } else {
          setError('This link does not exist or has expired.');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Something went wrong. Please try again later.');
      }
    };

    fetchLink();
  }, [slug]);

  const isOwner = currentUser && ownerId && currentUser.uid === ownerId;

  if (pdfUrl) {
    return (
      <div className="fixed inset-0 bg-[#0F172A] z-50 flex flex-col font-sans">
        {/* Viewer Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-sm z-20">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => window.location.href = '/'}
              className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center text-white font-black text-sm cursor-pointer shadow-md shadow-blue-100"
            >
               LS
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 truncate max-w-[150px] md:max-w-md">{fileName}</h1>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Shared via LocalShare</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <a 
               href={pdfUrl} 
               download={fileName}
               className="bg-[#3B82F6] hover:bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
             >
               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               Download
             </a>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-grow flex overflow-hidden relative transform-gpu">
           {/* PDF Iframe Container */}
           <div className="flex-grow bg-[#F1F5F9] relative overflow-hidden">
              <iframe 
                src={`${pdfUrl}#view=FitH&scrollbar=1&toolbar=1&navpanes=0`}
                className="w-full h-full border-none absolute inset-0"
                style={{ willChange: 'transform' }}
                title={fileName || 'PDF Viewer'}
              />
              
              {/* Bottom Branding Bar - Moved slightly for better UX */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-30 pointer-events-none">
                 <div className="bg-[#9333EA] text-white rounded-2xl py-3.5 px-8 flex items-center justify-between shadow-[0_20px_50px_rgba(147,51,234,0.3)] pointer-events-auto border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-xs font-bold">
                       <span className="opacity-70 font-medium">Shared via</span> ⚡️ local-share.tech
                    </div>
                    <button 
                      onClick={() => window.location.href = '/manage'}
                      className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-xl border border-white/20 transition-all"
                    >
                      Upload free
                    </button>
                 </div>
              </div>
           </div>

           {/* Professional Right Sidebar (Admin View - ONLY FOR OWNER) */}
           {isOwner && (
             <div className="hidden lg:flex w-[320px] bg-[#111827] flex-col p-6 overflow-y-auto border-l border-white/5 relative z-40">
                {/* Visible to you alert */}
                <div className="bg-[#FCD34D]/10 border border-[#FCD34D]/20 rounded-xl p-4 mb-8">
                   <div className="flex items-start gap-2 mb-1">
                      <svg className="w-4 h-4 text-[#FCD34D] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p className="text-[11px] font-bold text-[#FCD34D] uppercase tracking-wider">Only visible to you</p>
                   </div>
                   <p className="text-[11px] text-gray-400 leading-relaxed">Your website visitors will not see this section.</p>
                </div>

                <div className="flex items-center gap-2 mb-2">
                   <span className="text-lg">🔑</span>
                   <h2 className="text-lg font-bold text-white tracking-tight">Unlock potential</h2>
                </div>
                <p className="text-xs text-gray-500 font-medium mb-6">Do more with your project</p>

                <div className="space-y-3 mb-auto">
                   {[
                     { icon: '🌐', title: 'Custom domains', desc: 'Connect your own domain to look professional' },
                     { icon: '📱', title: 'Shareable QR Code', desc: 'Generate a QR code for easy physical access' },
                     { icon: '💬', title: 'Enable Comments', desc: 'Allow visitors to leave feedback' },
                     { icon: '📊', title: 'Insights & Analytics', desc: 'See who and how many people visit' }
                   ].map((item, i) => (
                     <div key={i} className="group bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                        <div className="flex items-start gap-3">
                           <span className="text-lg">{item.icon}</span>
                           <div>
                              <h3 className="text-xs font-bold text-white mb-1">{item.title}</h3>
                              <p className="text-[10px] text-gray-500 leading-normal">{item.desc}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-8 space-y-3">
                   <button className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-blue-500/10">
                      Compare plans →
                   </button>
                   <button className="w-full text-gray-500 text-[10px] font-bold uppercase tracking-widest py-2 hover:text-white transition-colors">
                      Dismiss
                   </button>
                </div>
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-xl text-center">
      {!error ? (
        <div className="space-y-6">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Loading your PDF...</h1>
          <p className="text-gray-500">We're fetching your document from the cloud.</p>
          <div className="pt-4">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 animate-loading-bar"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Link Not Found</h1>
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-6 bg-primary-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default function RedirectPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <SiteHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <RedirectContent />
      </Suspense>
    </main>
  );
}
