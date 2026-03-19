import { Header } from "@/common/components/Header/Header";
import { Footer } from "@/common/components/Footer/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-base-100 text-base-content flex flex-col">
                {children}
            </main>
            <Footer />
        </>
    );
}