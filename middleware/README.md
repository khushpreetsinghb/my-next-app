# Middleware Learning Guide

This directory contains a comprehensive collection of Next.js middleware examples for learning purposes. Each middleware type is organized in its own file with detailed comments and examples.

## 📁 File Structure

```
middleware/
├── index.ts          # Main exports and utility functions
├── auth.ts           # Authentication and authorization middleware
├── logging.ts        # Request/response logging middleware
├── cors.ts           # CORS handling middleware
├── rateLimit.ts      # Rate limiting middleware
├── security.ts       # Security headers and validation middleware
└── README.md         # This documentation
```

## 🚀 Available Middlewares

### 1. Authentication (`auth.ts`)

- `authMiddleware` - Basic authentication with token validation
- `rbacMiddleware` - Role-based access control
- `adminMiddleware` - Admin-only access
- `moderatorMiddleware` - Moderator-level access

**Usage Example:**
```typescript
// Protect admin routes
const adminProtection = createPathMiddleware(['/api/admin'], adminMiddleware)
```

### 2. Logging (`logging.ts`)

- `loggingMiddleware` - Request logging with details
- `responseLoggingMiddleware` - Response timing logging
- `errorLoggingMiddleware` - Error tracking
- `apiLoggingMiddleware` - API-specific logging
- `performanceMiddleware` - Performance monitoring

**Features:**
- IP address detection
- User agent logging
- Request body logging (dev only)
- Response time tracking

### 3. CORS (`cors.ts`)

- `corsMiddleware` - Basic CORS handling
- `strictCorsMiddleware` - Strict CORS for APIs
- `devCorsMiddleware` - Permissive CORS for development
- `createCorsMiddleware` - Custom CORS configuration

**Configuration Options:**
- Allowed origins
- Allowed methods
- Allowed headers
- Credentials support
- Max age

### 4. Rate Limiting (`rateLimit.ts`)

- `ipRateLimit` - IP-based rate limiting
- `userRateLimit` - User-based rate limiting
- `apiRateLimit` - API-specific rate limiting
- `loginRateLimit` - Login attempt limiting
- `progressiveRateLimit` - Progressive rate limiting
- `tieredRateLimit` - Tier-based rate limiting

**Features:**
- In-memory storage (use Redis in production)
- Configurable windows and limits
- Progressive penalties
- Rate limit headers

### 5. Security (`security.ts`)

- `securityHeadersMiddleware` - Security headers
- `inputValidationMiddleware` - Input validation
- `botDetectionMiddleware` - Bot detection
- `ipBlockingMiddleware` - IP blocking
- `apiKeyMiddleware` - API key validation
- `securityMiddleware` - Combined security

**Security Features:**
- XSS protection
- CSRF protection
- Content Security Policy
- Input sanitization
- Bot detection

## 🛠️ Utility Functions

### Middleware Helpers

- `createMiddlewareChain` - Chain multiple middlewares
- `createConditionalMiddleware` - Conditional middleware execution
- `createPathMiddleware` - Path-based middleware
- `createMethodMiddleware` - HTTP method-based middleware
- `createEnvironmentMiddleware` - Environment-based middleware

### IP Detection

- `getClientIP()` - Get client IP address from various headers

## 📖 Usage Examples

### Basic Usage

```typescript
import { loggingMiddleware, authMiddleware, createMiddlewareChain } from './middleware'

export default function middleware(request, event) {
  const chain = createMiddlewareChain([
    loggingMiddleware,
    authMiddleware
  ])
  
  return chain(request, event)
}
```

### Conditional Middleware

```typescript
import { createPathMiddleware, createMethodMiddleware } from './middleware'

// Only for API routes
const apiOnly = createPathMiddleware(['/api'], yourMiddleware)

// Only for POST requests
const postOnly = createMethodMiddleware(['POST'], yourMiddleware)
```

### Custom Rate Limiting

```typescript
import { rateLimitMiddleware } from './middleware'

const customLimit = rateLimitMiddleware({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 50,
  message: 'Custom rate limit exceeded'
})
```

### CORS Configuration

```typescript
import { createCorsMiddleware } from './middleware'

const customCORS = createCorsMiddleware({
  allowedOrigins: ['https://yourdomain.com'],
  allowedMethods: ['GET', 'POST'],
  credentials: true
})
```

## 🔧 Configuration

### Main Middleware (`middleware.ts`)

The main middleware file demonstrates how to combine different middleware types:

```typescript
export default function middleware(request, event) {
  const middlewares = [
    loggingMiddleware,
    securityHeadersMiddleware,
    createPathMiddleware(['/api'], corsMiddleware),
    createPathMiddleware(['/api'], ipRateLimit),
    authMiddleware
  ]

  return createMiddlewareChain(middlewares)(request, event)
}
```

### Matcher Configuration

```typescript
export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
```

## 🧪 Testing Middlewares

### Test with curl

```bash
# Test rate limiting
for i in {1..105}; do
  curl -X GET http://localhost:3000/api/test
done

# Test authentication
curl -H "Authorization: Bearer valid-token" http://localhost:3000/api/protected

# Test CORS
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:3000/api/test
```

### Test with Postman

1. Set headers for authentication
2. Test different rate limits
3. Verify CORS headers
4. Check security headers

## 📊 Monitoring

### Rate Limit Statistics

Visit `/api/rate-limit-stats` to see current rate limiting status.

### Logging

Check your console for detailed request logs in development.

### Security Headers

Use browser dev tools to verify security headers are set.

## 🚀 Production Considerations

1. **Rate Limiting**: Use Redis or database instead of in-memory storage
2. **Authentication**: Implement proper JWT validation
3. **Logging**: Use structured logging with log levels
4. **Security**: Configure CSP headers for your specific domain
5. **CORS**: Restrict origins to your actual domains

## 🔄 Advanced Patterns

### Middleware Composition

```typescript
const protectedAPI = createMiddlewareChain([
  corsMiddleware,
  rateLimitMiddleware,
  authMiddleware,
  securityMiddleware
])
```

### Dynamic Middleware

```typescript
export default function middleware(request, event) {
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/api/admin')) {
    return createMiddlewareChain([
      adminMiddleware,
      strictRateLimit,
      securityMiddleware
    ])(request, event)
  }
  
  // Default middleware chain
  return createMiddlewareChain([
    loggingMiddleware,
    authMiddleware
  ])(request, event)
}
```

## 📚 Learn More

- [Next.js Middleware Documentation](https://nextjs.org/docs/middleware)
- [HTTP Headers Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Rate Limiting Best Practices](https://tools.ietf.org/html/rfc6585)

---

**Happy Learning! 🎓**

This middleware collection is designed for educational purposes. Feel free to modify, experiment, and learn from each example.
