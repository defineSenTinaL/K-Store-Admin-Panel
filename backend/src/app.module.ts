import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { SellerModule } from './seller/seller.module';
import { TigrisSetupService } from './db/setup';
import { FirebaseAuthMiddleware } from './middleware/firebase.middleware';
import { CategoryModule } from './category/category.module';
import { LoggingModule } from './modules/logging/logging.module';
import { DatabaseModule } from './modules/logging/database.module';
import { LoggingService } from './modules/logging/logging.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './modules/logging/logging.schema';
import { ImageKitModule } from './image/imagekit.module';
//import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    SellerModule,
    CategoryModule,
    LoggingModule,
    DatabaseModule,
    ImageKitModule,
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TigrisSetupService,
    FirebaseAuthMiddleware,
    LoggingService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly loggingService: LoggingService) {}

  async onModuleInit() {
    this.loggingService.log('info', 'Application starting...');
    // Log any additional startup actions or events

    // Perform other initialization tasks
  }

  async onApplicationShutdown(signal?: string) {
    this.loggingService.log('info', 'Application shutting down...');
    // Log any additional shutdown actions or events

    // Perform other cleanup or finalization tasks
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes('seller');
  }
}
