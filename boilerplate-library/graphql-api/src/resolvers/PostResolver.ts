/**
 * Post Resolver
 * 
 * Handles all Post-related GraphQL operations.
 * Demonstrates nested queries and relationships.
 * 
 * Use Cases:
 * - Blog posts
 * - Social media posts
 * - Content management
 * - News articles
 * - Product descriptions
 * 
 * GraphQL Advantages:
 * - Fetch post with author and comments in one query
 * - Request only needed fields (title, content, etc.)
 * - Nested relationships: post.author.posts (author's other posts)
 */

import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { Post } from '../types/Post';
import { CreatePostInput } from '../inputs/CreatePostInput';
import { Context } from '../context';
import { prisma } from '../config/database';

@Resolver(() => Post)
export class PostResolver {
  /**
   * Get all posts
   * 
   * Use Cases:
   * - Blog listing page
   * - News feed
   * - Content discovery
   * 
   * GraphQL Query Example:
   * {
   *   posts {
   *     id
   *     title
   *     author {
   *       name
   *       email
   *     }
   *     comments {
   *       content
   *       author {
   *         name
   *       }
   *     }
   *   }
   * }
   * 
   * This single query fetches posts with nested author and comments!
   */
  @Query(() => [Post])
  async posts(
    @Arg('skip', { defaultValue: 0 }) skip: number,
    @Arg('take', { defaultValue: 10 }) take: number
  ): Promise<Post[]> {
    return await prisma.post.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true, // Include author data if requested
        comments: true, // Include comments if requested
      },
    });
  }

  /**
   * Get post by ID
   * 
   * Use Cases:
   * - Post detail page
   * - Post editing
   * - Post sharing
   */
  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: string): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          include: {
            author: true, // Nested: comments with their authors
          },
        },
      },
    });
  }

  /**
   * Create a new post
   * 
   * Use Cases:
   * - Blog post creation
   * - Content publishing
   * - User-generated content
   */
  @Mutation(() => Post)
  @Authorized() // Requires authentication
  async createPost(
    @Arg('input') input: CreatePostInput,
    @Ctx() ctx: Context
  ): Promise<Post> {
    if (!ctx.user) {
      throw new Error('Unauthorized');
    }

    return await prisma.post.create({
      data: {
        title: input.title,
        content: input.content,
        authorId: ctx.user.id, // Use authenticated user as author
      },
    });
  }

  /**
   * Update post
   * 
   * Use Cases:
   * - Post editing
   * - Content updates
   * - Draft publishing
   */
  @Mutation(() => Post)
  @Authorized()
  async updatePost(
    @Arg('id') id: string,
    @Arg('input') input: CreatePostInput,
    @Ctx() ctx: Context
  ): Promise<Post> {
    const post = await prisma.post.findUnique({ where: { id } });
    
    if (!post) {
      throw new Error('Post not found');
    }

    // Authorization: Only author or admin can update
    if (post.authorId !== ctx.user?.id && ctx.user?.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }

    return await prisma.post.update({
      where: { id },
      data: input,
    });
  }

  /**
   * Delete post
   * 
   * Use Cases:
   * - Post removal
   * - Content moderation
   * - User account cleanup
   */
  @Mutation(() => Boolean)
  @Authorized()
  async deletePost(
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const post = await prisma.post.findUnique({ where: { id } });
    
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.authorId !== ctx.user?.id && ctx.user?.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }

    await prisma.post.delete({ where: { id } });
    return true;
  }
}

