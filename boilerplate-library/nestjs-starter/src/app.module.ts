/**
 * Root Application Module
 * 
 * This is the root module that imports all feature modules.
 * NestJS uses a modular architecture where each feature is
 * a separate module.
 * 
 * Use Cases:
 * - Organizing application into features
 * - Managing dependencies between modules
 * - Configuring global providers
 * - Setting up application-wide configuration
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Configuration module - loads environment variables
    // Use cases: Environment-based configuration, secrets management
    ConfigModule.forRoot({
      isGlobal: true, // Make config available globally
    }),
    
    // Feature modules
    PrismaModule,  // Database access
    AuthModule,    // Authentication
    UsersModule,   // User management
  ],
})
export class AppModule {}

