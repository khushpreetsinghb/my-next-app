import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home - Next.js Learning App",
  description: "Welcome to my Next.js learning site.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Next.js Learning</h1>
      </div>
    </main>
  );
}