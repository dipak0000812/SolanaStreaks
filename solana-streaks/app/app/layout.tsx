import type { Metadata } from "next";
import "./globals.css";
import AppWalletProvider from "./components/providers/AppWalletProvider";
import Navbar from "./components/Navbar";
import RecentlyJoinedBanner from "./components/RecentlyJoinedBanner";
import Footer from "./components/Footer";
import { ToastProvider } from "./components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "SolanaStreaks | Predict to Win",
  description: "Gamified prediction market with streak rewards on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-background text-foreground antialiased selection:bg-primary/20">
        <AppWalletProvider>
          <ToastProvider />
          <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <Navbar />
            <RecentlyJoinedBanner />
            <main className="flex-1 relative z-10 container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </AppWalletProvider>
      </body>
    </html>
  );
}


