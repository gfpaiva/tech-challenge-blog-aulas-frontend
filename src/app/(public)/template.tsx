import { Footer } from '@/common/components/Footer/Footer';
import { Header } from '@/common/components/Header/Header';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-base-100 text-base-content flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
