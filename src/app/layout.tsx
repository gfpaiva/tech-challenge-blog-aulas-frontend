import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Header } from "@/common/components/Header/Header";
import { Footer } from "@/common/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" data-theme="blog">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen bg-base-100 text-base-content flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
