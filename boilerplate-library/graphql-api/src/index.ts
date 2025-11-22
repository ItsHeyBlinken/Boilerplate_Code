/**
 * GraphQL API Server Entry Point
 * 
 * This file initializes the Apollo Server with Express and sets up
 * the GraphQL endpoint. This boilerplate is perfect for:
 * 
 * Use Cases:
 * - Modern APIs with flexible querying (fetch only needed data)
 * - Mobile app backends (reduce over-fetching)
 * - Microservices with GraphQL gateway
 * - Real-time applications with subscriptions
 * - APIs serving multiple client types (web, mobile, desktop)
 * - Complex data relationships that benefit from GraphQL's nested queries
 * 
 * Key Features:
 * - Type-safe GraphQL schema with TypeScript
 * - Apollo Server with Express integration
 * - Prisma ORM for database access
 * - JWT authentication
 * - DataLoader for N+1 query optimization
 * - Subscriptions for real-time updates
 * - Error handling and validation
 */

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import { schema } from './schema';
import { context } from './context';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;

/**
 * Initialize and start the GraphQL server
 * 
 * This function:
 * 1. Creates an Express app and HTTP server
 * 2. Sets up Apollo Server with schema and context
 * 3. Configures CORS and middleware
 * 4. Starts the server on the configured port
 */
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Create Apollo Server instance
  // Use cases: API gateway, microservices, real-time apps
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // Context provides request-scoped data (user, database connections, etc.)
    // Use cases: Authentication, authorization, data loaders
    context: context,
  });

  await server.start();

  // GraphQL endpoint middleware
  // Use cases: Single endpoint for all queries, mutations, subscriptions
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      // Context function runs for each request
      // Use cases: Extract auth token, set user, initialize data loaders
      context: async ({ req }) => {
        return await context({ req });
      },
    })
  );

  // Health check endpoint
  // Use cases: Load balancer health checks, monitoring
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  logger.info(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
  logger.info(`📊 GraphQL Playground available in development mode`);
}

startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});

