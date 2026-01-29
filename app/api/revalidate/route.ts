import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tag } = body
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag is required' }, 
        { status: 400 }
      )
    }
    
    // Revalidate the specified tag
    revalidateTag(tag, {})
    
    return NextResponse.json({
      success: true,
      message: `Revalidated tag: ${tag}`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revalidate' }, 
      { status: 500 }
    )
  }
}

// 2. /api/revalidate/route.ts
// Purpose: Triggers revalidation of cached data

// Revalidates the "posts" tag
// This INVALIDATES cache
// POST() → Calls revalidateTag('posts')