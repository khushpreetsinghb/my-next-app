'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageOptimizationDemo() {
  const [activeTab, setActiveTab] = useState('comparison');
  const [showLayoutShift, setShowLayoutShift] = useState(false);

  const tabs = [
    { id: 'comparison', label: 'Comparison', icon: '🔄' },
    { id: 'benefits', label: 'Benefits', icon: '✅' },
    { id: 'examples', label: 'Examples', icon: '🖼️' },
    { id: 'interview', label: 'Interview', icon: '💼' }
  ];

  // Simulate layout shift
  const simulateLayoutShift = () => {
    setShowLayoutShift(true);
    setTimeout(() => setShowLayoutShift(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🖼️ Image Optimization in Next.js</h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative">
          <div className="min-h-[450px] max-h-[450px] overflow-y-auto">
            <div className="space-y-4">
              {activeTab === 'comparison' && (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-3">❌ Normal &lt;img&gt; Problems</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-red-600 font-bold">1.</span>
                        <div>
                          <strong>Large file size</strong>
                          <p className="text-sm text-red-600">No automatic compression or optimization</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-600 font-bold">2.</span>
                        <div>
                          <strong>Slow loading</strong>
                          <p className="text-sm text-red-600">No lazy loading by default</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-600 font-bold">3.</span>
                        <div>
                          <strong>Layout shift</strong>
                          <p className="text-sm text-red-600">No dimensions specified causes page jumping</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-white rounded border border-red-200">
                      <h4 className="font-medium text-red-700 mb-2">Example Problem:</h4>
                      <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {`<img src="/hero.png" alt="hero" />
// Problems: No dimensions, no optimization, no lazy loading`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-3">✅ Next.js Image Solution</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-green-600 font-bold">1.</span>
                        <div>
                          <strong>Auto compression</strong>
                          <p className="text-sm text-green-600">Optimizes images for different devices</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-600 font-bold">2.</span>
                        <div>
                          <strong>Lazy loading</strong>
                          <p className="text-sm text-green-600">Images load only when needed</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-600 font-bold">3.</span>
                        <div>
                          <strong>No layout shift</strong>
                          <p className="text-sm text-green-600">Required dimensions prevent jumping</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-white rounded border border-green-200">
                      <h4 className="font-medium text-green-700 mb-2">Next.js Solution:</h4>
                      <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {`import Image from 'next/image';

<Image
  src="/hero.png"
  width={300}
  height={200}
  alt="hero"
  priority // For above-the-fold images
/>`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">🎬 Live Demo</h3>
                    <button
                      onClick={simulateLayoutShift}
                      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      ⚡ Simulate Layout Shift Problem
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded p-3">
                        <h4 className="font-medium text-gray-700 mb-2">❌ Regular img (Layout Shift)</h4>
                        <div className={`relative ${showLayoutShift ? 'h-32' : 'h-16'} transition-all duration-500`}>
                          <img
                            src="/next.svg"
                            alt="Regular Image"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Watch the height change!</p>
                      </div>

                      <div className="border border-gray-200 rounded p-3">
                        <h4 className="font-medium text-gray-700 mb-2">✅ Next.js Image (Stable)</h4>
                        <div className="relative h-16">
                          <Image
                            src="/next.svg"
                            alt="Optimized Image"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">No layout shift!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-3">🚀 Performance Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white rounded p-3 border border-purple-200">
                        <h4 className="font-medium text-purple-700 mb-1">⚡ Faster Loading</h4>
                        <ul className="text-sm text-purple-600 space-y-1">
                          <li>• Automatic WebP conversion</li>
                          <li>• Responsive image generation</li>
                          <li>• Built-in lazy loading</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded p-3 border border-purple-200">
                        <h4 className="font-medium text-purple-700 mb-1">📊 Better Core Web Vitals</h4>
                        <ul className="text-sm text-purple-600 space-y-1">
                          <li>• Improved LCP (Largest Contentful Paint)</li>
                          <li>• Reduced CLS (Cumulative Layout Shift)</li>
                          <li>• Better FID (First Input Delay)</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded p-3 border border-purple-200">
                        <h4 className="font-medium text-purple-700 mb-1">🔒 Enhanced Security</h4>
                        <ul className="text-sm text-purple-600 space-y-1">
                          <li>• Prevents XSS attacks</li>
                          <li>• Configurable domains</li>
                          <li>• Built-in blur placeholder</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded p-3 border border-purple-200">
                        <h4 className="font-medium text-purple-700 mb-1">🎨 Better UX</h4>
                        <ul className="text-sm text-purple-600 space-y-1">
                          <li>• Smooth loading transitions</li>
                          <li>• Blur-up effect</li>
                          <li>• No layout jumping</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 mb-3">📈 SEO Impact</h3>
                    <div className="space-y-2 text-orange-700">
                      <p><strong>Page Speed:</strong> Faster loading = better rankings</p>
                      <p><strong>Mobile-First:</strong> Optimized for all devices</p>
                      <p><strong>User Experience:</strong> Lower bounce rates</p>
                      <p><strong>Accessibility:</strong> Better alt text handling</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'examples' && (
                <div className="space-y-4">
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <h3 className="font-semibold text-cyan-800 mb-3">💻 Common Usage Examples</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-cyan-700 mb-1">1. Basic Image</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {`import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={500}
  height={300}
  alt="Hero section"
/>`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-medium text-cyan-700 mb-1">2. Responsive Image</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {`<Image
  src="/banner.jpg"
  width={1200}
  height={600}
  alt="Responsive banner"
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
                        </pre>
                      </div>
                      {/* The sizes prop tells the browser:
                      “How wide will this image be displayed at different screen sizes?”
                      This helps the browser choose the best image size for performance. 
                      
                      “Why does sizes have multiple values?”
                      sizes="(max-width: 768px) 100vw, 50vw"
                      This uses media conditions, similar to CSS media queries.
                      It means:
                      If screen width ≤ 768px → image will be 100vw
                      100vw = 100% of viewport width
                      Otherwise → image will be 50vw
                      50vw = 50% of viewport width
                      So it works like:
                      IF screen ≤ 768px
                        use 100vw
                      ELSE
                        use 50vw */}

                      <div>
                        <h4 className="font-medium text-cyan-700 mb-1">3. Priority Loading (Above Fold)</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {`<Image
  src="/logo.png"
  width={200}
  height={100}
  alt="Company logo"
  priority // Loads immediately
/>`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-medium text-cyan-700 mb-1">4. With Blur Placeholder</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {`<Image
  src="/background.jpg"
  width={1920}
  height={1080}
  alt="Background"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>`}
                        </pre>
                      </div>
                      {/* What is placeholder="blur"?
                      placeholder controls what shows while the image is loading.
                      When you write:
                      placeholder="blur"
                      It tells Next.js:
                      “Before the real image loads, show a blurred preview version.”
                      So instead of:
                      ❌ Empty space
                      ❌ Layout shift
                      ❌ Flash of loading
                      You get:
                      ✅ A small blurred version of the image
                      ✅ Smooth loading transition
                      This is called the blur-up effect. 
                      
                      What is blurDataURL?
                      blurDataURL="data:image/jpeg;base64,..."
                      This is a very small, low-quality version of the image encoded as Base64.
                      It’s used as the blurred preview before the full image loads.
                      How it works:
                      Tiny blurred image loads instantly
                      Full image downloads in background
                      Blurred image fades into full image

                      Why is it Base64?
                      Because it’s embedded directly in the HTML as a data URL:
                      data:image/jpeg;base64,...
                      That means:
                      No extra network request
                      Loads instantly
                      Perfect for small previews

                      When do you need to provide blurDataURL manually?
                      ✅ You must provide it manually when:
                      Using external images
                      Using dynamic image URLs
                      Using fill
                      Loading from a CMS
                      ❌ You DON’T need to provide it when:
                      Importing a local static image like:
                      import bg from "../public/background.jpg";
                      <Image src={bg} placeholder="blur" />
                      Next.js automatically generates the blur for static imports.
                      */}

                      <div>
                        <h4 className="font-medium text-cyan-700 mb-1">5. Fill Container</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {`<div className="relative w-full h-64">
  <Image
    src="/gallery.jpg"
    fill
    alt="Gallery image"
    className="object-cover"
  />
</div>`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'interview' && (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-3">💼 Interview Questions & Answers</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-red-700 mb-1">Q: Why use Next.js Image component over regular img?</h4>
                        <div className="bg-white rounded p-3 border border-red-200">
                          <p className="text-sm text-red-600">
                            <strong>A:</strong> "Next.js Image component provides built-in optimization including automatic compression,
                            WebP conversion, lazy loading, and prevents layout shift by requiring dimensions. It significantly improves
                            Core Web Vitals and page performance."
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-700 mb-1">Q: What are Core Web Vitals and how does Image help?</h4>
                        <div className="bg-white rounded p-3 border border-red-200">
                          <p className="text-sm text-red-600">
                            <strong>A:</strong> "Core Web Vitals are LCP, FID, and CLS. Next.js Image improves LCP through optimization
                            and priority loading, reduces CLS by preventing layout shift with required dimensions, and helps FID by
                            reducing JavaScript execution time."
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-700 mb-1">Q: When would you use the priority prop?</h4>
                        <div className="bg-white rounded p-3 border border-red-200">
                          <p className="text-sm text-red-600">
                            <strong>A:</strong> "The priority prop should be used for above-the-fold images that are immediately visible,
                            like hero images, logos, or banners. It tells Next.js to preload these images for faster loading."
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-700 mb-1">Q: What's the difference between fill and width/height props?</h4>
                        <div className="bg-white rounded p-3 border border-red-200">
                          <p className="text-sm text-red-600">
                            <strong>A:</strong> "Width/height are used when you know exact dimensions. Fill makes the image expand
                            to fill its parent container, which must have position: relative. Fill is great for responsive designs
                            and background images."
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <h4 className="font-medium text-yellow-800 mb-1">🎯 Quick Answer Formula:</h4>
                        <p className="text-sm text-yellow-700 font-medium">
                          "Next.js Image = Auto optimization + Lazy loading + No layout shift + Better Core Web Vitals"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
