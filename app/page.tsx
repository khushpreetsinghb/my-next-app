import ServerComponentExample from "@/components/basics/ServerComponentExample";
import ErrorTestButton from "@/components/examples/ErrorTestButton";
import { Metadata } from "next";
import Link from "next/link";

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
          <div className="mb-8 text-center">
            <ErrorTestButton />
            <p className="text-sm text-gray-600">
              Click this button to test the error page functionality
            </p>
          </div>
          
          <div className="mb-8 text-center">
            <Link 
              href="/ssr-demo" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mr-4 mb-4"
            >
              🚀 Explore Server-Side Rendering (SSR)
            </Link>
            <Link 
              href="/ssg-demo" 
              className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mr-4 mb-4"
            >
              📄 Explore Static Site Generation (SSG)
            </Link>
            <Link 
              href="/isr-demo" 
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors mb-4"
            >
              🔄 Explore Incremental Static Regeneration (ISR)
            </Link>
            <p className="text-sm text-gray-600 mt-2">
              Learn how different rendering methods work with practical examples
            </p>
          </div>
          
          <ServerComponentExample />
        </div>
      </div>
    </main>
  );
}

// Those are actually just emoji characters - not from any icon library!
// They're the standard Unicode emojis that are built into all modern browsers and operating systems.

// 🎨 The Icons Used:
// 🚀 - Rocket emoji (SSR)
// 📄 - Page emoji (SSG)
// 🔄 - Refresh emoji (ISR)

// 💡 Why They Look Good:
// Native Support: Modern OS renders them as colorful icons
// No Dependencies: Zero library needed
// Consistent: Same across all platforms
// Accessible: Screen readers can read them

// 📚 If You Want Icon Libraries:
// For more professional icons, you could use:

// Lucide React - Modern, clean icons
// Heroicons - Tailwind's icon library
// React Icons - Multiple icon sets in one
// Font Awesome - Classic icon library

// 🔧 Example with Lucide:
// import { Rocket, FileText, RefreshCw } from 'lucide-react'
// <Rocket className="w-5 h-5" />  // instead of 🚀
// <FileText className="w-5 h-5" /> // instead of 📄  
// <RefreshCw className="w-5 h-5" /> // instead of 🔄
// But for learning demos, emojis work great - no setup required and they look professional!