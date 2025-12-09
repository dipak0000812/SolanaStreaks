"use client";

import { Toaster } from 'sonner';

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: 'rgba(31, 41, 55, 0.95)',
                    border: '1px solid rgba(0, 255, 148, 0.2)',
                    color: '#F8FAFC',
                    backdropFilter: 'blur(20px)',
                },
                className: 'font-inter',
            }}
            richColors
        />
    );
}
