/**
 * User Type Definition
 * 
 * GraphQL type definitions define the shape of data.
 * This type represents a User in the system.
 * 
 * Use Cases:
 * - User profiles
 * - Authentication
 * - User management
 * - User relationships (posts, comments, etc.)
 */

import { ObjectType, Field, ID } from 'type-graphql';
import { Post } from './Post';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field()
  name!: string;

  // Password is not exposed in GraphQL schema (security)
  // password: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[]; // Nested relationship: user's posts

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

