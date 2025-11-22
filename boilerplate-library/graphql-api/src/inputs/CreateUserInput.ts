/**
 * Create User Input
 * 
 * Input type for creating a new user.
 * GraphQL input types are used for mutations.
 * 
 * Use Cases:
 * - User registration
 * - Admin user creation
 * - Bulk user import
 */

import { InputType, Field } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail() // Automatic validation
  email!: string;

  @Field()
  @MinLength(2) // Automatic validation
  name!: string;

  @Field()
  @MinLength(8) // Automatic validation
  password!: string;
}

