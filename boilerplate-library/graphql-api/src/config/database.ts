/**
 * Database Configuration
 * 
 * Prisma Client setup for database access.
 * Prisma provides type-safe database queries.
 * 
 * Use Cases:
 * - Type-safe database queries
 * - Automatic query optimization
 * - Database migrations
 * - Connection pooling
 */

// Prisma Client - generated from schema.prisma
// Run 'npm run db:generate' to generate the client
// Use cases: Type-safe database queries, automatic migrations
import { PrismaClient } from '@prisma/client';

// Prisma Client instance
// Use cases: All database operations, type-safe queries
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Graceful shutdown
// Use cases: Clean database connection closure
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

