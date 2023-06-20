import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { SellerModule } from './seller/seller.module';
import { TigrisSetupService } from './db/setup';
import { FirebaseAuthMiddleware } from './middleware/firebase.middleware';
import { SellerController } from './seller/seller.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    SellerModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, TigrisSetupService, FirebaseAuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes('seller');
  }
}
