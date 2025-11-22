/**
 * Authentication Resolver
 * 
 * Handles user authentication and authorization.
 * 
 * Use Cases:
 * - User registration
 * - User login
 * - Password reset
 * - Session management
 * - OAuth integration
 */

import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { AuthPayload } from '../types/AuthPayload';
import { LoginInput } from '../inputs/LoginInput';
import { RegisterInput } from '../inputs/RegisterInput';
import { Context } from '../context';
import { prisma } from '../config/database';
import { generateToken } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/password';

@Resolver()
export class AuthResolver {
  /**
   * User registration
   * 
   * Use Cases:
   * - New user signup
   * - Account creation
   * - User onboarding
   * 
   * Returns JWT token for immediate authentication
   */
  @Mutation(() => AuthPayload)
  async register(@Arg('input') input: RegisterInput): Promise<AuthPayload> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password before storing
    const hashedPassword = await hashPassword(input.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = generateToken(user);

    return {
      token,
      user,
    };
  }

  /**
   * User login
   * 
   * Use Cases:
   * - User authentication
   * - Session creation
   * - API access
   * 
   * Returns JWT token for authenticated requests
   */
  @Mutation(() => AuthPayload)
  async login(@Arg('input') input: LoginInput): Promise<AuthPayload> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await comparePassword(input.password, user.password);

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user);

    return {
      token,
      user,
    };
  }
}

