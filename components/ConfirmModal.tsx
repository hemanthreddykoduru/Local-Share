'use client';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'info';
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'info'
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-reveal p-8">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-primary-50 text-primary-500'}`}>
                    {type === 'danger' ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    ) : (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">{title}</h2>
                <p className="text-gray-500 font-medium text-center mb-8 leading-relaxed">
                    {message}
                </p>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`w-full font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 ${type === 'danger' ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-100' : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-100'}`}
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl transition-all active:scale-95"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}
