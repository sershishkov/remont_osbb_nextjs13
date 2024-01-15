import './globals.css';
import styles from './page.module.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import ToastProvider from '@/components/ToastProvider/toast.provider';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme_dark from '../mui_theme/theme_dark';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Remont OSBB',
  description: 'Remont OSBB description',
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme_dark}>
        <CssBaseline />
        <html lang='en' suppressHydrationWarning={true}>
          <body className={inter.className} suppressHydrationWarning={true}>
            <ToastProvider>
              <Navbar />
              <main className={styles.main}>{children}</main>
              <Footer />
            </ToastProvider>
          </body>
        </html>
      </ThemeProvider>
    </AuthProvider>
  );
}
