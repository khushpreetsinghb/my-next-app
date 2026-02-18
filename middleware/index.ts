// Middleware exports for easy importing
import { NextResponse } from 'next/server'

export {
  authMiddleware,
  rbacMiddleware,
  adminMiddleware,
  moderatorMiddleware
} from './auth'

export {
  loggingMiddleware,
  responseLoggingMiddleware,
  errorLoggingMiddleware,
  apiLoggingMiddleware,
  performanceMiddleware
} from './logging'

export {
  corsMiddleware,
  corsResponseMiddleware,
  strictCorsMiddleware,
  devCorsMiddleware,
  validateOriginMiddleware,
  routeSpecificCors,
  createCorsMiddleware
} from './cors'

export {
  rateLimitMiddleware,
  ipRateLimit,
  userRateLimit,
  strictRateLimit,
  apiRateLimit,
  loginRateLimit,
  passwordResetRateLimit,
  progressiveRateLimit,
  createEndpointRateLimit,
  tieredRateLimit,
  rateLimitStats
} from './rateLimit'

export {
  securityHeadersMiddleware,
  inputValidationMiddleware,
  botDetectionMiddleware,
  ipBlockingMiddleware,
  requestSizeLimitMiddleware,
  apiKeyMiddleware,
  requestTimingMiddleware,
  securityMiddleware
} from './security'

// Export utility functions
export { getClientIP } from './logging'
export { getClientIP as getClientIPFromRateLimit } from './rateLimit'
export { getClientIP as getClientIPFromSecurity } from './security'

// Define middleware type to avoid deprecation warning
type MiddlewareFunction = (
  request: any,
  event: any
) => Promise<any | void | undefined>

// Middleware chain helper
export function createMiddlewareChain(middlewares: MiddlewareFunction[]): MiddlewareFunction {
  return async (request, event) => {
    for (const middleware of middlewares) {
      const result = await middleware(request, event)

      // If middleware returns a response, stop the chain
      if (result && result !== NextResponse.next()) {
        return result
      }
    }

    return NextResponse.next()
  }
}

// Conditional middleware helper
export function createConditionalMiddleware(
  condition: (request: Request) => boolean,
  middleware: MiddlewareFunction
): MiddlewareFunction {
  return async (request, event) => {
    if (condition(request)) {
      return middleware(request, event)
    }

    return NextResponse.next()
  }
}

// Path-based middleware helper
export function createPathMiddleware(
  paths: string[],
  middleware: MiddlewareFunction,
  exact: boolean = false
): MiddlewareFunction {
  return createConditionalMiddleware(
    (request) => {
      const url = new URL(request.url)
      const pathname = url.pathname

      if (exact) {
        return paths.includes(pathname)
      } else {
        return paths.some(path => pathname.startsWith(path))
      }
    },
    middleware
  )
}

// Method-based middleware helper
export function createMethodMiddleware(
  methods: string[],
  middleware: MiddlewareFunction
): MiddlewareFunction {
  return createConditionalMiddleware(
    (request) => methods.includes(request.method),
    middleware
  )
}

// Environment-based middleware helper
export function createEnvironmentMiddleware(
  environments: string[],
  middleware: MiddlewareFunction
): MiddlewareFunction {
  return createConditionalMiddleware(
    () => environments.includes(process.env.NODE_ENV || 'development'),
    middleware
  )
}
