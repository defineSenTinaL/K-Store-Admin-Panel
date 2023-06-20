//import { TigrisSetupService } from './db/setup';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthMiddleware } from './middleware/firebase.middleware';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(express.json());
  await app.listen(5000);

  //Tigris Data
  // const tigrisSetupService = app.get(TigrisSetupService);

  // await tigrisSetupService.setupTigris();

  // Apply Firebase Auth Middleware to globally so we can access from any ever in the source
  app.use(FirebaseAuthMiddleware);
}
bootstrap();
