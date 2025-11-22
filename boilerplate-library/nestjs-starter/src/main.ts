/**
 * NestJS Application Entry Point
 * 
 * This file bootstraps the NestJS application and configures
 * global settings. NestJS is perfect for:
 * 
 * Use Cases:
 * - Enterprise backend applications
 * - Microservices architecture
 * - Large-scale team projects
 * - Complex business logic
 * - API-first development
 * - Scalable applications
 * 
 * Key Features:
 * - Dependency injection container
 * - Modular architecture
 * - Decorator-based programming
 * - Built-in validation and transformation
 * - Swagger/OpenAPI documentation
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Bootstrap the application
 * 
 * This function:
 * 1. Creates the NestJS application
 * 2. Sets up global validation
 * 3. Configures CORS
 * 4. Sets up Swagger documentation
 * 5. Starts the server
 * 
 * Use Cases:
 * - Production deployments
 * - Development with hot reload
 * - Testing environments
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  // Use cases: Automatic DTO validation, type transformation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error on unknown properties
      transform: true, // Automatically transform payloads to DTO instances
    })
  );

  // CORS configuration
  // Use cases: Frontend-backend communication, API access control
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger/OpenAPI documentation
  // Use cases: API documentation, testing interface, client generation
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS Starter API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();

