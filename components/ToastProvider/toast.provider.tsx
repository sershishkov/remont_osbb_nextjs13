'use client';

import { ToastContainer } from 'react-toastify';

interface ToastProviderProps {
  readonly children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        autoClose={1000}
        // position='top-left'
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
    </>
  );
}
