import { Inter, Merriweather } from 'next/font/google';

import './globals.css';
import { ToastContainer } from '@/common/components/ui/Toast/ToastContainer';
import { QueryProvider } from '@/infra/query/QueryProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

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
