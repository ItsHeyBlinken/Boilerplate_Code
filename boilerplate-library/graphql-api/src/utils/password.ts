/**
 * Password Utilities
 * 
 * Functions for hashing and comparing passwords.
 * Uses bcrypt for secure password storage.
 * 
 * Use Cases:
 * - User registration (hash password)
 * - User login (verify password)
 * - Password reset
 * - Security best practices
 */

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hash a password
 * 
 * Use Cases:
 * - Before storing password in database
 * - Password reset
 * - Security: Never store plain text passwords
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare password with hash
 * 
 * Use Cases:
 * - User login verification
 * - Password change verification
 * - Security: Verify without storing plain text
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

