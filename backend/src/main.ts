import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    // Create Nest Application
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    // Global API Prefix
    app.setGlobalPrefix('api');

    // Global Validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Config Service
    const configService = app.get(ConfigService);

    // Port Configuration
    const port = configService.get<number>('PORT') || 3000;

    // Enable Graceful Shutdown
    app.enableShutdownHooks();

    // Start Server
    await app.listen(port);

    logger.log(`🚀 Server running successfully`);
    logger.log(`🌐 Application URL: http://localhost:${port}/api`);
  } catch (error) {
    logger.error('❌ Failed to start application', error);
    process.exit(1);
  }
}

bootstrap();
