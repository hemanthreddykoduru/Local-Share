'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function SiteHeader() {
    const [user, setUser] = useState<User | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const hideNav = pathname?.startsWith('/manage') || pathname?.startsWith('/pricing');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u && !u.isAnonymous) {
                setUser(u);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <Link href="/" className="text-xl font-black tracking-tight text-gray-900 hover:text-primary-600 transition-colors">
                        Local Share
                    </Link>
                </div>

                {/* Nav */}
                {!hideNav && (
                    <nav className="flex items-center gap-1">
                        {[
                            { href: '/blog', label: 'Blog' },
                            { href: '/faq', label: 'FAQ' },
                            { href: '/pricing', label: 'Pricing' },
                            { href: '/about', label: 'About' },
                            { href: '/manage', label: 'Share PDF', isNew: true },
                            { href: '/contact', label: 'Contact' },
                        ].map(({ href, label, isNew }) => (
                            <Link
                                key={href}
                                href={href}
                                className="relative text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 hidden md:flex"
                            >
                                {label}
                                {isNew && (
                                    <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md leading-none uppercase tracking-tighter animate-pulse">
                                        New
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>
                )}
                
                <div className="flex items-center gap-1 ml-auto">
                    {user ? (
                        <div className="ml-4 relative border-l border-gray-200 pl-4">
                            {/* Profile Trigger */}
                            <div 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <img 
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=3B82F6&color=fff`} 
                                    alt="Profile" 
                                    className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" 
                                />
                                <span className="text-sm font-bold text-gray-700 hidden sm:inline-block">
                                    {user.displayName || 'Account'}
                                </span>
                                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <>
                                    {/* Invisible overlay to close dropdown when clicking outside */}
                                    <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => setIsDropdownOpen(false)}
                                    ></div>
                                    
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                            <p className="text-xs font-bold text-gray-900 truncate">{user.displayName || 'User'}</p>
                                            <p className="text-[10px] font-medium text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <div className="py-2">
                                            <Link href="/manage" onClick={() => setIsDropdownOpen(false)}>
                                                <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    Manage Account
                                                </button>
                                            </Link>
                                            <Link href="/pricing" onClick={() => setIsDropdownOpen(false)}>
                                                <button className="w-full text-left px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                                    Upgrade Subscription
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="border-t border-gray-50 py-2">
                                            <button className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                Delete account
                                            </button>
                                            <button 
                                                onClick={async () => {
                                                    setIsDropdownOpen(false);
                                                    try {
                                                        const { signOut } = await import('firebase/auth');
                                                        await signOut(auth);
                                                    } catch (err) {
                                                        console.error('Sign out error', err);
                                                    } finally {
                                                        // Force clear any local storage or indexedDB to be absolutely sure
                                                        localStorage.clear();
                                                        sessionStorage.clear();
                                                        if (window.indexedDB) {
                                                            window.indexedDB.databases().then(dbs => {
                                                                dbs.forEach(db => {
                                                                    if (db.name?.includes('firebase')) {
                                                                        window.indexedDB.deleteDatabase(db.name);
                                                                    }
                                                                });
                                                            });
                                                        }
                                                        window.location.href = '/';
                                                    }
                                                }} 
                                                className="w-full text-left px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-2 mt-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={async () => {
                                try {
                                    const { signInWithGoogle } = await import('@/lib/firebase');
                                    await signInWithGoogle();
                                } catch (err: any) {
                                    alert('Sign in failed: ' + err.message);
                                }
                            }}
                            className="ml-2 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
