import ServerComponentExample from "@/components/basics/ServerComponentExample";
import ErrorTestButton from "@/components/examples/ErrorTestButton";
import DynamicRoutesExample from "@/components/DynamicRoutesExample";
import RouteGroupsExample from "@/components/RouteGroupsExample";
import RouteHandlersDemo from "@/components/RouteHandlersDemo";
import FileUploadDemo from "@/components/FileUploadDemo";
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <ErrorTestButton />
            <p className="text-sm text-gray-600">
              Click this button to test the error page functionality
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6">Rendering Methods & Caching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/ssr-demo"
                className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-semibold text-blue-800 mb-1">Server-Side Rendering</h3>
                <p className="text-sm text-blue-600">SSR</p>
              </Link>
              <Link
                href="/ssg-demo"
                className="block p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center"
              >
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold text-green-800 mb-1">Static Site Generation</h3>
                <p className="text-sm text-green-600">SSG</p>
              </Link>
              <Link
                href="/isr-demo"
                className="block p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center"
              >
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold text-purple-800 mb-1">Incremental Static Regeneration</h3>
                <p className="text-sm text-purple-600">ISR</p>
              </Link>
              <Link
                href="/tag-revalidation-demo"
                className="block p-6 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-center"
              >
                <div className="text-3xl mb-2">🏷️</div>
                <h3 className="font-semibold text-orange-800 mb-1">Tag-Based Revalidation</h3>
                <p className="text-sm text-orange-600">Cache Control</p>
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Learn how different rendering methods and caching strategies work with practical examples
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Server Components</h2>
                <ServerComponentExample />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Dynamic Routes</h2>
                <DynamicRoutesExample />
                <div className="mt-4 text-center">
                  <Link
                    href="/demo/123"
                    className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    🚀 See Live Example: /demo/123
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Groups</h2>
                <RouteGroupsExample />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 API Route Handlers</h2>
                <RouteHandlersDemo />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">📁 File Upload</h2>
                <FileUploadDemo />
              </div>
            </div>
          </div>
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