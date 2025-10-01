interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number; // Time window in milliseconds
  blockDurationMs?: number; // How long to block after exceeding limit
}

interface AttemptRecord {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}

class RateLimiter {
  private attempts: Map<string, AttemptRecord> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      blockDurationMs: config.windowMs * 2, // Default block duration
      ...config
    };
  }

  /**
   * Check if an action is allowed for a given key (e.g., IP, user ID, email)
   */
  isAllowed(key: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(key);

    // No previous attempts
    if (!record) {
      this.attempts.set(key, {
        count: 1,
        firstAttempt: now
      });
      return true;
    }

    // Check if currently blocked
    if (record.blockedUntil && now < record.blockedUntil) {
      return false;
    }

    // Check if window has expired
    if (now - record.firstAttempt > this.config.windowMs) {
      // Reset the window
      this.attempts.set(key, {
        count: 1,
        firstAttempt: now
      });
      return true;
    }

    // Increment attempt count
    record.count++;

    // Check if limit exceeded
    if (record.count > this.config.maxAttempts) {
      record.blockedUntil = now + (this.config.blockDurationMs || this.config.windowMs);
      return false;
    }

    return true;
  }

  /**
   * Get remaining attempts for a key
   */
  getRemainingAttempts(key: string): number {
    const record = this.attempts.get(key);
    if (!record) return this.config.maxAttempts;
    
    const now = Date.now();
    
    // Check if window has expired
    if (now - record.firstAttempt > this.config.windowMs) {
      return this.config.maxAttempts;
    }

    return Math.max(0, this.config.maxAttempts - record.count);
  }

  /**
   * Get time until unblocked (in milliseconds)
   */
  getTimeUntilUnblocked(key: string): number {
    const record = this.attempts.get(key);
    if (!record || !record.blockedUntil) return 0;
    
    const now = Date.now();
    return Math.max(0, record.blockedUntil - now);
  }

  /**
   * Reset attempts for a key (e.g., after successful action)
   */
  reset(key: string): void {
    this.attempts.delete(key);
  }

  /**
   * Clean up expired records
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of Array.from(this.attempts.entries())) {
      // Remove records that are past their window and not blocked
      if (now - record.firstAttempt > this.config.windowMs && 
          (!record.blockedUntil || now > record.blockedUntil)) {
        this.attempts.delete(key);
      }
    }
  }
}

// Pre-configured rate limiters for common use cases
export const loginRateLimiter = new RateLimiter({
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 30 * 60 * 1000 // 30 minutes block
});

export const applicationRateLimiter = new RateLimiter({
  maxAttempts: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
  blockDurationMs: 2 * 60 * 60 * 1000 // 2 hours block
});

export const searchRateLimiter = new RateLimiter({
  maxAttempts: 100,
  windowMs: 60 * 1000, // 1 minute
  blockDurationMs: 5 * 60 * 1000 // 5 minutes block
});

export const contactRateLimiter = new RateLimiter({
  maxAttempts: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  blockDurationMs: 24 * 60 * 60 * 1000 // 24 hours block
});

// Cleanup expired records every 5 minutes
setInterval(() => {
  loginRateLimiter.cleanup();
  applicationRateLimiter.cleanup();
  searchRateLimiter.cleanup();
  contactRateLimiter.cleanup();
}, 5 * 60 * 1000);

export default RateLimiter;
