/**
 * GraphQL Schema Definition
 * 
 * This file combines all GraphQL type definitions and resolvers
 * into a single schema. GraphQL schemas are perfect for:
 * 
 * Use Cases:
 * - APIs where clients need different data shapes
 * - Mobile apps that need to minimize data transfer
 * - Complex applications with nested data relationships
 * - Real-time features requiring subscriptions
 * - APIs serving multiple client applications
 * 
 * Schema Structure:
 * - Type definitions: Define data types (User, Post, etc.)
 * - Queries: Read operations (getUser, getPosts, etc.)
 * - Mutations: Write operations (createUser, updatePost, etc.)
 * - Subscriptions: Real-time updates (userCreated, postUpdated, etc.)
 */

import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/UserResolver';
import { PostResolver } from '../resolvers/PostResolver';
import { AuthResolver } from '../resolvers/AuthResolver';

/**
 * Build the GraphQL schema from resolvers
 * 
 * This creates a complete GraphQL schema with:
 * - Type definitions from resolver classes
 * - Query, Mutation, and Subscription operations
 * - Input validation using class-validator
 * - Authorization using decorators
 */
export const schema = await buildSchema({
  resolvers: [
    UserResolver,    // User-related queries and mutations
    PostResolver,    // Post-related queries and mutations
    AuthResolver,    // Authentication (login, register)
  ],
  validate: true,   // Enable automatic validation
  // Use cases: Automatic validation of input types
});

