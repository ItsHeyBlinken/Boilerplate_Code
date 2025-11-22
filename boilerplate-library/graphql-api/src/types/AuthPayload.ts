/**
 * Authentication Payload
 * 
 * Return type for authentication mutations (login, register).
 * Contains the JWT token and user information.
 * 
 * Use Cases:
 * - Login responses
 * - Registration responses
 * - Token refresh
 */

import { ObjectType, Field } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class AuthPayload {
  @Field()
  token!: string; // JWT token for authenticated requests

  @Field(() => User)
  user!: User; // Authenticated user information
}

