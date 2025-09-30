import { searchRateLimiter, contactRateLimiter } from './rateLimiter';

export interface SecurityConfig {
  enableRateLimit?: boolean;
  enableCSRF?: boolean;
  enableEncryption?: boolean;
  rateLimitKey?: string;
}

export interface SecurityHeaders {
  'X-Requested-With': string;
  'X-CSRF-Token'?: string;
  'X-Rate-Limit-Key'?: string;
  'Content-Security-Policy'?: string;
}

/**
 * Generate CSRF token (simplified implementation)
 * In production, this should be provided by the server
 */
function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Get or create CSRF token from sessionStorage
 */
function getCSRFToken(): string {
  let token = sessionStorage.getItem('csrf-token');
  if (!token) {
    token = generateCSRFToken();
    sessionStorage.setItem('csrf-token', token);
  }
  return token;
}

/**
 * Sanitize input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validate and sanitize form data
 */
export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (value instanceof File) {
      // Files are handled separately by file validation
      sanitized[key] = value;
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Generate security headers for API requests
 */
export function generateSecurityHeaders(config: SecurityConfig = {}): SecurityHeaders {
  const headers: SecurityHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (config.enableCSRF !== false) {
    headers['X-CSRF-Token'] = getCSRFToken();
  }

  if (config.rateLimitKey) {
    headers['X-Rate-Limit-Key'] = config.rateLimitKey;
  }

  // Content Security Policy header
  headers['Content-Security-Policy'] = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.example.com",
    "frame-src https://www.google.com"
  ].join('; ');

  return headers;
}

/**
 * Security middleware for API requests
 */
export class SecurityMiddleware {
  private config: SecurityConfig;

  constructor(config: SecurityConfig = {}) {
    this.config = {
      enableRateLimit: true,
      enableCSRF: true,
      enableEncryption: false,
      ...config
    };
  }

  /**
   * Process request before sending
   */
  async processRequest(
    url: string, 
    options: RequestInit = {}, 
    rateLimitKey?: string
  ): Promise<RequestInit> {
    // Rate limiting check
    if (this.config.enableRateLimit && rateLimitKey) {
      if (!this.checkRateLimit(url, rateLimitKey)) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
    }

    // Add security headers
    const securityHeaders = generateSecurityHeaders({
      ...this.config,
      rateLimitKey
    });

    const headers = {
      ...securityHeaders,
      ...options.headers
    };

    // Sanitize body data if it's form data
    let body = options.body;
    if (body && typeof body === 'string') {
      try {
        const data = JSON.parse(body);
        const sanitizedData = sanitizeFormData(data);
        body = JSON.stringify(sanitizedData);
      } catch (e) {
        // Not JSON, leave as is
      }
    }

    return {
      ...options,
      headers,
      body,
      credentials: 'same-origin', // Include cookies for CSRF protection
    };
  }

  /**
   * Check rate limits for different endpoints
   */
  private checkRateLimit(url: string, key: string): boolean {
    if (url.includes('/search')) {
      return searchRateLimiter.isAllowed(key);
    } else if (url.includes('/contact')) {
      return contactRateLimiter.isAllowed(key);
    }
    
    // Default: allow request
    return true;
  }

  /**
   * Process response after receiving
   */
  async processResponse(response: Response): Promise<Response> {
    // Check for security headers in response
    const csp = response.headers.get('Content-Security-Policy');
    if (!csp) {
      console.warn('Response missing Content-Security-Policy header');
    }

    // Check for rate limit headers
    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
    if (rateLimitRemaining && parseInt(rateLimitRemaining) < 5) {
      console.warn('Approaching rate limit');
    }

    return response;
  }
}

/**
 * Secure fetch wrapper
 */
export async function secureFetch(
  url: string, 
  options: RequestInit = {}, 
  config: SecurityConfig = {}
): Promise<Response> {
  const middleware = new SecurityMiddleware(config);
  
  // Get rate limit key (could be user ID, IP, etc.)
  const rateLimitKey = config.rateLimitKey || 'anonymous';
  
  try {
    const secureOptions = await middleware.processRequest(url, options, rateLimitKey);
    const response = await fetch(url, secureOptions);
    
    return await middleware.processResponse(response);
  } catch (error) {
    console.error('Secure fetch error:', error);
    throw error;
  }
}

/**
 * Validate URL to prevent SSRF attacks
 */
export function validateURL(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    // Only allow HTTP and HTTPS protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false;
    }
    
    // Block private IP ranges
    const hostname = parsedUrl.hostname;
    const privateRanges = [
      /^127\./, // 127.0.0.0/8
      /^10\./, // 10.0.0.0/8
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
      /^192\.168\./, // 192.168.0.0/16
      /^169\.254\./, // 169.254.0.0/16 (link-local)
      /^::1$/, // IPv6 localhost
      /^fc00:/, // IPv6 private
      /^fe80:/, // IPv6 link-local
    ];
    
    if (privateRanges.some(range => range.test(hostname))) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Content Security Policy configuration
 */
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "https://www.google.com", "https://www.gstatic.com"],
  'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  'font-src': ["'self'", "https://fonts.gstatic.com"],
  'img-src': ["'self'", "data:", "https:"],
  'connect-src': ["'self'"],
  'frame-src': ["https://www.google.com"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
};

/**
 * Generate CSP header string
 */
export function generateCSPHeader(): string {
  return Object.entries(CSP_CONFIG)
    .map(([directive, sources]) => 
      sources.length > 0 ? `${directive} ${sources.join(' ')}` : directive
    )
    .join('; ');
}

export default SecurityMiddleware;
