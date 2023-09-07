// import { ValidationPipe } from '@nestjs/common';
//import { TigrisSetupService } from './db/setup';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthMiddleware } from './middleware/firebase.middleware';
import * as express from 'express';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Provide the LoggingService to the GlobalExceptionFilter
  app.useGlobalFilters();

  app.use(express.json());

  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);

  // Handle application shutdown
  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });
  //Tigris Data
  // const tigrisSetupService = app.get(TigrisSetupService);

  // await tigrisSetupService.setupTigris();

  // Apply Firebase Auth Middleware to globally so we can access from any ever in the source
  app.use(FirebaseAuthMiddleware);
}
bootstrap();
