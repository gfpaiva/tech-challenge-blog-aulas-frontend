import { Metadata, Viewport } from 'next';
import { Inter, Merriweather } from 'next/font/google';

import './globals.css';
import { ToastContainer } from '@/common/components/ui/Toast/ToastContainer';
import { appRoutes } from '@/common/config/routes';
import { QueryProvider } from '@/infra/query/QueryProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: appRoutes.home.title,
  description: appRoutes.home.description,
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#6A1B9A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" data-theme="blog">
      <body className={`${inter.variable} ${merriweather.variable} antialiased`}>
        <QueryProvider>
          {children}
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
