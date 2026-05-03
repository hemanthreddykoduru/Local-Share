'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function SiteHeader() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const hideNav = pathname?.startsWith('/manage') || pathname?.startsWith('/pricing');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u && !u.isAnonymous) {
                setUser(u);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-8">
                {/* Logo */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <Link href="/" className="text-xl font-black tracking-tighter text-gray-900 hover:text-primary-600 transition-colors">
                        Local Share {pathname?.startsWith('/manage') && (
                            <> - <span className="text-primary-600">PDF</span></>
                        )}
                    </Link>
                </div>

                {/* Nav */}
                {!hideNav && (
                    <nav className="hidden lg:flex items-center gap-1 ml-auto">
                        {[
                            { href: '/how-it-works', label: 'How It Works' },
                            { href: '/compare', label: 'Compare' },
                            { href: '/security', label: 'Security' },
                            { href: '/blog', label: 'Blog' },
                            { href: '/manage', label: 'Share PDF', isNew: true },
                        ].map(({ href, label, isNew }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`relative text-[13px] font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${label === 'Share PDF' ? 'text-primary-600 bg-primary-50/80' : 'text-gray-500 hover:text-primary-600 hover:bg-gray-50'}`}
                            >
                                {label}
                                {isNew && (
                                    <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md leading-none uppercase tracking-tighter">
                                        New
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>
                )}
                
                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-3 lg:hidden ml-auto">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                <div className={`flex items-center gap-1 ${!hideNav ? 'lg:ml-0' : 'ml-auto'}`}>
                    {isLoading ? (
                        <div className="w-24 h-9 bg-gray-50 rounded-xl animate-pulse" />
                    ) : user ? (
                        <div className="relative border-l border-gray-100 pl-6 ml-2">
                            {/* Profile Trigger */}
                            <div 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <img 
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=3B82F6&color=fff`} 
                                    alt="Profile" 
                                    className="w-9 h-9 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100" 
                                />
                                <span className="text-sm font-bold text-gray-900 hidden sm:inline-block">
                                    {user.displayName || 'Account'}
                                </span>
                                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-fade-in py-1">
                                        <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
                                            <p className="text-sm font-bold text-gray-900 truncate">{user.displayName || 'User'}</p>
                                            <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <Link href="/manage" onClick={() => setIsDropdownOpen(false)}>
                                                <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-xl transition-all flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    Dashboard
                                                </button>
                                            </Link>
                                            <Link href="/pricing" onClick={() => setIsDropdownOpen(false)}>
                                                <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-purple-600 hover:bg-purple-50 rounded-xl transition-all flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                                    Upgrade Plan
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="p-2 border-t border-gray-50">
                                            <button 
                                                onClick={async () => {
                                                    setIsDropdownOpen(false);
                                                    try {
                                                        const { signOut } = await import('firebase/auth');
                                                        await signOut(auth);
                                                    } catch (err) {
                                                        console.error('Sign out error', err);
                                                    } finally {
                                                        localStorage.clear();
                                                        sessionStorage.clear();
                                                        window.location.href = '/';
                                                    }
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all flex items-center gap-3"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="text-sm font-black bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-primary-100 hover:scale-105 active:scale-95">
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
