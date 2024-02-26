'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { worker_role } from '@/constants/constants';
import styles from './page.module.css';

export default function Main({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathStarts = pathname.split('/')[1];
  const isShowNavbar = !worker_role.includes(pathStarts);
  return (
    <main
      id='main'
      className={`${isShowNavbar ? styles.main : styles.mainWork}`}
    >
      {children}
    </main>
  );
}
