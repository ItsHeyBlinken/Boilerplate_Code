/**
 * GraphQL Context
 * 
 * Context provides request-scoped data to all resolvers.
 * This is perfect for:
 * 
 * Use Cases:
 * - Authentication (current user)
 * - Authorization (user roles)
 * - Database connections
 * - DataLoaders (N+1 query optimization)
 * - Request metadata (IP, user agent, etc.)
 * 
 * Context is created once per request and shared across all resolvers.
 */

import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { prisma } from './config/database';
import { verifyToken } from './utils/jwt';

export interface Context {
  req: Request;
  user?: {
    id: string;
    email: string;
    role: string;
  };
  prisma: PrismaClient;
  // DataLoaders can be added here for N+1 query optimization
  // Use cases: Batch loading related data efficiently
}

/**
 * Create context for each GraphQL request
 * 
 * This function:
 * 1. Extracts JWT token from request headers
 * 2. Verifies and decodes the token
 * 3. Loads user information
 * 4. Provides database connection
 * 
 * Use Cases:
 * - Authentication: Extract user from JWT
 * - Authorization: Check user roles
 * - Request tracking: Log user actions
 */
export async function context({ req }: { req: Request }): Promise<Context> {
  let user = undefined;

  // Extract token from Authorization header
  // Format: "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    try {
      const decoded = verifyToken(token);
      // Load user from database
      // Use cases: Get fresh user data, check if user still exists
      const foundUser = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (foundUser) {
        user = {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role || 'USER',
        };
      }
    } catch (error) {
      // Invalid token - user remains undefined
      // Use cases: Expired tokens, tampered tokens
    }
  }

  return {
    req,
    user,
    prisma,
  };
}

