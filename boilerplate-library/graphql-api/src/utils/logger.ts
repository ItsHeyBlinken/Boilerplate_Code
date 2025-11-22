/**
 * Logger Utility
 * 
 * Centralized logging for the application.
 * 
 * Use Cases:
 * - Debugging
 * - Error tracking
 * - Request logging
 * - Performance monitoring
 */

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
};

