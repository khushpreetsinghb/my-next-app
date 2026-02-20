import { NextResponse } from 'next/server'

export async function GET() {
  // Simulate fetching from a data source with tag-based caching
  // In real app, this would be: fetch('https://external-api.com/posts', { next: { tags: ['posts'] } })
  
  // For demo, we'll simulate the tagged data
  const taggedData = {
    posts: [
      {
        id: 1,
        title: `Post updated at ${new Date().toLocaleString()}`,
        content: 'This content gets revalidated when the "posts" tag is triggered',
        author: 'Demo User',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        title: `Another post at ${new Date().toLocaleString()}`,
        content: 'Tag-based revalidation allows instant updates',
        author: 'Demo User',
        timestamp: new Date().toISOString()
      }
    ],
    metadata: {
      totalPosts: 2,
      lastUpdated: new Date().toISOString(),
      cacheTag: 'posts'
    }
  }

  // This response will be cached with the "posts" tag
  return NextResponse.json({
    data: taggedData,
    message: 'Data cached with "posts" tag',
    cachedAt: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      'Cache-Tag': 'posts' // This tag can be revalidated
    }
  })

  // Correct Architecture:
  // Client: Triggers revalidation via API call
  // Server: API route handles tagged caching
  // Cache: Lives on server, revalidated by revalidateTag()
}


// 1. /api/tagged-data/route.ts
// Purpose: Provides data that gets cached with tags

// Returns data with "posts" tag
// This response gets CACHED
// GET() → Returns posts data