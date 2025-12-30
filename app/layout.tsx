import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import EmotionRegistry from "./emotion-registry";
import Navbar from "@/components/ReusableComponents/Navbar";
import Footer from "@/components/ReusableComponents/Footer";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Learning App",
  description: "Learning Next.js and React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <EmotionRegistry>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
