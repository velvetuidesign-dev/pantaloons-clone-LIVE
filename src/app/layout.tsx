import AuthModal from '../components/AuthModal';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantaloons | Premium Fashion",
  description: "Find the latest fashion trends at a Pantaloons store near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <Navbar />
        
        <div className="flex-grow">
          {children}
        </div>
        
        <Footer />
        
        {/* The Login Popup waiting in the background! */}
        <AuthModal />
      </body>
    </html>
  );
}