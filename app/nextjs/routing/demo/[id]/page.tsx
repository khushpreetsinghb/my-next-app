import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Simulate fetching data for different dynamic routes
const demoData: Record<string, {
  title: string;
  description: string;
  content: string;
  type: 'blog' | 'product' | 'user';
}> = {
  '123': {
    title: 'Getting Started with Next.js',
    description: 'A comprehensive guide to building modern web applications',
    content: `Next.js is a powerful React framework that enables you to build server-rendered applications with ease. 
    It provides features like file-based routing, API routes, and optimized performance out of the box.`,
    type: 'blog'
  },
  'laptop-pro': {
    title: 'Laptop Pro - Ultimate Performance',
    description: 'High-performance laptop for professionals',
    content: `The Laptop Pro features the latest processor, 32GB RAM, and a stunning 4K display. 
    Perfect for developers, designers, and content creators who need maximum performance.`,
    type: 'product'
  },
  'johndoe': {
    title: 'John Doe - Full Stack Developer',
    description: 'Passionate about creating amazing web experiences',
    content: `John is a full stack developer with 5+ years of experience in React, Node.js, and cloud technologies. 
    Specializes in building scalable web applications and leading development teams.`,
    type: 'user'
  }
};

// Generate static params for SSG
export async function generateStaticParams() {
  // In a real app, this would fetch from a database or API
  return Object.keys(demoData).map((id) => ({
    id: id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = demoData[id];
  
  if (!data) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: `${data.title} - Dynamic Route Demo`,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'website',
    },
  };
}
// In newer Next.js versions, params is now a Promise and needs to be awaited.

// Updated generateMetadata function to await the params Promise
// Made the page component async and awaited params at the beginning
// Fixed all references to use the awaited id variable instead of params.id

export default async function DynamicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = demoData[id];

  // Handle 404 for non-existent routes
  if (!data) {
    notFound();
  }
  // notFound is a Next.js function that triggers a 404 page. Here's what it does:

  // Purpose:
  // Shows 404 page: Displays the built-in Next.js 404 error page
  // Stops execution: Halts the current page rendering immediately
  // SEO friendly: Returns proper 404 HTTP status code

  // Common Use Cases:
  // import { notFound } from 'next/navigation';
  
  // 1. Data doesn't exist
  // const user = await getUser(params.id);
  // if (!user) {
  //   notFound(); // Shows 404 instead of crashing
  // }

  // 2. Invalid parameters
  // if (!isValidId(params.id)) {
  //   notFound();
  // }
  
  // 3. Unpublished content
  // if (!post.isPublished) {
  //   notFound();
  // }

  // In our Dynamic Route:
  // const data = demoData[id];
  // if (!data) {
  //   notFound(); // Shows 404 for /demo/nonexistent
  // }

  // Benefits:
  // Better UX: Shows friendly 404 page instead of errors
  // Consistent: Uses Next.js's styled 404 page
  // Performance: Stops unnecessary processing
  // SEO: Proper HTTP status for search engines

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return '📝';
      case 'product': return '🛍️';
      case 'user': return '👤';
      default: return '📄';
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li>/</li>
            <li className="hover:text-gray-900">Demo</li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{id}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{getTypeIcon(data.type)}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20`}>
                {data.type.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-blue-100">{data.description}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.content}
              </p>
            </div>

            {/* Route Information */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">🔍 Dynamic Route Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Route Parameters:</h3>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">
                      params.id = <span className="text-blue-600">"{id}"</span>
                    </code>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">File Structure:</h3>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm text-green-600">
                      app/demo/[id]/page.tsx
                    </code>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">How This Works:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>The <code className="bg-gray-200 px-1 rounded">[id]</code> folder creates a dynamic route segment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>URL parameters are passed to the page component via the <code className="bg-gray-200 px-1 rounded">params</code> prop</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><code className="bg-gray-200 px-1 rounded">generateStaticParams()</code> pre-builds these pages for better performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><code className="bg-gray-200 px-1 rounded">generateMetadata()</code> creates dynamic SEO metadata</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">Try These Examples:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(demoData).map((demoId) => (
                    <Link
                      key={demoId}
                      href={`/demo/${demoId}`}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        id === demoId
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      /demo/{demoId}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Back Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
