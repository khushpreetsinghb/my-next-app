import ServerComponentExample from "@/components/basics/ServerComponentExample";
// import ErrorTestButton from "@/components/examples/ErrorTestButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page - Next.js Learning App",
  description: "Welcome to my Next.js learning site. Explore React, Next.js, and modern web development concepts.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MUI", "Web Development", "Learning", "Tutorial"],
  openGraph: {
    title: "Home Page - Next.js Learning App",
    description: "Welcome to my Next.js learning site. Explore React, Next.js, and modern web development concepts.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Next.js</h1>
      
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* <div className="mb-8 text-center">
            <ErrorTestButton />
            <p className="text-sm text-gray-600">
              Click this button to test the error page functionality
            </p>
          </div> */}
          <ServerComponentExample />
        </div>
      </div>
    </main>
  );
}
