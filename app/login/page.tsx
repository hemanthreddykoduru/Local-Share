'use client';

import { useState } from 'react';
import { auth, signInWithGoogle } from '@/lib/firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export default function LoginPage() {
    const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (mode === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
                window.location.href = '/manage';
            } else if (mode === 'register') {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                window.location.href = '/manage';
            } else if (mode === 'forgot') {
                await sendPasswordResetEmail(auth, email);
                setMessage('Reset link sent to your email!');
                setMode('login');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            window.location.href = '/manage';
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans">
            <SiteHeader />
            
            <div className="flex-grow flex items-center justify-center p-4 py-20">
                <div className="w-full max-w-[440px] animate-fade-in">
                    {/* Card */}
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-blue-100/50 border border-gray-100">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
                                {mode === 'login' && 'Welcome back'}
                                {mode === 'register' && 'Create account'}
                                {mode === 'forgot' && 'Reset password'}
                            </h1>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                {mode === 'login' && 'Enter your details to manage your projects'}
                                {mode === 'register' && 'Join Local Share to start sharing your PDFs'}
                                {mode === 'forgot' && "We'll send you a link to get back in"}
                            </p>
                        </div>

                        {/* Error/Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl text-green-600 text-sm font-bold flex items-center gap-3">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleAuth} className="space-y-5">
                            {mode === 'register' && (
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe" 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-gray-900 font-medium"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@email.com" 
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-gray-900 font-medium"
                                />
                            </div>

                            {mode !== 'forgot' && (
                                <div>
                                    <div className="flex justify-between items-center mb-2 ml-1">
                                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                                        {mode === 'login' && (
                                            <button 
                                                type="button"
                                                onClick={() => setMode('forgot')}
                                                className="text-[11px] font-black text-primary-600 uppercase tracking-widest hover:text-primary-700 transition-colors"
                                            >
                                                Forgot?
                                            </button>
                                        )}
                                    </div>
                                    <input 
                                        type="password" 
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••" 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-gray-900 font-medium"
                                    />
                                </div>
                            )}

                            <button 
                                disabled={loading}
                                className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                            >
                                {loading ? 'Please wait...' : (
                                    mode === 'login' ? 'Sign in' : 
                                    mode === 'register' ? 'Create account' : 'Send reset link'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300 tracking-[0.2em] bg-white px-4">Or continue with</div>
                        </div>

                        {/* Social Auth */}
                        <button 
                            onClick={handleGoogleSignIn}
                            className="w-full py-4 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-900 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm active:scale-[0.98]"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                            Google Account
                        </button>

                        {/* Footer Link */}
                        <div className="mt-10 text-center">
                            <button 
                                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                                <span className="text-primary-600 font-black">{mode === 'login' ? 'Register' : 'Login'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
