import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { SellerModule } from './seller/seller.module';
import { FirebaseAuthMiddleware } from './middleware/firebase.middleware';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageKitModule } from './image/imagekit.module';
import { ImageKitService } from './image/imagekit.service';

//import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false, // Load the .env file
    }),
    ProductModule,
    SellerModule,
    CategoryModule,
    ImageKitModule,
    MongooseModule.forRoot(
      'mongodb+srv://aditya03126:adityakumavat7020@cluster0.djvom5z.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FirebaseAuthMiddleware,
    ImageKitService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule implements NestModule {
  async onModuleInit() {
    // Log any additional startup actions or events
    // Perform other initialization tasks
  }

  async onApplicationShutdown(signal?: string) {
    // Log any additional shutdown actions or events
    // Perform other cleanup or finalization tasks
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes('seller');
  }
}
