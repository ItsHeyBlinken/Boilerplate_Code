/**
 * JWT Utilities
 * 
 * Functions for creating and verifying JWT tokens.
 * Used for authentication and authorization.
 * 
 * Use Cases:
 * - User authentication
 * - API access tokens
 * - Session management
 * - Secure token-based auth
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate JWT token for user
 * 
 * Use Cases:
 * - After successful login
 * - After user registration
 * - Token refresh
 */
export function generateToken(user: { id: string; email: string }): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

/**
 * Verify and decode JWT token
 * 
 * Use Cases:
 * - Authenticating API requests
 * - Extracting user information from token
 * - Token validation
 */
export function verifyToken(token: string): { userId: string; email: string } {
  return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
}

