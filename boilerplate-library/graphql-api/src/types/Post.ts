/**
 * Post Type Definition
 * 
 * Represents a blog post or content item.
 * Demonstrates GraphQL relationships and nested queries.
 * 
 * Use Cases:
 * - Blog posts
 * - Articles
 * - Content management
 * - Social media posts
 */

import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Post {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => User, { nullable: true })
  author?: User; // Nested relationship: post's author

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

