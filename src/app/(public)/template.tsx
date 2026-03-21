import { Footer } from '@/common/components/Footer/Footer';
import { Header } from '@/common/components/Header/Header';

type TemplateProps = Readonly<{
  children: React.ReactNode;
}>;

export default function Template({ children }: TemplateProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-base-100 text-base-content flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
