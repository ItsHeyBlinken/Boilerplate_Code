/**
 * User Resolver
 * 
 * GraphQL resolvers define how to fetch and modify data for each field.
 * This resolver handles all User-related operations.
 * 
 * Use Cases:
 * - User profile management
 * - User authentication and authorization
 * - User search and filtering
 * - User relationship queries (user's posts, comments, etc.)
 * 
 * GraphQL Benefits:
 * - Clients can request only needed fields (reduces payload size)
 * - Nested queries (user.posts.comments) in single request
 * - Type-safe with TypeScript
 */

import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { User } from '../types/User';
import { CreateUserInput } from '../inputs/CreateUserInput';
import { UpdateUserInput } from '../inputs/UpdateUserInput';
import { Context } from '../context';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';

@Resolver(() => User)
export class UserResolver {
  /**
   * Get current authenticated user
   * 
   * Use Cases:
   * - User profile page
   * - Dashboard initialization
   * - Authentication status check
   * 
   * GraphQL Query Example:
   * {
   *   me {
   *     id
   *     email
   *     name
   *     posts {
   *       id
   *       title
   *     }
   *   }
   * }
   */
  @Query(() => User, { nullable: true })
  @Authorized() // Requires authentication
  async me(@Ctx() ctx: Context): Promise<User | null> {
    if (!ctx.user) {
      return null;
    }

    // GraphQL allows clients to request nested data
    // This query can include user's posts, comments, etc. in one request
    return await prisma.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        posts: true, // Include related posts if requested
      },
    });
  }

  /**
   * Get user by ID
   * 
   * Use Cases:
   * - User profile pages
   * - Public user information display
   * - User lookup by ID
   * 
   * GraphQL allows flexible field selection:
   * - Request only email: { user(id: "1") { email } }
   * - Request full profile: { user(id: "1") { email, name, posts { title } } }
   */
  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Get all users (with pagination)
   * 
   * Use Cases:
   * - User directory
   * - Admin user management
   * - User search results
   * 
   * GraphQL Benefits:
   * - Clients can request only needed fields
   * - Can include nested relationships (user.posts)
   * - Flexible filtering and sorting
   */
  @Query(() => [User])
  @Authorized('ADMIN') // Only admins can list all users
  async users(
    @Arg('skip', { defaultValue: 0 }) skip: number,
    @Arg('take', { defaultValue: 10 }) take: number
  ): Promise<User[]> {
    return await prisma.user.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Create a new user
   * 
   * Use Cases:
   * - User registration
   * - Admin user creation
   * - Bulk user import
   * 
   * GraphQL Mutation Example:
   * mutation {
   *   createUser(input: {
   *     email: "user@example.com"
   *     name: "John Doe"
   *     password: "secure123"
   *   }) {
   *     id
   *     email
   *     name
   *   }
   * }
   */
  @Mutation(() => User)
  async createUser(
    @Arg('input') input: CreateUserInput
  ): Promise<User> {
    // Input validation is automatic with class-validator
    // Use cases: Type-safe mutations, automatic validation
    
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        // Password should be hashed in production
        password: input.password, // TODO: Hash password
      },
    });

    logger.info(`User created: ${user.email}`);
    return user;
  }

  /**
   * Update user
   * 
   * Use Cases:
   * - User profile updates
   * - Admin user management
   * - User preference changes
   */
  @Mutation(() => User)
  @Authorized()
  async updateUser(
    @Arg('id') id: string,
    @Arg('input') input: UpdateUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    // Authorization: Users can only update their own profile
    // Use cases: Self-service profile management
    if (ctx.user?.id !== id && ctx.user?.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }

    return await prisma.user.update({
      where: { id },
      data: input,
    });
  }

  /**
   * Delete user
   * 
   * Use Cases:
   * - Account deletion
   * - Admin user management
   * - GDPR compliance (right to be forgotten)
   */
  @Mutation(() => Boolean)
  @Authorized('ADMIN')
  async deleteUser(@Arg('id') id: string): Promise<boolean> {
    await prisma.user.delete({
      where: { id },
    });
    return true;
  }
}

