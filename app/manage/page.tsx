'use client';

import React, { useEffect, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Link from 'next/link';

export default function ManageAccountPage() {
    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [qrModal, setQrModal] = useState<string | null>(null);
    const [embedModal, setEmbedModal] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [replacingId, setReplacingId] = useState<string | null>(null);

    // New Upload Modal State
    const [uploadModal, setUploadModal] = useState(false);
    const newFileInputRef = React.useRef<HTMLInputElement>(null);
    const [newUploadFile, setNewUploadFile] = useState<File | null>(null);
    const [newLinkName, setNewLinkName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [deleteModal, setDeleteModal] = useState<string | null>(null);
    const [archiveModal, setArchiveModal] = useState<string | null>(null);
    const [successModal, setSuccessModal] = useState(false);
    const [publishedLink, setPublishedLink] = useState('');
    const [limitModal, setLimitModal] = useState(false);

    // Subscription & Plan limits
    const PLAN_LIMITS = {
        'Free': 5,
        'Pro': 30,
        'Pro Plus': 50
    };
    const [userPlan, setUserPlan] = useState<'Free' | 'Pro' | 'Pro Plus'>('Free');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (u && !u.isAnonymous) {
                setUser(u);
                
                try {
                    // Fetch user plan
                    const { doc, getDoc } = await import('firebase/firestore');
                    const userDocRef = doc(db, 'users', u.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        if (userData.plan) {
                            setUserPlan(userData.plan as any);
                        }
                    }

                    const q = query(
                        collection(db, 'pdf_links'),
                        where('owner_id', '==', u.uid)
                    );
                    const querySnapshot = await getDocs(q);
                    const userProjects: any[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        if (data.status !== 'archived') {
                            userProjects.push({ id: doc.id, ...data });
                        }
                    });
                    
                    // Sort locally since we might not have a composite index
                    userProjects.sort((a, b) => {
                        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                        return dateB - dateA;
                    });
                    
                    setProjects(userProjects);
                } catch (error) {
                    console.error("Error fetching projects:", error);
                }
            } else {
                setUser(null);
                setProjects([]);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
                <SiteHeader />
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                </div>
            </main>
        );
    }


    const formatDate = (dateString: string | undefined | any) => {
        if (!dateString) return 'Unknown';
        // Handle Firestore Timestamp or ISO string
        const date = dateString.toDate ? dateString.toDate() : new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
    };

    // --- Action Handlers ---
    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(`https://local-share.tech/v?id=${id}`);
        alert('Link copied!');
        setActiveDropdown(null);
    };

    const handleShare = async (id: string) => {
        const url = `https://local-share.tech/v?id=${id}`;
        if (navigator.share) {
            await navigator.share({ title: 'Shared PDF', url }).catch(() => {});
        } else {
            handleCopy(id);
        }
        setActiveDropdown(null);
    };

    const handleDownload = (project: any) => {
        if (project.url) window.open(project.url, '_blank');
        setActiveDropdown(null);
    };

    const handleDelete = async (id: string) => {
        try {
            const { deleteDoc, doc } = await import('firebase/firestore');
            await deleteDoc(doc(db, 'pdf_links', id));
            setProjects(projects.filter(p => p.id !== id));
            setDeleteModal(null);
        } catch (err) {
            alert("Failed to delete project");
        }
    };

    const handleArchive = async (id: string) => {
        try {
            const { updateDoc, doc } = await import('firebase/firestore');
            await updateDoc(doc(db, 'pdf_links', id), { status: 'archived' });
            setProjects(projects.filter(p => p.id !== id));
            setArchiveModal(null);
        } catch (err) {
            alert("Failed to archive project");
        }
    };

    const triggerReplace = (id: string) => {
        setReplacingId(id);
        setActiveDropdown(null);
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleReplaceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !replacingId || !user) return;
        
        setIsLoading(true);
        try {
            const { supabase } = await import('@/lib/supabase');
            const { updateDoc, doc } = await import('firebase/firestore');
            
            const fileExt = file.name.split('.').pop();
            const fileName = `${replacingId}-${Date.now()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('PDF TO LINKS')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('PDF TO LINKS')
                .getPublicUrl(filePath);

            await updateDoc(doc(db, 'pdf_links', replacingId), {
                url: publicUrl,
                file_name: file.name,
                modified_at: new Date()
            });

            setProjects(projects.map(p => p.id === replacingId ? { ...p, url: publicUrl, file_name: file.name } : p));
            alert("File successfully replaced!");
        } catch (err: any) {
            alert("Failed to replace file: " + err.message);
        } finally {
            setIsLoading(false);
            setReplacingId(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleNewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setNewUploadFile(e.target.files[0]);
        }
    };

    const submitNewUpload = async () => {
        if (!newUploadFile) {
            alert('Please select a file first.');
            return;
        }
        if (!user) {
            alert('You must be signed in to publish files.');
            return;
        }

        // Check plan limits
        if (projects.length >= PLAN_LIMITS[userPlan]) {
            setLimitModal(true);
            setUploadModal(false); // Close upload modal to show limit modal
            return;
        }

        setIsUploading(true);
        try {
            const { supabase } = await import('@/lib/supabase');
            const { collection, addDoc } = await import('firebase/firestore');

            const fileExt = newUploadFile.name.split('.').pop();
            const uniqueId = Math.random().toString(36).substring(2, 9);
            const fileName = `${uniqueId}-${Date.now()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('PDF TO LINKS')
                .upload(filePath, newUploadFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('PDF TO LINKS')
                .getPublicUrl(filePath);

            const newProjectData = {
                url: publicUrl,
                file_name: newUploadFile.name,
                link_name: newLinkName || newUploadFile.name.replace('.pdf', ''),
                owner_id: user.uid,
                created_at: new Date().toISOString(),
                modified_at: new Date().toISOString(),
                views: 0,
                status: 'active'
            };

            const docRef = await addDoc(collection(db, 'pdf_links'), newProjectData);

            setProjects([{ id: docRef.id, ...newProjectData }, ...projects]);
            setUploadModal(false);
            setNewUploadFile(null);
            setNewLinkName('');
            setPublishedLink(`https://local-share.tech/v?id=${docRef.id}`);
            setSuccessModal(true);
        } catch (err: any) {
            alert('Upload failed: ' + err.message);
        } finally {
            setIsUploading(false);
            if (newFileInputRef.current) newFileInputRef.current.value = '';
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans text-gray-900">
            <SiteHeader />
            
            <div className="flex-grow max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">My Account</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Projects & Domains */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Top Controls / Tabs */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm w-fit">
                                <button className="px-4 py-1.5 text-sm font-semibold bg-gray-100 text-gray-900 rounded-md">All</button>
                                <button onClick={() => window.location.href = '/pricing'} className="px-4 py-1.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2">
                                    {projects.length}/{PLAN_LIMITS[userPlan]}
                                    <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded uppercase font-black">
                                        {userPlan}
                                    </span>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Trash">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Archive">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Live Projects Card */}
                        <div className="bg-white border border-gray-200 rounded-[24px] shadow-sm">
                            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-medium text-gray-900 tracking-tight">Live Projects</h2>
                                    <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                        {projects.length} / {PLAN_LIMITS[userPlan]} live
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
                                        <button className="p-1.5 text-gray-600 hover:text-gray-900"><span className="font-serif text-sm font-bold px-1">Tt</span></button>
                                        <button className="p-1.5 text-gray-600 hover:text-gray-900"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></button>
                                        <button className="p-1.5 text-gray-600 hover:text-gray-900"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></button>
                                        <button className="p-1.5 text-gray-600 hover:text-gray-900"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                                    </div>
                                    <button onClick={() => setUploadModal(true)} className="bg-[#1C64F2] hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                        Upload file
                                    </button>
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="bg-[#F9FAFB] px-8 py-3 grid grid-cols-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <div className="col-span-2">Status</div>
                                <div className="col-span-4">Project</div>
                                <div className="col-span-2">Modified</div>
                                <div className="col-span-2">Views</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>

                            {/* Project List */}
                            <div className="divide-y divide-gray-100">
                                {projects.length === 0 ? (
                                    <div className="p-12 text-center text-gray-500 font-medium">
                                        No projects found. Upload a file to get started.
                                    </div>
                                ) : (
                                    projects.map((project) => (
                                        <div key={project.id} className="px-8 py-4 grid grid-cols-12 items-center hover:bg-gray-50 transition-colors last:rounded-b-[24px]">
                                            <div className="col-span-2">
                                                <span className="inline-flex items-center gap-1.5 bg-[#DEF7EC] text-[#03543F] text-xs font-semibold px-2.5 py-1 rounded-full">
                                                    <span className="w-1.5 h-1.5 bg-[#057A55] rounded-full"></span>
                                                    Public
                                                </span>
                                            </div>
                                            <div className="col-span-4 flex items-center gap-2 truncate pr-4">
                                                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                                <a href={`/v?id=${project.id}`} target="_blank" rel="noreferrer" className="text-[#1C64F2] hover:underline text-sm font-medium truncate">
                                                    {project.id}.local-share.tech
                                                </a>
                                                <button 
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(`https://local-share.tech/v?id=${project.id}`);
                                                        alert('Link copied!');
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors ml-1"
                                                    title="Copy link"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                </button>
                                            </div>
                                            <div className="col-span-2 text-sm text-gray-600">
                                                {formatDate(project.created_at)}
                                            </div>
                                            <div className="col-span-2 text-sm text-gray-600">
                                                0
                                            </div>
                                            <div className="col-span-2 flex items-center justify-end gap-3 text-gray-500 relative">
                                                <button className="flex items-center gap-1 text-sm font-medium hover:text-gray-900 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    Update
                                                </button>
                                                <div className="relative group">
                                                    <button className="p-1 hover:text-gray-900 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                                    </button>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                                                        Analytics
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                                    </div>
                                                </div>
                                                <div className="relative group">
                                                    <button className="p-1 hover:text-gray-900 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                                                    </button>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                                                        QR Code
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => setActiveDropdown(activeDropdown === project.id ? null : project.id)}
                                                    className={`p-1.5 transition-colors ${activeDropdown === project.id ? 'text-gray-900 bg-gray-100 rounded-lg' : 'hover:text-gray-900 hover:bg-gray-50 rounded-lg'}`}
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                                </button>

                                                {/* Action Dropdown Menu */}
                                                {activeDropdown === project.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                                                        <div className="absolute right-0 top-full mt-2 w-[220px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 z-50 py-2 animate-fade-in text-[13px] font-medium text-gray-700">
                                                            <button onClick={() => handleCopy(project.id)} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy link
                                                            </button>
                                                            <button onClick={() => handleShare(project.id)} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> Share link
                                                            </button>
                                                            <button onClick={() => { setQrModal(project.id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg> View QR code
                                                            </button>
                                                            <button onClick={() => { setEmbedModal(project.id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> Embed this link
                                                            </button>
                                                            <button onClick={() => { alert('Custom domains feature requires Pro upgrade.'); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 pb-3 mb-1">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> Publish to custom domain
                                                            </button>
                                                            
                                                            <button onClick={() => { alert('Advanced analytics coming soon!'); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 pb-3 mb-1">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> View analytics
                                                            </button>
                                                            
                                                            <button onClick={() => { alert('PDF Editing feature coming soon!'); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Edit PDF
                                                            </button>
                                                            <button onClick={() => triggerReplace(project.id)} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 pb-3 mb-1">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> Replace existing file
                                                            </button>
                                                            
                                                            <button onClick={() => handleDownload(project)} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> Download
                                                            </button>
                                                            <button onClick={() => { setArchiveModal(project.id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg> Archive
                                                            </button>
                                                            <button onClick={() => { setDeleteModal(project.id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-red-600">
                                                                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Delete
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Custom Domains Card */}
                        <div className="bg-white border border-gray-200 rounded-[24px] shadow-sm overflow-hidden p-8">
                            <div className="flex items-center justify-between mb-16">
                                <h2 className="text-2xl font-medium text-gray-900 tracking-tight">Custom Domains</h2>
                                <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Add new
                                </button>
                            </div>
                            <div className="text-center pb-8">
                                <p className="text-gray-500 font-medium">No custom domains</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Project Tips */}
                    <div className="space-y-6">
                        <h3 className="text-base font-bold text-gray-900">Project Tips</h3>
                        
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 text-gray-900 font-bold mb-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                                Generate QR Code
                            </div>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                The simplest way to share your link, offline and online.
                            </p>
                            <button className="text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                                Learn more <span>→</span>
                            </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 text-gray-900 font-bold mb-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                View Analytics
                            </div>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Understand who's visiting your project.
                            </p>
                            <button className="text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                                Learn more <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Hidden file input for Replace action */}
            <input type="file" accept="application/pdf" ref={fileInputRef} onChange={handleReplaceUpload} className="hidden" />

            {/* QR Code Modal */}
            {qrModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative text-center">
                        <button onClick={() => setQrModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h3 className="text-xl font-bold mb-6 text-gray-900">QR Code</h3>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://local-share.tech/v?id=${qrModal}`} alt="QR Code" className="mx-auto border p-2 rounded-xl bg-white mb-6" />
                        <button onClick={() => { handleCopy(qrModal); setQrModal(null); }} className="bg-[#1C64F2] text-white font-bold w-full py-2.5 rounded-lg">Copy Link</button>
                    </div>
                </div>
            )}

            {/* Embed Modal */}
            {embedModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative">
                        <button onClick={() => setEmbedModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Embed this link</h3>
                        <p className="text-sm text-gray-500 mb-4">Copy the HTML code below to embed this PDF viewer directly into your website.</p>
                        <textarea 
                            readOnly 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-mono text-gray-700 h-32 focus:outline-none resize-none"
                            value={`<iframe src="https://local-share.tech/v?id=${embedModal}" width="100%" height="600px" frameborder="0" style="border-radius: 8px; border: 1px solid #e5e7eb;"></iframe>`}
                        />
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(`<iframe src="https://local-share.tech/v?id=${embedModal}" width="100%" height="600px" frameborder="0" style="border-radius: 8px; border: 1px solid #e5e7eb;"></iframe>`);
                                alert('Embed code copied!');
                                setEmbedModal(null);
                            }} 
                            className="bg-[#1C64F2] hover:bg-blue-700 text-white font-bold w-full py-2.5 rounded-lg mt-4 transition-colors"
                        >
                            Copy Embed Code
                        </button>
                    </div>
                </div>
            )}

            {/* New Upload Modal (Tiiny style) */}
            {uploadModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-[24px] shadow-2xl max-w-xl w-full pt-8 pb-4 px-2 animate-slide-up relative">
                        <button onClick={() => { setUploadModal(false); setNewUploadFile(null); setNewLinkName(''); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10 bg-white rounded-full p-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        
                        <div className="px-6 flex items-center gap-0 mb-6">
                            <input 
                                type="text" 
                                placeholder="link-name" 
                                value={newLinkName}
                                onChange={(e) => setNewLinkName(e.target.value)}
                                className="flex-grow border border-gray-300 rounded-l-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#1C64F2] font-medium shadow-sm transition-colors"
                            />
                            <div className="bg-[#1C64F2] text-white text-sm font-bold py-2.5 px-4 rounded-r-lg border border-[#1C64F2] flex items-center gap-1 cursor-pointer shadow-sm">
                                .local-share.tech
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap items-center gap-5 px-6 text-sm font-semibold border-b border-gray-100 text-gray-500 mb-6">
                            <div className="text-[#1C64F2] border-b-2 border-[#1C64F2] pb-2 cursor-pointer">Documents</div>
                            <div className="hover:text-gray-900 pb-2 cursor-pointer">Images</div>
                            <div className="hover:text-gray-900 pb-2 cursor-pointer">Code</div>
                            <div className="hover:text-gray-900 pb-2 cursor-pointer">Paste HTML</div>
                            <div className="hover:text-gray-900 pb-2 cursor-pointer flex items-center gap-1">More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                            <div className="hover:text-gray-900 pb-2 cursor-pointer ml-auto text-gray-400 font-normal">Examples</div>
                        </div>

                        {/* Drag Drop Zone */}
                        <div className="px-6 mb-6">
                            <div 
                                onClick={() => newFileInputRef.current?.click()}
                                className="border-2 border-dashed border-[#DFB6FF] rounded-[24px] bg-white hover:bg-purple-50/50 cursor-pointer transition-colors flex flex-col items-center justify-center py-12 text-center"
                            >
                                <input type="file" accept="application/pdf" className="hidden" ref={newFileInputRef} onChange={handleNewUpload} />
                                <div className="flex items-center gap-6 mb-4 text-gray-400">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
                                    <span className="text-gray-200 text-2xl font-light">|</span>
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                                </div>
                                <p className="text-gray-400 font-medium text-sm mb-6 whitespace-pre-line">
                                    {newUploadFile ? <span className="text-gray-800 font-bold text-base">{newUploadFile.name}</span> : "Drag & drop zip or\nsingle file here"}
                                </p>
                                <button className="bg-gradient-to-r from-[#B066FF] to-[#4D8EFF] text-white font-bold py-2.5 px-8 rounded-xl shadow-sm hover:shadow transition-all text-sm">
                                    {newUploadFile ? "File Selected" : "Upload file"}
                                </button>
                                <p className="text-xs text-gray-500 mt-5 font-medium">or use an <span className="underline cursor-pointer hover:text-gray-800">example</span></p>
                            </div>
                        </div>

                        {/* Publish Button */}
                        <div className="px-6">
                            <button 
                                onClick={submitNewUpload}
                                disabled={!newUploadFile || isUploading}
                                className={`w-full font-bold py-3.5 rounded-xl shadow-sm transition-all text-white text-sm ${!newUploadFile || isUploading ? 'bg-[#A7C8FF] cursor-not-allowed' : 'bg-[#0066FF] hover:bg-blue-700 hover:shadow-md'}`}
                            >
                                {isUploading ? 'PUBLISHING...' : 'PUBLISH'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SiteFooter />

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-slide-up border border-gray-100">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete this project?</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">Are you sure you want to delete this project? This cannot be undone and you will lose all the views data.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteModal(null)} className="flex-grow py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteModal)} className="flex-grow py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-100 transition-all">
                                Yes, delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Archive Confirmation Modal */}
            {archiveModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-slide-up border border-gray-100">
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Archive project?</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">It will no longer appear in your active list, but you can still access it from your archives later.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setArchiveModal(null)} className="flex-grow py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => handleArchive(archiveModal)} className="flex-grow py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-100 transition-all">
                                Archive it
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Success Modal */}
            {successModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl animate-slide-up border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Published successfully!</h3>
                        <p className="text-gray-500 mb-8 font-medium">Your PDF is now live and ready to be shared with the world.</p>
                        
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-8 flex items-center gap-3">
                            <input 
                                readOnly 
                                value={publishedLink} 
                                className="flex-grow bg-transparent text-sm font-mono text-gray-600 focus:outline-none truncate"
                            />
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(publishedLink);
                                    // Maybe show a small toast or change icon
                                }}
                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                                title="Copy link"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                            </button>
                        </div>

                        <button 
                            onClick={() => setSuccessModal(false)}
                            className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all"
                        >
                            Back to dashboard
                        </button>
                    </div>
                </div>
            )}
            {/* Limit Reached Modal */}
            {limitModal && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl animate-slide-up border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Limit reached!</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                            You've used all <span className="text-gray-900 font-bold">{PLAN_LIMITS[userPlan]}</span> slots available on your <span className="text-purple-600 font-bold">{userPlan}</span> plan. Upgrade now to keep sharing!
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <Link 
                                href="/pricing"
                                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-purple-100 transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                Upgrade your plan
                            </Link>
                            <button 
                                onClick={() => setLimitModal(false)}
                                className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold rounded-2xl transition-all"
                            >
                                Maybe later
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
