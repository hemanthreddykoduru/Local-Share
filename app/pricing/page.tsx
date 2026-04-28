'use client';

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Script from 'next/script';

export default function PricingPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [userPlan, setUserPlan] = useState<'Free' | 'Pro' | 'Pro Plus'>('Free');
    const [errorModal, setErrorModal] = useState<string | null>(null);
    const [successModal, setSuccessModal] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (u && !u.isAnonymous) {
                setUser(u);
                
                try {
                    const { db } = await import('@/lib/firebase');
                    const { doc, getDoc } = await import('firebase/firestore');
                    const userDocRef = doc(db, 'users', u.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        if (userData.plan) {
                            setUserPlan(userData.plan as any);
                        }
                    }
                } catch (err) {
                    console.error('Error fetching user plan:', err);
                }
            } else {
                setUser(null);
                setUserPlan('Free');
            }
        });
        return () => unsubscribe();
    }, []);

    const handlePayment = async (planName: string, amount: number) => {
        if (!user) {
            alert('Please sign in to upgrade your plan.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            });

            const contentType = response.headers.get('content-type');
            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to create order');
                } else {
                    const text = await response.text();
                    console.error('Server returned non-JSON error:', text);
                    throw new Error(`Server Error (${response.status}): The payment server returned an invalid response. Please check your server logs.`);
                }
            }

            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned an invalid response format. Please check if the API route exists.');
            }

            const order = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'Local Share',
                description: `Upgrade to ${planName} Plan`,
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const { doc, setDoc } = await import('firebase/firestore');
                        const { db } = await import('@/lib/firebase');
                        
                        // 1. Update user's current plan
                        const userRef = doc(db, 'users', user.uid);
                        await setDoc(userRef, {
                            plan: planName,
                            updated_at: new Date().toISOString(),
                        }, { merge: true });

                        // 2. Store detailed subscription record
                        const { collection, addDoc } = await import('firebase/firestore');
                        await addDoc(collection(db, 'subscriptions'), {
                            user_id: user.uid,
                            user_email: user.email,
                            plan: planName,
                            amount: amount,
                            currency: 'INR',
                            status: 'completed',
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            created_at: new Date().toISOString(),
                        });

                        setSuccessModal(planName);
                        // We will redirect in the modal itself or on close
                    } catch (err) {
                        console.error('Error updating user plan:', err);
                        setErrorModal('Payment was successful but we failed to update your plan. Please contact support.');
                    }
                },
                prefill: {
                    name: user.displayName || '',
                    email: user.email || '',
                },
                theme: {
                    color: '#1C64F2',
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                setErrorModal(response.error.description || "Your payment didn't go through as it was declined by the bank. Try another payment method or contact your bank.");
            });
            rzp.open();
        } catch (error: any) {
            console.error('Payment initialization failed:', error);
            setErrorModal(error.message || 'Failed to initialize payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <SiteHeader />
            
            <div className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
                <Link href="/manage" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors mb-8 group">
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>

                <div className="text-center mb-16 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Choose the perfect plan for your PDF sharing needs. Upgrade anytime as your projects grow.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col animate-fade-in" style={{ animationDelay: '100ms' }}>
                        <div className="mb-8">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">Free</span>
                            <div className="mt-4 flex items-baseline text-5xl font-black text-gray-900">
                                ₹0
                                <span className="text-xl text-gray-500 font-medium ml-1">/mo</span>
                            </div>
                            <p className="mt-4 text-gray-500 text-sm">Perfect for trying out Local Share for personal projects.</p>
                        </div>
                        
                        <ul className="space-y-4 mb-8 flex-grow">
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="font-medium">Store up to <strong className="text-gray-900">5 PDFs</strong></span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Basic Analytics</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Standard Support</span>
                            </li>
                        </ul>
                        
                        {userPlan === 'Free' && (
                            <div className="w-full py-3.5 px-4 bg-gray-50 border-2 border-gray-200 text-gray-500 font-bold rounded-xl text-center block">
                                Current Plan
                            </div>
                        )}
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white rounded-3xl p-8 border-2 border-[#1C64F2] shadow-xl relative flex flex-col transform md:-translate-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="bg-gradient-to-r from-blue-500 to-[#1C64F2] text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-sm">
                                Most Popular
                            </span>
                        </div>
                        <div className="mb-8 mt-2">
                            <span className="text-sm font-bold text-[#1C64F2] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Pro</span>
                            <div className="mt-4 flex items-baseline text-5xl font-black text-gray-900">
                                ₹10
                                <span className="text-xl text-gray-500 font-medium ml-1">/mo</span>
                            </div>
                            <p className="mt-4 text-gray-500 text-sm">For professionals who need to manage multiple documents.</p>
                        </div>
                        
                        <ul className="space-y-4 mb-8 flex-grow">
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-[#1C64F2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="font-medium">Store up to <strong className="text-gray-900">30 PDFs</strong></span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-[#1C64F2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Advanced Analytics</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-[#1C64F2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Priority Support</span>
                            </li>
                        </ul>
                        
                        {userPlan === 'Pro' ? (
                            <div className="w-full py-3.5 px-4 bg-blue-50 border-2 border-[#1C64F2] text-[#1C64F2] font-bold rounded-xl text-center block">
                                Current Plan
                            </div>
                        ) : (
                            <button 
                                onClick={() => handlePayment('Pro', 10)}
                                disabled={loading}
                                className="w-full py-3.5 px-4 bg-[#1C64F2] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg text-center disabled:bg-blue-300"
                            >
                                {loading ? 'Processing...' : 'Upgrade to Pro'}
                            </button>
                        )}
                    </div>

                    {/* Pro Plus Plan */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <div className="mb-8">
                            <span className="text-sm font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full">Pro Plus</span>
                            <div className="mt-4 flex items-baseline text-5xl font-black text-gray-900">
                                ₹15
                                <span className="text-xl text-gray-500 font-medium ml-1">/mo</span>
                            </div>
                            <p className="mt-4 text-gray-500 text-sm">For heavy users and small teams sharing frequently.</p>
                        </div>
                        
                        <ul className="space-y-4 mb-8 flex-grow">
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="font-medium">Store up to <strong className="text-gray-900">50 PDFs</strong></span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Custom Domains</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>24/7 Dedicated Support</span>
                            </li>
                        </ul>
                        
                        {userPlan === 'Pro Plus' ? (
                            <div className="w-full py-3.5 px-4 bg-purple-50 border-2 border-purple-600 text-purple-600 font-bold rounded-xl text-center block">
                                Current Plan
                            </div>
                        ) : (
                            <button 
                                onClick={() => handlePayment('Pro Plus', 15)}
                                disabled={loading}
                                className="w-full py-3.5 px-4 bg-white border-2 border-purple-200 hover:border-purple-600 hover:text-purple-700 hover:bg-purple-50 text-purple-600 font-bold rounded-xl transition-all text-center disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
                            >
                                {loading ? 'Processing...' : 'Upgrade to Pro Plus'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <SiteFooter />

            {/* Error Modal */}
            {errorModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-slide-up border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Payment failed</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed font-medium">{errorModal}</p>
                        <button 
                            onClick={() => setErrorModal(null)} 
                            className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {successModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-slide-up border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Payment successful!</h3>
                        <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                            You've successfully upgraded to the <span className="text-primary-600 font-bold">{successModal}</span> plan. Your new storage limits are active!
                        </p>
                        <button 
                            onClick={() => window.location.href = '/manage'} 
                            className="w-full py-4 bg-[#1C64F2] hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 transition-all"
                        >
                            Go to dashboard
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
