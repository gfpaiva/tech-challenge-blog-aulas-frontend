export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-base-100 text-base-content flex flex-col">
            {children}
        </main>
    );
}