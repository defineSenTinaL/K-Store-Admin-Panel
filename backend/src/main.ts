import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthMiddleware } from './middleware/firebase.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Firebase Auth Middleware to globally so we can access from any ever in the source
  app.use(FirebaseAuthMiddleware);

  await app.listen(5000);
}
bootstrap();
